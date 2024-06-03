import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from "@/libs/secrets";
import { ChatListProps } from "../types";
import { putMessage } from "../gateway";
import { findUser } from "../services";

export function useChatList({
  chatroom,
  initialMessages,
  userId,
}: ChatListProps) {
  const [msgs, setMsgs] = useState(initialMessages);
  const [newMsg, setNewMsg] = useState("");
  const channel = useRef<RealtimeChannel>();

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setNewMsg(value);
  };

  const onSubmitMsg = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newMsg === "") return;

    const Msg = {
      id: Date.now(),
      createdAt: new Date(),
      user: {
        username: findUser(chatroom!.users, userId).username,
        avatar: findUser(chatroom!.users, userId).avatar,
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

    await putMessage(newMsg, chatroom?.id!, userId);

    setNewMsg("");
  };

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatroom?.id}`);
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
  }, [chatroom?.id]);

  return { msgs, newMsg, onChange, onSubmitMsg };
}
