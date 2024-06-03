import { Prisma } from "@prisma/client";
import { getChatRoom, getMessages } from "./gateway";

export type Chatroom = Prisma.PromiseReturnType<typeof getChatRoom>;

export type initialMessages = Prisma.PromiseReturnType<typeof getMessages>;

export interface ChatListProps {
  chatroom: Chatroom;
  initialMessages: initialMessages;
  userId: number;
}

export interface User {
  id: number;
  username: string;
  email: string | null;
  password: string;
  phone: string | null;
  github_id: string | null;
  avatar: string | null;
  created_at: Date;
  updated_ad: Date;
}
