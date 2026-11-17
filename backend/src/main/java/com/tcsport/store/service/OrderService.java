package com.tcsport.store.service;

import com.tcsport.store.dto.OrderDTO;
import com.tcsport.store.entity.*;
import com.tcsport.store.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ProductSizeRepository productSizeRepository;

    private static final DateTimeFormatter DATE_FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    private static final DateTimeFormatter TIME_FMT = DateTimeFormatter.ofPattern("HH:mm");
    private static final DateTimeFormatter TIMELINE_FMT = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    @Transactional
    public OrderDTO.OrderResponse createOrder(OrderDTO.OrderCreateRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new RuntimeException("Giỏ hàng không có sản phẩm nào!");
        }

        // Tạo mã đơn hàng độc nhất TCxxxxx
        String orderCode;
        do {
            orderCode = "TC" + (10000 + new Random().nextInt(90000));
        } while (orderRepository.findByOrderCode(orderCode).isPresent());

        LocalDateTime now = LocalDateTime.now();

        Order order = Order.builder()
                .orderCode(orderCode)
                .customerName(request.getCustomerName().trim())
                .customerPhone(request.getCustomerPhone().trim())
                .customerEmail(request.getCustomerEmail() != null ? request.getCustomerEmail().trim() : "")
                .customerAddress(request.getCustomerAddress().trim())
                .paymentMethod("qr".equalsIgnoreCase(request.getPaymentMethod()) ? "Chuyển khoản QR Techcombank" : "Thanh toán COD khi nhận hàng")
                .paymentStatus("qr".equalsIgnoreCase(request.getPaymentMethod()) ? "Đã thanh toán" : "Chờ thanh toán")
                .shippingStatus("Đang chuẩn bị hàng")
                .statusClass("status-badge-shipping")
                .carrier("Chưa phân bổ")
                .trackingCode("---")
                .note(request.getNote() != null ? request.getNote().trim() : "")
                .internalNote("")
                .totalAmount(0L)
                .costAmount(0L)
                .createdAt(now)
                .build();

        long grossTotal = 0L;
        long grossCost = 0L;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderDTO.OrderItemRequest itemReq : request.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Sản phẩm ID " + itemReq.getProductId() + " không tồn tại!"));

            // Kiểm tra và trừ tồn kho kích cỡ này
            ProductSize pSize = productSizeRepository.findByProductIdAndSize(product.getId(), itemReq.getSize())
                    .orElse(null);

            if (pSize != null) {
                if (pSize.getStock() < itemReq.getQuantity()) {
                    throw new RuntimeException("Mẫu giày \"" + product.getName() + "\" (Size " + itemReq.getSize() + ") chỉ còn " + pSize.getStock() + " đôi, không đủ để đặt hàng!");
                }
                // Trừ tồn kho
                pSize.setStock(pSize.getStock() - itemReq.getQuantity());
                productSizeRepository.save(pSize);
            }

            // Tăng số lượng đã bán
            product.setSoldCount(product.getSoldCount() + itemReq.getQuantity());
            productRepository.save(product);

            long unitPrice = product.getPrice();
            long unitCost = product.getCostPrice() != null ? product.getCostPrice() : Math.round(unitPrice * 0.65);
            long itemSubtotal = unitPrice * itemReq.getQuantity();

            grossTotal += itemSubtotal;
            grossCost += (unitCost * itemReq.getQuantity());

            orderItems.add(OrderItem.builder()
                    .order(order)
                    .productId(product.getId())
                    .sku(product.getSku() + "-" + itemReq.getSize())
                    .name(product.getName())
                    .brand(product.getBrand())
                    .size(itemReq.getSize())
                    .price(unitPrice)
                    .costPrice(unitCost)
                    .quantity(itemReq.getQuantity())
                    .image(product.getImage())
                    .subtotal(itemSubtotal)
                    .build());
        }

        // Tính phí ship: Freeship nếu tổng đơn >= 1.500.000đ, ngược lại 30.000đ
        long shippingFee = grossTotal >= 1500000L ? 0L : 30000L;
        order.setTotalAmount(grossTotal + shippingFee);
        order.setCostAmount(grossCost);
        order.setItems(orderItems);

        // Timeline ban đầu
        List<OrderTimeline> timelines = new ArrayList<>();
        timelines.add(OrderTimeline.builder()
                .order(order)
                .time(now.format(TIMELINE_FMT))
                .action("Khách hàng đặt đơn hàng trực tuyến")
                .actor("Khách hàng")
                .build());
        order.setTimeline(timelines);

        Order saved = orderRepository.save(order);
        return toResponseDTO(saved);
    }

    public List<OrderDTO.OrderResponse> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    public OrderDTO.OrderResponse getOrderByCode(String orderCode) {
        Order order = orderRepository.findByOrderCode(orderCode)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng mã: " + orderCode));
        return toResponseDTO(order);
    }

    public List<OrderDTO.OrderResponse> getOrdersByPhone(String phone) {
        return orderRepository.findByCustomerPhoneOrderByCreatedAtDesc(phone.trim()).stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO.OrderResponse updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng!"));

        order.setShippingStatus(newStatus);

        String badgeClass = switch (newStatus) {
            case "Đã giao thành công", "Hoàn thành" -> "status-badge-delivered";
            case "Đã hủy đơn" -> "status-badge-cancelled";
            default -> "status-badge-shipping";
        };
        order.setStatusClass(badgeClass);

        if ("Đã giao thành công".equals(newStatus)) {
            order.setPaymentStatus("Đã thanh toán");
        }

        // Ghi lại sự kiện dòng thời gian
        order.getTimeline().add(OrderTimeline.builder()
                .order(order)
                .time(LocalDateTime.now().format(TIMELINE_FMT))
                .action("Trạng thái chuyển sang: " + newStatus)
                .actor("Admin Quản trị")
                .build());

        Order saved = orderRepository.save(order);
        return toResponseDTO(saved);
    }

    @Transactional
    public OrderDTO.OrderResponse updateOrderShipping(Long orderId, String carrier, String trackingCode, String internalNote) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng!"));

        if (carrier != null) order.setCarrier(carrier.trim());
        if (trackingCode != null) order.setTrackingCode(trackingCode.trim());
        if (internalNote != null) order.setInternalNote(internalNote.trim());

        order.getTimeline().add(OrderTimeline.builder()
                .order(order)
                .time(LocalDateTime.now().format(TIMELINE_FMT))
                .action("Cập nhật vận đơn: " + order.getCarrier() + " (" + order.getTrackingCode() + ")")
                .actor("Kho vận TC SPORT")
                .build());

        Order saved = orderRepository.save(order);
        return toResponseDTO(saved);
    }

    public OrderDTO.OrderResponse toResponseDTO(Order o) {
        DecimalFormat df = new DecimalFormat("#,###₫");
        String formattedTotal = df.format(o.getTotalAmount()).replace(',', '.');

        String itemSummary = "Giày thể thao";
        int sizeSummary = 41;
        String imageSummary = "assets/images/hero-sneaker.jpg";

        List<OrderDTO.OrderItemResponse> itemDTOs = new ArrayList<>();
        if (o.getItems() != null && !o.getItems().isEmpty()) {
            OrderItem first = o.getItems().get(0);
            itemSummary = first.getName() + (o.getItems().size() > 1 ? " (+" + (o.getItems().size() - 1) + " sản phẩm khác)" : "");
            sizeSummary = first.getSize();
            imageSummary = first.getImage();

            for (OrderItem it : o.getItems()) {
                itemDTOs.add(OrderDTO.OrderItemResponse.builder()
                        .id(it.getId())
                        .productId(it.getProductId())
                        .sku(it.getSku())
                        .name(it.getName())
                        .brand(it.getBrand())
                        .size(it.getSize())
                        .price(it.getPrice())
                        .costPrice(it.getCostPrice())
                        .quantity(it.getQuantity())
                        .image(it.getImage())
                        .subtotal(it.getSubtotal())
                        .build());
            }
        }

        List<OrderDTO.TimelineItem> timelineDTOs = new ArrayList<>();
        if (o.getTimeline() != null) {
            for (OrderTimeline tl : o.getTimeline()) {
                timelineDTOs.add(OrderDTO.TimelineItem.builder()
                        .time(tl.getTime())
                        .action(tl.getAction())
                        .actor(tl.getActor())
                        .build());
            }
        }

        return OrderDTO.OrderResponse.builder()
                .id(o.getOrderCode())
                .orderId(o.getId())
                .date(o.getCreatedAt().format(DATE_FMT))
                .time(o.getCreatedAt().format(TIME_FMT))
                .status(o.getShippingStatus())
                .statusClass(o.getStatusClass())
                .carrier(o.getCarrier())
                .trackingCode(o.getTrackingCode())
                .internalNote(o.getInternalNote())
                .note(o.getNote())
                .total(formattedTotal)
                .totalAmount(o.getTotalAmount())
                .costAmount(o.getCostAmount())
                .paymentMethod(o.getPaymentMethod())
                .paymentStatus(o.getPaymentStatus())
                .item(itemSummary)
                .size(sizeSummary)
                .image(imageSummary)
                .customer(OrderDTO.CustomerInfo.builder()
                        .name(o.getCustomerName())
                        .phone(o.getCustomerPhone())
                        .email(o.getCustomerEmail())
                        .address(o.getCustomerAddress())
                        .build())
                .items(itemDTOs)
                .timeline(timelineDTOs)
                .build();
    }
}
