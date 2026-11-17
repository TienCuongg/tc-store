/**
 * TC SPORT - JAVASCRIPT ENGINE (EXACT MYSHOES.VN REPLICA)
 * Dual 5-Column Grid (New Arrivals + Flash Sale) • Typewriter AI • Autocomplete • Modals
 */

// ==========================================================================
// 1. DATA STORE (Exact match with user screenshots)
// ==========================================================================
const NEW_ARRIVALS = [
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
    description: "Đệm hạt Boost Boost nhẹ hơn 30%, mang lại cảm giác êm ái vượt bậc suốt cả ngày."
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

const FLASH_SALE_ITEMS = [
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

const ADDITIONAL_CATALOG_PRODUCTS = [
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

const ALL_PRODUCTS = [...NEW_ARRIVALS, ...FLASH_SALE_ITEMS, ...ADDITIONAL_CATALOG_PRODUCTS];

// Expose globally for category.html, search, and future backend integration
if (typeof window !== "undefined") {
  window.ALL_PRODUCTS = ALL_PRODUCTS;
  window.PRODUCTS_DATA = ALL_PRODUCTS;
}

// App State
const state = {
  cart: [
    {
      productId: 1,
      size: 41,
      quantity: 1
    }
  ],
  quickViewItem: null,
  quickViewSelectedSize: 41,
  appliedVoucher: null
};

// Formatting
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

// Toast
function showToast(message, type = "info") {
  const container = document.getElementById("toast-wrapper");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast-msg";
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================================================
// 2. PRODUCT CARDS RENDERING (Exact MyShoes mysoft-product-card)
// ==========================================================================
function renderCardHTML(p) {
  return `
    <div class="mysoft-product-card" onclick="openQuickViewModal(${p.id})">
      <!-- Media Box with exact MyShoes corner badges -->
      <div class="card-media-square">
        <img src="${p.image}" alt="${p.name}" class="shoe-profile-img" loading="lazy">
        
        <!-- Top Left Badges -->
        <div class="badge-left-stack">
          <div class="badge-sieu-sale-tag">${p.badgeSale}</div>
          ${p.badgeNew ? `<div class="badge-new-arrival-tag">${p.badgeNew}</div>` : ''}
        </div>

        <!-- Top Right Badges -->
        <div class="badge-right-stack">
          <div class="badge-discount-percent">${p.discount}</div>
          <div class="badge-tang-tat">TẶNG TẤT</div>
        </div>
      </div>

      <!-- Card Content -->
      <div class="card-content-wrap">
        <h3 class="shoe-card-title" title="${p.name}">${p.name}</h3>
        
        <div class="price-hierarchy-row">
          <span class="price-sale-bold">${formatVND(p.price)}</span>
          <span class="price-old-strike">${formatVND(p.originalPrice)}</span>
        </div>

        <div class="card-rating-sales-row">
          <svg class="star-svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span>${p.rating.toFixed(1)}</span>
          <span class="divider-pipe">|</span>
          <span>Đã bán ${p.soldCount}</span>
        </div>
      </div>
    </div>
  `;
}

if (typeof window !== "undefined") {
  window.renderCardHTML = renderCardHTML;
  window.renderProductCardHTML = renderCardHTML;
}

function renderGrids() {
  const newGrid = document.getElementById("new-arrivals-grid");
  const flashGrid = document.getElementById("flash-sale-grid");

  if (newGrid) {
    newGrid.innerHTML = NEW_ARRIVALS.map(renderCardHTML).join("");
  }
  if (flashGrid) {
    flashGrid.innerHTML = FLASH_SALE_ITEMS.map(renderCardHTML).join("");
  }
}

// Brand Filter Action
function filterByBrand(brandName) {
  const matches = ALL_PRODUCTS.filter(p => p.brand.toLowerCase() === brandName.toLowerCase());
  const newGrid = document.getElementById("new-arrivals-grid");
  if (newGrid) {
    newGrid.innerHTML = matches.map(renderCardHTML).join("");
    newGrid.scrollIntoView({ behavior: "smooth" });
  }
  showToast(`Hiển thị các mẫu giày ${brandName} chính hãng`, "info");
}

function filterByCategory(category) {
  if (category === "all") {
    renderGrids();
    return;
  }
  const matches = ALL_PRODUCTS.filter(p => p.category === category);
  const newGrid = document.getElementById("new-arrivals-grid");
  if (newGrid) {
    newGrid.innerHTML = matches.map(renderCardHTML).join("");
    newGrid.scrollIntoView({ behavior: "smooth" });
  }
}

function filterByBrandAndCat(brand, cat) {
  const matches = ALL_PRODUCTS.filter(p => p.brand.toLowerCase() === brand.toLowerCase() && p.category === cat);
  const newGrid = document.getElementById("new-arrivals-grid");
  if (newGrid) {
    newGrid.innerHTML = matches.map(renderCardHTML).join("");
    newGrid.scrollIntoView({ behavior: "smooth" });
  }
}

// ==========================================================================
// 3. TYPEWRITER AI SEARCH ANIMATION (Exact MyShoes phrases)
// ==========================================================================
const searchPhrases = [
  "Tìm kiếm giày thông minh bằng AI...",
  "Hỗ trợ đổi hàng dễ dàng 30 ngày...",
  "Sản phẩm chính hãng 100%...",
  "Freeship toàn quốc từ 1.000.000₫...",
  "Bảo hành keo chỉ 12 tháng uy tín..."
];

function initTypewriter() {
  const inputEl = document.getElementById("search-input-main");
  const boxEl = document.getElementById("search-typewriter-box");
  const textEl = document.getElementById("search-typewriter-text");
  if (!inputEl || !boxEl || !textEl) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 90;

  function tick() {
    const phrase = searchPhrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      textEl.textContent = phrase.substring(0, charIndex);
      if (charIndex >= phrase.length) {
        isDeleting = true;
        delay = 2000;
      } else {
        delay = 70;
      }
    } else {
      charIndex--;
      textEl.textContent = phrase.substring(0, charIndex);
      if (charIndex <= 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % searchPhrases.length;
        delay = 400;
      } else {
        delay = 35;
      }
    }
    setTimeout(tick, delay);
  }

  function toggleVisibility() {
    boxEl.classList.toggle("hidden", inputEl.value.trim().length > 0 || document.activeElement === inputEl);
  }

  inputEl.addEventListener("focus", toggleVisibility);
  inputEl.addEventListener("blur", toggleVisibility);
  inputEl.addEventListener("input", toggleVisibility);

  tick();
}

// Live Autocomplete
function initAutocomplete() {
  const inputEl = document.getElementById("search-input-main");
  const dropdownEl = document.getElementById("search-autocomplete-dropdown");
  const itemsWrap = document.getElementById("autocomplete-items");
  if (!inputEl || !dropdownEl || !itemsWrap) return;

  inputEl.addEventListener("input", function() {
    const q = this.value.trim().toLowerCase();
    if (q.length < 2) {
      dropdownEl.classList.remove("active");
      return;
    }

    const matches = ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    if (matches.length === 0) {
      itemsWrap.innerHTML = `<div style="padding: 14px; text-align: center; color: #9CA3AF; font-size: 0.85rem;">Không tìm thấy sản phẩm khớp với "${q}"</div>`;
      dropdownEl.classList.add("active");
      return;
    }

    itemsWrap.innerHTML = matches.map(p => `
      <div class="autocomplete-row" onclick="openQuickViewModal(${p.id}); document.getElementById('search-autocomplete-dropdown').classList.remove('active');">
        <img src="${p.image}" alt="${p.name}" class="autocomplete-row-thumb">
        <div class="autocomplete-row-info">
          <div class="autocomplete-row-title">${p.name}</div>
          <div class="autocomplete-row-price">${formatVND(p.price)}</div>
        </div>
      </div>
    `).join("");

    dropdownEl.classList.add("active");
  });

  document.addEventListener("click", function(e) {
    if (!inputEl.contains(e.target) && !dropdownEl.contains(e.target)) {
      dropdownEl.classList.remove("active");
    }
  });

  inputEl.addEventListener("keydown", function(e) {
    if (e.key === "Enter") executeSearch();
  });
}

function executeSearch() {
  const inputEl = document.getElementById("search-input-main");
  if (!inputEl) return;
  const q = inputEl.value.trim().toLowerCase();
  if (!q) return;

  const matches = ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  const newGrid = document.getElementById("new-arrivals-grid");
  if (newGrid) {
    newGrid.innerHTML = matches.map(renderCardHTML).join("");
    newGrid.scrollIntoView({ behavior: "smooth" });
  }
  showToast(`Tìm thấy ${matches.length} sản phẩm phù hợp`, "info");
}

// ==========================================================================
// 4. CART SYSTEM & FREE SHIPPING PROGRESS METER
// ==========================================================================
function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-drawer-backdrop");
  if (drawer && backdrop) {
    drawer.classList.add("active");
    backdrop.classList.add("active");
    renderCart();
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-drawer-backdrop");
  if (drawer && backdrop) {
    drawer.classList.remove("active");
    backdrop.classList.remove("active");
  }
}

function addToCart(productId, size, quantity = 1) {
  const existing = state.cart.find(item => item.productId === productId && item.size === size);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({ productId, size, quantity });
  }
  updateCartBadges();
  renderCart();
  saveCartToStorage();
  openCartDrawer();
  showToast("Đã thêm giày vào giỏ hàng!", "info");
}

function updateCartQuantity(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }
  updateCartBadges();
  renderCart();
  saveCartToStorage();
}

function removeCartItem(index) {
  state.cart.splice(index, 1);
  updateCartBadges();
  renderCart();
  saveCartToStorage();
}

function updateCartBadges() {
  const total = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const counter = document.getElementById("cart-counter");
  if (counter) counter.textContent = total;
  const dockBadge = document.getElementById("dock-cart-counter");
  if (dockBadge) dockBadge.textContent = total;
}

function renderCart() {
  const container = document.getElementById("cart-items-list");
  const subtotalEl = document.getElementById("cart-summary-subtotal");
  const discountEl = document.getElementById("cart-summary-discount");
  const shippingEl = document.getElementById("cart-summary-shipping");
  const totalEl = document.getElementById("cart-summary-total");
  const meterText = document.getElementById("shipping-meter-status");
  const meterFill = document.getElementById("shipping-meter-fill");
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div style="padding: 48px 20px; text-align: center; color: #6B7280;">
        <p style="font-weight: 700; color: #111827; font-size: 1rem;">Giỏ hàng của bạn đang trống</p>
        <p style="font-size: 0.8rem; margin-top: 4px;">Hãy chọn ngay những mẫu giày thể thao chính hãng yêu thích!</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = "0₫";
    if (discountEl) discountEl.textContent = "0₫";
    if (shippingEl) shippingEl.textContent = "0₫";
    if (totalEl) totalEl.textContent = "0₫";
    if (meterText) meterText.textContent = "Mua thêm 1.000.000₫ để được Miễn Phí Vận Chuyển";
    if (meterFill) meterFill.style.width = "0%";
    return;
  }

  let subtotal = 0;
  container.innerHTML = state.cart.map((item, idx) => {
    const p = ALL_PRODUCTS.find(prod => prod.id === item.productId);
    if (!p) return "";
    subtotal += p.price * item.quantity;

    return `
      <div class="cart-item-card">
        <img src="${p.image}" alt="${p.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-name" title="${p.name}">${p.name}</div>
          <div class="cart-item-meta">Kích cỡ: <b>Size ${item.size}</b></div>
          <div class="cart-item-price">${formatVND(p.price)}</div>
          <div class="cart-item-stepper">
            <button class="btn-stepper" onclick="updateCartQuantity(${idx}, -1)">-</button>
            <span class="stepper-num">${item.quantity}</span>
            <button class="btn-stepper" onclick="updateCartQuantity(${idx}, 1)">+</button>
          </div>
        </div>
        <button class="btn-item-remove" onclick="removeCartItem(${idx})">✕</button>
      </div>
    `;
  }).join("");

  // Free shipping meter
  const threshold = 1000000;
  let shippingFee = subtotal >= threshold ? 0 : 30000;
  const percent = Math.min(100, Math.round((subtotal / threshold) * 100));

  if (meterFill) meterFill.style.width = `${percent}%`;
  if (meterText) {
    if (subtotal >= threshold) {
      meterText.innerHTML = `🎉 <b>CHÚC MỪNG:</b> Bạn được <b>MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC!</b>`;
    } else {
      meterText.innerHTML = `Mua thêm <b>${formatVND(threshold - subtotal)}</b> để nhận <b>FREESHIP TOÀN QUỐC</b>`;
    }
  }

  let discount = state.appliedVoucher === "TC50K" ? 50000 : 0;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);

  if (subtotalEl) subtotalEl.textContent = formatVND(subtotal);
  if (discountEl) discountEl.textContent = discount > 0 ? `-${formatVND(discount)}` : "0₫";
  if (shippingEl) shippingEl.textContent = shippingFee === 0 ? "Miễn phí" : formatVND(shippingFee);
  if (totalEl) totalEl.textContent = formatVND(finalTotal);
}

