import db from "@/libs/db";
import { Prisma } from "@prisma/client";

export type ChatRooms = Prisma.PromiseReturnType<typeof getChatrooms>

export async function getChatrooms(userId: number) {
  return await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      users: true,
      Message: true,
    },
  });
}
