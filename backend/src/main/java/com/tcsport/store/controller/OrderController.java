package com.tcsport.store.controller;

import com.tcsport.store.dto.OrderDTO;
import com.tcsport.store.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDTO.OrderResponse> createOrder(@RequestBody OrderDTO.OrderCreateRequest request) {
        return ResponseEntity.ok(orderService.createOrder(request));
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO.OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/track/{code}")
    public ResponseEntity<OrderDTO.OrderResponse> getOrderByCode(@PathVariable String code) {
        return ResponseEntity.ok(orderService.getOrderByCode(code));
    }

    @GetMapping("/user/{phone}")
    public ResponseEntity<List<OrderDTO.OrderResponse>> getOrdersByPhone(@PathVariable String phone) {
        return ResponseEntity.ok(orderService.getOrdersByPhone(phone));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderDTO.OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody OrderDTO.StatusUpdateRequest request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, request.getStatus()));
    }

    @PutMapping("/{id}/shipping")
    public ResponseEntity<OrderDTO.OrderResponse> updateOrderShipping(
            @PathVariable Long id,
            @RequestBody OrderDTO.ShippingUpdateRequest request) {
        return ResponseEntity.ok(orderService.updateOrderShipping(
                id,
                request.getCarrier(),
                request.getTrackingCode(),
                request.getInternalNote()
        ));
    }
}
