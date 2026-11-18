# -*- coding: utf-8 -*-
"""
report_data_tables.py - Dữ liệu các bảng biểu kỹ thuật cho Báo cáo thực tập tốt nghiệp TC SPORT
Sinh viên: Nguyễn Anh Tú - MSSV: 22810310121
Tuân thủ Phụ lục 6, 8 và Quyết định số 1627/QĐ-ĐHDL
"""

TABLE_ABBREVIATIONS = {
    "title": "Bảng danh mục các từ viết tắt trong báo cáo",
    "headers": ["Ký hiệu viết tắt", "Thuật ngữ tiếng Anh đầy đủ", "Ý nghĩa tiếng Việt"],
    "rows": [
        ["API", "Application Programming Interface", "Giao diện lập trình ứng dụng"],
        ["REST", "Representational State Transfer", "Kiểu kiến trúc truyền tải trạng thái đại diện"],
        ["JSON", "JavaScript Object Notation", "Định dạng trao đổi dữ liệu dạng đối tượng JavaScript"],
        ["JWT", "JSON Web Token", "Chuỗi mã hóa định danh và xác thực an toàn người dùng"],
        ["ACID", "Atomicity, Consistency, Isolation, Durability", "Bốn thuộc tính giao dịch CSDL: Nguyên tử, Nhất quán, Cô lập, Bền vững"],
        ["ORM", "Object-Relational Mapping", "Kỹ thuật ánh xạ thực thể đối tượng và bảng CSDL quan hệ"],
        ["JPA", "Java Persistence API", "Giao diện chuẩn quản lý dữ liệu bền vững trong hệ sinh thái Java"],
        ["SPA", "Single Page Application", "Ứng dụng web đơn trang, trải nghiệm mượt mà không tải lại trang"],
        ["UI/UX", "User Interface / User Experience", "Giao diện người dùng / Trải nghiệm người dùng"],
        ["LLM", "Large Language Model", "Mô hình ngôn ngữ lớn (Trí tuệ nhân tạo tạo sinh Generative AI)"],
        ["FCP", "First Contentful Paint", "Thời gian hiển thị phần tử nội dung đầu tiên trên trình duyệt web"],
        ["RBAC", "Role-Based Access Control", "Mô hình kiểm soát truy cập và phân quyền dựa trên vai trò"],
        ["VietQR", "Vietnam Quick Response", "Bộ tiêu chuẩn định dạng mã QR thanh toán quốc gia Việt Nam"],
        ["COD", "Cash On Delivery", "Phương thức thanh toán tiền mặt trực tiếp khi nhận hàng"],
        ["FSM", "Finite State Machine", "Mô hình máy trạng thái hữu hạn quản lý tiến trình đơn hàng"],
        ["SQL", "Structured Query Language", "Ngôn ngữ truy vấn dữ liệu có cấu trúc tiêu chuẩn cho CSDL"],
        ["HTTP/HTTPS", "HyperText Transfer Protocol (Secure)", "Giao thức truyền tải siêu văn bản (có bảo mật mã hóa SSL/TLS)"],
        ["DTO", "Data Transfer Object", "Đối tượng truyền tải dữ liệu giữa tầng Client và tầng Server"]
    ]
}

