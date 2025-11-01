import apiClient from "../../config/api";
import * as schemas from "../../schemas/AllSchemas";

type ApiClient = typeof apiClient;

export const createSystemDesignProblemsService = (
  client: ApiClient = apiClient
) => ({
  async getSystemDesignProblemsList(): Promise<schemas.FetchSystemDesignProblemsListApiResponse> {
    return client.post<schemas.FetchSystemDesignProblemsListApiResponse>(
      "/query/problems",
      {}
    );
  },

  async getSystemDesignProblemDetail(
    systemDesignProblemId: string
  ): Promise<schemas.FetchSystemDesignProblemDetailsApiResponse> {
    return client.get<schemas.FetchSystemDesignProblemDetailsApiResponse>(
      `/query/problems/${systemDesignProblemId}`
    );
  },
});

export const systemDesignProblemsService = createSystemDesignProblemsService();
