/**
 * =========================================================================================
 * 📁 TỆP: src/admin/pages/AdminCustomers.jsx
 * 🎯 CHỨC NĂNG: QUẢN LÝ DANH SÁCH KHÁCH HÀNG, PHÂN HẠNG VIP, CHỈ SỐ LTV & TƯƠNG TÁC CRM
 * =========================================================================================
 */

import React, { useState, useMemo } from 'react';
import { formatVND } from '../../data/products';

export default function AdminCustomers({ customers, onCopyText }) {
  const [activeSegment, setActiveSegment] = useState('ALL'); // 'ALL' | 'VIP' | 'LOYAL' | 'NEW'
  const [customerSearch, setCustomerSearch] = useState('');

  // Phân hạng khách hàng
  const getCustomerTier = (totalSpent) => {
    if (totalSpent >= 5000000) {
      return {
        name: '👑 VIP Vàng',
        class: 'vip',
        badgeBg: '#FEF3C7',
        badgeColor: '#B45309'
      };
    }
    if (totalSpent >= 2000000) {
      return {
        name: '🌟 Thân Thiết',
        class: 'loyal',
        badgeBg: '#E0F2FE',
        badgeColor: '#0369A1'
      };
    }
    return {
      name: '🆕 Khách Mới',
      class: 'new',
      badgeBg: '#F1F5F9',
      badgeColor: '#475569'
    };
  };

  // Tính số lượng cho từng Tab Phân Hạng
  const segmentCounts = useMemo(() => {
    let vip = 0;
    let loyal = 0;
    let newCust = 0;

    customers.forEach((c) => {
      if (c.totalSpent >= 5000000) vip++;
      else if (c.totalSpent >= 2000000) loyal++;
      else newCust++;
    });

    return {
      ALL: customers.length,
      VIP: vip,
      LOYAL: loyal,
      NEW: newCust
    };
  }, [customers]);

  // Bộ lọc khách hàng
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      // Lọc theo Tab Phân hạng
      if (activeSegment === 'VIP' && c.totalSpent < 5000000) return false;
      if (activeSegment === 'LOYAL' && (c.totalSpent < 2000000 || c.totalSpent >= 5000000)) return false;
      if (activeSegment === 'NEW' && c.totalSpent >= 2000000) return false;

      // Tìm kiếm theo tên, SĐT, địa chỉ
      if (customerSearch.trim()) {
        const q = customerSearch.toLowerCase();
        const matchName = (c.name || '').toLowerCase().includes(q);
        const matchPhone = (c.phone || '').includes(q);
        const matchAddr = (c.address || '').toLowerCase().includes(q);
        if (!matchName && !matchPhone && !matchAddr) return false;
      }

      return true;
    });
  }, [customers, activeSegment, customerSearch]);

  // Tổng hợp chỉ số CRM
  const crmAnalytics = useMemo(() => {
    const totalSpentAll = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);
    const avgLTV = customers.length > 0 ? Math.round(totalSpentAll / customers.length) : 0;
    const totalOrders = customers.reduce((sum, c) => sum + (c.orderCount || 1), 0);
    const repeatCustomers = customers.filter((c) => c.orderCount > 1).length;
    const repeatRate = customers.length > 0 ? Math.round((repeatCustomers / customers.length) * 100) : 0;

    return {
      totalSpentAll,
      avgLTV,
      totalOrders,
      repeatRate
    };
  }, [customers]);

  return (
    <div>
      {/* 1. HEADER TRANG KHÁCH HÀNG */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-header-title">
            <span>👥</span> Danh Sách Khách Hàng & CRM
          </h1>
          <p className="admin-page-header-desc">
            Phân hạng khách hàng VIP, theo dõi giá trị trọn đời (LTV), số đơn đã mua và thông tin giao dịch.
          </p>
        </div>
      </div>

      {/* 2. CHỈ SỐ CRM TỔNG QUAN */}
      <div className="category-analytics-card" style={{ marginBottom: '16px' }}>
        <div className="category-analytics-grid">
          <div className="cat-kpi-item">
            <div className="cat-kpi-label">
              <span>Tổng Khách Hàng</span>
              <span>👥</span>
            </div>
            <div className="cat-kpi-val" style={{ color: '#0F172A' }}>
              {customers.length} <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>người</span>
            </div>
            <div className="cat-kpi-sub">
              {segmentCounts.VIP} VIP Vàng • {segmentCounts.LOYAL} Thân thiết
            </div>
          </div>

          <div className="cat-kpi-item">
            <div className="cat-kpi-label">
              <span>Tổng Doanh Thu CRM</span>
              <span>💰</span>
            </div>
            <div className="cat-kpi-val" style={{ color: '#C2410C' }}>
              {formatVND(crmAnalytics.totalSpentAll)}
            </div>
            <div className="cat-kpi-sub">
              Từ tổng {crmAnalytics.totalOrders} đơn hàng tích lũy
            </div>
          </div>

          <div className="cat-kpi-item">
            <div className="cat-kpi-label">
              <span>Chi Tiêu Trung Bình (LTV)</span>
              <span>💎</span>
            </div>
            <div className="cat-kpi-val" style={{ color: '#16A34A' }}>
              {formatVND(crmAnalytics.avgLTV)}
            </div>
            <div className="cat-kpi-sub">
              Giá trị vòng đời trung bình mỗi khách
            </div>
          </div>

          <div className="cat-kpi-item">
            <div className="cat-kpi-label">
              <span>Tỉ Lệ Mua Lại</span>
              <span>🔄</span>
            </div>
            <div className="cat-kpi-val" style={{ color: '#0284C7' }}>
              {crmAnalytics.repeatRate}%
            </div>
            <div className="cat-kpi-sub">
              Khách hàng quay lại từ lần thứ 2 trở lên
            </div>
          </div>
        </div>
      </div>

      {/* 3. TABS PHÂN HẠNG KHÁCH HÀNG */}
      <div className="customer-segment-tabs">
        <button
          type="button"
          className={`customer-segment-btn ${activeSegment === 'ALL' ? 'active' : ''}`}
          onClick={() => setActiveSegment('ALL')}
        >
          <span>🌐 Tất Cả Khách Hàng</span>
          <span className="category-tab-badge">{segmentCounts.ALL}</span>
        </button>
        <button
          type="button"
          className={`customer-segment-btn ${activeSegment === 'VIP' ? 'active' : ''}`}
          onClick={() => setActiveSegment('VIP')}
        >
          <span>👑 Khách VIP Vàng (&gt; 5 triệu)</span>
          <span className="category-tab-badge">{segmentCounts.VIP}</span>
        </button>
        <button
          type="button"
          className={`customer-segment-btn ${activeSegment === 'LOYAL' ? 'active' : ''}`}
          onClick={() => setActiveSegment('LOYAL')}
        >
          <span>🌟 Khách Thân Thiết (2 - 5 triệu)</span>
          <span className="category-tab-badge">{segmentCounts.LOYAL}</span>
        </button>
        <button
          type="button"
          className={`customer-segment-btn ${activeSegment === 'NEW' ? 'active' : ''}`}
          onClick={() => setActiveSegment('NEW')}
        >
          <span>🆕 Khách Hàng Mới (&lt; 2 triệu)</span>
          <span className="category-tab-badge">{segmentCounts.NEW}</span>
        </button>
      </div>

      {/* 4. Ô TÌM KIẾM KHÁCH HÀNG */}
      <div className="admin-filter-toolbar" style={{ marginBottom: '16px' }}>
        <div className="admin-search-box">
          <span className="admin-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm theo tên khách hàng, số điện thoại, địa chỉ nhận hàng..."
            value={customerSearch}
            onChange={(e) => setCustomerSearch(e.target.value)}
          />
        </div>
        <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>
          Hiển thị: <b style={{ color: '#EA580C' }}>{filteredCustomers.length}</b> khách hàng
        </div>
      </div>

      {/* 5. BẢNG DANH SÁCH KHÁCH HÀNG */}
      <div className="admin-table-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Khách Hàng</th>
                <th>Số Điện Thoại</th>
                <th>Địa Chỉ Giao Hàng</th>
                <th>Số Đơn Đã Mua</th>
                <th>Tổng Chi Tiêu (LTV)</th>
                <th>Hạng Thành Viên</th>
                <th style={{ textAlign: 'center' }}>Liên Hệ Nhanh</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '36px', color: '#64748B' }}>
                    Không tìm thấy khách hàng nào trong mục này.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust, idx) => {
                  const tier = getCustomerTier(cust.totalSpent);
                  return (
                    <tr key={idx}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '50%',
                              background: '#FFEDD5',
                              color: '#C2410C',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontSize: '0.9rem',
                              border: '2px solid #FDBA74'
                            }}
                          >
                            {cust.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, color: '#0F172A' }}>{cust.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                              Đơn gần nhất: {cust.lastOrderDate || '21/10/2026'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <b style={{ color: '#0F172A', fontFamily: 'monospace', fontSize: '0.88rem' }}>
                          {cust.phone}
                        </b>
                      </td>
                      <td style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {cust.address}
                      </td>
                      <td>
                        <b style={{ color: '#C2410C' }}>{cust.orderCount} đơn</b>
                      </td>
                      <td>
                        <b style={{ color: '#16A34A', fontSize: '0.92rem' }}>
                          {formatVND(cust.totalSpent)}
                        </b>
                      </td>
                      <td>
                        <span
                          className="status-badge-pill"
                          style={{
                            background: tier.badgeBg,
                            color: tier.badgeColor,
                            fontWeight: 800
                          }}
                        >
                          {tier.name}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="order-row-actions" style={{ justifyContent: 'center' }}>
                          <a
                            href={`tel:${cust.phone}`}
                            className="btn-icon-action"
                            title="Gọi điện thoại trực tiếp"
                          >
                            📞
                          </a>
                          <button
                            type="button"
                            className="btn-icon-action"
                            onClick={() => onCopyText(cust.phone, `số điện thoại của ${cust.name}`)}
                            title="Sao chép số điện thoại"
                          >
                            📋
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
      </div>
    </div>
  );
}
