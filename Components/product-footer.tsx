import { TProduct } from "@/app/(tabs)/home/@modal/(..)products/[id]/gateway";
import db from "@/libs/db";
import { getSession } from "@/libs/session";

import { formatToWon } from "@/libs/utils";
import { redirect } from "next/navigation";

interface ProductFooterProps {
  sessionId?: number;
  product: TProduct;
}

export default function ProductFooter({
  sessionId,
  product,
}: ProductFooterProps) {
  async function createChatRoom() {
    "use server";
    const session = await getSession();

    const chatRoom = await db.chatRoom.create({
      data: {
        productId: product?.id!,
        users: {
          connect: [{ id: session.id }, { id: product?.userId }],
        },
      },
      select: {
        id: true,
      },
    });

    redirect(`/chat/${chatRoom.id}`);
  }

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-screen-md bg-neutral-800 flex items-center justify-between py-5 px-5 rounded-t-3xl sm:text-lg">
      <span className="text-sm">{`${formatToWon(product!.price)}원`}</span>
      {sessionId === product!.userId! && (
        <div className="primary-btn w-max px-2 bg-red-500 text-base">삭제</div>
      )}
      <form action={createChatRoom}>
        <button className="text-sm text-orange-600">채팅하기</button>
      </form>
    </div>
  );
}
