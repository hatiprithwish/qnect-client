import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAtom } from "jotai";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { isLeftSidebarOpenAtom, isRightSidebarOpenAtom } from "./atoms";

export const PracticeTopNav: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "canvas";
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useAtom(
    isLeftSidebarOpenAtom
  );
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useAtom(
    isRightSidebarOpenAtom
  );

  const tabs = [
    { id: "canvas", label: "Design Canvas" },
    { id: "report", label: "Evaluation Report" },
  ];

  return (
    <header className="bg-white dark:bg-black sticky top-0 z-40 border-b border-gray2 dark:border-gray3">
      <div className="h-14 flex items-center justify-between px-4">
        {/* Left Sidebar Toggle */}
        <button
          onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          className="p-2 bg-white dark:bg-black text-black dark:text-white border border-gray2 dark:border-gray3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label={`Toggle left sidebar`}
        >
          {isLeftSidebarOpen ? (
            <ChevronLeftIcon className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
        </button>

        {/* Tabs */}
        <div className="flex items-center space-x-1 bg-gray1 dark:bg-gray4 rounded-lg p-1">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={`?tab=${tab.id}`}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white dark:bg-gray3 text-black dark:text-white shadow-sm"
                  : "text-gray3 dark:text-gray2 hover:text-black dark:hover:text-white"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Right Sidebar Toggle */}
        <button
          onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          className="p-2 bg-white dark:bg-black text-black dark:text-white border border-gray2 dark:border-gray3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label={`Toggle right sidebar`}
        >
          {isRightSidebarOpen ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
};
