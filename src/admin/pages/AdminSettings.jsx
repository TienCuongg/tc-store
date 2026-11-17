/**
 * =========================================================================================
 * 📁 TỆP: src/admin/pages/AdminSettings.jsx
 * 🎯 CHỨC NĂNG: CÀI ĐẶT THÔNG TIN KHO, CẤU HÌNH TÀI KHOẢN NGÂN HÀNG & UPLOAD MÃ QR
 * =========================================================================================
 * - Cho phép chỉnh sửa toàn bộ thông tin cửa hàng & kho hàng (Tên, Hotline, Địa chỉ, Freeship)
 * - Cho phép chỉnh sửa thông tin tài khoản nhận tiền (Ngân hàng, Số TK, Chủ TK, Chi nhánh)
 * - Cho phép UPLOAD MÃ QR từ thư mục máy tính (kèm Live Preview & Tự động tạo VietQR Napas)
 * - Lưu trữ bền vững vào LocalStorage & Đồng bộ qua API Backend nếu có kết nối
 * =========================================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { formatVND } from '../../data/products';

// Danh sách ngân hàng thông dụng tại Việt Nam (kèm mã Napas VietQR)
const POPULAR_BANKS = [
  { code: 'TCB', name: 'Techcombank (Ngân hàng Kỹ thương Việt Nam)', bin: '970407' },
  { code: 'VCB', name: 'Vietcombank (Ngoại thương Việt Nam)', bin: '970436' },
  { code: 'MB', name: 'MB Bank (Ngân hàng Quân Đội)', bin: '970422' },
  { code: 'ACB', name: 'ACB (Ngân hàng Á Châu)', bin: '970416' },
  { code: 'BIDV', name: 'BIDV (Đầu tư và Phát triển Việt Nam)', bin: '970418' },
  { code: 'VPB', name: 'VPBank (Ngân hàng Việt Nam Thịnh Vượng)', bin: '970432' },
  { code: 'TPB', name: 'TPBank (Ngân hàng Tiên Phong)', bin: '970458' },
  { code: 'CTG', name: 'VietinBank (Công thương Việt Nam)', bin: '970415' },
  { code: 'VBA', name: 'Agribank (Nông nghiệp & Phát triển Nông thôn)', bin: '970405' },
  { code: 'STB', name: 'Sacombank (Sài Gòn Thương Tín)', bin: '970403' },
  { code: 'HDB', name: 'HDBank (Phát triển TP.HCM)', bin: '970437' }
];

export default function AdminSettings({
  orders,
  products,
  onSeedDemoOrders,
  onResetCatalog,
  onExportCSV,
  showToast
}) {
  const qrFileInputRef = useRef(null);

  // -------------------------------------------------------------
  // 1. STATE THÔNG TIN KHO & CỬA HÀNG
  // -------------------------------------------------------------
  const [storeInfo, setStoreInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('tc_store_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      brandName: 'TC SPORT - Giày Chính Hãng',
      hotline: '0973.711.868',
      workHours: '8:30 - 21:30 (Thứ 2 - Chủ Nhật)',
      warehouseAddress: '249 Xã Đàn, Nam Đồng, Đống Đa, Hà Nội',
      supportEmail: 'hotro@tcsport.vn',
      freeshipThreshold: 1500000
    };
  });

  const [isEditingStore, setIsEditingStore] = useState(false);
  const [storeForm, setStoreForm] = useState(storeInfo);

  // -------------------------------------------------------------
  // 2. STATE TÀI KHOẢN NGÂN HÀNG & MÃ QR THANH TOÁN
  // -------------------------------------------------------------
  const [bankInfo, setBankInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('tc_payment_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      bankCode: 'TCB',
      bankName: 'Techcombank (Ngân hàng Kỹ thương Việt Nam)',
      accountNumber: '1903.8888.6666',
      accountHolder: 'NGUYEN VAN TIEN',
      branch: 'Chi nhánh Đống Đa - Hà Nội',
      qrImage: '', // URL hoặc Base64 ảnh mã QR tải lên
      qrType: 'auto' // 'auto' (VietQR) | 'custom' (Ảnh tải lên)
    };
  });

  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankForm, setBankForm] = useState(bankInfo);
  const [previewQrModal, setPreviewQrModal] = useState(false);

  // Đồng bộ form khi state lưu thay đổi
  useEffect(() => {
    setStoreForm(storeInfo);
  }, [storeInfo]);

  useEffect(() => {
    setBankForm(bankInfo);
  }, [bankInfo]);

  // -------------------------------------------------------------
  // 3. XỬ LÝ LƯU THÔNG TIN KHO
  // -------------------------------------------------------------
  const handleSaveStore = (e) => {
    e.preventDefault();
    if (!storeForm.brandName.trim() || !storeForm.hotline.trim() || !storeForm.warehouseAddress.trim()) {
      if (showToast) showToast('Vui lòng điền đủ Tên cửa hàng, Hotline và Địa chỉ kho!', 'warning');
      return;
    }

    const updated = {
      ...storeForm,
      freeshipThreshold: Number(storeForm.freeshipThreshold) || 1500000
    };

    setStoreInfo(updated);
    localStorage.setItem('tc_store_settings', JSON.stringify(updated));
    window.dispatchEvent(new Event('tc_store_settings_updated'));
    setIsEditingStore(false);
    if (showToast) showToast('Đã lưu thông tin cửa hàng & kho thành công!', 'success');
  };

  const handleResetStoreDefaults = () => {
    if (window.confirm('Khôi phục thông tin kho về mặc định ban đầu?')) {
      const defaults = {
        brandName: 'TC SPORT - Giày Chính Hãng',
        hotline: '0973.711.868',
        workHours: '8:30 - 21:30 (Thứ 2 - Chủ Nhật)',
        warehouseAddress: '249 Xã Đàn, Nam Đồng, Đống Đa, Hà Nội',
        supportEmail: 'hotro@tcsport.vn',
        freeshipThreshold: 1500000
      };
      setStoreInfo(defaults);
      setStoreForm(defaults);
      localStorage.setItem('tc_store_settings', JSON.stringify(defaults));
      window.dispatchEvent(new Event('tc_store_settings_updated'));
      setIsEditingStore(false);
      if (showToast) showToast('Đã khôi phục thông tin kho mặc định!', 'info');
    }
  };

  // -------------------------------------------------------------
  // 4. XỬ LÝ UPLOAD ẢNH MÃ QR TỪ THƯ MỤC
  // -------------------------------------------------------------
  const handleQrFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      if (showToast) showToast('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WEBP)!', 'warning');
      return;
    }

    // Thử tải lên API Server Spring Boot nếu có
    import('../../services/api').then(({ api }) => {
      api.uploadImage(file).then((res) => {
        if (res && res.url) {
          setBankForm((prev) => ({
            ...prev,
            qrImage: res.url,
            qrType: 'custom'
          }));
        }
      }).catch((err) => {
        console.warn('Upload API server ngoại tuyến, lưu Base64:', err);
      });
    }).catch(() => {});

    // Đọc ảnh xem trước ngay lập tức bằng FileReader
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Nén ảnh kích thước vừa vặn cho mã QR (tối đa 600px)
        const maxDim = 600;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);

        setBankForm((prev) => ({
          ...prev,
          qrImage: optimizedDataUrl,
          qrType: 'custom'
        }));
        if (showToast) showToast('Đã tải lên ảnh mã QR thành công!', 'success');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------------------------------------
  // 5. TỰ ĐỘNG SINH MÃ VIETQR THEO TÀI KHOẢN
  // -------------------------------------------------------------
  const handleGenerateVietQR = () => {
    const cleanAcc = bankForm.accountNumber.replace(/[^0-9]/g, '');
    if (!cleanAcc) {
      if (showToast) showToast('Vui lòng nhập số tài khoản trước khi tạo VietQR!', 'warning');
      return;
    }

    const vietQrUrl = `https://img.vietqr.io/image/${bankForm.bankCode}-${cleanAcc}-compact2.jpg?accountName=${encodeURIComponent(bankForm.accountHolder.trim())}&amount=0&addInfo=TC%20SPORT`;
    setBankForm((prev) => ({
      ...prev,
      qrImage: vietQrUrl,
      qrType: 'auto'
    }));
    if (showToast) showToast('Đã tạo mã VietQR Napas tự động!', 'success');
  };

  // -------------------------------------------------------------
  // 6. XỬ LÝ LƯU THÔNG TIN NGÂN HÀNG & QR
  // -------------------------------------------------------------
  const handleSaveBank = (e) => {
    e.preventDefault();
    if (!bankForm.accountNumber.trim() || !bankForm.accountHolder.trim()) {
      if (showToast) showToast('Vui lòng điền đủ Số tài khoản và Tên chủ tài khoản!', 'warning');
      return;
    }

    const selectedBankObj = POPULAR_BANKS.find((b) => b.code === bankForm.bankCode) || POPULAR_BANKS[0];

    const updated = {
      ...bankForm,
      bankName: selectedBankObj.name,
      accountHolder: bankForm.accountHolder.trim().toUpperCase()
    };

    setBankInfo(updated);
    localStorage.setItem('tc_payment_settings', JSON.stringify(updated));
    window.dispatchEvent(new Event('tc_payment_settings_updated'));
    setIsEditingBank(false);
    if (showToast) showToast('Đã lưu thông tin tài khoản ngân hàng & mã QR!', 'success');
  };

  // -------------------------------------------------------------
  // 7. XUẤT SAO LƯU DỮ LIỆU JSON
  // -------------------------------------------------------------
  const handleExportJSON = () => {
    const backup = {
      orders,
      products,
      storeSettings: storeInfo,
      paymentSettings: bankInfo,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TC_SPORT_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    if (showToast) showToast('Đã xuất file sao lưu JSON!', 'success');
  };

  // QR hiện thời hiển thị (Custom tải lên hoặc VietQR tự động)
  const activeQrSrc = bankInfo.qrImage || `https://img.vietqr.io/image/${bankInfo.bankCode}-${bankInfo.accountNumber.replace(/[^0-9]/g, '')}-compact2.jpg?accountName=${encodeURIComponent(bankInfo.accountHolder)}&amount=0&addInfo=TC%20SPORT`;

  return (
    <div>
      {/* TIÊU ĐỀ TRANG */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-header-title">
            <span>⚙️</span> Cài Đặt Hệ Thống & Vận Hành
          </h1>
          <p className="admin-page-header-desc">
            Cấu hình thông tin kho xuất hàng, tài khoản ngân hàng nhận tiền QR và sao lưu dữ liệu toàn diện.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        
        {/* ========================================================================= */}
        {/* CARD 1: THÔNG TIN CỬA HÀNG & KHO HÀNG (CHO PHÉP CHỈNH SỬA)                */}
        {/* ========================================================================= */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #F1E5D1', paddingBottom: '10px' }}>
            <div className="admin-card-title" style={{ margin: 0 }}>
              🏢 Thông Tin Cửa Hàng & Kho
            </div>
            {!isEditingStore ? (
              <button
                type="button"
                className="btn-secondary-admin"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                onClick={() => setIsEditingStore(true)}
              >
                ✏️ Chỉnh Sửa Kho
              </button>
            ) : (
              <button
                type="button"
                className="btn-secondary-admin"
                style={{ fontSize: '0.75rem', padding: '4px 10px', color: '#64748B' }}
                onClick={() => {
                  setStoreForm(storeInfo);
                  setIsEditingStore(false);
                }}
              >
                ✕ Hủy
              </button>
            )}
          </div>

          {!isEditingStore ? (
            /* CHẾ ĐỘ XEM CHI TIẾT */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.84rem', flex: 1 }}>
              <div>
                <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Tên thương hiệu:</span>
                <b style={{ color: '#0F172A', fontSize: '0.95rem' }}>{storeInfo.brandName}</b>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Hotline CSKH:</span>
                  <b style={{ color: '#C2410C' }}>{storeInfo.hotline}</b>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Giờ hoạt động:</span>
                  <b>{storeInfo.workHours}</b>
                </div>
              </div>
              <div>
                <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Địa chỉ kho hàng & Xuất kho:</span>
                <b>{storeInfo.warehouseAddress}</b>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Email liên hệ:</span>
                  <b>{storeInfo.supportEmail}</b>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Ngưỡng Freeship toàn quốc:</span>
                  <b style={{ color: '#16A34A' }}>{formatVND(storeInfo.freeshipThreshold)}</b>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px dashed #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 600 }}>
                  ✓ Đang đồng bộ cho toàn bộ hệ thống
                </span>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={handleResetStoreDefaults}
                >
                  Khôi phục mặc định
                </button>
              </div>
            </div>
          ) : (
            /* CHẾ ĐỘ FORM CHỈNH SỬA */
            <form onSubmit={handleSaveStore} style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '0.78rem' }}>Tên thương hiệu *</label>
                <input
                  type="text"
                  className="admin-search-box input"
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.82rem' }}
                  required
                  value={storeForm.brandName}
                  onChange={(e) => setStoreForm({ ...storeForm, brandName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '0.78rem' }}>Hotline CSKH *</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.82rem' }}
                    required
                    value={storeForm.hotline}
                    onChange={(e) => setStoreForm({ ...storeForm, hotline: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '0.78rem' }}>Giờ hoạt động</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.82rem' }}
                    value={storeForm.workHours}
                    onChange={(e) => setStoreForm({ ...storeForm, workHours: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '0.78rem' }}>Địa chỉ kho hàng chi tiết *</label>
                <textarea
                  rows={2}
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'inherit' }}
                  required
                  value={storeForm.warehouseAddress}
                  onChange={(e) => setStoreForm({ ...storeForm, warehouseAddress: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '0.78rem' }}>Email liên hệ</label>
                  <input
                    type="email"
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.82rem' }}
                    value={storeForm.supportEmail}
                    onChange={(e) => setStoreForm({ ...storeForm, supportEmail: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '0.78rem' }}>Ngưỡng Freeship (₫)</label>
                  <input
                    type="number"
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.82rem' }}
                    value={storeForm.freeshipThreshold}
                    onChange={(e) => setStoreForm({ ...storeForm, freeshipThreshold: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button type="submit" className="btn-primary-admin" style={{ flex: 1, justifyContent: 'center' }}>
                  💾 Lưu Cấu Hình Kho
                </button>
                <button
                  type="button"
                  className="btn-secondary-admin"
                  onClick={() => setIsEditingStore(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: CẤU HÌNH NGÂN HÀNG & UPLOAD MÃ QR (CHO PHÉP SỬA & TẢI ẢNH QR)      */}
        {/* ========================================================================= */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #F1E5D1', paddingBottom: '10px' }}>
            <div className="admin-card-title" style={{ margin: 0 }}>
              💳 Cấu Hình Ngân Hàng & Mã QR
            </div>
            {!isEditingBank ? (
              <button
                type="button"
                className="btn-secondary-admin"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                onClick={() => setIsEditingBank(true)}
              >
                ✏️ Đổi Tài Khoản / QR
              </button>
            ) : (
              <button
                type="button"
                className="btn-secondary-admin"
                style={{ fontSize: '0.75rem', padding: '4px 10px', color: '#64748B' }}
                onClick={() => {
                  setBankForm(bankInfo);
                  setIsEditingBank(false);
                }}
              >
                ✕ Hủy
              </button>
            )}
          </div>

          {!isEditingBank ? (
            /* CHẾ ĐỘ XEM CHI TIẾT NGÂN HÀNG & ẢNH MÃ QR */
            <div style={{ display: 'flex', gap: '16px', fontSize: '0.84rem', flex: 1, alignItems: 'center' }}>
              {/* Khung ảnh QR thanh toán */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    border: '2px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '6px',
                    background: '#FFFFFF',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Bấm để xem ảnh QR phóng to"
                  onClick={() => setPreviewQrModal(true)}
                >
                  <img
                    src={activeQrSrc}
                    alt="Mã QR Thanh Toán"
                    style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '4px' }}
                  />
                </div>
                <span style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '4px', display: 'block' }}>
                  🔍 Bấm xem to
                </span>
              </div>

              {/* Thông tin tài khoản */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Ngân hàng thụ hưởng:</span>
                  <b style={{ color: '#0F172A' }}>{bankInfo.bankName}</b>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Số tài khoản:</span>
                  <b style={{ fontSize: '1.05rem', color: '#C2410C', letterSpacing: '0.5px' }}>
                    {bankInfo.accountNumber}
                  </b>
                </div>
                <div>
                  <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Chủ tài khoản:</span>
                  <b style={{ textTransform: 'uppercase' }}>{bankInfo.accountHolder}</b>
                </div>
                {bankInfo.branch && (
                  <div>
                    <span style={{ color: '#64748B', display: 'block', fontSize: '0.75rem' }}>Chi nhánh:</span>
                    <span style={{ color: '#334155' }}>{bankInfo.branch}</span>
                  </div>
                )}
                <div style={{ color: '#16A34A', fontWeight: 700, fontSize: '0.78rem', marginTop: '4px' }}>
                  {bankInfo.qrType === 'custom' ? '✓ Đang dùng mã QR tải lên của bạn' : '✓ Đã kích hoạt quét mã VietQR tự động'}
                </div>
              </div>
            </div>
          ) : (
            /* CHẾ ĐỘ FORM SỬA TÀI KHOẢN & UPLOAD ẢNH QR */
            <form onSubmit={handleSaveBank} style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '0.78rem' }}>Chọn ngân hàng *</label>
                <select
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.82rem', background: '#FFFFFF' }}
                  value={bankForm.bankCode}
                  onChange={(e) => {
                    const sel = POPULAR_BANKS.find((b) => b.code === e.target.value);
                    setBankForm({
                      ...bankForm,
                      bankCode: e.target.value,
                      bankName: sel ? sel.name : bankForm.bankName
                    });
                  }}
                >
                  {POPULAR_BANKS.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.name} ({b.code})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '0.78rem' }}>Số tài khoản *</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 700 }}
                    required
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm({ ...bankForm, accountNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '0.78rem' }}>Tên chủ tài khoản *</label>
                  <input
                    type="text"
                    style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.82rem', textTransform: 'uppercase', fontWeight: 700 }}
                    required
                    value={bankForm.accountHolder}
                    onChange={(e) => setBankForm({ ...bankForm, accountHolder: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '4px', fontSize: '0.78rem' }}>Chi nhánh ngân hàng</label>
                <input
                  type="text"
                  style={{ width: '100%', padding: '6px 10px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '0.82rem' }}
                  placeholder="Ví dụ: Chi nhánh Đống Đa, Hà Nội"
                  value={bankForm.branch || ''}
                  onChange={(e) => setBankForm({ ...bankForm, branch: e.target.value })}
                />
              </div>

              {/* KHỐI TẢI LÊN ẢNH MÃ QR */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px', borderRadius: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.78rem', marginBottom: '6px' }}>
                  📷 Mã QR Thanh Toán:
                </div>

                <input
                  type="file"
                  ref={qrFileInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleQrFileUpload}
                />

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {/* Xem trước ảnh QR đang chọn */}
                  {bankForm.qrImage ? (
                    <div style={{ width: '60px', height: '60px', border: '1px solid #CBD5E1', borderRadius: '6px', overflow: 'hidden', background: '#FFF' }}>
                      <img src={bankForm.qrImage} alt="QR Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ) : (
                    <div style={{ width: '60px', height: '60px', border: '1px dashed #CBD5E1', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '0.7rem', textAlign: 'center', background: '#FFF' }}>
                      Chưa có ảnh
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        className="btn-secondary-admin"
                        style={{ fontSize: '0.74rem', padding: '4px 8px' }}
                        onClick={() => qrFileInputRef.current?.click()}
                      >
                        📁 Tải ảnh QR từ máy
                      </button>
                      <button
                        type="button"
                        className="btn-secondary-admin"
                        style={{ fontSize: '0.74rem', padding: '4px 8px', background: '#F0FDF4', color: '#166534', borderColor: '#BBF7D0' }}
                        onClick={handleGenerateVietQR}
                        title="Tự động sinh mã VietQR Napas chuẩn ngân hàng"
                      >
                        ⚡ Tự tạo VietQR
                      </button>
                    </div>
                    {bankForm.qrImage && (
                      <button
                        type="button"
                        style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '0.72rem', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                        onClick={() => setBankForm({ ...bankForm, qrImage: '', qrType: 'auto' })}
                      >
                        ✕ Xóa ảnh QR này
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="submit" className="btn-primary-admin" style={{ flex: 1, justifyContent: 'center' }}>
                  💾 Lưu Cấu Hình Ngân Hàng & QR
                </button>
                <button
                  type="button"
                  className="btn-secondary-admin"
                  onClick={() => setIsEditingBank(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: SAO LƯU & DỮ LIỆU HỆ THỐNG                                       */}
        {/* ========================================================================= */}
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="admin-card-title" style={{ marginBottom: '14px', borderBottom: '1px solid #F1E5D1', paddingBottom: '10px' }}>
            💾 Sao Lưu & Dữ Liệu
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            <button
              type="button"
              className="btn-secondary-admin"
              onClick={handleExportJSON}
            >
              📥 Sao lưu dữ liệu hệ thống (Export JSON)
            </button>

            <button
              type="button"
              className="btn-secondary-admin"
              onClick={() => onExportCSV(orders)}
            >
              📊 Xuất báo cáo đơn hàng (Excel CSV)
            </button>

            <button
              type="button"
              className="btn-secondary-admin"
              style={{ background: '#FFF7ED', color: '#C2410C', borderColor: '#FDBA74' }}
              onClick={onSeedDemoOrders}
            >
              ⚡ Nạp 5 đơn hàng mẫu phong phú
            </button>

            <button
              type="button"
              className="btn-secondary-admin"
              onClick={onResetCatalog}
            >
              🔄 Khôi phục kho 36 sản phẩm gốc
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL PHÓNG TO MÃ QR THANH TOÁN (FULLSCREEN QR MODAL)                     */}
      {/* ========================================================================= */}
      {previewQrModal && (
        <div
          className="admin-modal-backdrop"
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
          onClick={() => setPreviewQrModal(false)}
        >
          <div
            className="admin-modal-card"
            style={{ background: '#FFFFFF', maxWidth: '380px', width: '100%', borderRadius: '14px', padding: '24px', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>MÃ QR NHẬN TIỀN</h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#64748B' }}
                onClick={() => setPreviewQrModal(false)}
              >
                ✕
              </button>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '14px' }}>
              <img
                src={activeQrSrc}
                alt="QR Full"
                style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '6px' }}
              />
            </div>

            <div style={{ fontSize: '0.85rem', color: '#0F172A', fontWeight: 700, marginBottom: '4px' }}>
              {bankInfo.bankName}
            </div>
            <div style={{ fontSize: '1.1rem', color: '#C2410C', fontWeight: 800, letterSpacing: '0.5px', marginBottom: '4px' }}>
              STK: {bankInfo.accountNumber}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase', marginBottom: '16px' }}>
              CHỦ TK: {bankInfo.accountHolder}
            </div>

            <button
              type="button"
              className="btn-primary-admin"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => setPreviewQrModal(false)}
            >
              Đóng Cửa Sổ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
