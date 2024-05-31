"use server";

import { getSession } from "@/libs/session";
import { createComment } from "./gateway";
import { z } from "zod";
import { redirect } from "next/navigation";
import { TCreateComment } from "./types";

const commentSchema = z
  .string()
  .min(1, { message: "공백밖에 없어요..." })
  .max(200, { message: "댓글은 최대 100글자 입니다." })
  .regex(/^(?!\s*$)[\s\S]{1,100}$/, { message: "공백밖에 없어요..." });

export const handleCommentForm = async (postId: number, text: string) => {
  const session = await getSession();

  if (!session.id) {
    alert("세션이 만료되었습니다.");
    redirect("/login");
  }

  console.log(text);

  const zodResult = commentSchema.safeParse(text);

  if (!zodResult.success)
    return {
      success: false,
      errors: zodResult.error.flatten().formErrors,
    };

  const comment = await createComment(postId, session.id, zodResult.data);

  return {
    success: true,
    comment,
  };
};
