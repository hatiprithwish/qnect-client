import type { SystemDesignProblem, SystemDesignProblemBase } from ".";
import type { ApiResponse } from "../common";

export interface FetchSystemDesignProblemsListApiResponse extends ApiResponse {
  systemDesignProblems: SystemDesignProblemBase[];
}

export interface FetchSystemDesignProblemDetailsApiResponse
  extends ApiResponse {
  systemDesignProblem: SystemDesignProblem;
}
