import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany();

  // 🔥 bikin tree (parent → children)
  const parents = categories.filter((c) => !c.parentId);

  const tree = parents.map((parent) => ({
    ...parent,
    children: categories.filter((c) => c.parentId === parent.id),
  }));

  return NextResponse.json(tree);
}
