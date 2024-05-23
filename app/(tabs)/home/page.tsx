import ProductList from "@/Components/product-list";
import db from "@/libs/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const NUM_ITEMS_ON_PAGE = 2;

export default async function Products() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: NUM_ITEMS_ON_PAGE,
  });

  return (
    <div className="flex justify-center relative">
      <ProductList initialProducts={products} />
      <Link
        href={"/products/add"}
        className="fixed bottom-20 right-5 size-10 bg-orange-600 rounded-full flex items-center justify-center hover:opacity-80"
      >
        <PlusIcon className="size-8" />
      </Link>
    </div>
  );
}
