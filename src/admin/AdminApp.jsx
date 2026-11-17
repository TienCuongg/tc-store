/**
 * =========================================================================================
 * 📁 TỆP: src/admin/AdminApp.jsx
 * 🎯 CHỨC NĂNG: ENTRY POINT & ROUTER CHÍNH CỦA PHÂN HỆ QUẢN TRỊ ADMIN (SEPARATE ADMIN SYSTEM)
 * =========================================================================================
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  ALL_PRODUCTS,
  getStoredProducts,
  saveStoredProducts,
  resetStoredProducts,
  SEED_INITIAL_ORDERS
} from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import './Admin.css';

// Sub-pages của Admin
import AdminOverview from './pages/AdminOverview';
import AdminOrders from './pages/AdminOrders';
import AdminRevenue from './pages/AdminRevenue';
import AdminProducts, { getRealisticSizeStock } from './pages/AdminProducts';
import AdminCategories, { getStoredCategories, getStoredBrands } from './pages/AdminCategories';
import AdminCustomers from './pages/AdminCustomers';
import AdminSettings from './pages/AdminSettings';

export default function AdminApp({ onNavigate }) {
  const { authUser } = useAuth();
  const { showToast } = useCart();

  const [activeTab, setActiveTab] = useState('overview'); // Mặc định mở Tổng quan hệ thống khi F5
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isApiConnected, setIsApiConnected] = useState(false);

  // Tải dữ liệu từ Spring Boot API (hoặc fallback LocalStorage nếu server chưa bật)
  const loadAdminData = async () => {
    try {
      // 1. Thử gọi Spring Boot REST API
      const [apiProducts, apiCategories, apiBrands, apiOrders] = await Promise.all([
        api.products.getAll(),
        api.categories.getAll(),
        api.brands.getAll(),
        api.orders.getAll()
      ]);

      if (Array.isArray(apiProducts) && apiProducts.length > 0) {
        setProducts(apiProducts);
        saveStoredProducts(apiProducts);
        setIsApiConnected(true);
      }
      if (Array.isArray(apiCategories) && apiCategories.length > 0) {
        setCategories(apiCategories);
      }
      if (Array.isArray(apiBrands) && apiBrands.length > 0) {
        setBrands(apiBrands);
      }
      if (Array.isArray(apiOrders) && apiOrders.length > 0) {
        setOrders(apiOrders);
        localStorage.setItem('tc_user_orders', JSON.stringify(apiOrders));
      }
    } catch (err) {
      console.warn('Backend API chưa sẵn sàng hoặc ngoại tuyến, đọc từ LocalStorage:', err);
      setIsApiConnected(false);
      // Fallback LocalStorage
      try {
        let savedOrders = JSON.parse(localStorage.getItem('tc_user_orders') || '[]');
        if (!savedOrders || savedOrders.length === 0) {
          savedOrders = SEED_INITIAL_ORDERS;
          localStorage.setItem('tc_user_orders', JSON.stringify(SEED_INITIAL_ORDERS));
        }
        setOrders(savedOrders);
      } catch (e) {
        setOrders(SEED_INITIAL_ORDERS);
      }
      setProducts(getStoredProducts());
      setCategories(getStoredCategories());
      setBrands(getStoredBrands());
    }
  };

  useEffect(() => {
    loadAdminData();
    const handleStorageChange = () => loadAdminData();
    window.addEventListener('tc_products_updated', handleStorageChange);
    window.addEventListener('tc_categories_updated', handleStorageChange);
    window.addEventListener('tc_brands_updated', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('tc_products_updated', handleStorageChange);
      window.removeEventListener('tc_categories_updated', handleStorageChange);
      window.removeEventListener('tc_brands_updated', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Tính toán KPI & Analytics
  const analytics = useMemo(() => {
    let grossRevenue = 0;
    let grossCost = 0;
    let validOrderCount = 0;

    orders.forEach((ord) => {
      if (ord.status !== 'Đã hủy đơn') {
        const amt = ord.totalAmount || parseInt(String(ord.total).replace(/\D/g, ''), 10) || 0;
        grossRevenue += amt;
        grossCost += ord.costAmount || Math.round(amt * 0.65);
        validOrderCount++;
      }
    });

    const grossProfit = grossRevenue - grossCost;
    const profitMargin = grossRevenue > 0 ? Math.round((grossProfit / grossRevenue) * 100) : 0;
    const aov = validOrderCount > 0 ? Math.round(grossRevenue / validOrderCount) : 0;

    const pendingCount = orders.filter((o) => o.status === 'Đang chuẩn bị hàng').length;
    const shippingCount = orders.filter((o) => o.status === 'Đang giao hàng').length;
    const completedCount = orders.filter((o) => o.status === 'Đã giao thành công' || o.status === 'Hoàn thành').length;
    const cancelledCount = orders.filter((o) => o.status === 'Đã hủy đơn').length;

    const customerMap = new Map();
    orders.forEach((o) => {
      const phone = o.customer?.phone || '0973711868';
      const name = o.customer?.name || 'Khách lẻ';
      const email = o.customer?.email || '';
      const address = o.customer?.address || '';
      const amount = o.totalAmount || 0;

      if (!customerMap.has(phone)) {
        customerMap.set(phone, {
          name,
          phone,
          email,
          address,
          totalSpent: amount,
          orderCount: 1,
          lastOrderDate: o.date
        });
      } else {
        const c = customerMap.get(phone);
        c.totalSpent += amount;
        c.orderCount += 1;
      }
    });

    return {
      grossRevenue,
      grossProfit,
      profitMargin,
      aov,
      totalOrders: orders.length,
      pendingCount,
      shippingCount,
      completedCount,
      cancelledCount,
      totalCustomers: customerMap.size,
      customerList: Array.from(customerMap.values())
    };
  }, [orders]);

  // Các thao tác xử lý đơn hàng
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const statusMap = {
      'Đang chuẩn bị hàng': 'status-badge-shipping',
      'Đang giao hàng': 'status-badge-shipping',
      'Đã giao thành công': 'status-badge-success',
      'Đã hủy đơn': 'status-badge-cancelled'
    };

    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          statusClass: statusMap[newStatus] || 'status-badge-shipping',
          timeline: [
            ...(o.timeline || []),
            {
              time: `${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`,
              action: `Chuyển trạng thái sang "${newStatus}"`,
              actor: 'Cườngg Tiến (Admin)'
            }
          ]
        };
      }
      return o;
    });

    setOrders(updated);
    localStorage.setItem('tc_user_orders', JSON.stringify(updated));
    if (showToast) showToast(`Đã chuyển đơn #${orderId} sang: "${newStatus}"`, 'success');
  };

  const handleBulkUpdateStatus = (selectedIds, newStatus) => {
    const statusMap = {
      'Đang chuẩn bị hàng': 'status-badge-shipping',
      'Đang giao hàng': 'status-badge-shipping',
      'Đã giao thành công': 'status-badge-success',
      'Đã hủy đơn': 'status-badge-cancelled'
    };

    const updated = orders.map((o) => {
      if (selectedIds.includes(o.id)) {
        return {
          ...o,
          status: newStatus,
          statusClass: statusMap[newStatus] || 'status-badge-shipping'
        };
      }
      return o;
    });

    setOrders(updated);
    localStorage.setItem('tc_user_orders', JSON.stringify(updated));
    if (showToast) showToast(`Đã chuyển ${selectedIds.length} đơn sang: "${newStatus}"`, 'success');
  };

  const handleBulkDelete = (selectedIds) => {
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedIds.length} đơn đã chọn?`)) {
      const updated = orders.filter((o) => !selectedIds.includes(o.id));
      setOrders(updated);
      localStorage.setItem('tc_user_orders', JSON.stringify(updated));
      if (showToast) showToast('Đã xóa các đơn hàng đã chọn', 'info');
    }
  };

  const handleDeleteSingleOrder = (orderId) => {
    if (window.confirm(`Bạn có chắc muốn xóa vĩnh viễn đơn #${orderId}?`)) {
      const updated = orders.filter((o) => o.id !== orderId);
      setOrders(updated);
      localStorage.setItem('tc_user_orders', JSON.stringify(updated));
      if (showToast) showToast(`Đã xóa đơn #${orderId}`, 'info');
    }
  };

  const handleSaveShippingAndNote = (orderId, data) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, ...data } : o));
    setOrders(updated);
    localStorage.setItem('tc_user_orders', JSON.stringify(updated));
    if (showToast) showToast('Đã lưu thông tin vận đơn & ghi chú nội bộ!', 'success');
  };

  const handleExportCSV = (dataList) => {
    const list = dataList && dataList.length > 0 ? dataList : orders;
    const headers = [
      'Mã Đơn',
      'Ngày Đặt',
      'Giờ Đặt',
      'Khách Hàng',
      'Số Điện Thoại',
      'Địa Chỉ Giao Hàng',
      'Sản Phẩm',
      'Size',
      'Tổng Tiền (VNĐ)',
      'Phương Thức Thanh Toán',
      'Trạng Thái Thanh Toán',
      'Trạng Thái Giao Hàng',
      'Đơn Vị Vận Chuyển',
      'Mã Vận Đơn Tracking',
      'Ghi Chú Khách Hàng'
    ];

    const rows = list.map((o) => [
      `"${o.id}"`,
      `"${o.date}"`,
      `"${o.time || ''}"`,
      `"${(o.customer?.name || '').replace(/"/g, '""')}"`,
      `"${o.customer?.phone || ''}"`,
      `"${(o.customer?.address || '').replace(/"/g, '""')}"`,
      `"${(o.item || '').replace(/"/g, '""')}"`,
      `"${o.size || ''}"`,
      o.totalAmount || parseInt(String(o.total).replace(/\D/g, ''), 10) || 0,
      `"${o.paymentMethod || ''}"`,
      `"${o.paymentStatus || ''}"`,
      `"${o.status || ''}"`,
      `"${o.carrier || ''}"`,
      `"${o.trackingCode || ''}"`,
      `"${(o.note || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `TC_SPORT_DonHang_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (showToast) showToast('Đã xuất file Excel / CSV thành công!', 'success');
  };

  const handleSaveProduct = async (formData, originalProduct) => {
    let updatedList;
    try {
      if (originalProduct) {
        const res = await api.products.update(originalProduct.id, formData);
        updatedList = products.map((p) => (p.id === originalProduct.id ? res : p));
        if (showToast) showToast(`Đã cập nhật sản phẩm vào MySQL: ${formData.name}`, 'success');
      } else {
        const res = await api.products.create(formData);
        updatedList = [res, ...products];
        if (showToast) showToast(`Đã thêm mẫu giày vào MySQL: ${formData.name}`, 'success');
      }
    } catch (err) {
      console.warn('Lỗi gọi API lưu sản phẩm, chuyển lưu LocalStorage:', err);
      if (originalProduct) {
        updatedList = products.map((p) =>
          p.id === originalProduct.id
            ? {
                ...p,
                ...formData,
                price: Number(formData.price),
                costPrice: Number(formData.costPrice),
                originalPrice: Number(formData.originalPrice)
              }
            : p
        );
        if (showToast) showToast(`Đã cập nhật sản phẩm: ${formData.name}`, 'success');
      } else {
        const newId = Math.max(...products.map((p) => Number(p.id) || 0), 0) + 1;
        const newProductItem = {
          id: newId,
          ...formData,
          price: Number(formData.price),
          costPrice: Number(formData.costPrice),
          originalPrice: Number(formData.originalPrice),
          soldCount: 0,
          rating: 5.0
        };
        updatedList = [newProductItem, ...products];
        if (showToast) showToast(`Đã thêm mẫu giày: ${formData.name}`, 'success');
      }
    }
    setProducts(updatedList);
    saveStoredProducts(updatedList);
  };

  const handleDeleteProduct = async (productId, productName) => {
    if (window.confirm(`Bạn có chắc muốn xóa "${productName}"?`)) {
      try {
        await api.products.delete(productId);
      } catch (err) {
        console.warn('Lỗi xóa sản phẩm qua API, xóa trên LocalStorage:', err);
      }
      const updatedList = products.filter((p) => p.id !== productId);
      setProducts(updatedList);
      saveStoredProducts(updatedList);
      if (showToast) showToast(`Đã xóa sản phẩm #${productId}`, 'info');
    }
  };

  const handleResetCatalog = () => {
    if (window.confirm('Khôi phục kho 36 giày gốc?')) {
      resetStoredProducts();
      setProducts(ALL_PRODUCTS);
      if (showToast) showToast('Đã khôi phục kho gốc!', 'success');
    }
  };

  const handleQuickRestock = async (productId, size = 42, amount = 5) => {
    try {
      const res = await api.products.restock(productId, amount);
      const updatedList = products.map((p) => (p.id === productId ? res : p));
      setProducts(updatedList);
      saveStoredProducts(updatedList);
      if (showToast) showToast(`Đã nhập thêm +${amount} đôi cho sản phẩm vào MySQL!`, 'success');
      return;
    } catch (err) {
      console.warn('Lỗi restock API, cập nhật LocalStorage:', err);
    }

    const updatedList = products.map((p) => {
      if (p.id === productId) {
        const curMap = getRealisticSizeStock(p);
        const curStock = curMap[size] ?? 0;
        return {
          ...p,
          sizeStock: {
            ...curMap,
            [size]: curStock + amount
          }
        };
      }
      return p;
    });
    setProducts(updatedList);
    saveStoredProducts(updatedList);
    if (showToast) showToast(`Đã nhập thêm +${amount} đôi cho Size ${size}!`, 'success');
  };

  const handleCopyText = (text, label) => {
    navigator.clipboard.writeText(text);
    if (showToast) showToast(`Đã sao chép ${label}: ${text}`, 'info');
  };

  return (
    <div className="admin-viewport">
      {/* 1. TOPBAR ADMIN */}
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <a
            href="/admin"
            className="admin-logo-brand"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('overview');
            }}
          >
            TC SPORT <span>ADMIN</span>
          </a>
          <span className="admin-badge-role">QUẢN TRỊ VIÊN CẤP CAO</span>
        </div>

        <div className="admin-topbar-right">
          <button
            type="button"
            className="btn-admin-action btn-admin-action-seed"
            onClick={() => {
              localStorage.setItem('tc_user_orders', JSON.stringify(SEED_INITIAL_ORDERS));
              setOrders(SEED_INITIAL_ORDERS);
              if (showToast) showToast('Đã nạp 5 đơn hàng mẫu thực tế!', 'success');
            }}
            title="Nạp lại 5 đơn mẫu"
          >
            ⚡ Nạp đơn mẫu
          </button>

          <button
            type="button"
            className="btn-admin-action btn-admin-action-store"
            onClick={() => onNavigate('home')}
            title="Chuyển về giao diện người mua hàng"
          >
            🌐 Xem Cửa Hàng
          </button>

          <div className="admin-profile-chip">
            {authUser.avatar ? (
              <img src={authUser.avatar} alt="Admin" />
            ) : (
              <div className="admin-profile-avatar-fallback">C</div>
            )}
            <div>
              <div className="admin-profile-name">{authUser.name || 'Cườngg Tiến'}</div>
              <div className="admin-profile-sub">Quản trị hệ thống</div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BỐ CỤC CHÍNH (SIDEBAR + WORKSPACE) */}
      <div className="admin-layout-container">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-section-title">HỆ THỐNG ĐIỀU HÀNH</div>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <div className="admin-nav-icon-label">
              <span>📊</span>
              <span>Tổng quan hệ thống</span>
            </div>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <div className="admin-nav-icon-label">
              <span>📦</span>
              <span>Quản lý Đơn hàng</span>
            </div>
            {analytics.pendingCount > 0 && (
              <span className="admin-nav-badge">{analytics.pendingCount}</span>
            )}
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'revenue' ? 'active' : ''}`}
            onClick={() => setActiveTab('revenue')}
          >
            <div className="admin-nav-icon-label">
              <span>📈</span>
              <span>Báo cáo Doanh thu</span>
            </div>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'categories' ? 'active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            <div className="admin-nav-icon-label">
              <span>🏷️</span>
              <span>Quản lý Danh mục</span>
            </div>
            <span className="admin-nav-badge-count">{categories.length + brands.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <div className="admin-nav-icon-label">
              <span>👟</span>
              <span>Quản lý Sản phẩm</span>
            </div>
            <span className="admin-nav-badge-count">{products.length}</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
          >
            <div className="admin-nav-icon-label">
              <span>👥</span>
              <span>Khách hàng & CRM</span>
            </div>
            <span className="admin-nav-badge-count">{analytics.totalCustomers}</span>
          </button>

          <div className="admin-sidebar-section-title" style={{ marginTop: '20px' }}>
            HỆ THỐNG & DỮ LIỆU
          </div>

          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <div className="admin-nav-icon-label">
              <span>⚙️</span>
              <span>Cài đặt & Dữ liệu</span>
            </div>
          </button>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1F2937' }}>
            <div style={{ fontSize: '0.7rem', color: '#6B7280', textAlign: 'center', lineHeight: 1.5 }}>
              <b>TC SPORT PRO ADMIN</b><br />
              Enterprise Edition 2026
            </div>
          </div>
        </aside>

        <main className="admin-workspace">
          {activeTab === 'orders' && (
            <AdminOrders
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
              onBulkUpdateStatus={handleBulkUpdateStatus}
              onBulkDelete={handleBulkDelete}
              onDeleteSingleOrder={handleDeleteSingleOrder}
              onSaveShippingAndNote={handleSaveShippingAndNote}
              onExportCSV={handleExportCSV}
              onCopyText={handleCopyText}
            />
          )}

          {activeTab === 'overview' && (
            <AdminOverview
              analytics={analytics}
              products={products}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'revenue' && (
            <AdminRevenue
              orders={orders}
              onNavigateTab={(tab) => setActiveTab(tab)}
              showToast={showToast}
            />
          )}

          {activeTab === 'categories' && (
            <AdminCategories
              products={products}
              categories={categories}
              setCategories={setCategories}
              brands={brands}
              setBrands={setBrands}
              onNavigateToProducts={() => setActiveTab('products')}
              showToast={showToast}
            />
          )}

          {activeTab === 'products' && (
            <AdminProducts
              products={products}
              categories={categories}
              brands={brands}
              onSaveProduct={handleSaveProduct}
              onDeleteProduct={handleDeleteProduct}
              onResetCatalog={handleResetCatalog}
              onQuickRestock={handleQuickRestock}
              showToast={showToast}
            />
          )}

          {activeTab === 'customers' && (
            <AdminCustomers
              customers={analytics.customerList}
              onCopyText={handleCopyText}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettings
              orders={orders}
              products={products}
              onSeedDemoOrders={() => {
                localStorage.setItem('tc_user_orders', JSON.stringify(SEED_INITIAL_ORDERS));
                setOrders(SEED_INITIAL_ORDERS);
                if (showToast) showToast('Đã nạp 5 đơn hàng mẫu!', 'success');
              }}
              onResetCatalog={handleResetCatalog}
              onExportCSV={handleExportCSV}
              showToast={showToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}
