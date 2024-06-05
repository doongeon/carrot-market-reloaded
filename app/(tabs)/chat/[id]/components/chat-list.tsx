"use client";

import { ArrowLeftIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { ChatListProps } from "../types";
import FormBtn from "@/Components/form-btn";
import { useChatList } from "../hooks/useChatList";
import Link from "next/link";
import Smooth from "@/Components/smooth";
import SmoothLink from "@/Components/smooth-link";

export default function ChatList({
  chatroom,
  initialMessages,
  userId,
}: ChatListProps) {
  const { msgs, newMsg, onChange, onSubmitMsg } = useChatList({
    chatroom,
    initialMessages,
    userId,
  });

  return (
    <Smooth>
      <div className="fixed w-full max-w-screen-md top-0 left-1/2 rounded-b-lg p-3 bg-neutral-800 z-10 -translate-x-1/2">
        <SmoothLink to={`/chat`} className="primary-btn size-6">
          <ArrowLeftIcon className="size-4 font-bold" />
        </SmoothLink>
      </div>
      <div className="flex flex-col gap-3 justify-end overflow-y-scroll mb-20 mt-12">
        {msgs.map((msg) => {
          return (
            <div
              key={msg.id}
              className={`flex gap-2 ${
                userId === msg.userId ? "self-end" : null
              }`}
            >
              <div className="relative aspect-square h-6 rounded-full overflow-hidden">
                {userId === msg.userId ? null : msg.user.avatar ? (
                  <Image src={msg.user.avatar} alt="user avatar" fill />
                ) : (
                  <UserIcon />
                )}
              </div>
              <div className="flex flex-col gap-1">
                {userId === msg.userId ? null : (
                  <span className="text-xs">{msg.user.username}</span>
                )}
                <div className="flex gap-2 items-end">
                  <span className="bg-orange-600 px-2 text-sm md:text-base flex justify-center items-center rounded-md">
                    {msg.payload}{" "}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="fixed bottom-5 left-1/2 w-[90%] max-w-screen-md p-4 z-10 bg-neutral-800 flex gap-3 h-16 rounded-lg -translate-x-1/2"
        onSubmit={onSubmitMsg}
      >
        <input
          type="text"
          className="w-full bg-black outline-none ring-1 ring-white rounded-lg px-2 text-wrap focus:ring-2"
          value={newMsg}
          onChange={onChange}
        />
        <FormBtn className="primary-btn w-max px-3 py-1" text="➚" />
      </form>
    </Smooth>
  );
}
