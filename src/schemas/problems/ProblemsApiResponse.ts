import type { Problem, ProblemBase } from ".";
import type { ApiResponse } from "../common";

export interface FetchProblemsListApiResponse extends ApiResponse {
  problems: ProblemBase[];
}

export interface FetchProblemDetailsApiResponse extends ApiResponse {
  problem: Problem;
}
