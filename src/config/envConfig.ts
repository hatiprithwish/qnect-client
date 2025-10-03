const envConfig = {
  nodeEnv: import.meta.env.NODE_ENV ?? "development",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
};

export default envConfig;
