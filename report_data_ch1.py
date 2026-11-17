# -*- coding: utf-8 -*-
"""
report_data_ch1.py - Nội dung chi tiết Chương 1 cho Báo cáo thực tập tốt nghiệp TC SPORT
Sinh viên: Nguyễn Anh Tú - MSSV: 22810310121
Tuân thủ Phụ lục 11 về tiêu đề và phần dẫn nhập chương
"""

CH1_SECTIONS = [
    {
        "type": "heading1",
        "text": "CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI"
    },
    {
        "type": "p",
        "text": "Chương 1 trình bày tổng quan về bối cảnh chuyển đổi số trong ngành bán lẻ thời trang thể thao tại Việt Nam, phân tích các rào cản và thách thức cố hữu của mô hình thương mại điện tử truyền thống trong việc kinh doanh giày dép, từ đó làm rõ tính cấp thiết, bài toán đặt ra, mục tiêu nghiên cứu, phạm vi nghiệp vụ và phương pháp luận Agile/Scrum áp dụng trong quá trình xây dựng nền tảng TC SPORT tích hợp Trợ lý ảo AI thông minh."
    },
    {
        "type": "heading2",
        "text": "1.1 Bối cảnh và sự cần thiết"
    },
    {
        "type": "heading3",
        "text": "1.1.1 Thực trạng thương mại điện tử ngành giày thể thao"
    },
    {
        "type": "p",
        "text": "Trong kỷ nguyên số hóa và sự bùng nổ của thương mại điện tử (E-commerce) tại Việt Nam, thói quen tiêu dùng của người dân đã có sự dịch chuyển mạnh mẽ từ mua sắm trực tiếp tại các cửa hàng truyền thống sang các kênh mua sắm trực tuyến. Đặc biệt, phân khúc thời trang và thiết bị thể thao, trong đó giày thể thao (sneakers, running shoes, tennis, và môn thể thao mới nổi bật gần đây là pickleball) đang chứng kiến mức tăng trưởng vượt bậc về nhu cầu. Người tiêu dùng ngày nay không chỉ tìm kiếm một đôi giày để phục vụ nhu cầu đi lại cơ bản, mà còn quan tâm sâu sắc đến các yếu tố kỹ thuật như: công nghệ đệm khí (Air Zoom, Boost, Gel), độ bám mặt sân (herringbone outsole), khả năng hỗ trợ khớp cổ chân, chống lật sơ mi khi vận động cường độ cao và phom dáng giày phù hợp với đặc điểm bàn chân người châu Á (thường có xu hướng bè ngang ở phần mu bàn chân)."
    },
    {
        "type": "p",
        "text": "Tuy nhiên, việc kinh doanh và mua sắm giày thể thao trên môi trường trực tuyến hiện nay đang đối mặt với nhiều rào cản và thách thức cố hữu. Khác với các mặt hàng thời trang thông thường như áo quần hay phụ kiện, giày thể thao là dòng sản phẩm có tính cá nhân hóa rất cao về kích cỡ (size) và cảm giác mang. Mỗi thương hiệu thể thao lớn trên thế giới (như Nike, Adidas, Asics, Puma, Lacoste) đều áp dụng hệ thống quy chuẩn kích cỡ và phom giày (last) riêng biệt. Ví dụ, một người mang vừa vặn size 41 của Adidas có thể phải tăng lên size 42 khi chọn giày chạy bộ Nike do phần mũi giày ôm sát, hoặc cần chọn phiên bản Wide (bản rộng) đối với dòng giày chuyên dụng của Asics. Trên các sàn thương mại điện tử phổ biến hiện nay, thông tin sản phẩm thường được trình bày dạng văn bản tĩnh, thiếu sự tư vấn chuyên sâu, dẫn đến tỷ lệ đổi trả hàng do sai kích cỡ hoặc không phù hợp với mục đích sử dụng (như mang giày chạy bộ đường nhựa để chơi trên sân pickleball mặt nhám bê tông) lên tới 25% - 30%, gây tổn thất chi phí vận hành rất lớn cho doanh nghiệp và tạo trải nghiệm thất vọng cho khách hàng."
    },
    {
        "type": "p",
        "text": "Bên cạnh đó, quy trình thanh toán và xác nhận đơn hàng trên các website thương mại điện tử quy mô vừa và nhỏ tại Việt Nam vẫn còn nhiều điểm bất cập. Phương thức thanh toán khi nhận hàng (COD - Cash on Delivery) tuy quen thuộc nhưng tiềm ẩn rủi ro bùng hàng (tỷ lệ giao hàng không thành công cao), trong khi phương thức chuyển khoản ngân hàng truyền thống lại đòi hỏi người mua phải nhập thủ công số tài khoản, tên người thụ hưởng và số tiền, dễ phát sinh sai sót và làm kéo dài thời gian đối soát kế toán. Việc thiếu tích hợp giải pháp thanh toán quét mã QR chuẩn quốc gia (VietQR) tự động điền sẵn nội dung đơn hàng là một điểm nghẽn lớn cản trở tỷ lệ chuyển đổi đơn hàng của các website hiện tại."
    },
    {
        "type": "heading3",
        "text": "1.1.2 Tính cấp thiết và điểm mới của đề tài"
    },
    {
        "type": "p",
        "text": "Trước thực trạng trên, việc nghiên cứu và xây dựng một nền tảng thương mại điện tử chuyên biệt cho ngành giày thể thao, kết hợp sức mạnh của công nghệ Trí tuệ nhân tạo (AI) và các giải pháp thanh toán hiện đại là vô cùng cấp thiết. Hệ thống thương mại điện tử TC SPORT được ra đời nhằm giải quyết triệt để những bài toán thực tiễn nêu trên, mang lại giá trị thiết thực cho cả người tiêu dùng lẫn người quản trị hệ thống."
    },
    {
        "type": "p",
        "text": "Điểm mới nổi bật của đề tài nằm ở việc tích hợp trực tiếp Trợ lý ảo tư vấn thông minh ứng dụng mô hình ngôn ngữ lớn tiên tiến nhất của Google (Google Gemini Generative AI). Thay vì chỉ là những kịch bản trả lời mẫu (rule-based chatbot) cứng nhắc thường thấy, Trợ lý AI của TC SPORT đóng vai trò như một chuyên gia tư vấn giày thể thao thực thụ (Virtual Shoe Fitting Specialist). Chatbot có khả năng hiểu ngữ cảnh tự nhiên của khách hàng (ví dụ: 'Tôi muốn tìm giày chạy bộ êm chân dưới 3 triệu, chân hơi bè ngang thì nên chọn mẫu nào?'), tự động đối chiếu thông tin với dữ liệu kho hàng thực tế trong cơ sở dữ liệu MySQL và đưa ra lời khuyên chính xác về dòng giày, công nghệ đệm, cỡ giày đề xuất và tình trạng còn hàng theo thời gian thực."
    },
    {
        "type": "p",
        "text": "Hơn thế nữa, về mặt kỹ thuật, đề tài đã nghiên cứu và hiện thực thành công hai cơ chế độc đáo để giải quyết bài toán chi phí và độ tin cậy khi vận hành AI trong môi trường sản xuất: (1) Thuật toán xoay vòng đa khóa API (Multi-Key Rotation & Auto-Failover) sử dụng 3 khóa API Gemini dự phòng độc lập, tự động chuyển đổi khóa khi gặp sự cố chạm ngưỡng giới hạn (Rate Limit 429) hoặc hết quota, đảm bảo trải nghiệm khách hàng không bao giờ bị đứt quãng; (2) Thuật toán nén dữ liệu kho hàng (Compact Catalog Snapshot), trích xuất và tối ưu hóa thông tin sản phẩm cốt lõi thành bản tóm tắt siêu ngắn gọn để đưa vào ngữ cảnh (context window) của mô hình AI, giúp tiết kiệm hơn 85% chi phí token và rút ngắn thời gian sinh phản hồi xuống dưới 2 giây."
    },
    {
        "type": "p",
        "text": "Bên cạnh đó, đề tài xây dựng giải pháp thanh toán chuyển khoản VietQR tự động sinh mã động gắn liền với từng mã đơn hàng, tích hợp bảng tra cứu kích cỡ chuẩn quốc tế tương tác cao, và thiết kế hệ thống Dashboard quản trị trực quan giúp người quản trị nắm bắt mọi chỉ số kinh doanh then chốt chỉ trong vài thao tác chuột."
    },
    {
        "type": "heading2",
        "text": "1.2 Bài toán và mục tiêu"
    },
    {
        "type": "heading3",
        "text": "1.2.1 Phát biểu bài toán"
    },
    {
        "type": "p",
        "text": "Bài toán cốt lõi đặt ra cho đề tài là: 'Xây dựng một hệ thống website thương mại điện tử hoàn chỉnh, tin cậy và có hiệu năng cao phục vụ cho việc kinh doanh các dòng giày thể thao chính hãng, có khả năng quản lý tồn kho đa chiều theo từng kích cỡ độc lập, tích hợp trợ lý AI thông minh tư vấn phom giày dựa trên kho dữ liệu thực tế, và tự động hóa quy trình đặt hàng - thanh toán VietQR - vận đơn'."
    },
    {
        "type": "p",
        "text": "Cụ thể, hệ thống phải giải quyết đồng thời các bài toán con sau đây:\n1. Bài toán quản lý danh mục và tồn kho đa kích cỡ (Multi-Size Inventory): Một đôi giày không chỉ có một số lượng tồn duy nhất, mà số lượng này phải được phân bổ chính xác theo từng kích cỡ từ 38 đến 44. Việc đặt hàng hoặc hủy đơn hàng phải đảm bảo tính nguyên tử (Atomicity), không được phép xảy ra hiện tượng xung đột dữ liệu dẫn đến việc bán vượt quá số lượng giày thực tế trong kho.\n2. Bài toán tư vấn thông minh theo thời gian thực: Làm thế nào để mô hình AI nắm bắt được danh mục giày đang kinh doanh cùng tình trạng tồn kho tức thời mà không cần phải huấn luyện lại (fine-tune) mô hình tốn kém, đồng thời giữ cho chi phí gọi API ở mức tối thiểu và loại bỏ rủi ro chatbot trả lời sai thông tin thực tế (AI Hallucination).\n3. Bài toán trải nghiệm người dùng hiện đại: Giao diện phải đảm bảo tốc độ phản hồi nhanh chóng (dưới 1.2 giây), thao tác xem nhanh kích cỡ (Quickview), bảng hướng dẫn đo chân trực quan, giỏ hàng tự động cập nhật và quy trình thanh toán chuyển khoản VietQR nhanh chóng, tiện lợi."
    },
    {
        "type": "heading3",
        "text": "1.2.2 Mục tiêu tổng quát và cụ thể"
    },
    {
        "type": "p",
        "text": "Mục tiêu tổng quát của đề tài là làm chủ quy trình phát triển một sản phẩm phần mềm thương mại điện tử Full-Stack hoàn chỉnh, từ khâu khảo sát nghiệp vụ, phân tích yêu cầu, thiết kế kiến trúc hệ thống, xây dựng cơ sở dữ liệu quan hệ, lập trình backend RESTful API, xây dựng giao diện frontend Single Page Application (SPA), đến việc tích hợp các dịch vụ đám mây AI hiện đại và thực hiện quy trình kiểm thử toàn diện."
    },
    {
        "type": "p",
        "text": "Các mục tiêu kỹ thuật cụ thể bao gồm:\n- Về Backend: Xây dựng hệ thống dịch vụ RESTful API vững chắc trên nền tảng Java 17 và Spring Boot 3.2, áp dụng mô hình phân tầng chuẩn mực (Controller - Service - Repository), tích hợp bảo mật Spring Security với thuật toán mã hóa mật khẩu BCrypt, quản lý giao dịch nguyên tử @Transactional đảm bảo toàn vẹn dữ liệu theo chuẩn ACID trong MySQL 8.0.\n- Về Frontend: Xây dựng ứng dụng web đơn trang (SPA) bằng React 18 kết hợp Vite và Tailwind CSS, tối ưu hóa kích thước bundle và tốc độ tải trang, hiện thực hóa hệ thống giao diện công thái học với tông màu Be Vàng Sang thể thao, thân thiện với người dùng và tương thích 100% trên các thiết bị di động.\n- Về Trí tuệ nhân tạo (AI): Hiện thực thành công module Chatbot AI kết nối Google Gemini API với thuật toán xoay vòng 3 API Key (Failover), xây dựng pipeline tiền xử lý và nén dữ liệu sản phẩm để cung cấp context chuẩn xác cho mô hình.\n- Về Nghiệp vụ thanh toán: Triển khai cổng thanh toán tự động sinh mã VietQR theo chuẩn Napas, giúp khách hàng chỉ cần quét mã QR bằng ứng dụng ngân hàng di động là có thể hoàn tất thanh toán trong 10 giây mà không cần nhập liệu thủ công.\n- Về Quản trị hệ thống: Xây dựng phân hệ quản trị viên (Admin Portal) toàn diện với Dashboard thống kê doanh thu theo thời gian, quản lý danh mục sản phẩm đa size, quản lý quy trình đơn hàng 5 trạng thái kèm Timeline chi tiết và công cụ phân tích tài chính trực quan."
    },
    {
        "type": "heading2",
        "text": "1.3 Phạm vi và yêu cầu hệ thống"
    },
    {
        "type": "heading3",
        "text": "1.3.1 Các yêu cầu chức năng"
    },
    {
        "type": "p",
        "text": "Hệ thống TC SPORT được phân tách thành hai phân hệ người dùng chính: Phân hệ Khách hàng (Client/Customer) và Phân hệ Quản trị viên (Administrator). Các yêu cầu chức năng cụ thể được phân tích và tổng hợp chi tiết trong Bảng 1.1 dưới đây:"
    },
    {
        "type": "table",
        "table_id": "TABLE_1_1"
    },
    {
        "type": "heading3",
        "text": "1.3.2 Các yêu cầu phi chức năng"
    },
    {
        "type": "p",
        "text": "Bên cạnh các chức năng nghiệp vụ, hệ thống phải đáp ứng các tiêu chuẩn khắt khe về chất lượng kỹ thuật, hiệu năng và tính ổn định khi triển khai thực tế. Bảng 1.2 tổng hợp các yêu cầu phi chức năng của hệ thống:"
    },
    {
        "type": "table",
        "table_id": "TABLE_1_2"
    },
    {
        "type": "heading3",
        "text": "1.3.3 Các giới hạn cần xác định"
    },
    {
        "type": "p",
        "text": "Trong khuôn khổ đồ án thực tập tốt nghiệp và điều kiện thử nghiệm thực tế, hệ thống xác định một số giới hạn phạm vi như sau:\n1. Phạm vi thanh toán: Hệ thống tích hợp cổng thanh toán VietQR thông qua việc sinh mã QR chuyển khoản ngân hàng tự động kèm nội dung đơn hàng. Việc xác nhận tiền về tài khoản ngân hàng được thực hiện theo cơ chế đối soát của quản trị viên (hoặc thông qua webhook của các cổng trung gian ở giai đoạn nâng cấp tiếp theo) chứ chưa kết nối trực tiếp với cổng thanh toán thẻ quốc tế Visa/Mastercard (do yêu cầu về tư cách pháp nhân doanh nghiệp).\n2. Giới hạn hạn mức API AI: Chatbot AI sử dụng gói dịch vụ Google Gemini API với cơ chế xoay vòng 3 API Key miễn phí (Free Tier). Mặc dù cơ chế Failover giúp tăng gấp 3 lần số lượng request tối đa (đạt 45 requests/phút), hệ thống vẫn cần áp dụng cơ chế giới hạn tần suất gửi tin nhắn từ phía client để phòng ngừa các hành vi cố tình spam hoặc tấn công từ chối dịch vụ (DoS).\n3. Dữ liệu thử nghiệm: Dữ liệu sản phẩm và bài viết trên website được xây dựng dựa trên thông tin thực tế của các dòng giày thể thao nổi tiếng từ các hãng Nike, Adidas, Asics, Lacoste, Puma để phục vụ công tác kiểm thử và đánh giá trải nghiệm thực tế."
    },
    {
        "type": "heading2",
        "text": "1.4 Phương pháp thực hiện"
    },
    {
        "type": "heading3",
        "text": "1.4.1 Quy trình phát triển phần mềm theo mô hình Agile/Scrum"
    },
    {
        "type": "p",
        "text": "Để đảm bảo tiến độ thực hiện đề tài và khả năng thích ứng linh hoạt với các yêu cầu kỹ thuật mới phát sinh, quy trình phát triển hệ thống được tổ chức theo phương pháp luận Agile, áp dụng khung làm việc Scrum với chu kỳ lặp (Sprint) kéo dài 2 tuần cho mỗi giai đoạn. Việc áp dụng mô hình Scrum mang lại các lợi ích vượt trội:\n- Chia nhỏ khối lượng công việc phức tạp thành các phân đoạn nhỏ có thể quản lý và kiểm soát chất lượng chặt chẽ.\n- Cho phép kiểm thử liên tục (Continuous Testing) và thu thập phản hồi ngay sau khi hoàn thành từng tính năng, từ đó kịp thời tinh chỉnh giao diện và tối ưu hóa các câu truy vấn cơ sở dữ liệu.\n- Dễ dàng tích hợp và mở rộng thêm các tính năng nâng cao (như bổ sung module Trợ lý AI và thanh toán VietQR) mà không làm phá vỡ cấu trúc của các module đã hoàn thiện trước đó."
    },
    {
        "type": "heading3",
        "text": "1.4.2 Kế hoạch phân chia các Sprint thực hiện"
    },
    {
        "type": "p",
        "text": "Quá trình thực hiện đề tài được phân bổ thành 4 Sprint chính trong thời gian thực tập:\n- Sprint 1 (Tuần 1 - Tuần 2): Khảo sát thực tế, xác định yêu cầu nghiệp vụ, thiết kế mô hình thực thể quan hệ (ERD) với 8 bảng dữ liệu trong MySQL. Cài đặt khung dự án backend Spring Boot 3 và frontend React 18 / Vite. Hoàn thiện các API xác thực người dùng (Auth), mã hóa mật khẩu BCrypt và phân quyền cơ bản.\n- Sprint 2 (Tuần 3 - Tuần 4): Hiện thực module Quản lý danh mục, Thương hiệu và Sản phẩm đa kích cỡ (Multi-Size Inventory). Xây dựng giao diện Trang chủ, bộ lọc danh mục và popup xem nhanh (Quickview) với khả năng chọn size và kiểm tra tồn kho tức thời.\n- Sprint 3 (Tuần 5 - Tuần 6): Xây dựng module Giỏ hàng, Đặt hàng và xử lý giao dịch ACID trừ tồn kho. Tích hợp giải pháp thanh toán quét mã VietQR tự động. Xây dựng phân hệ Quản trị viên Dashboard, quản lý đơn hàng kèm Timeline và báo cáo doanh thu theo mốc thời gian.\n- Sprint 4 (Tuần 7 - Tuần 8): Nghiên cứu và tích hợp mô hình Google Gemini AI, thiết kế thuật toán xoay vòng 3 API Key (Multi-Key Failover) và nén ngữ cảnh kho hàng (Compact Catalog Snapshot). Tối ưu hóa giao diện người dùng, bổ sung chuyên mục Blog tin tức, tiến hành kiểm thử toàn diện trên 15 Test Cases và hoàn thiện tài liệu báo cáo thực tập."
    }
]
