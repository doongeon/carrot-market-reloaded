import FormBtn from "@/Components/form-btn";
import { getSession } from "@/libs/getSession";
import { notFound } from "next/navigation";
import { getChatRoom, getMessages } from "./action";
import ChatList from "@/Components/chat-list";
import { Prisma } from "@prisma/client";
import db from "@/libs/db";

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const chatRoom = await getChatRoom(params.id);

  if (!chatRoom) notFound();

  const session = await getSession();

  if (!session.id) notFound();

  const match = Boolean(chatRoom?.users.find((user) => user.id === session.id));

  if (!match) notFound();

  const messages = await getMessages(chatRoom.id);

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-scroll">
      <ChatList
        chatRoom={chatRoom}
        initialMessages={messages}
        userId={session.id}
        chatRoomId={chatRoom.id}
      />
    </div>
  );
}
