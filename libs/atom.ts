import { atom } from "recoil";

export const pageExitAtom = atom({
  key: "pageExitState",
  default: false,
});

export const pageToAtom = atom({
  key: "pageToAtom",
  default: "",
});

export const writePostModalAtom = atom({
  key: "writePostModalAtom",
  default: false,
});
