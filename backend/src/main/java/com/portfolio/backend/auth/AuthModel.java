package com.portfolio.backend.auth;


import com.portfolio.backend.education.EducationModel;
import com.portfolio.backend.project.ProjectModel;
import com.portfolio.backend.setup.SetupModel;
import com.portfolio.backend.skills.SkillModel;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "admin")
public class AuthModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectModel> projects;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EducationModel> educations;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SkillModel> skills;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SetupModel> setups;

    @Column(unique = true, nullable = false)
    private String code;

    @Column(unique = true, nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private Integer singleAccountLock = 1;

    @Builder
    public AuthModel(String code, String password) {
        this.code = code;
        this.password = password;
        this.singleAccountLock = 1;
    }
}
