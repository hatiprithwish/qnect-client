const envConfig = {
  nodeEnv: import.meta.env.NODE_ENV ?? "development",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  clerkPublishableKey: import.meta.env.VITE_PUBLIC_CLERK_PUBLISHABLE_KEY,
};

export default envConfig;
