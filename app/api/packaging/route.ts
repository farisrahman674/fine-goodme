import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const data = await prisma.packagingProduct.findMany({
    include: {
      category: true,

      variants: {
        include: {
          images: true,
        },
      },
    },

    orderBy: {
      createdAt: "asc",
    },
  });

  const formatted = data.map((p) => {
    const variant = p.variants?.[0];

    const productImage =
      variant?.images?.find((img) => img.role === "IMAGE_PRODUCT")?.url || null;

    return {
      id: p.id,

      name: (p.name as any)?.en || "-",
      code: p.code,

      category: p.category
        ? {
            name: p.category.name,
            slug: p.category.slug,
          }
        : null,

      image: productImage,

      capacity: variant?.capacityMl || "-",

      outerSize: variant?.outerSize || "-",

      innerSize: variant?.innerSize || "-",
    };
  });

  return NextResponse.json(formatted);
}
