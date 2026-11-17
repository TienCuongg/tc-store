package com.tcsport.store.dto;

import lombok.*;
import java.util.List;

public class AnalyticsDTO {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CustomerOverview {
        private String name;
        private String phone;
        private String email;
        private String address;
        private Long totalSpent;
        private Integer orderCount;
        private String lastOrderDate;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OverviewResponse {
        private Long grossRevenue;
        private Long grossProfit;
        private Integer profitMargin;
        private Long aov; // Average Order Value
        private Integer totalOrders;
        private Integer pendingCount;
        private Integer shippingCount;
        private Integer completedCount;
        private Integer cancelledCount;
        private Integer totalCustomers;
        private List<CustomerOverview> customerList;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DailyRevenuePoint {
        private String dayKey; // "19/10/2026"
        private String dateIso; // "2026-10-19"
        private String label; // "19/10 (Th 2)"
        private Long revenue; // Doanh thu VND
        private Long profit; // Lợi nhuận gộp VND
        private Integer ordersCount; // Số đơn hàng
        private Integer pairsCount; // Số đôi giày bán được
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProductDailySummary {
        private Long id;
        private String name;
        private String brand;
        private Integer size;
        private Integer qty;
        private Long price;
        private Long revenue;
        private String image;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderDailySummary {
        private String id;
        private String time;
        private String customer;
        private String itemsDesc;
        private String payment;
        private String status;
        private Long total;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DailySalesDetailResponse {
        private String dateLabel;
        private List<ProductDailySummary> products;
        private List<OrderDailySummary> orders;
    }
}
