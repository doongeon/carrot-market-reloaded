import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import useCommnetFormModal from "../hooks/useCommnetFormModal";

interface CommentFormModalProps {
  postId: number;
  setWriteCommentState: (writeCommentState: boolean) => void;
  setComments: (a: any) => void;
}

export default function CommentFormModal({
  postId,
  setWriteCommentState,
  setComments,
}: CommentFormModalProps) {
  const { text, loadingFormState, formState, setText, onSubmitCommentForm } =
    useCommnetFormModal({ postId, setComments, setWriteCommentState });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed w-full max-w-screen-sm p-3 bottom-10 sm:bottom-24 left-1/2 bg-neutral-800 -translate-x-1/2 rounded-2xl flex flex-col gap-2 z-20"
    >
      <div className="flex gap-1">
        <button>
          <XMarkIcon
            className="size-5 cursor-pointer"
            onClick={() => {
              setWriteCommentState(false);
            }}
          />
        </button>
        {formState?.errors ? <span>{formState?.errors[0]}</span> : null}
      </div>
      <form
        className="flex items-end gap-2 justify-between"
        onSubmit={onSubmitCommentForm}
      >
        <textarea
          rows={3}
          cols={50}
          className="h-full w-full bg-neutral-800 outline-none ring-1 focus:ring-2 ring-orange-600 rounded-md px-1 resize-none"
          name="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className="h-full flex flex-col justify-between w-12">
          <span className="w-12 text-right text-neutral-400 text-sm">
            {text.length}/200
          </span>

          <button
            className="primary-btn w-12 text-sm h-8"
            disabled={loadingFormState}
          >
            ➚
          </button>
        </div>
      </form>
    </motion.div>
  );
}
