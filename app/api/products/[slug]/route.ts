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
    variants: product.variants.map((variant) => ({
      model: variant.model,
      image: variant.images.map((img) => ({
        id: img.id,
        url: img.url,
        role: img.role,
      })),
      specs: variant.specs.map((spec) => ({
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

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params;
    const { variantId, url, role } = await req.json();

    if (!variantId || !url || !role) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Pastikan product ada
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { variants: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // Pastikan variant milik product
    const variant = product.variants.find((v) => v.id === variantId);

    if (!variant) {
      return NextResponse.json(
        { message: "Variant not found in this product" },
        { status: 404 },
      );
    }

    const image = await prisma.image.create({
      data: {
        url,
        role,
        variantId,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string; imageId: string } },
) {
  try {
    const { imageId } = params;
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    const image = await prisma.image.update({
      where: { id: imageId },
      data: { url },
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update image" },
      { status: 500 },
    );
  }
}
