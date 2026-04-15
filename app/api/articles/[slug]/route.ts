import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const isDev = process.env.VERCEL_ENV === "development";

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

    // protect draft di production
    if (!isDev && article.status !== "PUBLISHED") {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
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
