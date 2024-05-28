import getProduct from "@/app/(tabs)/home/@modal/(..)products/[id]/action";
import db from "@/libs/db";
import { getSession } from "@/libs/getSession";
import { formatToWon } from "@/libs/utils";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export type Product = Prisma.PromiseReturnType<typeof getProduct>;

interface ProductFooterProps {
  sessionId: number | null;
  product: Product;
}

export default function ProductFooter({
  sessionId,
  product,
}: ProductFooterProps) {

  async function createChatRoom() {
    "use server"
    const session = await getSession();
  
    const chatRoom = await db.chatRoom.create({
      data: {
        users: {
          connect: [
            {id: session.id},
            {id: product?.userId}
          ]
        }
      },
      select: {
        id: true,
      }
    })

    redirect(`/chatroom/${chatRoom.id}`)
  }

  return (
    <div className="fixed bottom-0 left-[50%] -translate-x-1/2 w-full max-w-screen-md bg-black flex items-center justify-between py-5 px-5 rounded-t-3xl ">
      <span className="text-sm">{`${formatToWon(product!.price)}원`}</span>
      {sessionId === product!.userId! ? (
        <div className="primary-btn w-max px-2 bg-red-500 text-base">삭제</div>
      ) : null}
      <form action={createChatRoom}>
        <button className="text-sm text-orange-600">채팅하기</button>
      </form>
    </div>
  );
}
