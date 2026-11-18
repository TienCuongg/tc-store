/**
 * ==============================================================================
 * 🤖 TỆP: src/client/components/Modals/AiAssistantModal.jsx
 * 🎯 CHỨC NĂNG: TRỢ LÝ AI TƯ VẤN GIÀY THÔNG MINH (GEMINI API + LIVE MYSQL DATABASE)
 * ==============================================================================
 * Vị trí: Cố định góc phải màn hình (Sticky Fixed Right), đi theo khi lướt web.
 * Tự động xoay 3 API Keys, prompt tối ưu token, kết nối kho hàng MySQL thời gian thực.
 * ==============================================================================
 */

import React, { useState, useRef, useEffect } from 'react';
import { api } from '../../../services/api';
import { useCart } from '../../../context/CartContext';

export default function AiAssistantModal({ isOpen, onClose, onQuickView, onNavigate }) {
  const { addToCart } = useCart();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Xin chào! Mình là Trợ lý AI chuyên gia thể thao của TC SPORT. Hãy cho mình biết nhu cầu tập luyện, môn thể thao (chạy bộ, pickleball, gym...), dáng bàn chân hoặc mức giá bạn mong muốn nhé!',
      suggestedProducts: []
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Cuộn xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen, messages, isMinimized]);

  if (!isOpen) return null;

  const quickPrompts = [
    { label: '👟 Giày chạy bộ êm < 3tr', prompt: 'Tư vấn giúp mình giày chạy bộ êm chân, tầm giá dưới 3 triệu cho người mới tập.' },
    { label: '🎾 Giày Pickleball sân xi măng', prompt: 'Mình cần giày chơi Pickleball bám sân bê tông ngoài trời, chống lật cổ chân.' },
    { label: '📏 Chân bè 25.5cm chọn size nào?', prompt: 'Chân mình dài 25.5cm và mu bàn chân hơi bè dày, nên chọn mẫu nào và size bao nhiêu?' },
    { label: '✨ Sneaker màu be phối đồ', prompt: 'Gợi ý đôi sneaker vintage màu be dễ phối đồ đi làm và dạo phố.' }
  ];

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      // Chuẩn bị lịch sử hội thoại gần nhất (tối đa 4 tin nhắn để tiết kiệm token)
      const history = messages.slice(-4).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await api.ai.chat(query, history);

      let replyText = res.reply || 'Dưới đây là một số gợi ý giày phù hợp nhất với bạn:';
      if (typeof replyText === 'string' && replyText.trim().startsWith('{') && replyText.includes('"reply"')) {
        try {
          const parsed = JSON.parse(replyText);
          if (parsed.reply) replyText = parsed.reply;
        } catch (e) {
          const m = replyText.match(/"reply"\s*:\s*"([\s\S]*?)"/);
          if (m) replyText = m[1].replace(/\\"/g, '"').replace(/\\n/g, '\n');
        }
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        suggestedProducts: res.suggestedProducts || [],
        activeModel: res.activeModel,
        keyIndexUsed: res.keyIndexUsed
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Lỗi gọi Gemini AI:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'Xin lỗi bạn, kết nối tới dịch vụ AI tạm thời bị gián đoạn. Bạn có thể thử lại ngay bây giờ hoặc xem danh mục sản phẩm của shop nhé!',
          suggestedProducts: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // NẾU ĐANG THU NHỎ (MINIMIZED PILL WIDGET GÓC PHẢI)
  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '76px',
          zIndex: 3050,
          background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
          color: '#FFFFFF',
          padding: '10px 16px',
          borderRadius: '999px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          border: '1.5px solid var(--color-terracotta)',
          transition: 'transform 0.2s',
          animation: 'aiChatSlideUp 0.2s ease'
        }}
        title="Bấm để mở rộng khung chat AI"
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #C2410C 0%, #EA580C 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="#FFFFFF">
            <path d="M12 2L14.4 7.6L20 8.4L16 12.3L17 18L12 15.2L7 18L8 12.3L4 8.4L9.6 7.6L12 2Z" />
          </svg>
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF' }}>
          Trợ Lý AI TC SPORT
        </span>
        <span style={{ fontSize: '0.72rem', background: '#10B981', color: '#FFF', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
          LIVE
        </span>
      </div>
    );
  }

  // CỬA SỔ CHAT HOÀN CHỈNH - CỐ ĐỊNH PHẢI MÀN HÌNH (STICKY RIGHT)
  return (
    <div className="ai-floating-chat-container">
      {/* 1. HEADER CHAT */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
          color: '#FFFFFF',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid var(--color-terracotta)',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C2410C 0%, #EA580C 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(234, 88, 12, 0.6)',
              flexShrink: 0
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#FFFFFF">
              <path d="M12 2L14.4 7.6L20 8.4L16 12.3L17 18L12 15.2L7 18L8 12.3L4 8.4L9.6 7.6L12 2Z" />
            </svg>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h3 style={{ margin: 0, fontSize: '0.92rem', fontWeight: 800, color: '#FFF', letterSpacing: '0.2px' }}>
                TC SPORT AI
              </h3>
              <span
                style={{
                  background: '#10B981',
                  color: '#FFF',
                  fontSize: '0.58rem',
                  fontWeight: 800,
                  padding: '1px 5px',
                  borderRadius: '999px',
                  textTransform: 'uppercase'
                }}
              >
                LIVE
              </span>
            </div>
            <p style={{ margin: '1px 0 0', fontSize: '0.7rem', color: '#D6D3D1' }}>
              Tư vấn giày từ kho MySQL trực tiếp
            </p>
          </div>
        </div>

        {/* NÚT THAO TÁC: THU NHỎ & ĐÓNG */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              color: '#FFF',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s'
            }}
            title="Thu nhỏ khung chat"
          >
            −
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              color: '#FFF',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s'
            }}
            title="Đóng cửa sổ chat"
          >
            ✕
          </button>
        </div>
      </div>

      {/* 2. KHU VỰC NỘI DUNG TIN NHẮN */}
      <div
        style={{
          flex: 1,
          padding: '14px 14px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: '#F9F6F0'
        }}
      >
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isAi ? 'flex-start' : 'flex-end',
                maxWidth: '100%'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start',
                  maxWidth: '90%'
                }}
              >
                {isAi && (
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: '#C2410C',
                      color: '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 900,
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    AI
                  </div>
                )}

                <div
                  style={{
                    background: isAi ? '#FFFFFF' : 'var(--color-terracotta)',
                    color: isAi ? '#1F2937' : '#FFFFFF',
                    padding: '10px 14px',
                    borderRadius: isAi ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                    fontSize: '0.84rem',
                    lineHeight: 1.5,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    border: isAi ? '1px solid #E5E7EB' : 'none',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {msg.text}
                </div>
              </div>

              {/* SẢN PHẨM GỢI Ý ĐÍNH KÈM CỦA AI */}
              {isAi && msg.suggestedProducts && msg.suggestedProducts.length > 0 && (
                <div
                  style={{
                    marginTop: '8px',
                    marginLeft: '34px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    width: 'calc(100% - 34px)',
                    maxWidth: '340px'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-terracotta)', textTransform: 'uppercase' }}>
                    👟 Gợi ý giày có sẵn trong kho:
                  </div>

                  {msg.suggestedProducts.map((p) => (
                    <div
                      key={p.id}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '8px',
                        padding: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                      }}
                    >
                      <img
                        src={p.image?.startsWith('http') || p.image?.startsWith('/') ? p.image : `/${p.image}`}
                        alt={p.name}
                        style={{
                          width: '52px',
                          height: '52px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          background: '#F3F4F6',
                          flexShrink: 0
                        }}
                      />

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: '0.64rem', color: '#6B7280', fontWeight: 700, textTransform: 'uppercase' }}>
                          {p.brand} • {p.category}
                        </span>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            color: '#111827',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {p.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 900, color: 'var(--color-terracotta)' }}>
                            {p.price?.toLocaleString('vi-VN')}₫
                          </span>
                          {p.discount && (
                            <span style={{ fontSize: '0.65rem', color: '#DC2626', fontWeight: 700 }}>
                              {p.discount}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (onQuickView) onQuickView(p);
                        }}
                        style={{
                          background: 'var(--color-terracotta)',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          flexShrink: 0
                        }}
                      >
                        Xem
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '6px' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: '#C2410C',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 900
              }}
            >
              AI
            </div>
            <div
              style={{
                background: '#FFFFFF',
                padding: '8px 12px',
                borderRadius: '4px 14px 14px 14px',
                fontSize: '0.78rem',
                color: '#6B7280',
                border: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>TC SPORT AI đang kiểm tra kho...</span>
              <span>⏳</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. PROMPT CHIPS GỢI Ý NHANH */}
      <div
        style={{
          padding: '6px 10px',
          background: '#FFFFFF',
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(qp.prompt)}
            disabled={loading}
            style={{
              background: '#FAF7F2',
              border: '1px solid #E5E7EB',
              borderRadius: '999px',
              padding: '3px 10px',
              fontSize: '0.7rem',
              color: '#4B5563',
              fontWeight: 600,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-terracotta)';
              e.currentTarget.style.color = 'var(--color-terracotta)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.color = '#4B5563';
            }}
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* 4. KHUNG NHẬP LIỆU CHAT */}
      <div
        style={{
          padding: '10px 12px',
          background: '#FFFFFF',
          borderTop: '1px solid #F3F4F6',
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hỏi AI về giày chạy bộ, size, độ êm..."
          disabled={loading}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: '20px',
            border: '1px solid #D1D5DB',
            fontSize: '0.82rem',
            outline: 'none',
            background: '#F9FAFB'
          }}
        />

        <button
          type="button"
          onClick={() => handleSendMessage()}
          disabled={loading || !inputText.trim()}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: loading || !inputText.trim() ? '#D1D5DB' : 'var(--color-terracotta)',
            color: '#FFFFFF',
            border: 'none',
            cursor: loading || !inputText.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s'
          }}
          title="Gửi câu hỏi"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
