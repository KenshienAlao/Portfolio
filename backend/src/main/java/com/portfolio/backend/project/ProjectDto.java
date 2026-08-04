package com.portfolio.backend.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ProjectDto(
                @Size(min = 1, max = 32) @NotBlank(message = "Title is Required") String title,
                @NotNull(message = "Image is Required") MultipartFile image,
                @NotBlank(message = "Description is Required") String description,
                @NotEmpty(message = "Tags is Required") List<String> tags,
                @Size(min = 1, max = 255) @NotBlank(message = "Github Link is Required") String github,
                @Size(max = 255) String demo) {
        public record response(
                        Long id,
                        String title,
                        String image,
                        String description,
                        List<String> tags,
                        String github,
                        String demo) {
        }
}