function applyVoucherCode() {
  const input = document.getElementById("voucher-code-input");
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === "TC50K") {
    state.appliedVoucher = "TC50K";
    renderCart();
    showToast("Đã áp dụng mã giảm 50.000₫!", "info");
  } else if (code === "FREESHIP") {
    state.appliedVoucher = "FREESHIP";
    renderCart();
    showToast("Đã kích hoạt Miễn Phí Giao Hàng!", "info");
  } else {
    showToast("Mã voucher không hợp lệ", "info");
  }
}

// ==========================================================================
// 5. QUICK VIEW MODAL
// ==========================================================================
function openQuickViewModal(productId) {
  const p = ALL_PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;

  state.quickViewItem = p;
  state.quickViewSelectedSize = p.sizes[0] || 41;

  const modal = document.getElementById("quickview-modal");
  const content = document.getElementById("quickview-modal-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-img-box">
        <img src="${p.image}" alt="${p.name}">
      </div>

      <div class="quickview-details">
        <div style="font-size: 0.78rem; font-weight: 700; color: #C2410C; text-transform: uppercase;">${p.brand} • CHÍNH HÃNG</div>
        <h2 class="quickview-name">${p.name}</h2>
        
        <div class="quickview-price-strip">
          <span class="quickview-sale-price">${formatVND(p.price)}</span>
          <span class="quickview-old-price">${formatVND(p.originalPrice)}</span>
          <span style="background: #FF0000; color: #FFF; font-size: 0.65rem; font-weight: 900; padding: 2px 6px; border-radius: 4px;">${p.discount}</span>
        </div>

        <p style="font-size: 0.86rem; color: #4B5563; line-height: 1.6;">
          ${p.description}
        </p>

        <div>
          <div style="font-size: 0.84rem; font-weight: 700; margin-bottom: 6px;">Chọn kích cỡ:</div>
          <div class="size-pill-selector-row">
            ${p.sizes.map(s => `
              <button class="size-select-pill ${s === state.quickViewSelectedSize ? 'active' : ''}" onclick="selectQuickViewSize(${s}, this)">
                Size ${s}
              </button>
            `).join("")}
          </div>
        </div>

        <button class="btn-add-cart-large" onclick="confirmQuickViewAdd()">
          Thêm Vào Giỏ Hàng
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function selectQuickViewSize(size, btn) {
  state.quickViewSelectedSize = size;
  document.querySelectorAll(".size-select-pill").forEach(el => el.classList.remove("active"));
  btn.classList.add("active");
}

function confirmQuickViewAdd() {
  if (!state.quickViewItem) return;
  addToCart(state.quickViewItem.id, state.quickViewSelectedSize, 1);
  closeQuickViewModal();
}

function closeQuickViewModal() {
  const modal = document.getElementById("quickview-modal");
  if (modal) modal.classList.remove("active");
}

// ==========================================================================
// 6. SIZE GUIDE & CHECKOUT
// ==========================================================================
function openSizeGuideModal() {
  const modal = document.getElementById("size-guide-modal");
  if (modal) modal.classList.add("active");
}

function closeSizeGuideModal() {
  const modal = document.getElementById("size-guide-modal");
  if (modal) modal.classList.remove("active");
}

function computeShoeSize() {
  const input = document.getElementById("foot-cm-input");
  const display = document.getElementById("calc-result-display");
  if (!input || !display) return;

  const val = parseFloat(input.value);
  if (isNaN(val) || val < 21 || val > 32) {
    display.innerHTML = `⚠️ Chiều dài không hợp lệ. Vui lòng nhập từ <b>22 cm đến 30 cm</b>.`;
    return;
  }

  let size = 41;
  let advice = "Đi đúng size tiêu chuẩn";
  if (val <= 23.5) { size = 37; }
  else if (val <= 24.0) { size = 38; }
  else if (val <= 24.5) { size = 39; }
  else if (val <= 25.0) { size = 40; }
  else if (val <= 25.5) { size = 41; }
  else if (val <= 26.0) { size = 42; advice = "Bàn chân bè dày mu nên tăng 0.5 - 1 size"; }
  else if (val <= 26.5) { size = 43; }
  else if (val <= 27.0) { size = 44; }
  else { size = 45; }

  display.innerHTML = `
    👟 Chiều dài chân <b>${val} cm</b>: Khuyên chọn <b>Size ${size}</b> (${advice}).
  `;
}

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast("Giỏ hàng của bạn đang trống!", "info");
    return;
  }
  closeCartDrawer();
  const modal = document.getElementById("checkout-modal");
  const recapItems = document.getElementById("checkout-recap-items");
  const recapTotal = document.getElementById("checkout-recap-total");
  if (!modal || !recapItems || !recapTotal) return;

  let subtotal = 0;
  recapItems.innerHTML = state.cart.map(item => {
    const p = ALL_PRODUCTS.find(prod => prod.id === item.productId);
    if (!p) return "";
    const total = p.price * item.quantity;
    subtotal += total;
    return `
      <div style="display: flex; justify-content: space-between;">
        <span>• ${p.name} (Size ${item.size}) x${item.quantity}</span>
        <b>${formatVND(total)}</b>
      </div>
    `;
  }).join("");

  const shipping = subtotal >= 1000000 ? 0 : 30000;
  const discount = state.appliedVoucher === "TC50K" ? 50000 : 0;
  recapTotal.textContent = formatVND(Math.max(0, subtotal - discount + shipping));
  modal.classList.add("active");
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  if (modal) modal.classList.remove("active");
}

