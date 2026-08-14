package com.portfolio.backend.message;

import com.portfolio.backend.common.validation.OnCreate;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public record MessageDto(
        @Size(groups = OnCreate.class, min = 1, max = 100)
        @NotBlank(groups = OnCreate.class, message = "Name is Required")
        String name,

        @Email(groups = OnCreate.class, message = "Valid email is Required")
        @NotBlank(groups = OnCreate.class, message = "Email is Required")
        String email,

        @Size(groups = OnCreate.class, min = 1, max = 200)
        @NotBlank(groups = OnCreate.class, message = "Subject is Required")
        String subject,

        @Size(groups = OnCreate.class, min = 1, max = 2000)
        @NotBlank(groups = OnCreate.class, message = "Message is Required")
        String message
) {
    public record response(
            Long id,
            String name,
            String email,
            String subject,
            String message,
            Boolean isRead,
            Instant createdAt
    ) {}
}
