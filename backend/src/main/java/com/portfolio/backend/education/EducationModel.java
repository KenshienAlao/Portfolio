package com.portfolio.backend.education;


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
@Table(name = "education")
public class EducationModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AuthModel user;

    @Column(nullable = false)
    private String school;

    @Column(nullable = false)
    private String degree;

    @Column(nullable = false)
    private String yearStart;

    @Column(nullable = false)
    private String yearEnd;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String location;

    @UpdateTimestamp
    private Instant updateAt;

    @CreationTimestamp
    private Instant createdAt;

    @Builder
    public EducationModel(AuthModel user, String school, String degree, String yearStart, String yearEnd, String description, String location) {
        this.user = user;
        this.school = school;
        this.degree = degree;
        this.yearStart = yearStart;
        this.yearEnd = yearEnd;
        this.description = description;
        this.location = location;
    }
}
