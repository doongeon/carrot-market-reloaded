import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";
import { getChatrooms } from "./action";
import ChatRoomList from "@/Components/chatroom-list";

export default async function Chats() {
  const session = await getSession();

  if (!session.id) redirect("/");

  const userId = Number(session.id);

  if (isNaN(userId)) redirect("/");

  const chatrooms = await getChatrooms(userId);

  return (
    <div>
      <h1>Chats</h1>
      <ChatRoomList chatrooms={chatrooms} userId={userId} />
    </div>
  );
}
