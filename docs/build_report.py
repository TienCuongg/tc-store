# -*- coding: utf-8 -*-
"""
build_report.py - Tạo mới và hoàn thiện Báo cáo thực tập tốt nghiệp TC SPORT
Tuân thủ tuyệt đối quy định và hướng dẫn trình bày đồ án của Trường Đại học Điện lực (EPU):
- Phụ lục 1: Mẫu bìa báo cáo khổ A4 (Times New Roman 18 bold cho tên báo cáo, 18-20 bold cho tên đề tài, bảng thông tin người thực hiện, ngày tháng).
- Phụ lục 5: Mục lục (TimeNewRoman 14 bold, Before: 0, After: 6, Line spacing: 1.2).
- Phụ lục 6: Danh mục từ viết tắt (Bảng 3 cột: Ký hiệu viết tắt, Thuật ngữ tiếng Anh, Ý nghĩa tiếng Việt).
- Phụ lục 7: Danh mục hình ảnh (TimeNewRoman 14 bold, Before: 0, After: 6, Line spacing: 1.2).
- Phụ lục 8: Danh mục bảng biểu (TimeNewRoman 14 bold, Before: 0, After: 6, Line spacing: 1.2).
- Phụ lục 9: Lời cảm ơn (TimeNewRoman 14 bold, Before: 0, After: 6, Line spacing: 1.2, First line indent: 1cm).
- Phụ lục 10: Lời nói đầu (TimeNewRoman 14 bold, Before: 0, After: 6, Line spacing: 1.2, First line indent: 1cm).
- Phụ lục 11: Nội dung chương (Title Heading 1: TimeNewRoman 14 bold Center, Phần dẫn nhập thụt đầu dòng 1cm, các tiểu mục 1.1, 1.1.1 TimeNewRoman 14/13 bold, đoạn văn TimeNewRoman 14, Before: 0, After: 6, Line spacing: 1.2, First line indent: 1cm, Justify).
- Phụ lục 12: Kết luận (TimeNewRoman 14 bold, Before: 0, After: 6, Line spacing: 1.2, First line indent: 1cm, Justify).
- Phụ lục 13: Tài liệu tham khảo (TimeNewRoman 14 bold, Before: 0, After: 6, Line spacing: 1.2, cấu trúc chuẩn IEEE/Quy định EPU).

Sinh viên: Nguyễn Anh Tú - MSSV: 22810310121 - GVHD: ThS. Trần Văn Hải
"""

import os
import docx
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

from report_data_tables import (
    TABLE_ABBREVIATIONS,
    TABLE_1_1, TABLE_1_2, TABLE_2_1, TABLE_2_2, TABLE_2_3,
    TABLE_2_4, TABLE_2_5, TABLE_3_1, TABLE_3_2, TABLE_3_3,
    TABLE_3_4, TABLE_3_5, TABLE_3_6, TABLE_3_7
)
from report_data_ch1 import CH1_SECTIONS
from report_data_ch2 import CH2_SECTIONS
from report_data_ch3 import CH3_SECTIONS

TABLES_MAP = {
    "TABLE_1_1": TABLE_1_1,
    "TABLE_1_2": TABLE_1_2,
    "TABLE_2_1": TABLE_2_1,
    "TABLE_2_2": TABLE_2_2,
    "TABLE_2_3": TABLE_2_3,
    "TABLE_2_4": TABLE_2_4,
    "TABLE_2_5": TABLE_2_5,
    "TABLE_3_1": TABLE_3_1,
    "TABLE_3_2": TABLE_3_2,
    "TABLE_3_3": TABLE_3_3,
    "TABLE_3_4": TABLE_3_4,
    "TABLE_3_5": TABLE_3_5,
    "TABLE_3_6": TABLE_3_6,
    "TABLE_3_7": TABLE_3_7,
}

BASE_DOC = "Nguyễn Anh Tú-22810310121_BACKUP_GOC.docx"
OUT_DOC = "Nguyễn Anh Tú-22810310121.docx"
IMAGES_DIR = "report_images"