TABLE_1_1 = {
    "title": "Bảng 1.1: Yêu cầu chức năng của hệ thống TC SPORT",
    "headers": ["Mã", "Tên chức năng", "Mô tả chi tiết yêu cầu nghiệp vụ"],
    "rows": [
        ["FR-01", "Đăng ký & Đăng nhập", "Cho phép người dùng tạo tài khoản, xác thực thông tin bằng email/mật khẩu được mã hóa BCrypt, phân quyền bảo mật giữa Khách hàng (User) và Quản trị viên (Admin)."],
        ["FR-02", "Xem & Tìm kiếm sản phẩm", "Hiển thị danh sách giày thể thao phân theo danh mục, thương hiệu (Nike, Adidas, Asics, Lacoste, Puma, Pickleball). Tìm kiếm tức thời theo từ khóa với debounce."],
        ["FR-03", "Lọc sản phẩm chuyên sâu", "Lọc theo khoảng giá linh hoạt (Dưới 1 triệu, 1-2 triệu, trên 3 triệu), môn thể thao chuyên dụng (Chạy bộ, Pickleball, Tennis, Sneaker casual), sắp xếp giá tăng/giảm."],
        ["FR-04", "Xem nhanh & Chi tiết", "Modal Quickview xem nhanh ảnh sản phẩm, mô tả công nghệ đệm, bảng chọn kích cỡ đa size (38-44) hiển thị số lượng tồn kho theo thời gian thực."],
        ["FR-05", "Bảng hướng dẫn chọn size", "Cung cấp bảng quy đổi kích thước chuẩn quốc tế (EU, US, UK, CM) và hướng dẫn đo chiều dài bàn chân nhằm hạn chế tối đa rủi ro chọn nhầm size."],
        ["FR-06", "Quản lý giỏ hàng", "Thêm/sửa/xóa sản phẩm trong giỏ hàng, cập nhật số lượng động, tự động tính tổng tiền và phí vận chuyển (miễn phí vận chuyển cho đơn hàng từ 1.500.000 VNĐ)."],
        ["FR-07", "Thanh toán VietQR tự động", "Tạo mã QR thanh toán chuẩn VietQR theo chuẩn Napas với số tiền và nội dung chuyển khoản được sinh tự động theo mã đơn hàng, giảm thiểu thao tác nhập liệu thủ công."],
        ["FR-08", "Trợ lý ảo AI tư vấn", "Widget chatbot AI nổi (floating) góc màn hình, tư vấn đệm êm, form giày, mặt sân, kết nối kho hàng và xoay vòng 3 API key thông minh chống gián đoạn dịch vụ."],
        ["FR-09", "Tra cứu đơn & Vận đơn", "Khách hàng tra cứu nhanh tiến trình đơn hàng bằng số điện thoại hoặc mã đơn hàng, xem timeline chi tiết từ lúc tạo đơn đến khi giao nhận thành công."],
        ["FR-10", "Quản lý kho đa size", "Admin tạo mới, cập nhật thông tin sản phẩm, quản lý tồn kho theo từng size độc lập (size 38: 10 đôi, size 39: 5 đôi), cảnh báo tự động khi sản phẩm sắp hết hàng."],
        ["FR-11", "Quản lý đơn hàng Admin", "Admin duyệt đơn, chuyển trạng thái theo quy trình (Chờ xử lý -> Đã xác nhận -> Đang giao hàng -> Đã giao / Đã hủy), hủy đơn hoàn trả tồn kho nguyên tử."],
        ["FR-12", "Báo cáo doanh thu & KPIs", "Admin Dashboard thống kê doanh thu theo ngày/tháng, số lượng đơn hoàn thành, tỷ lệ đơn hủy, danh sách top 5 sản phẩm bán chạy nhất kèm biểu đồ trực quan."]
    ]
}

TABLE_1_2 = {
    "title": "Bảng 1.2: Yêu cầu phi chức năng của hệ thống",
    "headers": ["Nhóm yêu cầu", "Tiêu chí kỹ thuật và mục tiêu định lượng"],
    "rows": [
        ["Hiệu năng (Performance)", "Thời gian tải trang ban đầu (First Contentful Paint) < 1.2 giây; thời gian phản hồi của các REST API truy vấn sản phẩm và giỏ hàng < 250ms trong điều kiện mạng tiêu chuẩn."],
        ["Khả năng mở rộng (Scalability)", "Hệ thống chịu tải đồng thời tối thiểu 500 người dùng trực tuyến; kiến trúc phân tầng sẵn sàng cho việc mở rộng theo chiều ngang (Horizontal Scaling) và bổ sung Redis caching."],
        ["Độ tin cậy (Reliability)", "Thời gian hoạt động liên tục (Uptime) đạt 99.5%; cơ chế Multi-Key Failover đảm bảo tính năng Trợ lý AI vẫn hoạt động ổn định khi một hoặc hai key gặp sự cố hết hạn mức."],
        ["Bảo mật (Security)", "Mật khẩu người dùng được băm an toàn bằng thuật toán BCrypt với salt ngẫu nhiên; áp dụng cơ chế xác thực JWT; phòng chống các lỗ hổng SQL Injection và XSS."],
        ["Tính toàn vẹn (Integrity)", "Mọi thao tác đặt hàng và trừ tồn kho được bảo vệ trong các giao dịch ACID nguyên tử với mức cô lập phù hợp, ngăn ngừa triệt để hiện tượng bán vượt tồn kho (overselling)."],
        ["Tính khả dụng (Usability)", "Giao diện hiện đại, responsive trên mọi kích thước màn hình (Desktop, Tablet, Smartphone); tông màu Be Vàng Sang thể thao; bố cục tuân thủ nguyên tắc công thái học UI/UX."],
        ["Khả năng bảo trì (Maintainability)", "Mã nguồn phân tách rõ ràng theo mô hình MVC ở backend và kiến trúc Component-driven ở frontend; tài liệu hóa đầy đủ các API endpoint chuẩn RESTful."]
    ]
}

