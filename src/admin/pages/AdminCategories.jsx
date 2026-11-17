/**
 * =========================================================================================
 * 📁 TỆP: src/admin/pages/AdminCategories.jsx
 * 🎯 CHỨC NĂNG: QUẢN LÝ DANH MỤC THỂ THAO & THƯƠNG HIỆU HÃNG (THÊM / SỬA / XÓA)
 * =========================================================================================
 */

import React, { useState } from 'react';

export const DEFAULT_CATEGORIES = [
  { id: 'running', code: 'running', name: 'Giày Chạy Bộ (Running)', desc: 'Giày marathon, daily trainer, đệm êm bứt tốc' },
  { id: 'lifestyle', code: 'lifestyle', name: 'Sneaker & Lifestyle', desc: 'Thời trang dạo phố, phong cách retro streetwear' },
  { id: 'pickleball', code: 'pickleball', name: 'Pickleball & Tennis', desc: 'Giày sân cứng, đế bám chống lật cổ chân' },
  { id: 'training', code: 'training', name: 'Gym & Training', desc: 'Tập tạ, metcon, kháng lực & crossfit' },
  { id: 'basketball', code: 'basketball', name: 'Bóng Rổ & Jordan', desc: 'Giày bóng rổ indoor/outdoor, đệm khí Air' },
];

export const DEFAULT_BRANDS = [
  { id: 'Nike', name: 'Nike', origin: 'Mỹ (USA)', desc: 'Just Do It - Giày thể thao hàng đầu thế giới' },
  { id: 'Adidas', name: 'Adidas', origin: 'Đức (Germany)', desc: 'Impossible Is Nothing - Samba, Ultraboost, Adios' },
  { id: 'Asics', name: 'Asics', origin: 'Nhật Bản (Japan)', desc: 'Anima Sana In Corpore Sano - Gel Nimbus, Kayano' },
  { id: 'TC Sport', name: 'TC Sport', origin: 'Việt Nam (VN)', desc: 'Thương hiệu độc quyền chuyên Pickleball & Running' },
  { id: 'Puma', name: 'Puma', origin: 'Đức (Germany)', desc: 'Forever Faster - Deviate Nitro, Suede Classic' },
  { id: 'Lacoste', name: 'Lacoste', origin: 'Pháp (France)', desc: 'Thương hiệu cá sấu di sản quần vợt sang trọng' },
  { id: 'Jordan', name: 'Jordan', origin: 'Mỹ (USA)', desc: 'Huyền thoại bóng rổ Michael Jordan & Nike' },
];

export function getStoredCategories() {
  try {
    const raw = localStorage.getItem('tc_admin_categories');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Lỗi tải danh mục:', err);
  }
  return DEFAULT_CATEGORIES;
}

export function saveStoredCategories(cats) {
  try {
    localStorage.setItem('tc_admin_categories', JSON.stringify(cats));
    window.dispatchEvent(new Event('tc_categories_updated'));
  } catch (err) {
    console.error('Lỗi lưu danh mục:', err);
  }
}

export function getStoredBrands() {
  try {
    const raw = localStorage.getItem('tc_admin_brands');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.error('Lỗi tải thương hiệu:', err);
  }
  return DEFAULT_BRANDS;
}

export function saveStoredBrands(brands) {
  try {
    localStorage.setItem('tc_admin_brands', JSON.stringify(brands));
    window.dispatchEvent(new Event('tc_brands_updated'));
  } catch (err) {
    console.error('Lỗi lưu thương hiệu:', err);
  }
}

