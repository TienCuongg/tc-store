/**
 * =========================================================================================
 * 📁 TỆP: src/admin/components/OrderDetailModal.jsx
 * 🎯 CHỨC NĂNG: POPUP XEM VÀ XỬ LÝ CHI TIẾT ĐƠN HÀNG DÀNH CHO ADMIN
 * =========================================================================================
 */

import React, { useState, useEffect } from 'react';
import { formatVND } from '../../data/products';

export default function OrderDetailModal({
  order,
  onClose,
  onUpdateStatus,
  onSaveShippingAndNote,
  onOpenInvoice
}) {
  const [internalNote, setInternalNote] = useState(order?.internalNote || '');
  const [carrier, setCarrier] = useState(order?.carrier || 'Viettel Post');
  const [trackingCode, setTrackingCode] = useState(order?.trackingCode || '');

  useEffect(() => {
    if (order) {
      setInternalNote(order.internalNote || '');
      setCarrier(order.carrier || 'Viettel Post');
      setTrackingCode(order.trackingCode || `VTP-${order.id}VN`);
    }
  }, [order]);

  if (!order) return null;

  const handleSave = () => {
    onSaveShippingAndNote(order.id, { internalNote, carrier, trackingCode });
  };

  const currentStep =
    order.status === 'Đã giao thành công'
      ? 5
      : order.status === 'Đang giao hàng'
      ? 4
      : order.status === 'Đang chuẩn bị hàng'
      ? 2
      : 1;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div className="admin-modal-title">
            Chi Tiết Đơn Hàng <span style={{ color: '#C2410C' }}>#{order.id}</span>
          </div>
          <button type="button" className="btn-close-admin-modal" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="admin-modal-body">
          {/* TIMELINE STEPPER TIẾN TRÌNH ĐƠN HÀNG */}
          <div className="order-stepper">
            {[
              { step: 1, label: 'Đặt đơn' },
              { step: 2, label: 'Xác nhận' },
              { step: 3, label: 'Đóng gói' },
              { step: 4, label: 'Đang giao' },
              { step: 5, label: 'Thành công' },
            ].map((s) => (
              <div
                key={s.step}
                className={`order-step-item ${s.step < currentStep ? 'done' : s.step === currentStep ? 'active' : ''}`}
              >
                <div className="order-step-icon">
                  {s.step < currentStep ? '✓' : s.step}
                </div>
                <div className="order-step-title">{s.label}</div>
              </div>
            ))}
          </div>

          {/* KHỐI THÔNG TIN NGƯỜI NHẬN & ĐƠN VỊ VẬN CHUYỂN */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                👤 NGƯỜI NHẬN HÀNG
              </div>
              <div>Họ tên: <b>{order.customer?.name}</b></div>
              <div>
                SĐT:{' '}
                <a href={`tel:${order.customer?.phone}`} style={{ color: '#EA580C', fontWeight: 700 }}>
                  {order.customer?.phone}
                </a>
              </div>
              <div>Địa chỉ: {order.customer?.address}</div>
              {order.note && (
                <div style={{ marginTop: '4px', color: '#D97706', fontStyle: 'italic' }}>
                  Ghi chú khách: "{order.note}"
                </div>
              )}
            </div>

            <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.82rem' }}>
              <div style={{ fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                🚚 ĐƠN VỊ VẬN CHUYỂN & MÃ VẬN ĐƠN
              </div>
              <div style={{ marginBottom: '6px' }}>
                <label style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Đơn vị vận chuyển:</label>
                <select
                  className="admin-filter-select"
                  style={{ width: '100%', padding: '6px 8px' }}
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                >
                  <option value="Viettel Post">Viettel Post</option>
                  <option value="Giao Hàng Tiết Kiệm (GHTK)">Giao Hàng Tiết Kiệm (GHTK)</option>
                  <option value="Giao Hàng Nhanh (GHN)">Giao Hàng Nhanh (GHN)</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#64748B', display: 'block' }}>Mã vận đơn tracking:</label>
                <input
                  type="text"
                  className="admin-filter-select"
                  style={{ width: '100%', padding: '6px 8px' }}
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* GHI CHÚ NỘI BỘ DÀNH CHO NHÂN VIÊN */}
          <div className="admin-internal-note-box">
            <div className="admin-internal-note-title">
              <span>📝</span> GHI CHÚ NỘI BỘ NHÂN VIÊN (KHÁCH KHÔNG NHÌN THẤY)
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                style={{ flex: 1, padding: '7px 10px', borderRadius: '6px', border: '1px solid #FCD34D', fontSize: '0.82rem' }}
                placeholder="Nhập ghi chú (VD: Khách dặn giao sau 18h, đã cọc 500k...)"
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
              />
              <button
                type="button"
                className="btn-primary-admin"
                style={{ padding: '7px 12px' }}
                onClick={handleSave}
              >
                Lưu
              </button>
            </div>
          </div>

          {/* DANH SÁCH MẶT HÀNG TRONG ĐƠN */}
          <div style={{ fontWeight: 800, fontSize: '0.88rem', marginBottom: '8px', color: '#0F172A' }}>
            DANH SÁCH SẢN PHẨM TRONG ĐƠN
          </div>

          <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
            {order.items && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderBottom: idx < order.items.length - 1 ? '1px solid #F1F5F9' : 'none',
                    background: '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>{item.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Size: <b>{item.size}</b> • Số lượng: <b>{item.quantity}</b>
                      </div>
                    </div>
                  </div>
                  <b style={{ color: '#C2410C' }}>{formatVND(item.subtotal || item.price * item.quantity)}</b>
                </div>
              ))
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={order.image}
                    alt={order.item}
                    style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{order.item}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Size: <b>{order.size || 41}</b></div>
                  </div>
                </div>
                <b style={{ color: '#C2410C' }}>{order.total}</b>
              </div>
            )}
          </div>

          {/* TỔNG TIỀN VÀ TRẠNG THÁI */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#FEF3C7', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', color: '#92400E' }}>
              Thanh toán: <b>{order.paymentMethod}</b> ({order.paymentStatus})
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.72rem', color: '#92400E' }}>Tổng thanh toán: </span>
              <b style={{ fontSize: '1.15rem', color: '#B45309' }}>{order.total}</b>
            </div>
          </div>

          {/* NÚT CHUYỂN TRẠNG THÁI NHANH */}
          <div style={{ marginTop: '16px' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Cập Nhật Tiến Độ Giao Hàng:
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { label: 'Chờ chuẩn bị', val: 'Đang chuẩn bị hàng' },
                { label: 'Đang giao hàng', val: 'Đang giao hàng' },
                { label: 'Đã giao thành công', val: 'Đã giao thành công' },
                { label: 'Hủy đơn', val: 'Đã hủy đơn' },
              ].map((btn) => (
                <button
                  key={btn.val}
                  type="button"
                  className="btn-secondary-admin"
                  style={{
                    background: order.status === btn.val ? '#0F172A' : '#FFFFFF',
                    color: order.status === btn.val ? '#FFFFFF' : '#334155',
                    borderColor: order.status === btn.val ? '#0F172A' : '#CBD5E1'
                  }}
                  onClick={() => onUpdateStatus(order.id, btn.val)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-modal-footer">
          <button
            type="button"
            className="btn-secondary-admin"
            onClick={() => onOpenInvoice(order)}
          >
            🖨️ In Phiếu Gửi Hàng
          </button>
          <button
            type="button"
            className="btn-primary-admin"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
