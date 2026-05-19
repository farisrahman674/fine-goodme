export function filterProducts({
  products,
  selectedCategory,
  selectedSub,
  allLabel,
}: {
  products: any[];
  selectedCategory: string;
  selectedSub?: string | null;
  allLabel: string;
}) {
  // ALL
  if (selectedCategory === allLabel) {
    return products;
  }

  return products.filter((product) => {
    const categoryMatch =
      product.category?.name?.en === selectedCategory;

    // 🔥 no subcategory
    if (!selectedSub) {
      return categoryMatch;
    }

    // 🔥 packaging gak punya subcategory
    if (!product.subCategory) {
      return categoryMatch;
    }

    // 🔥 machine punya subcategory
    return (
      categoryMatch &&
      product.subCategory?.en === selectedSub
    );
  });
}