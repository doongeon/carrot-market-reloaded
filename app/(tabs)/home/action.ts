"use server";

import db from "@/libs/db";
import { NUM_ITEMS_ON_PAGE } from "./page";

export const getMoreProducts = async (page: number) => {
  return await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: NUM_ITEMS_ON_PAGE * page,
    take: NUM_ITEMS_ON_PAGE,
  });
};