TABLE_2_1 = {
    "title": "Bảng 2.1: Phân rã thành phần kiến trúc và trách nhiệm các tầng",
    "headers": ["Tầng kiến trúc", "Công nghệ chủ đạo", "Trách nhiệm và nhiệm vụ chính trong hệ thống"],
    "rows": [
        ["Presentation Layer (Client SPA)", "React 18, Vite, Tailwind CSS, Lucide Icons", "Render giao diện người dùng Single Page Application, quản lý state giỏ hàng, bộ lọc sản phẩm, điều hướng mượt mà không tải lại trang, hiển thị widget AI Chatbot."],
        ["API Gateway / Controller Layer", "Spring Boot 3, Spring Web MVC", "Tiếp nhận các HTTP request, validate dữ liệu đầu vào (DTO validation), điều hướng request đến Service tương ứng, trả về định dạng chuẩn JSON RESTful."],
        ["Business Logic Service Layer", "Spring Service, Spring Security, BCrypt", "Hiện thực toàn bộ nghiệp vụ: tính giá trị đơn hàng, kiểm soát tồn kho đa size, xoay vòng API key Gemini, nén catalog snapshot, xử lý timeline đơn."],
        ["Data Access Layer (Repository)", "Spring Data JPA, Hibernate ORM", "Ánh xạ thực thể cơ sở dữ liệu (ORM), thực thi các câu truy vấn tối ưu, hỗ trợ phân trang (Pageable), quản lý transaction nguyên tử (@Transactional)."],
        ["Persistence Layer (Database)", "MySQL 8.0 Community Server", "Lưu trữ dữ liệu có cấu trúc với engine InnoDB, bảo đảm tính toàn vẹn dữ liệu qua khóa ngoại (Foreign Keys), chỉ mục (Indexes) và giao dịch ACID."],
        ["External AI Service", "Google Gemini 2.5 Flash / Flash Lite API", "Cung cấp năng lực hiểu ngôn ngữ tự nhiên và sinh phản hồi thông minh dựa trên context kho hàng thu gọn (Compact Catalog Snapshot) được gửi kèm prompt."]
    ]
}

TABLE_2_2 = {
    "title": "Bảng 2.2: Bảng chuyển đổi trạng thái đơn hàng (Order State Machine)",
    "headers": ["Trạng thái hiện tại", "Hành động kích hoạt", "Trạng thái tiếp theo", "Tác động nghiệp vụ và tồn kho"],
    "rows": [
        ["[Khởi tạo]", "Khách hàng bấm 'Đặt hàng ngay'", "PENDING (Chờ xác nhận)", "Tạo bản ghi đơn hàng, trừ tạm thời số lượng tồn kho tương ứng của size đã chọn."],
        ["PENDING", "Admin duyệt và xác nhận đơn", "CONFIRMED (Đã xác nhận)", "Gửi thông báo xác nhận, chuyển thông tin đóng gói đến bộ phận kho vận."],
        ["CONFIRMED", "Giao hàng cho đơn vị vận chuyển", "SHIPPING (Đang giao hàng)", "Cập nhật mã vận đơn, khách hàng theo dõi được lộ trình giao vận."],
        ["SHIPPING", "Khách nhận hàng & thanh toán xong", "DELIVERED (Đã giao hàng)", "Hoàn tất giao dịch, ghi nhận doanh thu vào báo cáo tài chính của hệ thống."],
        ["PENDING / CONFIRMED", "Admin hoặc khách hàng yêu cầu hủy", "CANCELLED (Đã hủy đơn)", "Ghi lý do hủy, tự động hoàn trả số lượng giày vào tồn kho của từng size tương ứng."]
    ]
}

