"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChatRoomListProps } from "@/app/(tabs)/chat/types";
import ChatroomPreview from "./\bchatroom-preview";
import { AnimatePresence, motion } from "framer-motion";

export default function ChatRoomList({
  initialChatrooms,
  userId,
}: ChatRoomListProps) {
  const [chatrooms, setChatrooms] = useState(initialChatrooms);

  return (
    <AnimatePresence>
      <motion.div
        className="flex flex-col gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {chatrooms.map((chatroom) => {
          return (
            <Link
              href={`/chatroom/${chatroom.id}`}
              key={chatroom.id}
              className="flex gap-4 p-5 items-center bg-neutral-800"
            >
              <div className="relative size-10">
                {chatroom.users
                  .filter((user) => user.id !== userId)
                  .map((user) =>
                    user.avatar ? (
                      <Image
                        key={user.id}
                        src={user.avatar}
                        alt="user avatar"
                        fill
                      />
                    ) : (
                      <UserIcon key={user.id} />
                    )
                  )}
              </div>
              <div className="flex flex-col">
                <span>
                  {chatroom.product.title + " "}-{" "}
                  {chatroom.users
                    .filter((user) => user.id !== userId)
                    .map((user) => user.username)
                    .join(", ")}
                </span>
                <ChatroomPreview
                  key={chatroom.id}
                  initialMsg={
                    chatroom.Message[chatroom.Message.length - 1]?.payload
                  }
                  chatRoomId={chatroom.id}
                />
              </div>
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
