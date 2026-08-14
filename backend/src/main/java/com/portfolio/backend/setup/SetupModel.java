package com.portfolio.backend.setup;

import com.portfolio.backend.auth.AuthModel;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.List;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "setup")
public class SetupModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private AuthModel user;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String imageLight;

    @Column
    private String imageDark;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "setup_values", joinColumns = @JoinColumn(name = "setup_id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Column(name = "value_item", nullable = false)
    private List<String> values;

    @Column(nullable = false)
    private String description;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "setup_downloads", joinColumns = @JoinColumn(name = "setup_id"))
    @OnDelete(action = OnDeleteAction.CASCADE)
    @Column(name = "download_url", nullable = false)
    private List<String> downloads;

    @Column
    private String subValue;

    @Column
    private String subDownload;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private Instant updatedAt;

    @Builder
    public SetupModel(AuthModel user, String category, String imageLight, String imageDark,
                      List<String> values, String description, List<String> downloads,
                      String subValue, String subDownload) {
        this.user = user;
        this.category = category;
        this.imageLight = imageLight;
        this.imageDark = imageDark;
        this.values = values;
        this.description = description;
        this.downloads = downloads;
        this.subValue = subValue;
        this.subDownload = subDownload;
    }
}
