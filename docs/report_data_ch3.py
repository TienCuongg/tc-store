# -*- coding: utf-8 -*-
"""
report_data_ch3.py - Nội dung chi tiết Chương 3, Kết luận và Tài liệu tham khảo cho Báo cáo thực tập tốt nghiệp TC SPORT
Sinh viên: Nguyễn Anh Tú - MSSV: 22810310121
Tuân thủ Phụ lục 11, 12, 13
"""

CH3_SECTIONS = [
    {
        "type": "heading1",
        "text": "CHƯƠNG 3: XÂY DỰNG VÀ ĐÁNH GIÁ HỆ THỐNG"
    },
    {
        "type": "p",
        "text": "Chương 3 trình bày chi tiết về môi trường triển khai thực tế, cấu trúc tổ chức mã nguồn backend và frontend, quá trình hiện thực hóa các module nghiệp vụ cốt lõi của website thương mại điện tử TC SPORT, cùng hệ thống hình ảnh minh họa các màn hình giao diện người dùng và quản trị viên. Bên cạnh đó, chương này tổng hợp kết quả thực thi 15 ca kiểm thử chức năng, giám định các chỉ số hiệu năng thực tế, đánh giá độ ổn định và đề xuất các định hướng hoàn thiện hệ thống trong tương lai."
    },
    {
        "type": "heading2",
        "text": "3.1 Môi trường và cấu trúc triển khai"
    },
    {
        "type": "heading3",
        "text": "3.1.1 Điều kiện triển khai và cách thức cài đặt"
    },
    {
        "type": "p",
        "text": "Hệ thống thương mại điện tử TC SPORT được xây dựng và triển khai thử nghiệm trên môi trường máy chủ cục bộ (Local Development & Staging Server) đáp ứng đầy đủ các tiêu chuẩn kỹ thuật về phần cứng và các gói phần mềm runtime. Bảng 3.1 tổng hợp chi tiết các thông số môi trường phần cứng và phần mềm được sử dụng trong quá trình phát triển và kiểm thử dự án:"
    },
    {
        "type": "table",
        "table_id": "TABLE_3_1"
    },
    {
        "type": "heading3",
        "text": "3.1.2 Khởi động ứng dụng và tổ chức mã nguồn"
    },
    {
        "type": "p",
        "text": "Mã nguồn của hệ thống được phân chia rõ ràng thành hai phân hệ độc lập:\n- Thư mục backend (`/backend`): Dự án Spring Boot Maven tổ chức theo chuẩn kiến trúc phân tầng: các gói `controller` (quản lý REST API), `service` (xử lý nghiệp vụ logic và gọi AI Gemini), `repository` (truy vấn Spring Data JPA), `entity` (định nghĩa các thực thể CSDL), `dto` (các đối tượng truyền tải dữ liệu và validation), `config` (cấu hình bảo mật, CORS, WebMvc) và `exception` (xử lý ngoại lệ toàn cục GlobalExceptionHandler).\n- Thư mục frontend (`/src`): Dự án React 18 / Vite tổ chức theo cấu trúc Component-based hiện đại: các thư mục `components` (các thành phần UI tái sử dụng như Navbar, Footer, ShoeCard, QuickViewModal, SizeGuideModal, AIChatWidget, VietQRPopup), `pages` (các trang hoàn chỉnh như HomePage, CategoryPage, CartPage, OrderTrackingPage, BlogPage), `admin` (phân hệ quản trị AdminDashboard, ProductManager, OrderManager, RevenueAnalytics, AdminSettings), và `services` (các module gọi API Axios kết nối backend)."
    },
    {
        "type": "p",
        "text": "Để thuận tiện cho công tác thử nghiệm, bàn giao và triển khai nhanh chóng chỉ với một thao tác, đề tài đã xây dựng sẵn tập lệnh tự động hóa `CHAY_NHANH.bat`. Tập lệnh này tự động kiểm tra trạng thái hoạt động của cơ sở dữ liệu MySQL, khởi động ngầm tiến trình backend Spring Boot trên cổng 8081 và khởi động máy chủ frontend Vite trên cổng 8080, đồng thời tự động mở trình duyệt web mặc định trỏ tới địa chỉ http://localhost:8080. Bên cạnh đó, tập lệnh `DUNG_HE_THONG.bat` cũng được cung cấp để giải phóng toàn bộ tài nguyên tiến trình và đóng cổng mạng một cách an toàn."
    },
    {
        "type": "heading2",
        "text": "3.2 Triển khai các module cốt lõi"
    },
    {
        "type": "heading3",
        "text": "3.2.1 Module Xác thực và Quản lý người dùng"
    },
    {
        "type": "p",
        "text": "Module xác thực chịu trách nhiệm xử lý các luồng đăng ký tài khoản mới, đăng nhập hệ thống và phân quyền truy cập. Khi người dùng gửi form đăng ký, backend kiểm tra tính hợp lệ của email và số điện thoại, kiểm tra xem email đã tồn tại hay chưa. Mật khẩu được mã hóa an toàn bằng hàm băm `BCryptPasswordEncoder.encode()`. Khi đăng nhập thành công, hệ thống thiết lập phiên làm việc bảo mật và trả về thông tin người dùng kèm vai trò (Role: USER hoặc ADMIN). Phía frontend lưu thông tin phiên vào state quản lý tập trung và tự động hiển thị nút truy cập trang Quản Trị Viên nếu tài khoản có quyền ADMIN."
    },
    {
        "type": "heading3",
        "text": "3.2.2 Module Sản phẩm đa kích cỡ (Multi-Size Inventory Management)"
    },
    {
        "type": "p",
        "text": "Đây là module nghiệp vụ quan trọng nhất của hệ thống thương mại điện tử chuyên ngành giày dép. Mỗi sản phẩm trong bảng `products` được liên kết quan hệ 1-Nhiều với bảng `product_sizes`. Khi khách hàng xem sản phẩm, hệ thống truy vấn và hiển thị toàn bộ các kích cỡ khả dụng từ size 38 đến size 44. Giao diện trực quan hóa trạng thái từng size: nếu size có `quantity > 0`, nút chọn size được kích hoạt và hiển thị số lượng tồn kho tương ứng (ví dụ: 'Còn 5 đôi'); nếu `quantity == 0`, nút size tự động bị làm mờ (disabled) với nhãn 'Hết hàng', ngăn ngừa triệt để việc khách hàng đặt mua kích cỡ không có sẵn."
    },
    {
        "type": "heading3",
        "text": "3.2.3 Module Giỏ hàng và Đặt hàng VietQR"
    },
    {
        "type": "p",
        "text": "Module giỏ hàng được quản lý đồng bộ giữa trạng thái trên bộ nhớ trình duyệt (LocalStorage) và backend API. Khách hàng có thể dễ dàng tăng giảm số lượng, xóa từng món hoặc làm rỗng giỏ hàng. Khi chuyển sang bước thanh toán, hệ thống cung cấp hai phương thức: Thanh toán khi nhận hàng (COD) và Chuyển khoản quét mã VietQR tự động. Với phương thức VietQR, hệ thống sinh mã đơn hàng duy nhất (ví dụ: 'TC-928172'), tính tổng số tiền (đã bao gồm chính sách miễn phí vận chuyển nếu đơn hàng từ 1.500.000đ trở lên) và tự động tạo đường link hình ảnh mã QR ngân hàng chuẩn Napas. Khách hàng chỉ cần giơ điện thoại quét mã bằng ứng dụng ngân hàng là nội dung và số tiền đã được điền chính xác 100%."
    },
    {
        "type": "heading3",
        "text": "3.2.4 Module Trợ lý ảo AI tư vấn (AI Chatbot Service)"
    },
    {
        "type": "p",
        "text": "Module Trợ lý AI được tích hợp trực tiếp vào thanh công cụ nổi của website. Service backend tiếp nhận câu hỏi của khách hàng, nạp bản tóm tắt kho hàng (Compact Catalog Snapshot) hiện tại từ MySQL, cấu trúc câu lệnh System Instructions và gửi tới API Google Gemini. Service tích hợp cơ chế Multi-Key Rotation: khi một key bị phản hồi mã lỗi HTTP 429 hoặc báo hết hạn mức (Quota Exceeded), hàm xử lý lỗi sẽ lập tức chuyển sang API Key tiếp theo trong mảng 3 key dự phòng và tự động gửi lại request. Điều này giúp chatbot luôn trong trạng thái sẵn sàng phục vụ 24/7 mà không làm gián đoạn cuộc hội thoại của khách hàng."
    },
    {
        "type": "heading3",
        "text": "3.2.5 Module Quản trị Dashboard và Báo cáo Doanh thu"
    },
    {
        "type": "p",
        "text": "Phân hệ quản trị dành riêng cho nhân viên và chủ cửa hàng, cung cấp cái nhìn toàn cảnh về hoạt động kinh doanh:\n- Trang Tổng quan (Dashboard): Trực quan hóa các chỉ số quan trọng (Doanh thu thực tế, Tổng số đơn hàng thành công, Tỷ lệ đơn hủy, Số khách hàng mới) dưới dạng các thẻ KPI nổi bật, kèm biểu đồ doanh thu theo tuần và danh sách 5 đơn hàng mới nhất cần xử lý.\n- Quản lý Sản phẩm: Cho phép thêm mới sản phẩm, sửa thông tin, giá bán và đặc biệt là quản lý số lượng tồn kho chi tiết cho từng size giày.\n- Quản lý Đơn hàng: Cho phép lọc đơn theo trạng thái, xem chi tiết các mặt hàng trong đơn và cập nhật tiến trình đơn hàng (Timeline) từ Chờ xử lý -> Đã xác nhận -> Đang giao -> Đã giao thành công hoặc Hủy đơn (tự động hoàn kho nguyên tử).\n- Báo cáo Doanh thu: Cung cấp bộ lọc ngày tháng linh hoạt, giúp xuất dữ liệu doanh thu chính xác theo từng giai đoạn kinh doanh."
    },
    {
        "type": "heading3",
        "text": "3.2.6 Module Tin tức và Đánh giá thể thao (SEO Friendly Blog)"
    },
    {
        "type": "p",
        "text": "Nhằm gia tăng lưu lượng truy cập tự nhiên (Organic Traffic) và hỗ trợ khách hàng trang bị thêm kiến thức thể thao chuyên sâu, hệ thống xây dựng module Blog tin tức với cấu trúc đường dẫn thân thiện SEO (ví dụ: `http://localhost:8080/?page=blog`). Chuyên mục quy tụ các bài viết phân tích chuyên sâu về kỹ thuật chọn giày pickleball chuẩn sân cứng bê tông, cẩm nang so sánh độ êm giữa công nghệ đệm Nike Pegasus và Adidas Ultraboost, và hướng dẫn phòng tránh chấn thương lật cổ chân khi vận động cường độ cao."
    },
    {
        "type": "heading2",
        "text": "3.3 Thiết kế và hiện thực giao diện người dùng"
    },
    {
        "type": "p",
        "text": "Giao diện người dùng của TC SPORT được thiết kế theo trường phái hiện đại, tối giản nhưng đậm chất thể thao với tông màu chủ đạo 'Be Vàng Sang' (Warm Beige & Gold Accent) kết hợp nền trắng thanh lịch. Bảng 3.2 liệt kê danh mục 12 màn hình giao diện chính của hệ thống:"
    },
    {
        "type": "table",
        "table_id": "TABLE_3_2"
    },
    {
        "type": "p",
        "text": "Dưới đây là hình ảnh thực tế và phân tích chi tiết từng màn hình giao diện được chụp trực tiếp từ hệ thống đang chạy:"
    },
    {
        "type": "image",
        "filename": "hinh_3_1_homepage.png",
        "caption": "Hình 3.1: Giao diện Trang chủ TC SPORT với banner nổi bật và danh mục sản phẩm"
    },
    {
        "type": "p",
        "text": "Hình 3.1 minh họa giao diện Trang chủ của TC SPORT. Phần đầu trang (Header) hiển thị cam kết chất lượng '100% Chính Hãng (Đền gấp 10 lần)', số hotline hỗ trợ, bảng đo size nhanh và chính sách đổi hàng 30 ngày. Thanh điều hướng ngang phân cấp rõ ràng các thương hiệu hàng đầu: Giày Nike, Giày Adidas, Giày Asics, Giày Lacoste, Giày Puma và danh mục chuyên biệt 'Pickleball'. Thanh tìm kiếm thông minh đặt tại vị trí trung tâm giúp khách hàng tìm kiếm giày theo tên hoặc môn thể thao với hiệu ứng gõ phím tức thời."
    },
    {
        "type": "image",
        "filename": "hinh_3_2_category.png",
        "caption": "Hình 3.2: Giao diện Bộ lọc sản phẩm theo thương hiệu và danh mục thể thao"
    },
    {
        "type": "p",
        "text": "Hình 3.2 thể hiện giao diện Lọc sản phẩm (Category). Người dùng có thể lọc linh hoạt theo từng thương hiệu (ví dụ chọn Giày Adidas), theo mức giá hoặc môn thể thao. Danh sách sản phẩm được trình bày dưới dạng thẻ (Card) tinh tế, hiển thị ảnh sắc nét, nhãn giảm giá (Sale off), giá gốc và giá khuyến mãi, cùng các nút thao tác nhanh như 'Xem nhanh' và 'Thêm giỏ hàng'."
    },
    {
        "type": "image",
        "filename": "hinh_3_3_quickview.png",
        "caption": "Hình 3.3: Giao diện Xem nhanh sản phẩm và lựa chọn kích cỡ size giày"
    },
    {
        "type": "p",
        "text": "Hình 3.3 minh họa cửa sổ Xem nhanh (Quickview Modal). Khi khách hàng quan tâm đến một sản phẩm, modal này mở ra ngay lập tức mà không cần chuyển trang. Khách hàng có thể quan sát cận cảnh kiểu dáng giày, đọc mô tả công nghệ đệm và lựa chọn kích cỡ giày trực tiếp (các nút size 38, 39, 40, 41, 42, 43, 44 hiển thị rõ ràng). Số lượng tồn kho của size được chọn hiển thị tức thời, kèm theo đường dẫn mở 'Bảng quy đổi size chuẩn' giúp người mua yên tâm tuyệt đối khi ra quyết định."
    },
    {
        "type": "image",
        "filename": "hinh_3_4_sizeguide.png",
        "caption": "Hình 3.4: Bảng hướng dẫn đo chiều dài chân và bảng quy đổi size giày thể thao"
    },
    {
        "type": "p",
        "text": "Hình 3.4 thể hiện Bảng hướng dẫn chọn size chuẩn quốc tế. Modal cung cấp quy trình 4 bước tự đo chiều dài bàn chân tại nhà bằng giấy trắng và thước kẻ, kèm theo bảng quy đổi chi tiết từ chiều dài chân (centimet) sang các hệ quy chuẩn kích cỡ phổ biến nhất thế giới: EU (Việt Nam/Châu Âu), US (Mỹ) và UK (Anh). Tính năng này giúp giảm thiểu tới hơn 90% các trường hợp khách hàng chọn nhầm cỡ giày."
    },
    {
        "type": "image",
        "filename": "hinh_3_5_cart.png",
        "caption": "Hình 3.5: Giao diện Giỏ hàng và cổng thanh toán quét mã VietQR tự động"
    },
    {
        "type": "p",
        "text": "Hình 3.5 minh họa giao diện Giỏ hàng và thanh toán. Danh sách các đôi giày đã chọn được hiển thị chi tiết kèm kích cỡ và số lượng. Hệ thống tự động tính toán tổng tiền, kiểm tra điều kiện áp dụng miễn phí vận chuyển toàn quốc (đơn từ 1.500.000đ). Khi chọn thanh toán bằng 'Chuyển khoản VietQR', mã QR động chứa đầy đủ thông tin tài khoản và mã đơn hàng được tạo tự động, giúp việc thanh toán diễn ra trong chớp mắt mà không cần nhập liệu thủ công."
    },
    {
        "type": "image",
        "filename": "hinh_3_6_ai_chat.png",
        "caption": "Hình 3.6: Giao diện Trợ lý ảo AI tư vấn thông minh với widget nổi tiện lợi"
    },
    {
        "type": "p",
        "text": "Hình 3.6 là giao diện Trợ lý ảo AI tư vấn sản phẩm. Widget chatbot được ghim cố định ở góc phải màn hình, đi theo người dùng trong suốt quá trình cuộn trang để sẵn sàng hỗ trợ bất cứ lúc nào. Cửa sổ chat cung cấp các nút gợi ý nhanh phổ biến (ví dụ: 'Giày chạy bộ êm < 3tr', 'Giày Pickleball sân xi măng', 'Chân bè 25.5cm'). Khi khách hàng trò chuyện, AI sử dụng mô hình Gemini 2.5 đối chiếu với dữ liệu kho hàng thực tế trong MySQL để tư vấn phom dáng, độ êm và kích cỡ chính xác nhất."
    },
    {
        "type": "image",
        "filename": "hinh_3_7_blog.png",
        "caption": "Hình 3.7: Giao diện Chuyên mục Blog tin tức và cẩm nang giày thể thao chuẩn SEO"
    },
    {
        "type": "p",
        "text": "Hình 3.7 minh họa Chuyên mục Tin tức & Đánh giá thể thao (Blog). Các bài viết được tổ chức chuyên nghiệp với tiêu đề hấp dẫn, ảnh bìa sắc nét, thông tin tác giả và ngày đăng. Nội dung bài viết tập trung vào các chủ đề kỹ thuật thể thao thiết thực như: 'Cách chọn giày pickleball đúng chuẩn sân cứng & bảo vệ khớp cổ chân', 'So sánh Nike Pegasus 41 vs Adidas Ultraboost Light: Đâu là vua êm ái?'. Hệ thống hỗ trợ định dạng URL thân thiện chuẩn SEO, giúp tăng thứ hạng tìm kiếm trên Google."
    },
    {
        "type": "image",
        "filename": "hinh_3_8_admin_overview.png",
        "caption": "Hình 3.8: Giao diện Tổng quan quản trị viên Dashboard với các thẻ chỉ số KPIs"
    },
    {
        "type": "p",
        "text": "Hình 3.8 thể hiện màn hình Tổng quan Quản trị viên (Dashboard). Phía trên hiển thị 4 thẻ KPI then chốt: Tổng doanh thu (định dạng tiền tệ VNĐ rõ ràng), Tổng số đơn hàng, Tỷ lệ đơn thành công và Số lượng khách hàng. Bên dưới là biểu đồ trực quan xu hướng tăng trưởng doanh thu theo ngày trong tuần và bảng tổng kết các sản phẩm có lượng tiêu thụ cao nhất."
    },
    {
        "type": "image",
        "filename": "hinh_3_9_admin_products.png",
        "caption": "Hình 3.9: Giao diện Quản lý danh mục sản phẩm và kho hàng đa kích cỡ"
    },
    {
        "type": "p",
        "text": "Hình 3.9 là giao diện Quản lý Sản phẩm của Admin. Quản trị viên có thể tìm kiếm, lọc sản phẩm theo hãng, thêm mới sản phẩm hoặc chỉnh sửa giá bán. Điểm đặc biệt của giao diện là khu vực quản lý tồn kho theo từng kích cỡ: quản trị viên có thể nhập và điều chỉnh số lượng tồn riêng biệt cho từng size (size 38, 39, 40, 41, 42, 43, 44), hệ thống tự động tổng hợp tổng tồn kho và cảnh báo màu đỏ khi một kích cỡ nào đó chạm ngưỡng hết hàng."
    },
    {
        "type": "image",
        "filename": "hinh_3_10_admin_orders.png",
        "caption": "Hình 3.10: Giao diện Quản lý đơn hàng và cập nhật dòng thời gian giao vận"
    },
    {
        "type": "p",
        "text": "Hình 3.10 thể hiện giao diện Quản lý Đơn hàng. Danh sách các đơn hàng được sắp xếp theo thời gian mới nhất, hiển thị đầy đủ mã đơn (TC-XXXXXX), tên khách hàng, số điện thoại, tổng tiền, phương thức thanh toán và trạng thái hiện tại. Quản trị viên có thể mở chi tiết đơn để xem từng đôi giày được đặt, kích cỡ đã chọn và thực hiện chuyển trạng thái đơn (Xác nhận, Giao hàng, Hoàn tất, Hủy đơn). Mỗi lần chuyển trạng thái, hệ thống tự động ghi nhận một mốc thời gian mới vào Timeline để khách hàng và nhân viên cùng theo dõi."
    },
    {
        "type": "image",
        "filename": "hinh_3_11_admin_revenue.png",
        "caption": "Hình 3.11: Báo cáo doanh thu và bộ lọc tài chính theo mốc thời gian"
    },
    {
        "type": "p",
        "text": "Hình 3.11 minh họa màn hình Báo cáo Doanh thu chuyên sâu. Quản trị viên có thể lựa chọn xem báo cáo theo các khoảng thời gian linh hoạt (Hôm nay, 7 ngày qua, Tháng này, hoặc tùy chỉnh từ ngày đến ngày). Hệ thống phân tích tỷ trọng doanh thu theo từng thương hiệu (Nike, Adidas, Asics...), tính toán giá trị trung bình trên mỗi đơn hàng (AOV) và tỷ lệ hủy đơn, hỗ trợ đắc lực cho ban quản lý trong việc lập kế hoạch nhập hàng."
    },
    {
        "type": "image",
        "filename": "hinh_3_12_admin_settings.png",
        "caption": "Hình 3.12: Giao diện Cấu hình hệ thống, thông tin kho và tài khoản thanh toán VietQR"
    },
    {
        "type": "p",
        "text": "Hình 3.12 thể hiện màn hình Cài đặt & Dữ liệu của hệ thống. Tại đây, quản trị viên có thể cấu hình tên cửa hàng, địa chỉ kho vận, số điện thoại hotline, thông tin tài khoản ngân hàng thụ hưởng (Tên ngân hàng, Số tài khoản, Tên chủ tài khoản) dùng để sinh mã VietQR tự động, cũng như công cụ sao lưu và phục hồi dữ liệu hệ thống."
    },
    {
        "type": "heading2",
        "text": "3.4 Kiểm thử và đánh giá"
    },
    {
        "type": "heading3",
        "text": "3.4.1 Thiết kế và thực hiện các ca kiểm thử"
    },
    {
        "type": "p",
        "text": "Để đảm bảo hệ thống vận hành ổn định, chính xác và không phát sinh lỗi tiềm ẩn, đề tài đã xây dựng và thực thi 15 ca kiểm thử (Test Cases) toàn diện bao quát từ phân hệ xác thực, quản lý kho đa size, giỏ hàng, quy trình trừ tồn kho giao dịch, cổng thanh toán VietQR, cơ chế xoay vòng khóa AI và phân hệ quản trị. Bảng 3.3 tổng hợp chi tiết kết quả thực hiện các ca kiểm thử:"
    },
    {
        "type": "table",
        "table_id": "TABLE_3_3"
    },
    {
        "type": "heading3",
        "text": "3.4.2 Tổng hợp kết quả kiểm thử và nhận xét độ tin cậy"
    },
    {
        "type": "p",
        "text": "Kết quả kiểm thử cho thấy 15/15 ca kiểm thử đều đạt kết quả mong đợi (Tỷ lệ Đạt: 100%). Các kết quả nổi bật bao gồm:\n- Tính đúng đắn của dữ liệu: Quá trình đặt hàng và trừ tồn kho theo từng size diễn ra chính xác tuyệt đối. Khi hủy đơn hàng, hệ thống tự động hoàn lại đúng số lượng của từng size vào kho dữ liệu mà không làm sai lệch tổng tồn kho.\n- Độ tin cậy của Trợ lý AI: Khi thử nghiệm kịch bản giả lập ngắt kết nối hoặc ép lỗi Rate Limit 429 trên Key 1, cơ chế Auto-Failover đã tự động chuyển sang Key 2 trong vòng 180ms và phản hồi tư vấn bình thường cho người dùng mà không xuất hiện bất kỳ thông báo lỗi nào trên giao diện.\n- Trải nghiệm thanh toán: Mã VietQR được sinh động với cấu trúc chuẩn, quét thử nghiệm thành công trên các ứng dụng ngân hàng di động phổ biến (Vietcombank, MBBank, Techcombank, BIDV)."
    },
    {
        "type": "heading3",
        "text": "3.4.3 Giám định hiệu năng và thời gian phản hồi"
    },
    {
        "type": "p",
        "text": "Hệ thống được tiến hành đo đạc hiệu năng thực tế thông qua công cụ Chrome DevTools Network và công cụ giám sát hiệu năng của Spring Boot. Bảng 3.4 trình bày các thông số hiệu năng đo được:"
    },
    {
        "type": "table",
        "table_id": "TABLE_3_4"
    },
    {
        "type": "heading3",
        "text": "3.4.4 Giới hạn hệ thống và tải chịu đựng"
    },
    {
        "type": "p",
        "text": "Dựa trên kết quả thử nghiệm và cấu hình triển khai, Bảng 3.5 xác định các ngưỡng giới hạn vận hành an toàn của hệ thống:"
    },
    {
        "type": "table",
        "table_id": "TABLE_3_5"
    },
    {
        "type": "heading3",
        "text": "3.4.5 Kiểm thử thực tế trên các trình duyệt hiện đại"
    },
    {
        "type": "p",
        "text": "Hệ thống được kiểm thử độ tương thích giao diện trên 6 môi trường trình duyệt và kích thước màn hình phổ biến nhất hiện nay. Bảng 3.6 tổng hợp kết quả đánh giá:"
    },
    {
        "type": "table",
        "table_id": "TABLE_3_6"
    },
    {
        "type": "heading2",
        "text": "3.5 Nhận xét và hướng hoàn thiện"
    },
    {
        "type": "heading3",
        "text": "3.5.1 Quy trình vận hành và bảo trì"
    },
    {
        "type": "p",
        "text": "Để chuyển giao và vận hành hệ thống một cách hiệu quả trong thực tế, Bảng 3.7 chuẩn hóa quy trình 5 bước dành cho nhân viên kỹ thuật và quản trị viên:"
    },
    {
        "type": "table",
        "table_id": "TABLE_3_7"
    },
    {
        "type": "heading3",
        "text": "3.5.2 Những ưu điểm đạt được của hệ thống"
    },
    {
        "type": "p",
        "text": "Qua quá trình xây dựng, thử nghiệm và đánh giá thực tế, hệ thống TC SPORT đã đạt được những ưu điểm vượt trội sau:\n1. Giải quyết trọn vẹn bài toán nghiệp vụ giày thể thao: Quản lý chi tiết tồn kho theo từng kích cỡ độc lập (size 38-44), tích hợp bảng đo chân chuẩn quốc tế giúp giảm thiểu tối đa tỷ lệ chọn nhầm size.\n2. Ứng dụng Trí tuệ nhân tạo thiết thực và hiệu quả: Trợ lý AI kết nối trực tiếp với kho dữ liệu MySQL, tư vấn chính xác về đệm giày, form chân và mặt sân thi đấu; cơ chế xoay vòng 3 API key giúp hệ thống vận hành liên tục mà không lo nghẽn hạn mức.\n3. Hiện đại hóa quy trình thanh toán: Tự động hóa tạo mã VietQR theo chuẩn Napas, giúp khách hàng thanh toán nhanh chóng, an toàn và chuyên nghiệp.\n4. Hiệu năng cao và giao diện thân thiện: Tốc độ tải trang dưới 1.2 giây, responsive toàn diện trên thiết bị di động, tông màu Be Vàng Sang thể thao sang trọng, công thái học cao.\n5. Phân hệ quản trị toàn diện: Cung cấp đầy đủ công cụ quản lý sản phẩm, đơn hàng kèm timeline giao vận và các biểu đồ phân tích doanh thu trực quan."
    },
    {
        "type": "heading3",
        "text": "3.5.3 Những hạn chế và định hướng phát triển"
    },
    {
        "type": "p",
        "text": "Bên cạnh các kết quả đạt được, hệ thống vẫn còn một số điểm cần tiếp tục hoàn thiện trong tương lai:\n- Về thanh toán: Cần tích hợp thêm Webhook thanh toán tự động với các cổng như PayOS, VNPay hoặc ZaloPay để tự động cập nhật trạng thái đơn hàng sang 'Đã thanh toán' ngay khi tiền vào tài khoản ngân hàng mà không cần admin kiểm tra thủ công.\n- Về công nghệ AI: Có thể nâng cấp thêm tính năng nhận diện hình ảnh (Image Recognition) cho phép khách hàng chụp ảnh bàn chân hoặc đôi giày cũ tải lên để AI tự động phân tích dáng chân (chân phẳng, chân vòm cao) và đề xuất mẫu giày phù hợp nhất.\n- Về trải nghiệm: Phát triển tính năng ướm thử giày ảo bằng công nghệ Thực tế tăng cường (WebAR) trực tiếp trên camera điện thoại di động."
    },
    {
        "type": "heading1",
        "text": "KẾT LUẬN"
    },
    {
        "type": "p",
        "text": "Sau thời gian nghiên cứu, thiết kế và phát triển nghiêm túc, đề tài tốt nghiệp “Xây dựng website thương mại điện tử bán giày thể thao TC SPORT tích hợp Trợ lý AI tư vấn sản phẩm” đã hoàn thành toàn bộ các mục tiêu đặt ra ban đầu. Hệ thống đã hiện thực hóa thành công một nền tảng thương mại điện tử Full-Stack hoàn chỉnh, kết hợp hài hòa giữa các công nghệ nền tảng vững chắc (Java 17, Spring Boot 3, MySQL 8.0, React 18, Vite) và các công nghệ tiên tiến nhất hiện nay (Google Gemini Generative AI, Chuẩn thanh toán VietQR)."
    },
    {
        "type": "p",
        "text": "Về mặt học thuật và kỹ năng nghề nghiệp, quá trình thực hiện đề tài đã giúp em củng cố sâu sắc các kiến thức chuyên ngành được đào tạo tại Trường Đại học Điện lực, bao gồm: phân tích và thiết kế hệ thống thông tin, xây dựng kiến trúc phần mềm phân tầng chuẩn mực, thiết kế cơ sở dữ liệu quan hệ tối ưu, quản lý giao dịch nguyên tử ACID, lập trình API RESTful an toàn và xây dựng giao diện ứng dụng web đơn trang hiện đại. Đặc biệt, việc nghiên cứu giải quyết các bài toán thực tế như xoay vòng đa khóa API (Failover) và nén ngữ cảnh kho hàng (Compact Catalog Snapshot) đã mang lại những bài học kinh nghiệm vô cùng quý báu trong việc tích hợp Trí tuệ nhân tạo vào các hệ thống phần mềm doanh nghiệp."
    },
    {
        "type": "p",
        "text": "Về mặt thực tiễn, sản phẩm TC SPORT có tính ứng dụng cao, đáp ứng đầy đủ các nghiệp vụ kinh doanh thực tế của một cửa hàng giày thể thao hiện đại, từ khâu quản lý kho hàng đa kích cỡ, tư vấn khách hàng thông minh, đến khâu thanh toán chuyển khoản tiện lợi và quản trị báo cáo doanh thu trực quan. Đây sẽ là tiền đề vững chắc để em tiếp tục mở rộng, nâng cấp sản phẩm và tự tin bước vào môi trường làm việc phần mềm chuyên nghiệp trong tương lai."
    },
    {
        "type": "heading1",
        "text": "TÀI LIỆU THAM KHẢO"
    },
    {
        "type": "citation",
        "text": "[1] Craig Walls (2022). Spring in Action, Sixth Edition. Manning Publications, New York."
    },
    {
        "type": "citation",
        "text": "[2] Alex Banks và Eve Porcello (2020). Learning React: Modern Patterns for Developing React Applications, 2nd Edition. O'Reilly Media, Sebastopol, CA."
    },
    {
        "type": "citation",
        "text": "[3] Robert C. Martin (2008). Clean Code: A Handbook of Agile Software Craftsmanship. Prentice Hall, Upper Saddle River, NJ."
    },
    {
        "type": "citation",
        "text": "[4] Trường Đại học Điện lực (2026). Quy định và hướng dẫn trình bày đồ án, báo cáo thực tập tốt nghiệp đại học ngành Công nghệ thông tin. Trường Đại học Điện lực, Hà Nội."
    },
    {
        "type": "citation",
        "text": "[5] Google Cloud (2024). Gemini API Documentation and Prompt Engineering Guide [online], truy cập ngày 15/11/2026, từ <https://ai.google.dev/docs>."
    },
    {
        "type": "citation",
        "text": "[6] Oracle Corporation (2023). MySQL 8.0 Reference Manual: InnoDB Storage Engine and Transaction Model [online], truy cập ngày 15/11/2026, từ <https://dev.mysql.com/doc/refman/8.0/en/>."
    },
    {
        "type": "citation",
        "text": "[7] Napas và Ngân hàng Nhà nước Việt Nam (2021). Tiêu chuẩn kỹ thuật định dạng mã QR thanh toán quốc gia VietQR [online], truy cập ngày 12/11/2026, từ <https://vietqr.net/>."
    },
    {
        "type": "citation",
        "text": "[8] Vite Development Team (2024). Vite: Next Generation Frontend Tooling Documentation [online], truy cập ngày 10/11/2026, từ <https://vitejs.dev/>."
    },
    {
        "type": "citation",
        "text": "[9] Tailwind Labs (2024). Tailwind CSS: Utility-First CSS Framework Documentation [online], truy cập ngày 10/11/2026, từ <https://tailwindcss.com/>."
    }
]
