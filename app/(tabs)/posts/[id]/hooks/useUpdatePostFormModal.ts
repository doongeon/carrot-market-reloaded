import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { UpdatePostFormModalProps } from "../components/update-post-form-modal";
import { handleUpdatePost } from "../actions";

interface useUpdatePostFormModal extends UpdatePostFormModalProps {}

export default function useUpdatePostFormModal({
  postId,
  postAuthorId,
  postTitle,
  postText,
  setUpdatePostState,
}: useUpdatePostFormModal) {
  const router = useRouter();
  const [title, setTitle] = useState(postTitle);
  const [text, setText] = useState(postText);
  const [error, setError] = useState("");

  const onSubmitUpdatePostForm = async (e: FormEvent) => {
    e.preventDefault();

    if (title?.trim() === "") {
      setError("제목이 없습니다.");
      return;
    }
    if (text?.trim() === "") {
      setError("내용이 없습니다.");
      return;
    }
    if (text === postText && title === postTitle) {
      setUpdatePostState(() => false);
      return;
    }

    const newPost = await handleUpdatePost(postId, postAuthorId, title!, text!);

    if (!newPost) {
      alert("올바르지 않은 접근입니다.");
      setUpdatePostState(() => false);
      return;
    }

    setUpdatePostState(() => false);
    router.push(`/posts/${postId}`);
  };

  return {
    title,
    text,
    error,
    setTitle,
    setText,
    onSubmitUpdatePostForm,
  };
}
