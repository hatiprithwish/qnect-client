import React from "react";
import { useAtom } from "jotai";
import {
  isLeftSidebarOpenAtom,
  isRightSidebarOpenAtom,
} from "../../atoms/uiAtoms";

interface CollapsibleSidebarProps {
  side: "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = ({
  side,
  children,
  className = "",
}) => {
  const [isOpen] = useAtom(
    side === "left" ? isLeftSidebarOpenAtom : isRightSidebarOpenAtom
  );

  return (
    <div
      className={`relative border-gray2 dark:border-gray3 ${
        side === "left" ? "border-r" : "border-l"
      } ${className}`}
    >
      <div
        className={`h-full bg-white dark:bg-black text-black dark:text-white border-r border-gray1 dark:border-gray4 transition-all duration-300 ${
          isOpen ? "w-80" : "w-0 overflow-hidden"
        }`}
      >
        <div className="h-full p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
