import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";
import { getCachedChatrooms } from "./action";
import ChatRoomList from "@/Components/chatroom-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "채팅"
}

export const dynamic = "force-dynamic"


export default async function Chats() {
  const session = await getSession();

  if (!session.id) redirect("/");

  const userId = Number(session.id);

  if (isNaN(userId)) redirect("/");

  const chatrooms = await getCachedChatrooms(userId);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl p-2 font-bold border-b-2 border-neutral-600">
        채팅방
      </h1>
      <ChatRoomList initialChatrooms={chatrooms} userId={userId} />
    </div>
  );
}
