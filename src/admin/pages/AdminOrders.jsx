/**
 * =========================================================================================
 * 📁 TỆP: src/admin/pages/AdminOrders.jsx
 * 🎯 CHỨC NĂNG: QUẢN LÝ ĐƠN HÀNG, VẬN CHUYỂN, BỘ LỌC TABS & THAO TÁC HÀNG LOẠT
 * =========================================================================================
 */

import React, { useState, useMemo } from 'react';
import OrderDetailModal from '../components/OrderDetailModal';
import PrintableInvoiceModal from '../components/PrintableInvoiceModal';

export default function AdminOrders({
  orders,
  onUpdateStatus,
  onBulkUpdateStatus,
  onBulkDelete,
  onDeleteSingleOrder,
  onSaveShippingAndNote,
  onExportCSV,
  onCopyText
}) {
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusTab, setOrderStatusTab] = useState('ALL');
  const [orderCarrierFilter, setOrderCarrierFilter] = useState('ALL');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState('ALL');

  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [activeOrderDetail, setActiveOrderDetail] = useState(null);
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState(null);

  // Đếm số lượng đơn cho từng tab
  const counts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === 'Đang chuẩn bị hàng').length,
      shipping: orders.filter((o) => o.status === 'Đang giao hàng').length,
      completed: orders.filter((o) => o.status === 'Đã giao thành công' || o.status === 'Hoàn thành').length,
      cancelled: orders.filter((o) => o.status === 'Đã hủy đơn').length,
    };
  }, [orders]);

  // Bộ lọc dữ liệu
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (orderStatusTab !== 'ALL' && o.status !== orderStatusTab) return false;
      if (orderCarrierFilter !== 'ALL' && (o.carrier || '').toLowerCase() !== orderCarrierFilter.toLowerCase()) {
        return false;
      }
      if (orderPaymentFilter !== 'ALL') {
        const method = (o.paymentMethod || '').toLowerCase();
        if (orderPaymentFilter === 'COD' && !method.includes('cod')) return false;
        if (orderPaymentFilter === 'QR' && !method.includes('qr') && !method.includes('chuyển khoản')) return false;
      }
      if (orderSearch.trim()) {
        const q = orderSearch.toLowerCase();
        const matchId = String(o.id).toLowerCase().includes(q);
        const matchName = String(o.customer?.name || '').toLowerCase().includes(q);
        const matchPhone = String(o.customer?.phone || '').toLowerCase().includes(q);
        const matchTracking = String(o.trackingCode || '').toLowerCase().includes(q);
        const matchItem = String(o.item || '').toLowerCase().includes(q);
        return matchId || matchName || matchPhone || matchTracking || matchItem;
      }
      return true;
    });
  }, [orders, orderStatusTab, orderCarrierFilter, orderPaymentFilter, orderSearch]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrderIds(filteredOrders.map((o) => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedOrderIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-header-title">
            <span>📦</span> Quản Lý Đơn Hàng & Vận Chuyển
          </h1>
          <p className="admin-page-header-desc">
            Kiểm soát quy trình đóng gói, bàn giao vận chuyển và theo dõi dòng tiền thanh toán.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="btn-secondary-admin"
            onClick={() => onExportCSV(filteredOrders)}
            title="Tải danh sách đơn hàng về máy dạng file Excel / CSV"
          >
            📥 Xuất Excel (CSV)
          </button>
        </div>
      </div>

      {/* DÃY TAB TRẠNG THÁI LỌC NHANH (STATUS TABS STRIP) */}
      <div className="admin-status-tabs-strip">
        {[
          { id: 'ALL', label: 'Tất cả đơn', count: counts.all },
          { id: 'Đang chuẩn bị hàng', label: '⏳ Chờ chuẩn bị', count: counts.pending },
          { id: 'Đang giao hàng', label: '🚚 Đang giao', count: counts.shipping },
          { id: 'Đã giao thành công', label: '✅ Đã giao thành công', count: counts.completed },
          { id: 'Đã hủy đơn', label: '❌ Đã hủy', count: counts.cancelled },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`admin-status-tab-btn ${orderStatusTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setOrderStatusTab(tab.id);
              setSelectedOrderIds([]);
            }}
          >
            <span>{tab.label}</span>
            <span className="admin-status-tab-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* BỘ LỌC TÌM KIẾM CHI TIẾT (FILTER TOOLBAR) */}
      <div className="admin-filter-toolbar">
        <div className="admin-search-box">
          <span className="admin-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm theo Mã đơn (#TC...), Tên người nhận, SĐT, Mã vận đơn, Tên giày..."
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
          />
        </div>

        <div className="admin-filter-select-group">
          <select
            className="admin-filter-select"
            value={orderCarrierFilter}
            onChange={(e) => setOrderCarrierFilter(e.target.value)}
          >
            <option value="ALL">Tất cả ĐVVC</option>
            <option value="Viettel Post">Viettel Post</option>
            <option value="Giao Hàng Tiết Kiệm (GHTK)">GHTK</option>
            <option value="Giao Hàng Nhanh (GHN)">GHN</option>
          </select>

          <select
            className="admin-filter-select"
            value={orderPaymentFilter}
            onChange={(e) => setOrderPaymentFilter(e.target.value)}
          >
            <option value="ALL">Tất cả thanh toán</option>
            <option value="QR">Chuyển khoản QR</option>
            <option value="COD">Thanh toán COD</option>
          </select>

          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
            Hiển thị: <b>{filteredOrders.length}</b> đơn
          </span>
        </div>
      </div>

      {/* BẢNG DỮ LIỆU ĐƠN HÀNG COMPACT */}
      <div className="admin-table-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={
                      filteredOrders.length > 0 &&
                      selectedOrderIds.length === filteredOrders.length
                    }
                    onChange={handleSelectAll}
                    title="Chọn tất cả đơn hàng"
                  />
                </th>
                <th style={{ width: '135px' }}>Mã Đơn & Vận Đơn</th>
                <th style={{ width: '100px' }}>Ngày Giờ</th>
                <th style={{ width: '160px' }}>Khách Hàng Nhận</th>
                <th style={{ width: '230px' }}>Sản Phẩm Đặt</th>
                <th style={{ width: '120px' }}>Thanh Toán</th>
                <th style={{ width: '110px' }}>Tổng Tiền</th>
                <th style={{ width: '130px' }}>Trạng Thái</th>
                <th style={{ width: '130px', textAlign: 'center' }}>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '50px 20px', color: '#64748B' }}>
                    Không tìm thấy đơn hàng nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const isSelected = selectedOrderIds.includes(ord.id);
                  return (
                    <tr key={ord.id} className={isSelected ? 'selected' : ''}>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(ord.id)}
                        />
                      </td>

                      <td>
                        <div className="order-id-cell">
                          <span
                            className="order-code-badge"
                            onClick={() => onCopyText(ord.id, 'Mã đơn')}
                            title="Click để sao chép mã đơn"
                          >
                            #{ord.id} <span style={{ fontSize: '0.7rem', color: '#94A3B8' }}>📋</span>
                          </span>
                          <span className="order-carrier-tag">
                            🚚 {ord.carrier ? ord.carrier.split(' ')[0] : 'Viettel'}:{' '}
                            <b style={{ color: '#0F172A' }}>
                              {ord.trackingCode ? ord.trackingCode.split('-')[1] || ord.trackingCode : '---'}
                            </b>
                          </span>
                        </div>
                      </td>

                      <td style={{ color: '#475569', whiteSpace: 'nowrap' }}>
                        <div>{ord.date}</div>
                        <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{ord.time || '14:00'}</div>
                      </td>

                      <td>
                        <div className="customer-cell-compact">
                          <span className="customer-name-bold" title={ord.customer?.name}>
                            {ord.customer?.name || 'Nguyễn Văn Tiến'}
                          </span>
                          <a
                            href={`tel:${ord.customer?.phone || '0973711868'}`}
                            className="customer-phone-link"
                            title="Click để gọi điện"
                          >
                            📞 {ord.customer?.phone || '0973711868'}
                          </a>
                          <span className="customer-address-sub" title={ord.customer?.address}>
                            📍 {ord.customer?.address || 'Hà Nội'}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="product-cell-compact">
                          {ord.image && (
                            <img
                              src={ord.image}
                              alt={ord.item}
                              className="product-cell-thumb"
                            />
                          )}
                          <div className="product-cell-desc">
                            <span className="product-cell-title" title={ord.item}>
                              {ord.item}
                            </span>
                            <span className="product-cell-meta">
                              Size: <b style={{ color: '#C2410C' }}>{ord.size || 41}</b> • SL:{' '}
                              <b>{ord.items?.[0]?.quantity || 1}</b>
                            </span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="payment-cell-compact">
                          <span className="payment-method-badge">
                            {ord.paymentMethod?.includes('QR') ? '💳 QR Pay' : '💵 COD'}
                          </span>
                          <span
                            className={`payment-status-pill ${
                              ord.paymentStatus === 'Đã thanh toán'
                                ? 'payment-status-paid'
                                : 'payment-status-unpaid'
                            }`}
                          >
                            {ord.paymentStatus === 'Đã thanh toán' ? '✓ Đã thanh toán' : 'Chờ thu tiền'}
                          </span>
                        </div>
                      </td>

                      <td>
                        <b style={{ color: '#0F172A', fontSize: '0.88rem' }}>{ord.total}</b>
                      </td>

                      <td>
                        <span
                          className={`status-badge-pill ${
                            ord.status === 'Đã giao thành công'
                              ? 'status-badge-success'
                              : ord.status === 'Đã hủy đơn'
                              ? 'status-badge-cancelled'
                              : ord.status === 'Đang giao hàng'
                              ? 'status-badge-shipping'
                              : 'status-badge-pending'
                          }`}
                        >
                          {ord.status === 'Đang chuẩn bị hàng' && '⏳ '}
                          {ord.status === 'Đang giao hàng' && '🚚 '}
                          {ord.status === 'Đã giao thành công' && '✅ '}
                          {ord.status === 'Đã hủy đơn' && '❌ '}
                          {ord.status}
                        </span>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <div className="order-row-actions" style={{ justifyContent: 'center' }}>
                          <button
                            type="button"
                            className="btn-icon-action"
                            onClick={() => setActiveOrderDetail(ord)}
                            title="Xem chi tiết & Ghi chú"
                          >
                            👁️
                          </button>

                          {ord.status === 'Đang chuẩn bị hàng' && (
                            <button
                              type="button"
                              className="btn-icon-action"
                              style={{ background: '#DBEAFE', color: '#1E40AF', borderColor: '#93C5FD' }}
                              onClick={() => onUpdateStatus(ord.id, 'Đang giao hàng')}
                              title="Bàn giao đơn vị vận chuyển (Đang giao)"
                            >
                              🚚
                            </button>
                          )}

                          {ord.status === 'Đang giao hàng' && (
                            <button
                              type="button"
                              className="btn-icon-action"
                              style={{ background: '#DCFCE7', color: '#15803D', borderColor: '#86EFAC' }}
                              onClick={() => onUpdateStatus(ord.id, 'Đã giao thành công')}
                              title="Xác nhận giao thành công"
                            >
                              ✓
                            </button>
                          )}

                          <button
                            type="button"
                            className="btn-icon-action"
                            onClick={() => setActiveInvoiceOrder(ord)}
                            title="In phiếu gửi hàng / Vận đơn"
                          >
                            🖨️
                          </button>

                          <button
                            type="button"
                            className="btn-icon-action btn-icon-action-danger"
                            onClick={() => onDeleteSingleOrder(ord.id)}
                            title="Xóa đơn hàng"
                          >
                            ✕
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

      {/* THANH THAO TÁC HÀNG LOẠT NỔI (BULK ACTION BAR) */}
      {selectedOrderIds.length > 0 && (
        <div className="admin-bulk-action-bar">
          <div className="admin-bulk-action-text">
            Đã chọn: <b>{selectedOrderIds.length}</b> đơn hàng
          </div>
          <div className="admin-bulk-btn-group">
            <button
              type="button"
              className="btn-bulk-action"
              onClick={() => {
                onBulkUpdateStatus(selectedOrderIds, 'Đang giao hàng');
                setSelectedOrderIds([]);
              }}
            >
              🚚 Giao cho ĐVVC
            </button>
            <button
              type="button"
              className="btn-bulk-action"
              onClick={() => {
                onBulkUpdateStatus(selectedOrderIds, 'Đã giao thành công');
                setSelectedOrderIds([]);
              }}
            >
              ✅ Đã giao thành công
            </button>
            <button
              type="button"
              className="btn-bulk-action btn-bulk-action-danger"
              onClick={() => {
                onBulkDelete(selectedOrderIds);
                setSelectedOrderIds([]);
              }}
            >
              🗑️ Xóa đã chọn
            </button>
            <button
              type="button"
              className="btn-bulk-action"
              onClick={() => setSelectedOrderIds([])}
            >
              ✕ Bỏ chọn
            </button>
          </div>
        </div>
      )}

      {/* MODAL CHI TIẾT ĐƠN */}
      {activeOrderDetail && (
        <OrderDetailModal
          order={activeOrderDetail}
          onClose={() => setActiveOrderDetail(null)}
          onUpdateStatus={onUpdateStatus}
          onSaveShippingAndNote={onSaveShippingAndNote}
          onOpenInvoice={(o) => {
            setActiveOrderDetail(null);
            setActiveInvoiceOrder(o);
          }}
        />
      )}

      {/* MODAL IN VẬN ĐƠN */}
      {activeInvoiceOrder && (
        <PrintableInvoiceModal
          order={activeInvoiceOrder}
          onClose={() => setActiveInvoiceOrder(null)}
        />
      )}
    </div>
  );
}
