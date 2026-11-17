/**
 * =========================================================================================
 * 📁 TỆP: src/pages/BlogPage.jsx
 * 🎯 CHỨC NĂNG: TRANG BẢNG TIN THỂ THAO & CẨM NANG CHỌN GIÀY (TC FEED & SPORT BLOG)
 * =========================================================================================
 * 
 * 📌 VỊ TRÍ TRÊN GIAO DIỆN:
 *    - Hiển thị khi người dùng ấn vào "Bảng Tin Thể Thao" trên thanh Menu
 *      hoặc ấn vào "TC FEED" từ trang chủ.
 * 
 * 📌 CÁC KHỐI CHỨC NĂNG:
 *    1. LƯỚI BÀI VIẾT 3 CỘT (Articles Grid):
 *       - Hiển thị ảnh bìa, chuyên mục (Kỹ thuật, Đánh giá, Xu hướng), tiêu đề, tóm tắt,
 *         tác giả và ngày đăng.
 *    2. MODAL ĐỌC BÀI VIẾT CHI TIẾT (Article Reading Modal):
 *       - Mở popup xem toàn bộ nội dung bài viết khi click vào thẻ bài bất kỳ.
 *       - Nút ✕ hoặc click ra ngoài để đóng bài đọc.
 * 
 * 📌 ĐIỂM KẾT NỐI BACKEND (SPRING BOOT / NODE.JS REST API):
 *    - GET /api/v1/posts (Lấy danh sách bài viết)
 *    - GET /api/v1/posts/{id} (Lấy nội dung chi tiết bài viết)
 * =========================================================================================
 */

import React, { useState, useEffect } from 'react';

