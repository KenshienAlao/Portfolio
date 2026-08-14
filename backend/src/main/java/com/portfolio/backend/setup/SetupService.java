package com.portfolio.backend.setup;

import com.portfolio.backend.auth.AuthRepository;
import com.portfolio.backend.cloudinary.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
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
    private final AuthRepository authRepository;
    private final CloudinaryService cloudinaryService;

    @Transactional(readOnly = true)
    public List<SetupDto.response> getSetupPublic() {
        return setupRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<SetupDto.response> getAdminSetup() {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        return setupRepository.findAllByUserCode(code).stream()
                .map(this::mapToResponse)
                .toList();
    }

    public SetupDto.response addSetup(SetupDto entity) {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        var user = authRepository.findByCode(code)
                .orElseThrow(() -> new IllegalArgumentException("User not Found"));

        if (setupRepository.existsByUserCodeAndCategory(code, entity.category())) {
            throw new IllegalArgumentException("Setup item for this category already exists");
        }

        String lightImage = cloudinaryService.setupImageLight(entity.imageLight());
        String darkImage = cloudinaryService.setupDarkImage(entity.imageDark());

        var result = setupRepository.save(SetupModel.builder()
                .user(user)
                .category(entity.category())
                .imageLight(lightImage)
                .imageDark(darkImage)
                .values(entity.values())
                .description(entity.description())
                .downloads(entity.downloads())
                .subValue(StringUtils.hasText(entity.subValue()) ? entity.subValue() : null)
                .subDownload(StringUtils.hasText(entity.subDownload()) ? entity.subDownload() : null)
                .build());

        return mapToResponse(result);
    }

    public SetupDto.response editSetup(Integer setupId, SetupDto entity) {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        var user = authRepository.findByCode(code)
                .orElseThrow(() -> new IllegalArgumentException("User not Found"));
        var setup = setupRepository.findByUserAndId(user, setupId)
                .orElseThrow(() -> new IllegalArgumentException("Setup not found"));

        Optional.ofNullable(entity.category()).ifPresent(setup::setCategory);
        Optional.ofNullable(entity.description()).ifPresent(setup::setDescription);
        Optional.ofNullable(entity.values()).ifPresent(setup::setValues);
        Optional.ofNullable(entity.downloads()).ifPresent(setup::setDownloads);
        Optional.ofNullable(entity.subValue()).ifPresent(setup::setSubValue);
        Optional.ofNullable(entity.subDownload()).ifPresent(setup::setSubDownload);

        if (entity.imageLight() != null && !entity.imageLight().isEmpty()) {
            cloudinaryService.imageRemove(setup.getImageLight());
            String image = cloudinaryService.setupImageLight(entity.imageLight());
            setup.setImageLight(image);
        }
        if (entity.imageDark() != null && !entity.imageDark().isEmpty()) {
            if (setup.getImageDark() != null) {
                cloudinaryService.imageRemove(setup.getImageDark());
            }
            String image = cloudinaryService.setupDarkImage(entity.imageDark());
            setup.setImageDark(image);
        }

        var result = setupRepository.save(setup);
        return mapToResponse(result);
    }

    public void deleteSetup(Integer setupId) {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        var user = authRepository.findByCode(code)
                .orElseThrow(() -> new IllegalArgumentException("User not Found"));

        var setup = setupRepository.findByUserAndId(user, setupId)
                .orElseThrow(() -> new IllegalArgumentException("Setup not found"));

        if (setup.getImageLight() != null) {
            try {
                cloudinaryService.imageRemove(setup.getImageLight());
            } catch (Exception ignored) {}
        }
        if (setup.getImageDark() != null) {
            try {
                cloudinaryService.imageRemove(setup.getImageDark());
            } catch (Exception ignored) {}
        }

        try {
            setupRepository.deleteByUserAndId(user, setupId);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Setup not found");
        }
    }

    private SetupDto.response mapToResponse(SetupModel s) {
        return new SetupDto.response(
                s.getId(),
                s.getCategory(),
                s.getImageLight(),
                s.getImageDark(),
                s.getValues(),
                s.getDescription(),
                s.getDownloads(),
                s.getSubValue(),
                s.getSubDownload()
        );
    }
}
