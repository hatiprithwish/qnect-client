import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/clerk-react";
import envConfig from "./config/envConfig.ts";

// Initialize theme before React renders
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("qnect-theme") || "system";
  const root = document.documentElement;

  root.classList.remove("light", "dark");

  if (savedTheme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(savedTheme);
  }
};

// Initialize theme immediately
initializeTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={envConfig.clerkPublishableKey!}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
