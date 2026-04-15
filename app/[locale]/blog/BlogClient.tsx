"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/app/[locale]/component/hero/HeroSlider";
import Lottie from "lottie-react";
import loadingAnim from "@/src/lottie/Futuristic Loading Animation.json";

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
              {dict.why.title}
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
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-5"
              >
                <div className="relative h-48 rounded overflow-hidden">
                  <Image
                    src={article.imageUrl || "/fallback.jpg"}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {new Date(article.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <h2 className="text-lg font-semibold mt-2">
                  {article.title?.[locale]}
                </h2>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {article.excerpt?.[locale]}
                </p>

                <Link
                  href={`/${locale}/blog/${article.slug}`}
                  className="inline-block mt-4 text-blue-600 hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
