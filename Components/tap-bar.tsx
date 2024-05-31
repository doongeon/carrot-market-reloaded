"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon as FilledChatIcon,
  HomeIcon as FilledHomeIcon,
  UserIcon as FilledUserIcon,
  TvIcon as FilledTvIcon,
  PlusIcon,
  DocumentTextIcon as FilledDocumentTextIcon,
} from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftEllipsisIcon as LineChatIcon,
  HomeIcon as LineHomeIcon,
  UserIcon as LineUserIcon,
  TvIcon as LineTvIcon,
  DocumentTextIcon as LineDocumentTextIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function TapBar() {
  const pathname = usePathname();

  return (
    <div className="relative bg-inherit">
      <div className="fixed bottom-0 left-50 w-full max-w-screen-md mx-auto border-t-orange-600 border-t py-2 px-3 grid grid-cols-4 bg-inherit -translate-x-2 *:m-auto">
        <Link
          href={"/home"}
          className="flex flex-col gap-1 items-center text-xs "
        >
          {pathname === "/home" ? (
            <FilledHomeIcon className="size-6 text-orange-600" />
          ) : (
            <LineHomeIcon className="size-6 text-orange-600" />
          )}
          <span className="">홈</span>
        </Link>
        <Link
          href={"/chat"}
          className="flex flex-col gap-1 items-center text-xs"
        >
          {pathname === "/chat" ? (
            <FilledChatIcon className="size-6 text-orange-600" />
          ) : (
            <LineChatIcon className="size-6 text-orange-600" />
          )}
          <span className="">채팅</span>
        </Link>
        <Link
          href={"/posts"}
          className="flex flex-col gap-1 items-center text-xs"
        >
          {pathname === "/posts" ? (
            <FilledDocumentTextIcon className="size-6 text-orange-600" />
          ) : (
            <LineDocumentTextIcon className="size-6 text-orange-600" />
          )}
          <span className="">포스트</span>
        </Link>
        <Link
          href={"/profile"}
          className="flex flex-col gap-1 items-center text-xs"
        >
          {pathname === "/profile" ? (
            <FilledUserIcon className="size-6 text-orange-600" />
          ) : (
            <LineUserIcon className="size-6 text-orange-600" />
          )}
          <span className="">프로필</span>
        </Link>

        <AnimatePresence>
          {pathname === "/home" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={"/products/add"}
                className="absolute bottom-20 right-5 size-10 bg-orange-600 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-400"
              >
                <PlusIcon className="size-8" />
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
