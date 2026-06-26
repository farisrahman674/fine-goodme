"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  articles: any[];
  locale: "id" | "en";
  dict: any;
};

export default function BlogDesktop({ articles, locale, dict }: Props) {
  const itemsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const paginatedArticles = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
        {paginatedArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 h-96 flex flex-col"
          >
            <div className="relative h-48 rounded overflow-hidden shrink-0">
              <Image
                src={article.imageUrl || "/fallback.jpg"}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>

            {/* <p className="text-sm text-gray-500 mt-3">
                  {new Date(article.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p> */}

            <h2 className="text-lg font-semibold mt-auto">
              {article.title?.[locale]}
            </h2>

            <p className="text-sm text-gray-600 line-clamp-2 mt-auto">
              {article.excerpt?.[locale]}
            </p>

            <Link
              href={`/${locale}/blog/${article.slug}`}
              className="inline-block mt-auto text-blue-600 hover:underline"
            >
              Baca Selengkapnya →
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center  gap-4 mt-10">
        <button
          onClick={() => {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
          }}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          {dict.product.prev}
        </button>

        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => {
            setCurrentPage((prev) => Math.min(prev + 1, totalPages));
          }}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          {dict.product.next}
        </button>
      </div>
    </>
  );
}
