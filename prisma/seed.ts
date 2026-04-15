import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { productDetails } from "../data/productDetails";
import { products } from "../data/Products";

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
  // 🔥 ambil category dulu
  const categories = await prisma.category.findMany();

  await prisma.spec.deleteMany();
  await prisma.image.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  for (const key in productDetails) {
    const product = productDetails[key];

    const slug = slugify(`${product.category}-${product.variants[0].model}`);

    // 🔥 MATCH CATEGORY (pakai slug biar aman)
    const category = categories.find(
      (c) => c.slug === slugify(product.category),
    );

    if (!category) {
      console.log("❌ Category not found:", product.category);
      continue;
    }

    // 🔥 ambil highlight source dari file kedua
    const highlightSource = products.find((p) => p.slug === slug);

    await prisma.product.create({
      data: {
        slug,
        categoryId: category.id, // 🔥 FIX UTAMA
        description: product.description,
        rating: product.rating,
        reviewCount: product.reviewCount,

        variants: {
          create: product.variants.map((variant: any) => {
            const highlightModel = highlightSource?.models.find(
              (m) =>
                m.name.trim().toLowerCase() ===
                variant.model.trim().toLowerCase(),
            );

            const highlightSpecs = highlightModel?.specs ?? [];

            return {
              model: variant.model,

              images: {
                create: variant.images.map((img: any) => ({
                  url: img.url,
                  role: img.role,
                })),
              },

              specs: {
                create: variant.specs.map((spec: any) => ({
                  label: spec.label,
                  value: spec.value,
                  isHighlight: highlightSpecs.some(
                    (h) =>
                      h.label.trim().toLowerCase() ===
                      spec.label.trim().toLowerCase(),
                  ),
                })),
              },
            };
          }),
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
