import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// GET BY ID
export async function GET(
  req: Request,
  { params }: { params: { code: string } },
) {
  const data = await prisma.packagingProduct.findFirst({
    where: { code: params.code },
    include: {
      category: true,

      variants: {
        include: {
          images: true,
        },
      },
    },
  });

  return NextResponse.json(data);
}
