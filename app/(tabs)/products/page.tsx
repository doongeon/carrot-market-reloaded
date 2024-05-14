import ProductList from "@/Components/product-list";
import db from "@/libs/db";

export const NUM_ITEMS_ON_PAGE = 2;

export default async function Products() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: NUM_ITEMS_ON_PAGE,
  });

  return (
    <div className="flex justify-center">
      <ProductList initialProducts={products} />
    </div>
  );
}
