import { pageExitAtom, pageToAtom } from "@/libs/atom";
import { useSetRecoilState } from "recoil";
import { handleDeletePost } from "../actions";

interface useDeletePostModalProps {
  postId: number;
  authorId: number;
  setDeletePostState: (modalState: boolean) => void;
}

export default function useDeletePostModal({
  postId,
  authorId,
  setDeletePostState,
}: useDeletePostModalProps) {
  const setPageExit = useSetRecoilState(pageExitAtom);
  const setPageTo = useSetRecoilState(pageToAtom);

  const onClickDeletePost = async () => {
    const deleteSate = await handleDeletePost(postId, authorId);

    if (!deleteSate) {
      alert("잘못된 접근입니다.");
    }

    setDeletePostState(false);

    setPageTo("/posts");
    setPageExit(true);
  };

  return { onClickDeletePost };
}
