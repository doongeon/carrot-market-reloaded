"use client";

import { pageExitAtom, pageToAtom } from "@/libs/atom";
import { usePathname } from "next/navigation";
import { HTMLProps } from "react";
import { useRecoilState } from "recoil";

export default function SmoothLink({
  children,
  to,
  type,
  ...res
}: {
  children?: React.ReactNode;
  to: string;
  type?: string;
} & HTMLProps<HTMLButtonElement>) {
  const [pageExit, setPageExit] = useRecoilState(pageExitAtom);
  const [pageTo, setPageTo] = useRecoilState(pageToAtom);
  const pathname = usePathname();

  return (
    <button
      // href={"/chat"}
      onClick={() => {
        if (pathname === to) return;

        setPageExit(true);
        setPageTo(to);
      }}
      {...res}
    >
      {children}
    </button>
  );
}
