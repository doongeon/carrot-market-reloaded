"use server";

import db from "@/libs/db";
import { getSession } from "@/libs/getSession";
import bcryp from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const findTargetEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(findTargetEmail, "등록되지 않은 이메일 입니다."),
  password: z.string().min(8),
});

export const handleForm = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const zodResult = await formSchema.safeParseAsync(data);

  if (!zodResult.success) {
    return zodResult.error.flatten();
  }

  const user = await db.user.findUnique({
    where: {
      email: zodResult.data?.email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  const ok = await bcryp.compare(zodResult.data.password, user!.password!);

  if (ok) {
    const session = await getSession();
    session.id = user?.id;
    await session.save();
    redirect("/profile");
  } else {
    return {
      fieldErrors: {
        email: [],
        password: ["잘못된 비밀번호입니다."],
      },
    };
  }
};
