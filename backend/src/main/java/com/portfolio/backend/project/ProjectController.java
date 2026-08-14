package com.portfolio.backend.project;

import com.portfolio.backend.common.ApiResponse;
import com.portfolio.backend.common.validation.OnCreate;
import lombok.RequiredArgsConstructor;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;

    @Cacheable("projects_public")
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectDto.response>>> getProjects() {
        return ResponseEntity.ok(ApiResponse.success("Success", projectService.getPublicProjects()));
    }

    @Cacheable("projects_admin")
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<List<ProjectDto.response>>> getAdminProjects() {
        return ResponseEntity.ok(ApiResponse.success("Success", projectService.getProjects()));
    }

    @CacheEvict(value = {"projects_admin", "projects_public"}, allEntries = true)
    @DeleteMapping("/admin/delete-project/{projectId}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Integer projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.ok(ApiResponse.success("Success", null));
    }

    @CacheEvict(value = {"projects_admin", "projects_public"}, allEntries = true)
    @PostMapping(value = "/admin/add-project", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<ProjectDto.response>> addProject(@Validated(OnCreate.class) @ModelAttribute ProjectDto entity) {
        return ResponseEntity.ok(ApiResponse.success("Success", projectService.addProject(entity)));
    }

    @CacheEvict(value = {"projects_admin", "projects_public"}, allEntries = true)
    @PatchMapping(value = "/admin/edit-project/{projectId}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<ProjectDto.response>> editProject( @PathVariable Integer projectId, @Validated(OnCreate.class) @ModelAttribute ProjectDto entity) {
        return ResponseEntity.ok(ApiResponse.success("Success", projectService.editProject(projectId, entity)));
    }
 }
