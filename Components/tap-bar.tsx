"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon as FilledChatIcon,
  HomeIcon as FilledHomeIcon,
  UserIcon as FilledUserIcon,
  TvIcon as FilledTvIcon,
  BuildingOffice2Icon as FilledLifeIcon,
} from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftEllipsisIcon as LineChatIcon,
  HomeIcon as LineHomeIcon,
  UserIcon as LineUserIcon,
  TvIcon as LineTvIcon,
  BuildingOffice2Icon as LineLifeIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TapBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 w-full max-w-screen-md mx-auto border-t-orange-600 border-t py-2 px-3 grid grid-cols-5 bg-inherit">
      <Link
        href={"/products"}
        className="flex flex-col gap-1 items-center text-xs "
      >
        {pathname === "/products" ? (
          <FilledHomeIcon className="size-6 text-orange-600" />
        ) : (
          <LineHomeIcon className="size-6 text-orange-600" />
        )}
        <span className="">홈</span>
      </Link>
      <Link href={"/chat"} className="flex flex-col gap-1 items-center text-xs">
        {pathname === "/chat" ? (
          <FilledChatIcon className="size-6 text-orange-600" />
        ) : (
          <LineChatIcon className="size-6 text-orange-600" />
        )}
        <span className="">채팅</span>
      </Link>
      <Link href={"/life"} className="flex flex-col gap-1 items-center text-xs">
        {pathname === "/life" ? (
          <FilledLifeIcon className="size-6 text-orange-600" />
        ) : (
          <LineLifeIcon className="size-6 text-orange-600" />
        )}
        <span className="">일상</span>
      </Link>
      <Link href={"/live"} className="flex flex-col gap-1 items-center text-xs">
        {pathname === "/live" ? (
          <FilledTvIcon className="size-6 text-orange-600" />
        ) : (
          <LineTvIcon className="size-6 text-orange-600" />
        )}
        <span className="">라이브</span>
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
    </div>
  );
}
