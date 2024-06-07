"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import useProductList from "../services";
import { Products } from "../types";
import ProductItem from "./product-item";
import Smooth from "@/Components/smooth";
import { removedProductIdAtom, writeProductStateAtom } from "@/libs/atom";
import { useEffect } from "react";
import CreateProductFormModal from "./create-product-form-modal";
import { useRouter } from "next/navigation";

interface ProductListProps {
  initialProducts: Products;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const writeProductState = useRecoilValue(writeProductStateAtom);
  const { products, observerTrigger, loadingMoreProducts, pageEnd } =
    useProductList(initialProducts);

  useEffect(() => {
    if (writeProductState) {
      document.body.style.overflow = "hidden";
    }
    if (!writeProductState) {
      document.body.style.overflow = "";
    }
  }, [writeProductState]);

  return (
    <Smooth style={{ overflow: writeProductState ? "hidden" : "" }}>
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

      {writeProductState && <CreateProductFormModal />}
    </Smooth>
  );
}
