"use client";

import { useEffect, useState } from "react";
import Hero from "@/app/[locale]/component/hero/HeroSlider";
import Lottie from "lottie-react";
import loadingAnim from "@/src/lottie/Futuristic Loading Animation.json";
import CustomerServices from "@/app/[locale]/component/CustomerService";
import BlogDesktop from "../component/BlogDesktop";
import BlogMobile from "../component/BlogMobile";

type Props = {
  dict: any;
  locale: "id" | "en";
};
export default function BlogClient({ dict, locale }: Props) {
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

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <section className="px-4 sm:px-10 py-14 bg-gray-50 min-h-screen">
        {/* TITLE */}
        <div className="text-center mb-14 w-full">
          <div className="flex items-center justify-center gap-6">
            <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 whitespace-nowrap">
              {dict.article.head}
            </h1>

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
            {/* Desktop */}
            <div className="hidden lg:block">
              <BlogDesktop articles={articles} locale={locale} dict={dict} />
            </div>

            {/* Mobile */}
            <div className="block lg:hidden">
              <BlogMobile articles={articles} locale={locale} dict={dict} />
            </div>
          </>
        )}
        <CustomerServices phone="6282118143155" dict={dict} />
      </section>
    </>
  );
}
