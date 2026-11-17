/**
 * =========================================================================================
 * 📁 TỆP: src/admin/pages/AdminRevenue.jsx
 * 🎯 CHỨC NĂNG: BÁO CÁO DOANH THU & LỢI NHUẬN CHUYÊN NGHIỆP
 * - Chọn & Lọc xem ngày theo bảng lịch tùy chọn ngày/tháng/năm
 * - Chọn khoảng ngày linh hoạt (Tùy chọn khoảng ngày, 7 ngày, 14 ngày, 30 ngày, tháng này)
 * - Biểu đồ trực quan 100% hiển thị rõ ràng với thước đo Y-Axis và nhãn giá trị
 * - Widget lịch mini góc trên hiển thị thứ, ngày, tháng, năm và giờ thực tế
 * =========================================================================================
 */

import React, { useState, useMemo, useEffect } from 'react';
import { formatVND } from '../../data/products';

export const formatShortVND = (num) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(2) + ' Tỷ';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + ' Tr';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
  return num + '₫';
};

// Dữ liệu chi tiết các đơn hàng và mẫu giày bán ra theo từng ngày
const MOCK_DAILY_SALES_DETAILS = {
  '19/10/2026': {
    dateLabel: '19/10/2026 (Thứ Hai)',
    products: [
      { id: 1, name: 'Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương', brand: 'Nike', size: 41, qty: 1, price: 2390000, revenue: 2390000, image: 'assets/images/shoe-pegasus-blue.jpg' },
      { id: 4, name: 'Giày Asics Gel Kayano Runner 30 - Xanh Trắng', brand: 'Asics', size: 39, qty: 2, price: 3190000, revenue: 6380000, image: 'assets/images/shoe-asics-runner.jpg' },
      { id: 5, name: 'Giày Pickleball Court Pro Nam Nữ - Xanh Dương', brand: 'TC Sport', size: 42, qty: 1, price: 1890000, revenue: 1890000, image: 'assets/images/shoe-pickleball-pro.jpg' },
    ],
    orders: [
      { id: 'TC81901', time: '09:20', customer: 'Hoàng Minh Tuấn (0912.345.678 - Hà Nội)', itemsDesc: '1x Nike Pegasus 40 (Size 41)', payment: 'QR Techcombank', status: 'Đã giao thành công', total: 2390000 },
      { id: 'TC81902', time: '14:45', customer: 'Trần Thị Thu Hà (0987.654.321 - Đà Nẵng)', itemsDesc: '2x Asics Gel Kayano Runner (Size 39)', payment: 'Thanh toán COD', status: 'Đã giao thành công', total: 6380000 },
      { id: 'TC81903', time: '17:10', customer: 'Ngô Quốc Bảo (0903.112.233 - TP.HCM)', itemsDesc: '1x Pickleball Court Pro (Size 42)', payment: 'Chuyển khoản', status: 'Đã giao thành công', total: 1890000 },
    ]
  },
  '20/10/2026': {
    dateLabel: '20/10/2026 (Thứ Ba)',
    products: [
      { id: 1, name: 'Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương', brand: 'Nike', size: 42, qty: 2, price: 2390000, revenue: 4780000, image: 'assets/images/shoe-pegasus-blue.jpg' },
      { id: 2, name: 'Giày Air Jordan 1 Retro High OG - Đỏ Chicago', brand: 'Jordan', size: 43, qty: 1, price: 4690000, revenue: 4690000, image: 'assets/images/shoe-retro-high.jpg' },
      { id: 3, name: 'Giày Nike Free Metcon 5 - Đen Vàng Volt Gym', brand: 'Nike', size: 40, qty: 1, price: 3190000, revenue: 3190000, image: 'assets/images/shoe-metcon-volt.jpg' },
      { id: 5, name: 'Giày Pickleball Court Pro Nam Nữ', brand: 'TC Sport', size: 41, qty: 1, price: 1890000, revenue: 1890000, image: 'assets/images/shoe-pickleball-pro.jpg' },
    ],
    orders: [
      { id: 'TC82001', time: '08:30', customer: 'Đặng Tuấn Khang (0934.567.890 - Hải Phòng)', itemsDesc: '2x Nike Pegasus 40 (Size 42)', payment: 'QR Techcombank', status: 'Đã giao thành công', total: 4780000 },
      { id: 'TC82002', time: '11:15', customer: 'Vũ Đức Thịnh (0978.889.900 - Hà Nội)', itemsDesc: '1x Air Jordan 1 Retro High (Size 43)', payment: 'Thanh toán COD', status: 'Đã giao thành công', total: 4690000 },
      { id: 'TC82003', time: '15:40', customer: 'Phan Anh Dũng (0911.223.344 - Cần Thơ)', itemsDesc: '1x Nike Free Metcon 5 (Size 40)', payment: 'Chuyển khoản', status: 'Đã giao thành công', total: 3190000 },
      { id: 'TC82004', time: '19:05', customer: 'Nguyễn Bích Ngọc (0966.778.899 - TP.HCM)', itemsDesc: '1x Pickleball Court Pro (Size 41)', payment: 'Thanh toán COD', status: 'Đã giao thành công', total: 1890000 },
    ]
  },
  '21/10/2026': {
    dateLabel: '21/10/2026 (Thứ Tư)',
    products: [
      { id: 2, name: 'Giày Air Jordan 1 Retro High OG - Đỏ Chicago', brand: 'Jordan', size: 42, qty: 1, price: 4690000, revenue: 4690000, image: 'assets/images/shoe-retro-high.jpg' },
      { id: 5, name: 'Giày Pickleball Court Pro Nam Nữ - Xanh Dương', brand: 'TC Sport', size: 40, qty: 2, price: 1890000, revenue: 3780000, image: 'assets/images/shoe-pickleball-pro.jpg' },
    ],
    orders: [
      { id: 'TC82101', time: '10:05', customer: 'Lê Hoàng Nam (0983.334.455 - Hà Nội)', itemsDesc: '1x Air Jordan 1 Retro High (Size 42)', payment: 'QR Techcombank', status: 'Đã giao thành công', total: 4690000 },
      { id: 'TC82102', time: '16:20', customer: 'Trịnh Thanh Mai (0915.667.788 - Đà Nẵng)', itemsDesc: '2x Pickleball Court Pro (Size 40)', payment: 'Thanh toán COD', status: 'Đã giao thành công', total: 3780000 },
    ]
  },
  '22/10/2026': {
    dateLabel: '22/10/2026 (Thứ Năm)',
    products: [
      { id: 1, name: 'Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương', brand: 'Nike', size: 41, qty: 2, price: 2390000, revenue: 4780000, image: 'assets/images/shoe-pegasus-blue.jpg' },
      { id: 2, name: 'Giày Air Jordan 1 Retro High OG - Đỏ Chicago', brand: 'Jordan', size: 44, qty: 1, price: 4690000, revenue: 4690000, image: 'assets/images/shoe-retro-high.jpg' },
      { id: 3, name: 'Giày Nike Free Metcon 5 Gym', brand: 'Nike', size: 42, qty: 1, price: 3190000, revenue: 3190000, image: 'assets/images/shoe-metcon-volt.jpg' },
      { id: 6, name: 'Giày Chạy Bộ Speed Pro Running Carbon', brand: 'TC Sport', size: 43, qty: 2, price: 2890000, revenue: 5780000, image: 'assets/images/shoe-running-pro.jpg' },
    ],
    orders: [
      { id: 'TC82201', time: '09:10', customer: 'Đào Duy Anh (0904.556.677 - Bắc Ninh)', itemsDesc: '1x Air Jordan 1 Retro High (Size 44)', payment: 'QR Techcombank', status: 'Đã giao thành công', total: 4690000 },
      { id: 'TC82202', time: '11:45', customer: 'Phạm Minh Trí (0932.114.455 - TP.HCM)', itemsDesc: '1x Nike Free Metcon 5 (Size 42)', payment: 'Thanh toán COD', status: 'Đã giao thành công', total: 3190000 },
      { id: 'TC82203', time: '14:30', customer: 'Lý Quốc Hùng (0979.663.322 - Hà Nội)', itemsDesc: '2x Nike Pegasus 40 (Size 41)', payment: 'Chuyển khoản', status: 'Đã giao thành công', total: 4780000 },
      { id: 'TC82204', time: '16:50', customer: 'Đỗ Thùy Trang (0918.990.011 - Vũng Tàu)', itemsDesc: '1x Speed Pro Running Carbon (Size 43)', payment: 'QR Techcombank', status: 'Đã giao thành công', total: 2890000 },
      { id: 'TC82205', time: '19:15', customer: 'Nguyễn Văn Hòa (0982.441.122 - Hải Dương)', itemsDesc: '1x Speed Pro Running Carbon (Size 43)', payment: 'Thanh toán COD', status: 'Đã giao thành công', total: 2890000 },
    ]
  },
  '23/10/2026': {
    dateLabel: '23/10/2026 (Thứ Sáu)',
    products: [
      { id: 2, name: 'Giày Air Jordan 1 Retro High OG - Đỏ Chicago', brand: 'Jordan', size: 43, qty: 1, price: 4690000, revenue: 4690000, image: 'assets/images/shoe-retro-high.jpg' },
      { id: 1, name: 'Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương', brand: 'Nike', size: 40, qty: 2, price: 2390000, revenue: 4780000, image: 'assets/images/shoe-pegasus-blue.jpg' },
      { id: 3, name: 'Giày Nike Free Metcon 5 - Đen Vàng Volt Gym', brand: 'Nike', size: 42, qty: 1, price: 3190000, revenue: 3190000, image: 'assets/images/shoe-metcon-volt.jpg' },
      { id: 5, name: 'Giày Pickleball Court Pro Nam Nữ', brand: 'TC Sport', size: 41, qty: 1, price: 1890000, revenue: 1890000, image: 'assets/images/shoe-pickleball-pro.jpg' },
      { id: 6, name: 'Giày Chạy Bộ Speed Pro Running Carbon', brand: 'TC Sport', size: 42, qty: 1, price: 2940000, revenue: 2940000, image: 'assets/images/shoe-running-pro.jpg' },
    ],
    orders: [
      { id: 'TC77104', time: '09:15', customer: 'Nguyễn Hải Đăng (0918.776.655 - Thanh Xuân, Hà Nội)', itemsDesc: '1x Air Jordan 1 Retro High OG (Size 43)', payment: 'Chuyển khoản Vietcombank', status: 'Đang giao hàng (GHTK)', total: 4690000 },
      { id: 'TC82302', time: '11:30', customer: 'Bùi Mai Anh (0984.112.233 - Quận 1, TP.HCM)', itemsDesc: '2x Nike Pegasus 40 Nam (Size 40)', payment: 'QR Techcombank', status: 'Đã giao thành công', total: 4780000 },
      { id: 'TC82303', time: '14:10', customer: 'Nguyễn Tuấn Anh (0902.334.455 - Cầu Giấy, Hà Nội)', itemsDesc: '1x Nike Free Metcon 5 (Size 42)', payment: 'Thanh toán COD', status: 'Đã giao thành công', total: 3190000 },
      { id: 'TC82304', time: '16:05', customer: 'Đỗ Văn Lâm (0936.554.433 - Hải Phòng)', itemsDesc: '1x Pickleball Court Pro (Size 41)', payment: 'QR Momo', status: 'Đã giao thành công', total: 1890000 },
      { id: 'TC82305', time: '18:40', customer: 'Hoàng Đình Long (0971.223.344 - Đà Nẵng)', itemsDesc: '1x Speed Pro Running Carbon (Size 42)', payment: 'Thanh toán COD', status: 'Đang giao hàng', total: 2940000 },
    ]
  },
  '24/10/2026': {
    dateLabel: '24/10/2026 (Thứ Bảy)',
    products: [
      { id: 1, name: 'Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương', brand: 'Nike', size: 42, qty: 2, price: 2390000, revenue: 4780000, image: 'assets/images/shoe-pegasus-blue.jpg' },
      { id: 2, name: 'Giày Air Jordan 1 Retro High OG - Đỏ Chicago', brand: 'Jordan', size: 41, qty: 2, price: 4690000, revenue: 9380000, image: 'assets/images/shoe-retro-high.jpg' },
      { id: 4, name: 'Giày Asics Gel Kayano Runner 30', brand: 'Asics', size: 40, qty: 1, price: 3190000, revenue: 3190000, image: 'assets/images/shoe-asics-runner.jpg' },
      { id: 3, name: 'Giày Nike Free Metcon 5 Gym', brand: 'Nike', size: 43, qty: 1, price: 3190000, revenue: 3190000, image: 'assets/images/shoe-metcon-volt.jpg' },
      { id: 5, name: 'Giày Pickleball Court Pro Nam Nữ', brand: 'TC Sport', size: 39, qty: 2, price: 1890000, revenue: 3780000, image: 'assets/images/shoe-pickleball-pro.jpg' },
    ],
    orders: [
      { id: 'TC88291', time: '14:30', customer: 'Nguyễn Văn Tiến (0973.711.868 - Xã Đàn, Hà Nội)', itemsDesc: '2x Nike Pegasus 40 Nam (Size 42)', payment: 'QR Techcombank', status: 'Đang chuẩn bị hàng', total: 4780000 },
      { id: 'TC82402', time: '10:15', customer: 'Trần Văn Kiên (0912.887.766 - Ba Đình, Hà Nội)', itemsDesc: '1x Air Jordan 1 Retro High (Size 41)', payment: 'Thanh toán COD', status: 'Đang giao hàng', total: 4690000 },
      { id: 'TC82403', time: '11:40', customer: 'Lê Hồng Nhung (0985.443.322 - TP.HCM)', itemsDesc: '1x Asics Gel Kayano 30 (Size 40)', payment: 'QR Techcombank', status: 'Đã giao thành công', total: 3190000 },
      { id: 'TC82404', time: '15:10', customer: 'Vũ Quốc Toàn (0903.665.544 - Đà Nẵng)', itemsDesc: '2x Pickleball Court Pro (Size 39)', payment: 'Chuyển khoản', status: 'Đã giao thành công', total: 3780000 },
      { id: 'TC82405', time: '16:55', customer: 'Đặng Thúy Nga (0967.112.233 - Hải Phòng)', itemsDesc: '1x Nike Free Metcon 5 (Size 43)', payment: 'Thanh toán COD', status: 'Đang chuẩn bị hàng', total: 3190000 },
      { id: 'TC82406', time: '20:10', customer: 'Hoàng Xuân Bắc (0938.990.011 - Cần Thơ)', itemsDesc: '1x Air Jordan 1 Retro High (Size 41)', payment: 'QR Momo', status: 'Đang chuẩn bị hàng', total: 4690000 },
    ]
  },
  '25/10/2026': {
    dateLabel: '25/10/2026 (Hôm nay - Chủ Nhật)',
    products: [
      { id: 1, name: 'Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương', brand: 'Nike', size: 42, qty: 1, price: 2390000, revenue: 2390000, image: 'assets/images/shoe-pegasus-blue.jpg' },
      { id: 4, name: 'Giày Asics Gel Kayano Runner 30 - Xanh Trắng', brand: 'Asics', size: 41, qty: 2, price: 3190000, revenue: 6380000, image: 'assets/images/shoe-asics-runner.jpg' },
      { id: 5, name: 'Giày Pickleball Court Pro Nam Nữ - Xanh Dương', brand: 'TC Sport', size: 39, qty: 1, price: 1890000, revenue: 1890000, image: 'assets/images/shoe-pickleball-pro.jpg' },
      { id: 3, name: 'Giày Nike Free Metcon 5 - Đen Vàng Volt Gym', brand: 'Nike', size: 42, qty: 1, price: 3190000, revenue: 3190000, image: 'assets/images/shoe-metcon-volt.jpg' },
      { id: 7, name: 'Giày Sneaker Lifestyle Retro Court Cream', brand: 'TC Sport', size: 40, qty: 1, price: 2350000, revenue: 2350000, image: 'assets/images/shoe-beige-retro.jpg' },
    ],
    orders: [
      { id: 'TC82501', time: '08:30', customer: 'Nguyễn Đình Trọng (0974.223.344 - Đống Đa, Hà Nội)', itemsDesc: '1x Nike Pegasus 40 Nam (Size 42)', payment: 'QR Techcombank', status: 'Đang chuẩn bị hàng', total: 2390000 },
      { id: 'TC82502', time: '10:15', customer: 'Phạm Hoàng Nam (0916.889.900 - Quận 7, TP.HCM)', itemsDesc: '2x Asics Gel Kayano 30 (Size 41)', payment: 'Thanh toán COD', status: 'Đang chuẩn bị hàng', total: 6380000 },
      { id: 'TC82503', time: '13:45', customer: 'Lê Thu Thảo (0982.556.677 - Ngô Quyền, Hải Phòng)', itemsDesc: '1x Pickleball Court Pro (Size 39)', payment: 'QR Momo', status: 'Đang chuẩn bị hàng', total: 1890000 },
      { id: 'TC82504', time: '15:20', customer: 'Đặng Minh Quân (0909.114.455 - Hải Châu, Đà Nẵng)', itemsDesc: '1x Nike Free Metcon 5 (Size 42)', payment: 'Chuyển khoản', status: 'Đang chuẩn bị hàng', total: 3190000 },
      { id: 'TC82505', time: '16:10', customer: 'Trần Văn Hưng (0935.667.788 - Ninh Kiều, Cần Thơ)', itemsDesc: '1x Sneaker Lifestyle Retro (Size 40)', payment: 'Thanh toán COD', status: 'Đang chuẩn bị hàng', total: 2350000 },
    ]
  }
};

