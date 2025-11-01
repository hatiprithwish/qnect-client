import envConfig from "../config/envConfig";

class ApiError extends Error {
  constructor(public status: number, message: string, public response?: any) {
    super(message);
    this.name = "ApiError";
  }
}

type TokenGetter = () => Promise<string | null>;

const createApiClient = (tokenGetter?: TokenGetter) => {
  return {
    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
      const url = `${envConfig.apiBaseUrl}${endpoint}`;

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      if (tokenGetter) {
        const token = await tokenGetter();
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
      }

      const response = await fetch(url, {
        headers,
        ...options,
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        let errorResponse;

        try {
          errorResponse = await response.json();
          if (errorResponse.message) {
            errorMessage = errorResponse.message;
          }
        } catch {
          // If response is not JSON, use default message
        }

        throw new ApiError(response.status, errorMessage, errorResponse);
      }

      return response.json();
    },

    get<T>(endpoint: string) {
      return this.request<T>(endpoint);
    },

    post<T>(endpoint: string, data: unknown) {
      return this.request<T>(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    put<T>(endpoint: string, data: unknown) {
      return this.request<T>(endpoint, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },

    delete<T>(endpoint: string) {
      return this.request<T>(endpoint, {
        method: "DELETE",
      });
    },
  };
};

const apiClient = createApiClient();

export default apiClient;
export { createApiClient };
