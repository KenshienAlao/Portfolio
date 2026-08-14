package com.portfolio.backend.message;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<MessageModel, Long> {
    List<MessageModel> findAllByOrderByCreatedAtDesc();
    long countByIsReadFalse();
}
