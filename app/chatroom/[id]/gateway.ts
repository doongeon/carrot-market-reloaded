"use server";

import db from "@/libs/db";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";

export const getCahcedChatRoom = nextCache(getChatRoom, ["get chatroom"]);

export async function getChatRoom(id: string) {
  return await db.chatRoom.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      users: true,
    },
  });
}

export const getCahcedMessages = nextCache(getMessages, ["get messages"], {
  tags: ["#putMessage"],
});

export async function getMessages(chatRoomId: string) {
  return await db.message.findMany({
    where: {
      chatRoomId: chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });
}

export async function putMessage(
  payload: string,
  chatRoomId: string,
  userId: number
) {
  await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId,
    },
  });

  revalidateTag("#putMessage");
  revalidatePath("/chat", "page");
}
