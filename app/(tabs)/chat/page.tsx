import ChatRoomList from "./components/chatroom-list";
import { getChatroomsViaSession, getUserIdViaSession } from "./actions";

import { Metadata } from "next";
import TopBar from "@/Components/top-bar";

export const metadata: Metadata = {
  title: "채팅",
};

export const dynamic = "force-dynamic";

export default async function Chats() {
  const chatrooms = await getChatroomsViaSession();
  const userId = await getUserIdViaSession();

  return (
    <>
      <TopBar title="채팅" />
      <ChatRoomList initialChatrooms={chatrooms} userId={userId} />
    </>
  );
}
