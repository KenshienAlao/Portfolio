package com.portfolio.backend.auth;


import com.portfolio.backend.config.JsonWebTokenConfig;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final HttpServletResponse response;
    private final JsonWebTokenConfig jwt;

    public void login(AuthDto entity) {
        var user = authRepository.findByCode(entity.code())
                .filter(u -> passwordEncoder.matches(entity.password(), u.getPassword()))
                .orElseThrow(() -> new IllegalArgumentException("Invalid code or password"));
        var code = user.getCode();
        setCookie("portfolio-access-cookie", jwt.generateAccessToken(code), jwt.getAccessExpSeconds());
        setCookie("portfolio-refresh-cookie", jwt.generateRefreshToken(code), jwt.getRefreshExpSeconds());
    }

    private void setCookie(String name, String value, long maxAge) {
        response.addHeader(HttpHeaders.SET_COOKIE, ResponseCookie.from(name, value)
                .httpOnly(true).secure(true).path("/").maxAge(maxAge).sameSite("None").build()
                .toString()
                + "; Partitioned");
    }
}
