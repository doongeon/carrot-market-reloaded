"use client";

import { getMoreProducts } from "@/app/(tabs)/products/action";
import { formatToTimeAge, formatToWon } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  photo: string;
  createdAt: Date;
  updateAt: Date;
}

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const trigger = useRef(null);
  const [page, setPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  IntersectionObserver

  useEffect(() => {
    console.log(page);
  }, [page]);

  const handleMore = async () => {
    const moreProducts = await getMoreProducts(page);

    if (moreProducts.length === 0) {
      setPageEnd(true);
      return;
    }

    setProducts((prevProducts) => {
      return [...prevProducts, ...moreProducts];
    });

    setPage(page + 1);
  };

  return (
    <div className="w-full flex flex-col gap-1 items-center mb-20">
      <div className="w-full flex flex-col gap-2 sm:grid sm:grid-cols-2 items-center mb-12 ">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="w-full flex gap-5 items-center bg-neutral-800 rounded-md  py-3 px-3 hover:opacity-80 "
            >
              <div className="size-max rounded-md">
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
      {pageEnd ? <div className="text-neutral-600">다 봤어요...</div>: (
        <button
          ref={trigger}
          onClick={handleMore}
          className="primary-btn w-1/2 max-w-screen-sm rounded-md text-sm font-normal"
        >
          더 불러오기
        </button>
      )}
    </div>
  );
}
