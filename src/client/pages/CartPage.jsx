/**
 * =========================================================================================
 * 📁 TỆP: src/pages/CartPage.jsx
 * 🎯 CHỨC NĂNG: TRANG CHI TIẾT GIỎ HÀNG & FORM ĐẶT HÀNG THANH TOÁN (CHECKOUT)
 * =========================================================================================
 * 
 * 📌 VỊ TRÍ TRÊN GIAO DIỆN:
 *    - Hiển thị khi người dùng ấn nút "ĐẶT HÀNG NGAY" từ giỏ hàng trượt (CartDrawer)
 *      hoặc ấn vào "Giỏ hàng" trên Floating Dock bên phải màn hình.
 * 
 * 📌 CÁC KHỐI GIAO DIỆN CHÍNH:
 *    1. DANH SÁCH SẢN PHẨM TRONG GIỎ (Bên trái):
 *       - Hiển thị hình ảnh, tên giày, size đã chọn, đơn giá, thành tiền.
 *       - Bộ tăng giảm số lượng (+ / -) và nút Xóa sản phẩm.
 *       - Thanh thông báo Miễn phí vận chuyển (khi đơn hàng >= 1.500.000₫).
 *    2. FORM THÔNG TIN NHẬN HÀNG & THANH TOÁN (Bên phải):
 *       - Nhập Họ và tên, Số điện thoại, Địa chỉ giao hàng chi tiết, Ghi chú.
 *       - Bảng tóm tắt chi phí: Tạm tính, Phí ship, Tổng thanh toán.
 *       - Nút "XÁC NHẬN ĐẶT HÀNG NGAY".
 * 
 * 📌 XỬ LÝ DỮ LIỆU & LƯU TRỮ:
 *    - Tạo mã đơn hàng ngẫu nhiên (ví dụ: #TC58291).
 *    - Lưu thông tin đơn hàng vào localStorage key: 'tc_user_orders'.
 *    - Xóa sạch giỏ hàng (clearCart) sau khi đặt thành công.
 *    - Chuyển hướng người dùng sang trang Hồ sơ cá nhân (ProfilePage) để xem lịch sử đơn hàng.
 * 
 * 📌 ĐIỂM KẾT NỐI BACKEND (SPRING BOOT / NODE.JS REST API):
 *    - POST /api/v1/orders
 *      Payload: { customerName, phone, address, note, paymentMethod, items: [...], total }
 * =========================================================================================
 */

import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatVND } from '../../data/products';

