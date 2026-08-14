package com.portfolio.backend.setup;

import com.portfolio.backend.common.validation.OnCreate;
import com.portfolio.backend.common.validation.OnUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class SetupDto {

    public record CategoryRequest(
            @NotBlank(groups = OnCreate.class, message = "Category name is required")
            @Size(max = 100, message = "Category name cannot exceed 100 characters")
            String category,

            @NotBlank(groups = OnCreate.class, message = "Description is required")
            @Size(max = 1000, message = "Description cannot exceed 1000 characters")
            String description
    ) {}

    public record CategoryResponse(
            Long id,
            String category,
            String description,
            List<ItemResponse> items
    ) {}

    public record ItemRequest(
            @NotNull(groups = OnCreate.class, message = "Category ID is required")
            Long categoryId,

            @NotBlank(groups = OnCreate.class, message = "Tool/App value is required")
            @Size(max = 150, message = "Value cannot exceed 150 characters")
            String value,

            @NotBlank(groups = OnCreate.class, message = "Download URL is required")
            @Size(max = 500, message = "Download URL cannot exceed 500 characters")
            String download,

            @NotNull(groups = OnCreate.class, message = "Light mode image is required")
            MultipartFile imageLight,

            MultipartFile imageDark,

            @Size(max = 200, message = "Sub-value cannot exceed 200 characters")
            String subValue,

            @Size(max = 500, message = "Sub-download cannot exceed 500 characters")
            String subDownload
    ) {}

    public record ItemResponse(
            Long id,
            Long categoryId,
            String value,
            String download,
            String imageLight,
            String imageDark,
            String subValue,
            String subDownload
    ) {}
}
