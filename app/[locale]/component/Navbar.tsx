"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { div } from "framer-motion/client";
type Props = {
  locale: "id" | "en";
  dict: any;
};
export default function Navbar({ locale, dict }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [openProduct, setOpenProduct] = useState(false);
  const [openParent, setOpenParent] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeParent, setActiveParent] = useState<any>(null);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (menuOpen) {
        setMenuOpen(false);
      }
      setScrolled(currentY > 50);
      if (currentY < 50) {
        setShow(true);
      } else if (currentY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, menuOpen]);
  const pathname = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <>
      <nav
        className={`
    fixed top-0 left-0 w-full z-50
    px-8 py-4 flex justify-between items-center
    transition-all duration-500
    ${show ? "translate-y-0" : "-translate-y-full"}
    ${scrolled ? "bg-white" : "bg-transparent"}
  `}
      >
        {/* Bottom Gradient */}
        <div
          className="
      absolute bottom-0 left-0 w-full h-6
      bg-linearr-to-r
      from-black/40 via-white/15 to-black/40
      pointer-events-none
    "
        />
        <a href={`/${locale}`}>
          <img
            src="/BCTI.png"
            className="w-24 sm:w-28 md:w-36 sm:ml-7"
            alt="Logo"
          />
        </a>

        <div
          className={`hidden md:hidden lg:flex space-x-6 my-auto mr-7 transition-colors duration-300 font-bold   ${scrolled ? "font-[MontserratCustom] text-blue-400" : "text-cyan-50 font-[MontserratCustom] [text-shadow:0_1px_2px_rgba(0,0,0,0.75)] "}`}
        >
          <a href={`/${locale}`}>{dict.navbar.home}</a>
          <div className="relative group">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                setActiveParent(categories[0]); // default pertama
              }}
              className={`cursor-pointer transition-colors duration-300 ${scrolled ? "font-[MontserratCustom] text-blue-400" : "text-cyan-50 font-[MontserratCustom] [text-shadow:0_1px_2px_rgba(0,0,0,0.75)] "}`}
            >
              {dict.navbar.product}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className={`
  fixed top-26 left-0 w-full z-50 border-t transition-colors duration-300
  ${scrolled ? "bg-white shadow-xl" : "bg-white/10 backdrop-blur-sm font-[MontserratCustom] [text-shadow:0_1px_2px_rgba(0,0,0,0.75)]"}
`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="max-w-7xl mx-auto flex py-10 px-8 gap-10 ">
                    {/* LEFT: PARENT */}
                    <div className="w-1/4 border-r pr-6">
                      {categories.map((parent) => (
                        <button
                          key={parent.id}
                          onClick={() => setActiveParent(parent)}
                          className={`block w-full text-left py-3 text-sm transition ${
                            activeParent?.id === parent.id
                              ? "text-blue-600 font-semibold"
                              : "text-gray-700 hover:text-blue-500"
                          }`}
                        >
                          {parent.name?.en}
                        </button>
                      ))}
                    </div>

                    {/* RIGHT: CHILD GRID */}
                    <div className="w-3/4 ">
                      <div className="grid grid-cols-3 gap-y-4 gap-x-10 ">
                        {activeParent?.children?.map((child: any) => (
                          <Link
                            key={child.id}
                            href={`/${locale}/product?category=${encodeURIComponent(child.name?.en)}`}
                            className={`text-md transition ${scrolled ? "text-blue-400" : "text-blue-50"}`}
                            scroll={false}
                          >
                            {child.name?.en}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a href={`/${locale}/about`}>{dict.navbar.about}</a>
          <div className="flex border rounded overflow-hidden text-sm">
            <Link
              href={redirectedPathName("id")}
              className={`px-2 py-1 ${
                locale === "id" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
              }`}
            >
              ID
            </Link>
            <Link
              href={redirectedPathName("en")}
              className={`px-2 py-1 ${
                locale === "en" ? "bg-blue-500 text-white" : "hover:bg-blue-100"
              }`}
            >
              EN
            </Link>
          </div>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
        >
          <span
            className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
              mobileOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
              mobileOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </nav>
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50">
            {/* BACKDROP */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* SIDEBAR */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl"
            >
              <div className="h-full overflow-y-auto overscroll-contain">
                {/* HEADER */}
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="font-bold text-lg">Menu</span>
                  <button onClick={() => setMobileOpen(false)}>✕</button>
                </div>

                {/* HOME */}
                <div className="py-4">
                  <a href={`/${locale}`} className="pl-4 block">
                    {dict.navbar.home}
                  </a>
                </div>

                {/* PRODUCT */}
                <div className="py-2">
                  <button
                    onClick={() => setOpenProduct(!openProduct)}
                    className="w-full flex justify-between items-center px-4 py-3"
                  >
                    {dict.navbar.product}
                    <img
                      src="/arrow-right.png"
                      className={`transition w-4 h-4 ${openProduct ? "rotate-90" : ""}`}
                    />
                  </button>

                  {/* LIST PARENT */}
                  <AnimatePresence>
                    {openProduct && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        {categories.map((parent) => (
                          <div key={parent.id}>
                            {/* PARENT */}
                            <button
                              onClick={() =>
                                setOpenParent(
                                  openParent === parent.id ? null : parent.id,
                                )
                              }
                              className="w-full flex justify-between items-center px-6 py-3 text-sm font-semibold"
                            >
                              {parent.name?.en}
                              <img
                                src="/arrow-right.png"
                                className={`transition w-4 h-4 ${
                                  openParent === parent.id ? "rotate-90" : ""
                                }`}
                              />
                            </button>

                            {/* CHILD */}
                            <AnimatePresence>
                              {openParent === parent.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.4 }}
                                  className="bg-gray-50"
                                >
                                  {parent.children?.map((child: any) => (
                                    <motion.div
                                      key={child.id}
                                      initial={{ x: 20, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      exit={{ x: 20, opacity: 0 }}
                                      transition={{ duration: 0.4 }}
                                    >
                                      <Link
                                        key={child.id}
                                        href={`/${locale}/product?category=${encodeURIComponent(child.name?.en)}`}
                                        className="block px-8 py-2 text-sm"
                                        onClick={() => setMobileOpen(false)}
                                        scroll={false}
                                      >
                                        {child.name?.en}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* ABOUT */}
                <div className="py-4">
                  <a href={`/${locale}/about`} className="pl-4 block">
                    {dict.navbar.about}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
