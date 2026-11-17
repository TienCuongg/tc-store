/**
 * =========================================================================================
 * 📁 TỆP: src/pages/HomePage.jsx
 * 🎯 CHỨC NĂNG: TRANG CHỦ GIAO DIỆN CHUẨN NGUYÊN BẢN (EXACT MYSHOES HOMEPAGE LAYOUT)
 * =========================================================================================
 * 
 * Khớp chuẩn 100% với CSS trong styles.css:
 * 1. .banner-commercial-section: Hệ thống 3 banner bất đối xứng (App QR + Siêu Sale + TC Group)
 * 2. .trust-bar-section: 4 cam kết vàng hình viên thuốc (Chính hãng, Đổi hàng, Uy tín, Bảo hành 12 tháng)
 * 3. .products-block-section:
 *    - HÀNG MỚI VỀ (.badge-red-pulse + .section-heading-text + .grid-5-columns)
 *    - FLASH SALE (.bolt-icon + .section-heading-flash + .grid-5-columns)
 * 4. .tcfeed-section: BÀI VIẾT TC FEED MỚI (.tcfeed-grid-5)
 * 5. .brand-pills-section: Dải thương hiệu chuẩn SVG ở chân trang
 * =========================================================================================
 */

import React, { useState, useEffect } from 'react';
import { NEW_ARRIVALS, FLASH_SALE_ITEMS, getStoredProducts } from '../../data/products';
import ProductCard from '../components/Common/ProductCard';

const TC_FEED_ARTICLES = [
  {
    id: 1,
    title: "20/10 Tặng Gì Cho Nàng? TOP Giày Nữ Đẹp Khiến Chị Em Mê Mẩn Ngay",
    date: "19/10/2026",
    views: 704,
    image: "assets/images/blog-womens-gift.jpg",
    author: "TC SPORT Official"
  },
  {
    id: 2,
    title: "ASICS Solution Speed FF 4: Nhẹ Bất Ngờ, Linh Hoạt Tối Đa Trên Sân",
    date: "16/10/2026",
    views: 713,
    image: "assets/images/blog-tennis-court.jpg",
    author: "TC SPORT Official"
  },
  {
    id: 3,
    title: "Nike Metcon 10 Có Gì Mà Dân Gym Không Thể Bỏ Qua?",
    date: "13/10/2026",
    views: 726,
    image: "assets/images/shoe-metcon-volt.jpg",
    author: "TC SPORT Official"
  },
  {
    id: 4,
    title: "Nike Vapor 12 HC: Vũ Khí Bứt Tốc Thượng Hạng Trên Sân Cứng",
    date: "08/10/2026",
    views: 738,
    image: "assets/images/shoe-pegasus-blue.jpg",
    author: "TC SPORT Official"
  },
  {
    id: 5,
    title: "Nike Revolution 8 - Tân Binh Giá Mềm Của Nike Có Đáng Mua?",
    date: "05/10/2026",
    views: 831,
    image: "assets/images/shoe-running-pro.jpg",
    author: "TC SPORT Official"
  }
];