TABLE_2_3 = {
    "title": "Bảng 2.3: Danh mục và chi tiết các bảng trong cơ sở dữ liệu MySQL",
    "headers": ["Tên bảng", "Khóa chính / Khóa ngoại", "Mục đích lưu trữ và các trường dữ liệu quan trọng"],
    "rows": [
        ["users", "PK: id", "Lưu trữ thông tin người dùng và tài khoản quản trị: username, password (BCrypt), full_name, email, phone, address, role (USER/ADMIN), created_at."],
        ["categories", "PK: id", "Danh mục phân loại thể thao: name, slug (chay-bo, pickleball, tennis, sneaker), description, active_status."],
        ["brands", "PK: id", "Thương hiệu giày chính hãng: name (Nike, Adidas, Asics, Lacoste, Puma), logo_url, description."],
        ["products", "PK: id | FK: category_id, brand_id", "Thông tin sản phẩm chính: name, slug, price, original_price, description, main_image, sub_images, featured (nổi bật), is_active."],
        ["product_sizes", "PK: id | FK: product_id", "Quản lý tồn kho theo từng kích cỡ: product_id, size (38, 39, 40, 41, 42, 43, 44), quantity (số lượng tồn kho thực tế). Khóa duy nhất (product_id, size)."],
        ["orders", "PK: id | FK: user_id (nullable)", "Thông tin đơn hàng tổng quát: order_code (TC-XXXXXX), customer_name, customer_phone, shipping_address, total_amount, payment_method, status, created_at."],
        ["order_items", "PK: id | FK: order_id, product_id", "Chi tiết từng sản phẩm trong đơn: order_id, product_id, size, unit_price, quantity, subtotal."],
        ["order_timeline", "PK: id | FK: order_id", "Lịch sử dòng thời gian của đơn hàng: order_id, status, description, created_by, updated_at."]
    ]
}

TABLE_2_4 = {
    "title": "Bảng 2.4: Bảng các quy tắc kiểm tra hợp lệ dữ liệu (Validation Rules)",
    "headers": ["Đối tượng dữ liệu", "Trường thông tin", "Ràng buộc kiểm tra và thông báo lỗi"],
    "rows": [
        ["Người dùng (User)", "Email & Phone", "Email đúng định dạng RFC 5322; Số điện thoại phải đúng 10 chữ số đầu số Việt Nam (03x, 05x, 07x, 08x, 09x)."],
        ["Sản phẩm (Product)", "Giá bán (Price)", "Giá bán phải lớn hơn 0; giá khuyến mãi (nếu có) phải nhỏ hơn hoặc bằng giá gốc (original_price)."],
        ["Kích cỡ (ProductSize)", "Size & Quantity", "Size phải thuộc dải chuẩn từ 36 đến 46; số lượng tồn kho (Quantity) là số nguyên >= 0."],
        ["Đơn hàng (Order)", "Thông tin người nhận", "Tên người nhận không được để trống (>= 2 ký tự); địa chỉ giao hàng phải có ít nhất 10 ký tự."],
        ["Chi tiết đơn (OrderItem)", "Số lượng mua", "Số lượng mua của mỗi size phải >= 1 và không được vượt quá số lượng tồn kho hiện có tại thời điểm đặt."],
        ["Chatbot AI", "Nội dung câu hỏi", "Độ dài câu hỏi tối thiểu 2 ký tự và không vượt quá 300 ký tự để tối ưu chi phí token và tránh câu hỏi spam."]
    ]
}

