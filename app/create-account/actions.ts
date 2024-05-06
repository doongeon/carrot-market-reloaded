"use server";

import { z } from "zod";

const formSchema = z.object({
  userName: z.string().min(2).max(10),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const zodResult = formSchema.safeParse(data);
  if(!zodResult.success) {
    return zodResult.error.flatten()
  }
}
