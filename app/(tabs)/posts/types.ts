import { Prisma } from "@prisma/client";
import { getPosts } from "./gateway";

export type Posts = Prisma.PromiseReturnType<typeof getPosts>;
