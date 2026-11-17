/**
 * =========================================================================================
 * 📁 TỆP: src/components/Common/Toast.jsx
 * 🎯 CHỨC NĂNG: HỘP THÔNG BÁO PHẢN HỒI NHANH TOÀN CỤC (TOAST NOTIFICATION POPUP)
 * =========================================================================================
 * 
 * 📌 VỊ TRÍ TRÊN GIAO DIỆN:
 *    - Xuất hiện ở góc dưới bên trái màn hình (fixed bottom-left).
 * 
 * 📌 HOẠT ĐỘNG:
 *    - Tự động hiển thị khi người dùng thêm sản phẩm vào giỏ, cập nhật tài khoản, v.v.
 *    - Tự động biến mất sau 3.2 giây.
 *    - Phân biệt màu sắc: Màu xanh lá cây (#15803D) khi thành công (success),
 *      màu xám tối khi thông báo chung (info).
 * =========================================================================================
 */

import React from 'react';
import { useCart } from '../../../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        background: isSuccess ? '#15803D' : '#1F2937',
        color: '#FFFFFF',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '0.88rem',
        fontWeight: '700',
        boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'fadeIn 0.2s ease'
      }}
    >
      <span>{isSuccess ? '✅' : 'ℹ️'}</span>
      <span>{toastMessage.message}</span>
    </div>
  );
}
