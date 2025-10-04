import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md border border-black dark:border-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:border-primary dark:hover:border-primary dark:focus:ring-offset-primary text-black dark:text-white hover:text-primary dark:hover:text-primary cursor-pointer`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      type="button"
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 " />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
};
