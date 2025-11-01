import type { DiagramAIFeedback } from ".";
import type { ApiResponse } from "../common";

export interface CreateDiagramApiResponse extends ApiResponse {
  feedback?: DiagramAIFeedback;
  errors?: string[];
}
