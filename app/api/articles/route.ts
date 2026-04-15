import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const isProduction = process.env.VERCEL_ENV === "development";
    const articles = await prisma.article.findMany({
      where: isProduction ? { status: "PUBLISHED" } : {},
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        excerpt: true,
        createdAt: true,
      },
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
