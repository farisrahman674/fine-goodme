export function filterMachine(
  products: any[],
  selectedCategory: string,
  selectedSub: string | null,
  allLabel: string
) {
  return products.filter((product) => {
    const matchCategory =
      selectedCategory === allLabel ||
      product.category?.name?.en === selectedCategory;

    let subValues: string[] = [];

    if (Array.isArray(product.subCategory)) {
      subValues = product.subCategory.map((sub: any) => sub?.en);
    }

    const matchSub = !selectedSub || subValues.includes(selectedSub);

    return matchCategory && matchSub;
  });
}