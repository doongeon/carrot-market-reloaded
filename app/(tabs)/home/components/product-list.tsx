"use client";

import useProductList from "../services";
import { Products } from "../types";
import ProductItem from "./product-item";
import Smooth from "@/Components/smooth";

interface ProductListProps {
  initialProducts: Products;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const { products, observerTrigger, loadingMoreProducts, pageEnd } =
    useProductList(initialProducts);

  return (
    <Smooth>
      <div className="w-full flex flex-col gap-1 items-center mb-20">
        <div className="w-full flex flex-col gap-2 sm:grid sm:grid-cols-2 items-center mb-12 place-items-center">
          {products.map((product) => {
            return (
              <ProductItem
                key={product.id}
                id={product.id}
                title={product.title}
                photo={product.photo}
                price={product.price}
                createdAt={product.createdAt}
              />
            );
          })}
        </div>
        {pageEnd ? (
          <div>다 봤어요...</div>
        ) : (
          <button
            ref={observerTrigger}
            className={`${
              loadingMoreProducts ? "disable-btn" : "primary-btn"
            } w-1/2 max-w-screen-sm rounded-md text-sm font-normal`}
          >
            {loadingMoreProducts ? "로딩" : "더 불러오기"}
          </button>
        )}
      </div>
    </Smooth>
  );
}
