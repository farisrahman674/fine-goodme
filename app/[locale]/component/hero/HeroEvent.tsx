"use client";

import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
import "animate.css";

export default function HeroSlideCompany() {
  const [heroRef, visible] = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
    once: false,
  });

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen bg-[#F28745] px-6 py-10 "
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5 transition-all duration-700  lg:h-screen ">
        {/* LOGO (kotak 2) */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end items-center ">
          <Image
            src="/logo FHTB (white).png"
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            className="w-40 sm:w-48 md:w-56 lg:w-72 h-auto"
          />
        </div>

        {/* IMAGE (kotak 1 & 3) */}
        <div className="order-2 md:order-1 md:row-span-2 flex justify-center items-center">
          <div className="bg-white p-2 rounded-tr-3xl rounded-bl-3xl shadow-xl">
            <Image
              src="/HERO-IMAGES/ChatGPT Image Apr 10, 2026, 04_38_09 PM.png"
              alt="Garuda"
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-tr-2xl rounded-bl-2xl object-cover  w-64 sm:w-80 md:w-105 lg:w-130 xl:w-155 h-auto"
            />
          </div>
        </div>

        {/* TEXT (kotak 4) */}
        <div className="order-3 md:order-3 flex flex-col justify-start  text-white text-center md:text-left sm:pl-10">
          <h1 className="text-4xl md:text-6xl font-[MontserratCustom] font-extrabold leading-tight tracking-wide [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]">
            FHTB 2026
          </h1>
          <h2 className="mt-3 text-2xl md:text-3xl font-[MontserratCustom] font-semibold [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]">
            Food, Hotel & Tourism Bali
          </h2>
          <p className="mt-2 text-lg opacity-90 font-[MontserratCustom1] [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]">
            <span className="flex items-center justify-center md:justify-start gap-2">
              <img
                src="/icon/calendar.png"
                alt="calendar"
                className="w-6 h-6"
              />
              28 - 30 April 2026
            </span>

            <span className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <img src="/icon/map.png" alt="location" className="w-6 h-6" />
              Venue: Hall Nusa Dua
            </span>
            <span className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <img src="/icon/booth.png" alt="location" className="w-6 h-6" />
              Booth: No 1719
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
