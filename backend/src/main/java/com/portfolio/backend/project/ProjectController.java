package com.portfolio.backend.project;

import com.portfolio.backend.common.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;

    @Cacheable("projects")
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectDto.response>>> getProjects() {
        return ResponseEntity.ok(ApiResponse.success("Success", projectService.getProjects()));
    }

    @Cacheable("projects")
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<List<ProjectDto.response>>> getAdminProjects() {
        return ResponseEntity.ok(ApiResponse.success("Success", projectService.getProjects()));
    }

    @CacheEvict(value = "projects", allEntries = true)
    @DeleteMapping("/admin/delete-project/{projectId}")
    public ResponseEntity<ApiResponse<Void>> deleteProject(@PathVariable Integer projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.ok(ApiResponse.success("Success", null));
    }

    @CacheEvict(value = "projects", allEntries = true)
    @PostMapping(value = "/admin/add-project", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<ProjectDto.response>> addProject(@Valid @ModelAttribute ProjectDto entity) {
        return ResponseEntity.ok(ApiResponse.success("Success", projectService.addProject(entity)));
    }

    @CacheEvict(value = "projects", allEntries = true)
    @PatchMapping(value = "/admin/edit-project/{projectId}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<ProjectDto.response>> editProject( @PathVariable Integer projectId, @Valid @ModelAttribute ProjectDto entity) {
        return ResponseEntity.ok(ApiResponse.success("Success", projectService.editProject(projectId, entity)));
    }
 }
