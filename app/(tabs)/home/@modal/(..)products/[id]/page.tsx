import Image from "next/image";
import Modal from "./modal";
import db from "@/libs/db";
import { NotFound } from "@aws-sdk/client-s3";
import { notFound } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/solid";
import { formatToWon } from "@/libs/utils";

async function getProduct(productId: number) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  return product;
}

export default async function InterceptProducts({
  params: { id: productId },
}: {
  params: { id: number };
}) {
  const product = await getProduct(Number(productId));

  if (!product) notFound();

  return (
    <Modal>
      <div className="w-full max-w-screen-sm aspect-[1/1.5] sm:aspect-[1/1.2] bg-black opacity-100 overflow-hidden flex flex-col gap-4 items-center overflow-y-scroll">
        <div className="relative w-full aspect-square">
          <Image src={product?.photo!} alt="product photo" fill />
        </div>
        <div className="w-full flex flex-col gap-3 px-3 pb-5">
          <div className="w-full flex gap-3 justify-start px-2">
            <div className="relative aspect-square h-6 rounded-full overflow-hidden">
              {product.user.avatar ? (
                <Image src={product.user.avatar} alt="user avatar" fill />
              ) : (
                <UserIcon />
              )}
            </div>
            <span>{product.user.username}</span>
          </div>
          <h1>{product.title}</h1>
          <div className="border-t-2 white py-2 break-words">
            {product.description}
          </div>
        </div>
      </div>
      <div className="fixed z-[100] w-full bottom-0 left-0 h-10 bg-neutral-800 flex justify-between items-center p-5 rounded-t-lg">
        <span>{formatToWon(product.price)}원</span>
        <span className="text-orange-600">채팅하기</span>
      </div>
    </Modal>
  );
}
