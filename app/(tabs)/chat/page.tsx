import ChatRoomList from "./components/chatroom-list";
import { getChatroomsViaSession, getUserIdViaSession } from "./actions";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "채팅",
};

export const dynamic = "force-dynamic";

export default async function Chats() {
  const chatrooms = await getChatroomsViaSession();
  const userId = await getUserIdViaSession();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl p-2 font-bold border-b-2 border-neutral-600">
        채팅방
      </h1>
      <ChatRoomList initialChatrooms={chatrooms} userId={userId} />
    </div>
  );
}
