"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import { FORM_ERR_MSG_INVALID_PHONENUMBER } from "@/libs/constants";

interface initialStateProps {
  token: boolean;
}

const phoneNumberSchema = z
  .string()
  .trim()
  .refine(
    (phoneNumber) => validator.isMobilePhone(phoneNumber, "ko-KR"),
    FORM_ERR_MSG_INVALID_PHONENUMBER
  );

const verifyNumberSchema = z.coerce.number().min(100000).max(999999);

export default async function smsLoginAction(
  prevState: initialStateProps,
  formData: FormData
) {
  const data = {
    phoneNumber: formData.get("phoneNumber"),
    verifyNumber: formData.get("verifyNumber"),
  };

  if (!prevState.token) {
    const phoneNumberResult = phoneNumberSchema.safeParse(data.phoneNumber);

    if (!phoneNumberResult.success) {
      return { token: false, result: phoneNumberResult.error.flatten() };
    }

    return { token: true };
  }

  const verifyNumberResult = verifyNumberSchema.safeParse(data.verifyNumber);

  if (!verifyNumberResult.success) {
    return { token: false, result: verifyNumberResult.error.flatten() };
  }

  redirect("/");
}
