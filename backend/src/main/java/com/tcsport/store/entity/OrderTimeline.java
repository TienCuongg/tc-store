package com.tcsport.store.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "order_timeline")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderTimeline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @Column(nullable = false, length = 50)
    private String time; // "24/10/2026 14:30"

    @Column(nullable = false, length = 255)
    private String action; // "Khách hàng đặt đơn hàng trực tuyến"

    @Column(length = 100)
    private String actor; // "Khách hàng", "Admin", "Kho Xã Đàn"
}
