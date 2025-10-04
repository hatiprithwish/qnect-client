import React from "react";
import {
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Qnect. All rights reserved.
            </div>
            <nav className="flex space-x-6" aria-label="Footer navigation">
              <a
                href="/about"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="/privacy"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Terms
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <a
                href="https://github.com"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <CodeBracketIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
              </a>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              v1.0.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
