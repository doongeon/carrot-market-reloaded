"use server";

import db from "@/libs/db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { formSchema } from "./validation";
import { getSession } from "@/libs/getSession";

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const zodResult = await formSchema.safeParseAsync(data);

  if (!zodResult.success) {
    return zodResult.error.flatten();
  }

  // create account
  const user = await db.user.create({
    data: {
      username: zodResult.data.userName,
      email: zodResult.data.email,
      password: await bcrypt.hash(zodResult.data.password, 12),
    },
    select: {
      id: true,
    },
  });

  const session = await getSession();
  session.id = user.id;
  session.save();

  redirect("/profile");
}
