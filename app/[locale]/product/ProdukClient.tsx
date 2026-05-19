"use client";
import Image from "next/image";
import Hero from "@/app/[locale]/component/hero/HeroSlider";
import CustomerServices from "@/app/[locale]/component/CustomerService";
import Lottie from "lottie-react";
import loadingAnim from "@/src/lottie/Futuristic Loading Animation.json";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MachineCard from "@/src/modules/product/machine/MachineCard";
import PackagingCard from "@/src/modules/product/packaging/PackagingCard";
import { scroller } from "react-scroll";
import { useMachineProducts } from "@/src/modules/product/machine/useMachineProducts";
import { usePackagingProducts } from "@/src/modules/product/packaging/usePackagingProducts";
import { filterMachine } from "@/src/modules/product/machine/machine.filter";
import { getMachineSubCategories } from "@/src/modules/product/machine/machine.subcategory";
import { filterPackaging } from "@/src/modules/product/packaging/packaging.filter";

type Props = {
  dict: any;
  locale: "id" | "en";
};
export default function Produk({ dict, locale }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(dict.product.all);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [openParent, setOpenParent] = useState<string | null>(null);
  const [mode, setMode] = useState<"machine" | "packaging">("machine");
  const machine = useMachineProducts();
  const packaging = usePackagingProducts();

  const products = mode === "machine" ? machine.data : packaging.data;
  const loading = mode === "machine" ? machine.loading : packaging.loading;

  const getSubs = (categoryName: string) => {
    return getMachineSubCategories(machine.data, categoryName);
  };
  useEffect(() => {
    scroller.scrollTo("product-section", {
      duration: 1500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -30,
    });
  }, [categoryFromUrl]);

  useEffect(() => {
    if (!products.length) return;

    if (categoryFromUrl) {
      const isValid = products.some(
        (p) => p.category?.name?.en === categoryFromUrl,
      );

      if (isValid) {
        setSelectedCategory(categoryFromUrl);
      } else {
        setSelectedCategory(dict.product.all);
      }
    }
  }, [categoryFromUrl, products]);

  useEffect(() => {
    async function loadCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }
    loadCategories();
  }, []);
  useEffect(() => {
    if (!categoryFromUrl || !categories.length) return;

    const foundParent = categories.find((parent) =>
      parent.children.some((child: any) => child.name?.en === categoryFromUrl),
    );

    if (!foundParent) return;

    if (foundParent.name?.en === "Machine") {
      setMode("machine");
    } else if (foundParent.name?.en === "Packaging") {
      setMode("packaging");
    }
  }, [categoryFromUrl, categories]);

  // 🔥 FILTER LOGIC
  const filteredProducts = useMemo(() => {
    if (mode === "machine") {
      return filterMachine(
        products,
        selectedCategory,
        selectedSub,
        dict.product.all,
      );
    }

    return filterPackaging(products, selectedCategory, dict.product.all);
  }, [products, selectedCategory, selectedSub, dict.product.all, mode]);

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
        <div id="product-section" className="py-32 flex justify-center">
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
                onClick={() => setMobileOpen(true)}
                className="w-full flex items-center justify-around font-semibold text-left"
              >
                <span>{dict.product.category}</span>
              </button>

              <AnimatePresence>
                {mobileOpen && (
                  <div className="fixed inset-0 z-50 flex justify-start">
                    {/* BACKDROP */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-black/40"
                      onClick={() => setMobileOpen(false)}
                    />

                    {/* SIDEBAR */}
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{
                        duration: 0.3,
                        ease: [0.25, 0.8, 0.25, 1], // 🔥 smooth premium feel
                      }}
                      className="relative w-72 bg-white h-full shadow-xl p-4 overflow-y-auto"
                    >
                      {/* HEADER */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-gray-800">
                          {dict.product.category}
                        </h2>
                        <button onClick={() => setMobileOpen(false)}>✕</button>
                      </div>

                      {/* 🔥 COPY PASTE ISI CATEGORY LO KE SINI */}
                      <ul className="space-y-3 text-sm">
                        {categories.map((parent) => {
                          const isOpen = openParent === parent.id;

                          return (
                            <li key={parent.id}>
                              {/* 🔥 PARENT */}
                              <div
                                onClick={() => {
                                  setOpenParent(isOpen ? null : parent.id);
                                }}
                                className="flex items-center justify-between px-2 py-2 rounded-md cursor-pointer font-semibold text-gray-700 hover:bg-gray-100"
                              >
                                <span>{parent.name?.en}</span>

                                <span
                                  className={`transition-transform ${
                                    isOpen ? "rotate-90" : ""
                                  }`}
                                >
                                  <img
                                    src="/arrow-right.png"
                                    className="w-3 h-3"
                                  />
                                </span>
                              </div>

                              {/* 🔥 CHILDREN */}
                              <AnimatePresence>
                                {isOpen && (
                                  <motion.ul
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="ml-3 mt-2 space-y-1 overflow-hidden"
                                  >
                                    {parent.children.map((child: any) => {
                                      const categoryName = child.name?.en;

                                      const isActive =
                                        selectedCategory === categoryName;
                                      const isExpanded =
                                        selectedCategory === categoryName;

                                      const subs = getSubs(categoryName);
                                      const hasSub = subs.length > 0;

                                      return (
                                        <li key={child.id}>
                                          {/* 🔥 CHILD */}
                                          <div
                                            onClick={() => {
                                              if (hasSub) {
                                                // 🔥 kalau ada sub → expand
                                                setSelectedCategory(
                                                  categoryName,
                                                );
                                                setSelectedSub(null);
                                              } else {
                                                // 🔥 kalau gak ada → langsung filter
                                                router.push(
                                                  `/${locale}/product?category=${encodeURIComponent(categoryName)}`,
                                                  { scroll: false },
                                                );
                                                setMobileOpen(false);
                                              }
                                            }}
                                            className={`flex items-center justify-between px-2 py-2 rounded-md cursor-pointer ${
                                              isActive
                                                ? "bg-blue-50 text-blue-600"
                                                : "hover:bg-gray-100"
                                            }`}
                                          >
                                            <span>{categoryName}</span>

                                            {hasSub && (
                                              <span
                                                className={`transition-transform ${
                                                  isExpanded ? "rotate-90" : ""
                                                }`}
                                              >
                                                <img
                                                  src="/arrow-right.png"
                                                  className="w-3 h-3"
                                                />
                                              </span>
                                            )}
                                          </div>

                                          {/* 🔥 SUBCATEGORY */}
                                          <AnimatePresence>
                                            {hasSub && isExpanded && (
                                              <motion.ul
                                                initial={{
                                                  height: 0,
                                                  opacity: 0,
                                                }}
                                                animate={{
                                                  height: "auto",
                                                  opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3 overflow-hidden"
                                              >
                                                {subs.map((sub: string) => (
                                                  <li
                                                    key={sub}
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setSelectedSub(sub);
                                                      setMobileOpen(false);
                                                    }}
                                                    className={`cursor-pointer text-sm ${
                                                      selectedSub === sub
                                                        ? "text-blue-600 font-medium"
                                                        : "text-gray-500 hover:text-blue-500"
                                                    }`}
                                                  >
                                                    {sub}
                                                  </li>
                                                ))}
                                              </motion.ul>
                                            )}
                                          </AnimatePresence>
                                        </li>
                                      );
                                    })}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
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
                  {categories.map((parent) => (
                    <li key={parent.id}>
                      {/* PARENT */}
                      <div
                        onClick={() =>
                          setOpenParent(
                            openParent === parent.id ? null : parent.id,
                          )
                        }
                        className="flex items-center justify-between text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide cursor-pointer"
                      >
                        <span>{parent.name?.en}</span>

                        <span
                          className={`transition-transform ${
                            openParent === parent.id ? "rotate-90" : ""
                          }`}
                        >
                          <img src="/arrow-right.png" className="w-3 h-3" />
                        </span>
                      </div>
                      {/* CHILD */}
                      <AnimatePresence initial={false}>
                        {openParent === parent.id && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden space-y-1"
                          >
                            {parent.children.map((child: any) => {
                              const categoryName = child.name?.en;

                              const isActive =
                                selectedCategory === categoryName;
                              const isExpanded =
                                selectedCategory === categoryName;

                              const subs = getSubs(categoryName);
                              const hasSub = subs.length > 0;

                              return (
                                <li key={child.id}>
                                  {/* CHILD */}
                                  <div
                                    onClick={() => {
                                      router.push(
                                        `/${locale}/product?category=${encodeURIComponent(categoryName)}`,
                                        { scroll: false },
                                      );

                                      setTimeout(() => {
                                        document
                                          .getElementById("product-section")
                                          ?.scrollIntoView({
                                            behavior: "smooth",
                                          });
                                      }, 100);
                                    }}
                                    className={`flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-all ${
                                      isActive
                                        ? "bg-blue-50 text-blue-600 font-medium"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                  >
                                    <span>{categoryName}</span>

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

                                  {/* 🔥 SUBCATEGORY */}
                                  <AnimatePresence>
                                    {hasSub && isExpanded && (
                                      <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3 overflow-hidden"
                                      >
                                        {subs.map((sub: string) => (
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
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {paginatedProducts.map((product) =>
                  mode === "machine" ? (
                    <MachineCard
                      key={product.id}
                      product={product}
                      locale={locale}
                    />
                  ) : (
                    <PackagingCard
                      key={product.id}
                      product={product}
                      locale={locale}
                    />
                  ),
                )}
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
