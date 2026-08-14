package com.portfolio.backend.skills;

import com.portfolio.backend.auth.AuthModel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "skill")
public class SkillModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AuthModel user;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false, unique = true)
    private String imageLight;

    @Column(unique = true)
    private String imageDark;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedTime;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdTime;

    @Builder
    public SkillModel(AuthModel user, String name, String category, String imageLight, String imageDark) {
        this.user = user;
        this.name = name;
        this.category = category;
        this.imageLight = imageLight;
        this.imageDark = imageDark;
    }

}
