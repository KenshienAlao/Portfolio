package com.portfolio.backend.setup;

import com.portfolio.backend.auth.AuthModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SetupItemRepository extends JpaRepository<SetupItemModel, Long> {

    @Query("SELECT i FROM SetupItemModel i WHERE i.id = :id AND i.setup.user = :user")
    Optional<SetupItemModel> findByIdAndUser(@Param("id") Long id, @Param("user") AuthModel user);

    @Query("SELECT i FROM SetupItemModel i WHERE i.id = :id AND i.setup.user.code = :code")
    Optional<SetupItemModel> findByIdAndUserCode(@Param("id") Long id, @Param("code") String code);
}
