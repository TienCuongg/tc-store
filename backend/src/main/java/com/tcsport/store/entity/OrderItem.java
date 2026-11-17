package com.tcsport.store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "product_sku", length = 60)
    private String sku;

    @Column(name = "product_name", nullable = false, length = 200)
    private String name;

    @Column(length = 50)
    private String brand;

    @Column(nullable = false)
    private Integer size;

    @Column(nullable = false)
    private Long price;

    @Column(name = "cost_price")
    private Long costPrice;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "image_url", length = 500)
    private String image;

    @Column(nullable = false)
    private Long subtotal;
}
