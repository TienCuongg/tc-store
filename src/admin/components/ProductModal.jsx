/**
 * =========================================================================================
 * 📁 TỆP: src/admin/components/ProductModal.jsx
 * 🎯 CHỨC NĂNG: MODAL THÊM / SỬA MẪU GIÀY VÀ QUẢN LÝ TỒN KHO THEO SIZE DÀNH CHO ADMIN
 * =========================================================================================
 */

import React, { useState, useEffect, useRef } from 'react';

const PRESET_PRODUCT_IMAGES = [
  { label: 'Nike Pegasus 40 Blue', path: 'assets/images/shoe-pegasus-blue.jpg' },
  { label: 'Air Jordan 1 Retro Red', path: 'assets/images/shoe-retro-high.jpg' },
  { label: 'Nike Metcon 5 Volt', path: 'assets/images/shoe-metcon-volt.jpg' },
  { label: 'Asics Gel Kayano Runner', path: 'assets/images/shoe-asics-runner.jpg' },
  { label: 'Pickleball Court Pro', path: 'assets/images/shoe-pickleball-pro.jpg' },
  { label: 'Speed Pro Running', path: 'assets/images/shoe-running-pro.jpg' },
  { label: 'Beige Lifestyle Retro', path: 'assets/images/shoe-beige-retro.jpg' },
  { label: 'Hero Sneaker Edition', path: 'assets/images/hero-sneaker.jpg' },
];

