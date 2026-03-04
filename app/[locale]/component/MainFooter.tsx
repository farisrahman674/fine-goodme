import Image from "next/image";
type Props = {
  dict: any;
};
export default function Mainfooter({ dict }: Props) {
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
              <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-blue-100 cursor-pointer transition">
                <img src="/instagram.png" alt="" />
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
              {dict.footer.company.map((item: string, index: number) => (
                <li key={index} className="hover:text-blue-600 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Kontak */}
          <div className="md:border-l md:pl-10 border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              {dict.footer.contactTitle}
            </h3>

            <div className="space-y-4 text-gray-600">
              <p>
                Daan Mogot City Apartment, Jalan Kampung Duri Semanan,
                <br />
                RT09/RW01, Semanan Kel., Kali Deres, Jakarta Barat, 11850,
                Indonesia
              </p>

              <p className="hover:text-blue-600 cursor-pointer">085232302470</p>

              <p className="hover:text-blue-600 cursor-pointer">
                cs.aftersales@bcti.co.id
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
