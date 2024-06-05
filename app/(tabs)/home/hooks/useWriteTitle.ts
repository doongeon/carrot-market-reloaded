import { ChangeEvent, useState } from "react";

export const TITLE_MAX_LENGTH = 30;

export default function useWriteTitle() {
  const [title, setTitle] = useState("");
  const [writeTitleError, setWriteTitleError] = useState<string[] | null>(null);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle((prev) => {
      if (
        title.length > TITLE_MAX_LENGTH - 1 ||
        e.target.value.length > TITLE_MAX_LENGTH - 1
      )
        return e.target.value.slice(0, TITLE_MAX_LENGTH);
      return e.target.value;
    });

    if (e.target.value.length !== 0) {
      setWriteTitleError((prev) => null);
    }
  };

  return { title, writeTitleError, setWriteTitleError, onChangeTitle };
}
