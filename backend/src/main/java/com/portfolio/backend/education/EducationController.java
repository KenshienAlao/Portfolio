package com.portfolio.backend.education;

import com.portfolio.backend.common.ApiResponse;
import org.springframework.validation.annotation.Validated;
import com.portfolio.backend.common.validation.OnCreate;
import com.portfolio.backend.common.validation.OnUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService educationService;

    @Cacheable("education_public")
    @GetMapping
    public ResponseEntity<ApiResponse<List<EducationDto.response>>> getEducationPublic() {
        return ResponseEntity.ok(ApiResponse.success("Success", educationService.getEducationPublic()));
    }

    @Cacheable("education_admin")
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<List<EducationDto.response>>> getEducationAdmin() {
        return ResponseEntity.ok(ApiResponse.success("Success", educationService.getEducation()));
    }

    @CacheEvict(value = { "education_public", "education_admin" }, allEntries = true)
    @PostMapping("/admin/add-education")
    public ResponseEntity<ApiResponse<EducationDto.response>> addEducation(
            @Validated(OnCreate.class) @RequestBody EducationDto entity) {
        return ResponseEntity.ok(ApiResponse.success("Success", educationService.addEducation(entity)));
    }

    @CacheEvict(value = { "education_public", "education_admin" }, allEntries = true)
    @DeleteMapping("/admin/delete-education/{educationId}")
    public ResponseEntity<ApiResponse<Void>> deleteEducationById(@PathVariable Integer educationId) {
        educationService.deleteEducationById(educationId);
        return ResponseEntity.ok(ApiResponse.success("Success", null));
    }

    @CacheEvict(value = { "education_public", "education_admin" }, allEntries = true)
    @PatchMapping("/admin/edit-education/{educationId}")
    public ResponseEntity<ApiResponse<EducationDto.response>> editEducationById(@PathVariable Integer educationId,
            @Validated(OnUpdate.class) @RequestBody EducationDto entity) {
        return ResponseEntity
                .ok(ApiResponse.success("Success", educationService.editEducationById(entity, educationId)));
    }
}
