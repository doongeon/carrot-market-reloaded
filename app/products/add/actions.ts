"use server";

import db from "@/libs/db";
import { getSession } from "@/libs/getSession";
import { time } from "console";
import { redirect } from "next/navigation";
import { title } from "process";
import { z } from "zod";

const productSchema = z.object({
  photo: z.string(),
  title: z.string().min(1).max(15),
  price: z.coerce.number().min(0),
  description: z.string().min(1).max(200),
});

export async function addProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };

  const zodResult = productSchema.safeParse(data);

  if (!zodResult.success) {
    console.log("error!");
    return zodResult.error.flatten();
  }

  console.log("success!");

  const session = await getSession();

  if (session.id) {
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

}

export async function getUsername(sessionId: number) {
  const user = await db.user.findUnique({
    where: {
      id: sessionId
    },
    select: {
      username: true,
    }
  })

  if(!user) redirect("/");
  return user.username;
}