# Exact standard indentation: 1cm = 0.3937 inches = 28.35 pt
INDENT_1CM = Inches(0.3937)

def format_run(run, font_name="Times New Roman", size_pt=14, bold=False, italic=False, color=None):
    run.font.name = font_name
    run.font.size = Pt(size_pt)
    run.font.bold = bold
    run.font.italic = italic
    if color:
        run.font.color.rgb = color
    # Ensure EastAsia / complex script compatibility
    rPr = run._r.get_or_add_rPr()
    rFonts = rPr.find(qn('w:rFonts'))
    if rFonts is not None:
        rFonts.set(qn('w:hAnsi'), font_name)
        rFonts.set(qn('w:ascii'), font_name)
        rFonts.set(qn('w:cs'), font_name)

def style_table(table, header_bg="EAEAEA"):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    # Set borders
    tblPr = table._tbl.tblPr
    tblBorders = parse_xml(f'''
        <w:tblBorders {nsdecls("w")}>
            <w:top w:val="single" w:sz="6" w:space="0" w:color="888888"/>
            <w:left w:val="none"/>
            <w:bottom w:val="single" w:sz="6" w:space="0" w:color="888888"/>
            <w:right w:val="none"/>
            <w:insideH w:val="single" w:sz="4" w:space="0" w:color="E0E0E0"/>
            <w:insideV w:val="none"/>
        </w:tblBorders>
    ''')
    tblPr.append(tblBorders)

    for r_idx, row in enumerate(table.rows):
        trPr = row._tr.get_or_add_trPr()
        trPr.append(parse_xml(f'<w:cantSplit {nsdecls("w")}/>'))
        if r_idx == 0:
            trPr.append(parse_xml(f'<w:tblHeader {nsdecls("w")}/>'))

        for c_idx, cell in enumerate(row.cells):
            tcPr = cell._tc.get_or_add_tcPr()
            tcMar = parse_xml(f'''
                <w:tcMar {nsdecls("w")}>
                    <w:top w:w="120" w:type="dxa"/>
                    <w:bottom w:w="120" w:type="dxa"/>
                    <w:left w:w="160" w:type="dxa"/>
                    <w:right w:w="160" w:type="dxa"/>
                </w:tcMar>
            ''')
            tcPr.append(tcMar)

            if r_idx == 0:
                shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{header_bg}"/>')
                tcPr.append(shading)
                for p in cell.paragraphs:
                    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                    pf = p.paragraph_format
                    pf.space_before = Pt(4)
                    pf.space_after = Pt(4)
                    pf.line_spacing = 1.15
                    pf.first_line_indent = Pt(0)
                    for r in p.runs:
                        format_run(r, size_pt=12, bold=True)
            else:
                for p in cell.paragraphs:
                    p.alignment = WD_ALIGN_PARAGRAPH.LEFT if c_idx > 0 else WD_ALIGN_PARAGRAPH.CENTER
                    pf = p.paragraph_format
                    pf.space_before = Pt(3)
                    pf.space_after = Pt(3)
                    pf.line_spacing = 1.15
                    pf.first_line_indent = Pt(0)
                    for r in p.runs:
                        format_run(r, size_pt=11.5, bold=False)

