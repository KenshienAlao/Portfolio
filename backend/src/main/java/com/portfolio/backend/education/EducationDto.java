package com.portfolio.backend.education;

import com.portfolio.backend.common.validation.OnCreate;
import com.portfolio.backend.common.validation.OnUpdate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record EducationDto(
                @Size(groups = {
                                OnCreate.class,
                                OnUpdate.class }, min = 1, max = 125) @NotBlank(groups = OnCreate.class, message = "School is Required") String school,
                @Size(groups = { OnCreate.class,
                                OnUpdate.class }, min = 1, max = 50) @NotBlank(groups = OnCreate.class, message = "Degree is Required") String degree,
                @Size(groups = { OnCreate.class,
                                OnUpdate.class }, min = 1, max = 4) @NotBlank(groups = OnCreate.class, message = "Year Start is Required") String yearStart,
                @Size(groups = { OnCreate.class,
                                OnUpdate.class }, min = 1, max = 10) @NotBlank(groups = OnCreate.class, message = "Year End is Required") String yearEnd,
                @Size(groups = { OnCreate.class,
                                OnUpdate.class }, min = 1, max = 255) @NotBlank(groups = OnCreate.class, message = "Description is Required") String description,
                @Size(groups = { OnCreate.class,
                                OnUpdate.class }, min = 1, max = 255) @NotBlank(groups = OnCreate.class, message = "Location is Required") String location) {
        public record response(
                        Long id,
                        String school,
                        String degree,
                        String yearStart,
                        String yearEnd,
                        String description,
                        String location) {
        }
}
