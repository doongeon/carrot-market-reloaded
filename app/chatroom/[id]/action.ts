"use server";

import db from "@/libs/db";
import { Prisma } from "@prisma/client";

export type ChatRoom = Prisma.PromiseReturnType<typeof getChatRoom>;

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

export type initialMessages = Prisma.PromiseReturnType<typeof getMessages>;

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
    take: 10,
  });
}

export async function putMessage(payload: string, chatRoomId: string,userId: number) {
  await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId
    }
  })
}
