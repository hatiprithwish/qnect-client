import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

export type Theme = "light" | "dark" | "system";

export const themeAtom = atomWithStorage<Theme>("qnect-theme", "system");

export const isMobileMenuOpenAtom = atom<boolean>(false);

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  const setThemeValue = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");

    // Update atom to reflect current state
    const isDark = htmlElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  };

  useEffect(() => {
    const htmlElement = document.documentElement;

    const applyTheme = () => {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";

        htmlElement.classList.remove("light", "dark");
        htmlElement.classList.add(systemTheme);
      } else {
        htmlElement.classList.remove("light", "dark");
        htmlElement.classList.add(theme);
      }
    };

    applyTheme();

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme();

    if (theme === "system") {
      mediaQuery.addEventListener("change", handleChange);
    }

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return {
    theme,
    setTheme: setThemeValue,
    toggleTheme,
    isDark:
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  };
}
