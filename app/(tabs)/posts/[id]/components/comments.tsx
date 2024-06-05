"use client";

import { postCommentsAtom } from "@/libs/atom";
import { formatToTimeAge } from "@/libs/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRecoilValue } from "recoil";

export default function Comments() {
  const comments = useRecoilValue(postCommentsAtom);

  return (
    <div className="flex flex-col gap-5">
      {comments.length === 0 ? (
        <div>아직 댓글이 없어요</div>
      ) : (
        comments.map((comment) => {
          return (
            <div key={comment.id} className="flex flex-col gap-1 px-2 sm:gap-2">
              <div className="flex gap-2 items-center">
                <div className="relative size-7 rounded-full overflow-hidden">
                  {comment.user.avatar ? (
                    <Image src={comment.user.avatar} alt="user avatar" fill />
                  ) : (
                    <UserIcon />
                  )}
                </div>
                <div className="flex flex-col text-sm">
                  <span>{comment.user.username}</span>
                </div>
              </div>
              <span className="text-sm px-2">{comment.text}</span>
              <span className="text-xs text-neutral-400">
                {formatToTimeAge(comment.createdAt)}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}