export default function CartPage({ onNavigate }) {
  // -------------------------------------------------------------
  // 1. LẤY DỮ LIỆU VÀ CÁC HÀM XỬ LÝ TỪ CART CONTEXT & AUTH CONTEXT
  // -------------------------------------------------------------
  const { cartItems, subtotal, shipping, total, updateQuantity, removeFromCart, clearCart, showToast } = useCart();
  const { authUser } = useAuth();

  // State thông tin người nhận hàng (tự động điền theo tài khoản đang đăng nhập)
  const [name, setName] = useState(authUser?.name || 'Nguyễn Văn Tiến');
  const [phone, setPhone] = useState(authUser?.phone || '0973711868');
  const [address, setAddress] = useState(authUser?.address || '249 Xã Đàn, Nam Đồng, Đống Đa, Hà Nội');
  const [note, setNote] = useState('Giao giờ hành chính, gọi trước khi đến.');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Tự động cập nhật form khi thông tin tài khoản đăng nhập thay đổi
  useEffect(() => {
    if (authUser?.name) setName(authUser.name);
    if (authUser?.phone) setPhone(authUser.phone);
    if (authUser?.address) setAddress(authUser.address);
  }, [authUser]);

  // -------------------------------------------------------------
  // 2. HÀM XỬ LÝ ĐẶT HÀNG (CHECKOUT SUBMIT)
  // -------------------------------------------------------------
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      if (showToast) {
        showToast('Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước khi thanh toán.', 'warning');
      } else {
        alert('Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước khi thanh toán.');
      }
      return;
    }

    let createdOrder = null;

    try {
      const { api } = await import('../../services/api');
      const orderPayload = {
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: authUser?.email || '',
        customerAddress: address.trim(),
        paymentMethod: paymentMethod === 'cod' ? 'cod' : 'qr',
        note: note.trim(),
        items: cartItems.map((it) => ({
          productId: it.product.id,
          size: it.size,
          quantity: it.quantity
        }))
      };

      createdOrder = await api.orders.create(orderPayload);
    } catch (apiErr) {
      console.warn('Lỗi kết nối API tạo đơn hàng, chuyển lưu LocalStorage:', apiErr);
    }

    // Nếu không có response từ API thì tự tạo fallback order
    const orderId = createdOrder?.id || ('TC' + Math.floor(10000 + Math.random() * 90000));
    const newOrder = createdOrder || {
      id: orderId,
      date: new Date().toLocaleDateString('vi-VN'),
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      status: 'Đang chuẩn bị hàng',
      statusClass: 'status-badge-shipping',
      total: formatVND(total),
      totalAmount: total,
      costAmount: Math.round(total * 0.65),
      item: cartItems[0].product.name + (cartItems.length > 1 ? ` (+${cartItems.length - 1} sản phẩm khác)` : ''),
      size: cartItems[0].size,
      image: cartItems[0].product.image,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        email: authUser?.email || ''
      },
      paymentMethod: paymentMethod === 'cod' ? 'Thanh toán COD khi nhận hàng' : 'Chuyển khoản QR Techcombank',
      paymentStatus: 'Chờ thanh toán',
      note: note.trim(),
      items: cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        brand: item.product.brand,
        size: item.size,
        price: item.product.price,
        costPrice: item.product.costPrice || Math.round(item.product.price * 0.65),
        quantity: item.quantity,
        image: item.product.image,
        subtotal: item.product.price * item.quantity
      }))
    };

    // Lưu vào LocalStorage để đồng bộ với trang Profile và trang Admin
    try {
      const existing = JSON.parse(localStorage.getItem('tc_user_orders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('tc_user_orders', JSON.stringify(existing));
    } catch (err) {
      console.error('Lỗi khi lưu đơn hàng:', err);
    }

    // Làm rỗng giỏ hàng và thông báo thành công
    clearCart();
    if (showToast) {
      showToast(`🎉 Đặt hàng thành công! Mã đơn: #${orderId}`, 'success');
    }
    
    // Chuyển hướng sang trang Profile để theo dõi đơn hàng
    onNavigate('profile');
  };

  return (
    <main className="page-wrapper-main">
      <div className="container">
        {/* Đường dẫn trang (Breadcrumb) */}
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          Trang chủ › <b style={{ color: 'var(--color-espresso)' }}>Giỏ hàng & Đặt Hàng Thanh Toán</b>
        </div>

        {/* Kiểm tra giỏ hàng có rỗng hay không */}
        {cartItems.length === 0 ? (
          /* TRƯỜNG HỢP GIỎ HÀNG RỖNG */
          <div style={{ background: '#FFFFFF', padding: '60px 20px', textAlign: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bg-cream-border)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>👟</div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '8px' }}>Giỏ hàng của bạn đang trống!</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Hãy khám phá các mẫu giày chính hãng mới nhất tại TC SPORT.
            </p>
            <button
              type="button"
              className="btn-primary-checkout"
              style={{ width: 'fit-content', margin: '0 auto', padding: '12px 28px' }}
              onClick={() => onNavigate('category')}
            >
              Khám Phá Sản Phẩm Ngay →
            </button>
          </div>
        ) : (
          /* TRƯỜNG HỢP CÓ SẢN PHẨM TRONG GIỎ */
          <div className="cart-layout-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
            
            {/* ========================================================= */}
            {/* KHỐI 1: DANH SÁCH CHI TIẾT SẢN PHẨM TRONG GIỎ (BÊN TRÁI)  */}
            {/* ========================================================= */}
            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bg-cream-border)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '16px', borderBottom: '2px solid #F3EDE3', paddingBottom: '10px' }}>
                DANH SÁCH SẢN PHẨM ({cartItems.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {cartItems.map((item, idx) => (
                  <div key={`${item.productId}-${item.size}-${idx}`} style={{ display: 'flex', gap: '14px', alignItems: 'center', borderBottom: '1px solid #F3EDE3', paddingBottom: '14px' }}>
                    <img src={item.product.image} alt={item.product.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '4px' }}>{item.product.name}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                        Size: <b style={{ color: 'var(--color-terracotta)' }}>{item.size}</b> • Đơn giá: {formatVND(item.product.price)}
                      </div>
                      
                      {/* Bộ điều khiển số lượng (+ / -) và nút xóa */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="cart-item-stepper" style={{ border: '1px solid #DFCEB0' }}>
                          <button type="button" className="btn-step-qty" onClick={() => updateQuantity(item.productId, item.size, -1)}>-</button>
                          <span className="step-qty-value">{item.quantity}</span>
                          <button type="button" className="btn-step-qty" onClick={() => updateQuantity(item.productId, item.size, 1)}>+</button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId, item.size)}
                          style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                    {/* Thành tiền của từng món */}
                    <div style={{ textAlign: 'right', fontWeight: 800, color: 'var(--color-terracotta)' }}>
                      {formatVND(item.subtotal)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Thông báo tiến độ freeship */}
              <div style={{ marginTop: '16px', background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', color: '#166534', fontWeight: 600 }}>
                {subtotal >= 1500000 ? '✅ Đơn hàng của bạn đã đủ điều kiện MIỄN PHÍ VẬN CHUYỂN toàn quốc!' : `💡 Mua thêm ${formatVND(1500000 - subtotal)} để được miễn phí ship toàn quốc.`}
              </div>
            </div>

            {/* ========================================================= */}
            {/* KHỐI 2: FORM THÔNG TIN GIAO HÀNG & XÁC NHẬN (BÊN PHẢI)    */}
            {/* ========================================================= */}
            <form onSubmit={handleCheckout} style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bg-cream-border)', height: 'fit-content' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '16px', borderBottom: '2px solid #F3EDE3', paddingBottom: '10px' }}>
                THÔNG TIN NHẬN HÀNG
              </h3>

              <div className="form-group">
                <label className="form-label">Họ và tên người nhận *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Số điện thoại liên hệ *</label>
                <input
                  type="tel"
                  className="form-control"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Địa chỉ giao hàng chi tiết *</label>
                <textarea
                  className="form-control"
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Ghi chú giao hàng</label>
                <input
                  type="text"
                  className="form-control"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>

              {/* Lựa chọn phương thức thanh toán */}
              <div style={{ marginTop: '14px' }}>
                <label className="form-label" style={{ fontWeight: 800, marginBottom: '8px', display: 'block' }}>
                  Phương thức thanh toán *
                </label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: paymentMethod === 'cod' ? '2px solid var(--color-terracotta)' : '1px solid #DFCEB0', borderRadius: '8px', background: paymentMethod === 'cod' ? '#FFF7ED' : '#FFFFFF', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>💵 Thanh toán COD khi nhận hàng</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Kiểm tra giày trước khi thanh toán tiền mặt cho bưu tá</div>
                    </div>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: paymentMethod === 'qr' ? '2px solid var(--color-terracotta)' : '1px solid #DFCEB0', borderRadius: '8px', background: paymentMethod === 'qr' ? '#FFF7ED' : '#FFFFFF', cursor: 'pointer', transition: 'all 0.15s ease' }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="qr"
                      checked={paymentMethod === 'qr'}
                      onChange={() => setPaymentMethod('qr')}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>📱 Chuyển khoản QR Ngân hàng (Miễn phí & Tự động)</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Quét mã QR qua app ngân hàng tiện lợi, xác nhận tức thì</div>
                    </div>
                  </label>
                </div>

                {/* Khung hiển thị thông tin chuyển khoản & Mã QR cấu hình từ Admin */}
                {paymentMethod === 'qr' && (
                  <div style={{ marginTop: '12px', padding: '14px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ width: '105px', height: '105px', background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={
                          (() => {
                            try {
                              const s = JSON.parse(localStorage.getItem('tc_payment_settings') || '{}');
                              if (s.qrImage) return s.qrImage;
                              const acc = (s.accountNumber || '1903.8888.6666').replace(/[^0-9]/g, '');
                              return `https://img.vietqr.io/image/${s.bankCode || 'TCB'}-${acc}-compact2.jpg?accountName=${encodeURIComponent(s.accountHolder || 'NGUYEN VAN TIEN')}&amount=${total}&addInfo=TC%20SPORT%20${phone}`;
                            } catch (e) {
                              return 'https://img.vietqr.io/image/TCB-190388886666-compact2.jpg';
                            }
                          })()
                        }
                        alt="Mã QR Thanh Toán"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div style={{ fontSize: '0.8rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-terracotta)' }}>
                        {(() => {
                          try {
                            const s = JSON.parse(localStorage.getItem('tc_payment_settings') || '{}');
                            return s.bankName || 'Techcombank';
                          } catch (e) {
                            return 'Techcombank';
                          }
                        })()}
                      </div>
                      <div>STK: <b>{(() => {
                        try {
                          const s = JSON.parse(localStorage.getItem('tc_payment_settings') || '{}');
                          return s.accountNumber || '1903.8888.6666';
                        } catch (e) {
                          return '1903.8888.6666';
                        }
                      })()}</b></div>
                      <div>Chủ TK: <b style={{ textTransform: 'uppercase' }}>{(() => {
                        try {
                          const s = JSON.parse(localStorage.getItem('tc_payment_settings') || '{}');
                          return s.accountHolder || 'NGUYEN VAN TIEN';
                        } catch (e) {
                          return 'NGUYEN VAN TIEN';
                        }
                      })()}</b></div>
                      <div style={{ fontSize: '0.74rem', color: '#16A34A', fontWeight: 600 }}>
                        Nội dung: <b>TC SPORT {phone}</b>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tóm tắt thanh toán */}
              <div style={{ background: '#FAF5EA', padding: '14px', borderRadius: '8px', border: '1px solid #DFCEB0', margin: '18px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span>Tạm tính:</span>
                  <b>{formatVND(subtotal)}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                  <span>Phí giao hàng:</span>
                  <b>{shipping === 0 ? 'Miễn phí' : formatVND(shipping)}</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-terracotta)', borderTop: '1px dashed #DFCEB0', paddingTop: '8px' }}>
                  <span>TỔNG CỘNG:</span>
                  <span>{formatVND(total)}</span>
                </div>
              </div>

              {/* Nút gửi form đặt hàng */}
              <button type="submit" className="btn-primary-checkout" style={{ width: '100%', height: '48px', fontSize: '0.95rem' }}>
                XÁC NHẬN ĐẶT HÀNG NGAY →
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
