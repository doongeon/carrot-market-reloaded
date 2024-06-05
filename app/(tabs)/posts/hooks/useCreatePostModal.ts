import { pageExitAtom, pageToAtom, writePostStateAtom } from "@/libs/atom";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import handlePostForm from "../actions";

interface useCreatePostModalProps {
  userId?: number;
}

export default function useCreatePostModal({
  userId,
}: useCreatePostModalProps) {
  const [pageExit, setPageExit] = useRecoilState(pageExitAtom);
  const [pageTo, setPageTo] = useRecoilState(pageToAtom);
  const [writePostState, setWritePostState] =
    useRecoilState(writePostStateAtom);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (writePostState && !userId) {
      alert("로그인이 필요합니다.");
      setWritePostState(false);
    }
  });

  async function onSubmitPostForm(e: React.FormEvent) {
    e.preventDefault();

    if (text.trim() === "") return;
    if (title.trim() === "") return;

    const formState = await handlePostForm(title, text);

    if (!formState || !formState.success) {
      alert("로그인이 필요합니다");
      return;
    }

    setText("");
    setTitle("");
    setWritePostState(false);
    setPageExit(true);
    setPageTo(`/posts/${formState.newPost?.id}`);
  }

  return {
    onSubmitPostForm,
    writePostState,
    setWritePostState,
    text,
    title,
    setTitle,
    setText,
  };
}
