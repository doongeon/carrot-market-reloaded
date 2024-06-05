"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import useCreatePostModal from "../hooks/useCreatePostModal";

interface CreatePostModalProps {
  userId?: number;
}

export default function CreatePostModal({ userId }: CreatePostModalProps) {
  const {
    title,
    text,
    writePostState,
    setTitle,
    setText,
    setWritePostState,
    onSubmitPostForm,
  } = useCreatePostModal({ userId });

  return (
    <>
      {writePostState && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-[100vh] bg-[rgba(0,0,0,0.2)] flex flex-col items-center justify-center z-20"
        >
          <div className="min-h-40 min-w-72 bg-neutral-800 rounded-md flex flex-col gap-3 items-start justify-center px-2 py-5">
            <div className="w-full flex justify-between">
              <span>새로운 포스트</span>
              <button onClick={() => setWritePostState(false)}>
                <XMarkIcon className="size-5" />
              </button>
            </div>
            <form
              className="w-full flex flex-col gap-2 items-start"
              onSubmit={onSubmitPostForm}
            >
              <input
                type="text"
                name="title"
                placeholder="제목"
                className="w-full max-w-screen-sm outline-none bg-neutral-800 ring-1 ring-orange-500 focus:ring-2 rounded-md px-1"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <textarea
                name="text"
                placeholder="내용"
                className="w-full max-w-screen-sm outline-none bg-neutral-800 ring-1 ring-orange-500 focus:ring-2 rounded-md px-1"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <button
                type="submit"
                className="w-fit px-2 text-sm mt-3 bg-orange-500 hover:bg-orange-400 rounded-md self-end"
              >
                업로드
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
}
