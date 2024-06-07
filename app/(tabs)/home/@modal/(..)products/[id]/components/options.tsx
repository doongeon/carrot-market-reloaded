"use client";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, Variants, animate, motion } from "framer-motion";
import { useState } from "react";
import DeleteProductModal from "./delete-product-modal";
import { useRouter } from "next/navigation";

const smoothVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 0 },
  exit: { opacity: 0 },
};

interface OptionsProps {
  productId: number;
  productOwnerId: number;
}

export default function Options({ productId, productOwnerId }: OptionsProps) {
  const [optionState, setOptionState] = useState(false);
  const [writeCommentState, setWriteCommentState] = useState(false);
  const [deleteProductState, setDeleteProductState] = useState(false);
  const [updatePostState, setUpdatePostState] = useState(false);
  const router = useRouter();

  const toggleOptionState = () => {
    setOptionState((prev) => !prev);
  };

  const toggleWriteCommentState = () => {
    setWriteCommentState((prev) => !prev);
  };

  return (
    <>
      <motion.div className="relative" variants={smoothVariants}>
        <EllipsisHorizontalIcon
          className="size-6 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleOptionState();
          }}
        />
        {optionState && (
          <motion.div
            variants={smoothVariants}
            className="absolute right-0 w-10 text-xs border border-neutral-500 bg-neutral-500 flex flex-col gap-px"
          >
            <button
              className="bg-black p-1"
              onClick={() => {
                toggleOptionState();
                setUpdatePostState(true);
              }}
            >
              수정
            </button>
            <button
              className="bg-black p-1"
              onClick={(e) => {
                e.stopPropagation();
                setDeleteProductState(true);
              }}
            >
              삭제
            </button>
          </motion.div>
        )}
      </motion.div>

      {deleteProductState && (
        <DeleteProductModal
          productId={productId}
          productOwnerId={productOwnerId}
          setDeleteProductState={setDeleteProductState}
        />
      )}
    </>
  );
}
