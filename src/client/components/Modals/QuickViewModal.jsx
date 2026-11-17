/**
 * =========================================================================================
 * 📁 TỆP: src/components/Modals/QuickViewModal.jsx
 * 🎯 CHỨC NĂNG: POPUP XEM NHANH CHI TIẾT SẢN PHẨM & CHỌN SIZE (EXACT QUICKVIEW-MODAL REPLICA)
 * =========================================================================================
 * 
 * Khớp chuẩn 100% với CSS trong styles.css:
 * - .modal-backdrop.active, #quickview-modal
 * - .modal-dialog.quickview-dialog, .modal-dialog-header, .btn-close-modal
 * - .modal-dialog-body, .quickview-grid
 * - .quickview-img-box
 * - .quickview-details, .quickview-name, .quickview-price-strip, .quickview-sale-price, .quickview-old-price
 * - .size-pill-selector-row, .size-select-pill.active, .btn-add-cart-large
 * =========================================================================================
 */

import React, { useState, useEffect } from 'react';
import { formatVND } from '../../../data/products';
import { useCart } from '../../../context/CartContext';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : 41);

  // Tự động đồng bộ size đầu tiên khi người dùng bấm sang một sản phẩm khác
  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize(41);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, selectedSize, 1);
    onClose();
  };

  return (
    <div
      className="modal-backdrop active"
      id="quickview-modal"
      onClick={onClose}
    >
      <div className="modal-dialog quickview-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-dialog-header">
          <h3>CHI TIẾT SẢN PHẨM</h3>
          <button type="button" className="btn-close-modal" onClick={onClose} title="Đóng">
            ✕
          </button>
        </div>

        <div className="modal-dialog-body" id="quickview-modal-content">
          <div className="quickview-grid">
            <div className="quickview-img-box">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="quickview-details">
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#C2410C', textTransform: 'uppercase' }}>
                {product.brand} • CHÍNH HÃNG
              </div>
              <h2 className="quickview-name">{product.name}</h2>
              
              <div className="quickview-price-strip">
                <span className="quickview-sale-price">{formatVND(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="quickview-old-price">{formatVND(product.originalPrice)}</span>
                )}
                {product.discount && (
                  <span style={{ background: '#FF0000', color: '#FFF', fontSize: '0.65rem', fontWeight: 900, padding: '2px 6px', borderRadius: '4px' }}>
                    {product.discount}
                  </span>
                )}
              </div>

              <p style={{ fontSize: '0.86rem', color: '#4B5563', lineHeight: 1.6 }}>
                {product.description || 'Sản phẩm giày thể thao phân phối ủy quyền tại hệ thống TC SPORT với bảo hành keo chỉ 12 tháng và đổi hàng 30 ngày.'}
              </p>

              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Chọn kích cỡ:</span>
                  {product.sizeStock && (
                    <span style={{ fontSize: '0.75rem', color: product.sizeStock[selectedSize] > 0 ? '#16A34A' : '#DC2626', fontWeight: 600 }}>
                      {product.sizeStock[selectedSize] > 0 ? `Còn ${product.sizeStock[selectedSize]} đôi trong kho` : '⚠️ Size này đã tạm hết hàng'}
                    </span>
                  )}
                </div>
                <div className="size-pill-selector-row">
                  {(product.sizes || [39, 40, 41, 42, 43]).map((s) => {
                    const isOutOfStock = product.sizeStock && product.sizeStock[s] === 0;
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={isOutOfStock}
                        className={`size-select-pill ${s === selectedSize ? 'active' : ''} ${isOutOfStock ? 'disabled-out-of-stock' : ''}`}
                        onClick={() => !isOutOfStock && setSelectedSize(s)}
                        style={isOutOfStock ? { opacity: 0.45, textDecoration: 'line-through', cursor: 'not-allowed', background: '#F3F4F6' } : {}}
                        title={isOutOfStock ? `Size ${s} đang tạm hết hàng` : `Size ${s}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                className="btn-add-cart-large"
                disabled={product.sizeStock && product.sizeStock[selectedSize] === 0}
                onClick={handleAdd}
                style={product.sizeStock && product.sizeStock[selectedSize] === 0 ? { opacity: 0.5, cursor: 'not-allowed', background: '#9CA3AF' } : {}}
              >
                {product.sizeStock && product.sizeStock[selectedSize] === 0 ? 'TẠM HẾT SIZE NÀY' : 'Thêm Vào Giỏ Hàng'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