TABLE_2_5 = {
    "title": "Bảng 2.5: Phân tích rủi ro kỹ thuật và phương án dự phòng",
    "headers": ["Nhóm rủi ro", "Mô tả nguy cơ tiềm ẩn", "Phương án giải quyết và cơ chế dự phòng"],
    "rows": [
        ["Quá hạn mức API AI (HTTP 429)", "Gemini API bị giới hạn 15 RPM ở gói miễn phí, có thể gây lỗi khi nhiều khách hàng hỏi cùng lúc.", "Thiết lập danh sách 3 API Key xoay vòng (Multi-Key Rotation) với cơ chế tự động chuyển key tiếp theo khi gặp mã lỗi 429 hoặc Quota Exceeded."],
        ["Tràn hạn mức Token Context", "Gửi toàn bộ thông tin chi tiết của hàng trăm sản phẩm vào prompt làm vượt context window và tăng chi phí.", "Áp dụng thuật toán Compact Catalog Snapshot: chỉ trích xuất các thuộc tính cốt lõi (Tên, Hãng, Môn thể thao, Giá, Size còn hàng) thành định dạng văn bản ngắn gọn."],
        ["Xung đột tồn kho (Race Condition)", "Nhiều người dùng đặt cùng một đôi giày size cuối cùng tại cùng một thời điểm.", "Sử dụng giao dịch @Transactional với cơ chế Pessimistic / Optimistic Locking trong Spring Data JPA, kiểm tra lại số lượng tồn kho ngay trước khi trừ."],
        ["Tấn công SQL Injection & XSS", "Kẻ tấn công chèn mã độc vào thanh tìm kiếm hoặc ô chat AI.", "Sử dụng Spring Data JPA Parameterized Queries triệt tiêu SQL Injection; áp dụng React JSX auto-escaping ngăn ngừa XSS."],
        ["Thất lạc đơn hàng do mạng chập chờn", "Khách hàng bị ngắt kết nối trong quá trình thanh toán chuyển khoản.", "Hệ thống sinh mã đơn hàng duy nhất và lưu trạng thái PENDING ngay trước khi hiển thị VietQR; hỗ trợ tra cứu lại bất cứ lúc nào qua số điện thoại."]
    ]
}

TABLE_3_1 = {
    "title": "Bảng 3.1: Cấu hình môi trường phần cứng và phần mềm triển khai",
    "headers": ["Hạng mục cấu hình", "Thông số và phiên bản chi tiết"],
    "rows": [
        ["Hệ điều hành máy chủ / phát triển", "Microsoft Windows 11 Pro 64-bit / Linux Ubuntu 22.04 LTS"],
        ["Bộ vi xử lý (CPU)", "Intel Core i5 / AMD Ryzen 5 thế hệ mới (tối thiểu 4 nhân, 8 luồng)"],
        ["Bộ nhớ trong (RAM)", "16.0 GB DDR4 / DDR5 (tối thiểu 8.0 GB khả dụng cho IDE và Services)"],
        ["Môi trường thực thi Backend", "Java Development Kit (JDK) 17 LTS 64-bit"],
        ["Framework Backend", "Spring Boot 3.2.x (Spring MVC, Spring Data JPA, Hibernate, Maven 3.9)"],
        ["Môi trường thực thi Frontend", "Node.js v20.x LTS, npm v10.x"],
        ["Công cụ đóng gói Frontend", "Vite 5.x kết hợp React 18.x, Tailwind CSS, Lucide React"],
        ["Hệ quản trị cơ sở dữ liệu", "MySQL Server 8.0.x Community Edition (InnoDB engine, utf8mb4_unicode_ci)"],
        ["Dịch vụ Trí tuệ nhân tạo (AI)", "Google Cloud Gemini API (Mô hình: gemini-2.5-flash / gemini-1.5-flash)"],
        ["Cổng kết nối mạng cục bộ", "Backend REST API: Port 8081 | Frontend Client: Port 8080 | MySQL: Port 3306"]
    ]
}

