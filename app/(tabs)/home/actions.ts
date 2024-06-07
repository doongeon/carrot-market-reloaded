"use server";

import db from "@/libs/db";
import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { serverSchema } from "./form-schema";

export async function handleProductForm(formData: FormData) {
  const session = await getSession();

  if (!session.id) {
    return {
      success: false,
      error: {
        session: ["로그인 후 이용가능합니다."],
      },
    };
  }

  const zodResult = serverSchema.safeParse({
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  });

  if (!zodResult.success) {
    return {
      success: false,
      error: zodResult.error.flatten(),
    };
  }

  const product = await db.product.create({
    data: {
      title: zodResult.data.title,
      price: zodResult.data.price,
      description: zodResult.data.description,
      photo: zodResult.data.photo,
      userId: session.id,
    },
    select: {
      id: true,
    },
  });

  redirect(`/products/${product.id}`);
}