export default function ProductModal({ product, isOpen, onClose, onSave, categories = [], brands = [] }) {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: `TC-${Math.floor(1000 + Math.random() * 9000)}`,
    brand: 'Nike',
    category: 'running',
    price: 2500000,
    costPrice: 1650000,
    originalPrice: 3200000,
    sizes: [39, 40, 41, 42, 43],
    sizeStock: { 38: 5, 39: 8, 40: 10, 41: 6, 42: 2, 43: 0, 44: 4 },
    image: 'assets/images/shoe-pegasus-blue.jpg',
    description: 'Giày thể thao cao cấp chính hãng nhập khẩu, đệm trợ lực êm ái.'
  });

  // Default brands fallback if none provided
  const activeBrands = brands.length > 0 
    ? brands 
    : [
        { id: 'b1', name: 'Nike' },
        { id: 'b2', name: 'Adidas' },
        { id: 'b3', name: 'Asics' },
        { id: 'b4', name: 'Puma' },
        { id: 'b5', name: 'Lacoste' },
        { id: 'b6', name: 'Jordan' },
        { id: 'b7', name: 'TC Sport' }
      ];

  // Default categories fallback if none provided
  const activeCategories = categories.length > 0
    ? categories
    : [
        { id: 'c1', key: 'running', name: 'Chạy bộ (Running)' },
        { id: 'c2', key: 'football', name: 'Bóng đá (Football)' },
        { id: 'c3', key: 'pickleball', name: 'Pickleball / Tennis' },
        { id: 'c4', key: 'training', name: 'Gym & Training' },
        { id: 'c5', key: 'lifestyle', name: 'Sneaker Lifestyle' },
        { id: 'c6', key: 'basketball', name: 'Bóng rổ & Jordan' }
      ];

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || `TC-${product.id}`,
        brand: product.brand || 'Nike',
        category: product.category || 'running',
        price: product.price || 2500000,
        costPrice: product.costPrice || Math.round((product.price || 2500000) * 0.65),
        originalPrice: product.originalPrice || product.price || 3200000,
        sizes: product.sizes || [39, 40, 41, 42],
        sizeStock: product.sizeStock || { 38: 5, 39: 8, 40: 10, 41: 6, 42: 2, 43: 0, 44: 4 },
        image: product.image || 'assets/images/shoe-pegasus-blue.jpg',
        description: product.description || ''
      });
    } else {
      setFormData({
        name: '',
        sku: `TC-${Math.floor(1000 + Math.random() * 9000)}`,
        brand: activeBrands[0]?.name || 'Nike',
        category: activeCategories[0]?.key || 'running',
        price: 2500000,
        costPrice: 1650000,
        originalPrice: 3200000,
        sizes: [39, 40, 41, 42, 43],
        sizeStock: { 38: 5, 39: 8, 40: 10, 41: 6, 42: 2, 43: 0, 44: 4 },
        image: 'assets/images/shoe-pegasus-blue.jpg',
        description: 'Giày thể thao cao cấp chính hãng nhập khẩu, đệm trợ lực êm ái.'
      });
    }
  }, [product, isOpen]);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WEBP, GIF)!');
      return;
    }

    // Thử tải trực tiếp lên server Spring Boot để lấy URL thật
    import('../../services/api').then(({ api }) => {
      api.uploadImage(file).then((res) => {
        if (res && res.url) {
          setFormData((prev) => ({ ...prev, image: res.url }));
        }
      }).catch((err) => {
        console.warn('Upload API server chưa sẵn sàng, chuyển sang mã hóa Base64:', err);
      });
    }).catch(() => {});

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Tối ưu hóa kích thước ảnh tối đa 800px để lưu trữ an toàn trong LocalStorage
        const maxDim = 800;
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
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

        setFormData((prev) => ({ ...prev, image: optimizedDataUrl }));
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên giày thể thao!');
      return;
    }
    onSave(formData, product);
  };

  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="admin-modal-header">
            <div className="admin-modal-title">
              {product ? 'Chỉnh Sửa Mẫu Giày' : 'Thêm Mới Mẫu Giày Thể Thao'}
            </div>
            <button type="button" className="btn-close-admin-modal" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="admin-modal-body">
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                Tên Giày Thể Thao *
              </label>
              <input
                type="text"
                required
                className="admin-filter-select"
                style={{ width: '100%', padding: '8px 10px' }}
                placeholder="Ví dụ: Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                  Mã SKU *
                </label>
                <input
                  type="text"
                  className="admin-filter-select"
                  style={{ width: '100%', padding: '8px 10px' }}
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                  Thương Hiệu *
                </label>
                <select
                  className="admin-filter-select"
                  style={{ width: '100%', padding: '8px 10px' }}
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                >
                  {activeBrands.map((b) => (
                    <option key={b.id || b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px' }}>
                  Môn Thể Thao *
                </label>
                <select
                  className="admin-filter-select"
                  style={{ width: '100%', padding: '8px 10px' }}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {activeCategories.map((c) => (
                    <option key={c.id || c.key} value={c.key}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tài chính: Giá bán & Giá vốn */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px', background: '#F8FAFC', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#C2410C', marginBottom: '4px' }}>
                  Giá Bán Lẻ (VNĐ) *
                </label>
                <input
                  type="number"
                  required
                  step="10000"
                  className="admin-filter-select"
                  style={{ width: '100%', padding: '8px 10px' }}
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Giá Vốn Nhập Kho (VNĐ)
                </label>
                <input
                  type="number"
                  step="10000"
                  className="admin-filter-select"
                  style={{ width: '100%', padding: '8px 10px' }}
                  value={formData.costPrice}
                  onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                />
              </div>
            </div>

            {/* Quản lý tồn kho theo từng size */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, marginBottom: '6px' }}>
                Tồn Kho Chi Tiết Theo Từng Size (Số lượng đôi trong kho)
              </label>
              <div className="size-stock-matrix">
                {[38, 39, 40, 41, 42, 43, 44].map((sz) => {
                  const currentQty = formData.sizeStock?.[sz] ?? 5;
                  return (
                    <div key={sz} className="size-stock-box">
                      <div className="size-stock-number">Size {sz}</div>
                      <input
                        type="number"
                        min="0"
                        style={{ width: '100%', textAlign: 'center', padding: '3px', borderRadius: '4px', border: '1px solid #CBD5E1', marginTop: '3px', fontSize: '0.8rem' }}
                        value={currentQty}
                        onChange={(e) => {
                          const val = Math.max(0, parseInt(e.target.value, 10) || 0);
                          setFormData({
                            ...formData,
                            sizeStock: {
                              ...(formData.sizeStock || {}),
                              [sz]: val
                            }
                          });
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chọn ảnh đại diện: Tải từ máy tính / thư mục, nhập link, hoặc chọn preset */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A' }}>
                  Ảnh Sản Phẩm *
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '5px 12px',
                    background: '#FFF7ED',
                    color: '#C2410C',
                    border: '1px solid #FDBA74',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#EA580C';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFF7ED';
                    e.currentTarget.style.color = '#C2410C';
                  }}
                >
                  📁 Chọn ảnh từ máy tính (Thư mục)
                </button>
              </div>

              {/* Input file ẩn */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageFileChange}
              />

              {/* Khung ảnh xem trước và ô link */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '8px',
                    border: '2px solid #EA580C',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  title="Bấm để thay đổi ảnh từ máy"
                >
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <span style={{ fontSize: '1.2rem' }}>📷</span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    className="admin-filter-select"
                    style={{ width: '100%', padding: '8px 10px', fontSize: '0.82rem' }}
                    placeholder="Đường dẫn ảnh hoặc tải từ thư mục máy tính..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '3px' }}>
                    💡 Bạn có thể bấm nút màu cam ở trên để mở thư mục máy tính và chọn tệp ảnh bất kỳ (PNG, JPG, WEBP).
                  </div>
                </div>
              </div>

              {/* Ảnh preset chọn nhanh */}
              <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '5px', fontWeight: 600 }}>
                Hoặc chọn nhanh ảnh mẫu có sẵn:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px' }}>
                {PRESET_PRODUCT_IMAGES.map((preset, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: formData.image === preset.path ? '2px solid #EA580C' : '1px solid #CBD5E1',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      aspectRatio: 1
                    }}
                    onClick={() => setFormData({ ...formData, image: preset.path })}
                    title={preset.label}
                  >
                    <img src={preset.path} alt={preset.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button type="button" className="btn-secondary-admin" onClick={onClose}>
              Hủy Bỏ
            </button>
            <button type="submit" className="btn-primary-admin">
              {product ? 'Lưu Cập Nhật' : 'Tạo Sản Phẩm Mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
