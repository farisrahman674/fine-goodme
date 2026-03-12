"use client";

import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";

export default function HeroSlideCompany() {
  const [heroRef, visible] = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
    once: false,
  });

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-162.5 flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/HERO-IMAGES/ChatGPT Image Feb 26, 2026, 11_25_21 AM.png"
          alt="Bestone Cold Technology Indonesia"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-blue-50/10 to-blue-900/50" />

      {/* Text Content */}
      <div
        className={`
          relative z-20 text-center text-white px-6 mt-24
          transition-all duration-1000 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
        `}
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]">
          Bestone Cold Technology Indonesia
        </h1>

        <p
          className={`
            mt-6 text-lg md:text-xl tracking-wider font-[MontserratCustom1]
            text-white [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]
            transition-all duration-1000 delay-200
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
          `}
        >
          ONE STOP SOLUTION RELIABLE SERVICES
        </p>
      </div>
    </section>
  );
}
