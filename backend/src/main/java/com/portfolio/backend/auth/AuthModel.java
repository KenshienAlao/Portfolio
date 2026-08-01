package com.portfolio.backend.auth;


import jakarta.persistence.*;
import lombok.*;

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

    @Column(unique = true, nullable = false)
    private String code;

    @Column(unique = true, nullable = false)
    private String password;

    @Builder
    public AuthModel(String code, String password) {
        this.code = code;
        this.password = password;
    }
}
