package com.portfolio.backend.skills;

import com.portfolio.backend.common.validation.OnCreate;
import com.portfolio.backend.common.validation.OnUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record SkillDto(
        @Size(groups = {OnCreate.class, OnUpdate.class},  min = 1, max = 32) @NotBlank(groups = OnCreate.class, message = "Name is Required") String name,
        @Size(groups = {OnCreate.class, OnUpdate.class}, min = 1, max = 32) @NotBlank(groups = OnCreate.class, message = "Category is Required") String category,
        @NotNull(groups = OnCreate.class, message = "Light Mode Image is Required") MultipartFile imageLight,
        MultipartFile imageDark
) {
    public record response(
            Long id,
            String name,
            String category,
            String imageLight,
            String imageDark
    ){}
}
