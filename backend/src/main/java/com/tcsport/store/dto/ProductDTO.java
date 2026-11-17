package com.tcsport.store.dto;

import lombok.*;
import java.util.List;
import java.util.Map;

public class ProductDTO {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProductResponse {
        private Long id;
        private String sku;
        private String name;
        private String brand;
        private String category;
        private Long price;
        private Long costPrice;
        private Long originalPrice;
        private String discount;
        private Integer soldCount;
        private Double rating;
        private String badgeSale;
        private String badgeNew;
        private String image;
        private String color;
        private String description;
        private List<Integer> sizes;
        private Map<Integer, Integer> sizeStock; // { 38: 5, 39: 8, 40: 10, ... }
        private Integer totalStock;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProductRequest {
        private String sku;
        private String name;
        private String brand;
        private String category;
        private Long price;
        private Long costPrice;
        private Long originalPrice;
        private String discount;
        private String badgeSale;
        private String badgeNew;
        private String image;
        private String color;
        private String description;
        private List<Integer> sizes;
        private Map<Integer, Integer> sizeStock;
    }
}
