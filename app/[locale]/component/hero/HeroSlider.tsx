"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import HeroSlideIce from "@/app/[locale]/component/hero/HeroSlideIce";
import HeroSlideCompany from "@/app/[locale]/component/hero/HeroSlideCompany";

import "swiper/css";

type Props = {
  dict: any;
};

export default function HeroSlider({ dict }: Props) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 5000 }}
      speed={2500}
      pagination={{ clickable: true }}
      loop
      className="h-screen"
    >
      <SwiperSlide>
        <HeroSlideIce dict={dict} />
      </SwiperSlide>
      <SwiperSlide>
        <HeroSlideCompany />
      </SwiperSlide>
    </Swiper>
  );
}
