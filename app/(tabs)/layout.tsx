"use client";

import Smooth from "@/Components/smooth";
import TapBar from "@/Components/tap-bar";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { RecoilRoot } from "recoil";
import { boolean } from "zod";

const tapRoutes: { [key: string]: boolean } = {
  "/home": true,
  "/posts": true,
  "/chat": true,
  "/profile": true,
};

export default function TabLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="h-full w-full py-14 bg-inherit">
      <RecoilRoot>
        {children}
        <AnimatePresence>
          {tapRoutes[pathname] ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TapBar />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </RecoilRoot>
    </div>
  );
}
