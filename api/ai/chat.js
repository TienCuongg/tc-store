// api/ai/chat.js - Vercel Serverless Function for TC SPORT AI Assistant
// Auto-rotates 3 Gemini API keys with failover protection

// Read API keys from Environment Variables on Vercel
const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_KEYS || "";
const GEMINI_KEYS = rawKeys
  .split(",")
  .map(k => k.trim())
  .filter(Boolean);

const CATALOG_SNAPSHOT = `
[1] Nike Air Zoom Pegasus 41 | Nike | Chạy bộ đường dài | 3.590.000đ | Size: 39, 40, 41, 42, 43 | Đệm Air Zoom kép, siêu êm, hoàn trả lực tốt
[2] Adidas Ultraboost Light 2026 | Adidas | Chạy bộ & Daily | 3.990.000đ | Size: 40, 41, 42, 43 | Đệm Light BOOST nhẹ hơn 30%, êm ái bảo vệ khớp
[3] Asics Gel-Kayano 31 | Asics | Chạy bộ bảo vệ cổ chân | 4.190.000đ | Size: 39, 40, 41, 42 | Hệ thống 4D GUIDANCE chống lệch lật cổ chân, đệm PureGEL
[4] Asics Gel-Resolution 9 | Asics | Pickleball & Tennis sân cứng | 3.290.000đ | Size: 40, 41, 42, 43 | Đế AHAR+ chống mòn sân bê tông nhám, đệm GEL êm
[5] Nike Court Air Zoom Vapor Pro 2 | Nike | Pickleball & Tennis | 2.890.000đ | Size: 39, 40, 41, 42 | Trọng lượng nhẹ, đệm Zoom Air mũi chân, bứt tốc nhanh
[6] Lacoste Carnaby Pro Leather | Lacoste | Sneaker Casual | 2.990.000đ | Size: 40, 41, 42 | Da thật cao cấp màu be trắng, thanh lịch dễ phối đồ
[7] Puma Deviate Nitro Elite 3 | Puma | Chạy bộ tốc độ | 3.790.000đ | Size: 40, 41, 42, 43 | Đệm NITRO Elite có đĩa carbon INNOPLATE hỗ trợ bứt tốc
`;

