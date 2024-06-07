"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { TProduct } from "../gateway";
import { notFound, useRouter } from "next/navigation";

interface ProductDetailProps {
  product: TProduct;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter();

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full max-w-screen-md flex flex-col relative">
      <div className="aspect-square w-full max-w-96 mx-auto relative">
        <Image src={product!.photo} alt="product img" fill />
      </div>
      <div className="min-h-[20vh]">
        <div className="border-b-2 border-neutral-700 flex items-center gap-3 px-3 py-2 mt-1">
          <div className="relative aspect-square h-8 rounded-full overflow-hidden">
            {product!.user.avatar ? (
              <Image src={product!.user.avatar} alt="user avatar" fill />
            ) : (
              <UserIcon />
            )}
          </div>
          <span className="text-sm">{product!.user.username}</span>
        </div>
        <div className="flex flex-col gap-2 py-5 px-5 text-sm">
          <span className="text-lg">{product!.title}</span>
          <span>{product!.description}</span>
        </div>
      </div>
    </div>
  );
}
