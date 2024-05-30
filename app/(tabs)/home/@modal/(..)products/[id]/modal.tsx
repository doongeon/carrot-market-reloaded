"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const [modalOn, setModalOn] = useState(true);
  const [y, setY] = useState();
  const router = useRouter();

  function onDismiss() {
    setModalOn(false);
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => router.back()}>
      {modalOn && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden p-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="absolute right-5 top-5" onClick={onDismiss}>
            <XMarkIcon className="size-6" />
          </button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
