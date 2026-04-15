"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Hero from "@/app/[locale]/component/hero/HeroSlider";
import Lottie from "lottie-react";
import loadingAnim from "@/src/lottie/Futuristic Loading Animation.json";

type Props = {
  dict: any;
  locale: "id" | "en";
};
export default function BlogDetail({ dict, locale }: Props) {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${slug}`);
        const data = await res.json();

        console.log("ARTICLE:", data); // debug

        setArticle(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  return (
    <>
      <Hero dict={dict} locale={locale} />

      {loading ? (
        <div className="py-32 flex justify-center">
          <Lottie animationData={loadingAnim} loop className="w-40 h-40" />
        </div>
      ) : (
        <section className="max-w-4xl mx-auto px-6 py-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            {article.title?.[locale]}
          </h1>
          <p className="text-gray-500 mt-2">
            {new Date(article.createdAt).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="relative w-full h-64 sm:h-96 my-6 rounded-xl overflow-hidden">
            <Image
              src={article.imageUrl || "/fallback.jpg"}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>
          <div
            className="prose max-w-none prose-lg text-black prose-li:marker:text-black
    prose-li:marker:text-base  prose-hr:border-blue-100 
             prose-hr:border-[0.1px] prose-hr:w-full
             
              prose-hr:my-5 text-justify"
            dangerouslySetInnerHTML={{ __html: article.content?.[locale] }}
          />
        </section>
      )}
    </>
  );
}
