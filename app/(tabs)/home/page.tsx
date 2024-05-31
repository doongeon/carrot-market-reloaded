
import { getInitialProducts } from "./gateway";
import ProductList from "./components/product-list";
import TopBar from "@/Components/top-bar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "마켓",
};


export default async function Products() {
  const initialProducts = await getInitialProducts();

  return (
    <div className="flex flex-col gap-5 justify-center relative">
      <TopBar title="마켓" />
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
