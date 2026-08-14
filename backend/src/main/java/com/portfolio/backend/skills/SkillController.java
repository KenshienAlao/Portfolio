package com.portfolio.backend.skills;

import com.portfolio.backend.common.ApiResponse;
import com.portfolio.backend.common.validation.OnCreate;
import com.portfolio.backend.common.validation.OnUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/skill")
public class SkillController {

    private final SkillService skillService;

    @Cacheable("skill_public")
    @GetMapping
    public ResponseEntity<ApiResponse<List<SkillDto.response>>> getPublicSkill(){
        return ResponseEntity.ok(ApiResponse.success("Success", skillService.getPublicSkill()));
    }

    @Cacheable("skill_admin")
    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<List<SkillDto.response>>> getAdminSkill(){
        return ResponseEntity.ok(ApiResponse.success("Success", skillService.getAdminSkill()));
    }

    @CacheEvict(value = {"skill_admin", "skill_public"}, allEntries = true)
    @PostMapping(value = "/admin/add-skill", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<SkillDto.response>> addSkill(@Validated(OnCreate.class) @ModelAttribute SkillDto entity) {
        return ResponseEntity.ok(ApiResponse.success("Success", skillService.addSkill(entity)));
    }

    @CacheEvict(value = {"skill_admin", "skill_public"}, allEntries = true)
    @PatchMapping(value = "/admin/edit-skill/{skillId}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<SkillDto.response>> editSkill(@PathVariable Integer skillId, @Validated(OnUpdate.class) @ModelAttribute SkillDto entity){
        return ResponseEntity.ok(ApiResponse.success("Success", skillService.editSkill(skillId, entity)));
    }

    @CacheEvict(value = {"skill_admin", "skill_public"}, allEntries = true)
    @DeleteMapping("/admin/delete-skill/{skillId}")
    public ResponseEntity<ApiResponse<Void>> deleteSkill(@PathVariable Integer skillId) {
        skillService.deleteSkill(skillId);
        return ResponseEntity.ok(ApiResponse.success("Success", null ));
    }
}
