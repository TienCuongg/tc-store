/**
 * =========================================================================================
 * 📁 TỆP: src/components/Modals/SizeGuideModal.jsx
 * 🎯 CHỨC NĂNG: BẢNG ĐO SIZE & TÍNH SIZE GIÀY CHUẨN XÁC (EXACT SIZEGUIDE-MODAL REPLICA)
 * =========================================================================================
 * 
 * Khớp chuẩn 100% với CSS trong styles.css:
 * - .modal-backdrop.active, #size-guide-modal
 * - .modal-dialog.sizeguide-dialog, .modal-dialog-header, .btn-close-modal
 * - .modal-dialog-body
 * - .size-calc-card, .calc-label, .calc-input-row, .calc-input, .btn-calc-submit, .calc-result-box
 * - .size-table-standard
 * =========================================================================================
 */

import React, { useState } from 'react';

export default function SizeGuideModal({ isOpen, onClose }) {
  const [footCm, setFootCm] = useState('25.5');
  const [calcResult, setCalcResult] = useState('');

  if (!isOpen) return null;

  const handleCompute = (e) => {
    e.preventDefault();
    const val = parseFloat(footCm);
    if (isNaN(val) || val < 21 || val > 32) {
      setCalcResult('⚠️ Chiều dài không hợp lệ. Vui lòng nhập từ 22 cm đến 30 cm.');
      return;
    }

    let size = 41;
    let advice = 'Đi đúng size tiêu chuẩn';
    if (val <= 23.5) size = 37;
    else if (val <= 24.0) size = 38;
    else if (val <= 24.5) size = 39;
    else if (val <= 25.0) size = 40;
    else if (val <= 25.5) size = 41;
    else if (val <= 26.0) { size = 42; advice = 'Bàn chân bè dày mu nên tăng 0.5 - 1 size'; }
    else if (val <= 26.5) size = 43;
    else if (val <= 27.0) size = 44;
    else size = 45;

    setCalcResult(`👟 Chiều dài chân ${val} cm: Khuyên chọn Size ${size} (${advice}).`);
  };

  return (
    <div
      className="modal-backdrop active"
      id="size-guide-modal"
      onClick={onClose}
    >
      <div className="modal-dialog sizeguide-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-dialog-header">
          <h3>HƯỚNG DẪN ĐO VÀ CHỌN SIZE GIÀY CHUẨN XÁC</h3>
          <button type="button" className="btn-close-modal" onClick={onClose} title="Đóng">
            ✕
          </button>
        </div>

        <div className="modal-dialog-body">
          {/* Measurement steps card */}
          <div style={{ background: '#FDF9F0', border: '1px dashed var(--bg-cream-border)', borderRadius: 'var(--radius-md)', padding: '14px 18px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-terracotta)', marginBottom: '8px' }}>
              📏 3 BƯỚC ĐO CHIỀU DÀI BÀN CHÂN TẠI NHÀ
            </h4>
            <ol style={{ paddingLeft: '20px', fontSize: '0.82rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
              <li><b>Bước 1:</b> Đặt bàn chân trần lên tờ giấy A4 phẳng sát mép tường.</li>
              <li><b>Bước 2:</b> Dùng bút vạch 2 điểm: gót chân và điểm ngón chân dài nhất (ngón cái hoặc ngón trỏ).</li>
              <li><b>Bước 3:</b> Dùng thước đo khoảng cách 2 điểm (cm) rồi đối chiếu bảng size bên dưới. <i>(Mẹo: Bàn chân bè hoặc mu chân dày nên tăng thêm 1 size để êm chân khi chạy bộ/tập gym).</i></li>
            </ol>
          </div>

          {/* Calculator Card */}
          <div className="size-calc-card">
            <div className="calc-label">Nhập chiều dài bàn chân của bạn (cm):</div>
            <form className="calc-input-row" onSubmit={handleCompute}>
              <input
                type="number"
                id="foot-cm-input"
                className="calc-input"
                placeholder="VD: 25.5"
                step="0.1"
                min="20"
                max="32"
                value={footCm}
                onChange={(e) => setFootCm(e.target.value)}
              />
              <button type="submit" className="btn-calc-submit">
                Tính Size Ngay
              </button>
            </form>
            <div className="calc-result-box" id="calc-result-display">
              {calcResult || 'Vui lòng nhập chiều dài bàn chân để nhận tư vấn size chuẩn xác cho tất cả dòng giày thể thao Nike, Adidas, Asics, Lacoste, Puma.'}
            </div>
          </div>

          {/* Reference Table */}
          <div style={{ overflowX: 'auto', marginTop: '16px' }}>
            <table className="size-table-standard">
              <thead>
                <tr>
                  <th>Chiều dài chân</th>
                  <th>Size Chuẩn VN</th>
                  <th>Nike US</th>
                  <th>Adidas UK</th>
                  <th>Asics US</th>
                  <th>Puma US</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>23.0 - 23.5 cm</td><td><b style={{ color: 'var(--color-terracotta)' }}>Size 37</b></td><td>5.0</td><td>5.0</td><td>5.0</td><td>5.0</td></tr>
                <tr><td>23.5 - 24.0 cm</td><td><b style={{ color: 'var(--color-terracotta)' }}>Size 38</b></td><td>5.5</td><td>5.5</td><td>5.5</td><td>5.5</td></tr>
                <tr><td>24.0 - 24.5 cm</td><td><b style={{ color: 'var(--color-terracotta)' }}>Size 39</b></td><td>6.5</td><td>6.5</td><td>6.5</td><td>6.5</td></tr>
                <tr><td>24.5 - 25.0 cm</td><td><b style={{ color: 'var(--color-terracotta)' }}>Size 40</b></td><td>7.0</td><td>7.0</td><td>7.0</td><td>7.0</td></tr>
                <tr><td>25.0 - 25.5 cm</td><td><b style={{ color: 'var(--color-terracotta)' }}>Size 41</b></td><td>8.0</td><td>8.0</td><td>8.0</td><td>8.0</td></tr>
                <tr><td>25.5 - 26.0 cm</td><td><b style={{ color: 'var(--color-terracotta)' }}>Size 42</b></td><td>8.5</td><td>8.5</td><td>8.5</td><td>8.5</td></tr>
                <tr><td>26.0 - 26.5 cm</td><td><b style={{ color: 'var(--color-terracotta)' }}>Size 43</b></td><td>9.5</td><td>9.5</td><td>9.5</td><td>9.5</td></tr>
                <tr><td>26.5 - 27.0 cm</td><td><b style={{ color: 'var(--color-terracotta)' }}>Size 44</b></td><td>10.0</td><td>10.0</td><td>10.0</td><td>10.0</td></tr>
                <tr><td>27.0 - 27.5 cm</td><td><b style={{ color: 'var(--color-terracotta)' }}>Size 45</b></td><td>11.0</td><td>11.0</td><td>11.0</td><td>11.0</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
