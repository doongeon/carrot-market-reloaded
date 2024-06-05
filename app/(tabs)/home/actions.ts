"use server";

import db from "@/libs/db";
import { getSession } from "@/libs/session";
import { error } from "console";
import { redirect } from "next/navigation";
import { z } from "zod";

const productFomrSchema = z.object({
  photo: z.string(),
  title: z.string().min(1).max(20),
  price: z.coerce.number().min(0).max(10000000),
  description: z.string().min(1).max(200),
});

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

  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };

  const zodResult = productFomrSchema.safeParse(data);

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

  redirect(`/products/${product.id}`)
}
