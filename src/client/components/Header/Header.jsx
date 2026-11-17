/**
 * =========================================================================================
 * 📁 TỆP: src/components/Header/Header.jsx
 * 🎯 CHỨC NĂNG: KHUNG HEADER CHÍNH CỦA WEBSITE (TOPBAR + LOGO & SEARCH + MENU NAV)
 * =========================================================================================
 * 
 * 📌 VỊ TRÍ TRÊN GIAO DIỆN:
 *    - Nằm cố định ở phần trên cùng của toàn bộ trang web.
 * 
 * 📌 BA THÀNH PHẦN CON ĐƯỢC TÍCH HỢP:
 *    1. <TopBar />: Hotline hỗ trợ, cam kết hàng chính hãng, nút mở Bảng đo size, 5 nút đổi màu Theme Header.
 *    2. <MainHeader />: Logo thương hiệu TC SPORT, thanh tìm kiếm thông minh AI, nút Tài khoản, nút Giỏ hàng có đếm số lượng.
 *    3. <CategoryNav />: Thanh menu các thương hiệu: Lọc Sản Phẩm, Nike, Adidas, Asics, Lacoste, Puma, Pickleball, Sale, Bảng Tin.
 * =========================================================================================
 */

import React from 'react';
import TopBar from './TopBar';
import MainHeader from './MainHeader';
import CategoryNav from './CategoryNav';

export default function Header({ onNavigate, onOpenSizeGuide, onOpenAiAssistant, currentTheme, onChangeTheme }) {
  return (
    <header className="site-header" id="site-header">
      {/* 1. Thanh thông tin trên cùng (TopBar) */}
      <TopBar
        onNavigate={onNavigate}
        onOpenSizeGuide={onOpenSizeGuide}
        onOpenAiAssistant={onOpenAiAssistant}
        currentTheme={currentTheme}
        onChangeTheme={onChangeTheme}
      />

      {/* 2. Thanh chính: Logo + Tìm kiếm + Tài khoản + Giỏ hàng (MainHeader) */}
      <MainHeader onNavigate={onNavigate} onOpenAiAssistant={onOpenAiAssistant} />

      {/* 3. Dải menu các hãng thể thao và nút Lọc sản phẩm (CategoryNav) */}
      <CategoryNav onNavigate={onNavigate} />
    </header>
  );
}
