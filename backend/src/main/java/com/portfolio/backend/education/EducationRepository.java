package com.portfolio.backend.education;

import com.portfolio.backend.auth.AuthModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface EducationRepository extends JpaRepository<EducationModel, Long> {
    boolean existsByUserCodeAndSchoolAndDegreeAndYearStartAndYearEndAndLocation(String userCode, String school,
            String degree, String yearStart, String yearEnd, String location);

    Optional<EducationModel> findByUserAndId(AuthModel user, Integer id);

    boolean existsByUserCodeAndId(String userCode, Integer Id);
    List<EducationModel> findAllByUserCode(String userCode);

    @Modifying
    @Transactional
    @Query("DELETE FROM EducationModel e WHERE e.user = :user AND e.id = :id")
    void deleteByUserAndId(AuthModel user, Integer id);
}
