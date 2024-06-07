"use server";

import { deleteProduct, updateProduct } from "./gateway";
import { getSession } from "@/libs/session";
import { TProductForm } from "./types";

export async function handleDeleteProduct(
  productId: number,
  productOwnerId: number
) {
  const session = await getSession();

  if (!session.id) return null;
  if (session.id !== productOwnerId) return null;

  const product = await deleteProduct(productId);

  if (!product) return null;

  return product;
}

export async function handleUpdatePost(
  productId: number,
  productOwnerId: number,
  productForm: TProductForm
) {
  const session = await getSession();

  if (!session.id) return null;
  if (session.id !== productOwnerId) return null;

  const post = await updateProduct(productId, productForm);

  return post;
}
