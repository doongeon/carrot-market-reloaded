import { useRecoilState } from "recoil";
import { handleUpdatePost } from "../actions";
import { pageExitAtom, pageToAtom, writePostModalAtom } from "@/libs/atom";
import { useState } from "react";

interface useCreatePostModalProps {
  postId: number;
  postAuthor: number;
}

export default function useUpdatePostModal({
  postId,
  postAuthor,
}: useCreatePostModalProps) {
  const [pageExit, setPageExit] = useRecoilState(pageExitAtom);
  const [pageTo, setPageTo] = useRecoilState(pageToAtom);
  const [writeModal, setWritePostModal] = useRecoilState(writePostModalAtom);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  async function onUpdatePost(e: React.FormEvent) {
    e.preventDefault();

    if (text.trim() === "") return;
    if (title.trim() === "") return;

    const formState = await handleUpdatePost(postId, postAuthor, title, text);

    if (!formState) return;

    setText("");
    setTitle("");
    setWritePostModal(false);
    setPageExit(true);
    setPageTo(`/posts/${formState.id}`);
  }

  return {
    onUpdatePost,
    writeModal,
    setWritePostModal,
    text,
    title,
    setTitle,
    setText,
  };
}
