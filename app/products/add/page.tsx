"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { useFormState } from "react-dom";
import { addProduct } from "./actions";
import { useState } from "react";
import { deleteS3Object, getAWSClient, postS3Object } from "@/libs/aws";
import { S3_URL } from "@/libs/secrets";

function getPhotoURL(photoKey: string) {
  return `${S3_URL}/${encodeURI(photoKey)}`;
}

export default function AddProduct() {
  const [state, dispatch] = useFormState(addProduct, null);
  const [photoKey, setPhotoKey] = useState("");

  const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    if (!files) return;
    const file = files[0];
    const client = getAWSClient();
    const newPhotoKey = `${file.name}`;

    await postS3Object(client, file, newPhotoKey);
    if (photoKey !== "") await deleteS3Object(client, photoKey);
    setPhotoKey(newPhotoKey);
  };

  const preDispatch = (formData: FormData) => {
    formData.set("photo", getPhotoURL(photoKey));
    return dispatch(formData);
  };

  return (
    <div>
      <form action={preDispatch} className="flex flex-col gap-5 px-5">
        <label
          htmlFor="photo"
          className="aspect-square border-2 border-neutral-800 border-dashed flex flex-col justify-center items-center"
          style={{
            backgroundImage: `url(${getPhotoURL(photoKey)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <PhotoIcon className="size-20" />
          <span>이미지 불러오기</span>
        </label>
        <span>{state?.fieldErrors.photo}</span>
        <input
          id="photo"
          type="file"
          name="photo"
          className="hidden"
          onChange={onUploadImage}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="pl-3">
            제목
          </label>
          <span>{state?.fieldErrors.title}</span>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="제목"
            className="bg-neutral-800 outline-none ring-1 ring-orange-600 rounded-md px-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price">가격</label>
          <span>{state?.fieldErrors.price}</span>
          <input
            id="price"
            type="text"
            name="price"
            placeholder="가격"
            className="bg-neutral-800 outline-none ring-1 ring-orange-600 rounded-md px-2 w-40"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">설명</label>
          <span>{state?.fieldErrors.description}</span>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="설명"
            className="bg-neutral-800 outline-none ring-1 ring-orange-600 rounded-md px-2 h-20 text-wrap"
          />
        </div>
        <button type="submit" className="primary-btn mt-5">
          등록하기
        </button>
      </form>
    </div>
  );
}
