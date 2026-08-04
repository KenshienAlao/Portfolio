package com.portfolio.backend.project;

import com.portfolio.backend.auth.AuthModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<ProjectModel, Long> {
    boolean existsByUserAndId(AuthModel user, Integer id);
    
    List<ProjectModel> findAllByUserCode(String userCode);
    Optional<ProjectModel> findByUserAndId(AuthModel user, Integer id);

    @Modifying                                                                                                                      
    @Transactional
    @Query("DELETE FROM ProjectModel p WHERE p.user = :user AND p.id = :id")
    void deleteByUserAndId(AuthModel user, Integer id);
}
