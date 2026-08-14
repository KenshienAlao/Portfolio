package com.portfolio.backend.setup;

import com.portfolio.backend.auth.AuthModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface SetupRepository extends JpaRepository<SetupModel, Long> {
    boolean existsByUserCodeAndCategory(String code, String category);
    boolean existsByUserAndId(AuthModel user, Integer id);
    Optional<SetupModel> findByUserAndId(AuthModel user, Integer id);
    List<SetupModel> findAllByUserCode(String userCode);

    @Modifying
    @Transactional
    @Query("DELETE FROM SetupModel s WHERE s.user = :user AND s.id = :id")
    void deleteByUserAndId(AuthModel user, Integer id);
}