TABLE_3_2 = {
    "title": "Bảng 3.2: Danh mục các màn hình giao diện của hệ thống TC SPORT",
    "headers": ["Mã màn hình", "Tên màn hình giao diện", "Mục đích sử dụng và các thành phần chính"],
    "rows": [
        ["SCR-01", "Trang chủ (Homepage)", "Hiển thị banner khuyến mãi, thanh tìm kiếm thông minh, danh mục thương hiệu (Nike, Adidas, Asics...), top sản phẩm bán chạy, sản phẩm mới về."],
        ["SCR-02", "Trang Lọc sản phẩm (Category)", "Bộ lọc theo môn thể thao (Chạy bộ, Pickleball, Tennis), mức giá, thương hiệu, hiển thị danh sách sản phẩm dạng thẻ với hình ảnh sắc nét."],
        ["SCR-03", "Xem nhanh (Quickview Modal)", "Xem ảnh cận cảnh, chọn kích cỡ size giày (38-44), hiển thị số lượng tồn kho từng size, nút 'Thêm vào giỏ hàng' và 'Mua ngay'."],
        ["SCR-04", "Bảng hướng dẫn chọn size", "Modal hiển thị bảng đối chiếu chiều dài bàn chân (cm) sang size EU/US/UK và 4 bước đo chân tại nhà."],
        ["SCR-05", "Giỏ hàng & Thanh toán VietQR", "Kiểm tra giỏ hàng, nhập địa chỉ nhận hàng, chọn phương thức thanh toán (COD / Chuyển khoản VietQR), quét mã QR tự động điền số tiền và nội dung."],
        ["SCR-06", "Widget Trợ lý AI (Floating Chat)", "Cửa sổ chat nổi góc phải dưới màn hình, gợi ý nhanh (chân bè, đệm êm, giày pickleball), trả lời tư vấn kèm sản phẩm thực tế có trong kho."],
        ["SCR-07", "Trang Tin tức & Đánh giá (Blog)", "Các bài viết chuyên sâu về kỹ thuật chọn giày thể thao, so sánh đệm đế giày, cẩm nang phòng tránh chấn thương khớp cổ chân."],
        ["SCR-08", "Tổng quan Quản trị (Dashboard)", "Các thẻ chỉ số KPI doanh thu, tổng đơn hàng, tỷ lệ chuyển đổi, danh sách đơn hàng mới và sản phẩm bán chạy nhất."],
        ["SCR-09", "Quản lý Sản phẩm & Kho hàng", "Bảng danh sách sản phẩm, thêm/sửa thông tin, cập nhật số lượng tồn kho theo từng size độc lập, chuyển trạng thái kinh doanh."],
        ["SCR-10", "Quản lý Đơn hàng & Timeline", "Bảng danh sách đơn hàng, bộ lọc trạng thái, xem chi tiết từng mặt hàng và cập nhật dòng thời gian giao vận (Timeline)."],
        ["SCR-11", "Báo cáo Doanh thu & Lịch", "Biểu đồ phân tích doanh thu theo ngày/tháng, bộ lọc theo khoảng thời gian tùy chọn, xuất báo cáo tài chính."],
        ["SCR-12", "Cài đặt & Tài khoản VietQR", "Cấu hình thông tin cửa hàng, số điện thoại hotline, thông tin tài khoản ngân hàng thụ hưởng cho mã VietQR."]
    ]
}

