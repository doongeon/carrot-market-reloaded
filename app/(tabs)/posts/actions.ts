"use server";

import { getSession } from "@/libs/session";
import { createPost } from "./gateway";

export default async function handlePostForm(title: string, text: string) {
  const session = await getSession();

  if (!session.id) {
    return {
      success: false,
    };
  }

  const newPost = await createPost(session.id, text, title);

  return {
    success: true,
    newPost,
  };
}
