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
    public ResponseEntity<ApiResponse<List<SetupDto.CategoryResponse>>> getSetupPublic() {
        return ResponseEntity.ok(ApiResponse.success("Success", setupService.getSetupPublic()));
    }

    @Cacheable("setup_admin")
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<List<SetupDto.CategoryResponse>>> getSetupAdmin() {
        return ResponseEntity.ok(ApiResponse.success("Success", setupService.getAdminSetup()));
    }

    @CacheEvict(value = { "setup_admin", "setup_public" }, allEntries = true)
    @PostMapping("/admin/category")
    public ResponseEntity<ApiResponse<SetupDto.CategoryResponse>> addCategory(
            @Validated(OnCreate.class) @RequestBody SetupDto.CategoryRequest entity) {
        return ResponseEntity.ok(ApiResponse.success("Category added successfully", setupService.addCategory(entity)));
    }

    @CacheEvict(value = { "setup_admin", "setup_public" }, allEntries = true)
    @PatchMapping("/admin/category/{categoryId}")
    public ResponseEntity<ApiResponse<SetupDto.CategoryResponse>> editCategory(
            @PathVariable Long categoryId,
            @Validated(OnUpdate.class) @RequestBody SetupDto.CategoryRequest entity) {
        return ResponseEntity.ok(
                ApiResponse.success("Category updated successfully", setupService.editCategory(categoryId, entity)));
    }

    @CacheEvict(value = { "setup_admin", "setup_public" }, allEntries = true)
    @DeleteMapping("/admin/category/{categoryId}")
    public ResponseEntity<ApiResponse<Void>> deleteCategory(@PathVariable Long categoryId) {
        setupService.deleteCategory(categoryId);
        return ResponseEntity.ok(ApiResponse.success("Category deleted successfully", null));
    }

    @CacheEvict(value = { "setup_admin", "setup_public" }, allEntries = true)
    @PostMapping(value = "/admin/item", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<SetupDto.ItemResponse>> addItem(
            @Validated(OnCreate.class) @ModelAttribute SetupDto.ItemRequest entity) {
        return ResponseEntity.ok(ApiResponse.success("Item added successfully", setupService.addItem(entity)));
    }

    @CacheEvict(value = { "setup_admin", "setup_public" }, allEntries = true)
    @PatchMapping(value = "/admin/item/{itemId}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<SetupDto.ItemResponse>> editItem(
            @PathVariable Long itemId,
            @Validated(OnUpdate.class) @ModelAttribute SetupDto.ItemRequest entity) {
        return ResponseEntity
                .ok(ApiResponse.success("Item updated successfully", setupService.editItem(itemId, entity)));
    }

    @CacheEvict(value = { "setup_admin", "setup_public" }, allEntries = true)
    @DeleteMapping("/admin/item/{itemId}")
    public ResponseEntity<ApiResponse<Void>> deleteItem(@PathVariable Long itemId) {
        setupService.deleteItem(itemId);
        return ResponseEntity.ok(ApiResponse.success("Item deleted successfully", null));
    }
}
