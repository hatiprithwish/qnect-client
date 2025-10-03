export interface ApiError extends Error {
  status: number;
}

export interface ApiResponse {
  isSuccess: boolean;
  message: string;
  statusCode?: number;
}
