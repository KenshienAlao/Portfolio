package com.portfolio.backend.project;

import com.portfolio.backend.common.validation.OnCreate;
import com.portfolio.backend.common.validation.OnUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record ProjectDto(
                @Size(groups = {
                                OnCreate.class,
                                OnUpdate.class }, min = 1, max = 32) @NotBlank(groups = OnCreate.class, message = "Title is Required") String title,
                @NotNull(groups = OnCreate.class, message = "Image is Required") MultipartFile image,
                @Size(groups = { OnCreate.class,
                                OnUpdate.class }, min = 1, max = 255) @NotBlank(groups = OnCreate.class, message = "Description is Required") String description,
                @NotEmpty(groups = OnCreate.class, message = "Tags is Required") List<String> tags,
                @Size(groups = { OnCreate.class,
                                OnUpdate.class }, min = 1, max = 255) @NotBlank(groups = OnCreate.class, message = "Github Link is Required") String github,
                @Size(groups = { OnCreate.class, OnUpdate.class }, max = 255) String demo) {
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
