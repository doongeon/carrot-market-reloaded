"use server";

import { getSession } from "@/libs/getSession";
import bcryp from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getUser, isUserExist } from "./gateway";
import { LoginFormError, saveUserOnSession } from "./services";

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

  if (!ok) return new LoginFormError({ password: ["잘돗된 비밀번호입니다."] });

  await saveUserOnSession(user!.id);
  redirect("/profile");
};
