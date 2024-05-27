"use client";

import { ChatRooms } from "@/app/(tabs)/chat/action";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface ChatRoomListProps {
  chatrooms: ChatRooms;
  userId: number;
}

export default function ChatRoomList({ chatrooms, userId }: ChatRoomListProps) {
  return (
    <>
      {chatrooms.map((chatroom) => {
        return (
          <Link
            href={`/chatroom/${chatroom.id}`}
            key={chatroom.id}
            className="flex gap-2 border-t-2 border-b-2 p-5 items-center border-neutral-600"
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
                  .map((user) => user.username).join(", ")}
              </span>
              <p>
                {chatroom.Message[chatroom.Message.length-1]?.payload}
              </p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
