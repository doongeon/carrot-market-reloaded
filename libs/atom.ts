import { TComments } from "@/app/(tabs)/posts/[id]/types";
import { atom } from "recoil";

export const pageExitAtom = atom({
  key: "pageExitState",
  default: false,
});

export const pageToAtom = atom({
  key: "pageToAtom",
  default: "",
});

export const removedProductIdAtom = atom<number | null>({
  key: "removedProductIdAtom",
  default: null,
});

export const writePostStateAtom = atom({
  key: "writePostStateAtom",
  default: false,
});

export const writeProductStateAtom = atom({
  key: "writeProductStateAtom",
  default: false,
});

export const postCommentsAtom = atom<TComments>({
  key: "postCommentsAtom",
  default: [],
});
