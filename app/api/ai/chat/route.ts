import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAIProductContext } from "@/lib/aiProducts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const products = getAIProductContext();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const prompt = `
Kamu adalah AI assistant untuk BCTI.

Tugas kamu:
- membantu customer memilih mesin
- menjelaskan spesifikasi
- memberi rekomendasi mesin sesuai kebutuhan bisnis

Data produk:

${JSON.stringify(products)}

Pertanyaan customer:
${message}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      reply: text,
    });
  } catch (error) {
    console.error("Gemini error:", error);

    return NextResponse.json({
      reply: "AI sedang mengalami error.",
    });
  }
}
