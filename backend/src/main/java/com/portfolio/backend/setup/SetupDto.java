package com.portfolio.backend.setup;

import com.portfolio.backend.common.validation.OnCreate;
import com.portfolio.backend.common.validation.OnUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record SetupDto(
        @Size(groups = {OnCreate.class, OnUpdate.class}, min = 1, max = 64)
        @NotBlank(groups = OnCreate.class, message = "Category is Required")
        String category,

        @NotNull(groups = OnCreate.class, message = "Light Mode Image is Required")
        MultipartFile imageLight,

        MultipartFile imageDark,

        @NotEmpty(groups = OnCreate.class, message = "Values are Required")
        List<String> values,

        @Size(groups = {OnCreate.class, OnUpdate.class}, min = 1, max = 500)
        @NotBlank(groups = OnCreate.class, message = "Description is Required")
        String description,

        @NotEmpty(groups = OnCreate.class, message = "Downloads are Required")
        List<String> downloads,

        String subValue,
        String subDownload
) {
    public record response(
            Long id,
            String category,
            String imageLight,
            String imageDark,
            List<String> values,
            String description,
            List<String> downloads,
            String subValue,
            String subDownload
    ) {}
}
