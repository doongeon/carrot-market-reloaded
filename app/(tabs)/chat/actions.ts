"use server";

import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { getChatrooms } from "./gateway";

export async function getChatroomsViaSession() {
  const session = await getSession();

  if (!session.id) redirect("/login");

  return await getChatrooms(session.id);
}

export async function getUserIdViaSession() {
  const session = await getSession();

  if (!session.id) redirect("/login");

  return session.id;
}