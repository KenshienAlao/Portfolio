package com.portfolio.backend.setup;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "setup_item")
public class SetupItemModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "setup_id", referencedColumnName = "id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private SetupModel setup;

    @Column(nullable = false)
    private String value;

    @Column(nullable = false)
    private String download;

    @Column(nullable = false)
    private String imageLight;

    @Column
    private String imageDark;

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
    public SetupItemModel(SetupModel setup, String value, String download, String imageLight,
                          String imageDark, String subValue, String subDownload) {
        this.setup = setup;
        this.value = value;
        this.download = download;
        this.imageLight = imageLight;
        this.imageDark = imageDark;
        this.subValue = subValue;
        this.subDownload = subDownload;
    }
}
