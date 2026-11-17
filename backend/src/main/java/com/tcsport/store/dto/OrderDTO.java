package com.tcsport.store.dto;

import lombok.*;
import java.util.List;

public class OrderDTO {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemRequest {
        private Long productId;
        private Integer size;
        private Integer quantity;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderCreateRequest {
        private String customerName;
        private String customerPhone;
        private String customerEmail;
        private String customerAddress;
        private String paymentMethod; // "cod" hoặc "qr"
        private String note;
        private List<OrderItemRequest> items;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemResponse {
        private Long id;
        private Long productId;
        private String sku;
        private String name;
        private String brand;
        private Integer size;
        private Long price;
        private Long costPrice;
        private Integer quantity;
        private String image;
        private Long subtotal;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TimelineItem {
        private String time;
        private String action;
        private String actor;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CustomerInfo {
        private String name;
        private String phone;
        private String email;
        private String address;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderResponse {
        private String id; // orderCode ví dụ TC88291
        private Long orderId; // internal DB id
        private String date; // "24/10/2026"
        private String time; // "14:30"
        private String status; // "Đang chuẩn bị hàng"
        private String statusClass;
        private String carrier;
        private String trackingCode;
        private String internalNote;
        private String note;
        private String total; // "4.780.000₫"
        private Long totalAmount;
        private Long costAmount;
        private String paymentMethod;
        private String paymentStatus;
        private String item; // Tiêu đề rút gọn của sản phẩm
        private Integer size;
        private String image;
        private CustomerInfo customer;
        private List<OrderItemResponse> items;
        private List<TimelineItem> timeline;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatusUpdateRequest {
        private String status; // "Đang giao hàng", "Đã giao thành công", "Đã hủy đơn"...
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ShippingUpdateRequest {
        private String carrier;
        private String trackingCode;
        private String internalNote;
    }
}
