/**
 * =========================================================================================
 * 📁 TỆP: src/admin/components/PrintableInvoiceModal.jsx
 * 🎯 CHỨC NĂNG: MẪU IN VẬN ĐƠN & PHIẾU XUẤT KHO CHUẨN IN ẤN (A4 / A5)
 * =========================================================================================
 */

import React from 'react';
import { formatVND } from '../../data/products';

export default function PrintableInvoiceModal({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div className="admin-modal-title">
            Phiếu Gửi Hàng & Vận Đơn <span style={{ color: '#C2410C' }}>#{order.id}</span>
          </div>
          <button type="button" className="btn-close-admin-modal" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="admin-modal-body printable-invoice-container" style={{ background: '#FFFFFF', padding: '24px' }}>
          {/* Header phiếu in */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000000', paddingBottom: '12px', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#C2410C' }}>TC SPORT.VN</div>
              <div style={{ fontSize: '0.75rem', color: '#334155' }}>Hệ Thống Phân Phối Giày Thể Thao Chính Hãng</div>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Đ/C: 249 Xã Đàn, Đống Đa, Hà Nội • Hotline: 0973.711.868</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>MÃ ĐƠN: #{order.id}</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', letterSpacing: '2px' }}>||| || ||| || ||||</div>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                Mã vận đơn: {order.trackingCode || `VTP-${order.id}VN`} ({order.carrier || 'Viettel Post'})
              </div>
            </div>
          </div>

          {/* Thông tin giao nhận 2 cột */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', border: '1px solid #000', padding: '12px', borderRadius: '4px', marginBottom: '16px', fontSize: '0.8rem' }}>
            <div>
              <div style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>NGƯỜI GỬI:</div>
              <div><b>TC SPORT STORE (KHO XÃ ĐÀN)</b></div>
              <div>249 Xã Đàn, Phường Nam Đồng, Quận Đống Đa, Hà Nội</div>
              <div>Hotline CSKH: 0973.711.868</div>
            </div>
            <div>
              <div style={{ fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>NGƯỜI NHẬN HÀNG:</div>
              <div><b>{order.customer?.name}</b></div>
              <div>SĐT: <b>{order.customer?.phone}</b></div>
              <div>Đ/C: {order.customer?.address}</div>
              {order.note && <div style={{ fontStyle: 'italic', marginTop: '3px' }}>Ghi chú: {order.note}</div>}
            </div>
          </div>

          {/* Bảng kê hàng hóa */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', marginBottom: '16px' }} border="1">
            <thead>
              <tr style={{ background: '#F1F5F9' }}>
                <th style={{ padding: '6px' }}>STT</th>
                <th style={{ padding: '6px', textAlign: 'left' }}>Tên Sản Phẩm Giày</th>
                <th style={{ padding: '6px', width: '60px' }}>Size</th>
                <th style={{ padding: '6px', width: '50px' }}>SL</th>
                <th style={{ padding: '6px', textAlign: 'right', width: '110px' }}>Thành Tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, i) => (
                  <tr key={i}>
                    <td style={{ textAlign: 'center', padding: '6px' }}>{i + 1}</td>
                    <td style={{ padding: '6px' }}>{item.name}</td>
                    <td style={{ textAlign: 'center', padding: '6px' }}>{item.size}</td>
                    <td style={{ textAlign: 'center', padding: '6px' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right', padding: '6px' }}>
                      {formatVND(item.subtotal || item.price * item.quantity)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={{ textAlign: 'center', padding: '6px' }}>1</td>
                  <td style={{ padding: '6px' }}>{order.item}</td>
                  <td style={{ textAlign: 'center', padding: '6px' }}>{order.size || 41}</td>
                  <td style={{ textAlign: 'center', padding: '6px' }}>1</td>
                  <td style={{ textAlign: 'right', padding: '6px' }}>{order.total}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Tiền thu COD */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#F8FAFC', border: '1px solid #000', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '0.75rem' }}>Phương thức: <b>{order.paymentMethod}</b></div>
              <div style={{ fontSize: '0.75rem' }}>Trạng thái thanh toán: <b>{order.paymentStatus}</b></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>TIỀN THU NGƯỜI NHẬN (COD):</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#C2410C' }}>
                {order.paymentStatus === 'Đã thanh toán' ? '0 ₫ (ĐÃ THANH TOÁN)' : order.total}
              </div>
            </div>
          </div>

          {/* Chữ ký xác nhận */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', fontSize: '0.75rem', marginTop: '20px' }}>
            <div>
              <b>NGƯỜI GỬI HÀNG</b>
              <div style={{ height: '40px' }}></div>
              <div>(Ký, ghi rõ họ tên)</div>
            </div>
            <div>
              <b>BƯU TÁ LẤY HÀNG</b>
              <div style={{ height: '40px' }}></div>
              <div>(Ký, ghi rõ họ tên)</div>
            </div>
            <div>
              <b>NGƯỜI NHẬN HÀNG</b>
              <div style={{ height: '40px' }}></div>
              <div>(Ký, ghi rõ họ tên)</div>
            </div>
          </div>
        </div>

        <div className="admin-modal-footer">
          <button type="button" className="btn-primary-admin" onClick={() => window.print()}>
            🖨️ In Ngay (Print)
          </button>
          <button type="button" className="btn-secondary-admin" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
