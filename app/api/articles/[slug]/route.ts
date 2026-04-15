import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        slug: params.slug,
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch article" },
      { status: 500 },
    );
  }
}
