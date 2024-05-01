"use server";

import { redirect } from "next/dist/server/api-utils";

export const handleForm = async (prevState: any, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(prevState);
  // console.log(formData.get("password"));

  return {
    errors: ["wrong password", "password too short"],
  };
};
