import { useQuery } from "@tanstack/react-query";
import { problemsService } from "../services/problemsService";
import { queryKeys } from "../queryKeys";

export const useProblemsList = () => {
  return useQuery({
    queryKey: queryKeys.problems.list(),
    queryFn: problemsService.getProblemsList,
  });
};

export const useProblemDetail = (problemId: string) => {
  return useQuery({
    queryKey: queryKeys.problems.detail(problemId),
    queryFn: () => problemsService.getProblemDetail(problemId),
    enabled: !!problemId,
  });
};

