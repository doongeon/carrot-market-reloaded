"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Smooth({
  children,
  exit,
  to,
}: {
  children: React.ReactNode;
  exit: boolean;
  to: string;
}) {
  const router = useRouter();
  return (
    <AnimatePresence onExitComplete={() => router.push(to)}>
      {exit ? null : (
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