export default function BlogPage({ onNavigate, initialArticleSlug }) {
  // Danh sách bài viết mẫu về kiến thức thể thao với slug chuẩn SEO
  const articles = [
    {
      id: 1,
      slug: 'bai_viet1-cach-chon-giay-pickleball-dung-chuan-san-cung',
      shortSlug: 'bai_viet1',
      title: 'Cách Chọn Giày Pickleball Đúng Chuẩn Sân Cứng & Bảo Vệ Khớp Cổ Chân',
      category: 'KỸ THUẬT & TRANG THIẾT BỊ',
      date: '20/10/2026',
      author: 'Ban Thể Thao TC SPORT',
      image: '/assets/images/blog-tennis-court.jpg',
      summary: 'Khám phá bí quyết chọn độ bám đế herringbone, công nghệ chống lật cổ chân và đệm gót phù hợp với cường độ thi đấu Pickleball hiện đại.',
      content: `Pickleball là bộ môn thể thao có tốc độ tăng trưởng nhanh nhất trong 3 năm qua tại Việt Nam. Đặc trưng của bộ môn này là các pha di chuyển ngang bứt tốc đột ngột, phanh gấp và xoay người cứu bóng ở khu vực "Kitchen".

1. ĐẾ GIÀY CHUYÊN DỤNG (HERRINGBONE / ALL COURT)
Không nên sử dụng giày chạy bộ thông thường để chơi Pickleball vì gót giày chạy cao sẽ dễ gây lật sơ mi cổ chân. Bạn cần giày có đế cao su bền chống mài mòn, vân xương cá (Herringbone) bám chắc mặt sân xi măng và sơn acrylic.

2. CÔNG NGHỆ BẢO VỆ CHỐNG LẬT CỔ CHÂN
Các mẫu giày như Asics Solution Speed, TC Apex Pro hay Adidas Barricade đều được trang bị khung Torsion / Twisstruss chống xoắn giữa bàn chân, hạn chế tối đa chấn thương dây chằng.`
    },
    {
      id: 2,
      slug: 'bai_viet2-so-sanh-nike-pegasus-41-vs-adidas-ultraboost-light',
      shortSlug: 'bai_viet2',
      title: 'So Sánh Nike Pegasus 41 vs Adidas Ultraboost Light: Đâu Là Vua Êm Ái?',
      category: 'ĐÁNH GIÁ CHUYÊN SÂU',
      date: '18/10/2026',
      author: 'HLV Điền Kinh Hoàng Nam',
      image: '/assets/images/blog-womens-gift.jpg',
      summary: 'Thử nghiệm thực tế 100km trên đường chạy và máy tập để tìm ra đôi giày chạy bộ đáng sở hữu nhất cho người mới bắt đầu.',
      content: `Khi nhắc đến giày chạy bộ hàng ngày (Daily Trainer), Nike Pegasus và Adidas Ultraboost luôn là hai cái tên đứng đầu danh sách cân nhắc.

1. BỌT ĐỆM: REACTX VS BOOST LIGHT
- Nike Pegasus 41 sử dụng bọt ReactX mới, phản hồi năng lượng tốt hơn 13% so với Pegasus 40, cảm giác tiếp đất nảy và thanh thoát.
- Adidas Ultraboost Light giảm trọng lượng 30% so với thế hệ trước, mang lại độ êm ái đầm chắc, thích hợp cho người chạy cự ly dài hoặc mang đi bộ hàng ngày.`
    },
    {
      id: 3,
      slug: 'bai_viet3-5-doi-giay-sneaker-mau-be-thanh-lich-de-phoi-do',
      shortSlug: 'bai_viet3',
      title: '5 Đôi Giày Sneaker Màu Be Thanh Lịch Dễ Phối Đồ Nhất Mùa Thu Đông 2026',
      category: 'PHONG CÁCH & XU HƯỚNG',
      date: '15/10/2026',
      author: 'Fashion Editor TCStyle',
      image: '/assets/images/hero-beige-sneakers.jpg',
      summary: 'Gợi ý những mẫu giày màu be vintage, da lộn êm ái vừa vặn cho cả trang phục công sở lẫn dạo phố cuối tuần.',
      content: `Tông màu be cát (Warm Sand) và kem sữa đang là xu hướng thống trị thời trang sneaker năm nay. Với ưu điểm dễ phối cùng quần âu, jeans hay short kaki, một đôi sneaker be giúp bạn nâng tầm phong cách mà không cần cầu kỳ.`
    }
  ];

  // Hàm đối chiếu tìm bài viết theo slug đầy đủ, shortSlug (bai_viet1), id hoặc alias
  const findArticle = (slugOrId) => {
    if (!slugOrId) return null;
    const clean = String(slugOrId).toLowerCase().trim();
    return articles.find(a => 
      a.slug === clean || 
      a.shortSlug === clean || 
      String(a.id) === clean ||
      clean.startsWith(`bai_viet${a.id}`) ||
      clean.startsWith(`bai-viet-${a.id}`) ||
      clean.startsWith(`bai_viet_${a.id}`) ||
      clean.includes(`bai_viet${a.id}`)
    ) || null;
  };

  // State bài viết đang mở đọc chi tiết (khởi tạo ngay từ URL nếu có)
  const [selectedArticle, setSelectedArticle] = useState(() => findArticle(initialArticleSlug));
  const [copiedLink, setCopiedLink] = useState(false);

  // Đồng bộ khi URL thay đổi (Back / Forward trình duyệt)
  useEffect(() => {
    if (initialArticleSlug) {
      const art = findArticle(initialArticleSlug);
      if (art) {
        setSelectedArticle(art);
      }
    } else {
      setSelectedArticle(null);
    }
  }, [initialArticleSlug]);

  // Mở bài viết & đẩy Clean URL lên thanh địa chỉ trình duyệt
  const handleOpenArticle = (art) => {
    setSelectedArticle(art);
    if (onNavigate) {
      onNavigate('blog', { article: art.slug });
    }
  };

  // Đóng bài viết & trả URL về /blog
  const handleCloseArticle = () => {
    setSelectedArticle(null);
    if (onNavigate) {
      onNavigate('blog');
    }
  };

  // Sao chép link bài viết chia sẻ
  const handleCopyLink = () => {
    if (!selectedArticle) return;
    const shareUrl = `${window.location.origin}/blog/${selectedArticle.slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  return (
    <main className="page-wrapper-main">
      <div className="container">
        {/* Đường dẫn trang (Breadcrumb) */}
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
            style={{ color: 'var(--text-muted)', textDecoration: 'none' }}
          >
            Trang chủ
          </a>
          {' › '}
          <b style={{ color: 'var(--color-espresso)' }}>Bảng Tin Thể Thao & Xu Hướng TC Feed</b>
        </div>

        {/* Tiêu đề trang Blog */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--color-espresso)', marginBottom: '8px' }}>
            BẢNG TIN THỂ THAO & CẨM NANG CHỌN GIÀY
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Cập nhật kiến thức chuyên sâu về công nghệ giày, bí quyết luyện tập và xu hướng thể thao mới nhất.
          </p>
        </div>

        {/* ========================================================= */}
        {/* KHỐI 1: LƯỚI BÀI VIẾT 3 CỘT (BLOG ARTICLES GRID)           */}
        {/* ========================================================= */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => handleOpenArticle(art)}
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--bg-cream-border)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <img src={art.image} alt={art.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-terracotta)', fontWeight: 800 }}>{art.category}</span>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, margin: '8px 0', lineHeight: 1.4, color: 'var(--text-main)' }}>
                  <a
                    href={`/blog/${art.slug}`}
                    onClick={(e) => { e.preventDefault(); handleOpenArticle(art); }}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {art.title}
                  </a>
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px', flex: 1 }}>
                  {art.summary}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9CA3AF', borderTop: '1px solid #F3F4F6', paddingTop: '10px' }}>
                  <span>✍️ {art.author}</span>
                  <span>📅 {art.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ========================================================= */}
        {/* KHỐI 2: POPUP ĐỌC NỘI DUNG BÀI VIẾT (READING MODAL)       */}
        {/* ========================================================= */}
        {selectedArticle && (
          <div className="modal-backdrop-generic active" onClick={handleCloseArticle}>
            <div className="size-guide-dialog" style={{ maxWidth: '720px', padding: '24px' }} onClick={(e) => e.stopPropagation()}>
              <button type="button" className="btn-close-modal" onClick={handleCloseArticle}>
                ✕
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-terracotta)', fontWeight: 800, textTransform: 'uppercase' }}>
                  {selectedArticle.category}
                </span>

                {/* Thanh hiển thị URL chuẩn SEO & nút chia sẻ */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#6B7280', background: '#F3F4F6', padding: '3px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                    /blog/{selectedArticle.slug.substring(0, 32)}...
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    style={{
                      border: '1px solid #D1D5DB',
                      background: copiedLink ? '#10B981' : '#FFFFFF',
                      color: copiedLink ? '#FFFFFF' : '#374151',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    title="Sao chép liên kết bài viết chuẩn SEO"
                  >
                    {copiedLink ? '✓ Đã chép link' : '🔗 Chép link'}
                  </button>
                </div>
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, margin: '8px 0 12px', lineHeight: 1.35, color: 'var(--color-espresso)' }}>
                {selectedArticle.title}
              </h2>

              <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: '#9CA3AF', marginBottom: '16px' }}>
                <span>✍️ {selectedArticle.author}</span>
                <span>📅 {selectedArticle.date}</span>
              </div>

              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
              />

              <div style={{ whiteSpace: 'pre-line', fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--text-main)' }}>
                {selectedArticle.content}
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={handleCloseArticle}
                  style={{
                    background: 'var(--color-terracotta)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: '6px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Đóng Bài Viết
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
