import { useState } from "react";
import { TCreateComment } from "../types";
import { handleCommentForm } from "../actions";

interface useCommnetFormModalProps {
  postId: number;
  setWriteCommentState: (writeCommentState: boolean) => void;
  setComments: (a: any) => void;
}

export default function useCommnetFormModal({
  postId,
  setWriteCommentState,
  setComments,
}: useCommnetFormModalProps) {
  const [text, setText] = useState("");
  const [loadingFormState, setLoadingFormState] = useState(false);
  const [formState, setFormSate] = useState<{
    success: boolean;
    errors?: string[];
    comment?: TCreateComment;
  }>();

  const onSubmitCommentForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text.length === 0) return;
    if (text.trim() === "") return;

    setLoadingFormState(true);

    const formState = await handleCommentForm(postId, text);

    setFormSate(formState);
    setLoadingFormState(false);

    if (!formState.success) return;

    setText("");
    setWriteCommentState(false);

    // @ts-ignore
    setComments((prev) => [...prev, formState.comment]);
  };

  return { text, loadingFormState, formState, setText, onSubmitCommentForm };
}
