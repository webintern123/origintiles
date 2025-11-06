/**
 * API Client
 * Centralized API request handling (future backend integration)
 */

interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      return { 
        data: null as T, 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      };
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      return { 
        data: null as T, 
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false 
      };
    }
  }
}

export const apiClient = new ApiClient();
