package com.tcsport.store.controller;

import com.tcsport.store.dto.AiChatDTO;
import com.tcsport.store.service.GeminiAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AiChatController {

    private final GeminiAiService geminiAiService;

    @PostMapping("/chat")
    public ResponseEntity<AiChatDTO.AiChatResponse> chat(@RequestBody AiChatDTO.AiChatRequest request) {
        AiChatDTO.AiChatResponse response = geminiAiService.chat(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> status() {
        return ResponseEntity.ok(Map.of(
                "status", "ONLINE",
                "service", "TC SPORT AI Shoe Assistant",
                "provider", "Google Gemini API (Multi-Key Rotation)",
                "features", new String[]{"Smart Product Recommendation", "Size Advisor", "Anti-Hallucination Guard", "Token Optimized"}
        ));
    }
}
