package com.tcsport.store.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_code", nullable = false, unique = true, length = 30)
    private String orderCode; // Ví dụ: TC88291, TC77104

    @Column(name = "customer_name", nullable = false, length = 100)
    private String customerName;

    @Column(name = "customer_phone", nullable = false, length = 20)
    private String customerPhone;

    @Column(name = "customer_email", length = 120)
    private String customerEmail;

    @Column(name = "customer_address", nullable = false, length = 255)
    private String customerAddress;

    @Column(name = "payment_method", length = 100)
    private String paymentMethod; // "Thanh toán COD khi nhận hàng" hoặc "Chuyển khoản QR Techcombank"

    @Column(name = "payment_status", length = 50)
    @Builder.Default
    private String paymentStatus = "Chờ thanh toán"; // "Chờ thanh toán" hoặc "Đã thanh toán"

    @Column(name = "shipping_status", length = 50)
    @Builder.Default
    private String shippingStatus = "Đang chuẩn bị hàng"; // "Đang chuẩn bị hàng", "Đang giao hàng", "Đã giao thành công", "Đã hủy đơn"

    @Column(name = "status_class", length = 50)
    @Builder.Default
    private String statusClass = "status-badge-shipping";

    @Column(length = 100)
    private String carrier; // "Viettel Post", "GHTK", "GHN"

    @Column(name = "tracking_code", length = 50)
    private String trackingCode; // "VTP-8829104VN"

    @Column(name = "total_amount", nullable = false)
    private Long totalAmount; // Tổng tiền thanh toán (VND)

    @Column(name = "cost_amount")
    private Long costAmount; // Tổng giá vốn đơn hàng (VND)

    @Column(length = 255)
    private String note; // Ghi chú của khách hàng

    @Column(name = "internal_note", length = 255)
    private String internalNote; // Ghi chú nội bộ Admin

    @Column(name = "created_at")
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @Builder.Default
    private List<OrderTimeline> timeline = new ArrayList<>();
}
