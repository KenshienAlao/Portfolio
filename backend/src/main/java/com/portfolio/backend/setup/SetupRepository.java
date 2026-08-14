package com.portfolio.backend.setup;

import com.portfolio.backend.auth.AuthModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface SetupRepository extends JpaRepository<SetupModel, Long> {

    @Query("SELECT DISTINCT s FROM SetupModel s LEFT JOIN FETCH s.items ORDER BY s.createdAt ASC")
    List<SetupModel> findAllWithItems();

    @Query("SELECT DISTINCT s FROM SetupModel s LEFT JOIN FETCH s.items WHERE s.user.code = :userCode ORDER BY s.createdAt ASC")
    List<SetupModel> findAllByUserCodeWithItems(@Param("userCode") String userCode);

    boolean existsByUserCodeAndCategory(String userCode, String category);

    Optional<SetupModel> findByUserAndId(AuthModel user, Long id);

    @Modifying
    @Transactional
    @Query("DELETE FROM SetupModel s WHERE s.user = :user AND s.id = :id")
    void deleteByUserAndId(@Param("user") AuthModel user, @Param("id") Long id);
}
