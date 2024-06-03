"use server";

import db from "@/libs/db";
import { revalidatePath } from "next/cache";

export async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      createdAt: true,
      title: true,
      user: {
        select: {
          username: true,
        },
      },
      Like: true,
    },
    take: 20,
  });

  return posts;
}

export async function getPost(postId: number) {
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      Like: true,
      Comment: true,
    },
  });

  return post;
}

export async function getComments(postId: number) {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });

  return comments;
}

export async function createPost(userId: number, text: string, title: string) {
  const post = await db.post.create({
    data: {
      text,
      title,
      userId,
    },
    select: {
      id: true,
    },
  });

  revalidatePath("/posts");

  return post;
}