export default function HomePage({ onNavigate, onQuickView }) {
  const [productsList, setProductsList] = useState(() => getStoredProducts());

  useEffect(() => {
    import('../../services/api').then(({ api }) => {
      api.products.getAll().then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setProductsList(res);
        }
      }).catch(() => {});
    }).catch(() => {});

    const handleUpdate = () => setProductsList(getStoredProducts());
    window.addEventListener('tc_products_updated', handleUpdate);
    return () => window.removeEventListener('tc_products_updated', handleUpdate);
  }, []);

  const newArrivals = productsList.filter((p) => p.badgeNew).length > 0
    ? productsList.filter((p) => p.badgeNew).slice(0, 5)
    : productsList.slice(0, 5);

  const flashSaleItems = productsList.filter((p) => p.badgeSale || p.discount).length > 0
    ? productsList.filter((p) => p.badgeSale || p.discount).slice(0, 5)
    : productsList.slice(0, 5);

  return (
    <main className="page-body-container">
      
      {/* =========================================================================
           1. COMMERCIAL BANNER GRID (Exact MyShoes 3-Banner Asymmetric Layout)
           ========================================================================= */}
      <section className="banner-commercial-section container" aria-label="Banner quảng cáo chính">
        <div className="commercial-banner-grid">
          
          {/* Banner 1: Left 2/3 (App TC SPORT + QR Code + Athletes + App Store / Google Play) */}
          <a
            href="#app"
            className="banner-cell banner-app-main"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('category');
            }}
          >
            <img
              src="assets/images/banner-app-qr.jpg"
              alt="Tải App TC SPORT - Siêu ứng dụng mua giày chính hãng"
              className="img-fluid-banner"
            />
          </a>

          {/* Banner 2: Right Top (SIÊU SALE - Giá sale tốt nhất - Số lượng có hạn) */}
          <a
            href="#flash-sale"
            className="banner-cell banner-sieu-sale"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('category', { sale: 'true' });
            }}
          >
            <img
              src="assets/images/banner-sieu-sale.jpg"
              alt="Siêu Sale TC SPORT - Giá tốt nhất số lượng có hạn"
              className="img-fluid-banner"
            />
          </a>

          {/* Banner 3: Right Bottom (TC SPORT - Giày Chính Hãng 100%) */}
          <a
            href="#catalog"
            className="banner-cell banner-tcgroup"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('category');
            }}
          >
            <img
              src="assets/images/banner-tcgroup.jpg"
              alt="TC SPORT - Giày Chính Hãng 100%"
              className="img-fluid-banner"
            />
          </a>

        </div>
      </section>

      {/* =========================================================================
           2. PREMIUM TRUST BAR (Exact MyShoes 4 Cam Kết Vàng)
           ========================================================================= */}
      <section className="trust-bar-section container" aria-label="Cam kết bán hàng">
        <div className="trust-container-card">
          <div className="trust-items-grid">
            
            {/* Cam kết 1: Chính hãng 100% */}
            <div className="trust-pill-item">
              <div className="trust-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"/>
                  <path d="M9 12.5l2 2 4-5"/>
                </svg>
              </div>
              <div className="trust-texts">
                <div className="trust-title-text">Chính hãng 100%</div>
                <div className="trust-desc-text">Sản phẩm chuẩn hãng</div>
              </div>
            </div>

            {/* Cam kết 2: Đổi hàng dễ dàng */}
            <div className="trust-pill-item">
              <div className="trust-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M7 7h11M18 7l-3-3M18 7l-3 3"/>
                  <path d="M17 17H6M6 17l3 3M6 17l3-3"/>
                </svg>
              </div>
              <div className="trust-texts">
                <div className="trust-title-text">Đổi hàng dễ dàng</div>
                <div className="trust-desc-text">Hỗ trợ đổi mẫu, đổi size</div>
              </div>
            </div>

            {/* Cam kết 3: Uy tín hàng đầu */}
            <div className="trust-pill-item">
              <div className="trust-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="trust-texts">
                <div className="trust-title-text">Uy tín hàng đầu</div>
                <div className="trust-desc-text">Khách hàng tin chọn</div>
              </div>
            </div>

            {/* Cam kết 4: Bảo hành 12 tháng */}
            <div className="trust-pill-item">
              <div className="trust-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"/>
                  <path d="M12 7v10M8.5 10.5h7"/>
                </svg>
              </div>
              <div className="trust-texts">
                <div className="trust-title-text">Bảo hành 12 tháng</div>
                <div className="trust-desc-text">An tâm sau mua</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
           3. SECTION 1: [NEW] HÀNG MỚI VỀ (Exact MyShoes 5-Column Grid Layout)
           ========================================================================= */}
      <section className="products-block-section container" id="catalog">
        
        {/* Heading Line: [NEW] HÀNG MỚI VỀ */}
        <div className="section-title-strip">
          <div className="title-left-group">
            <span className="badge-red-pulse">NEW</span>
            <h2 className="section-heading-text">HÀNG MỚI VỀ</h2>
          </div>
          <div className="title-right-group">
            <a
              href="#catalog"
              className="view-all-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category');
              }}
            >
              Xem tất cả <span>›</span>
            </a>
          </div>
        </div>

        {/* 5-Column Product Grid */}
        <div className="grid-5-columns" id="new-arrivals-grid">
          {newArrivals.map((item) => (
            <ProductCard key={item.id} product={item} onQuickView={onQuickView} />
          ))}
        </div>

      </section>

      {/* =========================================================================
           4. SECTION 2: ⚡ FLASH SALE (Exact MyShoes Flash Sale Row)
           ========================================================================= */}
      <section className="products-block-section container" id="flash-sale" style={{ marginTop: '36px' }}>
        
        {/* Heading Line: ⚡ FLASH SALE (Red Italic with View All) */}
        <div className="section-title-strip">
          <div className="title-left-group">
            <span className="bolt-icon">⚡</span>
            <h2 className="section-heading-flash">FLASH SALE</h2>
          </div>
          <div className="title-right-group">
            <a
              href="#flash-sale"
              className="view-all-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category', { sale: 'true' });
              }}
            >
              Xem tất cả <span>›</span>
            </a>
          </div>
        </div>

        {/* 5-Column Product Grid */}
        <div className="grid-5-columns" id="flash-sale-grid">
          {flashSaleItems.map((item) => (
            <ProductCard key={item.id} product={item} onQuickView={onQuickView} />
          ))}
        </div>

      </section>

      {/* =========================================================================
           5. BÀI VIẾT TC FEED MỚI (Exact Magazine Cards)
           ========================================================================= */}
      <section className="tcfeed-section container">
        <div className="tcfeed-header">
          <h2 className="tcfeed-title-text">BÀI VIẾT TC FEED MỚI</h2>
          <div className="tcfeed-carousel-ctrls">
            <button
              type="button"
              className="tcfeed-ctrl-btn"
              onClick={() => onNavigate('blog')}
            >
              ‹
            </button>
            <button
              type="button"
              className="tcfeed-ctrl-btn"
              onClick={() => onNavigate('blog')}
            >
              ›
            </button>
          </div>
        </div>

        {/* 5 Feed Cards Grid */}
        <div className="tcfeed-grid-5" id="tcfeed-grid-items">
          {TC_FEED_ARTICLES.map((art) => (
            <div
              key={art.id}
              className="tcfeed-card"
              onClick={() => onNavigate('blog')}
              role="button"
              tabIndex={0}
            >
              <div className="tcfeed-card-thumb">
                <img src={art.image} alt={art.title} loading="lazy" />
              </div>
              <div className="tcfeed-card-body">
                <div className="tcfeed-card-meta">
                  <span>{art.date}</span>
                  <span>👁️ {art.views}</span>
                </div>
                <div className="tcfeed-card-title">{art.title}</div>
                <div className="tcfeed-author-badge">
                  <div className="tcfeed-author-avatar">TC</div>
                  <span>{art.author}</span>
                  <span style={{ color: '#2563EB' }}>✓</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
           6. THƯƠNG HIỆU & BỘ MÔN CHÍNH HÃNG (Bottom Pills Bar)
           ========================================================================= */}
      <section className="brand-pills-section container">
        <div className="brand-pills-bar">
          
          <a
            href="#nike"
            className="brand-pill-btn"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('category', { brand: 'Nike' });
            }}
          >
            <div className="brand-pill-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21.7 8.3c-2.4 2.8-6.8 6.5-12.8 9.5-3.1 1.5-6.7 2.2-8.9 1.1-1.3-.7-1.4-2.2-.2-3.8 1.4-1.9 4-3.8 7-5.3 5.4-2.6 11.2-3.8 14.9-1.5z"/>
              </svg>
            </div>
            <span className="brand-pill-label">Nike</span>
          </a>

          <a
            href="#adidas"
            className="brand-pill-btn"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('category', { brand: 'Adidas' });
            }}
          >
            <div className="brand-pill-icon">
              <svg viewBox="0 0 24 24">
                <polygon points="1.5,19 5.5,19 9.5,12 5.5,12"/>
                <polygon points="8,19 12,19 16,8 12,8"/>
                <polygon points="14.5,19 18.5,19 22.5,4 18.5,4"/>
              </svg>
            </div>
            <span className="brand-pill-label">Adidas</span>
          </a>

          <a
            href="#lacoste"
            className="brand-pill-btn"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('category', { brand: 'Lacoste' });
            }}
          >
            <div className="brand-pill-icon">
              <svg viewBox="0 0 24 24">
                <path d="M19 8c-1-1-3-1-4-1-2 0-3 1-5 2-1 0-2 0-3-1-1 0-2 1-2 2s1 2 2 2h1c1 1 2 2 4 2 3 0 5-1 6-2 1-1 2-2 1-4zm-8 2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
              </svg>
            </div>
            <span className="brand-pill-label">Lacoste</span>
          </a>

          <a
            href="#puma"
            className="brand-pill-btn"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('category', { brand: 'Puma' });
            }}
          >
            <div className="brand-pill-icon">
              <svg viewBox="0 0 24 24">
                <path d="M19.5 5.5c-.8.6-1.8.8-2.7.7-1.2-.1-2.3-.7-3.2-1.5-.5-.4-.9-.9-1.2-1.4-.4-.7-.9-.9-1.6-.6-.7.3-1.1.9-1.3 1.6-.3 1.1-.3 2.2 0 3.3.4 1.3 1.2 2.3 2.3 3.1 1.6 1.2 3.5 1.7 5.5 1.6 1-.1 2-.3 3-.7-.2-.7-.5-1.4-1-2-.6-.8-1.5-1.4-2.5-1.7-.8-.2-1.7-.1-2.5.2-.4.1-.7.2-1 .4.2-.6.5-1.2 1-1.7.7-.7 1.6-1.1 2.6-1.2 1.2-.1 2.4.3 3.4 1 .3-.7.5-1.5.6-2.3 0-.1 0-.3-.1-.4-.3-.3-.8-.3-1.3.1z"/>
              </svg>
            </div>
            <span className="brand-pill-label">Puma</span>
          </a>

          <a
            href="#asics"
            className="brand-pill-btn"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('category', { brand: 'Asics' });
            }}
          >
            <div className="brand-pill-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-3 .5-5.5-1.5-5.5-4s2-4.5 4.5-4.5c1.5 0 2.5.5 3 1l-1.5 1.5c-.5-.5-1-.7-1.5-.7-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5c1 0 1.5-.5 2-1v-.8h-2v-1.8h3.8v3.3c-.8 1.2-2 1.8-3.8 2z"/>
              </svg>
            </div>
            <span className="brand-pill-label">Asics</span>
          </a>

          <a
            href="#clarks"
            className="brand-pill-btn"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('category', { brand: 'TC Sport' });
            }}
          >
            <div className="brand-pill-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 16c-1.5 0-3-1-3-3s1.5-3 3-3c.5 0 1 .1 1.5.3V8c-.5-.1-1-.1-1.5-.1-2.8 0-5 2.2-5 5s2.2 5 5 5c.5 0 1 0 1.5-.1v-2.2c-.5.2-1 .4-1.5.4zM3 13c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5zm2 0c0 1.7 1.3 3 3 3s3-1.3 3-3-1.3-3-3-3-3 1.3-3 3z"/>
              </svg>
            </div>
            <span className="brand-pill-label">TC Sport</span>
          </a>

        </div>
      </section>

    </main>
  );
}
