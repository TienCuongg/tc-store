/**
 * =========================================================================================
 * 📁 TỆP: src/App.jsx
 * 🎯 CHỨC NĂNG: ĐIỀU PHỐI ĐIỀU HƯỚNG TRANG & CÁC MODAL TOÀN CỤC (ROOT ROUTER & MODAL MANAGER)
 * =========================================================================================
 * 
 * 📌 VỊ TRÍ TRÊN GIAO DIỆN:
 *    - Là component gốc bao bọc toàn bộ ứng dụng web TC SPORT.
 * 
 * 📌 CÁC NHIỆM VỤ CHÍNH:
 *    1. ĐIỀU HƯỚNG TRANG (Page Router):
 *       - Quản lý state `currentPage`:
 *         + 'home'     -> <HomePage />     (Trang chủ: banner, flash sale, hàng mới)
 *         + 'category' -> <CategoryPage /> (Trang danh mục & bộ lọc thương hiệu, size, giá)
 *         + 'cart'     -> <CartPage />     (Trang đặt hàng thanh toán)
 *         + 'profile'  -> <ProfilePage />  (Trang tài khoản cá nhân & lịch sử đơn hàng)
 *         + 'blog'     -> <BlogPage />     (Trang tin tức & cẩm nang chọn giày)
 *       - Hỗ trợ đổi URL query (?page=category&brand=Nike) và nút Back/Forward trình duyệt (popstate).
 * 
 *    2. QUẢN LÝ GIAO DIỆN THEME (MÀU HEADER):
 *       - Quản lý 5 tông màu: Trắng thanh lịch, Be cát vintage, Đen huyền bí, Xanh thể thao, Nâu đất.
 * 
 *    3. ĐIỀU KHIỂN CÁC POPUP TOÀN CỤC:
 *       - <CartDrawer />     : Giỏ hàng trượt từ bên phải
 *       - <AuthModal />      : Popup Đăng nhập / Đăng ký / Google Auth
 *       - <SizeGuideModal /> : Bảng đo chân tính size chuẩn
 *       - <QuickViewModal /> : Popup xem nhanh sản phẩm không cần tải lại trang
 *       - <Toast />          : Hộp thông báo phản hồi thao tác người dùng
 *       - <FloatingDock />   : Dãy icon tiện ích nổi lắc lư bên phải màn hình
 * =========================================================================================
 */

import React, { useState, useEffect } from 'react';
import AdminApp from './admin/AdminApp';
import ClientApp from './client/ClientApp';
import Toast from './client/components/Common/Toast';
import { getStoredProducts } from './data/products';

export default function App() {
  // -------------------------------------------------------------
  // 1. STATE QUẢN LÝ ĐIỀU HƯỚNG TRANG (ROOT URL ROUTER)
  // -------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState({});
  const [currentTheme, setCurrentTheme] = useState('theme-beige');

  // Đọc tham số URL ban đầu hoặc khi người dùng ấn Back / Forward trên trình duyệt
  useEffect(() => {
    const handleUrl = () => {
      const pathname = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      
      let page = searchParams.get('page');
      let article = searchParams.get('article');

      // Nếu không truyền ?page= thì bóc tách Friendly SEO Clean URL từ pathname: /blog/bai_viet1, /cart, /admin...
      if (!page) {
        const segments = pathname.replace(/^\/+|\/+$/g, '').split('/');
        const first = segments[0] || '';

        if (first === 'blog' || first === 'tin-tuc' || first === 'bang-tin') {
          page = 'blog';
          if (segments[1]) {
            article = decodeURIComponent(segments[1]);
          }
        } else if (first === 'cart' || first === 'gio-hang') {
          page = 'cart';
        } else if (first === 'profile' || first === 'tai-khoan') {
          page = 'profile';
        } else if (first === 'admin' || first === 'quan-tri') {
          page = 'admin';
        } else if (first === 'category' || first === 'san-pham' || first === 'shop') {
          page = 'category';
        } else if (!first || first === 'home' || first === 'trang-chu') {
          page = 'home';
        } else {
          page = 'home';
        }
      }

      const brand = searchParams.get('brand');
      const category = searchParams.get('category');
      const sale = searchParams.get('sale');
      const search = searchParams.get('search');

      setCurrentPage(page);
      setPageParams({ brand, category, sale, search, article });
    };

    handleUrl();
    window.addEventListener('popstate', handleUrl);
    return () => window.removeEventListener('popstate', handleUrl);
  }, []);

  // Cập nhật lớp màu Theme vào thẻ body của website
  useEffect(() => {
    document.body.className = `theme-warm-beige ${currentTheme}`;
  }, [currentTheme]);

  // Hàm chuyển trang mượt mà và cập nhật URL chuẩn SEO trên thanh địa chỉ trình duyệt (HTML5 PushState)
  const navigate = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);

    let basePath = '/';
    if (page === 'blog') {
      basePath = params.article ? `/blog/${encodeURIComponent(params.article)}` : '/blog';
    } else if (page === 'cart') {
      basePath = '/cart';
    } else if (page === 'profile') {
      basePath = '/profile';
    } else if (page === 'admin') {
      basePath = '/admin';
    } else if (page === 'category') {
      basePath = '/category';
    } else if (page === 'home') {
      basePath = '/';
    }

    const searchParams = new URLSearchParams();
    if (params.brand && params.brand !== 'all') {
      searchParams.set('brand', params.brand);
    }
    if (params.category && params.category !== 'all') {
      searchParams.set('category', params.category);
    }
    if (params.sale) {
      searchParams.set('sale', params.sale);
    }
    if (params.search) {
      searchParams.set('search', params.search);
    }

    const queryStr = searchParams.toString();
    const newUrl = queryStr ? `${basePath}?${queryStr}` : basePath;
    window.history.pushState({}, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // PHÂN LUỒNG 1: PHÂN HỆ QUẢN TRỊ ADMIN (SEPARATE ADMIN MODULE)
  // =========================================================================
  if (currentPage === 'admin') {
    return (
      <div className="app-admin-root">
        <AdminApp onNavigate={navigate} />
        <Toast />
      </div>
    );
  }

  // =========================================================================
  // PHÂN LUỒNG 2: PHÂN HỆ NGƯỜI DÙNG MUA HÀNG (STOREFRONT CLIENT MODULE)
  // =========================================================================
  return (
    <div className="app-storefront-root">
      <ClientApp
        currentPage={currentPage}
        pageParams={pageParams}
        onNavigate={navigate}
        currentTheme={currentTheme}
        onChangeTheme={(themeId) => setCurrentTheme(themeId)}
      />
      <Toast />
    </div>
  );
}
