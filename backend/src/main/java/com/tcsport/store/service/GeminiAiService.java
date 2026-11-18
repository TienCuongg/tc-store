package com.tcsport.store.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tcsport.store.dto.AiChatDTO;
import com.tcsport.store.dto.ProductDTO;
import com.tcsport.store.entity.Product;
import com.tcsport.store.entity.ProductSize;
import com.tcsport.store.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiAiService {

    private final ProductRepository productRepository;
    private final ProductService productService;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.keys}")
    private String apiKeysConfig;

    @Value("${gemini.api.model:gemini-3.5-flash-lite}")
    private String geminiModel;

    private final AtomicInteger currentKeyIndex = new AtomicInteger(0);
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .build();

    public AiChatDTO.AiChatResponse chat(AiChatDTO.AiChatRequest request) {
        String userQuery = (request.getMessage() != null) ? request.getMessage().trim() : "";
        if (userQuery.isEmpty()) {
            return AiChatDTO.AiChatResponse.builder()
                    .reply("Chào bạn! Hãy cho mình biết bạn đang tìm giày thể thao loại nào (chạy bộ, pickleball, đi làm...) hoặc cần tư vấn size nhé!")
                    .suggestedProductIds(Collections.emptyList())
                    .suggestedProducts(Collections.emptyList())
                    .build();
        }

        // Lấy danh sách API keys
        List<String> apiKeys = Arrays.stream(apiKeysConfig.split(","))
                .map(String::trim)
                .filter(k -> !k.isEmpty())
                .collect(Collectors.toList());

        if (apiKeys.isEmpty()) {
            return fallbackLocalSearch(userQuery);
        }

        // 1. Chuẩn bị context sản phẩm súc tích từ Live MySQL Database
        List<Product> products = productRepository.findAll();
        String catalogSnapshot = buildCompactCatalogSnapshot(products);

        // 2. Xây dựng System Prompt tối ưu token, cấm lan man
        String systemInstructionText = """
                Bạn là Trợ lý AI chuyên gia tư vấn giày thể thao tại TC SPORT (Việt Nam).
                KHO HÀNG THỰC TẾ CỦA SHOP HIỆN TẠI:
                """ + catalogSnapshot + """
                
                QUY TẮC CỐT LÕI (BẮT BUỘC TUÂN THỦ):
                1. TẬP TRUNG VÀO TRỌNG TÂM CÂU HỎI: phân tích ngắn gọn lý do vì sao các mẫu giày này phù hợp với nhu cầu của khách (công nghệ đế/đệm, bám sân, mức giá, đối tượng tập luyện).
                2. GỢI Ý ĐẦY ĐỦ VÀ ĐA DẠNG: Hãy gợi ý ĐẦY ĐỦ từ 3 đến 6 sản phẩm phù hợp nhất với yêu cầu của khách hàng (đa dạng thương hiệu và phân khúc giá).
                3. CHỈ gợi ý các ID sản phẩm CÓ THỰC trong kho ở trên.
                4. LUÔN TRẢ VỀ ĐỊNH DẠNG JSON DUY NHẤT theo schema sau:
                {
                  "reply": "Lời tư vấn chi tiết, súc tích đi thẳng vào từng lựa chọn...",
                  "suggestedProductIds": [id1, id2, id3, id4, id5]
                }
                """;

        // Thử lần lượt các API keys nếu gặp lỗi (Quota / RateLimit / Server error)
        int totalKeys = apiKeys.size();
        for (int attempt = 0; attempt < totalKeys; attempt++) {
            int keyIdx = (currentKeyIndex.get() + attempt) % totalKeys;
            String apiKey = apiKeys.get(keyIdx);

            try {
                AiChatDTO.AiChatResponse response = callGeminiApi(apiKey, geminiModel, systemInstructionText, request);
                if (response != null && response.getReply() != null && !response.getReply().isBlank()) {
                    currentKeyIndex.set(keyIdx); // Lưu lại key vừa thành công
                    response.setActiveModel(geminiModel);
                    response.setKeyIndexUsed(keyIdx + 1);

                    // Nạp chi tiết sản phẩm gợi ý từ database cho frontend render card
                    if (response.getSuggestedProductIds() != null && !response.getSuggestedProductIds().isEmpty()) {
                        List<ProductDTO.ProductResponse> suggestedList = new ArrayList<>();
                        for (Long id : response.getSuggestedProductIds()) {
                            try {
                                suggestedList.add(productService.getProductById(id));
                            } catch (Exception ignored) {}
                        }
                        response.setSuggestedProducts(suggestedList);
                    }
                    return response;
                }
            } catch (Exception e) {
                log.warn("⚠️ [Gemini AI] Lỗi khi gọi với API Key #{} ({}): {}. Đang tự động chuyển sang key tiếp theo...",
                        (keyIdx + 1), maskKey(apiKey), e.getMessage());
            }
        }

        // Nếu tất cả API keys đều bị lỗi/hết quota, chuyển sang Fallback Engine dựa trên Database
        log.error("❌ Tất cả {} Gemini API keys đều không khả dụng. Kích hoạt Fallback Engine cục bộ.", totalKeys);
        return fallbackLocalSearch(userQuery);
    }

    private AiChatDTO.AiChatResponse callGeminiApi(String apiKey, String model, String systemPrompt, AiChatDTO.AiChatRequest request) throws Exception {
        String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey;

        // Xây dựng danh sách contents (kèm lịch sử hội thoại gần nhất nếu có)
        List<Map<String, Object>> contents = new ArrayList<>();
        if (request.getHistory() != null && !request.getHistory().isEmpty()) {
            // Chỉ lấy tối đa 4 tin nhắn gần nhất để tiết kiệm token
            int start = Math.max(0, request.getHistory().size() - 4);
            for (int i = start; i < request.getHistory().size(); i++) {
                AiChatDTO.ChatMessage hm = request.getHistory().get(i);
                if (hm.getText() != null && !hm.getText().isBlank()) {
                    contents.add(Map.of(
                            "role", "model".equalsIgnoreCase(hm.getRole()) ? "model" : "user",
                            "parts", List.of(Map.of("text", hm.getText().trim()))
                    ));
                }
            }
        }

        // Thêm câu hỏi hiện tại
        contents.add(Map.of(
                "role", "user",
                "parts", List.of(Map.of("text", request.getMessage().trim()))
        ));

        // Request Body cho Gemini
        Map<String, Object> requestBodyMap = new HashMap<>();
        requestBodyMap.put("contents", contents);
        requestBodyMap.put("systemInstruction", Map.of(
                "parts", List.of(Map.of("text", systemPrompt))
        ));
        requestBodyMap.put("generationConfig", Map.of(
                "temperature", 0.3,
                "maxOutputTokens", 500,
                "responseMimeType", "application/json"
        ));

        String requestJson = objectMapper.writeValueAsString(requestBodyMap);

        HttpRequest httpRequest = HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .header("Content-Type", "application/json")
                .timeout(Duration.ofSeconds(15))
                .POST(HttpRequest.BodyPublishers.ofString(requestJson, StandardCharsets.UTF_8))
                .build();

        HttpResponse<String> httpResponse = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        if (httpResponse.statusCode() != 200) {
            throw new RuntimeException("HTTP Status " + httpResponse.statusCode() + ": " + httpResponse.body());
        }

        JsonNode root = objectMapper.readTree(httpResponse.body());
        JsonNode candidates = root.path("candidates");
        if (!candidates.isArray() || candidates.isEmpty()) {
            throw new RuntimeException("Không có candidates từ Gemini API: " + httpResponse.body());
        }

        JsonNode parts = candidates.get(0).path("content").path("parts");
        if (!parts.isArray() || parts.isEmpty()) {
            throw new RuntimeException("Parts rỗng trong Gemini API response");
        }

        String rawOutput = parts.get(0).path("text").asText("");
        return parseGeminiOutput(rawOutput);
    }

    private AiChatDTO.AiChatResponse parseGeminiOutput(String rawOutput) {
        String cleanJson = rawOutput.trim();
        // Xóa markdown block ```json ... ``` nếu Gemini lỡ bọc
        if (cleanJson.startsWith("```json")) {
            cleanJson = cleanJson.substring(7);
        } else if (cleanJson.startsWith("```")) {
            cleanJson = cleanJson.substring(3);
        }
        if (cleanJson.endsWith("```")) {
            cleanJson = cleanJson.substring(0, cleanJson.length() - 3);
        }
        cleanJson = cleanJson.trim();

        try {
            JsonNode jsonNode = objectMapper.readTree(cleanJson);
            String reply = jsonNode.path("reply").asText("Dưới đây là một số gợi ý giày thể thao phù hợp cho bạn:");
            List<Long> ids = new ArrayList<>();
            JsonNode idsNode = jsonNode.path("suggestedProductIds");
            if (idsNode.isArray()) {
                for (JsonNode n : idsNode) {
                    if (n.isNumber()) {
                        ids.add(n.asLong());
                    }
                }
            }
            return AiChatDTO.AiChatResponse.builder()
                    .reply(reply)
                    .suggestedProductIds(ids)
                    .build();
        } catch (Exception e) {
            log.warn("Không parse được JSON từ Gemini, dùng raw output: {}", e.getMessage());
            return AiChatDTO.AiChatResponse.builder()
                    .reply(cleanJson)
                    .suggestedProductIds(Collections.emptyList())
                    .build();
        }
    }

    private String buildCompactCatalogSnapshot(List<Product> products) {
        StringBuilder sb = new StringBuilder();
        for (Product p : products) {
            String sizesStr = "all";
            if (p.getSizes() != null && !p.getSizes().isEmpty()) {
                sizesStr = p.getSizes().stream()
                        .filter(s -> s.getStock() > 0)
                        .map(ProductSize::getSize)
                        .map(String::valueOf)
                        .collect(Collectors.joining(","));
            }
            sb.append(String.format("[ID:%d | %s | %s | %s | %,dđ | Size:%s | %s]\n",
                    p.getId(),
                    p.getName(),
                    p.getBrand(),
                    p.getCategory(),
                    p.getPrice(),
                    sizesStr,
                    p.getDescription() != null ? p.getDescription().replace("\n", " ").trim() : ""));
        }
        return sb.toString();
    }

    private AiChatDTO.AiChatResponse fallbackLocalSearch(String query) {
        String lower = query.toLowerCase();
        List<Product> all = productRepository.findAll();
        List<Product> matched = new ArrayList<>();

        if (lower.contains("pickle") || lower.contains("bóng bàn") || lower.contains("cổ chân")) {
            matched = all.stream().filter(p -> "pickleball".equalsIgnoreCase(p.getCategory()) || p.getName().toLowerCase().contains("pickleball")).toList();
        } else if (lower.contains("chạy") || lower.contains("run") || lower.contains("marathon") || lower.contains("pegasus")) {
            matched = all.stream().filter(p -> "running".equalsIgnoreCase(p.getCategory())).toList();
        } else if (lower.contains("gym") || lower.contains("tập") || lower.contains("tạ") || lower.contains("metcon")) {
            matched = all.stream().filter(p -> "training".equalsIgnoreCase(p.getCategory())).toList();
        } else if (lower.contains("samba") || lower.contains("retro") || lower.contains("đi làm") || lower.contains("phối đồ") || lower.contains("be")) {
            matched = all.stream().filter(p -> "lifestyle".equalsIgnoreCase(p.getCategory()) || "basketball".equalsIgnoreCase(p.getCategory())).toList();
        } else {
            matched = all.stream().limit(3).toList();
        }

        List<Long> ids = matched.stream().map(Product::getId).limit(5).collect(Collectors.toList());
        List<ProductDTO.ProductResponse> dtos = ids.stream().map(productService::getProductById).toList();

        return AiChatDTO.AiChatResponse.builder()
                .reply("Dựa trên nhu cầu của bạn, TC SPORT xin giới thiệu các mẫu giày tối ưu nhất về độ êm và hỗ trợ vận động đang có sẵn trong kho:")
                .suggestedProductIds(ids)
                .suggestedProducts(dtos)
                .activeModel("Local-Smart-Fallback")
                .keyIndexUsed(0)
                .build();
    }

    private String maskKey(String key) {
        if (key == null || key.length() < 8) return "***";
        return key.substring(0, 6) + "..." + key.substring(key.length() - 4);
    }
}
