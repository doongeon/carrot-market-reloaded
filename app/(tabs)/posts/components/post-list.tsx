"use client";

import { formatToTimeAge } from "@/libs/utils";
import { Posts } from "../types";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

interface PostListProps {
  posts: Posts;
}

export default function PostList({ posts }: PostListProps) {
  const router = useRouter();
  return (
    <AnimatePresence>
      <motion.div
        className="w-full flex flex-col gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {posts.length !== 0 ? (
          posts.map((post) => {
            return (
              <div
                key={post.id}
                className="w-full h-28 p-5 bg-neutral-800 flex justify-between items-center rounded-lg"
                onClick={() => {
                  router.push(`/posts/${post.id}`);
                }}
              >
                <div className="flex flex-col gap-2">
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
              </div>
            );
          })
        ) : (
          <div>없어요</div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