def update_frontmatter(doc):
    print("Updating front-matter paragraphs and tables...")
    body = doc._body._element

    # 1. Phụ lục 1: Mẫu bìa báo cáo khổ A4
    # P[9]: "BÁO CÁO THỰC TẬP TỐT NGHIỆP" -> Chữ hoa TimeNewRoman 18, bold
    p9 = doc.paragraphs[9]
    p9.text = "BÁO CÁO THỰC TẬP TỐT NGHIỆP"
    p9.alignment = WD_ALIGN_PARAGRAPH.CENTER
    if p9.runs:
        format_run(p9.runs[0], size_pt=18, bold=True)

    # P[11]: "ĐỀ TÀI:" -> Chữ hoa TimeNewRoman 18, bold
    p11 = doc.paragraphs[11]
    p11.text = "ĐỀ TÀI:"
    p11.alignment = WD_ALIGN_PARAGRAPH.CENTER
    if p11.runs:
        format_run(p11.runs[0], size_pt=18, bold=True)

    # P[12]: Tên đề tài -> Chữ hoa TimeNewRoman 18, bold
    p12 = doc.paragraphs[12]
    p12.text = "XÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ BÁN GIÀY THỂ THAO TC SPORT TÍCH HỢP TRỢ LÝ AI TƯ VẤN SẢN PHẨM"
    p12.alignment = WD_ALIGN_PARAGRAPH.CENTER
    if p12.runs:
        format_run(p12.runs[0], size_pt=18, bold=True)

    # Table 0: Cover student & supervisor info table (Phụ lục 1)
    if len(doc.tables) > 0:
        t0 = doc.tables[0]
        cover_info = [
            ("Giảng viên hướng dẫn", ": ThS. TRẦN VĂN HẢI"),
            ("Sinh viên thực hiện", ": NGUYỄN ANH TÚ"),
            ("Mã sinh viên", ": 22810310121"),
            ("Ngành", ": CÔNG NGHỆ THÔNG TIN"),
            ("Chuyên ngành", ": CÔNG NGHỆ PHẦN MỀM"),
            ("Lớp", ": D17CNPM"),
            ("Khóa", ": 2022 - 2026")
        ]
        while len(t0.rows) < len(cover_info):
            t0.add_row()

        # Remove borders
        tblPr = t0._tbl.tblPr
        tblBorders = parse_xml(f'''
            <w:tblBorders {nsdecls("w")}>
                <w:top w:val="none"/>
                <w:left w:val="none"/>
                <w:bottom w:val="none"/>
                <w:right w:val="none"/>
                <w:insideH w:val="none"/>
                <w:insideV w:val="none"/>
            </w:tblBorders>
        ''')
        tblPr.append(tblBorders)
        t0.alignment = WD_TABLE_ALIGNMENT.CENTER

        for r_idx, (k, v) in enumerate(cover_info):
            row = t0.rows[r_idx]
            c0, c1 = row.cells[0], row.cells[1]
            c0.text = k
            c1.text = v
            for cell, is_val in [(c0, False), (c1, True)]:
                p = cell.paragraphs[0]
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
                pf = p.paragraph_format
                pf.space_before = Pt(2)
                pf.space_after = Pt(2)
                pf.line_spacing = 1.2
                pf.first_line_indent = Pt(0)
                if p.runs:
                    format_run(p.runs[0], size_pt=13, bold=is_val)

    # Date and place: P[15]
    p15 = doc.paragraphs[15]
    p15.text = "HÀ NỘI, THÁNG 11 NĂM 2026"
    p15.alignment = WD_ALIGN_PARAGRAPH.CENTER
    if p15.runs:
        format_run(p15.runs[0], size_pt=14, bold=True)

    # 2. Đề cương thực tập tốt nghiệp:
    # P[18]: 1. Tên đề tài
    p18 = doc.paragraphs[18]
    p18.text = "1. Tên đề tài: Xây dựng website thương mại điện tử bán giày thể thao TC SPORT tích hợp Trợ lý AI tư vấn sản phẩm"
    p18.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    if p18.runs:
        format_run(p18.runs[0], size_pt=13, bold=False)

    # P[28]: 4. Mô tả tóm tắt đề tài
    p28 = doc.paragraphs[28]
    p28.text = (
        "TC SPORT là hệ thống thương mại điện tử chuyên nghiệp cung cấp giày thể thao chính hãng "
        "(Nike, Adidas, Asics, Lacoste, Puma, giày chuyên dụng Pickleball, chạy bộ) kết hợp công nghệ "
        "Trợ lý ảo thông minh Google Gemini AI. Hệ thống được phát triển trên kiến trúc hiện đại Spring Boot 3 "
        "kết hợp React 18, hỗ trợ quản lý sản phẩm đa kích cỡ (multi-size inventory), giỏ hàng thời gian thực, "
        "đặt hàng và tạo mã VietQR tự động, tra cứu vận đơn, đồng thời cung cấp giao diện quản trị phân tích doanh thu trực quan. "
        "Điểm nhấn nổi bật là chatbot AI tích hợp cơ chế xoay vòng 3 API Key (Multi-Key Rotation & Auto-Failover) "
        "và nén dữ liệu kho hàng (Compact Catalog Snapshot), giúp tư vấn chuẩn phom giày, đệm êm, mặt sân và mức giá "
        "mà không làm tràn hạn mức API."
    )
    p28.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    if p28.runs:
        format_run(p28.runs[0], size_pt=13, bold=False)

    # Outline Chapter titles: P[30] to P[48]
    outline_map = {
        30: "CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI",
        31: "1.1 Bối cảnh và sự cần thiết",
        32: "1.2 Bài toán và mục tiêu",
        33: "1.3 Phạm vi và yêu cầu hệ thống",
        34: "1.4 Phương pháp thực hiện",
        35: "CHƯƠNG 2: CÔNG NGHỆ VÀ THIẾT KẾ HỆ THỐNG",
        36: "2.1 Cơ sở công nghệ",
        37: "2.2 Kiến trúc phần mềm và module",
        38: "2.3 Các thuật toán và cơ chế điều phối",
        39: "2.4 Thiết kế dữ liệu và an toàn",
        40: "2.5 Phân tích kịch bản sử dụng và rủi ro kỹ thuật",
        41: "2.6 Thiết kế tiêu chí kiểm thử và khả năng mở rộng",
        43: "CHƯƠNG 3: XÂY DỰNG VÀ ĐÁNH GIÁ HỆ THỐNG",
        44: "3.1 Môi trường và cấu trúc triển khai",
        45: "3.2 Triển khai các module cốt lõi",
        46: "3.3 Thiết kế và hiện thực giao diện người dùng",
        47: "3.4 Kiểm thử và đánh giá",
        48: "3.5 Nhận xét và hướng hoàn thiện",
    }
    for p_idx, text_val in outline_map.items():
        if p_idx < len(doc.paragraphs):
            p = doc.paragraphs[p_idx]
            p.text = text_val
            p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            if p.runs:
                format_run(p.runs[0], size_pt=13, bold=("CHƯƠNG" in text_val))

    # 3. Phụ lục 6: Thêm Danh mục từ viết tắt vào giữa Mục lục và Danh mục hình ảnh
    # Tìm vị trí MỤC LỤC trong body
    idx_ml = None
    for idx, child in enumerate(body):
        texts = [node.text for node in child.iter() if node.text]
        if 'MỤC LỤC' in ' '.join(texts):
            idx_ml = idx
            break

    if idx_ml is not None:
        idx_target = idx_ml + 2
        p_abbrev = docx.text.paragraph.Paragraph(body[idx_target], doc)
        p_abbrev.text = "DANH MỤC TỪ VIẾT TẮT"
        p_abbrev.alignment = WD_ALIGN_PARAGRAPH.CENTER
        pf_ab = p_abbrev.paragraph_format
        pf_ab.space_before = Pt(12)
        pf_ab.space_after = Pt(6)
        pf_ab.line_spacing = 1.2
        pf_ab.first_line_indent = Pt(0)
        if p_abbrev.runs:
            format_run(p_abbrev.runs[0], size_pt=14, bold=True)

        # Create abbreviations table
        tbl_ab = doc.add_table(rows=len(TABLE_ABBREVIATIONS["rows"]) + 1, cols=3)
        for col_idx, htext in enumerate(TABLE_ABBREVIATIONS["headers"]):
            tbl_ab.cell(0, col_idx).text = htext
        for row_idx, rvals in enumerate(TABLE_ABBREVIATIONS["rows"]):
            for col_idx, val in enumerate(rvals):
                tbl_ab.cell(row_idx + 1, col_idx).text = val
        style_table(tbl_ab)
        # Move table right after p_abbrev
        body[idx_target].addnext(tbl_ab._tbl)

    # 4. Phụ lục 9: Lời cảm ơn (P[121] to P[125])
    p121 = doc.paragraphs[121]
    p121.text = "LỜI CẢM ƠN"
    p121.alignment = WD_ALIGN_PARAGRAPH.CENTER
    pf121 = p121.paragraph_format
    pf121.space_before = Pt(12)
    pf121.space_after = Pt(6)
    pf121.line_spacing = 1.2
    pf121.first_line_indent = Pt(0)
    if p121.runs:
        format_run(p121.runs[0], size_pt=14, bold=True)

    cam_on_texts = [
        "Trong thời gian học tập tại Trường Đại học Điện lực và thực hiện đề tài tốt nghiệp “Xây dựng website thương mại điện tử bán giày thể thao TC SPORT tích hợp Trợ lý AI tư vấn sản phẩm”, em đã có cơ hội vận dụng sâu sắc các kiến thức chuyên ngành về lập trình Full-Stack (Java Spring Boot 3, React 18, Vite), thiết kế cơ sở dữ liệu quan hệ MySQL và tích hợp các mô hình ngôn ngữ lớn (Google Gemini AI) vào một bài toán thực tiễn. Việc trực tiếp nghiên cứu, xây dựng và kiểm thử từng module chức năng đã giúp em hiểu rõ toàn diện quy trình phát triển một giải pháp phần mềm thương mại điện tử chất lượng cao.",
        "Em xin chân thành cảm ơn ThS. Trần Văn Hải, giảng viên hướng dẫn, cùng các thầy cô Khoa Điện toán và Công nghệ số Năng lượng, Trường Đại học Điện lực đã tận tình trang bị cho em nền tảng kiến thức chuyên môn vững vàng, phương pháp tư duy khoa học và luôn định hướng, chỉ dẫn quý báu trong suốt quá trình thực hiện đề tài.",
        "Em cũng xin bày tỏ lòng biết ơn sâu sắc tới gia đình và bạn bè đã luôn động viên, tạo mọi điều kiện thuận lợi và hỗ trợ nhiệt tình để em hoàn thành tốt khóa học và sản phẩm đồ án này. Đây là trải nghiệm vô cùng quý giá giúp em rèn luyện tính chủ động, khả năng tự nghiên cứu công nghệ mới và kỹ năng giải quyết các thách thức kỹ thuật phức tạp.",
        "Mặc dù đã rất nỗ lực, song do giới hạn về thời gian và điều kiện thử nghiệm, sản phẩm và báo cáo khó tránh khỏi những thiếu sót nhất định. Em kính mong nhận được những ý kiến đóng góp, chỉ bảo quý báu của các thầy cô trong hội đồng để đề tài ngày càng được hoàn thiện hơn."
    ]
    for idx_co, txt in enumerate(cam_on_texts):
        p = doc.paragraphs[122 + idx_co]
        p.text = txt
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        pf = p.paragraph_format
        pf.space_before = Pt(0)
        pf.space_after = Pt(6)
        pf.line_spacing = 1.2
        pf.first_line_indent = INDENT_1CM  # 1cm
        if p.runs:
            format_run(p.runs[0], size_pt=14, bold=False)

    # 5. Phụ lục 10: Lời nói đầu (P[131] to P[139])
    p131 = doc.paragraphs[131]
    p131.text = "LỜI NÓI ĐẦU"
    p131.alignment = WD_ALIGN_PARAGRAPH.CENTER
    pf131 = p131.paragraph_format
    pf131.space_before = Pt(12)
    pf131.space_after = Pt(6)
    pf131.line_spacing = 1.2
    pf131.first_line_indent = Pt(0)
    if p131.runs:
        format_run(p131.runs[0], size_pt=14, bold=True)

    noi_dau_texts = [
        "Trong bối cảnh chuyển đổi số và thương mại điện tử phát triển bùng nổ, nhu cầu mua sắm các thiết bị và giày thể thao chuyên dụng (chạy bộ, pickleball, tennis, sneaker) của người tiêu dùng ngày càng gia tăng. Tuy nhiên, một trong những rào cản lớn nhất khi mua giày trực tuyến là khách hàng khó tự chọn được kích cỡ chuẩn xác theo bảng size của từng hãng (Nike, Adidas, Asics có phom dáng rất khác nhau), thiếu thông tin thực tế về độ dày đệm êm hay độ bền đế trên mặt sân cứng, đồng thời quy trình thanh toán chuyển khoản thủ công thường mất nhiều thời gian xác minh đơn hàng.",
        "Xuất phát từ thực tiễn đó, em lựa chọn đề tài xây dựng website thương mại điện tử TC SPORT – nền tảng mua sắm giày thể thao hiện đại, trực quan, ứng dụng kiến trúc phân tầng với Spring Boot 3 ở backend và React 18 ở frontend. Đặc biệt, hệ thống tích hợp trực tiếp Trợ lý ảo AI dựa trên mô hình ngôn ngữ lớn Google Gemini AI nhằm giải đáp, tư vấn tức thời về phom chân (chân bè, chân thon), công nghệ đệm giày và tự động đối soát tồn kho thực tế trong MySQL.",
        "Để giải quyết các thách thức kỹ thuật khi vận hành hệ thống thực tế, đề tài tập trung vào ba trọng tâm: (1) Xây dựng cơ chế xoay vòng đa khóa API (Multi-Key Rotation & Auto-Failover) và nén ngữ cảnh kho hàng (Compact Catalog Snapshot) để đảm bảo chatbot AI hoạt động liên tục, tiết kiệm token tối đa; (2) Thiết kế mô hình dữ liệu quan hệ quản lý tồn kho đa kích cỡ (multi-size inventory) với cơ chế giao dịch ACID nguyên tử chống xung đột đặt hàng; (3) Tích hợp chuẩn thanh toán quét mã VietQR tự động cùng hệ thống Dashboard quản trị phân tích doanh thu và quản lý tiến trình đơn hàng chi tiết.",
        "Tên đề tài: “Xây dựng website thương mại điện tử bán giày thể thao TC SPORT tích hợp Trợ lý AI tư vấn sản phẩm”.",
        "Nội dung báo cáo bao gồm 03 chương:",
        "Chương 1: Tổng quan về đề tài.",
        "Chương 2: Công nghệ và thiết kế hệ thống.",
        "Chương 3: Xây dựng và đánh giá hệ thống."
    ]
    for idx_nd, txt in enumerate(noi_dau_texts):
        p = doc.paragraphs[132 + idx_nd]
        p.text = txt
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        pf = p.paragraph_format
        pf.space_before = Pt(0)
        pf.space_after = Pt(6)
        pf.line_spacing = 1.2
        pf.first_line_indent = INDENT_1CM if idx_nd < 3 else Pt(0)
        if p.runs:
            format_run(p.runs[0], size_pt=14, bold=(idx_nd == 3 or idx_nd == 4))

