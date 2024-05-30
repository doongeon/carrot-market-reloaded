"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Loading() {
  return (
    <AnimatePresence>
      <motion.div
        className="mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {[...Array(20)].map((_, index) => {
          return (
            <div key={index} className="w-full flex items-center animate-pulse">
              <div className="flex items-center gap-5 py-3 px-5">
                <div className="size-20 bg-neutral-600 rounded-md" />
                <div className="*:bg-neutral-600 *:h-3 *:rounded-md flex flex-col gap-2">
                  <div className="w-28" />
                  <div className="w-16" />
                  <div className="w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
}
