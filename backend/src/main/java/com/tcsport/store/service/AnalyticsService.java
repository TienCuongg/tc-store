package com.tcsport.store.service;

import com.tcsport.store.dto.AnalyticsDTO;
import com.tcsport.store.entity.Order;
import com.tcsport.store.entity.OrderItem;
import com.tcsport.store.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final OrderRepository orderRepository;

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter ISO_FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public AnalyticsDTO.OverviewResponse getOverview() {
        List<Order> orders = orderRepository.findAllByOrderByCreatedAtDesc();

        long grossRevenue = 0L;
        long grossCost = 0L;
        int validOrdersCount = 0;
        int pending = 0;
        int shipping = 0;
        int completed = 0;
        int cancelled = 0;

        Map<String, AnalyticsDTO.CustomerOverview> customerMap = new LinkedHashMap<>();

        for (Order o : orders) {
            String status = o.getShippingStatus();
            if ("Đang chuẩn bị hàng".equalsIgnoreCase(status)) pending++;
            else if ("Đang giao hàng".equalsIgnoreCase(status)) shipping++;
            else if ("Đã giao thành công".equalsIgnoreCase(status) || "Hoàn thành".equalsIgnoreCase(status)) completed++;
            else if ("Đã hủy đơn".equalsIgnoreCase(status)) cancelled++;

            if (!"Đã hủy đơn".equalsIgnoreCase(status)) {
                grossRevenue += o.getTotalAmount();
                grossCost += (o.getCostAmount() != null ? o.getCostAmount() : Math.round(o.getTotalAmount() * 0.65));
                validOrdersCount++;
            }

            // Phân nhóm khách hàng
            String phone = o.getCustomerPhone() != null ? o.getCustomerPhone().trim() : "0973711868";
            if (!customerMap.containsKey(phone)) {
                customerMap.put(phone, AnalyticsDTO.CustomerOverview.builder()
                        .name(o.getCustomerName())
                        .phone(phone)
                        .email(o.getCustomerEmail())
                        .address(o.getCustomerAddress())
                        .totalSpent(o.getTotalAmount())
                        .orderCount(1)
                        .lastOrderDate(o.getCreatedAt().format(DATE_FMT))
                        .build());
            } else {
                AnalyticsDTO.CustomerOverview c = customerMap.get(phone);
                c.setTotalSpent(c.getTotalSpent() + o.getTotalAmount());
                c.setOrderCount(c.getOrderCount() + 1);
            }
        }

        long grossProfit = grossRevenue - grossCost;
        int profitMargin = grossRevenue > 0 ? (int) Math.round(((double) grossProfit / grossRevenue) * 100) : 0;
        long aov = validOrdersCount > 0 ? Math.round((double) grossRevenue / validOrdersCount) : 0;

        return AnalyticsDTO.OverviewResponse.builder()
                .grossRevenue(grossRevenue)
                .grossProfit(grossProfit)
                .profitMargin(profitMargin)
                .aov(aov)
                .totalOrders(orders.size())
                .pendingCount(pending)
                .shippingCount(shipping)
                .completedCount(completed)
                .cancelledCount(cancelled)
                .totalCustomers(customerMap.size())
                .customerList(new ArrayList<>(customerMap.values()))
                .build();
    }

    public List<AnalyticsDTO.DailyRevenuePoint> getRevenuePoints(String startIso, String endIso) {
        LocalDate startDate = (startIso != null && !startIso.isBlank()) ? LocalDate.parse(startIso) : LocalDate.now().minusDays(6);
        LocalDate endDate = (endIso != null && !endIso.isBlank()) ? LocalDate.parse(endIso) : LocalDate.now();

        LocalDateTime startLdt = startDate.atStartOfDay();
        LocalDateTime endLdt = endDate.atTime(LocalTime.MAX);

        List<Order> orders = orderRepository.findOrdersBetweenDates(startLdt, endLdt);

        // Khởi tạo map cho tất cả các ngày trong khoảng
        Map<LocalDate, List<Order>> ordersByDate = new LinkedHashMap<>();
        LocalDate curr = startDate;
        while (!curr.isAfter(endDate)) {
            ordersByDate.put(curr, new ArrayList<>());
            curr = curr.plusDays(1);
        }

        for (Order o : orders) {
            LocalDate d = o.getCreatedAt().toLocalDate();
            if (ordersByDate.containsKey(d) && !"Đã hủy đơn".equalsIgnoreCase(o.getShippingStatus())) {
                ordersByDate.get(d).add(o);
            }
        }

        List<AnalyticsDTO.DailyRevenuePoint> points = new ArrayList<>();
        String[] dayNames = {"CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"};

        for (Map.Entry<LocalDate, List<Order>> entry : ordersByDate.entrySet()) {
            LocalDate d = entry.getKey();
            List<Order> dayOrders = entry.getValue();

            long dayRevenue = 0L;
            long dayProfit = 0L;
            int pairsCount = 0;

            for (Order o : dayOrders) {
                dayRevenue += o.getTotalAmount();
                long cost = (o.getCostAmount() != null) ? o.getCostAmount() : Math.round(o.getTotalAmount() * 0.65);
                dayProfit += (o.getTotalAmount() - cost);

                if (o.getItems() != null) {
                    for (OrderItem it : o.getItems()) {
                        pairsCount += it.getQuantity();
                    }
                } else {
                    pairsCount += 1;
                }
            }

            int dayOfWeekIdx = d.getDayOfWeek().getValue() % 7;
            String dayLabel = d.format(DateTimeFormatter.ofPattern("dd/MM")) + " (" + dayNames[dayOfWeekIdx] + ")";

            points.add(AnalyticsDTO.DailyRevenuePoint.builder()
                    .dayKey(d.format(DATE_FMT))
                    .dateIso(d.format(ISO_FMT))
                    .label(dayLabel)
                    .revenue(dayRevenue)
                    .profit(dayProfit)
                    .ordersCount(dayOrders.size())
                    .pairsCount(pairsCount)
                    .build());
        }

        return points;
    }

    public AnalyticsDTO.DailySalesDetailResponse getDailySalesDetail(String dateStr) {
        LocalDate targetDate;
        try {
            if (dateStr.contains("-")) {
                targetDate = LocalDate.parse(dateStr);
            } else {
                targetDate = LocalDate.parse(dateStr, DATE_FMT);
            }
        } catch (Exception e) {
            targetDate = LocalDate.now();
        }

        LocalDateTime startLdt = targetDate.atStartOfDay();
        LocalDateTime endLdt = targetDate.atTime(LocalTime.MAX);

        List<Order> dayOrders = orderRepository.findOrdersBetweenDates(startLdt, endLdt);

        Map<String, AnalyticsDTO.ProductDailySummary> productMap = new LinkedHashMap<>();
        List<AnalyticsDTO.OrderDailySummary> orderSummaries = new ArrayList<>();

        for (Order o : dayOrders) {
            if ("Đã hủy đơn".equalsIgnoreCase(o.getShippingStatus())) continue;

            StringBuilder itemsDesc = new StringBuilder();
            if (o.getItems() != null) {
                for (OrderItem it : o.getItems()) {
                    if (itemsDesc.length() > 0) itemsDesc.append(", ");
                    itemsDesc.append(it.getQuantity()).append("x ").append(it.getName()).append(" (Size ").append(it.getSize()).append(")");

                    String prodKey = it.getProductId() + "-" + it.getSize();
                    if (!productMap.containsKey(prodKey)) {
                        productMap.put(prodKey, AnalyticsDTO.ProductDailySummary.builder()
                                .id(it.getProductId())
                                .name(it.getName())
                                .brand(it.getBrand())
                                .size(it.getSize())
                                .qty(it.getQuantity())
                                .price(it.getPrice())
                                .revenue(it.getSubtotal())
                                .image(it.getImage())
                                .build());
                    } else {
                        AnalyticsDTO.ProductDailySummary existing = productMap.get(prodKey);
                        existing.setQty(existing.getQty() + it.getQuantity());
                        existing.setRevenue(existing.getRevenue() + it.getSubtotal());
                    }
                }
            }

            orderSummaries.add(AnalyticsDTO.OrderDailySummary.builder()
                    .id(o.getOrderCode())
                    .time(o.getCreatedAt().format(DateTimeFormatter.ofPattern("HH:mm")))
                    .customer(o.getCustomerName() + " (" + o.getCustomerPhone() + " - " + o.getCustomerAddress() + ")")
                    .itemsDesc(itemsDesc.toString())
                    .payment(o.getPaymentMethod())
                    .status(o.getShippingStatus())
                    .total(o.getTotalAmount())
                    .build());
        }

        String label = targetDate.format(DATE_FMT);

        return AnalyticsDTO.DailySalesDetailResponse.builder()
                .dateLabel(label)
                .products(new ArrayList<>(productMap.values()))
                .orders(orderSummaries)
                .build();
    }
}
