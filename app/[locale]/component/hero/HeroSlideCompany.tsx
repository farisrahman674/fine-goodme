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
          src="/HERO-IMAGES/company-building.png"
          alt="Bestone Cold Technology Indonesia"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-blue-50/10 to-blue-900/50" />

      {/* Text Content */}
      <div className="relative z-20 text-center text-white px-6 mt-24">
        <h1 className="text-5xl font-bold leading-tight [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]">
          BCTI
        </h1>

        <p className=" mt-6 text-lg md:text-xl tracking-wider font-[MontserratCustom1] text-white [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]">
          ONE STOP SOLUTION RELIABLE SERVICES
        </p>
      </div>

      {/* Curved Bottom */}
      <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-24 md:h-28"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C480,80 960,80 1440,0 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