function handleOrderSubmission(e) {
  e.preventDefault();
  closeCheckoutModal();
  state.cart = [];
  updateCartBadges();
  renderCart();
  showToast("Đặt hàng thành công! Nhân viên TC SPORT sẽ liên hệ xác nhận đơn hàng sớm nhất.", "info");
}

// ==========================================================================
// AUTHENTICATION SYSTEM (LOGIN, REGISTER, GOOGLE OAUTH & DYNAMIC UI)
// ==========================================================================
function getAuthUser() {
  try {
    const saved = localStorage.getItem("tc_user_auth");
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return {
    isLoggedIn: false,
    name: "Khách hàng",
    email: "",
    phone: "",
    authProvider: "none"
  };
}

function saveAuthUser(userObj) {
  try {
    localStorage.setItem("tc_user_auth", JSON.stringify(userObj));
  } catch (e) {}
  updateHeaderAuthUI();
}

function updateHeaderAuthUI() {
  const user = getAuthUser();
  
  // Chỉ cập nhật nút TÀI KHOẢN (bỏ qua giỏ hàng .cart-btn-action)
  const accountBtns = document.querySelectorAll(".header-actions-right .header-action-btn:not(.cart-btn-action)");
  accountBtns.forEach(btn => {
    const primary = btn.querySelector(".caption-primary");
    const secondary = btn.querySelector(".caption-secondary");
    if (primary && secondary) {
      if (user.isLoggedIn) {
        primary.textContent = "Tài khoản";
        const parts = (user.name || "Khách hàng").trim().split(" ");
        secondary.textContent = parts[parts.length - 1] || "Hồ sơ";
      } else {
        primary.textContent = "Tài khoản";
        secondary.textContent = "Đăng nhập";
      }
    }
    btn.onclick = function(e) {
      e.preventDefault();
      handleAccountClick();
    };
  });

  // Đảm bảo nút Giỏ hàng luôn hiển thị đúng
  const cartBtns = document.querySelectorAll(".header-actions-right .cart-btn-action");
  cartBtns.forEach(btn => {
    const primary = btn.querySelector(".caption-primary");
    const secondary = btn.querySelector(".caption-secondary");
    if (primary && secondary) {
      primary.textContent = "Giỏ hàng";
      if (!secondary.textContent || secondary.textContent === "Đăng nhập") {
        secondary.textContent = "Đặt hàng";
      }
    }
  });
}

function handleAccountClick() {
  const user = getAuthUser();
  if (user.isLoggedIn) {
    window.location.href = "profile.html";
  } else {
    openAuthModal("login");
  }
}

function openAuthModal(defaultTab = "login") {
  const modal = document.getElementById("auth-modal");
  if (!modal) return;
  modal.classList.add("active");
  switchAuthTab(defaultTab);
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (modal) modal.classList.remove("active");
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById("auth-tab-login-form");
  const registerForm = document.getElementById("auth-tab-register-form");
  const loginBtn = document.getElementById("btn-tab-login");
  const registerBtn = document.getElementById("btn-tab-register");

  if (tab === "login") {
    if (loginForm) loginForm.style.display = "block";
    if (registerForm) registerForm.style.display = "none";
    if (loginBtn) loginBtn.classList.add("active");
    if (registerBtn) registerBtn.classList.remove("active");
  } else {
    if (loginForm) loginForm.style.display = "none";
    if (registerForm) registerForm.style.display = "block";
    if (loginBtn) loginBtn.classList.remove("active");
    if (registerBtn) registerBtn.classList.add("active");
  }
}

function handleAuthLogin(e) {
  e.preventDefault();
  const emailInput = document.getElementById("auth-login-identity");
  const identity = emailInput ? emailInput.value.trim() : "khachhang@tcsport.vn";

  const userObj = {
    isLoggedIn: true,
    name: "Trần Quốc Tiến",
    email: identity.includes("@") ? identity : "khachhang@tcsport.vn",
    phone: !identity.includes("@") ? identity : "0973711868",
    authProvider: "password"
  };

  saveAuthUser(userObj);
  closeAuthModal();
  showToast("Đăng nhập thành công! Chào mừng " + userObj.name, "success");

  setTimeout(() => {
    window.location.href = "profile.html";
  }, 400);
}

function handleAuthRegister(e) {
  e.preventDefault();
  const nameInput = document.getElementById("auth-reg-name");
  const emailInput = document.getElementById("auth-reg-email");
  const phoneInput = document.getElementById("auth-reg-phone");

  const fullName = nameInput ? nameInput.value.trim() : "Thành viên TC Sport";
  const email = emailInput ? emailInput.value.trim() : "user@tcsport.vn";
  const phone = phoneInput ? phoneInput.value.trim() : "0973711868";

  const userObj = {
    isLoggedIn: true,
    name: fullName,
    email: email,
    phone: phone,
    authProvider: "password"
  };

  saveAuthUser(userObj);
  closeAuthModal();
  showToast("Đăng ký tài khoản mới thành công! Chào mừng " + fullName, "success");

  setTimeout(() => {
    window.location.href = "profile.html";
  }, 400);
}

function handleGoogleLogin() {
  showToast("Đang kết nối xác thực tài khoản Google...", "info");
  
  setTimeout(() => {
    const userObj = {
      isLoggedIn: true,
      name: "Trần Quốc Tiến (Google)",
      email: "quoctien.tcgroup@gmail.com",
      phone: "0973711868",
      authProvider: "google"
    };

    saveAuthUser(userObj);
    closeAuthModal();
    showToast("Đăng nhập bằng Google thành công!", "success");

    setTimeout(() => {
      window.location.href = "profile.html";
    }, 400);
  }, 500);
}

function logoutUser() {
  saveAuthUser({
    isLoggedIn: false,
    name: "Khách hàng",
    email: "",
    phone: "",
    authProvider: "none"
  });
  showToast("Đã đăng xuất tài khoản an toàn!", "info");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 400);
}

