package com.tcsport.store.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "brands")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name; // Nike, Adidas, Asics, Puma, Lacoste, Jordan, TC Sport

    @Column(length = 100)
    private String origin; // Mỹ (USA), Đức (Germany), Nhật Bản (Japan)...

    @Column(length = 255)
    private String description;
}
