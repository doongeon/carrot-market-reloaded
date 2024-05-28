"use client";

import { ChatRooms } from "@/app/(tabs)/chat/action";
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from "@/libs/secrets";
import { UserIcon } from "@heroicons/react/24/solid";
import { createClient } from "@supabase/supabase-js";
import { channel } from "diagnostics_channel";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MessagePreview from "./chatroom-msg-preview";

interface ChatRoomListProps {
  initialChatrooms: ChatRooms;
  userId: number;
}

export default function ChatRoomList({
  initialChatrooms,
  userId,
}: ChatRoomListProps) {
  const [chatrooms, setChatrooms] = useState(initialChatrooms);

  return (
    <>
      <div className="flex flex-col gap-1">
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
                  {chatroom.users
                    .filter((user) => user.id !== userId)
                    .map((user) => user.username)
                    .join(", ")}
                </span>
                <MessagePreview
                  key={chatroom.id}
                  initialMsg={
                    chatroom.Message[chatroom.Message.length - 1]?.payload
                  }
                  chatRoomId={chatroom.id}
                />
                {/* <p>{chatroom.Message[chatroom.Message.length - 1]?.payload}</p> */}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
