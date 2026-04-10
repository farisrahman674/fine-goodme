"use client";
import Image from "next/image";
import Link from "next/link";
import Lottie from "lottie-react";
import loadingAnim from "@/src/lottie/Futuristic Loading Animation.json";
import Hero from "@/app/[locale]/component/hero/HeroSlider";
import CustomerServices from "@/app/[locale]/component/CustomerService";
import { products } from "@/data/homeProduct";
import { testimonials } from "@/data/Testimonial";
import useScrollReveal from "@/hooks/useScrollReveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import "swiper/css";

type Props = {
  dict: any;
  locale: "id" | "en";
};

export default function Home({ dict, locale }: Props) {
  const [aboutRef, aboutVisible] = useScrollReveal<HTMLDivElement>({
    threshold: 0.3,
    once: false, // boleh ulang
  });
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const gridCols =
    articles.length === 1
      ? "grid-cols-1"
      : articles.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <main>
      <Hero dict={dict} locale={locale} />
      {/* About BCTI */}
      <section className="w-full bg-white py-10 md:py-16">
        {/* Title */}
        <div className="text-center mb-14 w-full">
          <div className="flex items-center justify-center gap-3 px-4">
            <span className="hidden  sm:block h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 whitespace-nowrap">
              {dict.welcome.title}
            </h2>

            <span className="hidden sm:block h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-8">
            “ONE STOP SOLUTION RELIABLE SERVICES”
          </p>

          {/* Content */}
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed space-y-6 text-justify md:text-left">
            <p>
              <span className="font-bold">
                Bestone Cold Technology Indonesia | BCTI
              </span>{" "}
              {dict.welcome.p1}
            </p>

            <p>{dict.welcome.p2}</p>

            <p>{dict.welcome.p3}</p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US? */}
      <section className="py-5 bg-linear-to-b from-white via-blue-100 to-white">
        {/* Title */}
        <div className="text-center mb-14 w-full">
          <div className="flex items-center justify-center gap-6">
            <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 whitespace-nowrap">
              {dict.why.title}
            </h2>

            <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 ">
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {dict.why.items.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 flex flex-col h-full w-80 sm:w-72 mx-auto"
              >
                <div className="relative h-48 shrink-0">
                  <Image
                    src={
                      [
                        "/ChatGPT Image Feb 13, 2026, 01_43_52 PM.png",
                        "/ChatGPT Image Feb 13, 2026, 03_16_30 PM.png",
                        "/ChatGPT Image Feb 13, 2026, 03_27_33 PM.png",
                        "/ChatGPT Image Feb 13, 2026, 03_39_24 PM.png",
                      ][index]
                    }
                    alt={item.title}
                    fill
                    className="object-cover object-[center_10%]"
                  />
                </div>

                <div className="bg-linear-to-b from-blue-400 to-blue-600 p-6 text-white flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold relative pb-4">
                    {item.title}
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white/60"></span>
                  </h3>

                  <p className="text-xs sm:text-sm mt-3 opacity-90">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Information */}
      <section className="w-full bg-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Text */}
          <p className="text-white text-sm md:text-base text-center md:text-left leading-relaxed">
            {dict.inf.text}
          </p>

          {/* Button */}
          <button
            className="
            w-full sm:w-auto
      bg-blue-600
      text-white font-bold
      px-6 py-3
      rounded-xl
      transition-all duration-300
      hover:scale-105
      whitespace-nowrap
    "
          >
            {dict.inf.button}
          </button>
        </div>
      </section>

      {/* Product & Testimoni */}
      <section className="relative w-full py-14 sm:py-20 overflow-hidden bg-linear-to-b from-white via-blue-100 to-white">
        {/* Title */}
        <div className="text-center mb-14 w-full">
          <div className="flex items-center justify-center gap-6">
            <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 whitespace-nowrap">
              {dict.homeProduct.title}
            </h2>

            <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/40 p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-blue-900 mb-8">
                {dict.homeProduct.productTitle}
              </h3>
              <div className="relative">
                <Swiper
                  modules={[Pagination, Navigation]}
                  spaceBetween={30}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  navigation={{
                    prevEl: ".custom-prev-prod",
                    nextEl: ".custom-next-prod",
                  }}
                  speed={1200}
                  loop
                >
                  {products.map((product, index) => (
                    <SwiperSlide key={index}>
                      <div>
                        <div className="relative w-full h-64 sm:h-95">
                          <Image
                            src={product.image}
                            alt={product.name[locale]}
                            fill
                            className="object-contain"
                          />
                        </div>

                        <h4 className="text-xl font-bold mt-6">
                          {product.name[locale]}
                        </h4>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* LEFT ARROW */}
                <button className="custom-prev-prod absolute left-6 top-1/2 -translate-y-1/2 z-40 hover:cursor-pointer">
                  <img
                    src="/next1.jpg"
                    alt="prev"
                    className="w-7 h-7 sm:w-8 sm:h-8 rotate-180 rounded-full"
                  />
                </button>

                {/* RIGHT ARROW */}
                <button className="custom-next-prod absolute right-7  top-1/2 -translate-y-1/2 z-40 hover:cursor-pointer">
                  <img
                    src="/next1.jpg"
                    alt="next"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                  />
                </button>
              </div>

              <p className="text-gray-600 mt-2">{dict.homeProduct.desc}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-6 text-blue-700 text-sm">
                {dict.homeProduct.features.map(
                  (feature: string, index: number) => (
                    <span key={index}>✔ {feature}</span>
                  ),
                )}
              </div>
            </div>
            <div className="relative text-center">
              <h3 className="text-2xl font-semibold text-blue-900 mb-8">
                {dict.homeProduct.testimonialTitle}
              </h3>
              <div className="relative">
                <Swiper
                  modules={[Pagination, Navigation]}
                  pagination={{ clickable: true }}
                  navigation={{
                    prevEl: ".custom-prev-test",
                    nextEl: ".custom-next-test",
                  }}
                  speed={1200}
                  loop
                  slidesPerView={1}
                >
                  {testimonials.map((item, index) => (
                    <SwiperSlide key={index}>
                      {({ isActive }) => (
                        <div
                          className={`relative transition-opacity duration-500 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {/* Image */}
                          <div className="relative w-full h-96 lg:h-125 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover object-[center_30%]"
                            />
                          </div>

                          {/* Floating Card */}
                          <div className="absolute bottom-4 right-4 left-4 sm:left-auto sm:w-72 bg-white rounded-2xl shadow-xl p-4 sm:p-6 text-left">
                            <p className="italic text-gray-700">
                              “{item.text[locale]}”
                            </p>

                            <div className="mt-4">
                              <p className="font-semibold">{item.name}</p>
                              <div className="text-yellow-400 text-sm">
                                ★★★★★
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* LEFT ARROW */}
                <button className="custom-prev-test absolute left-6 top-1/2 -translate-y-1/2 z-40 hover:cursor-pointer ">
                  <img
                    src="/next1.jpg"
                    alt="prev"
                    className="w-7 h-7 sm:w-8 sm:h-8 rotate-180 rounded-full bg-white"
                  />
                </button>

                {/* RIGHT ARROW */}
                <button className="custom-next-test absolute right-7  top-1/2 -translate-y-1/2 z-40 hover:cursor-pointer">
                  <img
                    src="/next1.jpg"
                    alt="next"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS / BLOG */}
      <section className="px-4 sm:p-10 bg-gray-50 py-14">
        {/* TITLE */}
        <div className="text-center mb-14 w-full">
          <div className="flex items-center justify-center gap-6">
            <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 whitespace-nowrap">
              Artikel BCTI
            </h2>

            <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="py-32 flex justify-center">
            <Lottie animationData={loadingAnim} loop className="w-40 h-40" />
          </div>
        ) : (
          <>
            {/* GRID */}
            <div className={`grid gap-6 mt-8 ${gridCols} w-72 sm:w-96 mx-auto`}>
              {articles.slice(0, 3).map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded shadow hover:shadow-lg transition p-5"
                >
                  <div className="relative h-40 sm:h-48">
                    <Image
                      src={news.imageUrl || "/fallback.jpg"}
                      alt={news.title}
                      fill
                      className="object-cover object-[center_10%] rounded"
                    />
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(news.createdAt).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>

                  <h3 className="font-semibold text-lg mt-2">{news.title}</h3>

                  <Link
                    href={`/blog/${news.slug}`}
                    className="mt-4 inline-block text-blue-600 hover:underline"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <div className="text-center mt-10">
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Lihat Semua Berita
              </Link>
            </div>
          </>
        )}
      </section>

      {/* AI CALL CENTER BUTTON */}
      <CustomerServices phone="6282118143155" dict={dict} />
    </main>
  );
}
