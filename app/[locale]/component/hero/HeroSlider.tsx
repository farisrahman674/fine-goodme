"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import HeroSlideIce from "@/app/[locale]/component/hero/HeroSlideIce";
import HeroSlideCompany from "@/app/[locale]/component/hero/HeroSlideCompanyHome";
import HeroSlideUC from "@/app/[locale]/component/hero/HeroSlideUC";
import HeroSlideMT from "@/app/[locale]/component/hero/HeroSlideMT";
import HeroEvent from "@/app/[locale]/component/hero/HeroEvent";

import "swiper/css";

type Props = {
  locale: "id" | "en";
  dict: any;
};
export default function HeroSlider({ dict, locale }: Props) {
  return (
    <div className="relative h-screen">
      <div>
        <Swiper
          modules={[Pagination, Navigation]}
          speed={2500}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{ clickable: true }}
          loop
          className="h-screen"
        >
          <SwiperSlide>
            <HeroSlideIce dict={dict} locale={locale} />
          </SwiperSlide>

          <SwiperSlide>
            <HeroSlideUC dict={dict} locale={locale} />
          </SwiperSlide>

          <SwiperSlide>
            <HeroSlideMT dict={dict} locale={locale} />
          </SwiperSlide>
          <SwiperSlide>
            <HeroEvent />
          </SwiperSlide>
          <SwiperSlide>
            <HeroSlideCompany />
          </SwiperSlide>
        </Swiper>
        {/* LEFT ARROW */}
        <button className="custom-prev absolute left-7 top-[49%] -translate-y-1/2 z-40 hover:cursor-pointer">
          <img
            src="/next1.jpg"
            alt="prev"
            className="w-7 h-7 sm:w-12 sm:h-12 rotate-180 bg-white rounded-full"
          />
        </button>

        {/* RIGHT ARROW */}
        <button className="custom-next absolute right-7  top-[49%] -translate-y-1/2 z-40 hover:cursor-pointer">
          <img
            src="/next1.jpg"
            alt="next"
            className="w-7 h-7 sm:w-12 sm:h-12 bg-white rounded-full"
          />
        </button>
      </div>

      {/* Wave */}
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
    </div>
  );
}
