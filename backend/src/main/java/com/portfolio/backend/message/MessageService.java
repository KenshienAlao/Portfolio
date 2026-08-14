package com.portfolio.backend.message;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {

    private final MessageRepository messageRepository;

    public MessageDto.response sendMessage(MessageDto dto) {
        var entity = messageRepository.save(MessageModel.builder()
                .name(dto.name().trim())
                .email(dto.email().trim())
                .subject(dto.subject().trim())
                .message(dto.message().trim())
                .build());

        return mapToResponse(entity);
    }

    @Transactional(readOnly = true)
    public List<MessageDto.response> getMessages() {
        return messageRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public MessageDto.response toggleRead(Long messageId) {
        var msg = messageRepository.findById(messageId)
                .orElseThrow(() -> new IllegalArgumentException("Message not found"));
        msg.setIsRead(!Boolean.TRUE.equals(msg.getIsRead()));
        var saved = messageRepository.save(msg);
        return mapToResponse(saved);
    }

    public void deleteMessage(Long messageId) {
        try {
            messageRepository.deleteById(messageId);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Message not found");
        }
    }

    private MessageDto.response mapToResponse(MessageModel m) {
        return new MessageDto.response(
                m.getId(),
                m.getName(),
                m.getEmail(),
                m.getSubject(),
                m.getMessage(),
                m.getIsRead(),
                m.getCreatedAt()
        );
    }
}
