"use client";

import { SUPABASE_PUBLIC_KEY, SUPABASE_URL } from "@/libs/secrets";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

interface MessagePreviewProps {
  initialMsg: string;
  chatRoomId: string;
}

export default function MessagePreview({
  initialMsg,
  chatRoomId,
}: MessagePreviewProps) {
  const channel = useRef<RealtimeChannel>();
  const [msg, setMsg] = useState(initialMsg);

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

    channel.current = client.channel(`room-${chatRoomId}`);

    channel.current
      .on("broadcast", { event: "test" }, (payload) => {
        const newMsg = String(payload.payload.Msg.payload);
        setMsg((prevMsgs) => {
          return newMsg.substring(0, newMsg.length);
        });
      })
      .subscribe();

    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

  return <p>{msg}</p>;
}
