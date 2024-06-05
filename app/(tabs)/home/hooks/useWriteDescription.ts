import { ChangeEvent, useState } from "react";

export const DESCRIPTION_MAX_LENGTH = 200;

export default function useWriteDescription() {
  const [description, setDescription] = useState("");
  const [writeDescriptionError, setWriteDescriptionError] = useState<
    string[] | null
  >(null);

  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription((prev) => {
      if (
        description.length > DESCRIPTION_MAX_LENGTH - 1 ||
        e.target.value.length > DESCRIPTION_MAX_LENGTH - 1
      )
        return e.target.value.slice(0, DESCRIPTION_MAX_LENGTH);
      return e.target.value;
    });

    if (e.target.value.length !== 0) {
      setWriteDescriptionError((prev) => null);
    }
  };

  return {
    description,
    writeDescriptionError,
    setWriteDescriptionError,
    onChangeDescription,
  };
}
