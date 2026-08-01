package com.portfolio.backend.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthDto(

        @Size(min = 1, max = 32) @NotBlank(message = "Code is Required") String code,
        @Size(min = 1, max = 32) @NotBlank(message = "Password is Required") String password
) {}
