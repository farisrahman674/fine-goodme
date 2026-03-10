import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getAIProductContext } from "@/lib/aiProducts";
import { ruleBasedAnswer } from "@/lib/ruleBasedAnswer";
import { log } from "console";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});
function cleanReply(text: string) {
  let reply = text || "";

  reply = reply.replace(/\*\*/g, "");
  reply = reply.replace(/^\*\s/gm, "");
  reply = reply.replace(/\*/g, "");
  reply = reply.replace(/^#{1,6}\s*/gm, "");
  reply = reply.replace(/---/g, "");
  reply = reply.replace(/•/g, "\n•");

  reply = reply.replace(/Spesifikasi:/g, "\nSpesifikasi:");
  reply = reply.replace(/Kapasitas:/g, "\nKapasitas:");
  reply = reply.replace(/Fitur:/g, "\nFitur:");

  reply = reply.replace(/\n{2,}/g, "\n\n");

  return reply.trim();
}

export async function POST(req: Request) {
  const { message, locale, history = [] } = await req.json();
  try {
    const rule = ruleBasedAnswer(message, locale);

    if (rule) {
      return NextResponse.json({
        ...rule,
        reply: cleanReply(rule.reply),
      });
    }

    // =============================
    // LIMIT HISTORY (3 TERAKHIR)
    // =============================
    const recentHistory = history.slice(-3);

    // =============================
    // PRODUCT CONTEXT
    // =============================
    const products = getAIProductContext();

    const prompt = `
Kamu adalah AI assistant untuk BCTI.

Aturan penting:
- Gunakan hanya model mesin yang ada di data produk.
- Jangan membuat model baru.
- Jika tidak ada produk yang cocok, katakan dengan jujur.

Tugas kamu:
1. Memahami kebutuhan bisnis customer
2. Merekomendasikan 3 mesin yang paling cocok
3. Menjelaskan spesifikasi utama dengan ringkas dan jelas
4. Jika customer ingin membeli, arahkan ke WhatsApp sales "082118143155"

Jawab menggunakan bahasa yang sama dengan bahasa pertanyaan customer.

Data produk:
${JSON.stringify(products)}
`;

    // =============================
    // FORMAT HISTORY UNTUK GEMINI
    // =============================
    const formattedHistory = recentHistory.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
      ...formattedHistory,
      {
        role: "user",
        parts: [{ text: message.slice(0, 500) }],
      },
    ];

    const result = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents,
    });

    let reply = cleanReply(result.text || "");

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    const errorMessage = {
      id: `Mohon maaf, chat AI sedang sibuk. Silakan hubungi WhatsApp kami di 082118143155. Terima kasih.`,
      en: `Sorry, the AI chat is currently busy. Please contact our WhatsApp at 082118143155. Thank you.`,
    };

    return NextResponse.json({
      reply: locale === "en" ? errorMessage.en : errorMessage.id,
    });
  }
}
