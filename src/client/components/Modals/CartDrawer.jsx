/**
 * =========================================================================================
 * 📁 TỆP: src/components/Modals/CartDrawer.jsx
 * 🎯 CHỨC NĂNG: NGĂN KÉO GIỎ HÀNG TRƯỢT TỪ BÊN PHẢI (EXACT SLIDE-OUT CART DRAWER REPLICA)
 * =========================================================================================
 * 
 * Khớp chuẩn 100% với CSS trong styles.css:
 * - .drawer-backdrop.active, #cart-drawer-backdrop
 * - .cart-slide-drawer.active, #cart-drawer
 * - .drawer-header-row, .drawer-heading, .btn-close-drawer
 * - .free-shipping-box, .shipping-meter-text, .shipping-meter-track, .shipping-meter-fill
 * - .cart-items-container, #cart-items-list
 * - .cart-item-card, .cart-item-img, .cart-item-info, .cart-item-name, .cart-item-meta, .cart-item-price
 * - .cart-item-stepper, .btn-stepper, .stepper-num, .btn-item-remove
 * - .cart-drawer-footer: .voucher-input-row, .voucher-field, .btn-apply-voucher
 * - .cart-cost-summary: .summary-line, .total-highlight, .final-total
 * - .btn-checkout-drawer, .drawer-policy-badges
 * =========================================================================================
 */

import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { formatVND } from '../../../data/products';

export default function CartDrawer({ onNavigate }) {
  const { isCartOpen, closeCartDrawer, cartItems, subtotal, shipping, total, updateQuantity, removeFromCart } = useCart();
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyVoucher = () => {
    const code = voucher.trim().toUpperCase();
    if (code === 'TC50K') {
      setDiscount(50000);
      alert('Đã áp dụng mã voucher giảm 50.000₫!');
    } else if (code === 'FREESHIP') {
      setDiscount(30000);
      alert('Đã kích hoạt Miễn Phí Giao Hàng!');
    } else {
      alert('Mã voucher không hợp lệ hoặc đã hết hạn.');
    }
  };

  const finalTotal = Math.max(0, total - discount);

  return (
    <>
      {/* Lớp nền mờ */}
      <div
        className={`drawer-backdrop ${isCartOpen ? 'active' : ''}`}
        id="cart-drawer-backdrop"
        onClick={closeCartDrawer}
      ></div>

      {/* Ngăn kéo giỏ hàng trượt ra */}
      <aside
        className={`cart-slide-drawer ${isCartOpen ? 'active' : ''}`}
        id="cart-drawer"
        aria-label="Giỏ hàng thanh toán"
      >
        {/* Header Drawer */}
        <div className="drawer-header-row">
          <div className="drawer-heading">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>Giỏ Hàng Của Bạn</span>
          </div>
          <button
            type="button"
            className="btn-close-drawer"
            onClick={closeCartDrawer}
            aria-label="Đóng giỏ hàng"
          >
            ✕
          </button>
        </div>

        {/* Thanh đo điều kiện Freeship toàn quốc */}
        <div className="free-shipping-box">
          <div className="shipping-meter-text" id="shipping-meter-status">
            {subtotal >= 1500000 ? (
              <span>🎉 <b>CHÚC MỪNG:</b> Bạn được <b>MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC!</b></span>
            ) : (
              <span>Mua thêm <b>{formatVND(1500000 - subtotal)}</b> để nhận <b>FREESHIP TOÀN QUỐC</b></span>
            )}
          </div>
          <div className="shipping-meter-track">
            <div
              className="shipping-meter-fill"
              id="shipping-meter-fill"
              style={{ width: `${Math.min(100, Math.round((subtotal / 1500000) * 100))}%` }}
            ></div>
          </div>
        </div>

        {/* Danh sách các sản phẩm đang có trong giỏ */}
        <div className="cart-items-container" id="cart-items-list">
          {cartItems.length === 0 ? (
            <div style={{ padding: '48px 20px', textAlign: 'center', color: '#6B7280' }}>
              <p style={{ fontWeight: 700, color: '#111827', fontSize: '1rem' }}>Giỏ hàng của bạn đang trống</p>
              <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Hãy chọn ngay những mẫu giày thể thao chính hãng yêu thích!</p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.productId}-${item.size}-${idx}`} className="cart-item-card">
                <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-name" title={item.product.name}>{item.product.name}</div>
                  <div className="cart-item-meta">Kích cỡ: <b>Size {item.size}</b></div>
                  <div className="cart-item-price">{formatVND(item.product.price)}</div>
                  <div className="cart-item-stepper">
                    <button
                      type="button"
                      className="btn-stepper"
                      onClick={() => updateQuantity(item.productId, item.size, -1)}
                    >
                      -
                    </button>
                    <span className="stepper-num">{item.quantity}</span>
                    <button
                      type="button"
                      className="btn-stepper"
                      onClick={() => updateQuantity(item.productId, item.size, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-item-remove"
                  onClick={() => removeFromCart(item.productId, item.size)}
                  title="Xóa sản phẩm"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="voucher-input-row">
              <input
                type="text"
                id="voucher-code-input"
                className="voucher-field"
                placeholder="Nhập mã: TC50K hoặc FREESHIP"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
              />
              <button type="button" className="btn-apply-voucher" onClick={handleApplyVoucher}>
                Áp Dụng
              </button>
            </div>

            <div className="cart-cost-summary">
              <div className="summary-line">
                <span>Tạm tính</span>
                <span id="cart-summary-subtotal">{formatVND(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-line">
                  <span>Giảm giá voucher</span>
                  <span className="text-green" id="cart-summary-discount">-{formatVND(discount)}</span>
                </div>
              )}
              <div className="summary-line">
                <span>Phí vận chuyển</span>
                <span id="cart-summary-shipping">{shipping === 0 ? 'Miễn phí' : formatVND(shipping)}</span>
              </div>
              <div className="summary-line total-line">
                <span>Tổng thanh toán</span>
                <span className="final-total" id="cart-summary-total">{formatVND(finalTotal)}</span>
              </div>
            </div>

            <button
              type="button"
              className="btn-primary-checkout"
              onClick={() => {
                closeCartDrawer();
                onNavigate('cart');
              }}
            >
              Tiến Hành Đặt Hàng Ngay ›
            </button>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <a
                href="/cart"
                onClick={(e) => {
                  e.preventDefault();
                  closeCartDrawer();
                  onNavigate('cart');
                }}
                style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-terracotta)' }}
              >
                Xem chi tiết giỏ hàng & áp mã voucher ›
              </a>
            </div>

            <div className="drawer-policy-badges">
              <span>🛡️ 100% Chính hãng</span>
              <span>🚚 Freeship từ 1.000.000₫</span>
              <span>🔄 Đổi size 30 ngày</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
