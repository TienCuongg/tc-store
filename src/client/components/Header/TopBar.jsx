/**
 * =========================================================================================
 * 📁 TỆP: src/components/Header/TopBar.jsx
 * 🎯 CHỨC NĂNG: THANH THÔNG BÁO VÀ CHỌN GIAO DIỆN MÀU SẮC (TOPBAR & THEME PICKER)
 * =========================================================================================
 * 
 * 📌 VỊ TRÍ TRÊN GIAO DIỆN:
 *    - Dải thanh nhỏ trên cùng phía trên Header.
 * 
 * 📌 CÁC KHỐI CHỨC NĂNG:
 *    1. BÊN TRÁI:
 *       - Cam kết 100% Chính hãng (Đền gấp 10 lần)
 *       - Hotline: 0973.711.868 (8:30 - 21:30)
 *    2. BÊN PHẢI:
 *       - 🎨 Hộp chọn màu sắc Header (5 theme tùy chọn: Be vàng, Xanh navy, Nâu espresso, Xanh rêu, Đỏ rượu)
 *       - Nút mở Popup "Bảng đo size chuẩn"
 *       - Chính sách Đổi hàng 30 ngày & Bảo hành 12 tháng
 * =========================================================================================
 */

import React, { useState } from 'react';

export default function TopBar({ onNavigate, onOpenSizeGuide, onOpenAiAssistant, currentTheme, onChangeTheme }) {
  // State quản lý việc mở/đóng popover chọn màu theme
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  // 5 bảng màu Header cao cấp được thiết kế riêng
  const themeOptions = [
    { id: 'theme-beige', name: 'Be Vàng Sáng (Mặc định)', color: '#F3EADB' },
    { id: 'theme-navy', name: 'Xanh Navy MyShoes', color: '#0A437F' },
    { id: 'theme-espresso', name: 'Nâu Espresso Sang Trọng', color: '#1F1916' },
    { id: 'theme-emerald', name: 'Xanh Rêu Forest', color: '#182B1C' },
    { id: 'theme-burgundy', name: 'Đỏ Rượu Burgundy', color: '#38121E' },
  ];

  const currentThemeLabel = themeOptions.find((t) => t.id === currentTheme)?.name || 'Màu: Be Vàng';

  return (
    <div className="top-announcement-bar">
      <div className="container top-bar-row">
        {/* Phía trái: Cam kết vàng & Hotline */}
        <div className="top-bar-left">
          <span>🛡️ Cam kết 100% Chính Hãng (Đền gấp 10 lần)</span>
          <span className="sep">•</span>
          <span>
            📞 Hotline: <b>0973.711.868</b> (8:30 - 21:30)
          </span>
        </div>

        {/* Phía phải: Bộ chọn màu Header & Tiện ích đo size */}
        <div className="top-bar-right">
          {/* Bộ chọn màu Header */}
          <div id="theme-picker-wrap" style={{ position: 'relative', display: 'inline-block' }}>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              title="Chọn màu sắc Header"
            >
              🎨 <span>{currentThemeLabel}</span> ▾
            </button>

            {isThemeOpen && (
              <div className="theme-picker-popover" style={{ display: 'flex' }}>
                {themeOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="theme-pick-item"
                    onClick={() => {
                      onChangeTheme(opt.id);
                      setIsThemeOpen(false);
                    }}
                  >
                    <span className="theme-color-dot" style={{ background: opt.color }}></span>
                    {opt.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <span className="sep">•</span>
          {/* Nút bấm mở Trợ lý AI Gemini */}
          <a
            href="#ai-assistant"
            onClick={(e) => {
              e.preventDefault();
              if (onOpenAiAssistant) onOpenAiAssistant();
            }}
            style={{
              color: '#FFFFFF',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
              padding: '2px 8px',
              borderRadius: '4px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(194, 65, 12, 0.35)'
            }}
            title="Mở Trợ lý AI Gemini tư vấn chọn giày"
          >
            🤖 Hỏi Trợ Lý AI
          </a>
          <span className="sep">•</span>
          {/* Nút bấm mở bảng đo size chuẩn */}
          <a href="#sizeguide" onClick={(e) => { e.preventDefault(); onOpenSizeGuide(); }}>
            Bảng đo size chuẩn
          </a>
          <span className="sep">•</span>
          <a href="#return" onClick={(e) => { e.preventDefault(); alert('Hỗ trợ đổi hàng 30 ngày hoàn toàn miễn phí!'); }}>
            Đổi hàng 30 ngày
          </a>
          <span className="sep">•</span>
          <a
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('admin');
            }}
            style={{
              color: '#C2410C',
              fontWeight: 800,
              background: 'rgba(194, 65, 12, 0.12)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
            title="Truy cập Trang Quản Trị Hệ Thống TC SPORT"
          >
            ⚙️ Quản Trị Viên
          </a>
        </div>
      </div>
    </div>
  );
}
