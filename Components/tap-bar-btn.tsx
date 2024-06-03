"use client";

import { usePathname } from "next/navigation";
import SmoothLink from "./smooth-link";

export function TapBarBtn({
  to,
  text,
  pathname,
  solidIcon,
  outlineIcon,
}: {
  to: string;
  text: string;
  pathname: string;
  solidIcon: any;
  outlineIcon: any;
}) {
  return (
    <SmoothLink to={to} className="flex flex-col gap-1 items-center text-xs ">
      {pathname === to ? solidIcon : outlineIcon}
      <span className="">{text}</span>
    </SmoothLink>
  );
}
