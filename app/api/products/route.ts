import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      variants: {
        include: {
          images: true,
          specs: true,
        },
      },
    },
  });

  const formatted = products.map((product) => ({
    slug: product.slug,
    category: product.category,
    description: product.description,
    rating: product.rating,
    reviewCount: product.reviewCount,
    variants: product.variants.map((variant) => ({
      model: variant.model,
      image: variant.images.map((img) => img.url),
      specs: variant.specs.map((spec) => ({
        label: spec.label,
        value: spec.value,
        isHighlight: spec.isHighlight,
      })),
    })),
  }));

  return NextResponse.json(formatted);
}
