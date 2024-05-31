import { Prisma } from "@prisma/client";
import { createComment, getComments, getPost } from "./gateway";

export type TPost = Prisma.PromiseReturnType<typeof getPost>;

export type TComments = Prisma.PromiseReturnType<typeof getComments>

export type TCreateComment = Prisma.PromiseReturnType<typeof createComment>