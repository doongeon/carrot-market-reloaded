"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const [y, setY] = useState();
  const router = useRouter();

  function onDismiss() {
    router.back();
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex justify-center items-center overflow-y-auto overflow-x-hidden p-1">
      <button className="absolute right-5 top-5" onClick={onDismiss}>
        <XMarkIcon className="size-6" />
      </button>
      {children}
    </div>
  );
}