let currentKeyIndex = 0;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message = '', history = [] } = req.body || {};
  const query = String(message).trim();

  if (!query) {
    return res.status(200).json({
      reply: "Chào bạn! Hãy cho mình biết bạn đang tìm giày thể thao loại nào (chạy bộ, pickleball, đi làm...) hoặc cần tư vấn size nhé!",
      suggestedProducts: []
    });
  }

  const systemInstruction = `Bạn là Trợ lý AI chuyên gia tư vấn giày thể thao tại TC SPORT (Việt Nam).
KHO HÀNG THỰC TẾ CỦA SHOP HIỆN TẠI:
${CATALOG_SNAPSHOT}

QUY TẮC CỐT LÕI (BẮT BUỘC TUÂN THỦ ĐỂ TIẾT KIỆM TOKEN):
1. TẬP TRUNG 100% VÀO CÂU HỎI CHÍNH, ĐI THẲNG VÀO TRỌNG TÂM, TUYỆT ĐỐI KHÔNG LAN MAN.
2. KHÔNG chào hỏi dài dòng, không cảm ơn rườm rà.
3. Trả lời từ 2 - 4 câu súc tích: nêu rõ tại sao mẫu giày hoặc size này phù hợp với nhu cầu của khách (công nghệ đế/đệm, bám sân, chân bè/thon, mức giá).
4. CHỈ gợi ý các ID sản phẩm CÓ THỰC trong kho ở trên. Tối đa 1-3 ID sản phẩm phù hợp nhất.
5. LUÔN TRẢ VỀ ĐỊNH DẠNG JSON DUY NHẤT theo schema sau:
{
  "reply": "Lời tư vấn ngắn gọn, chuẩn xác đi thẳng vào trọng tâm câu hỏi...",
  "suggestedProductIds": [1, 4]
}`;

  // Format history for Gemini
  const contents = [];
  if (Array.isArray(history)) {
    for (const h of history.slice(-4)) {
      if (h.text) {
        contents.push({
          role: h.role === 'model' ? 'model' : 'user',
          parts: [{ text: String(h.text) }]
        });
      }
    }
  }
  contents.push({
    role: 'user',
    parts: [{ text: query }]
  });

  const requestBody = {
    system_instruction: {
      parts: [{ text: systemInstruction }]
    },
    contents,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 600,
      responseMimeType: "application/json"
    }
  };

  const totalKeys = GEMINI_KEYS.length;
  let lastError = null;

  for (let attempt = 0; attempt < totalKeys; attempt++) {
    const keyIdx = (currentKeyIndex + attempt) % totalKeys;
    const apiKey = GEMINI_KEYS[keyIdx];
    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`Key ${keyIdx + 1} failed with status ${response.status}:`, errText);
        lastError = new Error(`HTTP ${response.status}: ${errText}`);
        continue; // Try next key
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      let parsed = {};
      try {
        parsed = JSON.parse(rawText);
      } catch (e) {
        parsed = { reply: rawText, suggestedProductIds: [] };
      }

      currentKeyIndex = keyIdx; // Save working key

      // Map suggested product ids to objects
      const productsMap = {
        1: { id: 1, name: "Giày Chạy Bộ Nike Air Zoom Pegasus 41", price: 3590000, brand: "Nike", image: "assets/images/shoe-pegasus-blue.jpg" },
        2: { id: 2, name: "Giày Chạy Bộ Adidas Ultraboost Light 2026", price: 3990000, brand: "Adidas", image: "assets/images/shoe-running-pro.jpg" },
        3: { id: 3, name: "Giày Chạy Bộ Asics Gel-Kayano 31", price: 4190000, brand: "Asics", image: "assets/images/shoe-pickleball-court.jpg" },
        4: { id: 4, name: "Giày Pickleball Asics Gel-Resolution 9 Sân Xi Măng", price: 3290000, brand: "Asics", image: "assets/images/shoe-pickleball-court.jpg" },
        5: { id: 5, name: "Giày Pickleball Nike Court Air Zoom Vapor Pro 2", price: 2890000, brand: "Nike", image: "assets/images/shoe-pegasus-blue.jpg" },
        6: { id: 6, name: "Giày Sneaker Nam Lacoste Carnaby Pro Leather", price: 2990000, brand: "Lacoste", image: "assets/images/shoe-lacoste-white.jpg" },
        7: { id: 7, name: "Giày Chạy Bộ Puma Deviate Nitro Elite 3", price: 3790000, brand: "Puma", image: "assets/images/shoe-puma-fast.jpg" }
      };

      const suggestedProducts = (parsed.suggestedProductIds || [])
        .map(id => productsMap[id])
        .filter(Boolean);

      return res.status(200).json({
        reply: parsed.reply || "Dưới đây là một số mẫu giày phù hợp với bạn:",
        suggestedProducts,
        activeModel: model,
        keyIndexUsed: keyIdx + 1
      });

    } catch (err) {
      console.error(`Attempt ${attempt + 1} with key ${keyIdx + 1} error:`, err);
      lastError = err;
    }
  }

  // Fallback response if all keys fail
  return res.status(200).json({
    reply: "Chào bạn! Hiện tại Trợ lý AI đang có nhiều lượt hỏi cùng lúc. Bạn có thể tham khảo ngay mẫu Nike Pegasus 41 (chạy bộ êm) hoặc Asics Gel-Resolution 9 (pickleball sân bê tông) tại danh mục của shop nhé!",
    suggestedProducts: [
      { id: 1, name: "Giày Chạy Bộ Nike Air Zoom Pegasus 41", price: 3590000, brand: "Nike", image: "assets/images/shoe-pegasus-blue.jpg" },
      { id: 4, name: "Giày Pickleball Asics Gel-Resolution 9 Sân Xi Măng", price: 3290000, brand: "Asics", image: "assets/images/shoe-pickleball-court.jpg" }
    ],
    activeModel: "fallback-catalog"
  });
}
