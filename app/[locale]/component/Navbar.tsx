"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
type Props = {
  locale: "id" | "en";
  dict: any;
};
export default function Navbar({ locale, dict }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
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
  }, [lastScrollY]);
  const pathname = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  return (
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
      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`absolute font-bold top-full right-1 w-1/3 bg-white shadow-md lg:hidden flex flex-col items-center text-gray-800 ${scrolled ? "font-[MontserratCustom]" : "font-[MontserratCustom]"}`}
        >
          <a href={`/${locale}`} className="w-full text-center py-4 border-b">
            {dict.navbar.home}
          </a>
          <a
            href={`/${locale}/product`}
            className="w-full text-center py-4 border-b"
          >
            {dict.navbar.product}
          </a>
          <a
            href={`/${locale}/about`}
            className="w-full text-center py-4 border-b"
          >
            {dict.navbar.about}
          </a>
          <div className="flex w-full justify-center  py-4 overflow-hidden text-sm">
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
      )}

      <div
        className={`hidden md:hidden lg:flex space-x-6 my-auto mr-7 transition-colors duration-300 font-bold   ${scrolled ? "font-[MontserratCustom] text-blue-400" : "text-cyan-50 font-[MontserratCustom] [text-shadow:0_1px_2px_rgba(0,0,0,0.75)] "}`}
      >
        <a href={`/${locale}`}>{dict.navbar.home}</a>
        <a href={`/${locale}/product`}>{dict.navbar.product}</a>
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
  );
}
