import Image from "next/image";
import Link from "next/link";

export default function PackagingCard({ product, locale }: any) {
  return (
    <Link
      href={`/${locale}/product/packaging/${product.code}`}
      className="block"
    >
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden">
        {/* IMAGE */}
        <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center">
          {product.image && (
            <Image
              src={product.image}
              alt="packaging"
              fill
              className="object-contain p-6"
            />
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4 text-sm">
          {/* CODE */}
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">Name Product</span>
            <span className="font-bold">{product.name}</span>
          </div>

          {/* SPECS */}
          <div className="space-y-2 mt-2 font-bold">
            <div className="flex justify-between border-b py-2">
              <span className="text-gray-500">Capacity</span>
              <span className="font-bold">
                {product.capacity === "-" ? "-" : `${product.capacity} ml`}
              </span>
            </div>

            <div className="flex justify-between border-b py-2">
              <span className="text-gray-500">Outer</span>
              <span className="font-bold">{product.outerSize}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-gray-500">Inner</span>
              <span className="font-bold">{product.innerSize}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
