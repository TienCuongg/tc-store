/**
 * ==============================================================================
 * 📦 DỮ LIỆU KHO SẢN PHẨM MẪU (MOCK DATABASE & API MODEL)
 * ==============================================================================
 * File này chứa toàn bộ danh mục sản phẩm của hệ thống TC SPORT:
 * - NEW_ARRIVALS: Danh sách sản phẩm Hàng mới về (hiển thị trang chủ)
 * - FLASH_SALE_ITEMS: Danh sách sản phẩm Siêu Sale giá sốc
 * - ADDITIONAL_CATALOG_PRODUCTS: Kho sản phẩm mở rộng cho các hãng Adidas, Asics, Puma, Lacoste...
 * - ALL_PRODUCTS: Tổng hợp toàn bộ 36+ sản phẩm để phục vụ lọc, tìm kiếm, giỏ hàng
 * 
 * 💡 KẾT NỐI BACKEND (Spring Boot / Node.js / Laravel) SAU NÀY:
 * Khi làm API, bạn chỉ cần thay thế biến ALL_PRODUCTS bằng dữ liệu trả về từ:
 *   const response = await fetch('http://localhost:8080/api/products');
 *   const ALL_PRODUCTS = await response.json();
 * ==============================================================================
 */

export const NEW_ARRIVALS = [
  {
    id: 1,
    name: "Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương",
    brand: "Nike",
    category: "running",
    price: 2390000,
    originalPrice: 3965000,
    discount: "-40%",
    soldCount: 198,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HÀNG MỚI VỀ ✨",
    image: "assets/images/shoe-pegasus-blue.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Xanh Dương / Trắng / Cam",
    description: "Phiên bản giày chạy bộ Pegasus 40 đệm kép Zoom Air phản hồi năng lượng êm ái, bứt tốc mượt mà trên mọi cung đường."
  },
  {
    id: 2,
    name: "Giày Air Jordan 1 Retro High OG - Đỏ Chicago",
    brand: "Jordan",
    category: "basketball",
    price: 4690000,
    originalPrice: 5200000,
    discount: "-10%",
    soldCount: 342,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HÀNG MỚI VỀ ✨",
    image: "assets/images/shoe-retro-high.jpg",
    sizes: [40, 41, 42, 43, 44, 45],
    color: "Đỏ Chicago / Trắng / Đen",
    description: "Huyền thoại bóng rổ bất tử với da bò cao cấp nguyên bản, đệm khí Air-Sole êm ái gót chân."
  },
  {
    id: 3,
    name: "Giày Nike Free Metcon 5 - Đen Vàng Volt Gym",
    brand: "Nike",
    category: "training",
    price: 3190000,
    originalPrice: 3600000,
    discount: "-11%",
    soldCount: 92,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HÀNG MỚI VỀ ✨",
    image: "assets/images/shoe-metcon-volt.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Đen / Vàng Volt",
    description: "Giày tập Gym & Crossfit hàng đầu thế giới với gót bè vững chãi khi squat và đế dẻo linh hoạt khi bứt tốc."
  },
  {
    id: 4,
    name: "Giày Tennis Pickleball TC Apex Pro - Xanh Hoàng Gia",
    brand: "TC Sport",
    category: "pickleball",
    price: 2490000,
    originalPrice: 2850000,
    discount: "-12%",
    soldCount: 76,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HÀNG MỚI VỀ ✨",
    image: "assets/images/shoe-pickleball-pro.jpg",
    sizes: [39, 40, 41, 42, 43, 44],
    color: "Xanh Royal / Cam Neon",
    description: "Đế cao su herringbone bám sân tuyệt đối, đệm bảo vệ chống lật cổ chân chuyên dụng cho Pickleball và Tennis."
  },
  {
    id: 5,
    name: "Giày Asics Gel-Nimbus 25 - Xanh Bạc Kim",
    brand: "Asics",
    category: "running",
    price: 3650000,
    originalPrice: 4100000,
    discount: "-11%",
    soldCount: 115,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HÀNG MỚI VỀ ✨",
    image: "assets/images/shoe-asics-runner.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Xanh Metallic / Bạc Silver",
    description: "Đệm PureGEL siêu êm ái kết hợp bọt FlyteFoam Blast+ Eco bảo vệ tối đa khớp gối cho cự ly Marathon."
  },
  {
    id: 11,
    name: "Giày Chạy Bộ Nike ZoomX Vaporfly Next% 3 - Trắng Xanh",
    brand: "Nike",
    category: "running",
    price: 4950000,
    originalPrice: 5800000,
    discount: "-15%",
    soldCount: 88,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HÀNG MỚI VỀ ✨",
    image: "assets/images/shoe-running-pro.jpg",
    sizes: [40, 41, 42, 43],
    color: "Trắng / Xanh Mint",
    description: "Đế đĩa Carbon toàn phần bứt phá tốc độ trên đường chạy Marathon chuyên nghiệp."
  },
  {
    id: 12,
    name: "Giày Adidas Ultraboost Light 23 - Trắng Kem Be",
    brand: "Adidas",
    category: "running",
    price: 3390000,
    originalPrice: 4500000,
    discount: "-25%",
    soldCount: 164,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HÀNG MỚI VỀ ✨",
    image: "assets/images/shoe-beige-retro.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Trắng Kem / Be Linen",
    description: "Đệm hạt Boost nhẹ hơn 30%, mang lại cảm giác êm ái vượt bậc suốt cả ngày."
  },
  {
    id: 13,
    name: "Giày Tennis/Pickleball Asics Solution Speed FF 3",
    brand: "Asics",
    category: "pickleball",
    price: 2890000,
    originalPrice: 3400000,
    discount: "-15%",
    soldCount: 129,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HÀNG MỚI VỀ ✨",
    image: "assets/images/shoe-asics-runner.jpg",
    sizes: [40, 41, 42, 43, 44],
    color: "Xanh Sapphire / Cam Solar",
    description: "Mẫu giày linh hoạt hàng đầu cho các tay vợt Pickleball và Tennis sân cứng."
  },
  {
    id: 14,
    name: "Giày Lacoste Carnaby Pro Leather - Trắng Viền Đen",
    brand: "Lacoste",
    category: "lifestyle",
    price: 2790000,
    originalPrice: 3500000,
    discount: "-20%",
    soldCount: 143,
    rating: 4.8,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HÀNG MỚI VỀ ✨",
    image: "assets/images/hero-sneaker.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Trắng Sữa / Xanh Navy",
    description: "Chất da bò dập vân kinh điển với logo cá sấu kim loại nổi bật vẻ sang trọng."
  },
  {
    id: 15,
    name: "Giày Puma Deviate Nitro 2 Carbon - Xanh Đen Volt",
    brand: "Puma",
    category: "running",
    price: 2990000,
    originalPrice: 3900000,
    discount: "-23%",
    soldCount: 112,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HÀNG MỚI VỀ ✨",
    image: "assets/images/shoe-metcon-volt.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Xanh Laser / Đen Phantom",
    description: "Bọt Nitro Elite siêu nảy kết hợp đĩa INNOPLATE chuyển đổi năng lượng tối đa."
  }
];

