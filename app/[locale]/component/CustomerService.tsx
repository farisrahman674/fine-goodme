"use client";
import Lottie from "lottie-react";
import whatsappAnim from "@/src/lottie/WhatsApp icon.json";
type Props = {
  phone: string;
  dict: any;
};

export default function WhatsAppButton({ phone, dict }: Props) {
  const url = `https://wa.me/${phone}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center gap-2
          bg-green-500
          hover:bg-green-600
          hover:cursor-pointer 
          text-white
          px-4 py-2
          rounded-full
          shadow-lg
          transition
        "
      >
        <span className="font-semibold">{dict.cs.message}</span>
        <Lottie animationData={whatsappAnim} loop className="w-8 h-8" />
      </a>
    </div>
  );
}
