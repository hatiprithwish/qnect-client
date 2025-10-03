import apiClient from "../../config/api";
import * as schemas from "../../schemas/AllSchemas";

export const problemsService = {
  async getProblemsList(): Promise<schemas.FetchProblemsListApiResponse> {
    return apiClient.post<schemas.FetchProblemsListApiResponse>(
      "/query/problems",
      {}
    );
  },

  async getProblemDetail(
    problemId: string
  ): Promise<schemas.FetchProblemDetailsApiResponse> {
    return apiClient.get<schemas.FetchProblemDetailsApiResponse>(
      `/query/problems/${problemId}`
    );
  },
};
