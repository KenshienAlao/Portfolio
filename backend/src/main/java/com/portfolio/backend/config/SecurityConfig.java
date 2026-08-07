package com.portfolio.backend.config;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.WebUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JsonWebTokenConfig jwtTokenConfig) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(e -> e.authenticationEntryPoint((req, res, ex) -> res.sendError(401)))
                .addFilterBefore(new OncePerRequestFilter() {
                    @Override
                    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                            FilterChain filterChain) throws ServletException, IOException {
                        var accessToken = WebUtils.getCookie(request, "access_token");
                        if (accessToken != null) {
                            try {
                                authenticate(jwtTokenConfig.extractEmail(accessToken.getValue()));
                                filterChain.doFilter(request, response);
                                return;
                            } catch (Exception ignored) {
                                // access token is expired/invalid; try refresh token below
                            }
                        }

                        var refreshToken = WebUtils.getCookie(request, "portfolio-refresh-cookie");
                        if (refreshToken != null) {
                            try {
                                var email = jwtTokenConfig.extractEmail(refreshToken.getValue());
                                authenticate(email);
                                response.addHeader(
                                        HttpHeaders.SET_COOKIE, ResponseCookie.from("portfolio-access-cookie",
                                                jwtTokenConfig.generateAccessToken(email))
                                                .httpOnly(true)
                                                .secure(true)
                                                .path("/")
                                                .maxAge(900)
                                                .sameSite("None")
                                                .build()
                                                .toString() + "; Partitioned");
                            } catch (Exception ignored) {
                                // ignore parse/expired errors, let it 401
                            }
                        }

                        filterChain.doFilter(request, response);
                    }

                    private void authenticate(String email) {
                        SecurityContextHolder.getContext().setAuthentication(
                                new UsernamePasswordAuthenticationToken(email, null, List.of()));
                    }
                }, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/projects").permitAll()
                        .requestMatchers(HttpMethod.GET,"/api/education").permitAll()
                        .anyRequest().fullyAuthenticated());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(
            @Value("${cors.allowed-origins}") String[] allowedOrigins) {

        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(allowedOrigins));
        config.setAllowedMethods(List.of("*"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