export default function AdminRevenue({ orders = [], onNavigateTab, showToast }) {
  // Đồng hồ thời gian thực
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Chế độ xem: 'day' | 'week' | 'month' | 'year'
  const [viewMode, setViewMode] = useState('day');

  // Lọc khoảng ngày tùy chọn (Từ ngày ... Đến ngày)
  const [startDate, setStartDate] = useState('2026-10-19');
  const [endDate, setEndDate] = useState('2026-10-25');

  // Chọn ngày bất kỳ qua Bảng Lịch (Native Calendar Input) để xem chi tiết
  const [customCalendarDate, setCustomCalendarDate] = useState('2026-10-25');

  // Modal chi tiết bán hàng trong ngày
  const [isDayDetailModalOpen, setIsDayDetailModalOpen] = useState(false);
  const [activeDayDetail, setActiveDayDetail] = useState(MOCK_DAILY_SALES_DETAILS['25/10/2026']);

  // Chọn tuần cụ thể (khi ở chế độ Tuần)
  const [selectedWeek, setSelectedWeek] = useState('w43');

  // Chọn tháng cụ thể (khi ở chế độ Tháng)
  const [selectedMonth, setSelectedMonth] = useState('2026-10');

  // Lọc trạng thái đơn: 'all_valid' | 'completed_only'
  const [statusFilter, setStatusFilter] = useState('all_valid');

  // Lọc tập đơn hàng theo trạng thái
  const validOrders = useMemo(() => {
    return orders.filter((o) => {
      if (statusFilter === 'completed_only') {
        return o.status === 'Đã giao thành công' || o.status === 'Hoàn thành';
      }
      return o.status !== 'Đã hủy đơn';
    });
  }, [orders, statusFilter]);

  // Mở modal chi tiết sản phẩm bán ra của một ngày
  const handleOpenDayDetail = (dayKey) => {
    let detail = MOCK_DAILY_SALES_DETAILS[dayKey];
    if (!detail) {
      // Tìm xem có đơn nào trong orders trùng ngày này không
      const matched = validOrders.filter((o) => o.date === dayKey);
      if (matched.length > 0) {
        const prods = [];
        matched.forEach((o) => {
          if (o.items && o.items.length > 0) {
            o.items.forEach((it) => {
              prods.push({
                id: it.id || 1,
                name: it.name || o.item || 'Giày thể thao cao cấp',
                brand: it.brand || 'Nike',
                size: it.size || o.size || 42,
                qty: it.quantity || 1,
                price: it.price || 2390000,
                revenue: (it.price || 2390000) * (it.quantity || 1),
                image: it.image || o.image || 'assets/images/shoe-pegasus-blue.jpg'
              });
            });
          } else {
            prods.push({
              id: 1,
              name: o.item || 'Giày thể thao chính hãng',
              brand: 'TC Sport',
              size: o.size || 42,
              qty: 1,
              price: o.totalAmount || 2500000,
              revenue: o.totalAmount || 2500000,
              image: o.image || 'assets/images/shoe-pegasus-blue.jpg'
            });
          }
        });

        detail = {
          dateLabel: `Ngày ${dayKey}`,
          products: prods,
          orders: matched.map((o) => ({
            id: o.id,
            time: o.time || '10:00',
            customer: `${o.customer?.name || 'Khách lẻ'} (${o.customer?.phone || ''} - ${o.customer?.address || ''})`,
            itemsDesc: o.item || '1x Giày thể thao',
            payment: o.paymentMethod || 'Chuyển khoản',
            status: o.status || 'Đã giao thành công',
            total: o.totalAmount || 2500000
          }))
        };
      } else {
        // Ngày không có đơn
        detail = {
          dateLabel: `Ngày ${dayKey}`,
          products: [],
          orders: []
        };
      }
    }
    setActiveDayDetail(detail);
    setIsDayDetailModalOpen(true);
  };

  // Mở modal khi người dùng chọn một ngày từ bảng lịch native
  const handleSelectDateFromCalendarInput = (isoDate) => {
    if (!isoDate) return;
    const parts = isoDate.split('-');
    if (parts.length === 3) {
      const formattedKey = `${parts[2]}/${parts[1]}/${parts[0]}`;
      handleOpenDayDetail(formattedKey);
    }
  };

  // Danh mục các tuần trong tháng 10/2026
  const WEEK_OPTIONS = [
    { id: 'w43', label: 'Tuần 43 (19/10/2026 - 25/10/2026)', shortLabel: 'Tuần 43 (Hiện tại)', start: '19/10/2026', end: '25/10/2026' },
    { id: 'w42', label: 'Tuần 42 (12/10/2026 - 18/10/2026)', shortLabel: 'Tuần 42', start: '12/10/2026', end: '18/10/2026' },
    { id: 'w41', label: 'Tuần 41 (05/10/2026 - 11/10/2026)', shortLabel: 'Tuần 41', start: '05/10/2026', end: '11/10/2026' },
    { id: 'w40', label: 'Tuần 40 (28/09/2026 - 04/10/2026)', shortLabel: 'Tuần 40', start: '28/09/2026', end: '04/10/2026' },
  ];

  // Danh mục các tháng trong năm 2026
  const MONTH_OPTIONS = [
    { id: '2026-10', label: 'Tháng 10/2026 (01/10/2026 - 31/10/2026)', start: '01/10/2026', end: '31/10/2026' },
    { id: '2026-09', label: 'Tháng 09/2026 (01/09/2026 - 30/09/2026)', start: '01/09/2026', end: '30/09/2026' },
    { id: '2026-08', label: 'Tháng 08/2026 (01/08/2026 - 31/08/2026)', start: '01/08/2026', end: '31/08/2026' },
    { id: '2026-07', label: 'Tháng 07/2026 (01/07/2026 - 31/07/2026)', start: '01/07/2026', end: '31/07/2026' },
  ];

  // 1. Dữ liệu theo Ngày: Sinh tự động dựa trên khoảng ngày startDate -> endDate
  const dailyData = useMemo(() => {
    let s = new Date(startDate);
    let e = new Date(endDate);
    if (isNaN(s.getTime())) s = new Date('2026-10-19');
    if (isNaN(e.getTime())) e = new Date('2026-10-25');
    if (s > e) {
      const tmp = new Date(s);
      s = new Date(e);
      e = tmp;
    }

    const fullDayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const shortDayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    const result = [];
    const cur = new Date(s);
    let guard = 0;

    while (cur <= e && guard < 60) {
      guard++;
      const dd = String(cur.getDate()).padStart(2, '0');
      const mm = String(cur.getMonth() + 1).padStart(2, '0');
      const yyyy = cur.getFullYear();
      const key = `${dd}/${mm}/${yyyy}`;
      const dayIdx = cur.getDay();
      const isToday = key === '25/10/2026';

      const dateLabel = isToday
        ? `${key} (Hôm nay - ${fullDayNames[dayIdx]})`
        : `${key} (${fullDayNames[dayIdx]})`;
      const shortDay = `${shortDayNames[dayIdx]} ${dd}/${mm}`;

      // Đối chiếu dữ liệu chi tiết có sẵn hoặc dữ liệu đơn thực tế
      const seedDetail = MOCK_DAILY_SALES_DETAILS[key];
      const matchOrders = validOrders.filter((o) => o.date === key);

      let baseRev = seedDetail
        ? seedDetail.products.reduce((acc, p) => acc + p.revenue, 0)
        : ((cur.getDate() % 5 + 3) * 2800000);
      let baseCost = seedDetail ? Math.round(baseRev * 0.65) : Math.round(baseRev * 0.65);
      let baseOrders = seedDetail ? seedDetail.orders.length : (cur.getDate() % 3 + 2);
      let basePairs = seedDetail ? seedDetail.products.reduce((acc, p) => acc + p.qty, 0) : baseOrders + 1;

      const extraRev = matchOrders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
      const extraCost = matchOrders.reduce((acc, o) => acc + (o.costAmount || Math.round((o.totalAmount || 0) * 0.65)), 0);

      const revenue = baseRev + extraRev;
      const cost = baseCost + extraCost;
      const profit = revenue - cost;
      const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : '35.0';
      const orderCount = baseOrders + matchOrders.length;
      const pairCount = basePairs + matchOrders.length;

      result.push({
        key,
        timeRange: dateLabel,
        displayLabel: shortDay,
        revenue,
        cost,
        profit,
        margin,
        orderCount,
        pairCount
      });

      cur.setDate(cur.getDate() + 1);
    }

    return result;
  }, [startDate, endDate, validOrders]);

  // 2. Dữ liệu theo Tuần (4 tuần gần nhất)
  const weeklyData = useMemo(() => {
    return [
      {
        key: 'w40',
        timeRange: 'Tuần 40: Từ 28/09/2026 đến 04/10/2026',
        displayLabel: 'Tuần 40 (28/9 - 4/10)',
        revenue: 64200000,
        cost: 41730000,
        profit: 22470000,
        margin: '35.0',
        orderCount: 22,
        pairCount: 28
      },
      {
        key: 'w41',
        timeRange: 'Tuần 41: Từ 05/10/2026 đến 11/10/2026',
        displayLabel: 'Tuần 41 (5/10 - 11/10)',
        revenue: 78500000,
        cost: 51025000,
        profit: 27475000,
        margin: '35.0',
        orderCount: 26,
        pairCount: 34
      },
      {
        key: 'w42',
        timeRange: 'Tuần 42: Từ 12/10/2026 đến 18/10/2026',
        displayLabel: 'Tuần 42 (12/10 - 18/10)',
        revenue: 71900000,
        cost: 46735000,
        profit: 25165000,
        margin: '35.0',
        orderCount: 25,
        pairCount: 31
      },
      {
        key: 'w43',
        timeRange: 'Tuần 43: Từ 19/10/2026 đến 25/10/2026 (Tuần hiện tại)',
        displayLabel: 'Tuần 43 (19/10 - 25/10)',
        revenue: 88900000,
        cost: 57785000,
        profit: 31115000,
        margin: '35.0',
        orderCount: 31,
        pairCount: 40
      }
    ];
  }, []);

  // 3. Dữ liệu theo Tháng (10 tháng năm 2026)
  const monthlyData = useMemo(() => {
    return [
      { key: 'm1', timeRange: 'Tháng 01/2026 (01/01/2026 - 31/01/2026)', displayLabel: 'Tháng 01', revenue: 215000000, cost: 139750000, profit: 75250000, margin: '35.0', orderCount: 76, pairCount: 95 },
      { key: 'm2', timeRange: 'Tháng 02/2026 (01/02/2026 - 28/02/2026 - Mùa Tết)', displayLabel: 'Tháng 02 (Tết)', revenue: 342000000, cost: 218880000, profit: 123120000, margin: '36.0', orderCount: 118, pairCount: 152 },
      { key: 'm3', timeRange: 'Tháng 03/2026 (01/03/2026 - 31/03/2026)', displayLabel: 'Tháng 03', revenue: 198000000, cost: 128700000, profit: 69300000, margin: '35.0', orderCount: 68, pairCount: 88 },
      { key: 'm4', timeRange: 'Tháng 04/2026 (01/04/2026 - 30/04/2026)', displayLabel: 'Tháng 04', revenue: 226000000, cost: 146900000, profit: 79100000, margin: '35.0', orderCount: 79, pairCount: 102 },
      { key: 'm5', timeRange: 'Tháng 05/2026 (01/05/2026 - 31/05/2026)', displayLabel: 'Tháng 05', revenue: 245000000, cost: 159250000, profit: 85750000, margin: '35.0', orderCount: 84, pairCount: 109 },
      { key: 'm6', timeRange: 'Tháng 06/2026 (01/06/2026 - 30/06/2026)', displayLabel: 'Tháng 06', revenue: 289000000, cost: 187850000, profit: 101150000, margin: '35.0', orderCount: 98, pairCount: 130 },
      { key: 'm7', timeRange: 'Tháng 07/2026 (01/07/2026 - 31/07/2026)', displayLabel: 'Tháng 07', revenue: 265000000, cost: 172250000, profit: 92750000, margin: '35.0', orderCount: 91, pairCount: 118 },
      { key: 'm8', timeRange: 'Tháng 08/2026 (01/08/2026 - 31/08/2026)', displayLabel: 'Tháng 08', revenue: 278000000, cost: 180700000, profit: 97300000, margin: '35.0', orderCount: 95, pairCount: 124 },
      { key: 'm9', timeRange: 'Tháng 09/2026 (01/09/2026 - 30/09/2026)', displayLabel: 'Tháng 09', revenue: 295000000, cost: 191750000, profit: 103250000, margin: '35.0', orderCount: 102, pairCount: 135 },
      { key: 'm10', timeRange: 'Tháng 10/2026 (01/10/2026 - 25/10/2026 - Hiện tại)', displayLabel: 'Tháng 10 (Nay)', revenue: 303500000, cost: 197275000, profit: 106225000, margin: '35.0', orderCount: 104, pairCount: 133 },
    ];
  }, []);

  // 4. Dữ liệu theo Năm (3 năm)
  const yearlyData = useMemo(() => {
    return [
      { key: 'y2024', timeRange: 'Năm 2024: 01/01/2024 - 31/12/2024', displayLabel: 'Năm 2024', revenue: 1850000000, cost: 1221000000, profit: 629000000, margin: '34.0', orderCount: 650, pairCount: 830 },
      { key: 'y2025', timeRange: 'Năm 2025: 01/01/2025 - 31/12/2025', displayLabel: 'Năm 2025', revenue: 2760000000, cost: 1794000000, profit: 966000000, margin: '35.0', orderCount: 940, pairCount: 1220 },
      { key: 'y2026', timeRange: 'Năm 2026: 01/01/2026 - 25/10/2026 (YTD)', displayLabel: 'Năm 2026 (YTD)', revenue: 2656500000, cost: 1724455000, profit: 932045000, margin: '35.1', orderCount: 917, pairCount: 1186 },
    ];
  }, []);

  // Dữ liệu bảng & biểu đồ tương ứng với chế độ đang chọn
  const activeReportRows = useMemo(() => {
    switch (viewMode) {
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      case 'year':
        return yearlyData;
      case 'day':
      default:
        return dailyData;
    }
  }, [viewMode, dailyData, weeklyData, monthlyData, yearlyData]);

  // Thông điệp mốc thời gian hiển thị rõ ràng
  const periodDescription = useMemo(() => {
    switch (viewMode) {
      case 'day': {
        const sParts = startDate.split('-');
        const eParts = endDate.split('-');
        const sFormatted = sParts.length === 3 ? `${sParts[2]}/${sParts[1]}/${sParts[0]}` : startDate;
        const eFormatted = eParts.length === 3 ? `${eParts[2]}/${eParts[1]}/${eParts[0]}` : endDate;
        return `Từ ngày ${sFormatted} đến ngày ${eFormatted} (${dailyData.length} ngày)`;
      }
      case 'week':
        return '4 tuần gần nhất trong chu kỳ (Từ 28/09/2026 đến 25/10/2026)';
      case 'month':
        return '10 tháng trong năm tài chính 2026 (Từ 01/01/2026 đến 25/10/2026)';
      case 'year':
        return 'So sánh 3 năm tài chính (2024 - 2026 YTD)';
      default:
        return 'Báo cáo tổng hợp doanh thu';
    }
  }, [viewMode, startDate, endDate, dailyData.length]);

  // Tính tổng hợp toàn bộ kỳ đang xem
  const totals = useMemo(() => {
    const rev = activeReportRows.reduce((s, r) => s + r.revenue, 0);
    const cost = activeReportRows.reduce((s, r) => s + r.cost, 0);
    const profit = rev - cost;
    const margin = rev > 0 ? ((profit / rev) * 100).toFixed(1) : '0';
    const ordersTotal = activeReportRows.reduce((s, r) => s + r.orderCount, 0);
    const pairsTotal = activeReportRows.reduce((s, r) => s + r.pairCount, 0);
    const aov = ordersTotal > 0 ? Math.round(rev / ordersTotal) : 0;

    return { rev, cost, profit, margin, ordersTotal, pairsTotal, aov };
  }, [activeReportRows]);

  // Tìm doanh thu lớn nhất để scale biểu đồ
  const maxRev = useMemo(() => {
    return Math.max(...activeReportRows.map((r) => r.revenue), 1);
  }, [activeReportRows]);

  // Xuất file CSV
  const handleExportCSV = () => {
    const headers = ['Khoảng Thời Gian', 'Số Đơn Hàng', 'Số Đôi Giày Bán', 'Doanh Thu (VNĐ)', 'Giá Vốn (VNĐ)', 'Lợi Nhuận Gộp (VNĐ)', 'Biên Lãi (%)'];
    const rows = activeReportRows.map((r) => [
      `"${r.timeRange}"`,
      r.orderCount,
      r.pairCount,
      r.revenue,
      r.cost,
      r.profit,
      `${r.margin}%`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `TC_SPORT_BaoCao_${viewMode}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (showToast) showToast('Đã xuất báo cáo doanh thu thành công!', 'success');
  };

  // Ngày hiện tại
  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const todayDayName = dayNames[currentTime.getDay()];
  const todayDateStr = `${String(currentTime.getDate()).padStart(2, '0')}/${String(currentTime.getMonth() + 1).padStart(2, '0')}/${currentTime.getFullYear()}`;
  const todayTimeStr = currentTime.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div>
      {/* 1. TOP HEADER & BẢNG LỊCH MINI NGÀY HÔM NAY */}
      <div className="admin-page-header" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ flex: 1, minWidth: '320px' }}>
          <h1 className="admin-page-header-title">Báo Cáo Doanh Thu & Lợi Nhuận</h1>
          <p className="admin-page-header-desc">
            Phân tích số liệu tài chính, giá vốn và tỷ suất lợi nhuận gộp theo từng mốc thời gian cụ thể.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFF7ED', border: '1px solid #FDBA74', padding: '6px 12px', borderRadius: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '0.9rem' }}>📅</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C2410C' }}>
              Khoảng thời gian báo cáo:
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>
              {periodDescription}
            </span>
          </div>
        </div>

        {/* WIDGET LỊCH MINI GÓC TRÊN */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #DFCEB0',
            borderRadius: '12px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            padding: '8px 14px',
            gap: '14px',
            minWidth: '240px'
          }}
        >
          {/* Ô Lịch Bloc Mini */}
          <div
            style={{
              width: '54px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              border: '1px solid #CBD5E1',
              textAlign: 'center',
              flexShrink: 0
            }}
          >
            <div style={{ background: '#EA580C', color: '#FFFFFF', fontSize: '0.62rem', fontWeight: 800, padding: '2px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Tháng {currentTime.getMonth() + 1}
            </div>
            <div style={{ background: '#FFFFFF', color: '#0F172A', fontSize: '1.4rem', fontWeight: 900, lineHeight: 1.15, padding: '2px 0' }}>
              {currentTime.getDate()}
            </div>
            <div style={{ background: '#F8FAFC', color: '#64748B', fontSize: '0.6rem', fontWeight: 700, paddingBottom: '2px' }}>
              {currentTime.getFullYear()}
            </div>
          </div>

          {/* Chi tiết thứ & đồng hồ chạy thời gian thực */}
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A' }}>
              {todayDayName}
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 600 }}>
              Ngày {todayDateStr}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
              <span style={{ fontSize: '0.78rem', fontFamily: 'monospace', fontWeight: 700, color: '#C2410C' }}>
                {todayTimeStr}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THANH BỘ LỌC CHU KỲ & BẢNG LỊCH CHỌN NGÀY THÁNG NĂM TÙY CHỌN */}
      <div className="admin-card" style={{ marginBottom: '18px', padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          {/* Nhóm nút chọn chu kỳ */}
          <div className="dimension-toggle-group">
            <button
              type="button"
              className={`dimension-toggle-btn ${viewMode === 'day' ? 'active' : ''}`}
              onClick={() => setViewMode('day')}
            >
              📅 Theo Ngày (Lịch)
            </button>
            <button
              type="button"
              className={`dimension-toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              📆 Theo Tuần (Weekly)
            </button>
            <button
              type="button"
              className={`dimension-toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              🗓️ Theo Tháng (Monthly)
            </button>
            <button
              type="button"
              className={`dimension-toggle-btn ${viewMode === 'year' ? 'active' : ''}`}
              onClick={() => setViewMode('year')}
            >
              📊 Theo Năm (Yearly)
            </button>
          </div>

          {/* Nút xuất Excel & Lọc trạng thái */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Lọc trạng thái đơn hàng */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>Đơn hàng:</span>
              <select
                className="admin-filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '6px 10px', fontSize: '0.8rem' }}
              >
                <option value="all_valid">Tất cả đơn (trừ đơn hủy)</option>
                <option value="completed_only">Chỉ đơn giao thành công</option>
              </select>
            </div>

            <button
              type="button"
              className="btn-secondary-admin"
              onClick={handleExportCSV}
              style={{ padding: '6px 12px', fontSize: '0.78rem' }}
            >
              📥 Xuất Excel
            </button>
          </div>
        </div>

        {/* HÀNG BỘ LỌC CHI TIẾT NGÀY / TUẦN / THÁNG */}
        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          {/* Nếu đang xem Theo Ngày: Cho phép chọn khoảng ngày bất kỳ qua Date Picker & chọn 1 ngày qua lịch */}
          {viewMode === 'day' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', width: '100%' }}>
              {/* Khoảng ngày Từ ... Đến */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>Khoảng ngày:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.76rem', color: '#64748B' }}>Từ:</span>
                  <input
                    type="date"
                    className="admin-filter-select"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ padding: '5px 8px', fontSize: '0.8rem' }}
                  />
                  <span style={{ fontSize: '0.76rem', color: '#64748B' }}>Đến:</span>
                  <input
                    type="date"
                    className="admin-filter-select"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ padding: '5px 8px', fontSize: '0.8rem' }}
                  />
                </div>

                {/* Phím tắt nhanh khoảng ngày */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setStartDate('2026-10-19');
                      setEndDate('2026-10-25');
                    }}
                    style={{ padding: '4px 8px', fontSize: '0.72rem', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    7 Ngày qua
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStartDate('2026-10-12');
                      setEndDate('2026-10-25');
                    }}
                    style={{ padding: '4px 8px', fontSize: '0.72rem', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    14 Ngày
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStartDate('2026-10-01');
                      setEndDate('2026-10-25');
                    }}
                    style={{ padding: '4px 8px', fontSize: '0.72rem', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Tháng 10
                  </button>
                </div>
              </div>

              {/* Bảng lịch chọn xem chi tiết bất kỳ ngày nào */}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', background: '#FFF7ED', padding: '6px 12px', borderRadius: '8px', border: '1px solid #FDBA74' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C2410C' }}>
                  📅 Chọn ngày xem chi tiết (Lịch):
                </span>
                <input
                  type="date"
                  className="admin-filter-select"
                  value={customCalendarDate}
                  onChange={(e) => {
                    setCustomCalendarDate(e.target.value);
                    handleSelectDateFromCalendarInput(e.target.value);
                  }}
                  style={{ padding: '5px 8px', fontSize: '0.8rem', fontWeight: 700 }}
                />
                <button
                  type="button"
                  className="btn-primary-admin"
                  onClick={() => handleSelectDateFromCalendarInput(customCalendarDate)}
                  style={{ padding: '5px 10px', fontSize: '0.74rem' }}
                >
                  Xem Bán Hàng
                </button>
              </div>
            </div>
          )}

          {viewMode === 'week' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>Chọn tuần cụ thể:</span>
              <select
                className="admin-filter-select"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                style={{ padding: '6px 14px', fontSize: '0.82rem', fontWeight: 700 }}
              >
                {WEEK_OPTIONS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {viewMode === 'month' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>Chọn tháng cụ thể:</span>
              <select
                className="admin-filter-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{ padding: '6px 14px', fontSize: '0.82rem', fontWeight: 700 }}
              >
                {MONTH_OPTIONS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {viewMode === 'year' && (
            <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
              Hiển thị số liệu so sánh chu kỳ 3 năm tài chính (2024, 2025 và 2026 YTD).
            </div>
          )}
        </div>
      </div>

      {/* 3. BẢNG 4 CHỈ SỐ KPI TÀI CHÍNH */}
      <div className="admin-kpi-grid" style={{ marginBottom: '20px' }}>
        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span>Tổng Doanh Thu</span>
            <span style={{ fontSize: '0.72rem', background: '#FFEDD5', color: '#C2410C', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
              {activeReportRows.length} Mốc
            </span>
          </div>
          <div className="admin-kpi-val" style={{ color: '#0F172A' }}>
            {formatVND(totals.rev)}
          </div>
          <div className="admin-kpi-sub" style={{ color: '#16A34A' }}>
            ↑ 15.8% so với chu kỳ trước
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span>Tổng Giá Vốn (COGS)</span>
            <span style={{ fontSize: '0.72rem', background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              Tiền Nhập Hàng
            </span>
          </div>
          <div className="admin-kpi-val" style={{ color: '#475569' }}>
            {formatVND(totals.cost)}
          </div>
          <div className="admin-kpi-sub">
            Chiếm ~{(100 - parseFloat(totals.margin)).toFixed(0)}% tổng doanh thu
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span>Lợi Nhuận Gộp (Gross Profit)</span>
            <span style={{ fontSize: '0.72rem', background: '#DCFCE7', color: '#16A34A', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
              Thực Thu
            </span>
          </div>
          <div className="admin-kpi-val" style={{ color: '#16A34A' }}>
            +{formatVND(totals.profit)}
          </div>
          <div className="admin-kpi-sub" style={{ color: '#16A34A' }}>
            Biên lãi gộp: <b>~{totals.margin}%</b>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span>Sản Lượng Bán Ra</span>
            <span style={{ fontSize: '0.72rem', background: '#EFF6FF', color: '#2563EB', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
              Đơn Hàng
            </span>
          </div>
          <div className="admin-kpi-val" style={{ color: '#2563EB' }}>
            {totals.ordersTotal} đơn <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>({totals.pairsTotal} đôi)</span>
          </div>
          <div className="admin-kpi-sub">
            AOV (Giá trị TB đơn): <b>{formatVND(totals.aov)}</b>
          </div>
        </div>
      </div>

      {/* 4. BIỂU ĐỒ DOANH THU & LỢI NHUẬN TRỰC QUAN (CLICK VÀO CỘT ĐỂ XEM CHI TIẾT NGÀY) */}
      <div className="admin-card" style={{ marginBottom: '22px', padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>
              Biểu Đồ So Sánh Doanh Thu & Lợi Nhuận Gộp
            </div>
            <div style={{ fontSize: '0.76rem', color: '#64748B', marginTop: '2px' }}>
              💡 <b>Mẹo:</b> Bạn có thể click trực tiếp vào cột bất kỳ ngày nào để xem chi tiết danh sách giày đã bán trong ngày đó!
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '0.78rem', fontWeight: 700 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '14px', height: '14px', background: 'linear-gradient(180deg, #F97316, #C2410C)', borderRadius: '3px', display: 'inline-block' }}></span>
              <span>Doanh Thu (Màu cam)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '14px', height: '14px', background: 'linear-gradient(180deg, #34D399, #059669)', borderRadius: '3px', display: 'inline-block' }}></span>
              <span>Lợi Nhuận Gộp (Màu xanh)</span>
            </div>
          </div>
        </div>

        {/* Khung Biểu Đồ với thước đo và lưới ngang */}
        <div
          style={{
            background: '#FAF8F5',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '24px 16px 12px 60px',
            position: 'relative'
          }}
        >
          {/* Thước đo Y-Axis (Giá trị doanh thu) */}
          <div style={{ position: 'absolute', left: '10px', top: '20px', bottom: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748B', fontWeight: 700, textAlign: 'right', width: '42px' }}>
            <span>{formatShortVND(maxRev)}</span>
            <span>{formatShortVND(maxRev * 0.75)}</span>
            <span>{formatShortVND(maxRev * 0.5)}</span>
            <span>{formatShortVND(maxRev * 0.25)}</span>
            <span>0₫</span>
          </div>

          {/* Đường lưới ngang */}
          <div style={{ position: 'absolute', left: '55px', right: '16px', top: '24px', bottom: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
            <div style={{ borderTop: '1px dashed #CBD5E1', width: '100%' }}></div>
            <div style={{ borderTop: '1px dashed #E2E8F0', width: '100%' }}></div>
            <div style={{ borderTop: '1px dashed #E2E8F0', width: '100%' }}></div>
            <div style={{ borderTop: '1px dashed #E2E8F0', width: '100%' }}></div>
            <div style={{ borderTop: '1px solid #94A3B8', width: '100%' }}></div>
          </div>

          {/* Cụm các cột biểu đồ */}
          <div
            style={{
              height: '180px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              gap: '12px',
              position: 'relative',
              zIndex: 2,
              paddingBottom: '2px',
              overflowX: 'auto'
            }}
          >
            {activeReportRows.map((item, idx) => {
              const revPx = Math.max(16, Math.round((item.revenue / maxRev) * 150));
              const profitPx = Math.max(10, Math.round((item.profit / maxRev) * 150));

              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    minWidth: '45px',
                    maxWidth: '85px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    position: 'relative',
                    cursor: viewMode === 'day' ? 'pointer' : 'default'
                  }}
                  className="chart-bar-group"
                  onClick={() => {
                    if (viewMode === 'day') {
                      handleOpenDayDetail(item.key);
                    }
                  }}
                >
                  {/* Tooltip khi di chuột */}
                  <div
                    className="chart-tooltip"
                    style={{
                      minWidth: '180px',
                      background: '#0F172A',
                      color: '#FFFFFF',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                      textAlign: 'left',
                      lineHeight: 1.45,
                      bottom: `${revPx + 15}px`,
                      top: 'auto'
                    }}
                  >
                    <div style={{ fontWeight: 800, color: '#FDBA74', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '3px', marginBottom: '4px' }}>
                      {item.timeRange}
                    </div>
                    <div>Doanh thu: <b style={{ color: '#FB923C' }}>{formatVND(item.revenue)}</b></div>
                    <div>Giá vốn: <span style={{ color: '#94A3B8' }}>{formatVND(item.cost)}</span></div>
                    <div>Lợi nhuận gộp: <b style={{ color: '#4ADE80' }}>+{formatVND(item.profit)}</b> ({item.margin}%)</div>
                    <div style={{ color: '#60A5FA', fontSize: '0.72rem', marginTop: '2px', fontWeight: 700 }}>
                      Đơn hàng: {item.orderCount} đơn • {item.pairCount} đôi giày
                    </div>
                    {viewMode === 'day' && (
                      <div style={{ fontSize: '0.65rem', color: '#FDBA74', marginTop: '4px', fontStyle: 'italic' }}>
                        👉 Bấm vào cột để xem danh sách sản phẩm bán
                      </div>
                    )}
                  </div>

                  {/* Giá trị số doanh thu viết ngay trên đỉnh cột */}
                  <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#C2410C', marginBottom: '4px', whiteSpace: 'nowrap' }}>
                    {formatShortVND(item.revenue)}
                  </div>

                  {/* Cặp Cột Đôi: Doanh Thu & Lợi Nhuận */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', width: '100%', justifyContent: 'center' }}>
                    {/* Cột Doanh Thu (Cam) */}
                    <div
                      style={{
                        width: '45%',
                        maxWidth: '28px',
                        height: `${revPx}px`,
                        background: 'linear-gradient(180deg, #FB923C 0%, #C2410C 100%)',
                        borderRadius: '5px 5px 0 0',
                        boxShadow: '0 2px 5px rgba(194, 65, 12, 0.3)',
                        transition: 'all 0.2s ease',
                      }}
                      title={`Doanh thu: ${formatVND(item.revenue)}`}
                    ></div>

                    {/* Cột Lợi Nhuận (Xanh) */}
                    <div
                      style={{
                        width: '45%',
                        maxWidth: '28px',
                        height: `${profitPx}px`,
                        background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                        borderRadius: '5px 5px 0 0',
                        boxShadow: '0 2px 5px rgba(5, 150, 105, 0.3)',
                        transition: 'all 0.2s ease',
                      }}
                      title={`Lợi nhuận: ${formatVND(item.profit)}`}
                    ></div>
                  </div>

                  {/* Nhãn mốc thời gian bên dưới */}
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: '#0F172A',
                      fontWeight: 700,
                      marginTop: '8px',
                      textAlign: 'center',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {item.displayLabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. BẢNG SỐ LIỆU DOANH THU & LỢI NHUẬN CHI TIẾT */}
      <div className="admin-table-card">
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#0F172A' }}>
              Bảng Số Liệu Chi Tiết Theo Từng Mốc Thời Gian
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
              Báo cáo chính xác: {periodDescription}
            </div>
          </div>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#C2410C', background: '#FFEDD5', padding: '3px 10px', borderRadius: '12px' }}>
            Tổng cộng: {activeReportRows.length} mốc thời gian
          </span>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '260px' }}>Khoảng Thời Gian</th>
                <th style={{ textAlign: 'center', width: '90px' }}>Đơn Hàng</th>
                <th style={{ textAlign: 'center', width: '90px' }}>Số Đôi Giày</th>
                <th style={{ textAlign: 'right' }}>Doanh Thu (VNĐ)</th>
                <th style={{ textAlign: 'right' }}>Giá Vốn (VNĐ)</th>
                <th style={{ textAlign: 'right' }}>Lợi Nhuận Gộp (VNĐ)</th>
                <th style={{ textAlign: 'center', width: '100px' }}>Biên Lãi (%)</th>
                <th style={{ textAlign: 'center', width: '130px' }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {activeReportRows.map((row, idx) => (
                <tr key={idx}>
                  <td>
                    <b style={{ color: '#0F172A', fontSize: '0.84rem' }}>{row.timeRange}</b>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#2563EB', background: '#EFF6FF', padding: '2px 8px', borderRadius: '4px', fontSize: '0.76rem' }}>
                      {row.orderCount} đơn
                    </span>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 600, color: '#475569', fontSize: '0.8rem' }}>
                    {row.pairCount} đôi
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: '#0F172A', fontSize: '0.86rem' }}>
                    {formatVND(row.revenue)}
                  </td>
                  <td style={{ textAlign: 'right', color: '#64748B', fontSize: '0.82rem' }}>
                    {formatVND(row.cost)}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: '#16A34A', fontSize: '0.86rem' }}>
                    +{formatVND(row.profit)}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '3px 8px', borderRadius: '12px', fontSize: '0.76rem' }}>
                      ~{row.margin}%
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    {viewMode === 'day' ? (
                      <button
                        type="button"
                        onClick={() => handleOpenDayDetail(row.key)}
                        style={{
                          background: '#FFF7ED',
                          color: '#C2410C',
                          border: '1px solid #FDBA74',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        🔍 Xem sản phẩm
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>Chu kỳ dài</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Hàng tổng cộng cuối bảng */}
            <tfoot>
              <tr style={{ background: '#F8FAFC', borderTop: '2px solid #CBD5E1', fontWeight: 800 }}>
                <td>
                  <span style={{ color: '#C2410C', fontSize: '0.88rem' }}>TỔNG CỘNG ({activeReportRows.length} MỐC)</span>
                </td>
                <td style={{ textAlign: 'center', color: '#2563EB' }}>
                  {totals.ordersTotal} đơn
                </td>
                <td style={{ textAlign: 'center', color: '#475569' }}>
                  {totals.pairsTotal} đôi
                </td>
                <td style={{ textAlign: 'right', color: '#C2410C', fontSize: '0.92rem' }}>
                  {formatVND(totals.rev)}
                </td>
                <td style={{ textAlign: 'right', color: '#64748B' }}>
                  {formatVND(totals.cost)}
                </td>
                <td style={{ textAlign: 'right', color: '#16A34A', fontSize: '0.92rem' }}>
                  +{formatVND(totals.profit)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{ fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '3px 8px', borderRadius: '12px', fontSize: '0.76rem' }}>
                    ~{totals.margin}%
                  </span>
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 6. MODAL CHI TIẾT BÁN HÀNG THEO NGÀY (CÁC SẢN PHẨM & ĐƠN HÀNG TRONG NGÀY) */}
      {isDayDetailModalOpen && activeDayDetail && (
        <div className="admin-modal-backdrop" onClick={() => setIsDayDetailModalOpen(false)}>
          <div className="admin-modal-card" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="admin-modal-header">
              <div>
                <div className="admin-modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>📊</span>
                  <span>Báo Cáo Chi Tiết Bán Hàng: {activeDayDetail.dateLabel}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                  Chi tiết từng mẫu giày xuất kho và các đơn hàng phát sinh trong ngày
                </div>
              </div>
              <button
                type="button"
                className="btn-close-admin-modal"
                onClick={() => setIsDayDetailModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="admin-modal-body" style={{ padding: '18px 22px' }}>
              {/* BẢNG 1: CÁC MẪU GIÀY BÁN RA TRONG NGÀY */}
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>👟 Các Mẫu Giày Đã Xuất Kho Trong Ngày</span>
                  <span style={{ fontSize: '0.75rem', color: '#C2410C', fontWeight: 700 }}>
                    {activeDayDetail.products.reduce((s, p) => s + p.qty, 0)} đôi giày
                  </span>
                </div>
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                  <table className="admin-table" style={{ fontSize: '0.8rem' }}>
                    <thead style={{ background: '#F8FAFC' }}>
                      <tr>
                        <th style={{ width: '60px' }}>Ảnh</th>
                        <th>Tên Mẫu Giày & Hãng</th>
                        <th style={{ width: '80px', textAlign: 'center' }}>Size</th>
                        <th style={{ width: '90px', textAlign: 'center' }}>Số Lượng</th>
                        <th style={{ width: '130px', textAlign: 'right' }}>Đơn Giá</th>
                        <th style={{ width: '140px', textAlign: 'right' }}>Thành Tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeDayDetail.products.length > 0 ? (
                        activeDayDetail.products.map((p, idx) => (
                          <tr key={idx}>
                            <td>
                              <img
                                src={p.image}
                                alt={p.name}
                                style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #CBD5E1' }}
                              />
                            </td>
                            <td>
                              <b style={{ color: '#0F172A', display: 'block' }}>{p.name}</b>
                              <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Hãng: {p.brand}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <span style={{ background: '#F1F5F9', color: '#0F172A', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                                {p.size}
                              </span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <b style={{ color: '#C2410C', fontSize: '0.88rem' }}>{p.qty} đôi</b>
                            </td>
                            <td style={{ textAlign: 'right', color: '#475569' }}>
                              {formatVND(p.price)}
                            </td>
                            <td style={{ textAlign: 'right', fontWeight: 800, color: '#0F172A' }}>
                              {formatVND(p.revenue)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748B' }}>
                            Chưa có sản phẩm nào xuất kho trong ngày này.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* BẢNG 2: DANH SÁCH CÁC ĐƠN HÀNG PHÁT SINH TRONG NGÀY */}
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>📦 Danh Sách Đơn Hàng Cụ Thể Trong Ngày</span>
                  <span style={{ fontSize: '0.75rem', color: '#2563EB', fontWeight: 700 }}>
                    {activeDayDetail.orders.length} đơn hàng
                  </span>
                </div>
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                  <table className="admin-table" style={{ fontSize: '0.8rem' }}>
                    <thead style={{ background: '#F8FAFC' }}>
                      <tr>
                        <th style={{ width: '100px' }}>Mã Đơn</th>
                        <th style={{ width: '70px' }}>Giờ</th>
                        <th>Khách Hàng</th>
                        <th>Sản Phẩm Trong Đơn</th>
                        <th style={{ width: '130px' }}>Thanh Toán</th>
                        <th style={{ width: '130px', textAlign: 'right' }}>Tổng Tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeDayDetail.orders.length > 0 ? (
                        activeDayDetail.orders.map((ord, idx) => (
                          <tr key={idx}>
                            <td>
                              <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#C2410C', background: '#FFEDD5', padding: '2px 6px', borderRadius: '4px' }}>
                                #{ord.id}
                              </span>
                            </td>
                            <td style={{ color: '#64748B', fontWeight: 600 }}>
                              {ord.time}
                            </td>
                            <td>
                              <div style={{ fontWeight: 700, color: '#0F172A' }}>{ord.customer}</div>
                            </td>
                            <td style={{ color: '#334155' }}>
                              {ord.itemsDesc}
                            </td>
                            <td>
                              <span style={{ fontSize: '0.72rem', color: '#475569' }}>{ord.payment}</span>
                            </td>
                            <td style={{ textAlign: 'right', fontWeight: 800, color: '#0F172A' }}>
                              {formatVND(ord.total)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748B' }}>
                            Chưa có đơn hàng nào phát sinh trong ngày này.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="admin-modal-footer">
              <button
                type="button"
                className="btn-secondary-admin"
                onClick={() => setIsDayDetailModalOpen(false)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn-primary-admin"
                onClick={() => {
                  setIsDayDetailModalOpen(false);
                  onNavigateTab('orders');
                }}
              >
                Tới Quản Lý Đơn Hàng →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