export const FLASH_SALE_ITEMS = [
  {
    id: 6,
    name: "Giày Nike Air Zoom Pegasus 41 Nữ - Trắng Xanh",
    brand: "Nike",
    category: "running",
    price: 2190000,
    originalPrice: 4410000,
    discount: "-50%",
    soldCount: 215,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    image: "assets/images/shoe-running-pro.jpg",
    sizes: [37, 38, 39, 40, 41],
    color: "Trắng / Xanh Cyan",
    description: "Sale 50% số lượng có hạn, đệm ReactX phản hồi năng lượng êm ái."
  },
  {
    id: 7,
    name: "Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương",
    brand: "Nike",
    category: "running",
    price: 2390000,
    originalPrice: 3965000,
    discount: "-40%",
    soldCount: 198,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    image: "assets/images/shoe-pegasus-blue.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Xanh Dương / Cam",
    description: "Giày chạy bộ quốc dân bán chạy nhất tại hệ thống."
  },
  {
    id: 8,
    name: "Giày Marathon TC Velocity-X Pro Carbon - Đen Đỏ",
    brand: "TC Sport",
    category: "running",
    price: 2390000,
    originalPrice: 3965000,
    discount: "-40%",
    soldCount: 137,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    image: "assets/images/hero-sneaker.jpg",
    sizes: [39, 40, 41, 42, 43, 44],
    color: "Đỏ Crimson / Đen Carbon",
    description: "Trang bị đĩa sợi Carbon trợ lực đẩy 87% cho vận động viên."
  },
  {
    id: 9,
    name: "Giày Sneaker TC Retro Sand Classic - Be Cát",
    brand: "TC Sport",
    category: "lifestyle",
    price: 1690000,
    originalPrice: 3050000,
    discount: "-45%",
    soldCount: 171,
    rating: 4.8,
    badgeSale: "🎁 SIÊU SALE 🎁",
    image: "assets/images/shoe-beige-retro.jpg",
    sizes: [38, 39, 40, 41, 42, 43],
    color: "Be Cát / Kem Linen",
    description: "Màu be cát thanh lịch, da lộn êm ái phù hợp đi làm, dạo phố."
  },
  {
    id: 10,
    name: "Giày Nike Air Max Bella TR 5 Nữ - Đen Hồng",
    brand: "Nike",
    category: "training",
    price: 1290000,
    originalPrice: 2500000,
    discount: "-48%",
    soldCount: 194,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    image: "assets/images/shoe-metcon-volt.jpg",
    sizes: [36, 37, 38, 39],
    color: "Đen / Hồng Neon",
    description: "Đệm khí Air Max gót chân êm ái cho các bài tập gym và cardio nữ."
  },
  {
    id: 16,
    name: "Giày Chạy Bộ Nam Asics Novablast 4 - Xám Bạc",
    brand: "Asics",
    category: "running",
    price: 2490000,
    originalPrice: 3750000,
    discount: "-34%",
    soldCount: 183,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    image: "assets/images/shoe-asics-runner.jpg",
    sizes: [40, 41, 42, 43],
    color: "Xám Bạc / Cam Neon",
    description: "Công nghệ đế trampoline bật nảy độc quyền tạo bước chạy bay bổng."
  },
  {
    id: 17,
    name: "Giày Pickleball Pro Court - Trắng Xanh Hoàng Gia",
    brand: "TC Sport",
    category: "pickleball",
    price: 1850000,
    originalPrice: 2600000,
    discount: "-29%",
    soldCount: 220,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    image: "assets/images/shoe-pickleball-pro.jpg",
    sizes: [39, 40, 41, 42, 43, 44],
    color: "Trắng Sứ / Xanh Cobalt",
    description: "Chống mài mòn đế cao su Duralast vượt trội khi di chuyển ngang."
  },
  {
    id: 18,
    name: "Giày Nike Air Jordan 1 Low OG - Xám Tro Shadow",
    brand: "Jordan",
    category: "lifestyle",
    price: 3290000,
    originalPrice: 4200000,
    discount: "-22%",
    soldCount: 310,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    image: "assets/images/shoe-retro-high.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Xám Tro / Đen / Trắng",
    description: "Phối màu Shadow kinh điển phối cùng mọi trang phục thể thao đường phố."
  },
  {
    id: 19,
    name: "Giày Thể Thao Lacoste T-Clip Leather - Trắng Be",
    brand: "Lacoste",
    category: "lifestyle",
    price: 2450000,
    originalPrice: 3500000,
    discount: "-30%",
    soldCount: 140,
    rating: 4.8,
    badgeSale: "🎁 SIÊU SALE 🎁",
    image: "assets/images/hero-beige-sneakers.jpg",
    sizes: [39, 40, 41, 42],
    color: "Trắng Ngà / Be Vintage",
    description: "Cảm hứng quần vợt thập niên 80 với chất liệu da cao cấp mềm mại."
  },
  {
    id: 20,
    name: "Giày Chạy Bộ Nike Air Zoom Structure 25 - Đen Trắng",
    brand: "Nike",
    category: "running",
    price: 2150000,
    originalPrice: 3600000,
    discount: "-40%",
    soldCount: 175,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    image: "assets/images/shoe-pegasus-blue.jpg",
    sizes: [40, 41, 42, 43],
    color: "Đen / Trắng Pure",
    description: "Hỗ trợ ổn định chống lệch bàn chân khi tiếp đất cho cự ly dài."
  }
];

