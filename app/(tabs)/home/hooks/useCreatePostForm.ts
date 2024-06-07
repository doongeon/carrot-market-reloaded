import { useState } from "react";

import { getObjectURL } from "@/libs/aws";

import { handleProductForm } from "../actions";
import { clientSchema } from "../form-schema";

import useUploadPhoto from "./useUploadPhoto";
import useWriteTitle from "./useWriteTitle";
import useWritePrice from "./useWritePrice";
import useWriteDescription from "./useWriteDescription";

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
  const [formLoadingState, setFormLoadingState] = useState(false);

  async function onSubmitPostForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormLoadingState(true);

    const zodResult = clientSchema.safeParse({
      photo: photoKey,
      title,
      price,
      description,
    });

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
