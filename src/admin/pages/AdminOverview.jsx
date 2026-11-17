/**
 * =========================================================================================
 * 📁 TỆP: src/admin/pages/AdminOverview.jsx
 * 🎯 CHỨC NĂNG: BÁO CÁO TÀI CHÍNH, DOANH THU, LỢI NHUẬN GỘP & BIỂU ĐỒ TƯƠNG TÁC
 * =========================================================================================
 */

import React from 'react';
import { formatVND } from '../../data/products';

export default function AdminOverview({ analytics, products, onNavigateTab }) {
  const weeklyChartData = [
    { day: 'T2', amount: 8400000, height: 55 },
    { day: 'T3', amount: 11200000, height: 75 },
    { day: 'T4', amount: 6900000, height: 45 },
    { day: 'T5', amount: 14500000, height: 95 },
    { day: 'T6', amount: 12800000, height: 85 },
    { day: 'T7', amount: 18900000, height: 100 },
    { day: 'CN', amount: 16200000, height: 88 },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-header-title">
            Tổng Quan Hệ Thống & Vận Hành
          </h1>
          <p className="admin-page-header-desc">
            Thống kê hiệu suất kinh doanh, giá vốn và biên lợi nhuận thời gian thực.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="btn-secondary-admin"
            onClick={() => onNavigateTab('revenue')}
          >
            Báo Cáo Doanh Thu Chi Tiết →
          </button>
          <button
            type="button"
            className="btn-primary-admin"
            onClick={() => onNavigateTab('orders')}
          >
            Quản lý đơn hàng →
          </button>
        </div>
      </div>

      {/* 4 THẺ CHỈ SỐ KPI TÀI CHÍNH */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span>Tổng Doanh Thu</span>
            <span style={{ fontSize: '1.1rem' }}>💰</span>
          </div>
          <div className="admin-kpi-val">{formatVND(analytics.grossRevenue)}</div>
          <div className="admin-kpi-sub">
            <span>↑ 18.4%</span> so với tháng trước
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span>Lợi Nhuận Gộp (Est.)</span>
            <span style={{ fontSize: '1.1rem' }}>📈</span>
          </div>
          <div className="admin-kpi-val" style={{ color: '#16A34A' }}>
            {formatVND(analytics.grossProfit)}
          </div>
          <div className="admin-kpi-sub" style={{ color: '#16A34A' }}>
            Biên lợi nhuận gộp: <b>~{analytics.profitMargin}%</b>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span>Giá Trị Đơn Trung Bình (AOV)</span>
            <span style={{ fontSize: '1.1rem' }}>🛒</span>
          </div>
          <div className="admin-kpi-val">{formatVND(analytics.aov)}</div>
          <div className="admin-kpi-sub" style={{ color: '#2563EB' }}>
            Tỷ lệ hoàn thành: <b>92.5%</b>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span>Đơn Chờ Chuẩn Bị Hàng</span>
            <span style={{ fontSize: '1.1rem' }}>⏳</span>
          </div>
          <div className="admin-kpi-val" style={{ color: '#EA580C' }}>
            {analytics.pendingCount} đơn
          </div>
          <div className="admin-kpi-sub" style={{ color: '#D97706' }}>
            Cần đóng gói & bàn giao ngay
          </div>
        </div>
      </div>

      {/* BIỂU ĐỒ DOANH THU & TOP SẢN PHẨM */}
      <div className="admin-charts-grid">
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <span>📈</span> Doanh Thu 7 Ngày Gần Nhất
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
              Tuần hiện tại
            </span>
          </div>

          <div className="chart-container">
            {weeklyChartData.map((item, idx) => (
              <div key={idx} className="chart-bar-group">
                <div className="chart-tooltip">{formatVND(item.amount)}</div>
                <div className="chart-bar" style={{ height: `${item.height}%` }}></div>
                <div className="chart-label">{item.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">
              <span>🔥</span> Top Mẫu Giày Bán Chạy
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {products.slice(0, 4).map((p, idx) => (
              <div
                key={p.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  paddingBottom: '8px',
                  borderBottom: idx < 3 ? '1px dashed #E2E8F0' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#0F172A', maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                      Đã bán: <b>{p.soldCount || 198} đôi</b>
                    </div>
                  </div>
                </div>
                <b style={{ color: '#EA580C', fontSize: '0.8rem' }}>{formatVND(p.price)}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