TABLE_3_3 = {
    "title": "Bảng 3.3: Bảng tổng hợp các ca kiểm thử hệ thống (Test Cases)",
    "headers": ["Mã TC", "Chức năng kiểm tra", "Kịch bản và dữ liệu thử nghiệm", "Kết quả mong đợi", "Đánh giá"],
    "rows": [
        ["TC-01", "Đăng ký tài khoản", "Nhập thông tin hợp lệ (tên, email, số điện thoại, mật khẩu).", "Tài khoản được tạo thành công, mật khẩu băm BCrypt trong CSDL.", "Đạt (Pass)"],
        ["TC-02", "Đăng ký trùng email", "Nhập email đã tồn tại trong hệ thống.", "Báo lỗi 'Email đã được sử dụng', không tạo bản ghi mới.", "Đạt (Pass)"],
        ["TC-03", "Đăng nhập phân quyền", "Đăng nhập bằng tài khoản quản trị viên.", "Hệ thống nhận diện role ADMIN, hiển thị nút truy cập trang Quản Trị Viên.", "Đạt (Pass)"],
        ["TC-04", "Tìm kiếm sản phẩm", "Nhập từ khóa 'Pegasus' vào thanh tìm kiếm.", "Hiển thị đúng danh sách các mẫu giày Nike Pegasus có trong kho.", "Đạt (Pass)"],
        ["TC-05", "Lọc theo môn Pickleball", "Chọn danh mục môn 'Pickleball' trên menu.", "Chỉ hiển thị các mẫu giày có thuộc tính thể thao Pickleball.", "Đạt (Pass)"],
        ["TC-06", "Chọn size trong Quickview", "Mở modal xem nhanh, bấm chọn size 40 (còn 5 đôi).", "Nút size 40 được kích hoạt, hiển thị tồn kho 'Còn 5 đôi'.", "Đạt (Pass)"],
        ["TC-07", "Chọn size hết hàng", "Bấm chọn size có quantity = 0.", "Nút size bị làm mờ (disabled), không cho phép thêm vào giỏ hàng.", "Đạt (Pass)"],
        ["TC-08", "Thêm vào giỏ hàng", "Thêm 1 đôi size 41 vào giỏ hàng.", "Biểu tượng giỏ hàng tăng số lượng lên 1, popup thông báo thành công.", "Đạt (Pass)"],
        ["TC-09", "Cập nhật số lượng giỏ", "Tăng số lượng sản phẩm trong giỏ hàng lên 2.", "Tổng tiền đơn hàng tự động tính toán lại chính xác.", "Đạt (Pass)"],
        ["TC-10", "Đặt hàng trừ tồn kho", "Hoàn tất đặt 1 đôi size 41 của sản phẩm ID 1.", "Tồn kho size 41 của ID 1 giảm đúng 1 đơn vị trong MySQL.", "Đạt (Pass)"],
        ["TC-11", "Tạo mã thanh toán VietQR", "Chọn phương thức 'Chuyển khoản QR' khi thanh toán.", "Hiển thị đúng mã QR chứa thông tin STK, số tiền và mã đơn hàng.", "Đạt (Pass)"],
        ["TC-12", "Hỏi AI tư vấn đệm êm", "Nhập: 'Tôi muốn tìm giày chạy bộ êm chân dưới 3 triệu'.", "AI trả lời chuẩn xác, gợi ý sản phẩm phù hợp đang có trong kho.", "Đạt (Pass)"],
        ["TC-13", "Xoay vòng API Key AI", "Giả lập Key 1 bị lỗi 429 Quota Exceeded.", "Hệ thống tự động chuyển sang Key 2, câu trả lời vẫn sinh bình thường.", "Đạt (Pass)"],
        ["TC-14", "Admin cập nhật trạng thái", "Admin chuyển đơn hàng từ PENDING sang CONFIRMED.", "Trạng thái đơn cập nhật thành công, thêm 1 mốc vào timeline đơn.", "Đạt (Pass)"],
        ["TC-15", "Hủy đơn hoàn trả tồn kho", "Admin hủy đơn hàng chứa 1 đôi size 41.", "Trạng thái chuyển sang CANCELLED, tồn kho size 41 tự động tăng lại 1.", "Đạt (Pass)"]
    ]
}

TABLE_3_4 = {
    "title": "Bảng 3.4: Giám định thông số hiệu năng và thời gian phản hồi",
    "headers": ["Chỉ số hiệu năng kiểm tra", "Môi trường thử nghiệm", "Kết quả thực tế đo được", "Đánh giá đạt chuẩn"],
    "rows": [
        ["Thời gian tải trang chủ (First Contentful Paint)", "Chrome 125, mạng nội bộ LAN", "0.85 giây", "Rất tốt (< 1.5s)"],
        ["Thời gian tải đầy đủ DOM (DOM Ready)", "Chrome 125, mạng nội bộ LAN", "1.15 giây", "Rất tốt (< 2.0s)"],
        ["API truy vấn danh sách sản phẩm (GET /products)", "Spring Boot 3 + MySQL 8", "45 ms (trung bình)", "Xuất sắc (< 100ms)"],
        ["API lọc sản phẩm đa tiêu chí (GET /products/filter)", "Có chỉ mục INDEX trên category_id", "68 ms (trung bình)", "Xuất sắc (< 100ms)"],
        ["API tạo đơn hàng và trừ tồn kho (POST /orders)", "Giao dịch ACID nguyên tử", "110 ms (trung bình)", "Rất tốt (< 200ms)"],
        ["Thời gian sinh phản hồi AI Chatbot (Gemini API)", "Context nén snapshot 450 tokens", "1.4 - 2.1 giây", "Đạt chuẩn mô hình LLM"],
        ["Dung lượng bundle frontend sau tối ưu build Vite", "Gzip compression enabled", "248 KB (JS) + 38 KB (CSS)", "Rất nhẹ và tối ưu"]
    ]
}

