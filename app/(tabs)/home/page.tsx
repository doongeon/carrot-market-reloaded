
import { getInitialProducts } from "./gateway";
import ProductList from "./components/product-list";
import TopBar from "@/Components/top-bar";

export const NUM_ITEMS_ON_PAGE = 2;

export default async function Products() {
  const initialProducts = await getInitialProducts();

  return (
    <div className="flex flex-col gap-5 justify-center relative">
      <TopBar title="마켓" />
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
