import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getInitialProducts } from "./gateway";
import ProductList from "./components/product-list";

export const NUM_ITEMS_ON_PAGE = 2;

export default async function Products() {
  const initialProducts = await getInitialProducts();

  return (
    <div className="flex justify-center relative">
      <ProductList initialProducts={initialProducts} />
      <Link
        href={"/products/add"}
        className="fixed bottom-20 right-5 size-10 bg-orange-600 rounded-full flex items-center justify-center hover:opacity-80"
      >
        <PlusIcon className="size-8" />
      </Link>
    </div>
  );
}
