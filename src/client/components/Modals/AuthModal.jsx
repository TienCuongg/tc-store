/**
 * =========================================================================================
 * 📁 TỆP: src/components/Modals/AuthModal.jsx
 * 🎯 CHỨC NĂNG: POPUP ĐĂNG NHẬP / ĐĂNG KÝ / GOOGLE AUTH (EXACT AUTH-MODAL REPLICA)
 * =========================================================================================
 * 
 * Khớp chuẩn 100% với styles.css:
 * - .modal-backdrop.active, #auth-modal
 * - .modal-dialog.auth-dialog
 * - .btn-close-modal.auth-close-btn
 * - .auth-tabs-header, .auth-tab-btn.active
 * - .modal-dialog-body
 * - .btn-google-login, .google-icon-svg
 * - .auth-social-divider
 * - .form-group, .form-label, .form-control
 * - .auth-footer-help
 * - .auth-submit-btn
 * =========================================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { useAuth, GOOGLE_CLIENT_ID } from '../../../context/AuthContext';

export default function AuthModal({ onNavigate }) {
  const { isAuthModalOpen, authMode, setAuthMode, closeAuthModal, login, register, googleLogin, handleGoogleCredential } = useAuth();

  const [identity, setIdentity] = useState('khachhang@tcsport.vn');
  const [password, setPassword] = useState('123456');
  const [regName, setRegName] = useState('Nguyễn Văn Tiến');
  const [regPhone, setRegPhone] = useState('0973711868');
  const [regEmail, setRegEmail] = useState('tien.nguyen@tcsport.vn');
  const [regPassword, setRegPassword] = useState('123456');
  const [googleLoaded, setGoogleLoaded] = useState(false);

  const googleBtnRef = useRef(null);

  // Khởi tạo và kết nối dịch vụ Google Identity Services (GIS SDK)
  useEffect(() => {
    if (!isAuthModalOpen) return;

    let isMounted = true;

    const renderGoogleBtn = () => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => {
              if (response && response.credential) {
                const user = handleGoogleCredential(response.credential);
                if (user && onNavigate) {
                  onNavigate('profile');
                }
              }
            },
            auto_select: false,
            cancel_on_tap_outside: true
          });

          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'outline',
            size: 'large',
            width: 380,
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left'
          });

          if (isMounted) setGoogleLoaded(true);
        } catch (err) {
          console.warn('Google GSI renderButton notice:', err);
        }
      }
    };

    if (window.google?.accounts?.id) {
      renderGoogleBtn();
    } else {
      const timer = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(timer);
          renderGoogleBtn();
        }
      }, 200);
      return () => {
        isMounted = false;
        clearInterval(timer);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthModalOpen, handleGoogleCredential, onNavigate]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(identity, password);
    closeAuthModal();
    if (onNavigate) onNavigate('profile');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register(regName, regPhone, regEmail, regPassword);
    closeAuthModal();
    if (onNavigate) onNavigate('profile');
  };

  const handleGoogleClick = () => {
    googleLogin();
    closeAuthModal();
    if (onNavigate) onNavigate('profile');
  };

  return (
    <div
      className={`modal-backdrop ${isAuthModalOpen ? 'active' : ''}`}
      id="auth-modal"
      onClick={closeAuthModal}
    >
      <div className="modal-dialog auth-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Nút đóng góc phải */}
        <button
          type="button"
          className="btn-close-modal auth-close-btn"
          onClick={closeAuthModal}
          title="Đóng cửa sổ"
        >
          ✕
        </button>

        {/* 2 Tabs chuyển đổi: ĐĂNG NHẬP / ĐĂNG KÝ */}
        <div className="auth-tabs-header">
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
            id="btn-tab-login"
            onClick={() => setAuthMode('login')}
          >
            ĐĂNG NHẬP
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
            id="btn-tab-register"
            onClick={() => setAuthMode('register')}
          >
            ĐĂNG KÝ MỚI
          </button>
        </div>

        <div className="modal-dialog-body">
          
          {/* Nút đăng nhập Google chính thức từ Google Identity Services */}
          <div
            ref={googleBtnRef}
            id="google-official-btn-slot"
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              minHeight: googleLoaded ? '44px' : '0px',
              marginBottom: googleLoaded ? '14px' : '0px'
            }}
          ></div>

          {/* Nút đăng nhập phụ nếu Google SDK đang tải */}
          {!googleLoaded && (
            <button
              type="button"
              className="btn-google-login"
              onClick={handleGoogleClick}
            >
              <svg className="google-icon-svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Đăng nhập nhanh với Google</span>
            </button>
          )}

          <div className="auth-social-divider">
            <span>HOẶC SỬ DỤNG EMAIL / SĐT</span>
          </div>

          {/* FORM 1: ĐĂNG NHẬP */}
          {authMode === 'login' ? (
            <form id="auth-tab-login-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label">Email hoặc Số điện thoại *</label>
                <input
                  type="text"
                  id="auth-login-identity"
                  className="form-control"
                  required
                  placeholder="Nhập email hoặc SĐT..."
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mật khẩu *</label>
                <input
                  type="password"
                  id="auth-login-password"
                  className="form-control"
                  required
                  placeholder="Nhập mật khẩu..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="auth-footer-help">
                <label style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <input
                    type="checkbox"
                    defaultChecked
                    style={{ accentColor: 'var(--color-terracotta)', width: '16px', height: '16px' }}
                  /> Ghi nhớ đăng nhập
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Vui lòng liên hệ hotline 0973.711.868 để lấy lại mật khẩu nhanh!');
                  }}
                  style={{ color: 'var(--color-terracotta)', fontWeight: 700, textDecoration: 'none' }}
                >
                  Quên mật khẩu?
                </a>
              </div>

              <button type="submit" className="auth-submit-btn">
                ĐĂNG NHẬP NGAY
              </button>
            </form>
          ) : (
            /* FORM 2: ĐĂNG KÝ */
            <form id="auth-tab-register-form" onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label className="form-label">Họ và tên của bạn *</label>
                <input
                  type="text"
                  id="auth-reg-name"
                  className="form-control"
                  required
                  placeholder="VD: Nguyễn Văn An"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Số điện thoại *</label>
                <input
                  type="tel"
                  id="auth-reg-phone"
                  className="form-control"
                  required
                  placeholder="VD: 0912345678"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Địa chỉ Email *</label>
                <input
                  type="email"
                  id="auth-reg-email"
                  className="form-control"
                  required
                  placeholder="VD: yourname@gmail.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mật khẩu mới *</label>
                <input
                  type="password"
                  id="auth-reg-password"
                  className="form-control"
                  required
                  placeholder="Tối thiểu 6 ký tự..."
                  minLength={6}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="auth-submit-btn">
                TẠO TÀI KHOẢN MỚI
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
