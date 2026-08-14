package com.portfolio.backend.skills;

import com.portfolio.backend.auth.AuthRepository;
import com.portfolio.backend.cloudinary.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;
    private final AuthRepository authRepository;
    private final CloudinaryService cloudinaryService;

    public List<SkillDto.response> getPublicSkill() {
        try {
            return skillRepository.findAll().stream().map(s -> new SkillDto.response(s.getId(), s.getName(),
                    s.getCategory(), s.getImageLight(), s.getImageDark())).toList();
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Skills not found");
        }
    }

    public List<SkillDto.response> getAdminSkill() {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        try {
            return skillRepository.findAllByUserCode(code).stream().map(s -> new SkillDto.response(s.getId(), s.getName(),
                    s.getCategory(), s.getImageLight(), s.getImageDark())).toList();
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Skills not found");
        }
    }

    public SkillDto.response addSkill(SkillDto entity) {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        var user = authRepository.findByCode(code).orElseThrow(() -> new IllegalArgumentException("User not Found"));

        if (skillRepository.existsByUserCodeAndNameAndCategory(code, entity.name(), entity.category())) {
            throw new IllegalArgumentException("This is already exists");
        }

        String lightImage = cloudinaryService.skillImageLight(entity.imageLight());
        String darkImage = cloudinaryService.skillDarkImage(entity.imageDark());

        var result = skillRepository.save(SkillModel.builder().user(user).name(entity.name())
                .category(entity.category()).imageLight(lightImage).imageDark(darkImage).build());

        return new SkillDto.response(
                result.getId(),
                result.getName(),
                result.getCategory(),
                result.getImageLight(),
                result.getImageDark());
    }

    public SkillDto.response editSkill(Integer skillId, SkillDto entity) {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        var user = authRepository.findByCode(code).orElseThrow(() -> new IllegalArgumentException("User not Found"));
        var skill = skillRepository.findByUserAndId(user, skillId)
                .orElseThrow(() -> new IllegalArgumentException("Skill not found"));

        Optional.ofNullable(entity.name()).ifPresent(skill::setName);
        Optional.ofNullable(entity.category()).ifPresent(skill::setCategory);
        if (entity.imageLight() != null && !entity.imageLight().isEmpty()) {
            cloudinaryService.imageRemove(skill.getImageLight());
            String image = cloudinaryService.skillImageLight(entity.imageLight());
            skill.setImageLight(image);
        }
        if (entity.imageDark() != null && !entity.imageDark().isEmpty()) {
            cloudinaryService.imageRemove(skill.getImageDark());
            String image = cloudinaryService.skillDarkImage(entity.imageDark());
            skill.setImageDark(image);
        }

        var result = skillRepository.save(skill);

        return new SkillDto.response(
                result.getId(),
                result.getName(),
                result.getCategory(),
                result.getImageLight(),
                result.getImageDark());
    }

    public void deleteSkill(Integer skillId) {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        var user = authRepository.findByCode(code).orElseThrow(() -> new IllegalArgumentException("User not Found"));
        try {
            skillRepository.deleteByUserAndId(user, skillId);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Skill not found");
        }

    }
}
