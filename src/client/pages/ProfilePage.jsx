/**
 * =========================================================================================
 * 📁 TỆP: src/pages/ProfilePage.jsx
 * 🎯 CHỨC NĂNG: TRANG QUẢN LÝ TÀI KHOẢN KHÁCH HÀNG & LỊCH SỬ ĐƠN HÀNG (PROFILE & ORDERS)
 * =========================================================================================
 * 
 * 📌 CÁC TRẠNG THÁI VÀ KHỐI CHỨC NĂNG:
 *    1. TRẠNG THÁI CHƯA ĐĂNG NHẬP:
 *       - Hiển thị thông báo yêu cầu đăng nhập kèm nút mở AuthModal.
 *    2. TRẠNG THÁI ĐÃ ĐĂNG NHẬP (Chia 3 Tab chính):
 *       - TAB 1: 📦 ĐƠN HÀNG CỦA TÔI:
 *         + Hiển thị lịch sử đơn hàng đã đặt từ LocalStorage ('tc_user_orders').
 *       - TAB 2: 👤 THÔNG TIN CÁ NHÂN:
 *         + Chỉnh sửa Họ tên, Số điện thoại, Email, Địa chỉ giao hàng & Lưu cập nhật.
 *       - TAB 3: 📍 SỔ ĐỊA CHỈ NHẬN HÀNG:
 *         + Xem địa chỉ mặc định, bấm "Thay Đổi Địa Chỉ" để cập nhật và lưu trực tiếp.
 *       - Nút 🚪 ĐĂNG XUẤT TÀI KHOẢN.
 * =========================================================================================
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function ProfilePage({ onNavigate }) {
  // -------------------------------------------------------------
  // 1. STATE & AUTH CONTEXT
  // -------------------------------------------------------------
  const { authUser, openAuthModal, logout, updateUser } = useAuth();
  const { showToast } = useCart();
  const [activeTab, setActiveTab] = useState('profile'); // 'orders' | 'profile' | 'address'

  // State thông tin người dùng chỉnh sửa trong form Tab 2
  const [name, setName] = useState(authUser.name || '');
  const [phone, setPhone] = useState(authUser.phone || '');
  const [email, setEmail] = useState(authUser.email || '');
  const [address, setAddress] = useState(authUser.address || '');

  // State chỉnh sửa địa chỉ trong Tab 3
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addrRecipient, setAddrRecipient] = useState(authUser.name || '');
  const [addrPhone, setAddrPhone] = useState(authUser.phone || '');
  const [addrDetail, setAddrDetail] = useState(authUser.address || '');

  // Đồng bộ form khi authUser thay đổi (ví dụ đăng nhập Google)
  useEffect(() => {
    setName(authUser.name || '');
    setPhone(authUser.phone || '');
    setEmail(authUser.email || '');
    setAddress(authUser.address || '');
    setAddrRecipient(authUser.name || '');
    setAddrPhone(authUser.phone || '');
    setAddrDetail(authUser.address || '');
  }, [authUser]);

  // -------------------------------------------------------------
  // 2. TẢI DANH SÁCH LỊCH SỬ ĐƠN HÀNG TỪ LOCALSTORAGE
  // -------------------------------------------------------------
  let orders = [];
  try {
    orders = JSON.parse(localStorage.getItem('tc_user_orders') || '[]');
  } catch (e) {
    console.error('Lỗi khi đọc đơn hàng từ LocalStorage:', e);
  }

  // Dữ liệu đơn hàng mẫu ban đầu nếu người dùng chưa đặt đơn nào
  if (orders.length === 0) {
    orders = [
      {
        id: 'TC89214',
        date: '19/10/2026',
        status: 'Đang vận chuyển hỏa tốc',
        statusClass: 'status-badge-shipping',
        total: '2.540.000₫',
        item: 'Giày Chạy Bộ Nike Air Zoom Pegasus 41',
        size: '41',
        image: 'assets/images/shoe-pegasus-blue.jpg'
      },
      {
        id: 'TC76412',
        date: '05/10/2026',
        status: 'Giao hàng thành công',
        statusClass: 'status-badge-delivered',
        total: '2.890.000₫',
        item: 'Giày Tennis/Pickleball Asics Solution Speed FF 3',
        size: '42',
        image: 'assets/images/shoe-asics-runner.jpg'
      }
    ];
  }

  // -------------------------------------------------------------
  // 3. HÀM LƯU THAY ĐỔI THÔNG TIN CÁ NHÂN (TAB 2)
  // -------------------------------------------------------------
  const handleSaveInfo = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Vui lòng nhập họ và tên!', 'warning');
      return;
    }
    const updated = updateUser({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim()
    });

    // Đồng bộ trực tiếp vào cơ sở dữ liệu MySQL backend
    try {
      const { api } = await import('../../services/api');
      await api.auth.updateProfile({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        avatar: authUser.avatar || ''
      });
    } catch (err) {
      console.warn('Lưu vào MySQL backend chưa thành công (lưu local):', err);
    }

    showToast('Cập nhật thông tin tài khoản và địa chỉ thành công!', 'success');
  };

  // -------------------------------------------------------------
  // 4. HÀM LƯU THAY ĐỔI ĐỊA CHỈ NHẬN HÀNG (TAB 3)
  // -------------------------------------------------------------
  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!addrDetail.trim()) {
      showToast('Vui lòng nhập địa chỉ giao hàng chi tiết!', 'warning');
      return;
    }
    const updatedName = addrRecipient.trim() || authUser.name;
    const updatedPhone = addrPhone.trim() || authUser.phone;
    const updatedAddress = addrDetail.trim();

    updateUser({
      name: updatedName,
      phone: updatedPhone,
      address: updatedAddress
    });

    // Đồng bộ địa chỉ vào MySQL backend
    try {
      const { api } = await import('../../services/api');
      await api.auth.updateProfile({
        name: updatedName,
        phone: updatedPhone,
        email: authUser.email,
        address: updatedAddress,
        avatar: authUser.avatar || ''
      });
    } catch (err) {
      console.warn('Lưu địa chỉ vào MySQL backend chưa thành công:', err);
    }

    setIsEditingAddress(false);
    showToast('Cập nhật địa chỉ nhận hàng thành công!', 'success');
  };

  return (
    <main className="page-wrapper-main">
      <div className="container">
        {/* Đường dẫn trang (Breadcrumb) */}
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          Trang chủ › <b style={{ color: 'var(--color-espresso)' }}>Tài Khoản Thành Viên TC SPORT</b>
        </div>

        {/* ========================================================= */}
        {/* TRƯỜNG HỢP 1: CHƯA ĐĂNG NHẬP TÀI KHOẢN                     */}
        {/* ========================================================= */}
        {!authUser.isLoggedIn ? (
          <div style={{ background: '#FFFFFF', border: '1px solid var(--bg-cream-border)', borderRadius: 'var(--radius-lg)', padding: '50px 28px', textAlign: 'center', boxShadow: '0 4px 20px rgba(70,50,25,0.06)', maxWidth: '520px', margin: '30px auto' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '14px', lineHeight: 1 }}>🔒</div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '10px', color: 'var(--color-espresso)' }}>
              BẠN CHƯA ĐĂNG NHẬP TÀI KHOẢN
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '440px', margin: '0 auto 26px' }}>
              Vui lòng đăng nhập hoặc tạo tài khoản mới để theo dõi trạng thái đơn hàng, quản lý sổ địa chỉ nhận hàng và nhận ưu đãi độc quyền từ TC SPORT.
            </p>
            <button
              type="button"
              className="btn-primary-checkout"
              style={{ width: '100%', height: '46px', fontSize: '0.92rem', background: 'var(--color-terracotta)', border: 'none', cursor: 'pointer', maxWidth: '320px', margin: '0 auto' }}
              onClick={() => openAuthModal('login')}
            >
              Đăng Nhập Ngay
            </button>
          </div>
        ) : (
          /* ========================================================= */
          /* TRƯỜNG HỢP 2: ĐÃ ĐĂNG NHẬP THÀNH CÔNG                    */
          /* ========================================================= */
          <div className="profile-layout-grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px', alignItems: 'flex-start' }}>
            
            {/* SIDEBAR BÊN TRÁI: AVATAR & CÁC NÚT ĐIỀU HƯỚNG CĂN CHUẨN */}
            <aside style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bg-cream-border)', height: 'fit-content', boxShadow: '0 4px 14px rgba(70,50,25,0.04)' }}>
              
              {/* Khối Avatar & Tên tài khoản */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #F3EDE3', paddingBottom: '16px', marginBottom: '16px' }}>
                {authUser.avatar ? (
                  <img
                    src={authUser.avatar}
                    alt={authUser.name}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--color-terracotta)' }}
                  />
                ) : (
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--color-terracotta)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800 }}>
                    {authUser.name ? authUser.name.charAt(0).toUpperCase() : 'T'}
                  </div>
                )}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#1E293B', marginBottom: '2px' }} title={authUser.name}>
                    {authUser.name}
                  </h4>
                  <span style={{ fontSize: '0.76rem', color: '#16A34A', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }}></span>
                    Thành viên VIP
                  </span>
                </div>
              </div>

              {/* Các nút chuyển Tab chức năng căn chuẩn icon và lề */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                
                {/* Tab 1: Đơn hàng */}
                <button
                  type="button"
                  className={`profile-nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  <span>Đơn Hàng Của Tôi ({orders.length})</span>
                </button>

                {/* Tab 2: Thông tin cá nhân */}
                <button
                  type="button"
                  className={`profile-nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Thông Tin Cá Nhân</span>
                </button>

                {/* Tab 3: Sổ địa chỉ */}
                <button
                  type="button"
                  className={`profile-nav-link ${activeTab === 'address' ? 'active' : ''}`}
                  onClick={() => setActiveTab('address')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Sổ Địa Chỉ Nhận Hàng</span>
                </button>

                {/* Nút Đăng xuất */}
                <button
                  type="button"
                  className="profile-nav-link"
                  onClick={logout}
                  style={{ color: '#DC2626', marginTop: '10px', borderTop: '1px solid #F3EDE3', paddingTop: '12px' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                  <span>Đăng Xuất Tài Khoản</span>
                </button>

              </div>
            </aside>

            {/* NỘI DUNG TAB BÊN PHẢI */}
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--bg-cream-border)', boxShadow: '0 4px 14px rgba(70,50,25,0.04)' }}>
              
              {/* ========================================================= */}
              {/* TAB 1: LỊCH SỬ ĐƠN HÀNG                                   */}
              {/* ========================================================= */}
              {activeTab === 'orders' && (
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '18px', borderBottom: '2px solid #F3EDE3', paddingBottom: '10px', color: 'var(--color-espresso)' }}>
                    LỊCH SỬ ĐƠN HÀNG CỦA BẠN
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {orders.map((ord, idx) => (
                      <div key={ord.id || idx} style={{ border: '1px solid #EAE0D3', borderRadius: '10px', padding: '16px', background: '#FAF5EA' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1E293B' }}>Mã đơn: #{ord.id}</span>
                          <span style={{ fontSize: '0.78rem', background: '#DCFCE7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontWeight: 700 }}>
                            {ord.status}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                          <img src={ord.image} alt={ord.item} style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFF' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1E293B', marginBottom: '3px' }}>{ord.item}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              Size: <b>{ord.size}</b> • Ngày đặt: {ord.date}
                            </div>
                            <div style={{ fontWeight: 800, color: 'var(--color-red-sale)', marginTop: '4px', fontSize: '0.95rem' }}>{ord.total}</div>
                          </div>
                          <button
                            type="button"
                            className="btn-calc-submit"
                            style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: 'var(--radius-xs)', cursor: 'pointer' }}
                            onClick={() => onNavigate('category')}
                          >
                            Mua Lại
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 2: THÔNG TIN CÁ NHÂN (CÓ ĐỊA CHỈ & NÚT LƯU)           */}
              {/* ========================================================= */}
              {activeTab === 'profile' && (
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '18px', borderBottom: '2px solid #F3EDE3', paddingBottom: '10px', color: 'var(--color-espresso)' }}>
                    THÔNG TIN CÁ NHÂN
                  </h3>
                  
                  <form onSubmit={handleSaveInfo}>
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label" style={{ fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px', display: 'block' }}>Họ và tên *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '100%', height: '44px', padding: '0 14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px', display: 'block' }}>Số điện thoại *</label>
                        <input
                          type="tel"
                          className="form-control"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          style={{ width: '100%', height: '44px', padding: '0 14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px', display: 'block' }}>Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{ width: '100%', height: '44px', padding: '0 14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '22px' }}>
                      <label className="form-label" style={{ fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px', display: 'block' }}>Địa chỉ nhận hàng mặc định</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành..."
                        style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', height: 'auto', resize: 'vertical' }}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary-checkout"
                      style={{
                        width: 'fit-content',
                        padding: '12px 32px',
                        fontSize: '0.92rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      Lưu Thay Đổi
                    </button>
                  </form>
                </div>
              )}

              {/* ========================================================= */}
              {/* TAB 3: SỔ ĐỊA CHỈ NHẬN HÀNG (CÓ CHỨC NĂNG THAY ĐỔI & LƯU)  */}
              {/* ========================================================= */}
              {activeTab === 'address' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '2px solid #F3EDE3', paddingBottom: '10px' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-espresso)', margin: 0 }}>
                      SỔ ĐỊA CHỈ NHẬN HÀNG
                    </h3>
                    
                    {!isEditingAddress && (
                      <button
                        type="button"
                        onClick={() => {
                          setAddrRecipient(authUser.name || '');
                          setAddrPhone(authUser.phone || '');
                          setAddrDetail(authUser.address || '');
                          setIsEditingAddress(true);
                        }}
                        style={{
                          background: 'var(--color-terracotta)',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 8px rgba(194, 65, 12, 0.25)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        ✏️ Thay Đổi Địa Chỉ
                      </button>
                    )}
                  </div>

                  {!isEditingAddress ? (
                    /* KHỐI HIỂN THỊ ĐỊA CHỈ HIỆN TẠI */
                    <div style={{ border: '1.5px solid #E5D5C0', padding: '20px 22px', borderRadius: '12px', background: '#FAF5EA', position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '1.15rem' }}>📍</span>
                          <b style={{ fontSize: '0.98rem', color: '#1E293B' }}>Địa chỉ nhận hàng chính</b>
                        </div>
                        <span style={{ fontSize: '0.74rem', background: 'var(--color-terracotta)', color: '#FFF', padding: '3px 12px', borderRadius: '20px', fontWeight: 800, letterSpacing: '0.02em' }}>
                          Mặc định
                        </span>
                      </div>

                      <div style={{ fontSize: '0.94rem', color: '#1E293B', lineHeight: '1.6', fontWeight: 600, paddingLeft: '28px', marginBottom: '8px' }}>
                        {authUser.address || 'Chưa cập nhật địa chỉ giao hàng. Vui lòng bấm nút Thay Đổi Địa Chỉ ở trên để thiết lập.'}
                      </div>

                      <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', paddingLeft: '28px' }}>
                        Người nhận: <b style={{ color: '#334155' }}>{authUser.name || 'Chưa có tên'}</b> • Số điện thoại: <b style={{ color: '#334155' }}>{authUser.phone || 'Chưa có SĐT'}</b>
                      </div>
                    </div>
                  ) : (
                    /* FORM THAY ĐỔI ĐỊA CHỈ TRỰC TIẾP */
                    <form onSubmit={handleSaveAddress} style={{ background: '#FAF5EA', padding: '22px', borderRadius: '12px', border: '1.5px solid #DFCEB0' }}>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800, marginBottom: '16px', color: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>📝</span> CẬP NHẬT ĐỊA CHỈ GIAO HÀNG
                      </h4>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label" style={{ fontWeight: 700, fontSize: '0.84rem', marginBottom: '4px', display: 'block' }}>Họ và tên người nhận *</label>
                          <input
                            type="text"
                            className="form-control"
                            value={addrRecipient}
                            onChange={(e) => setAddrRecipient(e.target.value)}
                            required
                            style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFF' }}
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label" style={{ fontWeight: 700, fontSize: '0.84rem', marginBottom: '4px', display: 'block' }}>Số điện thoại liên hệ *</label>
                          <input
                            type="tel"
                            className="form-control"
                            value={addrPhone}
                            onChange={(e) => setAddrPhone(e.target.value)}
                            required
                            style={{ width: '100%', height: '42px', padding: '0 12px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFF' }}
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ marginBottom: '18px' }}>
                        <label className="form-label" style={{ fontWeight: 700, fontSize: '0.84rem', marginBottom: '4px', display: 'block' }}>
                          Địa chỉ giao hàng chi tiết (Số nhà, ngõ/ngách, đường, phường/xã, quận/huyện, tỉnh/thành) *
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          value={addrDetail}
                          onChange={(e) => setAddrDetail(e.target.value)}
                          placeholder="Ví dụ: Số 249 Xã Đàn, Phường Nam Đồng, Quận Đống Đa, Hà Nội"
                          required
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFF', height: 'auto', resize: 'vertical' }}
                        ></textarea>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <button
                          type="submit"
                          className="btn-primary-checkout"
                          style={{
                            width: 'fit-content',
                            padding: '11px 26px',
                            fontSize: '0.88rem',
                            borderRadius: 'var(--radius-full)',
                            cursor: 'pointer',
                            fontWeight: 800
                          }}
                        >
                          Lưu Địa Chỉ Này
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingAddress(false)}
                          style={{
                            padding: '11px 22px',
                            background: '#E2E8F0',
                            color: '#334155',
                            border: 'none',
                            borderRadius: 'var(--radius-full)',
                            fontWeight: 700,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                        >
                          Hủy Bỏ
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </main>
  );
}
