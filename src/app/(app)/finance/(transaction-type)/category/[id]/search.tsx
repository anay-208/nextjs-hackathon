import { getCategory } from "@/actions/finance/actions";
import { SearchCategoryFormClient } from "./search.client";

export async function SearchCategoryForm(props: {
  children?: React.ReactNode;
  categoryData: Promise<NonNullable<Awaited<ReturnType<typeof getCategory>>>>;
}) {
  const categoryData = await props.categoryData;
  const id = categoryData?.data?.id;

  return (
    <SearchCategoryFormClient categoryID={id!}>
      {props.children}
    </SearchCategoryFormClient>
  );
}
