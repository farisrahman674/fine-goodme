"use client";
import Lottie from "lottie-react";
import arrowAnim from "@/src/lottie/Arrow-Right.json";
import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
type Props = {
  locale: "id" | "en";
  dict: any;
};
export default function Hero({ dict, locale }: Props) {
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
          {locale === "id" ? (
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]">
              <span className="text-4xl sm:text-[85px] ">
                {dict.hero.titleTop}
              </span>
              <br />
              {dict.hero.titleBottomIce}
            </h1>
          ) : (
            <h1 className="text-4xl sm:text-6xl max-w-xl font-bold leading-tight [text-shadow:0_4px_9px_rgba(0,0,0,0.7)] ">
              <span className="text-4xl sm:text-[52px] ">
                {dict.hero.titleBottomIce}
              </span>
              <br />
              {dict.hero.titleTop}
            </h1>
          )}
          <p className="mt-6 text-lg text-cyan-50 tracking-wider font-[MontserratCustom1]">
            ONE STOP SOLUTION RELIABLE SERVICES
          </p>

          <div className="mt-8">
            <a href="https://wa.me/6282118143155">
              <button className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold hover:scale-105 transition flex items-center gap-2 hover:cursor-pointer">
                <span>{dict.hero.cta}</span>
                <Lottie animationData={arrowAnim} loop className="w-6 h-6" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
