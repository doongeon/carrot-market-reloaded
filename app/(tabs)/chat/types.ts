import { Prisma } from "@prisma/client";
import { getChatrooms } from "./gateway";

export type Chatrooms = Prisma.PromiseReturnType<typeof getChatrooms>;

export interface MessagePreviewProps {
  initialMsg: string;
  chatRoomId: string;
}

export interface ChatRoomListProps {
  initialChatrooms: Chatrooms;
  userId: number;
}
