"use client";

import { useRecoilState, useRecoilValue } from "recoil";
import useProductList from "../services";
import { Products } from "../types";
import ProductItem from "./product-item";
import Smooth from "@/Components/smooth";
import { pageExitAtom, pageToAtom, writeProductStateAtom } from "@/libs/atom";
import { AnimatePresence, motion } from "framer-motion";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ChangeEvent, useEffect, useState } from "react";
import {
  deleteS3Object,
  getAWSClient,
  getObjectURL,
  postS3Object,
} from "@/libs/aws";
import { handleProductForm } from "../actions";
import { z } from "zod";
import CreateProductFormModal from "./create-product-form-modal";

export const TITLE_MAX_LENGTH = 30;
export const DESCRIPTION_MAX_LENGTH = 200;
export const MAX_PRICE = 10000000;

const formSchema = z.object({
  photo: z.string().min(1, "이미지를 추가해 주세요"),
  title: z
    .string()
    .min(1, "비어있어요.")
    .max(TITLE_MAX_LENGTH, `최대 ${TITLE_MAX_LENGTH}글자에요.`),
  price: z.coerce
    .number({ message: "가격을 적어주세요" })
    .min(1, "가격을 적어주세요")
    .max(MAX_PRICE, `최대 ${MAX_PRICE}원이에요.`),
  description: z
    .string()
    .min(1, "비어있어요.")
    .max(DESCRIPTION_MAX_LENGTH, `최대 ${DESCRIPTION_MAX_LENGTH}글자에요.`),
});

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
