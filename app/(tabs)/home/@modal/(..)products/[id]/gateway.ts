import db from "@/libs/db";
import { revalidatePath } from "next/cache";
import { TProductForm } from "./types";
import { Prisma } from "@prisma/client";

export type TProduct = Prisma.PromiseReturnType<typeof getProduct>;

export async function getProduct(productId: number) {
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

export async function deleteProduct(productId: number) {
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/home");

    return product;
  } catch (e) {
    return null;
  }
}

export async function updateProduct(
  productId: number,
  productForm: TProductForm
) {
  const product = await db.product.update({
    where: {
      id: productId,
    },
    data: {
      photo: productForm.photo,
      price: productForm.price,
      title: productForm.title,
      description: productForm.description,
    },
    select: {
      id: true,
    },
  });

  if (!product) return null;

  revalidatePath("/products/[id]", "page");

  return product;
}
