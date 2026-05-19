export function getMachineSubCategories(
  products: any[],
  category: string
) {
  return Array.from(
    new Set(
      products
        .filter(
          (p) =>
            p.category?.name?.en === category &&
            Array.isArray(p.subCategory)
        )
        .flatMap((p) => p.subCategory.map((sub: any) => sub?.en))
        .filter(Boolean)
    )
  );
}