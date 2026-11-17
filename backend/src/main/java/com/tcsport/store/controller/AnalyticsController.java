package com.tcsport.store.controller;

import com.tcsport.store.dto.AnalyticsDTO;
import com.tcsport.store.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/overview")
    public ResponseEntity<AnalyticsDTO.OverviewResponse> getOverview() {
        return ResponseEntity.ok(analyticsService.getOverview());
    }

    @GetMapping("/revenue")
    public ResponseEntity<List<AnalyticsDTO.DailyRevenuePoint>> getRevenue(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        return ResponseEntity.ok(analyticsService.getRevenuePoints(startDate, endDate));
    }

    @GetMapping("/daily-detail")
    public ResponseEntity<AnalyticsDTO.DailySalesDetailResponse> getDailySalesDetail(
            @RequestParam String date) {
        return ResponseEntity.ok(analyticsService.getDailySalesDetail(date));
    }
}
