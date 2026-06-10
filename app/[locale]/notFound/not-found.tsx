"use client";

import Image from "next/image";
import Hero from "@/app/[locale]/component/hero/HeroSlider";
import Link from "next/link";
type Props = {
  dict: any;
  locale: "id" | "en";
};
export default function NotFound({ dict, locale }: Props) {
  return (
    <main>
      <Hero dict={dict} locale={locale} />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Beruang */}
        <div className="flex justify-center">
          <Image
            src="/icon/maskot.png"
            alt="404 Bear"
            width={500}
            height={500}
            priority
          />
        </div>

        {/* Text */}
        <div>
          <Image
            src="/icon/notFound.png"
            alt="404"
            width={350}
            height={150}
            className="mb-4"
          />

          <h2 className="text-2xl font-semibold mb-4">
            Oops! Halaman Tidak Ditemukan (404)
          </h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Sepertinya Anda tersesat di dunia pembekuan. Halaman yang Anda cari
            tidak dapat ditemukan, mungkin telah dipindahkan atau tautannya
            rusak. Kami mohon maaf atas ketidaknyamanan ini.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition"
            >
              KEMBALI KE BERANDA
            </Link>

            <Link
              href="/product"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-medium transition"
            >
              LIHAT DAFTAR PRODUK
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
