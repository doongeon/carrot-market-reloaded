import db from "@/libs/db";
import { z } from "zod";

const findUniqueUserName = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const findUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

export const formSchema = z
  .object({
    userName: z
      .string()
      .min(2)
      .max(10)
      .refine(findUniqueUserName, "이미 존재하는 유저명 입니다."),
    email: z
      .string()
      .email()
      .refine(findUniqueEmail, "이미 존재하는 이메일 입니다."),
    password: z
      .string()
      .min(8)
      .regex(
        RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])"),
        "대문자, 소문자, 숫자, 특수문자(#?!@$ %^&*-)를 포함시켜 주세요."
      ),
    confirmPassword: z.string().min(8),
  })
  .refine((dataForm) => dataForm.password === dataForm.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 다릅니다.",
  });