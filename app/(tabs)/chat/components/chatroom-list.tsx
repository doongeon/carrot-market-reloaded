"use client";

import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { ChatRoomListProps } from "@/app/(tabs)/chat/types";
import ChatroomPreview from "./\bchatroom-preview";
import Smooth from "@/Components/smooth";
import SmoothLink from "@/Components/smooth-link";

export default function ChatRoomList({
  initialChatrooms,
  userId,
}: ChatRoomListProps) {
  const [chatrooms, setChatrooms] = useState(initialChatrooms);

  return (
    <Smooth>
      <div className="flex flex-col gap-1">
        {chatrooms.map((chatroom) => {
          return (
            <SmoothLink
              key={chatroom.id}
              to={`/chat/${chatroom.id}`}
              className="flex gap-4 p-5 items-center bg-neutral-800 hover:bg-neutral-700 transition-colors duration-300 rounded-md"
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
              <div className="flex flex-col items-start">
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
            </SmoothLink>
          );
        })}
      </div>
    </Smooth>
  );
}
