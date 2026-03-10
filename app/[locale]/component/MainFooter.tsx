import Image from "next/image";
import Link from "next/link";
type Props = {
  dict: any;
  locale: "id" | "en";
};
export default function Mainfooter({ dict, locale }: Props) {
  return (
    <section className="w-full bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 ">
              <div className="w-48 rounded-full">
                <img
                  src="/ChatGPT Image Feb 13, 2026, 10_34_15 AM.png"
                  alt=""
                />
              </div>
              <h2 className="text-sm w-full font-bold text-blue-700">
                Bestone Cold Technology Indonesia
              </h2>
            </div>

            <p className="mt-4 text-gray-600 leading-relaxed">
              {dict.footer.tagline}
            </p>

            <p className="mt-4 italic text-gray-500">{dict.footer.motto}</p>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <div className=" flex items-center justify-center rounded-full cursor-pointer transition gap-2 ">
                <img src="/icon/instagram.png" alt="" className="w-10 h-10" />

                <img src="/icon/linkedin.png" alt="" className="w-10 h-10" />
              </div>
            </div>
          </div>

          {/* Column 2 — Produk */}
          <div className="md:border-l md:pl-10 border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              {dict.footer.productTitle}
            </h3>
            <ul className="space-y-3 text-gray-600">
              {dict.footer.products.map((item: string, index: number) => (
                <li key={index} className="hover:text-blue-600 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Perusahaan */}
          <div className="md:border-l md:pl-10 border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              {dict.footer.companyTitle}
            </h3>
            <ul className="space-y-3 text-gray-600">
              {dict.footer.company.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={`/${locale}/${item.href}`}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>

          {/* Column 4 — Kontak */}
          <div className="md:border-l md:pl-10 border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              {dict.footer.contactTitle}
            </h3>

            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-3">
                <img src="/icon/map.png" alt="" className="w-5 h-5 mt-1" />
                <p>
                  Jalan Kawasan Industri (Bayur) Lantai F1-1F, Desa/Kelurahan
                  PeriukJaya,
                  <br />
                  Kec. Periuk, Kota Tangerang, Provinsi Banten,Kode Pos: 15131
                </p>
              </div>

              <a
                href="https://wa.me/6282118143155"
                className="flex items-center gap-3 hover:text-blue-600"
              >
                <img src="/icon/whatsapp.png" alt="" className="w-5 h-5" />
                <p className="cursor-pointer">082118143155</p>
              </a>
              <a
                href=""
                className="flex items-center gap-3 hover:text-blue-600"
              >
                <img src="/icon/communication.png" alt="" className="w-5 h-5" />
                <p className="hover:text-blue-600 cursor-pointer">
                  cs.aftersales@bcti.co.id
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
