package com.portfolio.backend.setup;

import com.portfolio.backend.auth.AuthModel;
import com.portfolio.backend.auth.AuthRepository;
import com.portfolio.backend.cloudinary.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class SetupService {

    private final SetupRepository setupRepository;
    private final SetupItemRepository setupItemRepository;
    private final AuthRepository authRepository;
    private final CloudinaryService cloudinaryService;

    @Transactional(readOnly = true)
    public List<SetupDto.CategoryResponse> getSetupPublic() {
        return setupRepository.findAllWithItems().stream()
                .map(this::mapToCategoryResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SetupDto.CategoryResponse> getAdminSetup() {
        var user = getAuthenticatedUser();
        return setupRepository.findAllByUserCodeWithItems(user.getCode()).stream()
                .map(this::mapToCategoryResponse)
                .toList();
    }

    public SetupDto.CategoryResponse addCategory(SetupDto.CategoryRequest request) {
        var user = getAuthenticatedUser();

        if (setupRepository.existsByUserCodeAndCategory(user.getCode(), request.category().trim())) {
            throw new IllegalArgumentException("Category '" + request.category() + "' already exists");
        }

        var entity = SetupModel.builder()
                .user(user)
                .category(request.category().trim())
                .description(request.description().trim())
                .build();

        var saved = setupRepository.save(entity);
        return mapToCategoryResponse(saved);
    }

    public SetupDto.CategoryResponse editCategory(Long categoryId, SetupDto.CategoryRequest request) {
        var user = getAuthenticatedUser();
        var category = setupRepository.findByUserAndId(user, categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        if (StringUtils.hasText(request.category())) {
            category.setCategory(request.category().trim());
        }
        if (StringUtils.hasText(request.description())) {
            category.setDescription(request.description().trim());
        }

        var updated = setupRepository.save(category);
        return mapToCategoryResponse(updated);
    }

    public void deleteCategory(Long categoryId) {
        var user = getAuthenticatedUser();
        var category = setupRepository.findByUserAndId(user, categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        // Cleanup images for all child items
        if (category.getItems() != null) {
            for (var item : category.getItems()) {
                cleanupItemImages(item);
            }
        }

        setupRepository.deleteByUserAndId(user, categoryId);
    }

    public SetupDto.ItemResponse addItem(SetupDto.ItemRequest request) {
        var user = getAuthenticatedUser();
        var category = setupRepository.findByUserAndId(user, request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        String lightImage = cloudinaryService.setupImageLight(request.imageLight());
        String darkImage = cloudinaryService.setupDarkImage(request.imageDark());

        var item = SetupItemModel.builder()
                .setup(category)
                .value(request.value().trim())
                .download(request.download().trim())
                .imageLight(lightImage)
                .imageDark(darkImage)
                .subValue(StringUtils.hasText(request.subValue()) ? request.subValue().trim() : null)
                .subDownload(StringUtils.hasText(request.subDownload()) ? request.subDownload().trim() : null)
                .build();

        var saved = setupItemRepository.save(item);
        return mapToItemResponse(saved);
    }

    public SetupDto.ItemResponse editItem(Long itemId, SetupDto.ItemRequest request) {
        var user = getAuthenticatedUser();
        var item = setupItemRepository.findByIdAndUser(itemId, user)
                .orElseThrow(() -> new IllegalArgumentException("Item not found"));

        if (request.categoryId() != null && !request.categoryId().equals(item.getSetup().getId())) {
            var newCategory = setupRepository.findByUserAndId(user, request.categoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Category not found"));
            item.setSetup(newCategory);
        }

        Optional.ofNullable(request.value()).filter(StringUtils::hasText).ifPresent(v -> item.setValue(v.trim()));
        Optional.ofNullable(request.download()).filter(StringUtils::hasText).ifPresent(d -> item.setDownload(d.trim()));
        Optional.ofNullable(request.subValue())
                .ifPresent(sv -> item.setSubValue(StringUtils.hasText(sv) ? sv.trim() : null));
        Optional.ofNullable(request.subDownload())
                .ifPresent(sd -> item.setSubDownload(StringUtils.hasText(sd) ? sd.trim() : null));

        if (request.imageLight() != null && !request.imageLight().isEmpty()) {
            cloudinaryService.imageRemove(item.getImageLight());
            String newLight = cloudinaryService.setupImageLight(request.imageLight());
            item.setImageLight(newLight);
        }

        if (request.imageDark() != null && !request.imageDark().isEmpty()) {
            if (item.getImageDark() != null) {
                cloudinaryService.imageRemove(item.getImageDark());
            }
            String newDark = cloudinaryService.setupDarkImage(request.imageDark());
            item.setImageDark(newDark);
        }

        var saved = setupItemRepository.save(item);
        return mapToItemResponse(saved);
    }

    public void deleteItem(Long itemId) {
        var user = getAuthenticatedUser();
        var item = setupItemRepository.findByIdAndUser(itemId, user)
                .orElseThrow(() -> new IllegalArgumentException("Item not found"));

        cleanupItemImages(item);
        setupItemRepository.delete(item);
    }

    private void cleanupItemImages(SetupItemModel item) {
        if (item.getImageLight() != null) {
            try {
                cloudinaryService.imageRemove(item.getImageLight());
            } catch (Exception ignored) {
            }
        }
        if (item.getImageDark() != null) {
            try {
                cloudinaryService.imageRemove(item.getImageDark());
            } catch (Exception ignored) {
            }
        }
    }

    private AuthModel getAuthenticatedUser() {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        return authRepository.findByCode(code)
                .orElseThrow(() -> new IllegalArgumentException("User not Found"));
    }

    private SetupDto.CategoryResponse mapToCategoryResponse(SetupModel s) {
        var items = s.getItems() != null
                ? s.getItems().stream().map(this::mapToItemResponse).toList()
                : List.<SetupDto.ItemResponse>of();

        return new SetupDto.CategoryResponse(
                s.getId(),
                s.getCategory(),
                s.getDescription(),
                items);
    }

    private SetupDto.ItemResponse mapToItemResponse(SetupItemModel i) {
        return new SetupDto.ItemResponse(
                i.getId(),
                i.getSetup() != null ? i.getSetup().getId() : null,
                i.getValue(),
                i.getDownload(),
                i.getImageLight(),
                i.getImageDark(),
                i.getSubValue(),
                i.getSubDownload());
    }
}
