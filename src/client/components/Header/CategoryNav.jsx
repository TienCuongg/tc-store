/**
 * ==============================================================================
 * 🧭 THANH ĐIỀU HƯỚNG DANH MỤC THƯƠNG HIỆU (CATEGORY NAV STRIP)
 * ==============================================================================
 * - "Lọc Sản Phẩm": Chuyển trực tiếp đến trang category để lọc đa tiêu chí
 * - Giày Nike, Adidas: Menu dropdown chọn nhanh theo bộ môn (Running, Training, Lifestyle)
 * - Asics, Lacoste, Puma, Pickleball: Điều hướng lọc theo thương hiệu/bộ môn
 * - Sale: Lọc sản phẩm đang giảm giá
 * - Bảng Tin: Chuyển đến trang tin tức TC Feed
 * ==============================================================================
 */

import React from 'react';

export default function CategoryNav({ onNavigate }) {
  return (
    <nav className="category-menu-strip" aria-label="Danh mục thương hiệu">
      <div className="container menu-strip-inner">
        <ul className="nav-brand-links">
          {/* Lọc Sản Phẩm (Chuyển trực tiếp đến trang lọc - không hiện dropdown) */}
          <li>
            <a
              href="?page=category"
              className="menu-brand-link"
              style={{ color: 'var(--color-terracotta)', fontWeight: 800 }}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category');
              }}
            >
              <svg className="menu-inline-svg" viewBox="0 0 24 24" style={{ fill: 'var(--color-terracotta)' }}>
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
              </svg>
              <span>Lọc Sản Phẩm</span>
            </a>
          </li>

          {/* Nike */}
          <li className="nav-item-dropdown">
            <a
              href="?page=category&brand=Nike"
              className="menu-brand-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category', { brand: 'Nike' });
              }}
            >
              <svg className="menu-inline-svg" viewBox="0 0 24 24">
                <path d="M21.7 8.3c-2.4 2.8-6.8 6.5-12.8 9.5-3.1 1.5-6.7 2.2-8.9 1.1-1.3-.7-1.4-2.2-.2-3.8 1.4-1.9 4-3.8 7-5.3 5.4-2.6 11.2-3.8 14.9-1.5z" />
              </svg>
              <span>Giày Nike</span>
              <svg className="chevron-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
            <div className="dropdown-panel">
              <a
                href="?page=category&brand=Nike&category=running"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('category', { brand: 'Nike', category: 'running' });
                }}
              >
                Giày Nike Chạy Bộ (Pegasus, Vomero)
              </a>
              <a
                href="?page=category&brand=Nike&category=training"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('category', { brand: 'Nike', category: 'training' });
                }}
              >
                Giày Nike Tập Gym (Metcon)
              </a>
              <a
                href="?page=category&brand=Nike&category=lifestyle"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('category', { brand: 'Nike', category: 'lifestyle' });
                }}
              >
                Giày Nike Lifestyle & Sneaker
              </a>
            </div>
          </li>

          {/* Adidas */}
          <li className="nav-item-dropdown">
            <a
              href="?page=category&brand=Adidas"
              className="menu-brand-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category', { brand: 'Adidas' });
              }}
            >
              <svg className="menu-inline-svg" viewBox="0 0 24 24">
                <polygon points="1.5,19 5.5,19 9.5,12 5.5,12" />
                <polygon points="8,19 12,19 16,8 12,8" />
                <polygon points="14.5,19 18.5,19 22.5,4 18.5,4" />
              </svg>
              <span>Giày Adidas</span>
              <svg className="chevron-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
            <div className="dropdown-panel">
              <a
                href="?page=category&brand=Adidas&category=running"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('category', { brand: 'Adidas', category: 'running' });
                }}
              >
                Giày Adidas Chạy Bộ (Ultraboost, Adizero)
              </a>
              <a
                href="?page=category&brand=Adidas&category=lifestyle"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('category', { brand: 'Adidas', category: 'lifestyle' });
                }}
              >
                Giày Adidas Originals (Samba, Stan Smith)
              </a>
            </div>
          </li>

          {/* Asics */}
          <li>
            <a
              href="?page=category&brand=Asics"
              className="menu-brand-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category', { brand: 'Asics' });
              }}
            >
              <svg className="menu-inline-svg" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-3 .5-5.5-1.5-5.5-4s2-4.5 4.5-4.5c1.5 0 2.5.5 3 1l-1.5 1.5c-.5-.5-1-.7-1.5-.7-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5c1 0 1.5-.5 2-1v-.8h-2v-1.8h3.8v3.3c-.8 1.2-2 1.8-3.8 2z" />
              </svg>
              <span>Giày Asics</span>
            </a>
          </li>

          {/* Lacoste */}
          <li>
            <a
              href="?page=category&brand=Lacoste"
              className="menu-brand-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category', { brand: 'Lacoste' });
              }}
            >
              <svg className="menu-inline-svg" viewBox="0 0 24 24">
                <path d="M19 8c-1-1-3-1-4-1-2 0-3 1-5 2-1 0-2 0-3-1-1 0-2 1-2 2s1 2 2 2h1c1 1 2 2 4 2 3 0 5-1 6-2 1-1 2-2 1-4zm-8 2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
              </svg>
              <span>Giày Lacoste</span>
            </a>
          </li>

          {/* Puma */}
          <li>
            <a
              href="?page=category&brand=Puma"
              className="menu-brand-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category', { brand: 'Puma' });
              }}
            >
              <svg className="menu-inline-svg" viewBox="0 0 24 24">
                <path d="M19.5 5.5c-.8.6-1.8.8-2.7.7-1.2-.1-2.3-.7-3.2-1.5-.5-.4-.9-.9-1.2-1.4-.4-.7-.9-.9-1.6-.6-.7.3-1.1.9-1.3 1.6-.3 1.1-.3 2.2 0 3.3.4 1.3 1.2 2.3 2.3 3.1 1.6 1.2 3.5 1.7 5.5 1.6 1-.1 2-.3 3-.7-.2-.7-.5-1.4-1-2-.6-.8-1.5-1.4-2.5-1.7-.8-.2-1.7-.1-2.5.2-.4.1-.7.2-1 .4.2-.6.5-1.2 1-1.7.7-.7 1.6-1.1 2.6-1.2 1.2-.1 2.4.3 3.4 1 .3-.7.5-1.5.6-2.3 0-.1 0-.3-.1-.4-.3-.3-.8-.3-1.3.1z" />
              </svg>
              <span>Giày Puma</span>
            </a>
          </li>

          {/* Pickleball */}
          <li>
            <a
              href="?page=category&category=pickleball"
              className="menu-brand-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category', { category: 'pickleball' });
              }}
            >
              <svg className="menu-inline-svg" viewBox="0 0 24 24">
                <path d="M14.5 2C11.5 2 9 4.5 9 7.5c0 1.2.4 2.3 1.1 3.2L4 16.8c-.8.8-.8 2 0 2.8l.4.4c.8.8 2 .8 2.8 0l6.1-6.1c.9.7 2 1.1 3.2 1.1 3 0 5.5-2.5 5.5-5.5S17.5 2 14.5 2zm-9 16.5l-.3-.3c-.2-.2-.2-.5 0-.7l3.8-3.8.9.9-3.7 3.9c-.2.2-.5.2-.7 0zm9-8c-2 0-3.5-1.5-3.5-3.5S12.5 3.5 14.5 3.5 18 5 18 7s-1.5 3.5-3.5 3.5z" />
              </svg>
              <span>Pickleball</span>
            </a>
          </li>

          {/* Thể Thao */}
          <li className="nav-item-dropdown">
            <a
              href="?page=category"
              className="menu-brand-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category');
              }}
            >
              <svg className="menu-inline-svg" viewBox="0 0 24 24">
                <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" />
              </svg>
              <span>Thể Thao</span>
              <svg className="chevron-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
            <div className="dropdown-panel">
              <a
                href="?page=category&category=running"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('category', { category: 'running' });
                }}
              >
                Giày Chạy Bộ Marathon
              </a>
              <a
                href="?page=category&category=training"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('category', { category: 'training' });
                }}
              >
                Giày Tập Gym & Fitness
              </a>
              <a
                href="?page=category&category=pickleball"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('category', { category: 'pickleball' });
                }}
              >
                Giày Pickleball Sân Đấu
              </a>
            </div>
          </li>

          {/* Sale */}
          <li>
            <a
              href="?page=category&sale=true"
              className="menu-brand-link text-flash-sale"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('category', { sale: 'true' });
              }}
            >
              <svg className="menu-inline-svg" viewBox="0 0 24 24" style={{ fill: '#DC2626' }}>
                <path d="M7 2v11h3v9l7-12h-4l4-8z" />
              </svg>
              <span>Sale</span>
            </a>
          </li>

          {/* Bảng Tin */}
          <li>
            <a
              href="/blog"
              className="menu-brand-link"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('blog');
              }}
            >
              <svg className="menu-inline-svg" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              <span>Bảng Tin</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
