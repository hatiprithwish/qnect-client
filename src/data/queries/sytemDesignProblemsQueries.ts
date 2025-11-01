import { useQuery } from "@tanstack/react-query";
import { createSystemDesignProblemsService } from "../services/sytemDesignProblemsService";
import { queryKeys } from "../queryKeys";
import { useApiClient } from "../useApiClient";

export const useSystemDesignProblemsList = () => {
  const apiClient = useApiClient();
  const systemDesignProblemsService =
    createSystemDesignProblemsService(apiClient);

  return useQuery({
    queryKey: queryKeys.systemDesignProblems.list(),
    queryFn: () => systemDesignProblemsService.getSystemDesignProblemsList(),
  });
};

export const useSystemDesignProblemDetail = (systemDesignProblemId: string) => {
  const apiClient = useApiClient();
  const systemDesignProblemsService =
    createSystemDesignProblemsService(apiClient);

  return useQuery({
    queryKey: queryKeys.systemDesignProblems.detail(systemDesignProblemId),
    queryFn: () =>
      systemDesignProblemsService.getSystemDesignProblemDetail(
        systemDesignProblemId
      ),
    enabled: !!systemDesignProblemId,
  });
};
