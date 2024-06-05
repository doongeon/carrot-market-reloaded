"use client";

import { formatToTimeAge } from "@/libs/utils";
import { Posts } from "../types";
import { HeartIcon } from "@heroicons/react/24/solid";
import Smooth from "@/Components/smooth";
import SmoothLink from "@/Components/smooth-link";
import { useState } from "react";
import CreatePostModal from "./create-post-modal";
import { writePostStateAtom } from "@/libs/atom";
import { useRecoilState } from "recoil";

interface PostListProps {
  initialPost: Posts;
  userId?: number;
}

export default function PostList({ initialPost, userId }: PostListProps) {
  const [writePostState, setWritePostState] =
    useRecoilState(writePostStateAtom);
  const [posts, setPosts] = useState(initialPost);

  return (
    <>
      <Smooth>
        {posts.length !== 0 ? (
          <div className="flex flex-col gap-2">
            {posts.map((post) => {
              return (
                <SmoothLink
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="w-full h-28 p-5 bg-neutral-800 flex justify-between items-center rounded-lg cursor-pointer hover:bg-neutral-700 transition-colors duration-300"
                >
                  <div className="flex flex-col items-start gap-2">
                    <h2 className="text-lg">{post.title}</h2>
                    <span className="text-sm text-neutral-400">
                      작성자: {post.user.username}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 justify-between items-end text-neutral-400 text-sm">
                    <span>{formatToTimeAge(post.createdAt)}</span>
                    <div className="flex gap-2 items-center">
                      <HeartIcon className="size-4 " />
                      <span className="text-xs">{post.Like.length}</span>
                    </div>
                  </div>
                </SmoothLink>
              );
            })}
          </div>
        ) : (
          <div>없어요</div>
        )}
      </Smooth>

      {writePostState && <CreatePostModal userId={userId} />}
    </>
  );
}
