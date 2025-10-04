import React from "react";
import { PracticeTopNav } from "./PracticeTopNav";
import { CollapsibleSidebar } from "./CollapsibleSidebar";

interface PracticePageLayoutProps {
  children: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export const PracticePageLayout: React.FC<PracticePageLayoutProps> = ({
  children,
  leftSidebar,
  rightSidebar,
}) => {
  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-black">
      {leftSidebar && (
        <CollapsibleSidebar side="left">{leftSidebar}</CollapsibleSidebar>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <PracticeTopNav />

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </main>
      </div>

      {rightSidebar && (
        <CollapsibleSidebar side="right">{rightSidebar}</CollapsibleSidebar>
      )}
    </div>
  );
};

export default PracticePageLayout;