export default function AdminCategories({ products, categories, setCategories, brands, setBrands, showToast }) {
  const [subTab, setSubTab] = useState('categories'); // 'categories' | 'brands'

  // State Modal Danh mục
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [catFormData, setCatFormData] = useState({ name: '', code: '', desc: '' });

  // State Modal Thương hiệu
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [brandFormData, setBrandFormData] = useState({ name: '', origin: '', desc: '' });

  // 1. Mở modal thêm/sửa danh mục
  const handleOpenCatModal = (cat = null) => {
    if (cat) {
      setEditingCat(cat);
      setCatFormData({ name: cat.name, code: cat.code || cat.id, desc: cat.desc || '' });
    } else {
      setEditingCat(null);
      setCatFormData({ name: '', code: '', desc: '' });
    }
    setIsCatModalOpen(true);
  };

  const handleSaveCat = (e) => {
    e.preventDefault();
    if (!catFormData.name.trim()) {
      alert('Vui lòng nhập tên danh mục!');
      return;
    }
    const code = (catFormData.code || catFormData.name.toLowerCase().replace(/\s+/g, '-')).trim();

    let updated;
    if (editingCat) {
      updated = categories.map((c) =>
        c.id === editingCat.id ? { ...c, name: catFormData.name.trim(), code, desc: catFormData.desc.trim() } : c
      );
      if (showToast) showToast(`Đã cập nhật danh mục: ${catFormData.name}`, 'success');
    } else {
      const newCat = {
        id: code,
        code,
        name: catFormData.name.trim(),
        desc: catFormData.desc.trim()
      };
      updated = [...categories, newCat];
      if (showToast) showToast(`Đã thêm danh mục mới: ${catFormData.name}`, 'success');
    }
    setCategories(updated);
    saveStoredCategories(updated);
    setIsCatModalOpen(false);
  };

  const handleDeleteCat = (catId, catName) => {
    const count = products.filter((p) => (p.category || '').toLowerCase() === catId.toLowerCase()).length;
    const msg = count > 0
      ? `Danh mục "${catName}" hiện đang có ${count} sản phẩm trong kho. Bạn có chắc chắn muốn xóa không?`
      : `Bạn có chắc muốn xóa danh mục "${catName}"?`;

    if (window.confirm(msg)) {
      const updated = categories.filter((c) => c.id !== catId);
      setCategories(updated);
      saveStoredCategories(updated);
      if (showToast) showToast(`Đã xóa danh mục ${catName}`, 'info');
    }
  };

  // 2. Mở modal thêm/sửa thương hiệu
  const handleOpenBrandModal = (b = null) => {
    if (b) {
      setEditingBrand(b);
      setBrandFormData({ name: b.name, origin: b.origin || '', desc: b.desc || '' });
    } else {
      setEditingBrand(null);
      setBrandFormData({ name: '', origin: '', desc: '' });
    }
    setIsBrandModalOpen(true);
  };

  const handleSaveBrand = (e) => {
    e.preventDefault();
    if (!brandFormData.name.trim()) {
      alert('Vui lòng nhập tên thương hiệu!');
      return;
    }

    let updated;
    if (editingBrand) {
      updated = brands.map((b) =>
        b.id === editingBrand.id
          ? { ...b, name: brandFormData.name.trim(), origin: brandFormData.origin.trim(), desc: brandFormData.desc.trim() }
          : b
      );
      if (showToast) showToast(`Đã cập nhật thương hiệu: ${brandFormData.name}`, 'success');
    } else {
      const newBrand = {
        id: brandFormData.name.trim(),
        name: brandFormData.name.trim(),
        origin: brandFormData.origin.trim() || 'Chính hãng',
        desc: brandFormData.desc.trim()
      };
      updated = [...brands, newBrand];
      if (showToast) showToast(`Đã thêm thương hiệu mới: ${brandFormData.name}`, 'success');
    }
    setBrands(updated);
    saveStoredBrands(updated);
    setIsBrandModalOpen(false);
  };

  const handleDeleteBrand = (brandId, brandName) => {
    const count = products.filter((p) => (p.brand || '').toLowerCase() === brandId.toLowerCase()).length;
    const msg = count > 0
      ? `Thương hiệu "${brandName}" hiện đang có ${count} sản phẩm trong kho. Bạn có chắc muốn xóa không?`
      : `Bạn có chắc muốn xóa thương hiệu "${brandName}"?`;

    if (window.confirm(msg)) {
      const updated = brands.filter((b) => b.id !== brandId);
      setBrands(updated);
      saveStoredBrands(updated);
      if (showToast) showToast(`Đã xóa thương hiệu ${brandName}`, 'info');
    }
  };

  return (
    <div>
      {/* 1. HEADER TRANG QUẢN LÝ DANH MỤC */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-header-title">Quản Lý Danh Mục & Thương Hiệu</h1>
          <p className="admin-page-header-desc">
            Thiết lập danh mục bộ môn thể thao và các thương hiệu phân phối trong hệ thống.
          </p>
        </div>
        <div>
          {subTab === 'categories' ? (
            <button
              type="button"
              className="btn-primary-admin"
              onClick={() => handleOpenCatModal()}
            >
              + Thêm Danh Mục Mới
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary-admin"
              onClick={() => handleOpenBrandModal()}
            >
              + Thêm Thương Hiệu Mới
            </button>
          )}
        </div>
      </div>

      {/* 2. CHUYỂN ĐỔI TAB: DANH MỤC BỘ MÔN VS THƯƠNG HIỆU */}
      <div className="dimension-switcher-bar" style={{ marginBottom: '16px' }}>
        <div className="dimension-toggle-group">
          <button
            type="button"
            className={`dimension-toggle-btn ${subTab === 'categories' ? 'active' : ''}`}
            onClick={() => setSubTab('categories')}
          >
            Danh Mục Bộ Môn ({categories.length})
          </button>
          <button
            type="button"
            className={`dimension-toggle-btn ${subTab === 'brands' ? 'active' : ''}`}
            onClick={() => setSubTab('brands')}
          >
            Thương Hiệu / Hãng ({brands.length})
          </button>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
          {subTab === 'categories'
            ? `Tổng cộng: ${categories.length} danh mục thể thao`
            : `Tổng cộng: ${brands.length} thương hiệu phân phối`}
        </div>
      </div>

      {/* 3. BẢNG DANH MỤC BỘ MÔN */}
      {subTab === 'categories' && (
        <div className="admin-table-card">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '220px' }}>Tên Danh Mục</th>
                  <th style={{ width: '140px' }}>Mã Định Danh (Slug)</th>
                  <th>Mô Tả Danh Mục</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Số Sản Phẩm</th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => {
                  const prodCount = products.filter(
                    (p) => (p.category || '').toLowerCase() === (cat.id || cat.code).toLowerCase()
                  ).length;

                  return (
                    <tr key={cat.id}>
                      <td>
                        <b style={{ color: '#0F172A', fontSize: '0.88rem' }}>{cat.name}</b>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: '#64748B', background: '#F1F5F9', padding: '3px 8px', borderRadius: '4px' }}>
                          {cat.code || cat.id}
                        </span>
                      </td>
                      <td style={{ color: '#475569', fontSize: '0.82rem' }}>
                        {cat.desc || 'Chưa có mô tả'}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 800, color: '#C2410C', background: '#FFEDD5', padding: '3px 9px', borderRadius: '12px', fontSize: '0.76rem' }}>
                          {prodCount} sản phẩm
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="order-row-actions" style={{ justifyContent: 'center' }}>
                          <button
                            type="button"
                            className="btn-icon-action"
                            onClick={() => handleOpenCatModal(cat)}
                            title="Sửa danh mục"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            className="btn-icon-action btn-icon-action-danger"
                            onClick={() => handleDeleteCat(cat.id, cat.name)}
                            title="Xóa danh mục"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. BẢNG THƯƠNG HIỆU */}
      {subTab === 'brands' && (
        <div className="admin-table-card">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '180px' }}>Tên Thương Hiệu</th>
                  <th style={{ width: '140px' }}>Xuất Xứ</th>
                  <th>Mô Tả & Định Vị</th>
                  <th style={{ width: '130px', textAlign: 'center' }}>Số Sản Phẩm</th>
                  <th style={{ width: '100px', textAlign: 'center' }}>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((b) => {
                  const prodCount = products.filter(
                    (p) => (p.brand || '').toLowerCase() === (b.name || b.id).toLowerCase()
                  ).length;

                  return (
                    <tr key={b.id}>
                      <td>
                        <b style={{ color: '#0F172A', fontSize: '0.88rem' }}>{b.name}</b>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.78rem', color: '#0369A1', background: '#E0F2FE', padding: '3px 8px', borderRadius: '4px', fontWeight: 700 }}>
                          {b.origin || 'Quốc tế'}
                        </span>
                      </td>
                      <td style={{ color: '#475569', fontSize: '0.82rem' }}>
                        {b.desc || 'Thương hiệu giày thể thao chính hãng'}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 800, color: '#C2410C', background: '#FFEDD5', padding: '3px 9px', borderRadius: '12px', fontSize: '0.76rem' }}>
                          {prodCount} sản phẩm
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="order-row-actions" style={{ justifyContent: 'center' }}>
                          <button
                            type="button"
                            className="btn-icon-action"
                            onClick={() => handleOpenBrandModal(b)}
                            title="Sửa thương hiệu"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            className="btn-icon-action btn-icon-action-danger"
                            onClick={() => handleDeleteBrand(b.id, b.name)}
                            title="Xóa thương hiệu"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. MODAL THÊM / SỬA DANH MỤC */}
      {isCatModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsCatModalOpen(false)}>
          <div className="admin-modal-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSaveCat}>
              <div className="admin-modal-header">
                <div className="admin-modal-title">
                  {editingCat ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}
                </div>
                <button
                  type="button"
                  className="btn-close-admin-modal"
                  onClick={() => setIsCatModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                    Tên Danh Mục *
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-filter-select"
                    style={{ width: '100%', padding: '10px 14px', fontSize: '0.88rem' }}
                    placeholder="Ví dụ: Giày Cầu Lông (Badminton), Giày Đi Bộ..."
                    value={catFormData.name}
                    onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                    Mã Định Danh (Slug code)
                  </label>
                  <input
                    type="text"
                    className="admin-filter-select"
                    style={{ width: '100%', padding: '10px 14px', fontSize: '0.88rem' }}
                    placeholder="Ví dụ: badminton, walking (viết thường không dấu)"
                    value={catFormData.code}
                    onChange={(e) => setCatFormData({ ...catFormData, code: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                    Mô Tả Danh Mục
                  </label>
                  <textarea
                    rows="3"
                    className="admin-filter-select"
                    style={{ width: '100%', padding: '10px 14px', fontSize: '0.88rem', fontFamily: 'inherit', resize: 'vertical' }}
                    placeholder="Mô tả ngắn gọn về nhóm sản phẩm này..."
                    value={catFormData.desc}
                    onChange={(e) => setCatFormData({ ...catFormData, desc: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn-secondary-admin"
                  onClick={() => setIsCatModalOpen(false)}
                >
                  Hủy Bỏ
                </button>
                <button type="submit" className="btn-primary-admin">
                  {editingCat ? 'Lưu Cập Nhật' : 'Tạo Danh Mục Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL THÊM / SỬA THƯƠNG HIỆU */}
      {isBrandModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsBrandModalOpen(false)}>
          <div className="admin-modal-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSaveBrand}>
              <div className="admin-modal-header">
                <div className="admin-modal-title">
                  {editingBrand ? 'Chỉnh Sửa Thương Hiệu' : 'Thêm Thương Hiệu Mới'}
                </div>
                <button
                  type="button"
                  className="btn-close-admin-modal"
                  onClick={() => setIsBrandModalOpen(false)}
                >
                  ✕
                </button>
              </div>

              <div className="admin-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                    Tên Thương Hiệu *
                  </label>
                  <input
                    type="text"
                    required
                    className="admin-filter-select"
                    style={{ width: '100%', padding: '10px 14px', fontSize: '0.88rem' }}
                    placeholder="Ví dụ: New Balance, Under Armour, Mizuno..."
                    value={brandFormData.name}
                    onChange={(e) => setBrandFormData({ ...brandFormData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                    Xuất Xứ / Quốc Gia
                  </label>
                  <input
                    type="text"
                    className="admin-filter-select"
                    style={{ width: '100%', padding: '10px 14px', fontSize: '0.88rem' }}
                    placeholder="Ví dụ: Mỹ (USA), Nhật Bản (Japan), Đức (Germany)..."
                    value={brandFormData.origin}
                    onChange={(e) => setBrandFormData({ ...brandFormData, origin: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                    Mô Tả Thương Hiệu
                  </label>
                  <textarea
                    rows="3"
                    className="admin-filter-select"
                    style={{ width: '100%', padding: '10px 14px', fontSize: '0.88rem', fontFamily: 'inherit', resize: 'vertical' }}
                    placeholder="Giới thiệu đôi nét về thương hiệu hoặc dòng sản phẩm nổi bật..."
                    value={brandFormData.desc}
                    onChange={(e) => setBrandFormData({ ...brandFormData, desc: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn-secondary-admin"
                  onClick={() => setIsBrandModalOpen(false)}
                >
                  Hủy Bỏ
                </button>
                <button type="submit" className="btn-primary-admin">
                  {editingBrand ? 'Lưu Cập Nhật' : 'Tạo Thương Hiệu Mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
