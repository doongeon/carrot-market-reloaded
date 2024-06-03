"use client";

import LoadingDots from "@/Components/loading-dots";
import TopBar from "@/Components/top-bar";
import { AnimatePresence, motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="h-[100vh] flex flex-col gap-5 items-center justify-center">
      <TopBar title="마켓" />
    </div>
  );
}
