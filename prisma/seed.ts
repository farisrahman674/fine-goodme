import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { productDetails } from "../data/productDetails";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function main() {
  const categories = await prisma.category.findMany();

  await prisma.spec.deleteMany();
  await prisma.image.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const product of productDetails) {
    const slug = product.slug;

    // 🔥 ambil category dari name.en
    const categoryName = product.category.name.en;

    const category = categories.find((c) => c.slug === slugify(categoryName));

    if (!category) {
      console.log("❌ Category not found:", categoryName);
      continue;
    }

    await prisma.product.create({
      data: {
        slug,
        categoryId: category.id,
        description: product.description,
        rating: product.rating,
        reviewCount: product.reviewCount,

        variants: {
          create: product.variants.map((variant: any) => ({
            model: variant.model,

            images: {
              create: variant.images,
            },

            specs: {
              create: variant.specs.map((spec: any) => ({
                label: spec.label,
                value: spec.value,
                isHighlight: spec.isHighlight ?? false, // 🔥 dari data langsung
              })),
            },
          })),
        },
      },
    });

    console.log(`✅ Seeded: ${slug}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
