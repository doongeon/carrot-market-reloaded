"use client";

import {
  ChatRoom,
  initialMessages,
  putMessage,
} from "@/app/chatroom/[id]/action";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import FormBtn from "./form-btn";

import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from "@/libs/secrets";
import { useRouter } from "next/navigation";

interface ChatListProps {
  chatRoom: ChatRoom;
  initialMessages: initialMessages;
  userId: number;
  chatRoomId: string;
}

export default function ChatList({
  chatRoom,
  initialMessages,
  userId,
  chatRoomId,
}: ChatListProps) {
  const [msgs, setMsgs] = useState(initialMessages);
  const [newMsg, setNewMsg] = useState("");
  const channel = useRef<RealtimeChannel>();
  const router = useRouter();

  const onChenge = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setNewMsg(value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const Msg = {
      id: Date.now(),
      createdAt: new Date(),
      user: {
        username: chatRoom!.users.find((user) => user.id === userId)!.username,
        avatar: chatRoom!.users.find((user) => user.id === userId)!.avatar,
      },
      payload: newMsg,
      userId,
    };

    channel.current?.send({
      type: "broadcast",
      event: "test",
      payload: { Msg },
    });

    setMsgs((prevMsgs) => {
      return [...prevMsgs, Msg];
    });

    await putMessage(newMsg, chatRoomId, userId);

    setNewMsg("");
  };

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

    channel.current = client.channel(`room-${chatRoomId}`);

    channel.current
      .on("broadcast", { event: "test" }, (payload) =>
        setMsgs((prevMsgs) => {
          return [...prevMsgs, { ...payload.payload.Msg }];
        })
      )
      .subscribe();

    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

  return (
    <>
      <div className="fixed w-full top-0 left-0 p-2 bg-black z-10">
        <button className="primary-btn w-10 h-8" onClick={() => router.back()}>{"<"}</button>
      </div>
      <div className="flex flex-col gap-3 justify-end overflow-y-scroll mb-10 mt-10">
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

                <span className="bg-orange-600 px-2 text-sm flex justify-center items-center rounded-md">
                  {msg.payload}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <form className="fixed bottom-0 left-0 w-full p-3 z-10 bg-black flex gap-3 h-14" onSubmit={onSubmit}>
        <input
          type="text"
          className="w-full bg-black outline-none ring-1 ring-white rounded-lg px-2 text-wrap focus:ring-2"
          value={newMsg}
          onChange={onChenge}
        />
        <FormBtn className="primary-btn w-max px-3 py-1" text="➚" />
      </form>
    </>
  );
}
