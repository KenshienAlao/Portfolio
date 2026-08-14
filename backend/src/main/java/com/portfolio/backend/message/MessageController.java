package com.portfolio.backend.message;

import com.portfolio.backend.common.ApiResponse;
import com.portfolio.backend.common.validation.OnCreate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/message")
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<ApiResponse<MessageDto.response>> sendMessage(
            @Validated(OnCreate.class) @RequestBody MessageDto dto) {
        return ResponseEntity.ok(ApiResponse.success("Message sent successfully", messageService.sendMessage(dto)));
    }

    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<List<MessageDto.response>>> getAdminMessages() {
        return ResponseEntity.ok(ApiResponse.success("Success", messageService.getMessages()));
    }

    @PatchMapping("/admin/{messageId}/toggle-read")
    public ResponseEntity<ApiResponse<MessageDto.response>> toggleRead(@PathVariable Long messageId) {
        return ResponseEntity.ok(ApiResponse.success("Success", messageService.toggleRead(messageId)));
    }

    @DeleteMapping("/admin/{messageId}")
    public ResponseEntity<ApiResponse<Void>> deleteMessage(@PathVariable Long messageId) {
        messageService.deleteMessage(messageId);
        return ResponseEntity.ok(ApiResponse.success("Success", null));
    }
}
