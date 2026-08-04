package com.portfolio.backend.project;

import com.portfolio.backend.auth.AuthModel;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "projects")
public class ProjectModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AuthModel user;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String description;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "project_tags", joinColumns = @JoinColumn(name = "project_id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Column(name = "tag", nullable = false)
    private List<String> tags;

    @Column(nullable = false)
    private String github;

    @Column
    private String demo;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    @Builder
    public ProjectModel(AuthModel user, String title, String image, String description, List<String> tags,
            String github, String demo) {
        this.user = user;
        this.title = title;
        this.image = image;
        this.description = description;
        this.tags = tags;
        this.github = github;
        this.demo = demo;
    }
}
