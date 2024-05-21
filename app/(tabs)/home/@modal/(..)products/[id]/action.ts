"use server";

import db from "@/libs/db";

export default async function getProduct(productId: number) {
  const product = await db.product.findUnique({
    where: {
      id: productId,
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

  return product;
}
