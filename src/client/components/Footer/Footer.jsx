/**
 * =========================================================================================
 * 📁 TỆP: src/components/Footer/Footer.jsx
 * 🎯 CHỨC NĂNG: TOÀN BỘ CHÂN TRANG HỆ THỐNG (EXACT SITE-FOOTER-FULL REPLICA)
 * =========================================================================================
 * 
 * Khớp chuẩn 100% với CSS trong styles.css:
 * - .site-footer-full
 * - .footer-top-columns:
 *    + Col 1: .footer-brand-title, .footer-tagline, .footer-about-text, .footer-social-icons
 *    + Col 2: CHÍNH SÁCH
 *    + Col 3: VỀ TC SPORT
 *    + Col 4: TỔNG ĐÀI HỖ TRỢ, .footer-hotline-card, THANH TOÁN AN TOÀN (.payment-badges-row)
 * - .footer-middle-divider
 * - .footer-bottom-columns: Thông tin pháp lý TCGroup, Hệ sinh thái, Con dấu Bộ Công Thương & DMCA
 * =========================================================================================
 */

import React from 'react';

export default function Footer({ onNavigate, onOpenSizeGuide }) {
  return (
    <footer className="site-footer-full">
      <div className="container">
        
        {/* Top 4 Columns (Brand, Policies, About, Support & Payment) */}
        <div className="footer-top-columns">
          
          {/* Col 1: Brand & Social */}
          <div>
            <div className="footer-brand-title">TC SPORT<span>.vn</span></div>
            <div className="footer-tagline">Giày chính hãng! • VN</div>
            <p className="footer-about-text">
              TC SPORT là nền tảng mua sắm giày chính hãng hàng đầu Việt Nam với hơn 100.000 khách hàng đã tin tưởng và lựa chọn. Cùng với công nghệ hiện đại chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời nhất.
            </p>
            <div className="footer-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="TikTok">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: CHÍNH SÁCH */}
          <div>
            <h4 className="footer-heading">CHÍNH SÁCH</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#cart" onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}>
                  Thanh toán & giao hàng
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Chính sách bảo mật dữ liệu tuyệt đối theo tiêu chuẩn ISO 27001'); }}>
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Điều khoản dịch vụ và sử dụng nền tảng TC SPORT'); }}>
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a
                  href="#sizeguide"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenSizeGuide) onOpenSizeGuide();
                  }}
                >
                  Bảng quy đổi kích cỡ giày chuẩn
                </a>
              </li>
              <li>
                <a href="#returns" onClick={(e) => { e.preventDefault(); alert('Chính sách đổi size trong 30 ngày hoàn toàn miễn phí'); }}>
                  Chính sách khách hàng
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: VỀ TC SPORT */}
          <div>
            <h4 className="footer-heading">VỀ TC SPORT</h4>
            <ul className="footer-links-list">
              <li>
                <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}>
                  Tin tức & Bảng tin TC Feed
                </a>
              </li>
              <li>
                <a href="#profile" onClick={(e) => { e.preventDefault(); onNavigate('profile'); }}>
                  Liên hệ hỗ trợ TC SPORT
                </a>
              </li>
              <li>
                <a href="#app" onClick={(e) => { e.preventDefault(); alert('Ứng dụng di động TC SPORT trên App Store & Google Play'); }}>
                  Giới thiệu App TC SPORT
                </a>
              </li>
              <li>
                <a href="#group" onClick={(e) => { e.preventDefault(); alert('Tập đoàn công nghệ và bán lẻ thời trang thể thao TCGROUP'); }}>
                  Thông tin TCGROUP
                </a>
              </li>
              <li>
                <a href="#catalog" onClick={(e) => { e.preventDefault(); onNavigate('category'); }}>
                  Sơ đồ trang web sản phẩm
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: TỔNG ĐÀI HỖ TRỢ & THANH TOÁN */}
          <div>
            <h4 className="footer-heading">TỔNG ĐÀI HỖ TRỢ</h4>
            
            <div className="footer-hotline-card">
              <div className="hotline-row">
                <span>Mua hàng (9:00 - 21:00):</span>
                <b><a href="tel:0973711868" style={{ color: '#F87171' }}>📞 0973711868</a></b>
              </div>
              <div className="hotline-row">
                <span>CSKH (9:00 - 21:00):</span>
                <b><a href="tel:0903479488" style={{ color: '#60A5FA' }}>📞 0903479488</a></b>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#D6CBBF', textTransform: 'uppercase', marginBottom: '8px' }}>
              THANH TOÁN AN TOÀN
            </div>
            <div className="payment-badges-row">
              <span className="pay-badge-img">VISA</span>
              <span className="pay-badge-img">MasterCard</span>
              <span className="pay-badge-img">VNPAY</span>
              <span className="pay-badge-img">VIETQR</span>
              <span className="pay-badge-img">MOMO</span>
            </div>
          </div>

        </div>

        <div className="footer-middle-divider"></div>

        {/* Bottom Row (Legal entity, ecosystem, certification seals) */}
        <div className="footer-bottom-columns">
          
          {/* Company Info */}
          <div>
            <div className="company-legal-title">CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ CÔNG NGHỆ TCGROUP</div>
            <div>Địa chỉ: 249 Xã Đàn, Phường Đống Đa, Hà Nội.</div>
            <div>GPĐKKD: 0108085873. Sở Kế Hoạch Đầu Tư Hà Nội cấp.</div>
            <div style={{ marginTop: '4px' }}>Hệ sinh thái công nghệ do TCGroup phát triển. Cùng Việt Nam bước vào kỷ nguyên vươn mình.</div>
            <div style={{ marginTop: '6px', color: '#786C5E' }}>© 2016 - 2026 TCSPORT.vn. All rights reserved.</div>
          </div>

          {/* Ecosystem */}
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#E5E7EB', textTransform: 'uppercase', marginBottom: '8px' }}>
              CÙNG HỆ SINH THÁI TCGROUP
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', background: '#2563EB', color: '#FFF', fontWeight: 900, fontSize: '0.7rem', borderRadius: '4px' }}>
                  W
                </span>
                <div>
                  <b style={{ color: '#FFFFFF' }}>TCWork</b>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#9CA3AF' }}>Ứng dụng quản trị doanh nghiệp</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '22px', height: '22px', background: '#D97706', color: '#FFF', fontWeight: 900, fontSize: '0.7rem', borderRadius: '4px' }}>
                  S
                </span>
                <div>
                  <b style={{ color: '#FFFFFF' }}>TCStyle.vn</b>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: '#9CA3AF' }}>Chuyên trang phong cách thời trang</span>
                </div>
              </div>
            </div>
          </div>

          {/* Government & DMCA Seals */}
          <div className="trust-badges-wrap">
            <div className="badge-gov-declared">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>ĐÃ THÔNG BÁO<br/>BỘ CÔNG THƯƠNG</span>
            </div>
            <div className="badge-dmca">
              <span>PROTECTED BY<br/><b>DMCA.COM</b></span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
