/**
 * ==============================================================================
 * 🚀 DÃY ICON DỌC CỐ ĐỊNH BÊN PHẢI (FLOATING VERTICAL DOCK)
 * ==============================================================================
 * Tận dụng khoảng trống lề phải màn hình với 5 công cụ hữu ích:
 * 1. 🔍 Tìm kiếm chọn lọc: Chuyển thẳng đến trang Lọc (CategoryPage)
 * 2. 🛒 Giỏ hàng nhanh: Hiển thị badge số lượng động và mở nhanh CartDrawer
 * 3. 📱 Tải App TC SPORT: Hover hiển thị mã QR tải app nhận 50K (không có tooltip chữ che)
 * 4. 📞 Hotline: Bấm gọi nhanh tới hotline 0973.711.868
 * 5. ⬆️ Lên đầu trang: Cuộn mượt mà lên đầu trang (Smooth Scroll)
 * ==============================================================================
 */

import React from 'react';
import { useCart } from '../../../context/CartContext';

export default function FloatingDock({ onNavigate, onOpenAiAssistant }) {
  const { totalCount, openCartDrawer } = useCart();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="floating-vertical-dock" aria-label="Thanh công cụ nhanh">
      {/* 0. Trợ lý AI Gemini Tư Vấn Thông Minh */}
      <button
        type="button"
        className="dock-action-btn btn-dock-ai dock-wiggle-1"
        onClick={onOpenAiAssistant}
        aria-label="Trợ lý AI Gemini tư vấn"
        style={{
          background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(194, 65, 12, 0.45)'
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
          <path d="M12 2L14.4 7.6L20 8.4L16 12.3L17 18L12 15.2L7 18L8 12.3L4 8.4L9.6 7.6L12 2Z" />
        </svg>
        <span className="dock-tooltip" style={{ background: '#1C1917', color: '#FFF' }}>
          🤖 Trợ lý AI tư vấn giày
        </span>
      </button>

      {/* 1. Tìm kiếm chọn lọc */}
      <a
        href="/category"
        className="dock-action-btn btn-dock-filter dock-wiggle-1"
        onClick={(e) => {
          e.preventDefault();
          onNavigate('category');
        }}
        aria-label="Tìm kiếm chọn lọc"
      >
        <svg viewBox="0 0 24 24">
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
        </svg>
        <span className="dock-tooltip">🔍 Tìm kiếm chọn lọc</span>
      </a>

      {/* 2. Giỏ hàng nhanh */}
      <a
        href="/cart"
        className="dock-action-btn btn-dock-cart dock-wiggle-2"
        onClick={(e) => {
          e.preventDefault();
          openCartDrawer();
        }}
        aria-label="Xem giỏ hàng"
      >
        <svg viewBox="0 0 24 24">
          <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" />
        </svg>
        <span className="dock-counter-badge" id="dock-cart-counter">
          {totalCount}
        </span>
        <span className="dock-tooltip">🛒 Giỏ hàng nhanh</span>
      </a>

      {/* 3. Tải App TC SPORT (Hover ra mã QR và quà tặng 50K - Không có tooltip chữ đè lên) */}
      <div
        className="dock-action-btn btn-dock-app dock-wiggle-3"
        tabIndex="0"
        role="button"
        aria-label="Tải app TC SPORT"
      >
        <svg viewBox="0 0 24 24">
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14zm-5-1c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z" />
        </svg>
        <div className="dock-app-popover">
          <img src="assets/images/banner-app-qr.jpg" alt="Quét mã tải app TC SPORT" />
          <h5>Tải App TC SPORT</h5>
          <p>Quét mã nhận ngay Voucher 50K</p>
          <div className="dock-app-badges">
            <span>iOS</span>
            <span>Android</span>
          </div>
        </div>
      </div>

      {/* 4. Hotline tư vấn nhanh */}
      <a
        href="tel:0973711868"
        className="dock-action-btn btn-dock-hotline dock-wiggle-4"
        aria-label="Gọi hotline tư vấn"
      >
        <svg viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        <span className="dock-tooltip">📞 Hotline: 0973.711.868</span>
      </a>

      {/* 5. Lên đầu trang */}
      <button
        type="button"
        className="dock-action-btn btn-dock-scrolltop"
        onClick={handleScrollTop}
        aria-label="Lên đầu trang"
      >
        <svg viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg>
        <span className="dock-tooltip">⬆️ Lên đầu trang</span>
      </button>
    </aside>
  );
}
