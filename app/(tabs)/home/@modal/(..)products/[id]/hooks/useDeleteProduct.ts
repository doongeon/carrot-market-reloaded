"use client";

import { removedProductIdAtom } from "@/libs/atom";
import { useSetRecoilState } from "recoil";
import { handleDeleteProduct } from "../actions";
import { useRouter } from "next/navigation";

interface useDeletePostModalProps {
  productId: number;
  productOwnerId: number;
  setDeleteProductState: (modalState: boolean) => void;
}

export default function useDeleteProduct({
  productId,
  productOwnerId,
  setDeleteProductState,
}: useDeletePostModalProps) {
  const setRemovedProductId = useSetRecoilState(removedProductIdAtom);
  const router = useRouter();
  const onClickDeleteProduct = async () => {
    const product = await handleDeleteProduct(productId, productOwnerId);

    if (!product) {
      alert("fail delete");
      return;
    }

    setRemovedProductId(product.id);
    router.back();
  };

  return { onClickDeleteProduct };
}
