"use client";

import { motion } from "framer-motion";
import useDeleteProduct from "../hooks/useDeleteProduct";
import { useSetRecoilState } from "recoil";
import { pageExitAtom, pageToAtom } from "@/libs/atom";
import { useRouter } from "next/navigation";

interface DeleteProductModalProps {
  productId: number;
  productOwnerId: number;
  setDeleteProductState: (modalState: boolean) => void;
}

export default function DeleteProductModal({
  productId,
  productOwnerId,
  setDeleteProductState,
}: DeleteProductModalProps) {
  const { onClickDeleteProduct } = useDeleteProduct({
    productId,
    productOwnerId,
    setDeleteProductState,
  });
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full z-20 bg-[rgba(0,0,0,0.3)] flex flex-col justify-center items-center"
    >
      <div className="flex flex-col gap-10 items-center bg-neutral-800 px-10 py-10 rounded-md">
        <span>정말로 삭제하시겠습니까?</span>
        <div className="w-full flex gap-5">
          <button
            className="w-full border border-neutral-500 rounded-md"
            onClick={() => {
              setDeleteProductState(false);
            }}
          >
            취소
          </button>
          <button
            className="w-full bg-red-500 rounded-md"
            onClick={(e) => {
              e.stopPropagation();
              onClickDeleteProduct();
            }}
          >
            삭제
          </button>
        </div>
      </div>
    </motion.div>
  );
}