def main():
    print(f"Loading base document: {BASE_DOC}")
    doc = docx.Document(BASE_DOC)
    body = doc._body._element

    # 1. Update front-matter according to Appendix 1, 5, 6, 7, 8, 9, 10
    update_frontmatter(doc)

    print("Trimming old body elements from index 151 onwards...")
    # Keep elements up to index 150, delete everything from 151 until sectPr remains
    while len(body) > 152:
        del body[151]
    print(f"Body length after trimming: {len(body)}")

    # 2. Append Chapters 1, 2, 3, Conclusion, References according to Appendix 11, 12, 13
    all_sections = CH1_SECTIONS + CH2_SECTIONS + CH3_SECTIONS

    print(f"Appending {len(all_sections)} new content blocks with exact EPU formatting...")
    for idx, item in enumerate(all_sections):
        itype = item["type"]
        if itype == "heading1":
            p = doc.add_paragraph()
            p.style = 'Heading 1'
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            pf = p.paragraph_format
            pf.space_before = Pt(14)
            pf.space_after = Pt(6)
            pf.line_spacing = 1.2
            pf.first_line_indent = Pt(0)
            pf.keep_with_next = True
            r = p.add_run(item["text"])
            format_run(r, size_pt=14, bold=True)

        elif itype == "heading2":
            p = doc.add_paragraph()
            p.style = 'Heading 2'
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            pf = p.paragraph_format
            pf.space_before = Pt(6)
            pf.space_after = Pt(6)
            pf.line_spacing = 1.2
            pf.first_line_indent = Pt(0)
            pf.keep_with_next = True
            r = p.add_run(item["text"])
            format_run(r, size_pt=14, bold=True)

        elif itype == "heading3":
            p = doc.add_paragraph()
            p.style = 'Heading 3'
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            pf = p.paragraph_format
            pf.space_before = Pt(4)
            pf.space_after = Pt(6)
            pf.line_spacing = 1.2
            pf.first_line_indent = Pt(0)
            pf.keep_with_next = True
            r = p.add_run(item["text"])
            format_run(r, size_pt=13, bold=True)

        elif itype == "p":
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            pf = p.paragraph_format
            pf.line_spacing = 1.2  # Multiple 1.2
            pf.space_before = Pt(0)  # Before: 0
            pf.space_after = Pt(6)   # After: 6
            pf.first_line_indent = INDENT_1CM  # Special: First line : 1cm
            r = p.add_run(item["text"])
            format_run(r, size_pt=14, bold=False)

        elif itype == "citation":
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            pf = p.paragraph_format
            pf.line_spacing = 1.2
            pf.space_before = Pt(0)
            pf.space_after = Pt(6)
            pf.first_line_indent = INDENT_1CM
            r = p.add_run(item["text"])
            format_run(r, size_pt=14, bold=False)

        elif itype == "image":
            img_path = os.path.join(IMAGES_DIR, item["filename"])
            if os.path.exists(img_path):
                # Add picture paragraph
                p_img = doc.add_paragraph()
                p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
                pf_img = p_img.paragraph_format
                pf_img.space_before = Pt(8)
                pf_img.space_after = Pt(2)
                pf_img.line_spacing = 1.0
                pf_img.first_line_indent = Pt(0)
                pf_img.keep_with_next = True
                run_img = p_img.add_run()
                run_img.add_picture(img_path, width=Inches(6.0))

                # Add caption paragraph
                p_cap = doc.add_paragraph()
                p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
                pf_cap = p_cap.paragraph_format
                pf_cap.space_before = Pt(3)
                pf_cap.space_after = Pt(6)
                pf_cap.line_spacing = 1.2
                pf_cap.first_line_indent = Pt(0)
                r_cap = p_cap.add_run(item["caption"])
                format_run(r_cap, size_pt=11, bold=True, italic=False)
            else:
                print(f"Warning: Image file not found: {img_path}")

        elif itype == "table":
            tbl_data = TABLES_MAP[item["table_id"]]
            # Add table caption above table
            p_cap = doc.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            pf_cap = p_cap.paragraph_format
            pf_cap.space_before = Pt(6)
            pf_cap.space_after = Pt(4)
            pf_cap.line_spacing = 1.2
            pf_cap.first_line_indent = Pt(0)
            pf_cap.keep_with_next = True
            r_cap = p_cap.add_run(tbl_data["title"])
            format_run(r_cap, size_pt=12, bold=True, italic=True)

            # Create table
            headers = tbl_data["headers"]
            rows = tbl_data["rows"]
            table = doc.add_table(rows=len(rows) + 1, cols=len(headers))
            # Header cells
            for col_idx, htext in enumerate(headers):
                table.cell(0, col_idx).text = htext
            # Row cells
            for row_idx, row_values in enumerate(rows):
                for col_idx, val in enumerate(row_values):
                    table.cell(row_idx + 1, col_idx).text = str(val)

            # Apply table styling
            style_table(table)

            # Spacing paragraph after table
            p_sp = doc.add_paragraph()
            p_sp.paragraph_format.space_before = Pt(0)
            p_sp.paragraph_format.space_after = Pt(6)
            p_sp.paragraph_format.first_line_indent = Pt(0)

    print(f"Saving generated document to: {OUT_DOC}")
    doc.save(OUT_DOC)
    print("Document successfully created and saved with strict EPU formatting!")

if __name__ == "__main__":
    main()
