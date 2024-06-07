"use client";

import Smooth from "@/Components/smooth";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TProduct } from "../gateway";
import Image from "next/image";
import Options from "./options";
import { useSetRecoilState } from "recoil";
import { pageExitAtom, pageToAtom } from "@/libs/atom";

interface ModalProps {
  product: TProduct;
  userId?: number;
}

export default function Modal({ product, userId }: ModalProps) {
  const setPageExit = useSetRecoilState(pageExitAtom);
  const setPageTo = useSetRecoilState(pageToAtom);
  const [modalOn, setModalOn] = useState(true);
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
          className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)] z-20 flex justify-center items-center overflow-y-auto overflow-x-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // onClick={() => {
          //   setModalOn(false);
          // }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-screen-sm aspect-[1/1.5] sm:aspect-[1/1.2] m-auto"
          >
            <button className=" absolute right-5 top-5" onClick={onDismiss}>
              <XMarkIcon className="size-6" />
            </button>
            <div className=" bg-black overflow-hidden flex flex-col gap-4 items-center overflow-y-scroll">
              <div className="relative w-full max-w-96 aspect-square">
                <Image src={product?.photo!} alt="product photo" fill />
              </div>
              <div className="w-full flex flex-col gap-3 px-3 pb-5">
                <div className="w-full flex gap-3 justify-start px-2">
                  <div className="relative aspect-square h-6 rounded-full overflow-hidden">
                    {product!.user.avatar ? (
                      <Image
                        src={product!.user.avatar}
                        alt="user avatar"
                        fill
                      />
                    ) : (
                      <UserIcon />
                    )}
                  </div>
                  <span>{product!.user.username}</span>

                  {userId === product!.userId && (
                    <Options
                      productId={product!.id}
                      productOwnerId={product!.userId}
                    />
                  )}
                </div>
                <h1>{product!.title}</h1>
                <div className="border-t-2 min-h-40 white py-2 break-words">
                  {product!.description}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
