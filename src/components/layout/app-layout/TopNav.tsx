import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { useUser, useClerk } from "@clerk/clerk-react";
import { isMobileMenuOpenAtom } from "./atoms";
import { ThemeToggle } from "./ThemeToggle";
import { navigationItems } from "./utils";
import { Button } from "../../ui/button";

interface TopNavProps {
  sticky?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({ sticky = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useAtom(isMobileMenuOpenAtom);
  const [isMounted, setIsMounted] = useState(false);
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showUserMenu) {
        const target = e.target as HTMLElement;
        if (!target.closest("[data-user-menu]")) {
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUserMenu]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <header
        className={`bg-white dark:bg-black border-b border-gray1 dark:border-gray3 ${
          sticky ? "sticky top-0 z-40" : ""
        }`}
        aria-label="Main navigation"
      >
        <nav className="container mx-auto px-8">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-black dark:text-white"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <AcademicCapIcon className="w-5 h-5 text-black dark:text-white" />
              </div>
              <span>Qnect</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              {isLoaded && user ? (
                <div className="relative" data-user-menu>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-black dark:text-white hover:text-primary dark:hover:text-primary border border-black dark:border-white rounded-md hover:border-primary dark:hover:border-primary transition-colors"
                    aria-label="User menu"
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-black dark:text-white">
                      {user.firstName?.[0] ||
                        user.emailAddresses[0]?.emailAddress[0].toUpperCase()}
                      {user.lastName?.[0] || ""}
                    </div>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                      <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        <div className="font-medium">
                          {user.firstName && user.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user.fullName || "User"}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user.primaryEmailAddress?.emailAddress ||
                            user.emailAddresses[0]?.emailAddress}
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : isLoaded ? (
                <Link to="/sign-in">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-black dark:text-white cursor-pointer"
                  >
                    Sign in
                  </Button>
                </Link>
              ) : (
                <div className="w-24 h-9 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={toggleMobileMenu}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="fixed top-0 right-0 w-64 h-full bg-white dark:bg-gray-900 shadow-xl transform transition-transform">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Menu
                </span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Close menu"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-4" aria-label="Mobile navigation">
                <div className="space-y-4">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Theme
                  </span>
                  <ThemeToggle />
                </div>
                {isLoaded && user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
                      <div className="font-medium">
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user.fullName || "User"}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.primaryEmailAddress?.emailAddress ||
                          user.emailAddresses[0]?.emailAddress}
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="block text-sm text-gray-700 dark:text-gray-300"
                      onClick={closeMobileMenu}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        closeMobileMenu();
                      }}
                      className="block w-full text-left text-sm text-red-600 dark:text-red-400"
                    >
                      Sign out
                    </button>
                  </div>
                ) : isLoaded ? (
                  <Link to="/sign-in" onClick={closeMobileMenu}>
                    <Button variant="outline" size="sm" className="w-full">
                      Sign in
                    </Button>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
