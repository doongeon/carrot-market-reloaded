import { redirect } from "next/navigation";
import { getSession } from "@/libs/session";
import ChatList from "./components/chat-list";
import { getCahcedMessages, getMessages } from "./gateway";
import { getChatroomViaParams } from "./action";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const session = await getSession();

  if (!session.id) {
    session.destroy();
    redirect("/login");
  }

  const chatroom = await getChatroomViaParams(params.id);
  const initialMessages = (await getCahcedMessages(chatroom.id)).reverse();

  return (
    <div className="h-full w-full flex flex-col justify-between overflow-y-scroll">
      <ChatList
        chatroom={chatroom}
        initialMessages={initialMessages}
        userId={session.id}
      />
    </div>
  );
}
