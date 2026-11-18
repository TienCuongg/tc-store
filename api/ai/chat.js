// api/ai/chat.js - Vercel Serverless Function for TC SPORT AI Assistant
// Auto-rotates Gemini API keys with failover protection and multi-model support

function getGeminiKeys() {
  const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_KEYS || "";
  return rawKeys
    .replace(/['"]+/g, '') // remove quotes if any
    .split(/[,;\n]+/)
    .map(k => k.trim())
    .filter(Boolean);
}

// Danh mục kho hàng thực tế đầy đủ 36 sản phẩm của TC SPORT
const ALL_STORE_PRODUCTS = {
  1: { id: 1, name: "Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương", price: 2390000, brand: "Nike", category: "running", image: "assets/images/shoe-pegasus-blue.jpg" },
  2: { id: 2, name: "Giày Air Jordan 1 Retro High OG - Đỏ Chicago", price: 4690000, brand: "Jordan", category: "basketball", image: "assets/images/shoe-retro-high.jpg" },
  3: { id: 3, name: "Giày Nike Free Metcon 5 - Đen Vàng Volt Gym", price: 3190000, brand: "Nike", category: "training", image: "assets/images/shoe-metcon-volt.jpg" },
  4: { id: 4, name: "Giày Tennis Pickleball TC Apex Pro - Xanh Hoàng Gia", price: 2490000, brand: "TC Sport", category: "pickleball", image: "assets/images/shoe-pickleball-pro.jpg" },
  5: { id: 5, name: "Giày Asics Gel-Nimbus 25 - Xanh Bạc Kim", price: 3650000, brand: "Asics", category: "running", image: "assets/images/shoe-asics-runner.jpg" },
  6: { id: 6, name: "Giày Nike Air Zoom Pegasus 41 Nữ - Trắng Xanh", price: 2190000, brand: "Nike", category: "running", image: "assets/images/shoe-running-pro.jpg" },
  7: { id: 7, name: "Giày Nike Air Zoom Pegasus 40 Nam - Xanh Dương", price: 2390000, brand: "Nike", category: "running", image: "assets/images/shoe-pegasus-blue.jpg" },
  8: { id: 8, name: "Giày Marathon TC Velocity-X Pro Carbon - Đen Đỏ", price: 2390000, brand: "TC Sport", category: "running", image: "assets/images/hero-sneaker.jpg" },
  9: { id: 9, name: "Giày Sneaker TC Retro Sand Classic - Be Cát", price: 1690000, brand: "TC Sport", category: "lifestyle", image: "assets/images/shoe-beige-retro.jpg" },
  10: { id: 10, name: "Giày Nike Air Max Bella TR 5 Nữ - Đen Hồng", price: 1290000, brand: "Nike", category: "training", image: "assets/images/shoe-metcon-volt.jpg" },
  11: { id: 11, name: "Giày Chạy Bộ Nike ZoomX Vaporfly Next% 3 - Trắng Xanh", price: 4950000, brand: "Nike", category: "running", image: "assets/images/shoe-running-pro.jpg" },
  12: { id: 12, name: "Giày Adidas Ultraboost Light 23 - Trắng Kem Be", price: 3390000, brand: "Adidas", category: "running", image: "assets/images/shoe-beige-retro.jpg" },
  13: { id: 13, name: "Giày Tennis/Pickleball Asics Solution Speed FF 3", price: 2890000, brand: "Asics", category: "pickleball", image: "assets/images/shoe-asics-runner.jpg" },
  14: { id: 14, name: "Giày Lacoste Carnaby Pro Leather - Trắng Viền Đen", price: 2790000, brand: "Lacoste", category: "lifestyle", image: "assets/images/hero-sneaker.jpg" },
  15: { id: 15, name: "Giày Puma Deviate Nitro 2 Carbon - Xanh Đen Volt", price: 2990000, brand: "Puma", category: "running", image: "assets/images/shoe-metcon-volt.jpg" },
  16: { id: 16, name: "Giày Chạy Bộ Nam Asics Novablast 4 - Xám Bạc", price: 2490000, brand: "Asics", category: "running", image: "assets/images/shoe-asics-runner.jpg" },
  17: { id: 17, name: "Giày Pickleball Pro Court - Trắng Xanh Hoàng Gia", price: 1850000, brand: "TC Sport", category: "pickleball", image: "assets/images/shoe-pickleball-pro.jpg" },
  18: { id: 18, name: "Giày Nike Air Jordan 1 Low OG - Xám Tro Shadow", price: 3290000, brand: "Jordan", category: "lifestyle", image: "assets/images/shoe-retro-high.jpg" },
  19: { id: 19, name: "Giày Thể Thao Lacoste T-Clip Leather - Trắng Be", price: 2450000, brand: "Lacoste", category: "lifestyle", image: "assets/images/hero-beige-sneakers.jpg" },
  20: { id: 20, name: "Giày Chạy Bộ Nike Air Zoom Structure 25 - Đen Trắng", price: 2150000, brand: "Nike", category: "running", image: "assets/images/shoe-pegasus-blue.jpg" },
  21: { id: 21, name: "Giày Sneaker Adidas Samba OG - Trắng Sọc Đen Gum", price: 2790000, brand: "Adidas", category: "lifestyle", image: "assets/images/hero-beige-sneakers.jpg" },
  22: { id: 22, name: "Giày Chạy Bộ Adidas Adizero Adios Pro 3 - Cam Neon", price: 4890000, brand: "Adidas", category: "running", image: "assets/images/shoe-running-pro.jpg" },
  23: { id: 23, name: "Giày Tennis/Pickleball Adidas Barricade 13 - Trắng Xanh", price: 3150000, brand: "Adidas", category: "pickleball", image: "assets/images/shoe-pickleball-pro.jpg" },
  24: { id: 24, name: "Giày Sneaker Adidas Stan Smith Lux - Trắng Viền Xanh Lá", price: 2690000, brand: "Adidas", category: "lifestyle", image: "assets/images/hero-sneaker.jpg" },
  25: { id: 25, name: "Giày Tập Gym Nam Adidas Dropset 2 - Đen Xám", price: 2490000, brand: "Adidas", category: "training", image: "assets/images/shoe-metcon-volt.jpg" },
  26: { id: 26, name: "Giày Chạy Bộ Asics Gel-Kayano 30 - Xanh Dương Gradient", price: 3890000, brand: "Asics", category: "running", image: "assets/images/shoe-asics-runner.jpg" },
  27: { id: 27, name: "Giày Tennis/Pickleball Asics Court FF 3 Novak - Đỏ Trắng", price: 3950000, brand: "Asics", category: "pickleball", image: "assets/images/shoe-pickleball-pro.jpg" },
  28: { id: 28, name: "Giày Sneaker Puma Suede Classic XXI - Đen Trắng", price: 1890000, brand: "Puma", category: "lifestyle", image: "assets/images/shoe-metcon-volt.jpg" },
  29: { id: 29, name: "Giày Bóng Rổ Puma Court Rider Chaos - Xanh Neon Đỏ", price: 2290000, brand: "Puma", category: "basketball", image: "assets/images/shoe-retro-high.jpg" },
  30: { id: 30, name: "Giày Chạy Bộ Puma Velocity Nitro 3 - Cam Lửa", price: 2590000, brand: "Puma", category: "running", image: "assets/images/shoe-running-pro.jpg" },
  31: { id: 31, name: "Giày Thể Thao Lacoste Lineshot Court - Trắng Xanh Rêu", price: 3250000, brand: "Lacoste", category: "lifestyle", image: "assets/images/hero-beige-sneakers.jpg" },
  32: { id: 32, name: "Giày Tennis/Pickleball Lacoste AG-LT23 Ultra - Trắng Đỏ", price: 3890000, brand: "Lacoste", category: "pickleball", image: "assets/images/shoe-pickleball-pro.jpg" },
  33: { id: 33, name: "Giày Bóng Rổ Jordan Luka 2 - Trắng Tím Độc Bản", price: 3590000, brand: "Jordan", category: "basketball", image: "assets/images/shoe-retro-high.jpg" },
  34: { id: 34, name: "Giày Chạy Bộ Nike InfinityRN 4 - Xanh Pastel", price: 2990000, brand: "Nike", category: "running", image: "assets/images/shoe-running-pro.jpg" },
  35: { id: 35, name: "Giày Tập Gym Nữ Nike Metcon 9 - Trắng Hồng Rose", price: 3290000, brand: "Nike", category: "training", image: "assets/images/shoe-metcon-volt.jpg" },
  36: { id: 36, name: "Giày Chạy Bộ TC Sport Storm Runner 2.0 - Đen Xanh", price: 1590000, brand: "TC Sport", category: "running", image: "assets/images/shoe-asics-runner.jpg" }
};

const CATALOG_SNAPSHOT = Object.values(ALL_STORE_PRODUCTS)
  .map(p => `[${p.id}] ${p.name} | ${p.brand} | ${p.category} | ${p.price.toLocaleString('vi-VN')}đ | Size: 39, 40, 41, 42, 43`)
  .join('\n');

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

  const systemInstruction = `Bạn là Trợ lý AI tư vấn giày thể thao am hiểu, nhiệt tình và thân thiện của hệ thống TC SPORT (Việt Nam).
KHO HÀNG THỰC TẾ ĐẦY ĐỦ CỦA SHOP HIỆN TẠI (36 SẢN PHẨM):
${CATALOG_SNAPSHOT}

PHONG CÁCH TƯ VẤN & QUY TẮC (BẮT BUỘC):
1. GIỌNG ĐIỆU TỰ NHIÊN, THÂN THIỆN: Nói chuyện như một chuyên gia tư vấn thể thao có tâm, chu đáo, hiểu tâm lý khách hàng (tuyệt đối không trả lời máy móc, khô cứng hay khuôn mẫu).
2. PHÂN TÍCH CHUYÊN SÂU THEO ĐÚNG NHU CẦU:
   - Với giày chạy bộ: phân tích độ êm, bảo vệ khớp gối, đệm bọt, trọng lượng, cự ly (5km, 10km, marathon).
   - Với giày Pickleball/Tennis: phân tích độ bám sân bê tông ngoài trời, độ mài mòn của đế, công nghệ chống lật cổ chân khi đổi hướng gấp.
   - Với chân bè/thon: gợi ý dòng form rộng, thoải mái hoặc nâng nửa size.
3. GỢI Ý ĐẦY ĐỦ VÀ ĐA DẠNG: Luôn gợi ý ĐẦY ĐỦ từ 3 ĐẾN 6 SẢN PHẨM phù hợp nhất từ nhiều thương hiệu khác nhau (Nike, Adidas, Asics, Puma, TC Sport) để khách hàng dễ dàng so sánh phân khúc giá.
4. CHỈ gợi ý các ID sản phẩm CÓ THỰC trong kho ở trên.
5. LUÔN TRẢ VỀ ĐỊNH DẠNG JSON DUY NHẤT theo schema sau:
{
  "reply": "Nội dung tư vấn chi tiết, tự nhiên, phân tích sâu từng mẫu giày nổi bật và đưa ra lời khuyên chân thành cho khách...",
  "suggestedProductIds": [id1, id2, id3, id4, id5]
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
      temperature: 0.35,
      maxOutputTokens: 800,
      responseMimeType: "application/json"
    }
  };

  const candidateModels = [
    process.env.GEMINI_MODEL,
    "gemini-3.5-flash-lite",
    "gemini-3.8-flash",
    "gemini-flash-latest"
  ].filter(Boolean);

  const geminiKeys = getGeminiKeys();
  const totalKeys = geminiKeys.length;
  let lastError = null;

  if (totalKeys > 0) {
    for (const model of candidateModels) {
      for (let attempt = 0; attempt < totalKeys; attempt++) {
        const keyIdx = (currentKeyIndex + attempt) % totalKeys;
        const apiKey = geminiKeys[keyIdx];
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
          });

          if (!response.ok) {
            const errText = await response.text();
            console.warn(`Model ${model} with Key ${keyIdx + 1} failed (${response.status}):`, errText);
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

          const suggestedProducts = (parsed.suggestedProductIds || [])
            .map(id => ALL_STORE_PRODUCTS[id])
            .filter(Boolean);

          return res.status(200).json({
            reply: parsed.reply || "Dưới đây là danh sách đầy đủ các mẫu giày phù hợp nhất với nhu cầu của bạn:",
            suggestedProducts,
            activeModel: model,
            keyIndexUsed: keyIdx + 1
          });

        } catch (err) {
          console.error(`Model ${model} Key ${keyIdx + 1} error:`, err);
          lastError = err;
        }
      }
    }
  }

  // Fallback response if all keys or models fail
  return res.status(200).json({
    reply: "Chào bạn! TC SPORT xin gợi ý bộ sưu tập các mẫu giày bán chạy và được ưa chuộng nhất trong kho hiện tại:",
    suggestedProducts: [
      ALL_STORE_PRODUCTS[1],
      ALL_STORE_PRODUCTS[16],
      ALL_STORE_PRODUCTS[4],
      ALL_STORE_PRODUCTS[12],
      ALL_STORE_PRODUCTS[30]
    ],
    activeModel: "fallback-catalog"
  });
}
