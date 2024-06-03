"use server";

import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { getCahcedChatRoom, getChatRoom } from "./gateway";

export async function getUserOnSession() {
  const user = await getSession();

  if (!user.id) redirect("/login");

  return user;
}

export async function getChatroomViaParams(chatroomId: string) {
  const session = await getUserOnSession();
  if (!session.id) redirect("/login");

  const chatroom = await getCahcedChatRoom(chatroomId);
  if (!chatroom) redirect("/chat");

  const ok = Boolean(chatroom?.users.find((user) => user.id === session.id));
  if (!ok) redirect("/login");

  return chatroom;
}
