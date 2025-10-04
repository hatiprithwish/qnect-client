import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type Theme = "light" | "dark" | "system";

export const themeAtom = atomWithStorage<Theme>("qnect-theme", "system");

export const isMobileMenuOpenAtom = atom<boolean>(false);
