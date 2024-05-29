import db from "@/libs/db";

export async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      avatar: true,
      created_at: true,
      Product: true,
    },
  });

  return user;
}
