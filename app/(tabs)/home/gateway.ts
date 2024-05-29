"use server"

import db from "@/libs/db";
import { ITEMS_PER_PAGE } from "./constants";

export async function getInitialProducts() {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: ITEMS_PER_PAGE,
  });

  return products;
}

export async function getMoreProducts(page: number) {
  return await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  });
}
