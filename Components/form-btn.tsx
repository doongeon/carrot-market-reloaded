"use client";

import { HTMLProps } from "react";
import { useFormStatus } from "react-dom";

interface FormBtn {
  text: string;
}

export default function FormBtn({
  text,
  type,
  ...res
}: FormBtn & HTMLProps<HTMLButtonElement>) {
  const { pending } = useFormStatus();

  return (
    <button
      className="primary-btn h-12 text-lg disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-wait"
      disabled={pending}
      {...res}
    >
      {pending ? "로딩중" : text}
    </button>
  );
}
