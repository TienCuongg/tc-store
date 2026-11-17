/**
 * =========================================================================================
 * 📁 TỆP: src/client/ClientApp.jsx
 * 🎯 CHỨC NĂNG: ENTRY POINT & BỐ CỤC CHÍNH CỦA PHÂN HỆ NGƯỜI MUA HÀNG (STOREFRONT CLIENT)
 * =========================================================================================
 * 
 * Toàn bộ trải nghiệm khách hàng mua giày thể thao được gom trọn vẹn tại đây:
 * - Header (TopBar, Thanh tìm kiếm, Menu hãng)
 * - Các trang: Trang Chủ, Lọc Sản Phẩm, Giỏ Hàng, Hồ Sơ Cá Nhân, Bảng Tin Blog
 * - Chân trang (Footer) & Nút tiện ích nổi (FloatingDock)
 * - Các Modal: Giỏ hàng trượt (CartDrawer), Đăng nhập (AuthModal), Bảng đo size, Xem nhanh
 * =========================================================================================
 */

import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import FloatingDock from './components/Common/FloatingDock';
import CartDrawer from './components/Modals/CartDrawer';
import AuthModal from './components/Modals/AuthModal';
import SizeGuideModal from './components/Modals/SizeGuideModal';
import QuickViewModal from './components/Modals/QuickViewModal';
import AiAssistantModal from './components/Modals/AiAssistantModal';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';

export default function ClientApp({
  currentPage,
  pageParams,
  onNavigate,
  currentTheme,
  onChangeTheme
}) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <div className="app-root-wrapper">
      {/* 1. HEADER (TOPBAR + LOGO & TÌM KIẾM + THANH MENU) */}
      <Header
        onNavigate={onNavigate}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        currentTheme={currentTheme}
        onChangeTheme={onChangeTheme}
      />

      {/* 2. NỘI DUNG TRANG ĐANG KÍCH HOẠT THEO URL */}
      {currentPage === 'home' && (
        <HomePage onNavigate={onNavigate} onQuickView={handleOpenQuickView} />
      )}
      {currentPage === 'category' && (
        <CategoryPage
          key={JSON.stringify(pageParams)}
          initialFilter={pageParams}
          onQuickView={handleOpenQuickView}
          onNavigate={onNavigate}
        />
      )}
      {currentPage === 'cart' && <CartPage onNavigate={onNavigate} />}
      {currentPage === 'profile' && <ProfilePage onNavigate={onNavigate} />}
      {currentPage === 'blog' && (
        <BlogPage
          onNavigate={onNavigate}
          initialArticleSlug={pageParams?.article}
        />
      )}

      {/* 3. CHÂN TRANG HỆ THỐNG (FOOTER) */}
      <Footer
        onNavigate={onNavigate}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* 4. DÃY ICON TIỆN ÍCH LẮC LƯ NỔI BÊN PHẢI (FLOATING DOCK) */}
      <FloatingDock
        onNavigate={onNavigate}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />

      {/* 5. CÁC MODAL VÀ POPUP TOÀN CỤC CHO KHÁCH HÀNG */}
      <CartDrawer onNavigate={onNavigate} />
      <AuthModal onNavigate={onNavigate} />
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
      <QuickViewModal
        product={quickViewProduct}
        onClose={handleCloseQuickView}
      />
      <AiAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onQuickView={handleOpenQuickView}
        onNavigate={onNavigate}
      />
    </div>
  );
}
