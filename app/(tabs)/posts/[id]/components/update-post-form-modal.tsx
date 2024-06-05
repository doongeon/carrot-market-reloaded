import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import useUpdatePostFormModal from "../hooks/useUpdatePostFormModal";

export interface UpdatePostFormModalProps {
  postId: number;
  postAuthorId: number;
  postTitle: string;
  postText: string;
  setUpdatePostState: (arg: any) => void;
}

export default function UpdatePostFormModal({
  postId,
  postAuthorId,
  postTitle,
  postText,
  setUpdatePostState,
}: UpdatePostFormModalProps) {
  const { title, text, error, setTitle, setText, onSubmitUpdatePostForm } =
    useUpdatePostFormModal({
      postId,
      postAuthorId,
      postTitle,
      postText,
      setUpdatePostState,
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-full z-20 bg-[rgba(0,0,0,0.3)] flex flex-col justify-center items-center"
    >
      <div>
        <div className="min-h-40 min-w-72 bg-neutral-800 rounded-md flex flex-col gap-3 items-start justify-center px-2 py-5">
          <div className="w-full flex justify-between">
            <span>포스트 수정하기</span>
            <button onClick={() => setUpdatePostState(false)}>
              <XMarkIcon className="size-5" />
            </button>
          </div>
          <form
            className="w-full flex flex-col gap-2 items-start"
            onSubmit={onSubmitUpdatePostForm}
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
            {error === "" ? null : <span>{error}</span>}
            <button
              type="submit"
              className="w-fit px-2 text-sm mt-3 bg-orange-500 hover:bg-orange-400 rounded-md self-end"
            >
              수정
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
