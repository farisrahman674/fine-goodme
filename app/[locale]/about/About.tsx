"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel } from "swiper/modules";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Lightbulb from "../../../src/lottie/Idea.json";
import Checklist from "../../../src/lottie/Checklist Tasks.json";
import "swiper/css";
type Props = {
  dict: any;
};

const dataImages = [
  "/HERO-IMAGES/HERO ABOUT.png",
  "/HERO-IMAGES/ChatGPT Image Feb 26, 2026, 08_56_58 AM.png",
  "/HERO-IMAGES/ChatGPT Image Feb 26, 2026, 08_53_45 AM.png",
  "/HERO-IMAGES/ChatGPT Image Feb 26, 2026, 09_05_01 AM.png",
  "/HERO-IMAGES/ChatGPT Image Feb 26, 2026, 09_02_14 AM.png",
  "/HERO-IMAGES/ChatGPT Image Feb 26, 2026, 09_00_38 AM.png",
];
const timelineData = [
  {
    year: "2001",
    title: "Mendirikan Pabrik",
    desc: "Perusahaan memulai produksi mesin pendingin dan membangun fasilitas manufaktur pertama.",
    image: "/HERO-IMAGES/ChatGPT Image Feb 26, 2026, 08_56_58 AM.png",
  },
  {
    year: "2003",
    title: "Ekspansi Pasar",
    desc: "Mulai memperluas distribusi ke berbagai wilayah Asia.",
    image: "/HERO-IMAGES/HERO ABOUT.png",
  },
  {
    year: "2007",
    title: "Inovasi Produk",
    desc: "Meluncurkan lini mesin es krim generasi terbaru.",
    image: "/HERO-IMAGES/ChatGPT Image Feb 26, 2026, 09_05_01 AM.png",
  },
  {
    year: "2015",
    title: "Modernisasi Pabrik",
    desc: "Upgrade fasilitas produksi dengan teknologi otomatis.",
    image: "/HERO-IMAGES/ChatGPT Image Feb 26, 2026, 10_28_28 AM.png",
  },
  {
    year: "2023",
    title: "Ekspansi Global",
    desc: "Memperluas pasar hingga ke berbagai negara internasional.",
    image: "/HERO-IMAGES/ChatGPT Image Feb 26, 2026, 10_30_17 AM.png",
  },
];
export default function About({ dict }: Props) {
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const activeItem = timelineData[activeIndex];
  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen min-h-162.5 flex items-center justify-center overflow-hidden">
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
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1], // smooth cubic-bezier
          }}
          viewport={{ once: false, amount: 0.4 }}
          className="relative z-20 text-center text-white px-6 mt-24"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]">
            Bestone Cold Technology Indonesia
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 text-lg md:text-xl tracking-wider font-[MontserratCustom1] text-white [text-shadow:0_4px_9px_rgba(0,0,0,0.7)]"
          >
            ONE STOP SOLUTION RELIABLE SERVICES
          </motion.p>
        </motion.div>

        {/* Smooth Curved Bottom - Subtle */}
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

      {/* SECTION 1 — BIO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Bestone Cold Technology Indonesia
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {dict.about.description1}
          </p>
          <br />
          <p className="text-gray-600 leading-relaxed">
            {dict.about.description2}
          </p>
        </div>

        <div className="relative w-full h-95 rounded-xl overflow-hidden shadow-xl">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            speed={1500}
            loop
            className="w-full h-full"
          >
            {dataImages.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* LEFT SHADOW */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-10 bg-linear-to-r from-black/20 to-transparent z-10" />

          {/* RIGHT SHADOW */}
          <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-linear-to-l from-black/20 to-transparent z-10" />
        </div>
      </section>

      {/* VISI MISI */}
      <section className="relative py-24 bg-linear-to-b from-slate-50 to-white overflow-hidden">
        {/* Container */}
        <div className="max-w-7xl mx-auto px-0">
          <div className="text-center mb-14 w-full">
            <div className="flex items-center justify-center gap-6">
              <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 whitespace-nowrap">
                VISI & MISI
              </h2>

              <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* VISI */}
            <div className="bg-white rounded-2xl border-2 border-blue-300 p-10 shadow-lg hover:shadow-xl transition-all duration-500 h-95 sm:h-72">
              {/* Icon + Title */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Lottie
                  animationData={Lightbulb}
                  loop
                  className="h-16"
                ></Lottie>
                <h3 className="text-xl font-semibold text-slate-800">
                  {dict.vision.title}
                </h3>
              </div>

              {/* Content */}
              <p className="text-slate-600 leading-relaxed">
                {dict.vision.content}
              </p>
            </div>

            {/* MISI */}
            <div className="bg-white rounded-2xl border-2 border-blue-300 p-10 shadow-lg hover:shadow-xl transition-all duration-500">
              {/* Icon + Title */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Lottie
                  animationData={Checklist}
                  loop
                  className="h-16"
                ></Lottie>
                <h3 className="text-xl font-semibold text-slate-800">
                  {dict.mission.title}
                </h3>
              </div>

              {/* List */}
              <ul className="space-y-4 text-slate-600">
                {dict.mission.items.map((item: string, index: number) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-blue-600">✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative h-125 bg-linear-to-b from-slate-50 to-white overflow-hidden">
        {/* ================= FIXED YEARS ================= */}
        <div className="hidden md:block absolute left-20 top-1/2 -translate-y-1/2 z-20">
          {timelineData.map((y: any, i: number) => (
            <div
              key={i}
              onClick={() => swiperRef.current?.slideTo(i)}
              className={`h-17.5 flex items-center transition-all duration-300 cursor-pointer ${
                activeIndex === i
                  ? "scale-125 text-cyan-600"
                  : "opacity-30 hover:scale-110"
              }`}
            >
              <h2 className="text-4xl font-bold">{y.year}</h2>
            </div>
          ))}
        </div>
        {/* ===== MOBILE STICKY YEARS ===== */}
        <div className="md:hidden sticky top-0 z-20 bg-white/90 backdrop-blur py-3">
          <div className="flex justify-center gap-6">
            {timelineData.map((y: any, i: number) => (
              <div
                key={i}
                onClick={() => swiperRef.current?.slideTo(i)}
                className={`text-sm font-semibold cursor-pointer transition-all ${
                  activeIndex === i ? "text-cyan-600 scale-110" : "opacity-40"
                }`}
              >
                {y.year}
              </div>
            ))}
          </div>
        </div>
        {/* ================= SWIPER ================= */}
        <Swiper
          direction="vertical"
          slidesPerView={1}
          speed={900}
          modules={[]}
          allowTouchMove={false} // 🔥 MATIIN swipe
          simulateTouch={false}
          touchStartPreventDefault={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-125"
        >
          {timelineData.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:grid md:grid-cols-12 gap-8 md:gap-12 h-full items-center max-w-7xl mx-auto px-6 py-8 md:py-0">
                <span className="hidden md:block md:col-span-1"></span>
                {/* ===== IMAGE ===== */}
                <div className="w-full md:col-span-7 order-1">
                  <div className="relative h-64 md:h-100 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                </div>

                {/* ===== TEXT + ARROW ===== */}
                <div className="w-full md:col-span-4 order-2 flex flex-col justify-between md:h-100">
                  <div className="my-4 md:my-0">
                    <h3 className="text-xl md:text-3xl font-semibold mb-4 md:mb-6">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ===== STICKY ARROW NAV ===== */}
        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={activeIndex === 0}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              activeIndex === 0
                ? "opacity-20 cursor-not-allowed"
                : "hover:scale-110 bg-white shadow-lg hover:cursor-pointer"
            }`}
          >
            <img src="/next.png" alt="" className="-rotate-90" />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={activeIndex === timelineData.length - 1}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              activeIndex === timelineData.length - 1
                ? "opacity-20 cursor-not-allowed"
                : "hover:scale-110 bg-white shadow-lg hover:cursor-pointer"
            }`}
          >
            <img src="/next.png" alt="" className="rotate-90" />
          </button>
        </div>
      </section>
    </main>
  );
}
