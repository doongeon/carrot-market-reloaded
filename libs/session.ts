import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface Session {
  id?: number;
  username?: string;
  avatar?: string | null;
}

export const getSession = async () => {
  return await getIronSession<Session>(cookies(), {
    cookieName: "orange-cookie",
    password: process.env.COOKIE_PW!,
  });
};

export async function saveUserOnSession({
  userId,
  username = "",
  avatar = "",
}: {
  userId: number;
  username?: string;
  avatar?: string | null;
}) {
  const session = await getSession();

  session.id = userId;
  session.username = username;
  session.avatar = avatar;

  await session.save();
}
