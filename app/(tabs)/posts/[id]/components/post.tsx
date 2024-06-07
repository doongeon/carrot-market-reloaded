"use client";

import { useEffect, useState } from "react";

import {
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import Smooth from "@/Components/smooth";
import SmoothLink from "@/Components/smooth-link";
import { formatToTimeAge } from "@/libs/utils";

import { TComments, TPost } from "../types";
import DeletePostModal from "./delete-post-modal";
import CommentFormModal from "./comment-form-modal";
import UpdatePostFormModal from "./update-post-form-modal";
import Like from "./like";
import { useRecoilState, useSetRecoilState } from "recoil";
import { postCommentsAtom } from "@/libs/atom";
import Comments from "./comments";

interface PostProps {
  post: TPost;
  initialComments: TComments;
  like: boolean;
  userId?: number;
}

export default function Post({
  post,
  initialComments,
  like,
  userId,
}: PostProps) {
  const setComments = useSetRecoilState(postCommentsAtom);
  const [optionState, setOptionState] = useState(false);
  const [writeCommentState, setWriteCommentState] = useState(false);
  const [deletePostState, setDeletePostState] = useState(false);
  const [updatePostState, setUpdatePostState] = useState(false);

  useEffect(() => {
    setComments(initialComments);

    return () => {
      setComments([]);
    };
  }, [initialComments, setComments]);

  const toggleOptionState = () => {
    setOptionState((prev) => !prev);
  };

  const toggleWriteCommentState = () => {
    setWriteCommentState((prev) => !prev);
  };

  return (
    <Smooth>
      <SmoothLink
        className="fixed size-10 bottom-10 right-10 z-20 bg-orange-500 rounded-full"
        to={`/posts`}
      >
        <ArrowLeftIcon className="size-5 text-white m-auto" />
      </SmoothLink>

      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-5 px-2 items-center">
          <div className="w-full flex gap-3 items-center">
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

            {post?.userId === userId ? (
              <div className="relative">
                <EllipsisHorizontalIcon
                  className="size-6"
                  onClick={toggleOptionState}
                />
                {optionState ? (
                  <div className="absolute right-0 w-10 text-xs border border-neutral-500 bg-neutral-500 flex flex-col gap-px">
                    <button
                      className="bg-black p-1"
                      onClick={() => {
                        toggleOptionState();
                        setUpdatePostState(true);
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="bg-black p-1"
                      onClick={() => {
                        toggleOptionState();
                        setDeletePostState(true);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}

            
          </div>
          <h1 className="w-full text-2xl">{post?.title}</h1>
          <span className="w-full">{post?.text}</span>
          <span className="w-full text-xs text-neutral-400">
            {formatToTimeAge(post!.createdAt)}
          </span>
        </div>
        <div className="h-px w-full bg-neutral-600" />
        <div className="w-full flex gap-3 px-3 -my-2">
          <Like postId={post?.id!} initialLike={like} />
          <button onClick={toggleWriteCommentState} className="">
            <div>
              <ChatBubbleBottomCenterIcon className="size-6" />
            </div>
          </button>
        </div>
        <div className="h-px w-full bg-neutral-600" />
        <Comments />
      </div>

      {/* modal */}
      <AnimatePresence>
        {writeCommentState && (
          <CommentFormModal
            postId={post?.id!}
            setWriteCommentState={setWriteCommentState}
            setComments={setComments}
          />
        )}

        {deletePostState && (
          <DeletePostModal
            postId={post?.id!}
            authorId={post?.userId!}
            setDeletePostState={setDeletePostState}
          />
        )}

        {updatePostState && (
          <UpdatePostFormModal
            postId={post?.id!}
            postAuthorId={post?.userId!}
            postTitle={post?.title!}
            postText={post?.text!}
            setUpdatePostState={setUpdatePostState}
          />
        )}
      </AnimatePresence>
    </Smooth>
  );
}
