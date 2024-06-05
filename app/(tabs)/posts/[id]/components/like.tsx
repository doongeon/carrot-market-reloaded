import { HeartIcon as EmptyHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { useState } from "react";
import { handleLike } from "../actions";

interface LikeProps {
  postId: number;
  initialLike: boolean;
}

export default function Like({ postId, initialLike }: LikeProps) {
  const [likeState, setLikeState] = useState(initialLike);

  const toggleLikeState = () => {
    setLikeState((prev) => !prev);
  };

  const onClickLike = async () => {
    toggleLikeState();

    const newLike = await handleLike(postId, likeState);

    if (!newLike) {
      alert("fail like...");
      toggleLikeState();
    }

    setLikeState(newLike?.like!);
  };

  return (
    <button onClick={onClickLike}>
      <div>
        {likeState ? (
          <SolidHeart className="relative size-6" />
        ) : (
          <EmptyHeart className="size-6" />
        )}
      </div>
    </button>
  );
}
