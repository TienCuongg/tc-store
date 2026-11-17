package com.tcsport.store.config;

import com.tcsport.store.entity.*;
import com.tcsport.store.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;
    private final ProductSizeRepository productSizeRepository;
    private final OrderRepository orderRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedUsers();
        seedCategories();
        seedBrands();
        seedProducts();
        seedDemoOrders();
        System.out.println("✅ [TC SPORT] Dữ liệu mẫu ban đầu (Seed Data) đã nạp thành công vào MySQL!");
    }

    private void seedUsers() {
        if (!userRepository.existsByEmail("admin@tcsport.vn")) {
            userRepository.save(User.builder()
                    .name("Admin Quản Trị Hệ Thống")
                    .email("admin@tcsport.vn")
                    .password(passwordEncoder.encode("16032005"))
                    .phone("0973711868")
                    .address("249 Xã Đàn, Nam Đồng, Đống Đa, Hà Nội")
                    .role("ROLE_ADMIN")
                    .build());
        }

        if (!userRepository.existsByEmail("tienc@gmail.com")) {
            userRepository.save(User.builder()
                    .name("Nguyễn Văn Tiến")
                    .email("tienc@gmail.com")
                    .password(passwordEncoder.encode("16032005"))
                    .phone("0973711868")
                    .address("249 Xã Đàn, Nam Đồng, Đống Đa, Hà Nội")
                    .role("ROLE_CUSTOMER")
                    .build());
        }
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            categoryRepository.saveAll(List.of(
                    Category.builder().code("running").name("Giày Chạy Bộ (Running)").description("Giày marathon, daily trainer, đệm êm bứt tốc").build(),
                    Category.builder().code("lifestyle").name("Sneaker & Lifestyle").description("Thời trang dạo phố, phong cách retro streetwear").build(),
                    Category.builder().code("pickleball").name("Pickleball & Tennis").description("Giày sân cứng, đế bám chống lật cổ chân").build(),
                    Category.builder().code("training").name("Gym & Training").description("Tập tạ, metcon, kháng lực & crossfit").build(),
                    Category.builder().code("basketball").name("Bóng Rổ & Jordan").description("Giày bóng rổ indoor/outdoor, đệm khí Air").build()
            ));
        }
    }

    private void seedBrands() {
        if (brandRepository.count() == 0) {
            brandRepository.saveAll(List.of(
                    Brand.builder().name("Nike").origin("Mỹ (USA)").description("Just Do It - Giày thể thao số 1 thế giới").build(),
                    Brand.builder().name("Adidas").origin("Đức (Germany)").description("Impossible Is Nothing - Samba, Ultraboost, Adios").build(),
                    Brand.builder().name("Asics").origin("Nhật Bản (Japan)").description("Anima Sana In Corpore Sano - Gel Nimbus, Kayano").build(),
                    Brand.builder().name("TC Sport").origin("Việt Nam (VN)").description("Thương hiệu độc quyền chuyên Pickleball & Running").build(),
                    Brand.builder().name("Puma").origin("Đức (Germany)").description("Forever Faster - Deviate Nitro, Suede Classic").build(),
                    Brand.builder().name("Lacoste").origin("Pháp (France)").description("Di sản quần vợt Pháp sang trọng cổ điển").build(),
                    Brand.builder().name("Jordan").origin("Mỹ (USA)").description("Huyền thoại bóng rổ Michael Jordan & Nike").build()
            ));
        }
    }

    private void seedProducts() {
        if (productRepository.count() == 0) {
            List<ProductSeedData> items = List.of(
                new ProductSeedData("NK-PEG40-BLU", "Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương", "Nike", "running", 2390000L, 1600000L, 3965000L, "-40%", 198, "🎁 SIÊU SALE 🎁", "✨ HÀNG MỚI VỀ ✨", "assets/images/shoe-pegasus-blue.jpg", "Xanh Dương / Trắng / Cam", "Phiên bản Pegasus 40 đệm kép Zoom Air phản hồi năng lượng êm ái, bứt tốc mượt mà trên mọi cung đường."),
                new ProductSeedData("JD-RETRO1-CHI", "Giày Air Jordan 1 Retro High OG - Đỏ Chicago", "Jordan", "basketball", 4690000L, 3100000L, 5200000L, "-10%", 342, "🎁 SIÊU SALE 🎁", "✨ HÀNG MỚI VỀ ✨", "assets/images/shoe-retro-high.jpg", "Đỏ Chicago / Trắng / Đen", "Huyền thoại bóng rổ bất tử với da bò cao cấp nguyên bản, đệm khí Air-Sole êm ái gót chân."),
                new ProductSeedData("NK-METCON5-BLK", "Giày Nike Free Metcon 5 - Đen Vàng Volt Gym", "Nike", "training", 3190000L, 2100000L, 3600000L, "-11%", 156, "🎁 SIÊU SALE 🎁", "✨ HÀNG MỚI VỀ ✨", "assets/images/shoe-metcon-volt.jpg", "Đen / Vàng Volt", "Đế rộng ổn định khi squat và nâng tạ, mũi giày dẻo linh hoạt khi bật nhảy và chạy bứt tốc ngắn."),
                new ProductSeedData("AS-KAYANO30-BLU", "Giày Asics Gel Kayano Runner 30 - Xanh Trắng", "Asics", "running", 3190000L, 2150000L, 3990000L, "-20%", 278, "🎁 SIÊU SALE 🎁", "✨ HÀNG MỚI VỀ ✨", "assets/images/shoe-asics-runner.jpg", "Xanh Biển / Trắng Tuyết", "Công nghệ đệm PureGEL êm hơn 65%, hệ thống 4D GUIDANCE SYSTEM bảo vệ cổ chân chống lật."),
                new ProductSeedData("TC-COURTPRO-BLU", "Giày Pickleball Court Pro Nam Nữ - Xanh Dương", "TC Sport", "pickleball", 1890000L, 1100000L, 2490000L, "-24%", 421, "🎁 SIÊU SALE 🎁", "✨ HÀNG MỚI VỀ ✨", "assets/images/shoe-pickleball-pro.jpg", "Xanh Dương / Cam Pastel", "Thiết kế đế cao su chịu mài mòn sân bê tông, đệm lót hấp thụ lực bật nhảy và phanh gấp."),
                new ProductSeedData("TC-SPEEDPRO-ORN", "Giày Chạy Bộ Speed Pro Running Carbon - Cam", "TC Sport", "running", 2890000L, 1750000L, 3450000L, "-16%", 189, "🎁 SIÊU SALE 🎁", "✨ HÀNG MỚI VỀ ✨", "assets/images/shoe-running-pro.jpg", "Cam Neon / Trắng Bạc", "Tấm carbon đúc trợ lực đàn hồi tối đa, trọng lượng siêu nhẹ 195g giúp đạt kỷ lục cự ly 21km - 42km."),
                new ProductSeedData("AD-SAMBAOG-WHT", "Giày Adidas Samba OG Classic - Trắng Đen Gum", "Adidas", "lifestyle", 2690000L, 1700000L, 3000000L, "-10%", 512, "🎁 SIÊU SALE 🎁", null, "assets/images/hero-sneaker.jpg", "Trắng / Đen / Đế Gum", "Biểu tượng thời trang retro đường phố bất hủ với thân da cao cấp và mũi da lộn chữ T cổ điển."),
                new ProductSeedData("PU-NITRO2-RED", "Giày Puma Deviate Nitro 2 - Đỏ Tươi Chạy Bộ", "Puma", "running", 3290000L, 2100000L, 4100000L, "-20%", 134, "🎁 SIÊU SALE 🎁", null, "assets/images/shoe-running-pro.jpg", "Đỏ Fire / Đen Carbon", "Đệm Nitro Elite siêu phản hồi lực, đế cao su Pumagrip bám đường bất chấp mưa trơn trượt."),
                new ProductSeedData("LC-CARNABY-WHT", "Giày Lacoste Carnaby Pro Leather - Trắng Xanh Navy", "Lacoste", "lifestyle", 2950000L, 1950000L, 3500000L, "-16%", 215, "🎁 SIÊU SALE 🎁", null, "assets/images/hero-beige-sneakers.jpg", "Trắng Tinh Khôi / Xanh Navy", "Chất liệu da bê mềm mịn, thêu logo cá sấu xanh kim loại sắc sảo, lịch lãm trong mọi trang phục.")
            );

            for (ProductSeedData d : items) {
                Product p = Product.builder()
                        .sku(d.sku)
                        .name(d.name)
                        .brand(d.brand)
                        .category(d.category)
                        .price(d.price)
                        .costPrice(d.costPrice)
                        .originalPrice(d.originalPrice)
                        .discount(d.discount)
                        .soldCount(d.soldCount)
                        .rating(5.0)
                        .badgeSale(d.badgeSale)
                        .badgeNew(d.badgeNew)
                        .image(d.image)
                        .color(d.color)
                        .description(d.description)
                        .build();

                Product saved = productRepository.save(p);

                List<ProductSize> sizes = new ArrayList<>();
                int[] availableSizes = {38, 39, 40, 41, 42, 43, 44};
                for (int sz : availableSizes) {
                    int stock = (sz == 43) ? 2 : (sz == 41 ? 12 : 8);
                    sizes.add(ProductSize.builder().product(saved).size(sz).stock(stock).build());
                }
                productSizeRepository.saveAll(sizes);
                saved.setSizes(sizes);
            }
        }
    }

    private void seedDemoOrders() {
        if (orderRepository.count() == 0) {
            Product p1 = productRepository.findById(1L).orElse(null);
            Product p2 = productRepository.findById(2L).orElse(null);
            Product p4 = productRepository.findById(4L).orElse(null);
            Product p5 = productRepository.findById(5L).orElse(null);

            // Đơn 1
            Order o1 = Order.builder()
                    .orderCode("TC88291")
                    .customerName("Nguyễn Văn Tiến")
                    .customerPhone("0973711868")
                    .customerEmail("tienc@gmail.com")
                    .customerAddress("249 Xã Đàn, Phường Nam Đồng, Quận Đống Đa, Hà Nội")
                    .paymentMethod("Chuyển khoản QR Techcombank")
                    .paymentStatus("Đã thanh toán")
                    .shippingStatus("Đang chuẩn bị hàng")
                    .statusClass("status-badge-shipping")
                    .carrier("Viettel Post")
                    .trackingCode("VTP-8829104VN")
                    .totalAmount(4780000L)
                    .costAmount(3200000L)
                    .note("Giao giờ hành chính, gọi trước 15 phút.")
                    .internalNote("Khách VIP, đã xác nhận qua Zalo. Dặn bọc hộp cẩn thận không móp.")
                    .createdAt(LocalDateTime.now().minusHours(2))
                    .build();

            List<OrderItem> items1 = new ArrayList<>();
            items1.add(OrderItem.builder()
                    .order(o1).productId(1L).sku("NK-PEG40-BLU-42").name("Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương")
                    .brand("Nike").size(42).price(2390000L).costPrice(1600000L).quantity(2).image("assets/images/shoe-pegasus-blue.jpg").subtotal(4780000L).build());
            o1.setItems(items1);

            List<OrderTimeline> tl1 = new ArrayList<>();
            tl1.add(OrderTimeline.builder().order(o1).time("24/10/2026 14:30").action("Khách hàng đặt đơn hàng trực tuyến").actor("Khách hàng").build());
            tl1.add(OrderTimeline.builder().order(o1).time("24/10/2026 14:45").action("Admin xác nhận đơn qua điện thoại").actor("Cường Tiến").build());
            o1.setTimeline(tl1);
            orderRepository.save(o1);

            // Đơn 2
            Order o2 = Order.builder()
                    .orderCode("TC77104")
                    .customerName("Trần Hoàng Nam")
                    .customerPhone("0988776655")
                    .customerEmail("nam.tran@gmail.com")
                    .customerAddress("Số 18 Hoàng Diệu, Phường Điện Biên, Quận Ba Đình, Hà Nội")
                    .paymentMethod("Thanh toán COD khi nhận hàng")
                    .paymentStatus("Chờ thanh toán")
                    .shippingStatus("Đang giao hàng")
                    .statusClass("status-badge-shipping")
                    .carrier("Giao Hàng Tiết Kiệm (GHTK)")
                    .trackingCode("GHTK-7710488HN")
                    .totalAmount(4690000L)
                    .costAmount(3100000L)
                    .note("Cho xem hàng trước khi nhận, không thử.")
                    .internalNote("Bưu tá GHTK đã lấy hàng lúc 10h sáng.")
                    .createdAt(LocalDateTime.now().minusDays(1))
                    .build();

            List<OrderItem> items2 = new ArrayList<>();
            items2.add(OrderItem.builder()
                    .order(o2).productId(2L).sku("JD-RETRO1-CHI-43").name("Giày Air Jordan 1 Retro High OG - Đỏ Chicago")
                    .brand("Jordan").size(43).price(4690000L).costPrice(3100000L).quantity(1).image("assets/images/shoe-retro-high.jpg").subtotal(4690000L).build());
            o2.setItems(items2);

            List<OrderTimeline> tl2 = new ArrayList<>();
            tl2.add(OrderTimeline.builder().order(o2).time("23/10/2026 09:15").action("Khách hàng đặt hàng").actor("Khách hàng").build());
            tl2.add(OrderTimeline.builder().order(o2).time("23/10/2026 10:00").action("Đã bàn giao bưu tá GHTK").actor("Kho Ba Đình").build());
            o2.setTimeline(tl2);
            orderRepository.save(o2);

            // Đơn 3
            Order o3 = Order.builder()
                    .orderCode("TC65219")
                    .customerName("Lê Thị Thảo Linh")
                    .customerPhone("0905123456")
                    .customerEmail("linhthaole@gmail.com")
                    .customerAddress("Toà Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM")
                    .paymentMethod("Chuyển khoản QR Techcombank")
                    .paymentStatus("Đã thanh toán")
                    .shippingStatus("Đã giao thành công")
                    .statusClass("status-badge-delivered")
                    .carrier("Viettel Post")
                    .trackingCode("VTP-6521922SG")
                    .totalAmount(6380000L)
                    .costAmount(4300000L)
                    .note("Lễ tân toà nhà nhận thay nếu vắng mặt.")
                    .internalNote("Khách đã nhận, feedback đệm êm, rất hài lòng.")
                    .createdAt(LocalDateTime.now().minusDays(2))
                    .build();

            List<OrderItem> items3 = new ArrayList<>();
            items3.add(OrderItem.builder()
                    .order(o3).productId(4L).sku("AS-KAYANO30-BLU-39").name("Giày Asics Gel Kayano Runner 30 - Xanh Trắng")
                    .brand("Asics").size(39).price(3190000L).costPrice(2150000L).quantity(2).image("assets/images/shoe-asics-runner.jpg").subtotal(6380000L).build());
            o3.setItems(items3);
            orderRepository.save(o3);
        }
    }

    private static class ProductSeedData {
        String sku;
        String name;
        String brand;
        String category;
        Long price;
        Long costPrice;
        Long originalPrice;
        String discount;
        Integer soldCount;
        String badgeSale;
        String badgeNew;
        String image;
        String color;
        String description;

        ProductSeedData(String sku, String name, String brand, String category, Long price, Long costPrice, Long originalPrice, String discount, Integer soldCount, String badgeSale, String badgeNew, String image, String color, String description) {
            this.sku = sku;
            this.name = name;
            this.brand = brand;
            this.category = category;
            this.price = price;
            this.costPrice = costPrice;
            this.originalPrice = originalPrice;
            this.discount = discount;
            this.soldCount = soldCount;
            this.badgeSale = badgeSale;
            this.badgeNew = badgeNew;
            this.image = image;
            this.color = color;
            this.description = description;
        }
    }
}
