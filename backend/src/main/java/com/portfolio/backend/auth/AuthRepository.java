package com.portfolio.backend.auth;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthRepository extends JpaRepository<AuthModel, Long> {
    boolean existsByCode(String code);
    Optional<AuthModel> findByCode(String code);
}
