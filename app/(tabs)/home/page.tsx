import { getInitialProducts } from "./gateway";
import ProductList from "./components/product-list";
import TopBar from "@/Components/top-bar";
import { Metadata } from "next";
import Smooth from "@/Components/smooth";

export const metadata: Metadata = {
  title: "마켓",
};

export default async function Products() {
  const initialProducts = await getInitialProducts();

  return (
    <>
      <TopBar title="마켓" />
      <div className="flex flex-col gap-5 justify-center relative">
        <ProductList initialProducts={initialProducts} />
      </div>
    </>
  );
}
