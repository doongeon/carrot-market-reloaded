import { z } from "zod";
import {
  DESCRIPTION_MAX_LENGTH,
  MAX_PRICE,
  TITLE_MAX_LENGTH,
} from "./constants";

export const clientSchema = z.object({
  photo: z.string().min(1, "이미지를 추가해 주세요"),
  title: z
    .string()
    .min(1, "비어있어요.")
    .max(TITLE_MAX_LENGTH, `최대 ${TITLE_MAX_LENGTH}글자에요.`),
  price: z.coerce
    .number({ message: "가격을 적어주세요" })
    .min(1, "가격을 적어주세요")
    .max(MAX_PRICE, `최대 ${MAX_PRICE}원이에요.`),
  description: z
    .string()
    .min(1, "비어있어요.")
    .max(DESCRIPTION_MAX_LENGTH, `최대 ${DESCRIPTION_MAX_LENGTH}글자에요.`),
});

export const serverSchema = z.object({
  photo: z.string(),
  title: z.string().min(1).max(20),
  price: z.coerce.number().min(0).max(10000000),
  description: z.string().min(1).max(200),
});
