import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center px-4 py-30">
      {/* Beruang */}
      <div className="flex justify-center">
        <Image
          src="/icon/maskot.png"
          alt="404 Bear"
          width={500}
          height={500}
          priority
          className="w-64 md:w-80 lg:w-125 h-auto"
        />
      </div>

      {/* Text */}
      <div className="text-center lg:text-left">
        <Image
          src="/icon/notFound.png"
          alt="404"
          width={350}
          height={150}
          className="mx-auto lg:mx-0 w-40 md:w-56 lg:w-87.5 h-auto"
        />

        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          Oops! Halaman Tidak Ditemukan
        </h2>

        <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
          Halaman yang Anda cari tidak dapat ditemukan, mungkin telah
          dipindahkan atau tautannya rusak. Kami mohon maaf atas ketidaknyamanan
          ini.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition text-center"
          >
            KEMBALI KE BERANDA
          </Link>

          <Link
            href="/id/product"
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-medium transition text-center"
          >
            LIHAT DAFTAR PRODUK
          </Link>
        </div>
      </div>
    </div>
  );
}
