import { productDetails } from "@/data/productDetails";

export function getAIProductContext() {
  return Object.values(productDetails).map((product) => ({
    category: product.category,
    description: product.description.en,
    rating: product.rating,
    reviewCount: product.reviewCount,

    variants: product.variants.map((v) => ({
      model: v.model,
      specs: v.specs.reduce((acc: any, spec) => {
        acc[spec.label] = spec.value;
        return acc;
      }, {}),
    })),
  }));
}
