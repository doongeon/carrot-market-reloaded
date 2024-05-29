"use client";

import { formatToTimeAge, formatToWon } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import useProductList from "../services";
import { Products } from "../types";

interface ProductListProps {
  initialProducts: Products;
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const { products, observerTrigger, loadingMoreProducts, pageEnd } =
    useProductList(initialProducts);

  return (
    <div className="w-full flex flex-col gap-1 items-center mb-20">
      <div className="w-full flex flex-col gap-2 sm:grid sm:grid-cols-2 items-center mb-12 place-items-center">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="w-full flex gap-5 items-center bg-neutral-800 rounded-md  py-3 px-3 hover:opacity-80 "
            >
              <div className="w-40 aspect-square rounded-md flex items-center justify-center overflow-hidden">
                <Image
                  alt="product img"
                  src={product.photo}
                  width={200}
                  height={200}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="w-full flex flex-col">
                  <span className="text-lg">{product.title}</span>
                  <span className="text-xs opacity-50">
                    {formatToTimeAge(product.createdAt)}
                  </span>
                </div>
                <span className="text-sm">{formatToWon(product.price)}원</span>
              </div>
            </Link>
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
  );
}