export const ADDITIONAL_CATALOG_PRODUCTS = [
  // Adidas
  {
    id: 21,
    name: "Giày Sneaker Adidas Samba OG - Trắng Sọc Đen Gum",
    brand: "Adidas",
    category: "lifestyle",
    price: 2790000,
    originalPrice: 3200000,
    discount: "-13%",
    soldCount: 420,
    rating: 5.0,
    badgeSale: "🔥 HOT TREND 🔥",
    badgeNew: "✨ BEST SELLER ✨",
    image: "assets/images/hero-beige-sneakers.jpg",
    sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    color: "Trắng / Đen / Đế Gum",
    description: "Cơn sốt thời trang toàn cầu với chất da bò dẻo dai, mũi da lộn T-toe kinh điển phối đồ cực chất."
  },
  {
    id: 22,
    name: "Giày Chạy Bộ Adidas Adizero Adios Pro 3 - Cam Neon",
    brand: "Adidas",
    category: "running",
    price: 4890000,
    originalPrice: 5800000,
    discount: "-16%",
    soldCount: 95,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ RACING PRO ✨",
    image: "assets/images/shoe-running-pro.jpg",
    sizes: [40, 41, 42, 43],
    color: "Cam Solar / Đen",
    description: "Vũ khí phá kỷ lục Marathon của các VĐV đỉnh cao với thanh năng lượng EnergyRods 2.0 bứt tốc vượt bậc."
  },
  {
    id: 23,
    name: "Giày Tennis/Pickleball Adidas Barricade 13 - Trắng Xanh",
    brand: "Adidas",
    category: "pickleball",
    price: 3150000,
    originalPrice: 3900000,
    discount: "-19%",
    soldCount: 88,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ BÁN CHẠY ✨",
    image: "assets/images/shoe-pickleball-pro.jpg",
    sizes: [39, 40, 41, 42, 43, 44],
    color: "Trắng / Xanh Cobalt",
    description: "Khung hỗ trợ Torsion System chống vặn xoắn gót chân khi cứu bóng gấp trên sân Pickleball và Tennis."
  },
  {
    id: 24,
    name: "Giày Sneaker Adidas Stan Smith Lux - Trắng Viền Xanh Lá",
    brand: "Adidas",
    category: "lifestyle",
    price: 2690000,
    originalPrice: 3300000,
    discount: "-18%",
    soldCount: 310,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ CLASSIC ✨",
    image: "assets/images/hero-sneaker.jpg",
    sizes: [36, 37, 38, 39, 40, 41, 42],
    color: "Trắng Sữa / Xanh Green",
    description: "Biểu tượng thời trang vượt thời gian với chất da thuộc Lux siêu mềm, lót da nguyên bản êm chân."
  },
  {
    id: 25,
    name: "Giày Tập Gym Nam Adidas Dropset 2 - Đen Xám",
    brand: "Adidas",
    category: "training",
    price: 2490000,
    originalPrice: 3100000,
    discount: "-20%",
    soldCount: 135,
    rating: 4.8,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "",
    image: "assets/images/shoe-metcon-volt.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Đen Carbon / Xám Đá",
    description: "Độ chênh lệch gót thấp 6mm vững chãi khi gánh tạ và nâng tạ nặng trong phòng Gym."
  },
  // Asics
  {
    id: 26,
    name: "Giày Chạy Bộ Asics Gel-Kayano 30 - Xanh Dương Gradient",
    brand: "Asics",
    category: "running",
    price: 3890000,
    originalPrice: 4400000,
    discount: "-12%",
    soldCount: 175,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ CÔNG NGHỆ MỚI ✨",
    image: "assets/images/shoe-asics-runner.jpg",
    sizes: [40, 41, 42, 43, 44],
    color: "Xanh Ocean / Trắng Bạc",
    description: "Hệ thống 4D GUIDANCE SYSTEM ổn định bàn chân thích ứng sinh học, nâng niu từng bước chạy marathon."
  },
  {
    id: 27,
    name: "Giày Tennis/Pickleball Asics Court FF 3 Novak - Đỏ Trắng",
    brand: "Asics",
    category: "pickleball",
    price: 3950000,
    originalPrice: 4600000,
    discount: "-14%",
    soldCount: 110,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ ĐẲNG CẤP VIP ✨",
    image: "assets/images/shoe-pickleball-pro.jpg",
    sizes: [40, 41, 42, 43],
    color: "Đỏ Ruby / Trắng / Vàng Gold",
    description: "Mẫu giày thi đấu của Novak Djokovic với công nghệ TWISTRUSS tăng tốc độ chuyển hướng trên sân đấu."
  },
  // Puma
  {
    id: 28,
    name: "Giày Sneaker Puma Suede Classic XXI - Đen Trắng",
    brand: "Puma",
    category: "lifestyle",
    price: 1890000,
    originalPrice: 2400000,
    discount: "-21%",
    soldCount: 260,
    rating: 4.8,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ HUYỀN THOẠI ✨",
    image: "assets/images/shoe-metcon-volt.jpg",
    sizes: [38, 39, 40, 41, 42, 43],
    color: "Đen Suede / Trắng Tuyết",
    description: "Chất da lộn mịn màng đậm chất B-boy đường phố New York thập niên 1968 đến nay."
  },
  {
    id: 29,
    name: "Giày Bóng Rổ Puma Court Rider Chaos - Xanh Neon Đỏ",
    brand: "Puma",
    category: "basketball",
    price: 2290000,
    originalPrice: 3000000,
    discount: "-24%",
    soldCount: 95,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "",
    image: "assets/images/shoe-retro-high.jpg",
    sizes: [40, 41, 42, 43, 44],
    color: "Xanh Volt / Đỏ Lava",
    description: "Đệm Rider Foam bùng nổ sức bật và khả năng hãm phanh tức thì trên mặt sàn bóng rổ."
  },
  {
    id: 30,
    name: "Giày Chạy Bộ Puma Velocity Nitro 3 - Cam Lửa",
    brand: "Puma",
    category: "running",
    price: 2590000,
    originalPrice: 3400000,
    discount: "-24%",
    soldCount: 140,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ MẪU MỚI 2026 ✨",
    image: "assets/images/shoe-running-pro.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Cam Lửa / Đen Puma",
    description: "Dòng giày chạy hàng ngày êm ái bậc nhất với đế bọt Nitro bốc hơi nhẹ nhàng và bám đường PUMAGRIP."
  },
  // Lacoste
  {
    id: 31,
    name: "Giày Thể Thao Lacoste Lineshot Court - Trắng Xanh Rêu",
    brand: "Lacoste",
    category: "lifestyle",
    price: 3250000,
    originalPrice: 3950000,
    discount: "-18%",
    soldCount: 105,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ PREMIUM LUX ✨",
    image: "assets/images/hero-beige-sneakers.jpg",
    sizes: [39, 40, 41, 42, 43],
    color: "Trắng Sữa / Xanh Olive",
    description: "Phom dáng retro tennis thập niên 90 kết hợp đệm lót OrthoLite thoáng khí và êm nhẹ cả ngày."
  },
  {
    id: 32,
    name: "Giày Tennis/Pickleball Lacoste AG-LT23 Ultra - Trắng Đỏ",
    brand: "Lacoste",
    category: "pickleball",
    price: 3890000,
    originalPrice: 4700000,
    discount: "-17%",
    soldCount: 82,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ PRO COURT ✨",
    image: "assets/images/shoe-pickleball-pro.jpg",
    sizes: [40, 41, 42, 43],
    color: "Trắng / Đỏ / Xanh Navy",
    description: "Dòng giày thi đấu chuyên nghiệp của Daniil Medvedev mang lại sự bùng nổ và cân bằng tuyệt đỉnh."
  },
  // Jordan & Nike
  {
    id: 33,
    name: "Giày Bóng Rổ Jordan Luka 2 - Trắng Tím Độc Bản",
    brand: "Jordan",
    category: "basketball",
    price: 3590000,
    originalPrice: 4200000,
    discount: "-15%",
    soldCount: 188,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ ĐẲNG CẤP NBA ✨",
    image: "assets/images/shoe-retro-high.jpg",
    sizes: [40, 41, 42, 43, 44, 45],
    color: "Trắng Pure / Tím Nebula",
    description: "Dòng giày thửa riêng của siêu sao Luka Dončić hỗ trợ di chuyển bước lùi Step-back thần tốc."
  },
  {
    id: 34,
    name: "Giày Chạy Bộ Nike InfinityRN 4 - Xanh Pastel",
    brand: "Nike",
    category: "running",
    price: 2990000,
    originalPrice: 4200000,
    discount: "-29%",
    soldCount: 230,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ ÊM ÁI CHỐNG CHẤN THƯƠNG ✨",
    image: "assets/images/shoe-running-pro.jpg",
    sizes: [37, 38, 39, 40, 41, 42],
    color: "Xanh Pastel / Trắng Ngọc",
    description: "Công nghệ bọt ReactX mới giảm rung chấn 13% và hỗ trợ đệm mềm mại nâng đỡ vòm chân hoàn hảo."
  },
  {
    id: 35,
    name: "Giày Tập Gym Nữ Nike Metcon 9 - Trắng Hồng Rose",
    brand: "Nike",
    category: "training",
    price: 3290000,
    originalPrice: 3800000,
    discount: "-13%",
    soldCount: 160,
    rating: 5.0,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ GYM PRO ✨",
    image: "assets/images/shoe-metcon-volt.jpg",
    sizes: [36, 37, 38, 39, 40],
    color: "Trắng / Hồng Rose Gold",
    description: "Tấm Hyperlift ở gót mở rộng hơn, bọc cao su chống rách khi leo dây và trụ chân siêu đầm."
  },
  {
    id: 36,
    name: "Giày Chạy Bộ TC Sport Storm Runner 2.0 - Đen Xanh",
    brand: "TC Sport",
    category: "running",
    price: 1590000,
    originalPrice: 2200000,
    discount: "-28%",
    soldCount: 310,
    rating: 4.9,
    badgeSale: "🎁 SIÊU SALE 🎁",
    badgeNew: "✨ BÁN CHẠY NHẤT ✨",
    image: "assets/images/shoe-asics-runner.jpg",
    sizes: [38, 39, 40, 41, 42, 43],
    color: "Đen / Xanh Dạ Quang",
    description: "Mẫu giày chạy bộ chuẩn form chân người Việt, đệm khí trợ lực êm nhẹ bền bỉ trên 1.000km."
  }
];

