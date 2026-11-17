/**
 * =========================================================================================
 * 📁 TỆP: src/components/Header/MainHeader.jsx
 * 🎯 CHỨC NĂNG: HEADER CHÍNH (LOGO MYSHOES STYLE, TÌM KIẾM AI TYPEWRITER, TÀI KHOẢN, GIỎ HÀNG)
 * =========================================================================================
 * 
 * Khớp chuẩn 100% với cấu trúc class trong styles.css:
 * - Logo: .brand-logo, .logo-text-title, .logo-sub-tag, .dot-badge
 * - Tìm kiếm: .header-search-box, .search-input-wrap, .search-input-control, .search-typewriter-display, .btn-search-round
 * - Nút bên phải: .header-actions-right, .header-action-btn, .action-circle-icon, .action-caption
 * =========================================================================================
 */

import React, { useState, useEffect } from 'react';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';

const searchPhrases = [
  "Tìm kiếm giày thông minh bằng AI...",
  "Hỗ trợ đổi hàng dễ dàng 30 ngày...",
  "Sản phẩm chính hãng 100%...",
  "Freeship toàn quốc từ 1.500.000₫...",
  "Bảo hành keo chỉ 12 tháng uy tín..."
];

export default function MainHeader({ onNavigate, onOpenAiAssistant }) {
  const { totalCount, openCartDrawer } = useCart();
  const { authUser, openAuthModal } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [typewriterText, setTypewriterText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Hiệu ứng chữ chạy Typewriter mô phỏng AI tìm kiếm
  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let delay = 90;
    let timerId;

    function tick() {
      const phrase = searchPhrases[phraseIndex];

      if (!isDeleting) {
        charIndex++;
        setTypewriterText(phrase.substring(0, charIndex));
        if (charIndex >= phrase.length) {
          isDeleting = true;
          delay = 2000;
        } else {
          delay = 70;
        }
      } else {
        charIndex--;
        setTypewriterText(phrase.substring(0, charIndex));
        if (charIndex <= 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % searchPhrases.length;
          delay = 400;
        } else {
          delay = 35;
        }
      }
      timerId = setTimeout(tick, delay);
    }

    timerId = setTimeout(tick, delay);
    return () => clearTimeout(timerId);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (keyword.trim()) {
      onNavigate('category', { search: keyword.trim() });
    }
  };

  const handleAccountClick = () => {
    if (authUser.isLoggedIn) {
      onNavigate('profile');
    } else {
      openAuthModal('login');
    }
  };

  const showTypewriter = !isFocused && keyword.trim().length === 0;

  return (
    <div className="main-header-strip">
      <div className="container main-header-row">
        
        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="btn-menu-mobile md-hidden"
          onClick={() => onNavigate('category')}
          aria-label="Mở menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* 1. Brand Logo (Chuẩn MyShoes class brand-logo) */}
        <a
          href="/"
          className="brand-logo"
          aria-label="TC SPORT Trang chủ"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <div className="logo-text-title">tc<span>sport</span></div>
          <div className="logo-sub-tag">Giày chính hãng!<span className="dot-badge">vn</span></div>
        </a>

        {/* 2. Thanh tìm kiếm thông minh AI (Typewriter Effect) */}
        <div className="header-search-box">
          <form className="search-input-wrap" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              id="search-input-main"
              className="search-input-control"
              placeholder=""
              autoComplete="off"
              aria-label="Tìm kiếm sản phẩm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            
            {/* Typewriter Placeholder Text */}
            <div
              className={`search-typewriter-display ${showTypewriter ? '' : 'hidden'}`}
              id="search-typewriter-box"
              onClick={() => {
                const el = document.getElementById('search-input-main');
                if (el) el.focus();
              }}
            >
              <span className="search-ai-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2z"/>
                </svg>
              </span>
              <span className="typewriter-text" id="search-typewriter-text">
                {typewriterText}
              </span>
            </div>

            {/* Nút bấm tìm kiếm tròn bên trong thanh search */}
            <button
              type="submit"
              className="btn-search-round"
              aria-label="Tìm kiếm"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        {/* 3. Phía bên phải: Trợ lý AI + Tài khoản + Giỏ hàng */}
        <div className="header-actions-right">

          {/* Nút Trợ lý AI Gemini */}
          <button
            type="button"
            className="header-action-btn btn-ai-chat-header"
            onClick={onOpenAiAssistant}
            title="Mở Trợ lý AI Gemini tư vấn chọn giày"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: 0
            }}
          >
            <div
              className="action-circle-icon"
              style={{
                background: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
                color: '#FFF',
                boxShadow: '0 2px 8px rgba(194, 65, 12, 0.4)'
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#FFFFFF">
                <path d="M12 2L14.4 7.6L20 8.4L16 12.3L17 18L12 15.2L7 18L8 12.3L4 8.4L9.6 7.6L12 2Z" />
              </svg>
            </div>
            <div className="action-caption md-visible">
              <span className="caption-primary" style={{ color: 'var(--color-terracotta)', fontWeight: 800 }}>
                Hỏi AI
              </span>
              <span className="caption-secondary">Tư vấn giày</span>
            </div>
          </button>
          
          {/* Nút Tài khoản */}
          <a
            href={authUser.isLoggedIn ? "/profile" : "#login"}
            className="header-action-btn"
            onClick={(e) => {
              e.preventDefault();
              handleAccountClick();
            }}
            title={authUser.isLoggedIn ? "Hồ sơ tài khoản cá nhân" : "Đăng nhập tài khoản"}
          >
            <div className="action-circle-icon">
              {authUser.isLoggedIn && authUser.avatar ? (
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              )}
            </div>
            <div className="action-caption md-visible">
              <span className="caption-primary">Tài khoản</span>
              <span className="caption-secondary">
                {authUser.isLoggedIn ? (authUser.name?.split(' ').pop() || 'Hồ sơ') : 'Đăng nhập'}
              </span>
            </div>
          </a>

          {/* Nút Giỏ hàng */}
          <a
            href="/cart"
            className="header-action-btn cart-btn-action"
            onClick={(e) => {
              e.preventDefault();
              openCartDrawer();
            }}
            title="Xem giỏ hàng của bạn"
          >
            <div className="action-circle-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="cart-pill-badge" id="cart-counter">
                {totalCount}
              </span>
            </div>
            <div className="action-caption md-visible">
              <span className="caption-primary">Giỏ hàng</span>
              <span className="caption-secondary">Xem giỏ</span>
            </div>
          </a>

        </div>

      </div>
    </div>
  );
}
