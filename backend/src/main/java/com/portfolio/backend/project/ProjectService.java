package com.portfolio.backend.project;

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
public class ProjectService {
w
    private final ProjectRepository projectRepository;
    private final AuthRepository authRepository;
    private final CloudinaryService cloudinaryService;

    @Transactional(readOnly = true)
    public List<ProjectDto.response> getProjects() {
        var userCode = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        return projectRepository.findAllByUserCode(userCode)
                .stream()
                .map(p -> new ProjectDto.response(p.getId(), p.getTitle(), p.getImage(), p.getDescription(),
                        p.getTags(), p.getGithub(), p.getDemo()))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProjectDto.response> getPublicProjects() {
        return projectRepository.findAll()
                .stream()
                .map(p -> new ProjectDto.response(p.getId(), p.getTitle(), p.getImage(), p.getDescription(),
                        p.getTags(), p.getGithub(), p.getDemo()))
                .toList();
    }

    public void deleteProject(Integer projectId) {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();

        var user = authRepository.findByCode(code).orElseThrow(() -> new IllegalArgumentException("User not found"));

        var image = projectRepository.findByUserAndId(user, projectId)
                .orElseThrow(() -> new IllegalArgumentException("Image not found"));

        if (!projectRepository.existsByUserAndId(user, projectId)) {
            throw new IllegalArgumentException("Project not found");
        }

        cloudinaryService.imageRemove(image.getImage());
        projectRepository.deleteByUserAndId(user, projectId);
    }

    public ProjectDto.response addProject(ProjectDto entity) {
        var userCode = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();

        var user = authRepository.findByCode(userCode)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String imageUrl = cloudinaryService.projectImage(entity.image());

        var result = projectRepository.save(ProjectModel.builder()
                .user(user)
                .title(entity.title())
                .image(imageUrl)
                .description(entity.description())
                .tags(entity.tags())
                .github(entity.github())
                .demo(StringUtils.hasText(entity.demo()) ? entity.demo() : null)
                .build());

        return new ProjectDto.response(
                result.getId(),
                result.getTitle(),
                result.getImage(),
                result.getDescription(),
                result.getTags(),
                result.getGithub(),
                result.getDemo());
    }

    public ProjectDto.response editProject(Integer projectId, ProjectDto entity) {
        var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
        var user = authRepository.findByCode(code).orElseThrow(() -> new IllegalArgumentException("User not found"));
        var project = projectRepository.findByUserAndId(user, projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));

        Optional.ofNullable(entity.title()).ifPresent(project::setTitle);
        if (entity.image() != null && !entity.image().isEmpty()) {
            cloudinaryService.imageRemove(project.getImage());
            String image = cloudinaryService.projectImage(entity.image());
            project.setImage(image);
        }
        Optional.ofNullable(entity.description()).ifPresent(project::setDescription);
        Optional.ofNullable(entity.tags()).ifPresent(project::setTags);
        Optional.ofNullable(entity.github()).ifPresent(project::setGithub);
        Optional.ofNullable(entity.demo()).ifPresent(project::setDemo);

        var result = projectRepository.save(project);

        return new ProjectDto.response(
                result.getId(),
                result.getTitle(),
                result.getImage(),
                result.getDescription(),
                result.getTags(),
                result.getGithub(),
                result.getDemo());
    }

}
