/**
 * =========================================================================================
 * 📁 TỆP: src/admin/pages/AdminProducts.jsx
 * 🎯 CHỨC NĂNG: QUẢN LÝ SẢN PHẨM & TỒN KHO - GIAO DIỆN TỐI GIẢN, RÕ RÀNG & CHUYÊN NGHIỆP
 * =========================================================================================
 */

import React, { useState, useMemo } from 'react';
import { formatVND } from '../../data/products';
import ProductModal from '../components/ProductModal';

// 1. Phân bổ tồn kho thực tế theo mức độ tiêu thụ
export const getRealisticSizeStock = (product) => {
  if (product.sizeStock && Object.keys(product.sizeStock).length > 0) {
    return product.sizeStock;
  }

  const sizes = product.sizes || [39, 40, 41, 42, 43];
  const id = Number(product.id) || 1;

  // 6 mẫu HOT bán chạy đứt size (id: 1, 2, 5, 10, 17, 24)
  const outOfStockIds = [1, 2, 5, 10, 17, 24];
  // 11 mẫu bán đều sắp hết (id: 3, 6, 8, 12, 14, 18, 21, 25, 29, 32, 35)
  const lowStockIds = [3, 6, 8, 12, 14, 18, 21, 25, 29, 32, 35];

  const stockMap = {};

  if (outOfStockIds.includes(id)) {
    sizes.forEach((sz, idx) => {
      stockMap[sz] = idx === sizes.length - 1 ? 0 : (idx % 2 === 0 ? 1 : 2);
    });
  } else if (lowStockIds.includes(id)) {
    sizes.forEach((sz, idx) => {
      stockMap[sz] = idx % 2 === 0 ? 1 : 2;
    });
  } else {
    sizes.forEach((sz, idx) => {
      stockMap[sz] = 4 + ((id + idx) % 5);
    });
  }

  return stockMap;
};

// 2. Tính tổng số lượng đôi của 1 sản phẩm
export const calculateProductStock = (product) => {
  const stockMap = getRealisticSizeStock(product);
  const sizes = product.sizes || Object.keys(stockMap).map(Number);
  return sizes.reduce((sum, sz) => sum + (stockMap[sz] ?? 0), 0);
};

// 3. Phân định tình trạng tồn kho chuẩn mực (Không trùng lặp)
export const getStockStatus = (product) => {
  const stockMap = getRealisticSizeStock(product);
  const sizes = product.sizes || Object.keys(stockMap).map(Number);

  let hasZero = false;
  let hasLow = false;
  let totalStock = 0;

  sizes.forEach((sz) => {
    const s = stockMap[sz] ?? 0;
    totalStock += s;
    if (s === 0) hasZero = true;
    else if (s < 3) hasLow = true;
  });

  if (hasZero || totalStock === 0) {
    return {
      status: 'OUT',
      label: 'Hết size',
      badgeBg: '#FEE2E2',
      badgeColor: '#DC2626',
      totalStock
    };
  }

  if (hasLow || totalStock < 14) {
    return {
      status: 'LOW',
      label: 'Sắp hết',
      badgeBg: '#FEF3C7',
      badgeColor: '#B45309',
      totalStock
    };
  }

  return {
    status: 'GOOD',
    label: 'Tồn tốt',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    totalStock
  };
};

