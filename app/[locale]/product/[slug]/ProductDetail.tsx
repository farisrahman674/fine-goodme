"use client";

import Image from "next/image";
import Hero from "@/app/[locale]/component/hero/HeroSlideIce";
import CustomerServices from "@/app/[locale]/component/CustomerService";
import { specIconMap } from "@/lib/specIcons";
import { normalizeSpecKey } from "@/lib/specUtils";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loadingAnim from "@/src/lottie/Futuristic Loading Animation.json";
import arrowAnim from "@/src/lottie/Arrow Down.json";

type Props = {
  dict: any;
  locale: "id" | "en";
};
const features = [
  "Manual Book",
  "Spare Part Karet Seal",
  "Garansi Mesin 1 Year",
];
export default function ProductDetail({ locale, dict }: Props) {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH FROM API
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/products/${slug}`);
      const data = await res.json();
      setProduct(data);
      setSelectedVariant(data?.variants?.[0] || null);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    if (slug) load();
  }, [slug]);

  const imageProduct = selectedVariant?.image?.find(
    (img: any) => img.role === "IMAGE_PRODUCT",
  );

  const imageDecor =
    selectedVariant?.image?.filter((img: any) => img.role === "IMAGE_DECOR") ||
    [];
  const rating = product?.rating ?? 4.5;
  const reviewCount = product?.reviewCount ?? 0;
  const description = product?.description?.[locale] ?? "";
  console.log(selectedVariant);
  return (
    <div>
      <Hero dict={dict} />
      {loading ? (
        <div className="py-32 flex justify-center">
          <Lottie animationData={loadingAnim} loop className="w-40 h-40" />
        </div>
      ) : (
        <section className="py-20 px-8 lg:px-20 bg-blue-50/40">
          <div className="max-w-7xl mx-auto">
            {/* TOP GRID (1 & 2) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
              {/* 1 = IMAGE */}
              <div>
                <div className="bg-white rounded-2xl shadow-sm p-10 border-l-0 border-b-0 border-cyan-300 hover:border-l-4 hover:border-b-4 transition-all duration-100">
                  <div className="relative w-full h-48 lg:h-125">
                    <Image
                      src={imageProduct?.url}
                      alt="product"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* 2 = TEXT */}
              <div>
                <h1 className="text-4xl font-bold text-blue-500 mb-3">
                  {selectedVariant?.model}
                </h1>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex text-yellow-400 text-lg">
                    {"★★★★★".slice(0, Math.round(rating))}
                  </div>
                  <span className="text-gray-500 text-sm">
                    {reviewCount} Customer Review
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {description}
                </p>

                {/* DECOR IMAGE */}
                {imageDecor.length > 0 && (
                  <div className="mt-10 relative w-32 h-28 lg:h-32 overflow-hidden rounded-2xl border-2 mb-5 border-cyan-400">
                    <Image
                      src={imageDecor[0].url}
                      alt="decor"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* SECTION BAWAH */}
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* LEFT — TECHNICAL SPEC */}
              <div>
                <h3 className="text-2xl font-bold text-blue-500 mb-8">
                  {dict.prDetail.spec}
                </h3>
                {product.variants?.length > 1 && (
                  <div className="mb-8 ">
                    <h4 className="text-sm font-semibold mb-3">Variant</h4>
                    <div className="flex gap-3 flex-wrap">
                      {product.variants.map((variant: any) => (
                        <button
                          key={variant.model}
                          onClick={() => setSelectedVariant(variant)}
                          className={`px-4 py-2 rounded-lg border transition ${
                            selectedVariant?.model === variant.model
                              ? "bg-cyan-600 text-white border-cyan-600 hover:cursor-pointer"
                              : "border-gray-300 hover:border-cyan-600 hover:cursor-pointer"
                          }`}
                        >
                          {variant.model}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  {selectedVariant?.specs?.map((spec: any, index: number) => {
                    const key = normalizeSpecKey(spec.label);
                    const icon = specIconMap[key];

                    return (
                      <div
                        key={index}
                        className="bg-slate-100 border-2 rounded-2xl border-cyan-200 p-3 hover:shadow-md transition flex items-center gap-4"
                      >
                        {/* ICON */}
                        {icon && (
                          <Image
                            src={icon}
                            alt={spec.label}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        )}

                        {/* TEXT */}
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            {spec.label}
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT — KEY FEATURES */}
              <div>
                <h3 className="text-2xl font-bold text-blue-500 mb-8">
                  {dict.prDetail.accessories}
                </h3>

                <ul className="space-y-4 mb-8">
                  {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5  flex items-center justify-center">
                        <img src="/check.png" alt="" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  {/* Back Button */}
                  <button
                    onClick={() => router.back()}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 transition font-semibold py-4 rounded-xl text-lg hover:cursor-pointer"
                  >
                    <Lottie
                      animationData={arrowAnim}
                      loop
                      className="w-10 h-10 rotate-90"
                    />
                    <span>{dict.order.back}</span>
                  </button>

                  {/* Pesan Sekarang */}
                  <button className="flex-1 flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 transition text-white font-semibold py-4 rounded-xl text-lg hover:cursor-pointer">
                    <a href="https://wa.me/6282118143155">
                      <span>{dict.order.pesan}</span>
                    </a>
                    <Lottie
                      animationData={arrowAnim}
                      loop
                      className="w-10 h-10 rotate-270"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <CustomerServices phone="6282118143155" dict={dict} />
    </div>
  );
}
