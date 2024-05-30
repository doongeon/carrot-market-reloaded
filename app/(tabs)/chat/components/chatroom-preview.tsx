"use client";

import { useChatrommPreview } from "../hooks";
import { MessagePreviewProps } from "../types";

export default function ChatroomPreview({
  initialMsg,
  chatRoomId,
}: MessagePreviewProps) {
  const msg = useChatrommPreview({ initialMsg, chatRoomId });

  return <p>{msg}</p>;
}
