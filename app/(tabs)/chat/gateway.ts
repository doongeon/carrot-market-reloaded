import db from "@/libs/db";

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
      product: true,
      Message: true,
    },
  });
}
