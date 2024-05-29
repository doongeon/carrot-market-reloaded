import { Prisma } from "@prisma/client";
import { getInitialProducts } from "./gateway";

export type Products = Prisma.PromiseReturnType<typeof getInitialProducts>;
