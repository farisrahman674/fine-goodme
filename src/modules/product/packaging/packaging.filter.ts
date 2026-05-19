export function filterPackaging(
  products: any[],
  selectedCategory: string,
  allLabel: string,
) {
  return products.filter((product) => {
    return (
      selectedCategory === allLabel ||
      product.category?.name?.en === selectedCategory
    );
  });
}