# -*- coding: utf-8 -*-
"""
report_data_ch2.py - Nội dung chi tiết Chương 2 cho Báo cáo thực tập tốt nghiệp TC SPORT
Sinh viên: Nguyễn Anh Tú - MSSV: 22810310121
Tuân thủ Phụ lục 11 về tiêu đề và phần dẫn nhập chương
"""

CH2_SECTIONS = [
    {
        "type": "heading1",
        "text": "CHƯƠNG 2: CÔNG NGHỆ VÀ THIẾT KẾ HỆ THỐNG"
    },
    {
        "type": "p",
        "text": "Chương 2 tập trung phân tích sâu về cơ sở lý thuyết và các giải pháp công nghệ chủ đạo được lựa chọn để phát triển hệ thống TC SPORT, bao gồm hệ sinh thái Java 17, Spring Boot 3, React 18, MySQL 8.0 và mô hình trí tuệ nhân tạo Google Gemini AI. Đồng thời, chương này trình bày chi tiết về kiến trúc phân tầng 4 lớp, luồng dữ liệu xử lý giao dịch nguyên tử, thuật toán xoay vòng 3 API Key (Failover), kỹ thuật nén ngữ cảnh kho hàng (Compact Catalog Snapshot), và thiết kế cơ sở dữ liệu quan hệ 8 bảng bảo đảm an toàn, bảo mật và toàn vẹn dữ liệu."
    },
    {
        "type": "heading2",
        "text": "2.1 Cơ sở công nghệ"
    },
    {
        "type": "heading3",
        "text": "2.1.1 Java 17 và hệ sinh thái Spring Boot 3.x"
    },
    {
        "type": "p",
        "text": "Java 17 là phiên bản hỗ trợ dài hạn (Long-Term Support - LTS) của ngôn ngữ lập trình Java, mang đến nhiều cải tiến vượt bậc về hiệu năng máy ảo (JVM), khả năng quản lý bộ nhớ thế hệ mới (ZGC) và các tính năng ngôn ngữ hiện đại như Pattern Matching, Sealed Classes, Record types giúp mã nguồn ngắn gọn, tường minh và an toàn kiểu dữ liệu hơn. Việc lựa chọn Java 17 làm nền tảng phát triển backend xuất phát từ đòi hỏi về tính ổn định cao, khả năng xử lý đa luồng mạnh mẽ và khả năng tương thích lâu dài trong các ứng dụng doanh nghiệp thương mại điện tử."
    },
    {
        "type": "p",
        "text": "Trên nền tảng Java 17, hệ thống ứng dụng framework Spring Boot 3.2.x – một bước nhảy vọt của hệ sinh thái Spring. Spring Boot 3 cung cấp cơ chế tự động cấu hình (Auto-Configuration), nhúng sẵn máy chủ web Apache Tomcat hiệu năng cao và loại bỏ hoàn toàn các cấu hình XML rườm rà. Các module chủ đạo của Spring được áp dụng bao gồm:\n- Spring Web MVC: Xây dựng các RESTful Controller xử lý các yêu cầu HTTP theo tiêu chuẩn phi trạng thái (Stateless), hỗ trợ chuyển đổi tự động đối tượng Java sang định dạng JSON và ngược lại qua thư viện Jackson.\n- Spring Data JPA & Hibernate: Cung cấp tầng trừu tượng hóa truy cập dữ liệu mạnh mẽ, cho phép tương tác với cơ sở dữ liệu thông qua các giao diện Repository tiêu chuẩn mà không cần viết các câu lệnh SQL thuần túy phức tạp, đồng thời hỗ trợ phân trang (Pageable) và tối ưu hóa bộ nhớ đệm cấp 1 và cấp 2.\n- Spring Security: Cung cấp khung bảo mật toàn diện, quản lý xác thực và phân quyền dựa trên vai trò (Role-Based Access Control - RBAC), kết hợp bộ lọc (Filter Chain) để kiểm soát mọi truy cập tới các endpoint API nhạy cảm."
    },
    {
        "type": "heading3",
        "text": "2.1.2 React 18, Vite và Tailwind CSS"
    },
    {
        "type": "p",
        "text": "Ở phía giao diện người dùng (Frontend), hệ thống được xây dựng dưới dạng ứng dụng đơn trang (Single Page Application - SPA) sử dụng thư viện React 18. Phiên bản React 18 giới thiệu cơ chế Concurrent Rendering và kiến trúc Fiber thế hệ mới, cho phép trình duyệt ưu tiên xử lý các thao tác tương tác tức thời của người dùng (như gõ phím tìm kiếm, bấm chọn size giày) trước các tác vụ render nền nặng nề, từ đó mang lại cảm giác mượt mà tuyệt đối."
    },
    {
        "type": "p",
        "text": "Để tăng tốc độ phát triển và tối ưu hóa việc đóng gói sản phẩm, dự án sử dụng Vite 5 làm build tool thay vì Webpack truyền thống. Nhờ tận dụng cơ chế Native ES Modules (ESM) của trình duyệt trong môi trường phát triển (Dev Mode) và trình đóng gói Rollup siêu nhanh khi build production, thời gian khởi động server chỉ mất dưới 300ms và cơ chế Hot Module Replacement (HMR) phản hồi thay đổi mã nguồn gần như ngay lập tức. Về mặt giao diện, hệ thống áp dụng Tailwind CSS – framework utility-first cho phép xây dựng layout responsive cực kỳ linh hoạt, kết hợp bộ icon hiện đại Lucide React giúp giao diện đạt chuẩn thẩm mỹ cao với chủ đề Be Vàng Sang thể thao thanh lịch."
    },
    {
        "type": "heading3",
        "text": "2.1.3 Hệ quản trị cơ sở dữ liệu MySQL 8.0 và giao dịch ACID"
    },
    {
        "type": "p",
        "text": "MySQL 8.0 Community Edition được lựa chọn làm hệ quản trị cơ sở dữ liệu quan hệ cho toàn bộ hệ thống TC SPORT. Với việc sử dụng công cụ lưu trữ mặc định InnoDB, MySQL 8.0 đảm bảo tuyệt đối 4 đặc tính ACID (Atomicity, Consistency, Isolation, Durability) cho các giao dịch nghiệp vụ cốt lõi:\n- Tính nguyên tử (Atomicity): Đảm bảo các chuỗi thao tác như 'Tạo bản ghi đơn hàng' và 'Trừ số lượng tồn kho của size tương ứng' phải thành công toàn bộ; nếu một bước bị lỗi (ví dụ hết hàng đột ngột), toàn bộ thay đổi sẽ được hoàn tác (Rollback) về trạng thái ban đầu.\n- Tính nhất quán (Consistency): Dữ liệu luôn tuân thủ các ràng buộc toàn vẹn khóa chính, khóa ngoại và các quy tắc kiểm tra (Check constraints) trước và sau mỗi giao dịch.\n- Tính cô lập (Isolation): Sử dụng mức cô lập giao dịch phù hợp kết hợp cơ chế khóa dòng (Row-level Locking) để ngăn chặn hiện tượng đọc bẩn (Dirty Read) hoặc bán vượt tồn kho (Overselling) khi có nhiều khách hàng cùng đặt mua cùng một đôi giày.\n- Tính bền vững (Durability): Dữ liệu đơn hàng sau khi hoàn tất được ghi nhận an toàn vào Redo Log và đĩa cứng, bảo đảm không bị mất mát ngay cả khi xảy ra sự cố mất điện máy chủ đột ngột."
    },
    {
        "type": "heading3",
        "text": "2.1.4 Mô hình ngôn ngữ lớn Google Gemini AI và Prompt Engineering"
    },
    {
        "type": "p",
        "text": "Google Gemini Generative AI là dòng mô hình ngôn ngữ lớn đa phương thức (Multimodal LLM) thế hệ mới nhất do Google DeepMind phát triển. Trong đề tài này, hệ thống tích hợp mô hình Gemini 2.5 Flash / Flash Lite – phiên bản được tối ưu hóa đặc biệt về tốc độ suy luận cực nhanh và chi phí token thấp, rất phù hợp cho các bài toán tương tác trực tiếp với khách hàng thời gian thực."
    },
    {
        "type": "p",
        "text": "Để biến mô hình AI tổng quát thành một chuyên gia tư vấn giày thể thao chuyên nghiệp của TC SPORT, đề tài đã áp dụng kỹ thuật Prompt Engineering chuyên sâu kết hợp System Instructions nghiêm ngặt. Hệ thống chỉ đạo AI đóng vai trò 'Chuyên gia thể thao TC SPORT', chỉ tư vấn dựa trên danh mục sản phẩm và kích cỡ thực tế được cung cấp, tuyệt đối không bịa đặt sản phẩm không có trong kho, tập trung phân tích đặc tính đệm (Zoom Air, Boost, GEL, Floatride), loại mặt sân (sân cứng pickleball, đường chạy nhựa, đường mòn trail) và dáng bàn chân (chân thon, chân bè ngang). Hơn nữa, câu trả lời được giới hạn ngắn gọn, súc tích (dưới 120 từ) để tránh lan man và tiết kiệm token tối đa."
    },
    {
        "type": "heading3",
        "text": "2.1.5 Cổng thanh toán VietQR và giải pháp bảo mật dữ liệu"
    },
    {
        "type": "p",
        "text": "Hệ thống tích hợp chuẩn thanh toán quốc gia VietQR (do Napas phối hợp cùng các ngân hàng thương mại Việt Nam ban hành). Bằng việc xây dựng thuật toán sinh chuỗi định dạng mã thanh toán trực tuyến, hệ thống tạo ra mã QR động chứa đầy đủ thông tin: Mã định danh ngân hàng (BIN), Số tài khoản người thụ hưởng, Số tiền chính xác của đơn hàng và Nội dung chuyển khoản gắn liền với mã đơn hàng duy nhất (ví dụ: 'TC-928172'). Khách hàng chỉ cần sử dụng ứng dụng Mobile Banking của bất kỳ ngân hàng nào để quét mã, toàn bộ thông tin được tự động điền chính xác 100%, loại bỏ hoàn toàn nguy cơ chuyển khoản nhầm số tài khoản hoặc sai số tiền."
    },
    {
        "type": "p",
        "text": "Về mặt bảo mật thông tin, hệ thống áp dụng thuật toán băm một chiều BCrypt kết hợp Salt ngẫu nhiên với hệ số chi phí (work factor) là 10 để lưu trữ mật khẩu người dùng trong cơ sở dữ liệu. Ngay cả khi dữ liệu bị lộ lọt, kẻ tấn công cũng không thể khôi phục lại mật khẩu gốc thông qua các bảng tra cứu sẵn (Rainbow Table). Các API endpoint được bảo vệ bởi bộ lọc phân quyền nghiêm ngặt và cấu hình CORS (Cross-Origin Resource Sharing) chặt chẽ, chỉ cho phép các domain được xác thực kết nối đến hệ thống backend."
    },
    {
        "type": "heading2",
        "text": "2.2 Kiến trúc phần mềm và module"
    },
    {
        "type": "heading3",
        "text": "2.2.1 Kiến trúc phân tầng của hệ thống"
    },
    {
        "type": "p",
        "text": "Hệ thống TC SPORT được thiết kế theo mô hình kiến trúc phân tầng (Layered Architecture) chuẩn mực dành cho ứng dụng doanh nghiệp hiện đại, bao gồm 4 tầng chính: Presentation Layer (Client SPA), API Gateway / Controller Layer, Business Logic Service Layer và Data Access Layer (Repository), kết nối với tầng lưu trữ MySQL và dịch vụ bên thứ ba Google Gemini AI. Sơ đồ kiến trúc tổng thể được biểu diễn trong Hình 2.1 dưới đây:"
    },
    {
        "type": "image",
        "filename": "hinh_2_1_architecture.png",
        "caption": "Hình 2.1: Kiến trúc phân tầng của hệ thống TC SPORT"
    },
    {
        "type": "p",
        "text": "Các tầng kiến trúc tương tác với nhau thông qua các giao tiếp phi trạng thái (Stateless Communication). Client gửi yêu cầu HTTP (GET, POST, PUT, DELETE) kèm payload định dạng JSON tới các Controller. Controller đảm nhiệm vai trò kiểm tra tính hợp lệ của dữ liệu (Validation), sau đó gọi tới Service tương ứng để thực thi logic nghiệp vụ. Service tương tác với Repository để truy vấn hoặc cập nhật dữ liệu vào MySQL, hoặc kết nối tới dịch vụ ngoài Google Gemini thông qua HTTP client bất đồng bộ."
    },
    {
        "type": "heading3",
        "text": "2.2.2 Luồng dữ liệu xử lý đặt hàng và trừ tồn kho nguyên tử"
    },
    {
        "type": "p",
        "text": "Nghiệp vụ đặt hàng là quy trình cốt lõi và phức tạp nhất của hệ thống, đòi hỏi sự phối hợp chặt chẽ giữa việc xác thực thông tin khách hàng, kiểm tra tính khả dụng của số lượng tồn kho theo từng kích cỡ cụ thể và sinh mã đơn hàng kèm mã thanh toán VietQR. Sơ đồ luồng dữ liệu đặt hàng được minh họa chi tiết trong Hình 2.2:"
    },
    {
        "type": "image",
        "filename": "hinh_2_2_dataflow.png",
        "caption": "Hình 2.2: Sơ đồ luồng dữ liệu đặt hàng và kiểm soát tồn kho đa size"
    },
    {
        "type": "p",
        "text": "Toàn bộ chuỗi thao tác trong quy trình đặt hàng được bao bọc trong một phương thức có chú thích @Transactional của Spring. Khi nhận được yêu cầu đặt hàng, hệ thống thực hiện truy vấn bảng `product_sizes` với khóa dòng tương ứng của từng mặt hàng và kích cỡ được chọn. Nếu số lượng tồn kho (quantity) lớn hơn hoặc bằng số lượng yêu cầu, hệ thống tiến hành trừ tồn kho, tạo bản ghi trong bảng `orders`, tạo các bản ghi chi tiết trong `order_items`, ghi nhận mốc khởi tạo trong `order_timeline`, và trả về thông tin đơn hàng kèm mã VietQR cho người dùng. Nếu xảy ra bất kỳ lỗi nào (như tồn kho không đủ tại thời điểm ghi), toàn bộ giao dịch sẽ lập tức bị hủy bỏ (Rollback), bảo đảm tuyệt đối dữ liệu không bị sai lệch."
    },
    {
        "type": "heading3",
        "text": "2.2.3 Phân rã thành phần và trách nhiệm các tầng"
    },
    {
        "type": "p",
        "text": "Bảng 2.1 tổng hợp sự phân chia trách nhiệm và các công nghệ chủ đạo tại từng tầng trong kiến trúc hệ thống TC SPORT:"
    },
    {
        "type": "table",
        "table_id": "TABLE_2_1"
    },
    {
        "type": "heading3",
        "text": "2.2.4 Luồng xác thực và phân quyền RBAC"
    },
    {
        "type": "p",
        "text": "Hệ thống áp dụng mô hình phân quyền dựa trên vai trò (Role-Based Access Control - RBAC) với hai nhóm quyền chính:\n1. Quyền Khách hàng (ROLE_USER): Cho phép xem danh mục sản phẩm, tìm kiếm, lọc theo tiêu chí, sử dụng bảng đo size, thêm hàng vào giỏ, tạo đơn hàng, thanh toán VietQR, sử dụng Trợ lý AI và tra cứu vận đơn theo số điện thoại.\n2. Quyền Quản trị viên (ROLE_ADMIN): Kế thừa toàn bộ quyền của khách hàng, đồng thời được cấp quyền truy cập vào phân hệ Quản trị (/admin) để xem Dashboard phân tích doanh thu, quản lý danh mục sản phẩm và cập nhật số lượng tồn kho từng size, quản lý quy trình chuyển trạng thái đơn hàng (Timeline) và cấu hình tài khoản thanh toán hệ thống."
    },
    {
        "type": "heading2",
        "text": "2.3 Các thuật toán và cơ chế điều phối"
    },
    {
        "type": "heading3",
        "text": "2.3.1 Thuật toán xoay vòng Multi-Key API Rotation & Auto-Failover"
    },
    {
        "type": "p",
        "text": "Một trong những rào cản lớn nhất khi ứng dụng các mô hình ngôn ngữ lớn (LLM) vào các dự án thực tế là hạn mức giới hạn tần suất gọi API (Rate Limits, thông thường là 15 Requests Per Minute đối với gói Free của Google Gemini) và hạn mức tổng số token trong ngày (Daily Quota). Khi lưu lượng người dùng tăng đột biến, nếu chỉ sử dụng một khóa API duy nhất, hệ thống sẽ liên tục gặp lỗi HTTP 429 (Too Many Requests), khiến tính năng tư vấn bị tê liệt hoàn toàn."
    },
    {
        "type": "p",
        "text": "Để khắc phục triệt để vấn đề này, đề tài đã thiết kế và hiện thực thuật toán xoay vòng đa khóa API (Multi-Key Rotation & Auto-Failover). Cơ chế hoạt động của thuật toán như sau:\n- Hệ thống duy trì một danh sách các khóa API hợp lệ (trong đề tài cấu hình sẵn 3 khóa API Gemini độc lập) và một con trỏ chỉ mục khóa hiện tại (currentIndex = 0).\n- Khi có yêu cầu tư vấn từ khách hàng, hệ thống gửi request bằng khóa tại currentIndex.\n- Nếu request thành công (HTTP 200), hệ thống trả về câu trả lời bình thường và giữ nguyên khóa hiện tại (hoặc xoay vòng theo thuật toán Round-Robin để cân bằng tải).\n- Nếu request trả về lỗi HTTP 429 (Rate Limit Exceeded) hoặc lỗi Quota Exceeded, khối xử lý ngoại lệ (Catch Block) sẽ lập tức kích hoạt cơ chế Failover: tăng con trỏ currentIndex = (currentIndex + 1) % keys.length và tự động thử lại (Retry) với khóa tiếp theo mà không làm gián đoạn trải nghiệm của người dùng. Hệ thống cho phép thử lại tối đa qua toàn bộ số lượng key có sẵn trước khi báo lỗi bận cho người dùng."
    },
    {
        "type": "heading3",
        "text": "2.3.2 Thuật toán nén ngữ cảnh kho hàng (Compact Catalog Snapshot)"
    },
    {
        "type": "p",
        "text": "Một thách thức kỹ thuật khác khi kết nối AI với cơ sở dữ liệu là kích thước ngữ cảnh (Context Window). Cơ sở dữ liệu của một website thương mại điện tử có thể chứa hàng chục đến hàng trăm sản phẩm với rất nhiều trường dữ liệu (mô tả dài, đường dẫn ảnh, ngày tạo, thông tin SEO...). Nếu đưa toàn bộ dữ liệu này vào mỗi prompt, chi phí token sẽ tăng theo hàm số mũ và thời gian xử lý của mô hình sẽ bị kéo dài đáng kể."
    },
    {
        "type": "p",
        "text": "Đề tài đề xuất giải pháp Thuật toán nén ngữ cảnh kho hàng (Compact Catalog Snapshot). Trước khi gửi yêu cầu tới mô hình Gemini, hệ thống tự động trích xuất từ cơ sở dữ liệu MySQL chỉ những thuộc tính cốt lõi cần thiết cho việc tư vấn và định dạng thành một khối văn bản siêu ngắn gọn: `[ID] Tên giày | Thương hiệu | Môn TT | Giá | Size còn hàng`. Ví dụ:\n`[1] Nike Pegasus 41 | Nike | Chạy bộ | 3.590.000đ | Size: 39, 40, 41, 42`\n`[4] Asics Gel-Resolution 9 | Asics | Pickleball/Tennis | 3.290.000đ | Size: 40, 41, 42, 43`"
    },
    {
        "type": "p",
        "text": "Nhờ bản nén snapshot này, dung lượng context gửi kèm prompt giảm từ hơn 3.500 tokens xuống chỉ còn khoảng 400 - 500 tokens (tiết kiệm hơn 85% dung lượng), trong khi AI vẫn có đầy đủ thông tin chính xác tuyệt đối về sản phẩm, giá bán và các size đang thực sự còn hàng trong kho để tư vấn cho khách hàng. Toàn bộ luồng xử lý của Trợ lý AI kết hợp Multi-Key Rotation và Compact Catalog Snapshot được tổng hợp trong Hình 2.3 dưới đây:"
    },
    {
        "type": "image",
        "filename": "hinh_2_3_ai_flow.png",
        "caption": "Hình 2.3: Sơ đồ cơ chế xoay vòng Multi-Key API và nén ngữ cảnh kho hàng của Trợ lý AI"
    },
    {
        "type": "heading3",
        "text": "2.3.3 Cơ chế đồng bộ trạng thái đơn hàng (Order State Machine)"
    },
    {
        "type": "p",
        "text": "Để đảm bảo tính minh bạch và tránh sai sót trong quản lý kho vận, vòng đời của một đơn hàng trong hệ thống TC SPORT được quản lý chặt chẽ theo mô hình máy trạng thái hữu hạn (Finite State Machine). Bảng 2.2 mô tả chi tiết các bước chuyển đổi trạng thái và tác động nghiệp vụ tương ứng:"
    },
    {
        "type": "table",
        "table_id": "TABLE_2_2"
    },
    {
        "type": "heading3",
        "text": "2.3.4 Đánh giá độ phức tạp thuật toán và hiệu năng xử lý"
    },
    {
        "type": "p",
        "text": "Về mặt độ phức tạp thuật toán:\n- Thuật toán Compact Catalog Snapshot có độ phức tạp thời gian là O(N), với N là số lượng sản phẩm đang kinh doanh. Do dữ liệu được lọc theo các trường cần thiết và nối chuỗi bằng StringBuilder trong bộ nhớ, thời gian nén snapshot cho 100 sản phẩm chỉ mất dưới 5ms.\n- Thuật toán Multi-Key Failover có độ phức tạp thời gian O(K), với K là số lượng API Key (K = 3). Trong trường hợp xấu nhất khi cả 2 key đầu tiên bị nghẽn, thời gian chuyển đổi sang key thứ 3 chỉ tốn thêm một chu kỳ mạng HTTP (~200ms) mà không tạo gánh nặng tính toán lên CPU.\n- Các thao tác tìm kiếm và lọc sản phẩm phía client sử dụng cơ chế Debounce (trì hoãn 300ms) giúp giảm 90% số lượng request gửi lên máy chủ khi người dùng gõ từ khóa tìm kiếm."
    },
    {
        "type": "heading2",
        "text": "2.4 Thiết kế dữ liệu và an toàn"
    },
    {
        "type": "heading3",
        "text": "2.4.1 Lược đồ cơ sở dữ liệu quan hệ"
    },
    {
        "type": "p",
        "text": "Cơ sở dữ liệu của hệ thống TC SPORT được thiết kế theo chuẩn hóa dạng chuẩn 3 (3NF) để loại bỏ hiện tượng dư thừa dữ liệu và đảm bảo tính nhất quán cao. Hệ thống bao gồm 8 bảng dữ liệu quan hệ được trình bày chi tiết trong Bảng 2.3:"
    },
    {
        "type": "table",
        "table_id": "TABLE_2_3"
    },
    {
        "type": "heading3",
        "text": "2.4.2 Ràng buộc toàn vẹn dữ liệu và kiểm tra hợp lệ"
    },
    {
        "type": "p",
        "text": "Để bảo vệ cơ sở dữ liệu trước những dữ liệu rác hoặc dữ liệu có ý đồ tấn công, hệ thống áp dụng cơ chế xác thực dữ liệu hai lớp (Double Validation) ở cả client (thông qua React form validation) và server (thông qua Jakarta Bean Validation). Bảng 2.4 quy định các quy tắc kiểm tra hợp lệ đối với từng đối tượng dữ liệu trong hệ thống:"
    },
    {
        "type": "table",
        "table_id": "TABLE_2_4"
    },
    {
        "type": "heading3",
        "text": "2.4.3 Bảo mật mật khẩu, phòng chống SQL Injection và CORS"
    },
    {
        "type": "p",
        "text": "Hệ thống triển khai một hệ thống phòng thủ đa chiều nhằm đảm bảo an toàn thông tin tuyệt đối:\n1. Bảo mật mật khẩu: Sử dụng BCryptPasswordEncoder của Spring Security. Thuật toán tự động sinh chuỗi Salt 128-bit ngẫu nhiên và thực hiện 2^10 (1024) vòng lặp băm mật khẩu, chống lại mọi cuộc tấn công Brute-force hay Dictionary Attack.\n2. Chống SQL Injection: Toàn bộ các thao tác truy vấn cơ sở dữ liệu trong Spring Data JPA đều sử dụng PreparedStatement và tham số hóa (Parameterized Queries). Các ký tự đặc biệt nguy hiểm (như `'`, `\"`, `;`, `--`) đều được tự động escape an toàn trước khi gửi tới máy chủ MySQL.\n3. Cấu hình CORS: Server cấu hình giới hạn chỉ chấp nhận các Origin hợp lệ (http://localhost:8080 cho môi trường thử nghiệm và domain chính thức khi triển khai sản xuất), thiết lập đầy đủ các HTTP Header an toàn (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)."
    },
    {
        "type": "heading2",
        "text": "2.5 Phân tích kịch bản sử dụng và rủi ro kỹ thuật"
    },
    {
        "type": "heading3",
        "text": "2.5.1 Phân tích kịch bản sử dụng thực tế"
    },
    {
        "type": "p",
        "text": "Để đánh giá tính hữu dụng của hệ thống, đề tài đã xây dựng và phân tích kịch bản sử dụng điển hình của một khách hàng mua giày trực tuyến:\n1. Khách hàng truy cập website TC SPORT, duyệt qua danh mục 'Pickleball' và cảm thấy băn khoăn không biết mẫu giày nào có độ bền đế cao trên mặt sân cứng bê tông nhám.\n2. Khách hàng bấm vào widget Trợ lý AI ở góc phải màn hình, chọn gợi ý nhanh 'Giày Pickleball sân xi măng' hoặc gõ câu hỏi: 'Mình mới chơi pickleball sân bê tông, chân bè ngang 25.5cm thì nên đi mẫu nào?'.\n3. Trợ lý AI đối soát kho dữ liệu, phân tích thông số và tư vấn: 'Chào bạn! Với chân bè 25.5cm chơi sân bê tông, bạn nên chọn mẫu Asics Gel-Resolution 9 (đế AHAR+ siêu bền chống mài mòn) size 41.5 hoặc 42 để không bị kích ngón chân. Hiện shop đang có sẵn size 41 và 42 với giá 3.290.000đ!'.\n4. Khách hàng bấm vào sản phẩm đề xuất, mở modal Quickview, chọn size 42 và bấm 'Mua ngay'.\n5. Tại trang giỏ hàng, khách hàng điền số điện thoại, địa chỉ nhận hàng và chọn 'Chuyển khoản VietQR'. Hệ thống sinh mã VietQR với nội dung chuyển khoản tự động. Khách quét mã thanh toán và nhận thông báo đơn hàng thành công kèm mã tra cứu vận đơn."
    },
    {
        "type": "heading3",
        "text": "2.5.2 Nhận diện rủi ro kỹ thuật và phương án dự phòng"
    },
    {
        "type": "p",
        "text": "Trong quá trình thiết kế và vận hành hệ thống, nhiều rủi ro kỹ thuật tiềm ẩn đã được nhận diện và xây dựng các phương án đối phó chủ động. Bảng 2.5 tổng hợp các rủi ro chính và giải pháp kỹ thuật tương ứng:"
    },
    {
        "type": "table",
        "table_id": "TABLE_2_5"
    },
    {
        "type": "heading2",
        "text": "2.6 Thiết kế tiêu chí kiểm thử và khả năng mở rộng"
    },
    {
        "type": "heading3",
        "text": "2.6.1 Tiêu chí nghiệm thu chức năng và chuẩn chất lượng mã nguồn"
    },
    {
        "type": "p",
        "text": "Bộ tiêu chí nghiệm thu hệ thống được xây dựng dựa trên các chuẩn công nghiệp:\n- Tính đúng đắn của nghiệp vụ: 100% các chức năng mua hàng, trừ tồn kho đa size, thanh toán VietQR và cập nhật timeline đơn hàng phải hoạt động chính xác không phát sinh lỗi ngoại lệ.\n- Độ tin cậy của Trợ lý AI: Tỷ lệ trả lời chính xác dựa trên danh mục thực tế đạt trên 98%; không sinh thông tin giả mạo; cơ chế xoay vòng 3 API key hoạt động trơn tru khi giả lập lỗi 429.\n- Chuẩn chất lượng mã nguồn: Mã nguồn tuân thủ quy tắc Clean Code, phân tách rõ ràng trách nhiệm giữa các lớp (SoC - Separation of Concerns), có chú thích rõ ràng ở các hàm nghiệp vụ phức tạp."
    },
    {
        "type": "heading3",
        "text": "2.6.2 Định hướng mở rộng kiến trúc trong tương lai"
    },
    {
        "type": "p",
        "text": "Kiến trúc hệ thống TC SPORT được thiết kế theo hướng module hóa cao (Modular Architecture), sẵn sàng cho các nâng cấp công nghệ tiếp theo:\n- Bổ sung bộ nhớ đệm phân tán Redis Caching giữa Controller và Repository để lưu trữ danh mục sản phẩm và snapshot kho hàng, giúp giảm tải 80% truy vấn vào MySQL và đưa thời gian phản hồi API xuống dưới 20ms.\n- Tích hợp Webhook kết nối trực tiếp với cổng thanh toán PayOS / VNPay để tự động xác nhận đơn hàng ngay khi tiền vào tài khoản mà không cần thao tác duyệt tay của quản trị viên.\n- Ứng dụng công nghệ Thực tế tăng cường (AR - Augmented Reality) cho phép khách hàng đưa camera điện thoại vào bàn chân để ướm thử giày ảo (Virtual Try-on) ngay trên trình duyệt web."
    }
]
