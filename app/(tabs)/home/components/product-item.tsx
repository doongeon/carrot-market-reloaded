import { formatToTimeAge, formatToWon } from "@/libs/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface ProductItemProps {
  id: number;
  title: string;
  photo: string;
  createdAt: Date;
  price: number;
}

export default function ProductItem({
  id,
  title,
  photo,
  createdAt,
  price,
}: ProductItemProps) {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.01, 0.99, 1],
    [0.1, 1, 1, 0.1]
  );

  return (
    <motion.div
      ref={ref}
      key={id}
      className="w-full flex gap-5 items-center bg-neutral-800 rounded-md  py-3 px-3 hover:bg-neutral-900 focus:bg-neutral-900 cursor-pointer"
      style={{
        transition: "linear 0.2s",
        opacity,
      }}
      onClick={() => {
        router.push(`/products/${id}`, { scroll: false });
      }}
      transition={{duration: 0.05}}
    >
      <div className="w-40 aspect-square rounded-md flex items-center justify-center overflow-hidden">
        <Image alt="product img" src={photo} width={200} height={200} />
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
