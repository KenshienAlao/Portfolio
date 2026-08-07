package com.portfolio.backend.education;

import com.portfolio.backend.auth.AuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class EducationService {

        private final EducationRepository educationRepository;
        private final AuthRepository authRepository;

        @Transactional(readOnly = true)
        public List<EducationDto.response> getEducation() {
                var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
                return educationRepository.findAllByUserCode(code)
                                .stream()
                                .map(e -> new EducationDto.response(
                                                e.getId(),
                                                e.getSchool(),
                                                e.getDegree(),
                                                e.getYearStart(),
                                                e.getYearEnd(),
                                                e.getDescription(),
                                                e.getLocation()))
                                .toList();
        }

        @Transactional(readOnly = true)
        public List<EducationDto.response> getEducationPublic() {
                return educationRepository.findAll().stream()
                                .map(e -> new EducationDto.response(e.getId(), e.getSchool(), e.getDegree(),
                                                e.getYearStart(), e.getYearEnd(), e.getDescription(), e.getLocation()))
                                .toList();
        }

        public EducationDto.response addEducation(EducationDto entity) {
                var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
                var user = authRepository.findByCode(code)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));

                if (educationRepository.existsByUserCodeAndSchoolAndDegreeAndYearStartAndYearEndAndLocation(code,
                                entity.school(), entity.degree(), entity.yearStart(), entity.yearEnd(),
                                entity.location())) {
                        throw new IllegalArgumentException("This is already exists");
                }

                var result = educationRepository.save(EducationModel.builder()
                                .user(user)
                                .school(entity.school())
                                .degree(entity.degree())
                                .yearStart(entity.yearStart())
                                .yearEnd(entity.yearEnd())
                                .description(entity.description())
                                .location(entity.location())
                                .build());

                return new EducationDto.response(
                                result.getId(),
                                result.getSchool(),
                                result.getDegree(),
                                result.getYearStart(),
                                result.getYearEnd(),
                                result.getDescription(),
                                result.getLocation());
        }

        public EducationDto.response editEducationById(EducationDto entity, Integer educationId) {
                var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();
                var userCode = authRepository.findByCode(code)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));
                System.out.println("pass user code");
                var education = educationRepository.findByUserAndId(userCode, educationId)
                                .orElseThrow(() -> new IllegalArgumentException("Education not found"));
                System.out.println("pass education");
                Optional.ofNullable(entity.school()).ifPresent(education::setSchool);
                Optional.ofNullable(entity.degree()).ifPresent(education::setDegree);
                Optional.ofNullable(entity.yearStart()).ifPresent(education::setYearStart);
                Optional.ofNullable(entity.yearEnd()).ifPresent(education::setYearEnd);
                Optional.ofNullable(entity.description()).ifPresent(education::setDescription);
                Optional.ofNullable(entity.location()).ifPresent(education::setLocation);
                System.out.println("Optional");

                var result = educationRepository.save(education);

                return new EducationDto.response(
                                result.getId(),
                                result.getSchool(),
                                result.getDegree(),
                                result.getYearStart(),
                                result.getYearEnd(),
                                result.getDescription(),
                                result.getLocation());
        }

        public void deleteEducationById(Integer educationId) {
                var code = Objects.requireNonNull(SecurityContextHolder.getContext().getAuthentication()).getName();

                var user = authRepository.findByCode(code)
                                .orElseThrow(() -> new IllegalArgumentException("User not found"));

                if (!educationRepository.existsByUserCodeAndId(code, educationId)) {
                        throw new IllegalArgumentException("Education does not exist");
                }
                educationRepository.deleteByUserAndId(user, educationId);
        }
}
