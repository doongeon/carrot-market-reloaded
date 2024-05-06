"use client";

import { useFormStatus } from "react-dom";

interface FormBtn {
  text: string;
}

export default function FormBtn({ text }: FormBtn) {
  const { pending } = useFormStatus();

  return (
    <button
      className="primary-btn h-12 text-lg disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-wait"
      disabled={pending}
      type="submit"
    >
      {pending ? "로딩중" : text}
    </button>
  );
}
