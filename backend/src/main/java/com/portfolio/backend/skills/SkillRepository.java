package com.portfolio.backend.skills;

import com.portfolio.backend.auth.AuthModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends JpaRepository<SkillModel, Long> {
    boolean existsByUserCodeAndNameAndCategory(String code, String name, String category);
    Optional<SkillModel> findByUserAndId(AuthModel user, Integer id);
    List<SkillModel> findAllByUserCode(String userCode);

    @Modifying
    @Transactional
    @Query("DELETE FROM SkillModel s WHERE s.user = :user AND s.id = :id")
    void deleteByUserAndId(AuthModel user, Integer id);

}
