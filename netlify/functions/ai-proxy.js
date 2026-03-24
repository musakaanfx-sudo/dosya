// ai-proxy.js — Gemini 2.0 Flash-Lite
// Anthropic formatındaki istekleri Gemini API'ye çevirir
// App.jsx'te hiçbir değişiklik gerekmez

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "GEMINI_API_KEY eksik" }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Geçersiz JSON" }) };
  }

  // Anthropic formatını Gemini formatına çevir
  const { messages = [], system, max_tokens = 1000 } = body;

  // Gemini içerik listesi oluştur
  const contents = [];

  // Sistem mesajını ilk user mesajının başına ekle
  let systemText = system || "";

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const role = msg.role === "assistant" ? "model" : "user";

    // İçerik: string veya array olabilir (vision için)
    let parts = [];

    if (typeof msg.content === "string") {
      const text = i === 0 && systemText
        ? `${systemText}\n\n${msg.content}`
        : msg.content;
      parts = [{ text }];
    } else if (Array.isArray(msg.content)) {
      for (const block of msg.content) {
        if (block.type === "text") {
          const text = i === 0 && systemText
            ? `${systemText}\n\n${block.text}`
            : block.text;
          parts.push({ text });
        } else if (block.type === "image") {
          // Anthropic base64 görsel → Gemini inline_data
          parts.push({
            inline_data: {
              mime_type: block.source.media_type,
              data: block.source.data,
            },
          });
        }
      }
      // Sistem henüz eklenmemişse ve bu ilk mesajsa
      if (i === 0 && systemText && !parts.some(p => p.text?.startsWith(systemText))) {
        parts = [{ text: systemText }, ...parts];
      }
    }

    contents.push({ role, parts });
  }

  const geminiPayload = {
    contents,
    generationConfig: {
      maxOutputTokens: max_tokens,
      temperature: 0.7,
    },
  };

  const MODEL = "gemini-2.5-flash-lite";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(geminiPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Gemini hata:", JSON.stringify(data));
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: data.error?.message || "Gemini API hatası" }),
      };
    }

    // Gemini → Anthropic formatına çevir
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: [{ type: "text", text }],
        model: MODEL,
        usage: {
          input_tokens: data.usageMetadata?.promptTokenCount || 0,
          output_tokens: data.usageMetadata?.candidatesTokenCount || 0,
        },
      }),
    };
  } catch (err) {
    console.error("ai-proxy hata:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
