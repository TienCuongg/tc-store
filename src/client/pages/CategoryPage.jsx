/**
 * =========================================================================================
 * 📁 TỆP: src/pages/CategoryPage.jsx
 * 🎯 CHỨC NĂNG: DANH MỤC SẢN PHẨM & BỘ LỌC ĐA TIÊU CHÍ (EXACT CATEGORY.HTML REPLICA)
 * =========================================================================================
 * 
 * Khớp chuẩn 100% với CSS trong styles.css:
 * - .page-wrapper-main, .breadcrumb-nav
 * - .catalog-layout
 * - .filter-sidebar, .filter-group-title, .filter-options-list, .filter-option-item
 * - .size-filter-grid, .size-filter-btn.active
 * - .catalog-top-bar, #sort-select
 * - .grid-5-columns, #catalog-products-grid
 * =========================================================================================
 */

import React, { useState, useMemo } from 'react';
import { ALL_PRODUCTS, getStoredProducts } from '../../data/products';
import ProductCard from '../components/Common/ProductCard';

export default function CategoryPage({ initialFilter = {}, onQuickView, onNavigate }) {
  const [selectedBrand, setSelectedBrand] = useState(initialFilter.brand || 'all');
  const [selectedCategory, setSelectedCategory] = useState(initialFilter.category || 'all');
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState(initialFilter.search || '');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const brands = [
    { id: 'all', name: 'Tất cả thương hiệu' },
    { id: 'Nike', name: 'Nike (Pegasus, Metcon, Infinity)' },
    { id: 'Adidas', name: 'Adidas (Samba, Ultraboost, Adios)' },
    { id: 'Asics', name: 'Asics (Nimbus, Novablast, Speed)' },
    { id: 'Lacoste', name: 'Lacoste (Carnaby, T-Clip, Lineshot)' },
    { id: 'Puma', name: 'Puma (Deviate Nitro, Suede, Rider)' },
    { id: 'Jordan', name: 'Jordan (Retro High, Low, Luka 2)' },
    { id: 'TC Sport', name: 'TC Sport Chính Hãng' }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả bộ môn' },
    { id: 'running', name: 'Chạy bộ (Running)' },
    { id: 'pickleball', name: 'Pickleball & Tennis' },
    { id: 'training', name: 'Tập Gym & Crossfit' },
    { id: 'basketball', name: 'Bóng rổ (Basketball)' },
    { id: 'lifestyle', name: 'Thời trang Lifestyle' }
  ];

  const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  const filteredProducts = useMemo(() => {
    let list = [...getStoredProducts()];

    if (selectedBrand !== 'all') {
      list = list.filter((p) => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (selectedCategory !== 'all') {
      list = list.filter((p) => (p.category || '').toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedSize) {
      list = list.filter((p) => p.sizes && p.sizes.includes(Number(selectedSize)));
    }

    if (selectedPrice === 'under2') {
      list = list.filter((p) => p.price < 2000000);
    } else if (selectedPrice === '2to3') {
      list = list.filter((p) => p.price >= 2000000 && p.price <= 3000000);
    } else if (selectedPrice === 'over3') {
      list = list.filter((p) => p.price > 3000000);
    }

    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q))
      );
    }

    if (initialFilter.sale === 'true') {
      list = list.filter((p) => p.discount && parseInt(p.discount) <= -20);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => b.id - a.id);
    } else {
      list.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
    }

    return list;
  }, [selectedBrand, selectedCategory, selectedSize, selectedPrice, searchKeyword, sortBy, initialFilter.sale]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const handleReset = () => {
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedSize(null);
    setSelectedPrice('all');
    setSearchKeyword('');
    setSortBy('popular');
    setCurrentPage(1);
  };

  return (
    <main className="page-wrapper-main">
      <div className="container">
        
        {/* Breadcrumb */}
        <nav className="breadcrumb-nav">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('home');
            }}
          >
            Trang chủ
          </a>
          <span>›</span>
          <span id="breadcrumb-title" style={{ color: 'var(--text-main)', fontWeight: 700 }}>
            {selectedBrand !== 'all' ? `Giày ${selectedBrand} Chính Hãng` : 'Tất cả sản phẩm chính hãng'}
          </span>
        </nav>

        <div className="catalog-layout">
          
          {/* Cột trái: Bộ lọc Sidebar */}
          <aside className="filter-sidebar">
            
            {/* Hãng giày */}
            <div className="filter-group-title">Thương hiệu</div>
            <ul className="filter-options-list">
              {brands.map((b) => (
                <li key={b.id} className="filter-option-item">
                  <input
                    type="radio"
                    name="brand-filter"
                    id={`filter-brand-${b.id}`}
                    value={b.id}
                    checked={selectedBrand === b.id}
                    onChange={() => {
                      setSelectedBrand(b.id);
                      setCurrentPage(1);
                    }}
                  />
                  <label htmlFor={`filter-brand-${b.id}`}>{b.name}</label>
                </li>
              ))}
            </ul>

            {/* Phân loại bộ môn */}
            <div className="filter-group-title" style={{ marginTop: '18px' }}>Bộ môn / Thể thao</div>
            <ul className="filter-options-list">
              {categories.map((c) => (
                <li key={c.id} className="filter-option-item">
                  <input
                    type="radio"
                    name="category-filter"
                    id={`cat-${c.id}`}
                    value={c.id}
                    checked={selectedCategory === c.id}
                    onChange={() => {
                      setSelectedCategory(c.id);
                      setCurrentPage(1);
                    }}
                  />
                  <label htmlFor={`cat-${c.id}`}>{c.name}</label>
                </li>
              ))}
            </ul>

            {/* Kích thước */}
            <div className="filter-group-title" style={{ marginTop: '18px' }}>Kích thước (Size)</div>
            <div className="size-filter-grid">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`size-filter-btn ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedSize(selectedSize === s ? null : s);
                    setCurrentPage(1);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Khoảng giá */}
            <div className="filter-group-title" style={{ marginTop: '18px' }}>Khoảng giá</div>
            <ul className="filter-options-list">
              {[
                { id: 'all', label: 'Tất cả mức giá' },
                { id: 'under2', label: 'Dưới 2.000.000₫' },
                { id: '2to3', label: '2.000.000₫ - 3.000.000₫' },
                { id: 'over3', label: 'Trên 3.000.000₫' }
              ].map((p) => (
                <li key={p.id} className="filter-option-item">
                  <input
                    type="radio"
                    name="price-filter"
                    id={`price-${p.id}`}
                    value={p.id}
                    checked={selectedPrice === p.id}
                    onChange={() => {
                      setSelectedPrice(p.id);
                      setCurrentPage(1);
                    }}
                  />
                  <label htmlFor={`price-${p.id}`}>{p.label}</label>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="btn-calc-submit"
              style={{ width: '100%', padding: '10px', marginTop: '16px', fontWeight: 700 }}
              onClick={handleReset}
            >
              Đặt Lại Bộ Lọc
            </button>
          </aside>

          {/* Cột phải: Grid sản phẩm */}
          <div>
            <div className="catalog-top-bar">
              <div>
                <b id="catalog-count-label" style={{ fontSize: '0.95rem' }}>
                  Đang hiển thị {filteredProducts.length} sản phẩm
                </b>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>Sắp xếp:</span>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    padding: '4px 10px',
                    border: '1px solid var(--bg-cream-border)',
                    borderRadius: 'var(--radius-xs)',
                    fontSize: '0.84rem',
                    background: '#FFF'
                  }}
                >
                  <option value="popular">Bán chạy nhất</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                  <option value="newest">Hàng mới về</option>
                </select>
              </div>
            </div>

            {/* Product Grid 5 Columns (Phân trang 10 sản phẩm / trang) */}
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px dashed var(--bg-cream-border)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>👟</div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--color-espresso)' }}>
                  Không tìm thấy sản phẩm phù hợp
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '8px 0 20px' }}>
                  Vui lòng thử điều chỉnh lại bộ lọc kích cỡ, thương hiệu hoặc mức giá.
                </p>
                <button type="button" className="btn-calc-submit" onClick={handleReset}>
                  Xem tất cả sản phẩm
                </button>
              </div>
            ) : (
              <>
                <div className="grid-5-columns" id="catalog-products-grid">
                  {paginatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
                  ))}
                </div>

                {/* THANH PHÂN TRANG (10 SẢN PHẨM / TRANG) */}
                {totalPages > 1 && (
                  <div className="client-pagination-bar">
                    <div className="client-pagination-info">
                      Đang hiển thị <b>{(safePage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(safePage * ITEMS_PER_PAGE, totalItems)}</b> trên tổng số <b>{totalItems}</b> sản phẩm
                    </div>
                    <div className="client-pagination-list">
                      <button
                        type="button"
                        className="client-page-btn"
                        disabled={safePage === 1}
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1));
                          window.scrollTo({ top: 180, behavior: 'smooth' });
                        }}
                      >
                        ‹ Trước
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          type="button"
                          className={`client-page-btn ${num === safePage ? 'active' : ''}`}
                          onClick={() => {
                            setCurrentPage(num);
                            window.scrollTo({ top: 180, behavior: 'smooth' });
                          }}
                        >
                          {num}
                        </button>
                      ))}

                      <button
                        type="button"
                        className="client-page-btn"
                        disabled={safePage === totalPages}
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 180, behavior: 'smooth' });
                        }}
                      >
                        Sau ›
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </main>
  );
}
