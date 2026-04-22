import { productDetails } from "@/data/productDetails";

export function getAIProductContext() {
  const result = productDetails.map((product) => {
    const parsedSubCategory =
      typeof product.subCategory === "string"
        ? product.subCategory
        : ((product.subCategory as any)?.[0]?.en ?? null);

    return {
      category: product.category.name.en,
      subCategory: parsedSubCategory,
      description: product.description.en,
      rating: product.rating,
      reviewCount: product.reviewCount,

      variants: product.variants.map((v) => ({
        model: v.model,
        specs: v.specs.map((s) => `${s.label}: ${s.value}`).join(", "),
      })),
    };
  });

  console.log("FINAL RESULT:", result); // 👈 optional

  return result;
}
