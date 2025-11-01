import { useAuth } from "@clerk/clerk-react";
import { useMemo } from "react";
import { createApiClient } from "../config/api";

export function useApiClient() {
  const { getToken } = useAuth();

  return useMemo(() => {
    return createApiClient(async () => {
      try {
        return await getToken();
      } catch {
        return null;
      }
    });
  }, [getToken]);
}
