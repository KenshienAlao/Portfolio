package com.portfolio.backend.setup;

import com.portfolio.backend.common.ApiResponse;
import com.portfolio.backend.common.validation.OnCreate;
import com.portfolio.backend.common.validation.OnUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/setup")
public class SetupController {

    private final SetupService setupService;

    @Cacheable("setup_public")
    @GetMapping
    public ResponseEntity<ApiResponse<List<SetupDto.response>>> getSetupPublic() {
        return ResponseEntity.ok(ApiResponse.success("Success", setupService.getSetupPublic()));
    }

    @Cacheable("setup_admin")
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<List<SetupDto.response>>> getSetupAdmin() {
        return ResponseEntity.ok(ApiResponse.success("Success", setupService.getAdminSetup()));
    }

    @CacheEvict(value = {"setup_admin", "setup_public"}, allEntries = true)
    @PostMapping(value = "/admin/add-setup", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<SetupDto.response>> addSetup(@Validated(OnCreate.class) @ModelAttribute SetupDto entity) {
        return ResponseEntity.ok(ApiResponse.success("Success", setupService.addSetup(entity)));
    }

    @CacheEvict(value = {"setup_admin", "setup_public"}, allEntries = true)
    @PatchMapping(value = "/admin/edit-setup/{setupId}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<SetupDto.response>> editSetup(@PathVariable Integer setupId, @Validated(OnUpdate.class) @ModelAttribute SetupDto entity) {
        return ResponseEntity.ok(ApiResponse.success("Success", setupService.editSetup(setupId, entity)));
    }

    @CacheEvict(value = {"setup_admin", "setup_public"}, allEntries = true)
    @DeleteMapping("/admin/delete-setup/{setupId}")
    public ResponseEntity<ApiResponse<Void>> deleteSetup(@PathVariable Integer setupId) {
        setupService.deleteSetup(setupId);
        return ResponseEntity.ok(ApiResponse.success("Success", null));
    }
}
