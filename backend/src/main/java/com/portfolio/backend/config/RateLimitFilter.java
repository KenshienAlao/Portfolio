package com.portfolio.backend.config;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * Filter that applies tiered, token-bucket rate limiting to incoming HTTP
 * requests.
 * <p>
 * Evaluates request endpoint categories, resolves client IP strictly from a
 * designated
 * trusted edge proxy header (or socket remote address), and maintains rate
 * limit quotas
 * per client IP address using Bucket4j backed by a Caffeine in-memory cache.
 * </p>
 * <blockquote><b>SECURITY PRECONDITION:</b>
 * Trusting {@code CF-Connecting-IP} (or any proxy header) is only secure if
 * direct access
 * to the origin server is blocked at the network/firewall layer (e.g.
 * Cloudflare Tunnel,
 * AWS Security Groups, UFW firewall allowing only Cloudflare IP ranges, or
 * Authenticated Origin Pulls / mTLS).
 * If the origin server IP is directly reachable, an attacker could spoof this
 * header.
 * </blockquote>
 */
@Slf4j
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RateLimitFilter extends OncePerRequestFilter {

    private final AntPathMatcher pathMatcher = new AntPathMatcher();

    /**
     * Single trusted header provided by your edge proxy/CDN (e.g.
     * "CF-Connecting-IP" for Cloudflare).
     * If unset or blank, the filter exclusively uses
     * {@link HttpServletRequest#getRemoteAddr()}.
     */
    @Value("${security.rate-limit.trusted-header:CF-Connecting-IP}")
    private String trustedHeader;

    /**
     * In-memory cache holding token buckets mapped to
     * {@code "<TIER_NAME>:<CLIENT_IP>"}.
     * Automatically invalidates inactive entries after 10 minutes of inactivity.
     */
    private final Cache<String, Bucket> bucketCache = Caffeine.newBuilder()
            .maximumSize(25_000)
            .expireAfterAccess(Duration.ofMinutes(10))
            .build();

    /**
     * Validates and logs the active rate limiting configuration at application
     * startup.
     */
    @PostConstruct
    public void init() {
        if (trustedHeader != null && !trustedHeader.isBlank()) {
            log.info(
                    "RateLimitFilter initialized: Trusting edge proxy header '{}'. Ensure direct origin ingress is restricted to your CDN/proxy IP ranges.",
                    trustedHeader);
        } else {
            log.warn(
                    "RateLimitFilter initialized: No trusted proxy header specified. Falling back to direct socket remote address (request.getRemoteAddr()).");
        }
    }

    /**
     * Defines rate limit capacities, refill rates, and durations per endpoint
     * category.
     */
    @Getter
    public enum RateLimitTier {
        /** 5 attempts per 1 minute (anti-brute force for authentication). */
        AUTH_LOGIN(5, 5, Duration.ofMinutes(1)),

        /** 5 submissions per 1 minute (anti-spam protection for contact form). */
        MESSAGE_SUBMISSION(5, 5, Duration.ofMinutes(1)),

        /**
         * 30 operations per 1 minute (admin mutating operations: create, update,
         * delete).
         */
        ADMIN_MUTATION(30, 30, Duration.ofMinutes(1)),

        /** 120 requests per 1 minute (generous allowance for public read traffic). */
        PUBLIC_READ(120, 120, Duration.ofMinutes(1)),

        /** 60 requests per 1 minute (fallback for unclassified API endpoints). */
        DEFAULT_API(60, 60, Duration.ofMinutes(1));

        /**
         * -- GETTER --
         *
         * @return maximum token capacity for this tier
         */
        private final long capacity;
        /**
         * -- GETTER --
         *
         * @return number of tokens replenished per cycle
         */
        private final long refillTokens;
        /**
         * -- GETTER --
         *
         * @return duration cycle for token replenishment
         */
        private final Duration refillDuration;

        /**
         * Constructs a rate limit tier configuration.
         *
         * @param capacity       maximum number of tokens the bucket can hold
         * @param refillTokens   number of tokens added back to the bucket upon refill
         * @param refillDuration duration required to refill tokens
         */
        RateLimitTier(long capacity, long refillTokens, Duration refillDuration) {
            this.capacity = capacity;
            this.refillTokens = refillTokens;
            this.refillDuration = refillDuration;
        }

    }

    /**
     * Intercepts incoming HTTP requests to evaluate rate limits against the
     * client's IP and request tier.
     *
     * @param request     the incoming {@link HttpServletRequest}
     * @param response    the outgoing {@link HttpServletResponse}
     * @param filterChain the remaining filter chain to execute if rate limits allow
     * @throws ServletException in case of general servlet processing errors
     * @throws IOException      in case of I/O processing errors during filter
     *                          execution
     */
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        // 1. Bypass CORS preflight requests
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        String uri = request.getRequestURI();

        // 2. Only rate-limit API routes
        if (!uri.startsWith("/api")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Resolve rate limit tier dynamically based on endpoint and HTTP method
        RateLimitTier tier = resolveTier(request.getMethod(), uri);
        String clientIp = extractClientIp(request);

        Bucket bucket = bucketCache.get(tier.name() + ":" + clientIp, k -> createBucket(tier));
        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

        if (probe.isConsumed()) {
            // Success: attach remaining limit header
            response.setHeader("X-RateLimit-Remaining", String.valueOf(probe.getRemainingTokens()));
            filterChain.doFilter(request, response);
        } else {
            // Limit exceeded: return 429 Too Many Requests with retry header & JSON payload
            long retryAfterSeconds = Math.max(1, TimeUnit.NANOSECONDS.toSeconds(probe.getNanosToWaitForRefill()));

            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json;charset=UTF-8");
            response.setHeader("Retry-After", String.valueOf(retryAfterSeconds));
            response.setHeader("X-RateLimit-Remaining", "0");
            response.setHeader("X-RateLimit-Retry-After-Seconds", String.valueOf(retryAfterSeconds));

            String message = String.format("Too many requests. Please try again in %d seconds.", retryAfterSeconds);
            response.getWriter().write(
                    "{\"success\":false,\"message\":\"" + message + "\",\"data\":null}");
        }
    }

    /**
     * Categorizes an incoming HTTP request into an appropriate
     * {@link RateLimitTier}
     * based on its HTTP method and request URI path.
     *
     * @param method the HTTP method of the request (e.g., GET, POST, DELETE)
     * @param uri    the target request URI path
     * @return the matching {@link RateLimitTier}
     */
    private RateLimitTier resolveTier(String method, String uri) {
        // Auth / Login
        if (HttpMethod.POST.matches(method) && pathMatcher.match("/api/auth/login", uri)) {
            return RateLimitTier.AUTH_LOGIN;
        }

        // Contact message submit
        if (HttpMethod.POST.matches(method) && pathMatcher.match("/api/message", uri)) {
            return RateLimitTier.MESSAGE_SUBMISSION;
        }

        // Admin write operations (POST, PUT, PATCH, DELETE under admin routes)
        if (!HttpMethod.GET.matches(method) &&
                (pathMatcher.match("/api/**/admin/**", uri) || pathMatcher.match("/api/admin/**", uri))) {
            return RateLimitTier.ADMIN_MUTATION;
        }

        // Public read endpoints (GET /api/**)
        if (HttpMethod.GET.matches(method)) {
            return RateLimitTier.PUBLIC_READ;
        }

        return RateLimitTier.DEFAULT_API;
    }

    /**
     * Creates a new token bucket configured according to the parameters specified
     * in the tier.
     *
     * @param tier the {@link RateLimitTier} containing capacity and refill rules
     * @return a configured {@link Bucket} instance
     */
    private Bucket createBucket(RateLimitTier tier) {
        Bandwidth limit = Bandwidth.builder()
                .capacity(tier.getCapacity())
                .refillGreedy(tier.getRefillTokens(), tier.getRefillDuration())
                .build();
        return Bucket.builder().addLimit(limit).build();
    }

    /**
     * Resolves the client IP address strictly using either the configured edge
     * proxy header
     * or the direct connection remote address.
     * <p>
     * To prevent IP spoofing attacks, cascading header lookups (e.g., checking
     * random client-supplied
     * {@code X-Forwarded-For} or other headers) are prohibited. Only the single
     * authoritative header
     * supplied by the trusted upstream edge proxy is inspected.
     * </p>
     *
     * @param request the incoming {@link HttpServletRequest}
     * @return the resolved client IP address
     */
    private String extractClientIp(HttpServletRequest request) {
        if (trustedHeader != null && !trustedHeader.isBlank()) {
            String ip = request.getHeader(trustedHeader);
            if (ip != null && !ip.isBlank() && !"unknown".equalsIgnoreCase(ip.trim())) {
                // If the edge proxy passes a comma-separated list, take the leftmost client IP
                if (ip.contains(",")) {
                    ip = ip.split(",")[0].trim();
                }
                return ip.trim();
            }
        }

        String remoteAddr = request.getRemoteAddr();
        return (remoteAddr != null && !remoteAddr.isBlank()) ? remoteAddr : "unknown";
    }
}