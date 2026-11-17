package com.tcsport.store.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 60)
    private String sku; // Mã SKU sản phẩm (ví dụ: NK-PEG40-BLU)

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 50)
    private String brand; // Nike, Adidas, Asics...

    @Column(nullable = false, length = 50)
    private String category; // running, lifestyle, pickleball...

    @Column(nullable = false)
    private Long price; // Giá bán lẻ (VND)

    @Column(name = "cost_price")
    private Long costPrice; // Giá vốn nhập kho (VND)

    @Column(name = "original_price")
    private Long originalPrice; // Giá niêm yết cũ trước sale

    @Column(length = 20)
    private String discount; // "-40%", "-15%"

    @Column(name = "sold_count")
    @Builder.Default
    private Integer soldCount = 0;

    @Builder.Default
    private Double rating = 5.0;

    @Column(name = "badge_sale", length = 50)
    private String badgeSale;

    @Column(name = "badge_new", length = 50)
    private String badgeNew;

    @Column(name = "image_url", length = 500)
    private String image;

    @Column(length = 100)
    private String color;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<ProductSize> sizes = new ArrayList<>();
}
