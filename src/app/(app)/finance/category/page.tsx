import { getCategories } from "@/app/api/finance/actions";
import { CategoryData } from "@/app/api/finance/types";
import { CategoryCard } from "./card.client";

export default async function Page() {
  let categories: CategoryData = [];
  const rawCategories = await getCategories();
  if (rawCategories && rawCategories.data) {
    categories = rawCategories.data;
  }

  return (
    <div className="flex min-h-[100svh] w-full flex-col items-center justify-start">
      <h1 className="text-3xl font-bold">Categories</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} data={category} />
        ))}
      </div>
    </div>
  );
}
