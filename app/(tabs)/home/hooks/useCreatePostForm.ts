import { pageExitAtom, pageToAtom } from "@/libs/atom";
import { getObjectURL } from "@/libs/aws";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { handleProductForm } from "../actions";
import { z } from "zod";
import useUploadPhoto from "./useUploadPhoto";
import useWriteTitle from "./useWriteTitle";
import useWritePrice from "./useWritePrice";
import useWriteDescription from "./useWriteDescription";
import { error } from "console";
import { redirect } from "next/navigation";

export const TITLE_MAX_LENGTH = 30;
export const DESCRIPTION_MAX_LENGTH = 200;
export const MAX_PRICE = 10000000;

const formSchema = z.object({
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

// interface useCreatePostFormProps {
//   photoKey: any;
//   title: any;
//   price: any;
//   description: any;
//   setUploadPhotoError: (arg: any) => void;
//   setWriteTitleError: (arg: any) => void;
//   setWritePriceError: (arg: any) => void;
//   setWriteDescriptionError: (arg: any) => void;
// }

export default function useCreatePostForm() {
  const {
    photoKey,
    uploadPhotoLoading,
    uploadPhotoError,
    setUploadPhotoError,
    onChangePhoto,
  } = useUploadPhoto();
  const { title, writeTitleError, setWriteTitleError, onChangeTitle } =
    useWriteTitle();

  const { price, writePriceError, setWritePriceError, onChangePrice } =
    useWritePrice();
  const {
    description,
    writeDescriptionError,
    setWriteDescriptionError,
    onChangeDescription,
  } = useWriteDescription();
  const [pageExit, setPageExit] = useRecoilState(pageExitAtom);
  const [pageTo, setPageTo] = useRecoilState(pageToAtom);
  const [formLoadingState, setFormLoadingState] = useState(false);

  async function onSubmitPostForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoadingState(true);

    const data = {
      photo: photoKey,
      title,
      price,
      description,
    };

    const zodResult = formSchema.safeParse(data);

    if (!zodResult.success) {
      const { fieldErrors } = zodResult.error.flatten();
      if (fieldErrors.photo) setUploadPhotoError(fieldErrors.photo);
      if (fieldErrors.title) setWriteTitleError(fieldErrors.title);
      if (fieldErrors.price) setWritePriceError(fieldErrors.price);
      if (fieldErrors.description)
        setWriteDescriptionError(fieldErrors.description);
      setFormLoadingState(false);
      return;
    }

    const formData = new FormData();
    formData.set("photo", getObjectURL(photoKey));
    formData.set("title", zodResult.data?.title!);
    formData.set("price", zodResult.data?.price! + "");
    formData.set("description", zodResult.data?.description!);

    const formState = await handleProductForm(formData);

    if (!formState) {
      setFormLoadingState(false);
      return;
    }
    if (!formState.success) {
      //@ts-ignore
      const { fieldErrors } = formState.error!;
      if (fieldErrors.photo) setUploadPhotoError(fieldErrors.photo);
      if (fieldErrors.title) setWriteTitleError(fieldErrors.title);
      if (fieldErrors.price) setWritePriceError(fieldErrors.price);
      if (fieldErrors.description)
        setWriteDescriptionError(fieldErrors.description);
      setFormLoadingState(false);
      return;
    }
  }

  return {
    data: { photoKey, title, price, description },
    error: {
      uploadPhotoError,
      writeTitleError,
      writePriceError,
      writeDescriptionError,
    },
    onChange: {
      onChangePhoto,
      onChangeTitle,
      onChangePrice,
      onChangeDescription,
    },
    loading: {
      uploadPhotoLoading,
    },
    formLoadingState,
    onSubmitPostForm,
  };
}