function toggleMobileMenu() {
  const drawer = document.getElementById("mobile-drawer");
  const overlay = document.getElementById("mobile-overlay");
  if (drawer && overlay) {
    drawer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// ==========================================================================
// 7. TC FEED ARTICLES DATA & RENDERER (Screenshot 1 Magazine Section)
// ==========================================================================
const TC_FEED_ARTICLES = [
  {
    id: 1,
    title: "20/10 Tặng Gì Cho Nàng? TOP Giày Nữ Đẹp Khiến Chị Em Mê Mẩn Ngay",
    date: "19/10/2026",
    views: 704,
    image: "assets/images/blog-womens-gift.jpg",
    author: "TC SPORT Official"
  },
  {
    id: 2,
    title: "ASICS Solution Speed FF 4: Nhẹ Bất Ngờ, Linh Hoạt Tối Đa Trên Sân",
    date: "16/10/2026",
    views: 713,
    image: "assets/images/blog-tennis-court.jpg",
    author: "TC SPORT Official"
  },
  {
    id: 3,
    title: "Nike Metcon 10 Có Gì Mà Dân Gym Không Thể Bỏ Qua?",
    date: "13/10/2026",
    views: 726,
    image: "assets/images/shoe-metcon-volt.jpg",
    author: "TC SPORT Official"
  },
  {
    id: 4,
    title: "Nike Vapor 12 HC: Vũ Khí Bứt Tốc Thượng Hạng Trên Sân Cứng",
    date: "08/10/2026",
    views: 738,
    image: "assets/images/shoe-pegasus-blue.jpg",
    author: "TC SPORT Official"
  },
  {
    id: 5,
    title: "Nike Revolution 8 - Tân Binh Giá Mềm Của Nike Có Đáng Mua?",
    date: "05/10/2026",
    views: 831,
    image: "assets/images/shoe-running-pro.jpg",
    author: "TC SPORT Official"
  }
];

function renderTCFeed() {
  const container = document.getElementById("tcfeed-grid-items");
  if (!container) return;
  container.innerHTML = TC_FEED_ARTICLES.map(art => `
    <div class="tcfeed-card" onclick="window.location.href='blog.html'">
      <div class="tcfeed-card-thumb">
        <img src="${art.image}" alt="${art.title}" loading="lazy">
      </div>
      <div class="tcfeed-card-body">
        <div class="tcfeed-card-meta">
          <span>${art.date}</span>
          <span>👁️ ${art.views}</span>
        </div>
        <div class="tcfeed-card-title">${art.title}</div>
        <div class="tcfeed-author-badge">
          <div class="tcfeed-author-avatar">TC</div>
          <span>${art.author}</span>
          <span style="color: #2563EB;">✓</span>
        </div>
      </div>
    </div>
  `).join("");
}

// ==========================================================================
// 8. 5 HEADER THEMES ENGINE (Tùy Chọn Màu Header Cao Cấp)
// ==========================================================================
const HEADER_THEMES = [
  { id: "theme-beige", name: "Be Vàng Sáng (Mặc định)", dot: "#F3EADB" },
  { id: "theme-navy", name: "Xanh Navy MyShoes", dot: "#0A437F" },
  { id: "theme-espresso", name: "Nâu Espresso Sang Trọng", dot: "#1F1916" },
  { id: "theme-emerald", name: "Xanh Rêu Forest", dot: "#182B1C" },
  { id: "theme-burgundy", name: "Đỏ Rượu Burgundy", dot: "#38121E" }
];

function setHeaderTheme(themeId) {
  const header = document.getElementById("site-header");
  if (!header) return;

  HEADER_THEMES.forEach(t => {
    header.classList.remove(t.id);
  });
  header.classList.remove("theme-dark-espresso");

  if (themeId && themeId !== "theme-beige") {
    header.classList.add(themeId);
  }

  try {
    localStorage.setItem("tc_header_theme", themeId);
  } catch (e) {}

  const label = document.getElementById("theme-toggle-label");
  const found = HEADER_THEMES.find(t => t.id === themeId) || HEADER_THEMES[0];
  if (label) label.textContent = "Màu: " + found.name.split(" ")[0];

  closeThemePicker();
  showToast("Đã đổi màu Header: " + found.name, "info");
}

function initHeaderTheme() {
  try {
    const saved = localStorage.getItem("tc_header_theme") || "theme-beige";
    const header = document.getElementById("site-header");
    if (header && saved !== "theme-beige") {
      header.classList.add(saved);
    }
    const label = document.getElementById("theme-toggle-label");
    const found = HEADER_THEMES.find(t => t.id === saved) || HEADER_THEMES[0];
    if (label) label.textContent = "Màu: " + found.name.split(" ")[0];
  } catch (e) {}
}

function toggleThemePicker(e) {
  if (e) e.stopPropagation();
  const popover = document.getElementById("theme-picker-popover");
  if (popover) popover.classList.toggle("active");
}

function closeThemePicker() {
  const popover = document.getElementById("theme-picker-popover");
  if (popover) popover.classList.remove("active");
}

document.addEventListener("click", function(e) {
  if (!e.target.closest("#theme-picker-wrap")) {
    closeThemePicker();
  }
});

// Cart LocalStorage Persistence
function saveCartToStorage() {
  try {
    localStorage.setItem("tc_sport_cart", JSON.stringify(state.cart));
  } catch (e) {}
}

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("tc_sport_cart");
    if (saved) state.cart = JSON.parse(saved);
  } catch (e) {}
}

// ==========================================================================
// 9. INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", function() {
  loadCartFromStorage();
  initHeaderTheme();
  renderGrids();
  renderTCFeed();
  updateCartBadges();
  initTypewriter();
  initAutocomplete();
  updateHeaderAuthUI();

  // Payment radio selection
  document.querySelectorAll(".payment-card").forEach(card => {
    card.addEventListener("click", function() {
      document.querySelectorAll(".payment-card").forEach(c => c.classList.remove("selected"));
      this.classList.add("selected");
      const radio = this.querySelector("input[type='radio']");
      if (radio) radio.checked = true;
    });
  });
});
