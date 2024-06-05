import { deleteS3Object, getAWSClient, postS3Object } from "@/libs/aws";
import { useEffect, useState } from "react";

export const VALID_FILE_TYPE = ["image/jpeg", "image/png", "image/gif"];

export default function useUploadPhoto() {
  const [uploadPhotoLoading, setUploadPhotoLoading] = useState(false);
  const [photoKey, setPhotoKey] = useState("");
  const [uploadPhotoError, setUploadPhotoError] = useState<string[] | null>([]);

  const onChangePhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadPhotoLoading(true);

    const {
      target: { files },
    } = event;
    if (!files) {
      setUploadPhotoLoading(false);
      return;
    }

    const file = files[0];

    if (!VALID_FILE_TYPE.includes(file.type)) {
      setUploadPhotoError((prev) => ["사진을 올려주세요 (jpg, png, gif)"]);
      setUploadPhotoLoading(false);
      return;
    }

    const client = getAWSClient();
    const newPhotoKey = `product_${Date.now()}_${file.name}`;

    await postS3Object(client, file, newPhotoKey);
    if (photoKey !== "") await deleteS3Object(client, photoKey);
    setPhotoKey(newPhotoKey);
    setUploadPhotoLoading(false);
  };

  return {
    photoKey,
    uploadPhotoLoading,
    uploadPhotoError,
    setUploadPhotoError,
    onChangePhoto,
  };
}
