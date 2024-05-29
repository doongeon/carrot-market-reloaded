"use server";

import bcryp from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getUser, isUserExist } from "./gateway";
import { getLoginFormError } from "./services";
import { saveUserOnSession } from "@/libs/session";

const formSchema = z.object({
  email: z.string().email().refine(isUserExist, "등록되지 않은 이메일 입니다."),
  password: z.string().min(8),
});

export const handleLoginForm = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const zodResult = await formSchema.safeParseAsync(data);

  if (!zodResult.success) {
    return zodResult.error.flatten();
  }

  const user = await getUser(zodResult.data.email);
  const ok = await bcryp.compare(zodResult.data.password, user!.password!);

  if (!ok) return getLoginFormError({ password: ["잘돗된 비밀번호입니다."] });

  await saveUserOnSession({
    userId: user!.id,
    username: user!.username,
    avatar: user!.avatar,
  });
  
  redirect("/profile");
};
