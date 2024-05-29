"use server";

import { getSession } from "@/libs/session";
import { getUser } from "./gateway";
import { redirect } from "next/navigation";

export async function getUserOnSession() {
  const session = await getSession();

  if (!session.id) {
    session.destroy();
    alert("올바르지 않은 접근입니다.");
    redirect("/login");
  }

  const user = await getUser(session.id);

  if (!user) {
    session.destroy();
    alert("올바르지 않은 접근입니다.");
    redirect("/login");
  }

  return user;
}

export async function handleLogOutForm() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
