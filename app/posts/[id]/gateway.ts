import db from "@/libs/db";

export async function getPost(postId: number) {
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      Like: true,
      Comment: true,
      user: true,
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

export async function createComment(
  postId: number,
  userId: number,
  text: string
) {
  const comment = await db.comment.create({
    data: {
      postId,
      text,
      userId,
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

  return comment;
}
