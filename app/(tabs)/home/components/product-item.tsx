"use client";

import { removedProductIdAtom } from "@/libs/atom";
import { formatToTimeAge, formatToWon } from "@/libs/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";

interface ProductItemProps {
  id: number;
  title: string;
  photo: string;
  createdAt: Date;
  price: number;
}

export default memo(ProductItem);

function ProductItem({ id, title, photo, createdAt, price }: ProductItemProps) {
  const router = useRouter();

  return (
    <motion.div
      key={id}
      className="w-full flex gap-5 items-center bg-neutral-800 rounded-md py-3 px-3 hover:bg-neutral-700 transition-colors duration-300 cursor-pointer"
      onClick={() => {
        router.push(`/products/${id}`, { scroll: false });
      }}
      transition={{ duration: 0.05 }}
    >
      <div className="relative w-40 aspect-square rounded-md flex items-center justify-center overflow-hidden">
        <Image alt="product img" src={photo} fill quality={10} />
      </div>
      <div className="w-full flex flex-col items-start gap-2">
        <div className="w-full flex flex-col items-start">
          <span className="text-lg">{title}</span>
          <span className="text-xs opacity-50">
            {formatToTimeAge(createdAt)}
          </span>
        </div>
        <span className="text-sm">{formatToWon(price)}원</span>
      </div>
    </motion.div>
  );
}
