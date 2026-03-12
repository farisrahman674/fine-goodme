"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import HeroSlideIce from "@/app/[locale]/component/hero/HeroSlideIce";
import HeroSlideCompany from "@/app/[locale]/component/hero/HeroSlideCompanyHome";
import HeroSlideUC from "@/app/[locale]/component/hero/HeroSlideUC";
import HeroSlideMT from "@/app/[locale]/component/hero/HeroSlideMT";
import { useEffect, useState } from "react";

import "swiper/css";

type Props = {
  dict: any;
};

function shuffleArray(array: any) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
export default function HeroSlider({ dict }: Props) {
  const slides = [HeroSlideIce, HeroSlideUC, HeroSlideMT];

  const [shuffledSlides, setShuffledSlides] = useState(slides);

  useEffect(() => {
    setShuffledSlides(shuffleArray(slides));
  }, []);
  return (
    <div className="relative h-screen">
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 5000 }}
        speed={2500}
        pagination={{ clickable: true }}
        loop
        className="h-screen"
      >
        {shuffledSlides.map((SlideComponent, index) => (
          <SwiperSlide key={index}>
            <SlideComponent dict={dict} />
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <HeroSlideCompany />
        </SwiperSlide>
      </Swiper>

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
