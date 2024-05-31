"use client";

import {
  ArrowLeftIcon,
  ArrowUpCircleIcon,
  ArrowUpIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon as EmptyHeart,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import Image from "next/image";
import { formatToTimeAge } from "@/libs/utils";
import { TComments, TCreateComment, TPost } from "../types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Smooth from "@/Components/smooth";
import { handleCommentForm } from "../actions";

interface PostProps {
  post: TPost;
  initialComments: TComments;
  like: boolean;
}

interface TCommentForm {
  comment: string;
}

export default function Post({ post, initialComments, like }: PostProps) {
  const [comments, setComments] = useState(initialComments);
  const [formState, setFormSate] = useState<{
    success: boolean;
    errors?: string[];
    comment?: TCreateComment;
  }>();
  const [exit, setExit] = useState(false);
  const [isLike, setIsLike] = useState(like);
  const [isWritng, setIsWritng] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (text.length === 0) return;
    if (text.trim() === "") return;

    setLoading(true);

    const formState = await handleCommentForm(post?.id!, text);

    setFormSate(formState);
    setLoading(false);

    if (!formState.success) return;

    setText("");
    setIsWritng(false);

    //@ts-ignore
    setComments((prev) => [...prev, formState.comment]);
  };

  const toggleWriteComment = () => {
    setIsWritng((prev) => !prev);
  };

  return (
    <Smooth exit={exit} to={"/posts"}>
      <div className="flex flex-col gap-5 mt-10">
        <button
          className="absolute top-0 left-0 z-20"
          onClick={() => {
            setExit(true);
          }}
        >
          <ArrowLeftIcon className="size-5 text-white" />
        </button>
        <div className="flex flex-col gap-5 px-2 items-center">
          <div className="w-full flex gap-3 items-center ">
            <div className="relative size-9 rounded-full overflow-hidden">
              {post?.user.avatar ? (
                <Image src={post?.user.avatar} alt="user avatar" fill />
              ) : (
                <UserIcon />
              )}
            </div>
            <div className="flex flex-col text-sm">
              <span>{post!.user.username}</span>
            </div>
          </div>
          <h1 className="w-full text-2xl">{post?.title}</h1>
          <span className="w-full">{post?.text}</span>
          <span className="w-full text-xs text-neutral-400">
            {formatToTimeAge(post!.createdAt)}
          </span>
        </div>
        <div className="h-px w-full bg-neutral-600" />
        <div className="w-full flex gap-3 px-3 -my-2">
          <button
            onClick={() => {
              setIsLike((prev) => !prev);
            }}
          >
            <div className="relative rounded-full p-1 before:absolute before:w-full before:h-full before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:bg-gradient-to-br before:from-red-500 before:to-blue-500 before:-z-10 before:rounded-xl before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-300 ">
              {isLike ? (
                <SolidHeart className="relative size-6" />
              ) : (
                <EmptyHeart className="size-6" />
              )}
            </div>
          </button>
          <button onClick={toggleWriteComment} className="">
            <div className="relative rounded-full p-1 before:absolute before:w-full before:h-full before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] before:bg-gradient-to-br before:from-red-500 before:to-blue-500 before:-z-10 before:rounded-xl before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-300 ">
              <ChatBubbleBottomCenterIcon className="size-6" />
            </div>
          </button>
        </div>
        <div className="h-px w-full bg-neutral-600" />

        <div className="flex flex-col gap-5">
          {comments.length === 0 ? (
            <div>아직 댓글이 없어요</div>
          ) : (
            comments.map((comment) => {
              return (
                <div
                  key={comment.id}
                  className="flex flex-col gap-1 px-2 sm:gap-2"
                >
                  <div className="flex gap-2 items-center">
                    <div className="relative size-7 rounded-full overflow-hidden">
                      {comment.user.avatar ? (
                        <Image
                          src={comment.user.avatar}
                          alt="user avatar"
                          fill
                        />
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
      </div>

      <AnimatePresence>
        {isWritng ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed w-full max-w-screen-sm p-3 bottom-10 sm:bottom-24 left-1/2 bg-neutral-800 -translate-x-1/2 rounded-2xl flex flex-col gap-2"
          >
            <div className="flex gap-1">
              <button>
                <XMarkIcon
                  className="size-5 cursor-pointer"
                  onClick={() => {
                    setIsWritng(false);
                  }}
                />
              </button>
              {formState?.errors ? <span>{formState?.errors[0]}</span> : null}
            </div>
            <form
              className="flex items-end gap-2 justify-between"
              onSubmit={onSubmit}
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
                  disabled={loading}
                >
                  ➚
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Smooth>
  );
}
