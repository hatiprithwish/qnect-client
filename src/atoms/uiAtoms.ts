import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Theme = "light" | "dark" | "system";

export const themeAtom = atomWithStorage<Theme>("qnect-theme", "system");

export const isMobileMenuOpenAtom = atom<boolean>(false);

// Practice page sidebar states
export const isLeftSidebarOpenAtom = atom<boolean>(true);
export const isRightSidebarOpenAtom = atom<boolean>(true);
