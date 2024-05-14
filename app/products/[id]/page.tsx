import FormBtn from "@/Components/form-btn";
import db from "@/libs/db";
import { getSession } from "@/libs/getSession";
import { formatToWon } from "@/libs/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  photo: string;
  createdAt: Date;
  updateAt: Date;
  userId: number;
}

const checkProductId = (id: string) => {
  if (!Number(id)) notFound();
};

const getProduct = async (id: number) => {
  return await db.product.findUnique({
    where: {
      id,
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
};

export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  checkProductId(id);

  const product = await getProduct(Number(id));

  if (!product) {
    notFound();
  }

  const session = await getSession();

  return (
    <div className="w-full max-w-screen-md flex flex-col relative">
      <div className="aspect-square w-full max-w-screen-sm mx-auto relative">
        <Image src={product.photo} alt="product img" fill />
      </div>
      <div className="min-h-[20vh]">
        <div className="border-b-2 border-neutral-700 flex items-center gap-3 px-3 py-2 mt-1">
          <div className="relative aspect-square h-8 rounded-full overflow-hidden">
            {product.user.avatar ? (
              <Image src={product.user.avatar} alt="user avatar" fill />
            ) : (
              <UserIcon />
            )}
          </div>
          <span className="text-sm">{product.user.username}</span>
        </div>
        <div className="flex flex-col gap-2 py-5 px-5 text-sm">
          <span className="text-lg">{product.title}</span>
          <span>{product.description}</span>
        </div>
      </div>
      <div className="fixed bottom-0 left-[50%] -translate-x-1/2 w-full max-w-screen-md bg-black flex items-center justify-between py-5 px-5 rounded-t-3xl ">
        <span className="text-sm">{`${formatToWon(product.price)}원`}</span>
        {session.id === product.userId ? (
          <div className="primary-btn w-max px-2 bg-red-500 text-base">
            삭제
          </div>
        ) : null}
        <span className="text-sm text-orange-600">채팅하기</span>
      </div>
    </div>
  );
}
