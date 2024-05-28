import db from "@/libs/db";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";
import { cache } from "react";

export type ChatRooms = Prisma.PromiseReturnType<typeof getChatrooms>;

export const getCachedChatrooms = nextCache(
  (userId: number) => getChatrooms(userId),
  [`chatrooms`],
  { revalidate: 60 }
);

async function getChatrooms(userId: number) {
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
