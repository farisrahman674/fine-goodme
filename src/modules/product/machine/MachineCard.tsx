import Image from "next/image";
import Link from "next/link";

export default function MachineCard({ product, locale }: any) {
  const image = product.variants
    ?.flatMap((v: any) => v.images || [])
    ?.find((img: any) => img.role === "IMAGE_PRODUCT")?.url;

  const variant = product.variants?.[0];

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
      <Link href={`/${locale}/product/machine/${product.slug}`}>
        {/* IMAGE */}
        <div className="relative w-full h-64 bg-gray-100 flex items-center justify-center">
          {image && (
            <Image
              src={image}
              alt="product"
              fill
              className="object-contain p-6"
            />
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4 text-sm">
          {/* MODEL */}
          <div className="flex justify-between border-b py-2">
            <span className="text-gray-500">Model</span>
            <span className="font-bold">{variant?.model}</span>
          </div>

          {/* SPECS */}
          <div className="mt-2 font-bold">
            {variant?.specs
              ?.filter((s: any) => s.isHighlight)
              .map((spec: any, i: number) => (
                <div
                  key={i}
                  className="flex justify-between border-b py-2 last:border-none"
                >
                  <span className="text-gray-500">{spec.label}</span>
                  <span>{spec.value}</span>
                </div>
              ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
