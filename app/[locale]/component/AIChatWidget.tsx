"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Lottie from "lottie-react";
import typingAnim from "@/src/lottie/Loading.json";
import aiAnim from "@/src/lottie/Ai Stars.json";
type Props = {
  phone: string;
  onClose: () => void;
};

export default function AIChatWidget({ phone, onClose }: Props) {
  const params = useParams();
  const locale = params.locale;
  const [loading, setLoading] = useState(false);
  const welcomeMessage = {
    id: "Halo! Saya AI assistant BCTI 👋\nSaya bisa membantu rekomendasi mesin untuk bisnis Anda.",
    en: "Hello! I'm the BCTI AI assistant 👋\nI can help recommend machines for your business.",
  };
  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      content: locale === "en" ? welcomeMessage.en : welcomeMessage.id,
    },
  ]);

  const [input, setInput] = useState("");

  async function sendMessage() {
    if (!input.trim()) return;
    const messageText = input; // simpan dulu
    setInput("");
    const newMessages = [...messages, { role: "user", content: messageText }];
    setMessages(newMessages);
    setLoading(true);

    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
        history: newMessages,
        locale,
      }),
    });

    const data = await res.json();
    setLoading(false);

    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  }

  const waLink = `https://wa.me/${phone}`;

  return (
    <div className="fixed bottom-24 right-3 sm:right-6 w-80 sm:w-96 h-96 sm:h-125 bg-white rounded-3xl shadow-2xl overflow-hidden border z-50 flex flex-col">
      {/* HEADER */}
      <div className="bg-linear-to-b from-blue-400 to-blue-300 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full  flex items-center justify-center text-xl">
            <Lottie animationData={aiAnim} loop />
          </div>

          <div>
            <h3 className="font-semibold text-shadow:0_1px_2px_rgba(0,0,0,0.9)">
              BCTI AI
            </h3>
            <p className="text-xs text-green-300">● Online</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-xl opacity-80 hover:cursor-pointer"
        >
          <img src="/close.png" alt="" className="w-10 h-10" />
        </button>
      </div>

      {/* CHAT AREA */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role === "assistant" && (
              <div className="mr-2 text-xl">
                {" "}
                <img src="/chatbot.png" alt="" className="w-10 h-10" />
              </div>
            )}

            <div>
              <div
                className={`px-4 py-3 rounded-2xl text-sm max-w-60 whitespace-pre-line ${
                  m.role === "user" ? "bg-purple-700 text-white" : "bg-gray-200"
                }`}
              >
                {m.content}
              </div>

              <div className="text-xs text-gray-400 mt-1">{m.time}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="mr-2 text-xl">
              <img src="/chatbot.png" alt="" className="w-10 h-10" />
            </div>

            <div className="bg-gray-200 rounded-2xl px-3 py-2">
              <Lottie animationData={typingAnim} loop className="w-12 h-6" />
            </div>
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-3">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            className="text-blue-500 text-xl hover:cursor-pointer"
          >
            ➤
          </button>
        </div>
        {/* WHATSAPP BUTTON */}
        <a
          href="https://wa.me/6282118143155"
          target="_blank"
          className="block text-center text-green-600 text-sm mt-2 hover:underline"
        >
          Lanjutkan ke WhatsApp
        </a>
      </div>
    </div>
  );
}
