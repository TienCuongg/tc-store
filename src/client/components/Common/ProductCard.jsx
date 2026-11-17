/**
 * =========================================================================================
 * 📁 TỆP: src/components/Common/ProductCard.jsx
 * 🎯 CHỨC NĂNG: THẺ SẢN PHẨM CHUẨN GIAO DIỆN (EXACT MYSOFT-PRODUCT-CARD REPLICA)
 * =========================================================================================
 * 
 * Khớp chuẩn 100% với CSS trong styles.css:
 * - .mysoft-product-card
 * - .card-media-square, .shoe-profile-img
 * - .badge-left-stack: .badge-sieu-sale-tag, .badge-new-arrival-tag
 * - .badge-right-stack: .badge-discount-percent, .badge-tang-tat
 * - .card-content-wrap, .shoe-card-title, .price-hierarchy-row, .price-sale-bold, .price-old-strike
 * - .card-rating-sales-row, .star-svg, .divider-pipe
 * =========================================================================================
 */

import React from 'react';
import { formatVND } from '../../../data/products';

export default function ProductCard({ product, onQuickView }) {
  const handleCardClick = (e) => {
    e.preventDefault();
    if (onQuickView) onQuickView(product);
  };

  return (
    <a
      href={`?product=${product.id}`}
      className="mysoft-product-card"
      onClick={handleCardClick}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      {/* Khung ảnh vuông với hệ thống huy hiệu 4 góc chuẩn MyShoes */}
      <div className="card-media-square">
        <img
          src={product.image}
          alt={product.name}
          className="shoe-profile-img"
          loading="lazy"
        />
        
        {/* Góc trên bên trái: Huy hiệu Siêu Sale & Hàng mới về */}
        <div className="badge-left-stack">
          <div className="badge-sieu-sale-tag">
            {product.badgeSale || '🎁 SIÊU SALE 🎁'}
          </div>
          {product.badgeNew && (
            <div className="badge-new-arrival-tag">
              {product.badgeNew}
            </div>
          )}
        </div>

        {/* Góc trên bên phải: Phần trăm giảm giá & Quà tặng tất */}
        <div className="badge-right-stack">
          {product.discount && (
            <div className="badge-discount-percent">
              {product.discount}
            </div>
          )}
          <div className="badge-tang-tat">TẶNG TẤT</div>
        </div>
      </div>

      {/* Nội dung chi tiết thẻ */}
      <div className="card-content-wrap">
        <h3 className="shoe-card-title" title={product.name}>
          {product.name}
        </h3>
        
        {/* Dòng giá tiền: Giá sale màu đỏ đậm + Giá cũ gạch ngang */}
        <div className="price-hierarchy-row">
          <span className="price-sale-bold">{formatVND(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="price-old-strike">{formatVND(product.originalPrice)}</span>
          )}
        </div>

        {/* Đánh giá sao và số lượng đã bán */}
        <div className="card-rating-sales-row">
          <svg className="star-svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span>{(product.rating || 5.0).toFixed(1)}</span>
          <span className="divider-pipe">|</span>
          <span>Đã bán {product.soldCount || 100}</span>
        </div>
      </div>
    </a>
  );
}
