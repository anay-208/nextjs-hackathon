import { getCategory } from "@/actions/finance/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function CategoryHeader({
  data,
}: {
  data: Promise<NonNullable<Awaited<ReturnType<typeof getCategory>>>>;
}) {
  const categoryData = await data;
  return (
    <div className="flex items-center gap-1">
      <Link href={"/finance"}>
        <Button className="text-fg/90 h-8 px-2" size="sm" variant="ghost">
          Finance
        </Button>
      </Link>
      <div className="text-muted/50">/</div>

      <Button className="text-fg/90 h-8 px-2" size="sm" variant="ghost">
        Category
      </Button>
      <Link href={`/finance/category/${categoryData?.data?.id}`}>
        <Button className="text-fg/90 h-8 px-2" size="sm" variant="ghost">
          {categoryData?.data?.label}
        </Button>
      </Link>
    </div>
  );
}
