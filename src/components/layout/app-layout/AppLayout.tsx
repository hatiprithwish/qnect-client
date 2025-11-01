import React from "react";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
  stickyHeader?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  stickyHeader = true,
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-black">
      <TopNav sticky={stickyHeader} />
      <main
        id="main-content"
        role="main"
        className="flex-1 container mx-auto p-8 dark:text-white"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
