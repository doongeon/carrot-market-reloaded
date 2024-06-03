"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon as FilledChatIcon,
  HomeIcon as FilledHomeIcon,
  UserIcon as FilledUserIcon,
  PlusIcon,
  DocumentTextIcon as FilledDocumentTextIcon,
} from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftEllipsisIcon as LineChatIcon,
  HomeIcon as LineHomeIcon,
  UserIcon as LineUserIcon,
  DocumentTextIcon as LineDocumentTextIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { TapBarBtn } from "./tap-bar-btn";
import { writePostModalAtom } from "@/libs/atom";
import { useRecoilState } from "recoil";
import { getSession } from "@/libs/session";

export default function TapBar() {
  const [writePostModal, setWritePostModal] =
    useRecoilState(writePostModalAtom);
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <div className="relative">
        <div className="fixed bottom-0 left-50 w-full max-w-screen-md mx-auto bg-black border-t-orange-600 border-t py-2 px-3 grid grid-cols-4 -translate-x-2 *:m-auto">
          <TapBarBtn
            to="/home"
            text="홈"
            pathname={pathname}
            solidIcon={<FilledHomeIcon className="size-6 text-orange-600" />}
            outlineIcon={<LineHomeIcon className="size-6 text-orange-600" />}
          />

          <TapBarBtn
            to="/chat"
            text="채팅"
            pathname={pathname}
            solidIcon={<FilledChatIcon className="size-6 text-orange-600" />}
            outlineIcon={<LineChatIcon className="size-6 text-orange-600" />}
          />

          <TapBarBtn
            to="/posts"
            text="포스트"
            pathname={pathname}
            solidIcon={
              <FilledDocumentTextIcon className="size-6 text-orange-600" />
            }
            outlineIcon={
              <LineDocumentTextIcon className="size-6 text-orange-600" />
            }
          />

          <TapBarBtn
            to="/profile"
            text="프로필"
            pathname={pathname}
            solidIcon={<FilledUserIcon className="size-6 text-orange-600" />}
            outlineIcon={<LineUserIcon className="size-6 text-orange-600" />}
          />

          <AnimatePresence>
            {pathname === "/home" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={"/product"}
                  className="absolute bottom-20 right-5 h-7 p-2 bg-orange-600 rounded-full flex gap-1 items-center justify-center hover:opacity-80 transition-opacity duration-400"
                >
                  <PlusIcon className="size-5" />
                  <span className="min-w-max text-sm">만들기</span>
                </Link>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {pathname === "/posts" ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  className="absolute bottom-20 right-5 h-7 p-2 bg-orange-600 rounded-full flex gap-1 items-center justify-center hover:opacity-80 transition-opacity duration-400"
                  onClick={async () => {
                    setWritePostModal(true);
                  }}
                >
                  <PlusIcon className="size-5" />
                  <span className="min-w-max text-sm">만들기</span>
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </AnimatePresence>
  );
}
