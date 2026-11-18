/**
 * =========================================================================================
 * 📁 TỆP: src/main.jsx
 * 🎯 CHỨC NĂNG: ĐIỂM KHỞI CHẠY CHÍNH CỦA ỨNG DỤNG REACT (ENTRY POINT)
 * =========================================================================================
 * 
 * 📌 NHIỆM VỤ:
 *    - Gắn kết (Mount) React App vào phần tử DOM `<div id="root"></div>` trong index.html.
 *    - Bao bọc các Provider toàn cục:
 *      + <AuthProvider>: Quản lý phiên đăng nhập và thông tin khách hàng.
 *      + <CartProvider>: Quản lý giỏ hàng, tổng tiền và popup giỏ hàng.
 *    - Tải toàn bộ hệ thống giao diện chuẩn CSS từ `./styles.css`.
 * =========================================================================================
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
