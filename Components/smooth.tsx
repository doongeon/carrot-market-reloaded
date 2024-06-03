"use client";

import { pageExitAtom, pageToAtom } from "@/libs/atom";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { HTMLProps, useEffect } from "react";
import { useRecoilState } from "recoil";

export default function Smooth({
  children,
  ...res
}: {
  children: React.ReactNode;
} & HTMLProps<HTMLDivElement>) {
  const router = useRouter();
  const [pageExit, setPageExit] = useRecoilState(pageExitAtom);
  const [pageTo, setPageTo] = useRecoilState(pageToAtom);

  useEffect(() => {
    setPageExit(false);
    setPageTo("");
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        router.push(pageTo);
      }}
    >
      {pageExit ? null : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