export default function AdminProducts({
  products,
  categories = [],
  brands = [],
  onSaveProduct,
  onDeleteProduct,
  onResetCatalog,
  onQuickRestock,
  showToast
}) {
  // Bộ lọc
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedBrand, setSelectedBrand] = useState('ALL');
  const [stockFilter, setStockFilter] = useState('ALL'); // 'ALL' | 'GOOD' | 'LOW' | 'OUT'

  // Phân trang: 10 sản phẩm 1 trang
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Tổng hợp dữ liệu lọc
  const currentPool = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'ALL' && (p.category || '').toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (selectedBrand !== 'ALL' && (p.brand || '').toLowerCase() !== selectedBrand.toLowerCase()) {
        return false;
      }
      if (productSearch.trim()) {
        const q = productSearch.toLowerCase();
        const matchName = (p.name || '').toLowerCase().includes(q);
        const matchBrand = (p.brand || '').toLowerCase().includes(q);
        const matchSku = (p.sku || `TC-${p.id}`).toLowerCase().includes(q);
        if (!matchName && !matchBrand && !matchSku) return false;
      }
      return true;
    });
  }, [products, selectedCategory, selectedBrand, productSearch]);

  // Đếm số lượng tồn kho chính xác theo bộ lọc hiện tại
  const stockCounts = useMemo(() => {
    let good = 0;
    let low = 0;
    let out = 0;

    currentPool.forEach((p) => {
      const st = getStockStatus(p).status;
      if (st === 'OUT') out++;
      else if (st === 'LOW') low++;
      else good++;
    });

    return {
      ALL: currentPool.length,
      GOOD: good,
      LOW: low,
      OUT: out
    };
  }, [currentPool]);

  // Danh sách sản phẩm sau khi lọc theo mức tồn kho
  const filteredProducts = useMemo(() => {
    if (stockFilter === 'ALL') return currentPool;
    return currentPool.filter((p) => getStockStatus(p).status === stockFilter);
  }, [currentPool, stockFilter]);

  // Phân trang 10 sản phẩm
  const totalFilteredCount = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIdx = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredProducts, safeCurrentPage]);

  // Tổng số lượng đôi tồn kho
  const totalStockAll = useMemo(() => {
    return products.reduce((sum, p) => sum + calculateProductStock(p), 0);
  }, [products]);

  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setSelectedProduct(p);
    setIsModalOpen(true);
  };

  const handleSave = (formData, originalProduct) => {
    onSaveProduct(formData, originalProduct);
    setIsModalOpen(false);
  };

  const handleQuickAddStock = (productId, productName) => {
    const amount = 5;
    const targetProd = products.find((p) => p.id === productId);
    if (!targetProd) return;

    const curMap = getRealisticSizeStock(targetProd);
    // Tìm size đang có số lượng ít nhất (ưu tiên size = 0 hoặc < 3) để nhập thêm
    const sizes = targetProd.sizes || Object.keys(curMap).map(Number);
    let targetSize = sizes[0];
    let minQty = Infinity;

    sizes.forEach((sz) => {
      const qty = curMap[sz] ?? 0;
      if (qty < minQty) {
        minQty = qty;
        targetSize = sz;
      }
    });

    if (onQuickRestock) {
      onQuickRestock(productId, targetSize, amount);
    } else {
      const updated = {
        ...targetProd,
        sizeStock: {
          ...curMap,
          [targetSize]: (curMap[targetSize] ?? 0) + amount
        }
      };
      onSaveProduct(updated, targetProd);
      if (showToast) showToast(`Đã nhập thêm +5 đôi (Size ${targetSize}) cho ${productName}!`, 'success');
    }
  };

  return (
    <div>
      {/* 1. HEADER TRANG SẢN PHẨM */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-header-title">Quản Lý Sản Phẩm & Kho Hàng</h1>
          <p className="admin-page-header-desc">
            Quản lý danh sách giày thể thao, mã SKU, phân bổ tồn kho theo size và điều chỉnh giá vốn / giá bán.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn-secondary-admin"
            onClick={onResetCatalog}
            title="Khôi phục lại kho 36 mẫu ban đầu"
          >
            Khôi phục kho gốc
          </button>
          <button
            type="button"
            className="btn-primary-admin"
            onClick={handleOpenAdd}
          >
            + Thêm Sản Phẩm Mới
          </button>
        </div>
      </div>

      {/* 2. CHỈ SỐ TỔNG QUAN TỐI GIẢN (COMPACT METRIC STRIP) */}
      <div className="admin-kpi-grid" style={{ marginBottom: '16px' }}>
        <div className="admin-kpi-card" style={{ padding: '14px 18px' }}>
          <div className="admin-kpi-header">
            <span>Tổng Sản Phẩm</span>
          </div>
          <div className="admin-kpi-val" style={{ fontSize: '1.4rem' }}>
            {products.length} <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>mẫu</span>
          </div>
          <div className="admin-kpi-sub">
            Tổng tồn kho: <b>{totalStockAll.toLocaleString('vi-VN')} đôi</b>
          </div>
        </div>

        <div className="admin-kpi-card" style={{ padding: '14px 18px' }}>
          <div className="admin-kpi-header">
            <span style={{ color: '#16A34A' }}>Tồn Kho Tốt</span>
          </div>
          <div className="admin-kpi-val" style={{ color: '#16A34A', fontSize: '1.4rem' }}>
            {stockCounts.GOOD} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>mẫu</span>
          </div>
          <div className="admin-kpi-sub">
            Mọi size đều sẵn sàng giao ngay
          </div>
        </div>

        <div className="admin-kpi-card" style={{ padding: '14px 18px' }}>
          <div className="admin-kpi-header">
            <span style={{ color: '#D97706' }}>Cảnh Báo Sắp Hết</span>
          </div>
          <div className="admin-kpi-val" style={{ color: '#D97706', fontSize: '1.4rem' }}>
            {stockCounts.LOW} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>mẫu</span>
          </div>
          <div className="admin-kpi-sub">
            Các size chỉ còn 1 - 2 đôi
          </div>
        </div>

        <div className="admin-kpi-card" style={{ padding: '14px 18px' }}>
          <div className="admin-kpi-header">
            <span style={{ color: '#DC2626' }}>Đứt Hàng (Hết Size)</span>
          </div>
          <div className="admin-kpi-val" style={{ color: '#DC2626', fontSize: '1.4rem' }}>
            {stockCounts.OUT} <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>mẫu</span>
          </div>
          <div className="admin-kpi-sub">
            Có ít nhất 1 size đã hết (0 đôi)
          </div>
        </div>
      </div>

      {/* 3. BỘ LỌC TỐI GIẢN & CHUYÊN NGHIỆP */}
      <div className="admin-filter-toolbar" style={{ marginBottom: '16px' }}>
        <div className="admin-search-box" style={{ maxWidth: '280px' }}>
          <span className="admin-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm tên giày, mã SKU..."
            value={productSearch}
            onChange={(e) => {
              setProductSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="admin-filter-select-group">
          {/* Lọc Danh mục */}
          <select
            className="admin-filter-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">Tất cả danh mục</option>
            {categories.map((c) => (
              <option key={c.id} value={c.code || c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Lọc Thương hiệu */}
          <select
            className="admin-filter-select"
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ALL">Tất cả thương hiệu</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name || b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Nút lọc tình trạng tồn */}
          <div style={{ display: 'inline-flex', background: '#F1F5F9', padding: '3px', borderRadius: '8px', gap: '3px' }}>
            <button
              type="button"
              className={`subfilter-pill ${stockFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => {
                setStockFilter('ALL');
                setCurrentPage(1);
              }}
              style={{ border: 'none' }}
            >
              Tất cả ({stockCounts.ALL})
            </button>
            <button
              type="button"
              className={`subfilter-pill ${stockFilter === 'GOOD' ? 'active' : ''}`}
              onClick={() => {
                setStockFilter('GOOD');
                setCurrentPage(1);
              }}
              style={{ border: 'none' }}
            >
              Tồn tốt ({stockCounts.GOOD})
            </button>
            <button
              type="button"
              className={`subfilter-pill ${stockFilter === 'LOW' ? 'active' : ''}`}
              onClick={() => {
                setStockFilter('LOW');
                setCurrentPage(1);
              }}
              style={{ border: 'none' }}
            >
              Sắp hết ({stockCounts.LOW})
            </button>
            <button
              type="button"
              className={`subfilter-pill ${stockFilter === 'OUT' ? 'active' : ''}`}
              onClick={() => {
                setStockFilter('OUT');
                setCurrentPage(1);
              }}
              style={{ border: 'none' }}
            >
              Hết size ({stockCounts.OUT})
            </button>
          </div>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600, marginLeft: 'auto' }}>
          Đang xem: <b style={{ color: '#EA580C' }}>{totalFilteredCount}</b> sản phẩm
        </div>
      </div>

      {/* 4. BẢNG SẢN PHẨM RÕ RÀNG, TINH TẾ */}
      <div className="admin-table-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '56px' }}>Ảnh</th>
                <th style={{ minWidth: '220px' }}>Tên Sản Phẩm & SKU</th>
                <th style={{ width: '130px' }}>Hãng & Danh Mục</th>
                <th style={{ width: '150px' }}>Giá Vốn & Bán</th>
                <th style={{ width: '130px' }}>Lợi Nhuận Gộp</th>
                <th style={{ minWidth: '220px' }}>Tồn Kho Theo Size</th>
                <th style={{ width: '110px', textAlign: 'center' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    Không tìm thấy sản phẩm nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p) => {
                  const cost = p.costPrice || Math.round(p.price * 0.65);
                  const profit = p.price - cost;
                  const margin = Math.round((profit / p.price) * 100);
                  const stockMap = getRealisticSizeStock(p);
                  const statusInfo = getStockStatus(p);
                  const totalUnits = calculateProductStock(p);

                  return (
                    <tr key={p.id}>
                      <td>
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
                        />
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.84rem', lineHeight: 1.35 }}>
                          {p.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                          <span className="inventory-sku-tag">
                            SKU: {p.sku || `TC-${p.id}`}
                          </span>
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              color: statusInfo.badgeColor,
                              background: statusInfo.badgeBg,
                              padding: '1px 6px',
                              borderRadius: '4px'
                            }}
                          >
                            {statusInfo.label}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 800, color: '#C2410C', fontSize: '0.76rem', textTransform: 'uppercase' }}>
                          {p.brand}
                        </span>
                        <div style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'capitalize' }}>
                          {p.category || 'running'}
                        </div>
                      </td>
                      <td>
                        <div>
                          <b style={{ color: '#EA580C', fontSize: '0.88rem' }}>{formatVND(p.price)}</b>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                          Vốn: <b>{formatVND(cost)}</b>
                        </div>
                      </td>
                      <td>
                        <span className="margin-profit-tag">
                          +{formatVND(profit)}
                        </span>
                        <div style={{ fontSize: '0.7rem', color: '#16A34A', fontWeight: 700, marginTop: '2px' }}>
                          Biên lãi: +{margin}%
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                          {(p.sizes || Object.keys(stockMap).map(Number)).map((sz) => {
                            const stock = stockMap[sz] ?? 0;
                            return (
                              <span
                                key={sz}
                                style={{
                                  fontSize: '0.7rem',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontWeight: 700,
                                  background: stock === 0 ? '#FEE2E2' : stock < 3 ? '#FEF3C7' : '#F1F5F9',
                                  color: stock === 0 ? '#DC2626' : stock < 3 ? '#B45309' : '#334155',
                                  border: stock === 0 ? '1px solid #FCA5A5' : stock < 3 ? '1px solid #FDE68A' : '1px solid #E2E8F0'
                                }}
                                title={`Size ${sz}: tồn ${stock} đôi`}
                              >
                                {sz}: <b>{stock}</b>
                              </span>
                            );
                          })}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '4px' }}>
                          Tổng: <b style={{ color: '#0F172A' }}>{totalUnits} đôi</b>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="order-row-actions" style={{ justifyContent: 'center' }}>
                          <button
                            type="button"
                            className="btn-icon-action"
                            onClick={() => handleQuickAddStock(p.id, p.name)}
                            title="Nhập thêm +5 đôi cho size thiếu"
                            style={{ background: '#F0FDF4', color: '#16A34A', borderColor: '#BBF7D0' }}
                          >
                            +5
                          </button>
                          <button
                            type="button"
                            className="btn-icon-action"
                            onClick={() => handleOpenEdit(p)}
                            title="Sửa sản phẩm"
                          >
                            ✏️
                          </button>
                          <button
                            type="button"
                            className="btn-icon-action btn-icon-action-danger"
                            onClick={() => onDeleteProduct(p.id, p.name)}
                            title="Xóa sản phẩm"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 5. THANH PHÂN TRANG 10 SẢN PHẨM 1 TRANG */}
        {totalFilteredCount > 0 && (
          <div className="admin-pagination-wrapper">
            <div className="admin-pagination-info">
              Hiển thị <b>{(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(safeCurrentPage * ITEMS_PER_PAGE, totalFilteredCount)}</b> trong tổng số <b>{totalFilteredCount}</b> sản phẩm
            </div>

            {totalPages > 1 && (
              <div className="admin-pagination-controls">
                <button
                  type="button"
                  className="admin-page-btn"
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage(1)}
                  title="Về trang đầu"
                >
                  «
                </button>
                <button
                  type="button"
                  className="admin-page-btn"
                  disabled={safeCurrentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  title="Trang trước"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    className={`admin-page-btn ${pageNum === safeCurrentPage ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  className="admin-page-btn"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  title="Trang kế tiếp"
                >
                  ›
                </button>
                <button
                  type="button"
                  className="admin-page-btn"
                  disabled={safeCurrentPage === totalPages}
                  onClick={() => setCurrentPage(totalPages)}
                  title="Đến trang cuối"
                >
                  »
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 6. MODAL THÊM / SỬA GIÀY */}
      <ProductModal
        isOpen={isModalOpen}
        product={selectedProduct}
        categories={categories}
        brands={brands}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
