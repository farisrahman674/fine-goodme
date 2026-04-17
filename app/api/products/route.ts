import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const isProduction = process.env.VERCEL_ENV === "development";
  console.log(isProduction);

  const products = await prisma.product.findMany({
    where: isProduction ? { status: "ACTIVE" } : {},
    include: {
      category: true, // 🔥 FIX
      variants: {
        include: {
          images: true,
          specs: true,
        },
      },
    },
  });

  const formatted = products.map((product: any) => ({
    slug: product.slug,

    category: product.category
      ? {
          name: product.category.name,
          slug: product.category.slug,
        }
      : null,

    subCategory: product.subCategory,
    description: product.description,
    rating: product.rating,
    reviewCount: product.reviewCount,

    variants: product.variants.map((variant: any) => ({
      model: variant.model,
      images: variant.images.map((img: any) => ({
        url: img.url,
        role: img.role,
      })),
      specs: variant.specs.map((spec: any) => ({
        label: spec.label,
        value: spec.value,
        isHighlight: spec.isHighlight,
      })),
    })),
  }));

  return NextResponse.json(formatted);
}
