import db from "@/libs/db";
import { getSession } from "@/libs/session";
import { deleteProduct, updateProduct } from "./gateway";
import { TProductForm } from "./types";
import { revalidatePath } from "next/cache";


export async function handleDeleteProduct(
  productId: number,
  productOwnerId: number
) {
  const session = await getSession();

  if (!session.id) return null;
  if (session.id !== productOwnerId) return null;

  const product = await deleteProduct(productId);

  revalidatePath("/home");

  return product
}

export async function handleUpdatePost(
  productId: number,
  productOwnerId: number,
  productForm: TProductForm
) {
  const session = await getSession();

  if (!session.id) return null;
  if (session.id !== productOwnerId) return null;

  const product = await updateProduct(productId, productForm);

  return product;
}
