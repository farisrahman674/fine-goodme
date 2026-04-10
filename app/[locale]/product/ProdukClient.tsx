"use client";
import Image from "next/image";
import Hero from "@/app/[locale]/component/hero/HeroSlider";
import CustomerServices from "@/app/[locale]/component/CustomerService";
import Lottie from "lottie-react";
import loadingAnim from "@/src/lottie/Futuristic Loading Animation.json";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {
  dict: any;
  locale: "id" | "en";
};
export default function Produk({ dict, locale }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const itemsPerPage = 6;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(dict.product.all);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [expandedSub, setExpandedSub] = useState<string | null>(null);
  // const [expandedDesktop, setExpandedDesktop] = useState<string | null>(null);

  // 🔥 FETCH DATA FROM API
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);
  useEffect(() => {
    if (!products.length) return;

    if (categoryFromUrl) {
      const isValid = products.some((p) => p.category === categoryFromUrl);

      if (isValid) {
        setSelectedCategory(categoryFromUrl);
      } else {
        setSelectedCategory(dict.product.all);
      }
    }
  }, [categoryFromUrl, products]);

  // 🔥 GET ALL CATEGORIES
  const categories = useMemo(() => {
    return [
      dict.product.all,
      ...Array.from(new Set(products.map((p) => p.category))),
    ];
  }, [products, dict.product.all]);

  // 🔥 GET Subcategory
  const getSubCategories = (category: string) => {
    return Array.from(
      new Set(
        products
          .filter(
            (p) =>
              p.category === category &&
              Array.isArray(p.subCategory) &&
              p.subCategory.length > 0,
          )
          .map((p) => p.subCategory[0]?.en)
          .filter(Boolean),
      ),
    );
  };

  // 🔥 FILTER LOGIC
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        selectedCategory === dict.product.all ||
        product.category === selectedCategory;

      let subValue = null;

      if (Array.isArray(product.subCategory)) {
        subValue = product.subCategory[0]?.en;
      }

      const matchSub = !selectedSub || subValue === selectedSub;

      return matchCategory && matchSub;
    });
  }, [products, selectedCategory, selectedSub, dict.product.all]);

  // 🔥 PAGINATION
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  useEffect(() => {
    setCurrentPage(1);
    setSelectedSub(null);
  }, [selectedCategory]);
  return (
    <div>
      <Hero dict={dict} locale={locale} />
      {loading ? (
        <div className="py-32 flex justify-center">
          <Lottie animationData={loadingAnim} loop className="w-40 h-40" />
        </div>
      ) : (
        <section
          id="product-section"
          className="py-20 px-8 lg:px-20 bg-blue-50/40"
        >
          {/* Header */}
          <div className="text-center mb-14 w-full">
            <div className="flex items-center justify-center gap-6">
              <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>

              <h2 className="text-4xl font-bold text-blue-900 whitespace-nowrap">
                {selectedCategory === dict.product.all
                  ? dict.product.all
                  : selectedCategory}
              </h2>

              <span className="h-px w-full bg-linear-to-r from-transparent via-blue-400 to-transparent"></span>
            </div>
          </div>
          {/* MOBILE CATEGORY DROPDOWN */}
          <div className="lg:hidden mb-6">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-full flex items-center justify-between font-semibold text-left"
              >
                <span>{dict.product.category}</span>

                <span
                  className={`transition-transform duration-300 ${
                    mobileOpen ? "-rotate-90" : "rotate-90"
                  }`}
                >
                  <img src="/arrow-right.png" className="w-3 h-3" alt="" />
                </span>
              </button>

              {mobileOpen && (
                <ul className="mt-4 space-y-3 text-sm">
                  {categories.map((category) => {
                    const isExpanded = selectedCategory === category;

                    const subs = getSubCategories(category);
                    const hasSub = subs.length > 0;
                    return (
                      <li key={category}>
                        <div
                          onClick={() => {
                            router.push(
                              `/${locale}/product?category=${encodeURIComponent(category)}`,
                              { scroll: false },
                            );

                            setTimeout(() => {
                              document
                                .getElementById("product-section")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }}
                          className={`flex items-center justify-between cursor-pointer ${
                            selectedCategory === category
                              ? "text-blue-500 font-semibold"
                              : "hover:text-blue-500"
                          }`}
                        >
                          <span>{category}</span>

                          {hasSub && (
                            <span
                              className={`transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            >
                              <img
                                src="/arrow-right.png"
                                className="w-3 h-3"
                                alt=""
                              />
                            </span>
                          )}
                        </div>

                        {/* Sub */}
                        {hasSub && isExpanded && (
                          <ul className="ml-4 mt-2 space-y-2">
                            {subs.map((sub) => (
                              <li
                                key={sub}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSub(sub);
                                }}
                                className={`cursor-pointer ${
                                  selectedSub === sub
                                    ? "text-blue-500 font-semibold"
                                    : "hover:text-blue-500"
                                }`}
                              >
                                {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          {/* Layout Sidebar + Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* SIDEBAR */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">
                  {dict.product.category}
                </h3>

                <ul className="space-y-3 text-sm">
                  {categories.map((category) => {
                    const isExpanded = selectedCategory === category;

                    const subs = getSubCategories(category);
                    const hasSub = subs.length > 0;

                    return (
                      <li key={category}>
                        <div
                          onClick={() => {
                            router.push(
                              `/${locale}/product?category=${encodeURIComponent(category)}`,
                              { scroll: false },
                            );

                            setTimeout(() => {
                              document
                                .getElementById("product-section")
                                ?.scrollIntoView({ behavior: "smooth" });
                            }, 100);
                          }}
                          className={`flex items-center justify-between cursor-pointer ${
                            selectedCategory === category
                              ? "text-blue-500 font-semibold"
                              : "hover:text-blue-500"
                          }`}
                        >
                          <span>{category}</span>

                          {hasSub && (
                            <span
                              className={`transition-transform ${
                                isExpanded ? "rotate-90" : ""
                              }`}
                            >
                              <img
                                src="/arrow-right.png"
                                className="w-3 h-3"
                                alt=""
                              />
                            </span>
                          )}
                        </div>

                        {/* SUB CATEGORY */}
                        {hasSub && isExpanded && (
                          <ul className="ml-4 mt-2 space-y-2">
                            {subs.map((sub) => (
                              <li
                                key={sub}
                                onClick={() => setSelectedSub(sub)}
                                className={`cursor-pointer ${
                                  selectedSub === sub
                                    ? "text-blue-500 font-semibold"
                                    : "hover:text-blue-500"
                                }`}
                              >
                                {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {paginatedProducts.map((product) => {
                  const image = product.variants
                    ?.flatMap((v: any) => v.image || [])
                    ?.find((img: any) => img.role === "IMAGE_PRODUCT")?.url;
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden group"
                    >
                      <Link href={`/${locale}/product/${product.slug}`}>
                        {/* Image */}
                        <div className="relative w-full h-64 bg-gray-100">
                          <Image
                            src={image}
                            alt="product"
                            fill
                            className="object-contain p-6 group-hover:scale-105 transition duration-500"
                          />
                        </div>

                        {/* Specs */}
                        <div className="p-6 bg-white">
                          {/* MODEL NAME */}
                          <div className="flex justify-between border-b pb-2 mb-2">
                            <span className="text-gray-500 font-medium">
                              Model
                            </span>
                            <span className="text-gray-800 font-semibold text-right">
                              {product.variants[0]?.model}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            {product.variants[0]?.specs
                              .filter((spec: any) => spec.isHighlight)
                              .map((spec: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex justify-between border-b pb-2 last:border-none"
                                >
                                  <span className="text-gray-500 font-medium">
                                    {spec.label}
                                  </span>
                                  <span className="text-gray-800 font-semibold text-right">
                                    {spec.value}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center  gap-4 mt-10">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              {dict.product.prev}
            </button>

            <span className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              {dict.product.next}
            </button>
          </div>
        </section>
      )}
      <CustomerServices phone="6282118143155" dict={dict} />
    </div>
  );
}
