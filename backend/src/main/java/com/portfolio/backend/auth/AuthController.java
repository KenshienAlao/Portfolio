package com.portfolio.backend.auth;


import com.portfolio.backend.common.ApiResponse;
import com.portfolio.backend.config.JsonWebTokenConfig;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.WebUtils;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JsonWebTokenConfig jwtTokenConfig;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Void>> login(@Valid @RequestBody AuthDto entity) {
        authService.login(entity);
        return ResponseEntity.ok(ApiResponse.success("Success", null));
    }

    @PostMapping("/refresh-cookie")
        public ApiResponse<Void> refresh(HttpServletRequest request, HttpServletResponse response) {
            var cookie = WebUtils.getCookie(request, "portfolio-refresh-cookie");
            if (cookie == null)
                throw new IllegalArgumentException("Missing refresh token.");

            var accessToken = jwtTokenConfig.generateAccessToken(
                    jwtTokenConfig.extractEmail(cookie.getValue()));

            response.addHeader(
                    HttpHeaders.SET_COOKIE, ResponseCookie.from("portfolio-access-cookie", accessToken)
                            .httpOnly(true)
                            .secure(true)
                            .path("/")
                            .maxAge(900)
                            .sameSite("None")
                            .build()
                            .toString() + "; Partitioned");

            return ApiResponse.success("Token refreshed.", null);
        }
}