TABLE_3_5 = {
    "title": "Bảng 3.5: Bảng giới hạn hệ thống và tải chịu đựng",
    "headers": ["Tham số hệ thống", "Ngưỡng thiết kế tối đa", "Hành vi khi vượt ngưỡng và giải pháp"],
    "rows": [
        ["Số kết nối đồng thời vào CSDL (Connection Pool)", "Tối đa 50 kết nối (HikariCP config)", "Yêu cầu vượt ngưỡng sẽ xếp hàng chờ (Connection timeout 30s). Giải pháp: tăng pool size và áp dụng read-replica."],
        ["Số lượng kích cỡ tối đa cho một sản phẩm", "Tối đa 15 kích cỡ khác nhau (size 35 đến 48)", "Giao diện tự động phân trang hoặc cuộn ngang để đảm bảo tính thẩm mỹ."],
        ["Số lượng mặt hàng tối đa trong một đơn hàng", "Tối đa 50 mặt hàng / đơn", "Ngăn chặn các hành vi cố tình tạo đơn rác gây nghẽn giao dịch."],
        ["Tần suất truy vấn AI Chatbot", "15 Requests / phút / API Key (3 key = 45 RPM)", "Cơ chế Failover xoay vòng 3 key; nếu vượt cả 3 key, chatbot thông báo người dùng đợi 30 giây."]
    ]
}

TABLE_3_6 = {
    "title": "Bảng 3.6: Kết quả kiểm thử tương thích đa trình duyệt và thiết bị",
    "headers": ["Nền tảng / Trình duyệt", "Độ phân giải hiển thị", "Mức độ tương thích và hiển thị giao diện"],
    "rows": [
        ["Google Chrome v125 (Windows 11)", "1920 x 1080 (FHD)", "Tương thích hoàn hảo 100%, hiệu ứng mượt mà, layout chuẩn."],
        ["Microsoft Edge v125 (Windows 11)", "1920 x 1080 (FHD)", "Tương thích hoàn hảo 100%, render font chữ sắc nét."],
        ["Cốc Cốc Browser v120 (Windows 11)", "1920 x 1080 (FHD)", "Tương thích hoàn hảo 100%, các tính năng giỏ hàng và QR hoạt động trơn tru."],
        ["Mozilla Firefox v126 (Windows 11)", "1920 x 1080 (FHD)", "Tương thích 100%, thanh cuộn và hiệu ứng hover chuẩn xác."],
        ["Apple Safari (iOS / iPhone 14 Pro)", "393 x 852 (Mobile Responsive)", "Giao diện co giãn chuẩn mobile, thanh điều hướng đáy và widget AI nổi hiển thị tiện dụng."],
        ["Google Chrome Mobile (Android 14)", "412 x 915 (Mobile Responsive)", "Menu trượt mượt mà, thao tác chạm chọn size và quét mã QR thuận tiện."]
    ]
}

TABLE_3_7 = {
    "title": "Bảng 3.7: Quy trình các bước vận hành, bảo trì và cập nhật hệ thống",
    "headers": ["Bước", "Hạng mục công việc", "Hướng dẫn thao tác thực hiện chi tiết"],
    "rows": [
        ["Bước 1", "Khởi động hệ thống", "Chạy tệp batch CHAY_NHANH.bat để tự động kiểm tra cổng mạng, khởi chạy MySQL 8.0, backend Spring Boot (port 8081) và frontend Vite (port 8080)."],
        ["Bước 2", "Kiểm tra kết nối dịch vụ", "Truy cập http://localhost:8080 để kiểm tra giao diện người dùng; truy cập http://localhost:8081/actuator/health hoặc API /products để xác nhận backend hoạt động."],
        ["Bước 3", "Vận hành và quản lý bán hàng", "Đăng nhập trang quản trị (/admin), theo dõi danh sách đơn hàng mới, duyệt đơn chuyển giao cho đơn vị vận chuyển, kiểm tra tồn kho các mặt hàng sắp hết."],
        ["Bước 4", "Bảo trì định kỳ cơ sở dữ liệu", "Thực hiện sao lưu (Backup) tự động dữ liệu MySQL hàng ngày qua mysqldump, tối ưu hóa các bảng dữ liệu để duy trì tốc độ truy vấn cao."],
        ["Bước 5", "Giám sát dịch vụ AI Chatbot", "Định kỳ kiểm tra hạn mức và trạng thái hoạt động của 3 API Key Google Gemini, thay thế key mới trong file cấu hình khi cần thiết mà không cần sửa code backend."]
    ]
}