export const ALL_PRODUCTS = [...NEW_ARRIVALS, ...FLASH_SALE_ITEMS, ...ADDITIONAL_CATALOG_PRODUCTS];

export function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// ==============================================================================
// 🛠️ HÀM QUẢN LÝ KHO DỮ LIỆU ĐỘNG CHO TRANG ADMIN (LOCALSTORAGE CATALOG CRUD)
// ==============================================================================
export function getStoredProducts() {
  try {
    const raw = localStorage.getItem('tc_products_catalog');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Lỗi đọc kho sản phẩm:', err);
  }
  return ALL_PRODUCTS;
}

export function saveStoredProducts(products) {
  try {
    localStorage.setItem('tc_products_catalog', JSON.stringify(products));
    window.dispatchEvent(new Event('tc_products_updated'));
  } catch (err) {
    console.error('Lỗi lưu kho sản phẩm:', err);
  }
}

export function resetStoredProducts() {
  try {
    localStorage.removeItem('tc_products_catalog');
    window.dispatchEvent(new Event('tc_products_updated'));
  } catch (err) {
    console.error('Lỗi reset kho sản phẩm:', err);
  }
}

// ==============================================================================
// 📦 DỮ LIỆU ĐƠN HÀNG MẪU DÀNH CHO ADMIN DEMO (INITIAL DEMO ORDERS)
// ==============================================================================
export const SEED_INITIAL_ORDERS = [
  {
    id: "TC88291",
    date: "24/10/2026",
    time: "14:30",
    status: "Đang chuẩn bị hàng",
    statusClass: "status-badge-shipping",
    carrier: "Viettel Post",
    trackingCode: "VTP-8829104VN",
    internalNote: "Khách VIP, đã xác nhận qua Zalo. Dặn bọc hộp cẩn thận không móp.",
    timeline: [
      { time: "24/10/2026 14:30", action: "Khách hàng đặt đơn hàng trực tuyến", actor: "Khách hàng" },
      { time: "24/10/2026 14:45", action: "Admin Cường Tiến xác nhận đơn qua điện thoại", actor: "Cườngg Tiến" },
      { time: "24/10/2026 15:10", action: "In phiếu xuất kho, chuyển bộ phận đóng gói", actor: "Kho Xã Đàn" }
    ],
    total: "4.780.000₫",
    totalAmount: 4780000,
    costAmount: 3200000,
    item: "Giày Nike Air Zoom Pegasus 40 Nam (+1 sản phẩm khác)",
    size: 42,
    image: "assets/images/shoe-pegasus-blue.jpg",
    customer: {
      name: "Nguyễn Văn Tiến",
      phone: "0973711868",
      address: "249 Xã Đàn, Phường Nam Đồng, Quận Đống Đa, Hà Nội",
      email: "tienc@gmail.com"
    },
    paymentMethod: "Chuyển khoản QR Techcombank",
    paymentStatus: "Đã thanh toán",
    note: "Giao giờ hành chính, gọi trước 15 phút.",
    items: [
      {
        id: 1,
        sku: "NK-PEG40-BLU-42",
        name: "Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương",
        brand: "Nike",
        size: 42,
        price: 2390000,
        costPrice: 1600000,
        quantity: 2,
        image: "assets/images/shoe-pegasus-blue.jpg",
        subtotal: 4780000
      }
    ]
  },
  {
    id: "TC77104",
    date: "23/10/2026",
    time: "09:15",
    status: "Đang giao hàng",
    statusClass: "status-badge-shipping",
    carrier: "Giao Hàng Tiết Kiệm (GHTK)",
    trackingCode: "GHTK-7710488HN",
    internalNote: "Bưu tá GHTK đã lấy hàng lúc 10h sáng 23/10.",
    timeline: [
      { time: "23/10/2026 09:15", action: "Khách hàng đặt đơn hàng trực tuyến", actor: "Khách hàng" },
      { time: "23/10/2026 09:30", action: "Xác nhận địa chỉ giao hàng tại Thanh Xuân", actor: "Cườngg Tiến" },
      { time: "23/10/2026 10:15", action: "Đã bàn giao cho bưu tá GHTK", actor: "Bưu tá GHTK" }
    ],
    total: "4.690.000₫",
    totalAmount: 4690000,
    costAmount: 3100000,
    item: "Giày Air Jordan 1 Retro High OG - Đỏ Chicago",
    size: 43,
    image: "assets/images/shoe-retro-high.jpg",
    customer: {
      name: "Trần Minh Quân",
      phone: "0912345678",
      address: "128 Nguyễn Trãi, Phường Thanh Xuân Bắc, Quận Thanh Xuân, Hà Nội",
      email: "quan.tm@gmail.com"
    },
    paymentMethod: "Thanh toán COD khi nhận hàng",
    paymentStatus: "Chờ thanh toán",
    note: "Cho xem hàng kiểm tra tem mác trước khi nhận.",
    items: [
      {
        id: 2,
        sku: "JD-RETRO1-RED-43",
        name: "Giày Air Jordan 1 Retro High OG - Đỏ Chicago",
        brand: "Jordan",
        size: 43,
        price: 4690000,
        costPrice: 3100000,
        quantity: 1,
        image: "assets/images/shoe-retro-high.jpg",
        subtotal: 4690000
      }
    ]
  },
  {
    id: "TC65219",
    date: "22/10/2026",
    time: "16:45",
    status: "Đã giao thành công",
    statusClass: "status-badge-success",
    carrier: "Viettel Post",
    trackingCode: "VTP-6521922SG",
    internalNote: "Đã giao thành công, khách đã nhận tại lễ tân Landmark 81.",
    timeline: [
      { time: "22/10/2026 16:45", action: "Đặt hàng thành công", actor: "Khách hàng" },
      { time: "22/10/2026 17:00", action: "Thanh toán QR Techcombank hoàn tất", actor: "Cổng thanh toán" },
      { time: "23/10/2026 14:00", action: "Giao hàng thành công đến tay người nhận", actor: "Bưu tá Viettel Post" }
    ],
    total: "3.190.000₫",
    totalAmount: 3190000,
    costAmount: 2100000,
    item: "Giày Nike Free Metcon 5 - Đen Vàng Volt Gym",
    size: 41,
    image: "assets/images/shoe-metcon-volt.jpg",
    customer: {
      name: "Lê Hoàng Yến",
      phone: "0988776655",
      address: "Tòa Landmark 81, 720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh",
      email: "hoangyen.le@outlook.com"
    },
    paymentMethod: "Chuyển khoản QR Techcombank",
    paymentStatus: "Đã thanh toán",
    note: "Giao lễ tân tòa nhà nhận hộ.",
    items: [
      {
        id: 3,
        sku: "NK-METCON5-VLT-41",
        name: "Giày Nike Free Metcon 5 - Đen Vàng Volt Gym",
        brand: "Nike",
        size: 41,
        price: 3190000,
        costPrice: 2100000,
        quantity: 1,
        image: "assets/images/shoe-metcon-volt.jpg",
        subtotal: 3190000
      }
    ]
  },
  {
    id: "TC54092",
    date: "21/10/2026",
    time: "11:20",
    status: "Đã giao thành công",
    statusClass: "status-badge-success",
    carrier: "Giao Hàng Nhanh (GHN)",
    trackingCode: "GHN-5409211DN",
    internalNote: "Khách quen chạy bộ Marathon Đà Nẵng, khen giày đi rất êm.",
    timeline: [
      { time: "21/10/2026 11:20", action: "Đặt hàng trực tuyến", actor: "Khách hàng" },
      { time: "22/10/2026 15:40", action: "Đã giao thành công và thu tiền COD", actor: "Bưu tá GHN" }
    ],
    total: "1.590.000₫",
    totalAmount: 1590000,
    costAmount: 980000,
    item: "Giày Chạy Bộ TC Sport Storm Runner 2.0 - Đen Xanh",
    size: 40,
    image: "assets/images/shoe-asics-runner.jpg",
    customer: {
      name: "Phạm Hải Đăng",
      phone: "0905123987",
      address: "45 Lê Lợi, Phường Thạch Thang, Quận Hải Châu, TP. Đà Nẵng",
      email: "haidang.dn@gmail.com"
    },
    paymentMethod: "Thanh toán COD khi nhận hàng",
    paymentStatus: "Đã thanh toán",
    note: "Đã nhận hàng và đánh giá 5 sao.",
    items: [
      {
        id: 36,
        sku: "TC-STORM2-BLK-40",
        name: "Giày Chạy Bộ TC Sport Storm Runner 2.0 - Đen Xanh",
        brand: "TC Sport",
        size: 40,
        price: 1590000,
        costPrice: 980000,
        quantity: 1,
        image: "assets/images/shoe-asics-runner.jpg",
        subtotal: 1590000
      }
    ]
  },
  {
    id: "TC43105",
    date: "20/10/2026",
    time: "18:00",
    status: "Đã hủy đơn",
    statusClass: "status-badge-cancelled",
    carrier: "Chưa phân bổ",
    trackingCode: "---",
    internalNote: "Khách đổi ý muốn đổi sang mẫu Asics Court FF, đã gọi tư vấn lại.",
    timeline: [
      { time: "20/10/2026 18:00", action: "Khách hàng đặt hàng", actor: "Khách hàng" },
      { time: "20/10/2026 18:30", action: "Khách yêu cầu hủy để đổi mẫu khác", actor: "Khách hàng" }
    ],
    total: "2.890.000₫",
    totalAmount: 2890000,
    costAmount: 1800000,
    item: "Giày Pickleball TC Court Master Pro",
    size: 42,
    image: "assets/images/shoe-pickleball-pro.jpg",
    customer: {
      name: "Đỗ Quốc Cường",
      phone: "0934567890",
      address: "15 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội",
      email: "cuongdq@gmail.com"
    },
    paymentMethod: "Thanh toán COD khi nhận hàng",
    paymentStatus: "Chưa thanh toán",
    note: "Khách đổi ý muốn đổi sang mẫu Asics Court FF.",
    items: [
      {
        id: 10,
        sku: "TC-COURTPRO-WHT-42",
        name: "Giày Pickleball TC Court Master Pro - Trắng Xanh",
        brand: "TC Sport",
        size: 42,
        price: 2890000,
        costPrice: 1800000,
        quantity: 1,
        image: "assets/images/shoe-pickleball-pro.jpg",
        subtotal: 2890000
      }
    ]
  }
];
