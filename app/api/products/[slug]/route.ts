import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      variants: {
        include: {
          images: true,
          specs: true,
        },
      },
    },
  });

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
  const formatted = {
    id: product.id,
    category: product.category,
    description: product.description,
    rating: product.rating,
    reviewCount: product.reviewCount,
    variants: product.variants.map((variant: any) => ({
      model: variant.model,
      image: variant.images.map((img: any) => ({
        id: img.id,
        url: img.url,
        role: img.role,
      })),
      specs: variant.specs.map((spec: any) => ({
        id: spec.id,
        variantId: spec.variantId,
        label: spec.label,
        value: spec.value,
        isHighlight: spec.isHighlight,
      })),
    })),
  };

  return NextResponse.json(formatted);
}
