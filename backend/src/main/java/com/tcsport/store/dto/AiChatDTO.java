package com.tcsport.store.dto;

import lombok.*;
import java.util.List;

public class AiChatDTO {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ChatMessage {
        private String role; // "user" hoặc "model"
        private String text;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AiChatRequest {
        private String message;
        private List<ChatMessage> history;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AiChatResponse {
        private String reply;
        private List<Long> suggestedProductIds;
        private List<ProductDTO.ProductResponse> suggestedProducts;
        private String activeModel;
        private int keyIndexUsed;
    }
}
