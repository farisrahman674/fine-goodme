"use client";
import Lottie from "lottie-react";
import arrowAnim from "../../../src/lottie/Arrow-Right.json";
import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
type Props = {
  dict: any;
};
export default function Hero({ dict }: Props) {
  const [heroRef, heroVisible] = useScrollReveal<HTMLDivElement>({
    threshold: 0.6,
    once: false, // hero animasi sekali saja
  });
  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center overflow-hidden"
    >
      {/* Layer 1 — Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/HERO-IMAGES/ChatGPT Image Feb 16, 2026, 03_52_37 PM.png"
          alt="background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-blue-50/10 to-blue-900/50"></div>

      {/* Layer 2 — Mesin (masuk dari kanan) */}
      <div
        className={`
          absolute bottom-16 -right-20 md:bottom-40 md:-right-60 lg:-bottom-14 lg:-right-30 z-0 flex items-end justify-end
          transition-all duration-2000 ease-out
          ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-40"}
        `}
      >
        <Image
          src="/HERO-IMAGES/ChatGPT Image Feb 17, 2026, 04_03_16 PM.png"
          alt="mesin es krim"
          width={0}
          height={0}
          sizes="100vw"
          className="object-contain w-auto h-[55vh] md:h-[65vh] lg:h-screen"
        />
      </div>

      {/* Layer 3 — Text (masuk dari kiri) */}
      <div
        className={`
          relative z-20 w-full h-full flex items-center bottom-0 md:-bottom-20 lg:bottom-0
          transition-all duration-2000 delay-300 ease-out
          ${heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-40"}
        `}
      >
        <div className="pl-8 md:pl-16 lg:pl-44 max-w-6xl text-white">
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]">
            <span className="text-4xl sm:text-[85px] ">
              {dict.hero.titleTop}
            </span>
            <br />
            {dict.hero.titleBottom}
          </h1>

          <p className="mt-6 text-lg text-cyan-50 tracking-wider font-[MontserratCustom1]">
            ONE STOP SOLUTION RELIABLE SERVICES
          </p>

          <div className="mt-8">
            <button className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:scale-105 transition flex items-center gap-2 ">
              <span>{dict.hero.cta}</span>
              <Lottie animationData={arrowAnim} loop className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Layer 4 — Wave (PALING DEPAN) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30">
        <svg
          viewBox="0 0 1440 150"
          className="w-full h-30"
          preserveAspectRatio="none"
        >
          <path fill="white">
            <animate
              attributeName="d"
              dur="7s"
              repeatCount="indefinite"
              values="
              M0,80 C300,140 600,20 900,80 C1200,140 1440,60 1440,60 L1440,150 L0,150 Z;
              M0,60 C300,20 600,140 900,60 C1200,20 1440,120 1440,120 L1440,150 L0,150 Z;
              M0,80 C300,140 600,20 900,80 C1200,140 1440,60 1440,60 L1440,150 L0,150 Z
              "
            />
          </path>
        </svg>
      </div>
    </section>
  );
}
