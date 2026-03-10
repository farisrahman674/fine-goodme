"use client";

import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import whatsappAnim from "@/src/lottie/Customer service.json";
import AIChatWidget from "./AIChatWidget";

type Props = {
  phone: string;
  dict: any;
};

export default function WhatsAppButton({ phone, dict }: Props) {
  const text = dict.cs.message;
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(text.substring(0, displayText.length + 1));

        if (displayText === text) {
          setTimeout(() => setIsDeleting(true), 1500); // pause sebelum hapus
        }
      } else {
        setDisplayText(text.substring(0, displayText.length - 1));

        if (displayText === "") {
          setIsDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);
  return (
    <>
      {/* CHAT WIDGET */}
      {open && <AIChatWidget phone={phone} onClose={() => setOpen(false)} />}

      {/* FLOATING BUTTON */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-50 ">
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-end hover:cursor-pointer"
          >
            {/* BUBBLE */}
            <div className="absolute text-sm -top-4 right-10 sm:text-[16px] sm:-top-2 sm:right-16 z-10 bg-white px-4 py-2 rounded-xl shadow-md">
              <span className="font-semibold whitespace-nowrap">
                {displayText}
              </span>

              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white rotate-45 "></div>
            </div>

            {/* ICON */}
            <Lottie
              animationData={whatsappAnim}
              loop
              className="w-20 h-20 sm:w-28 sm:h-28"
            />
          </button>
        </div>
      )}
    </>
  );
}
