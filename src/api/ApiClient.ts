import type { APIRequestContext, APIResponse } from '@playwright/test';

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export class ApiClient {
  private requestContext: APIRequestContext;
  private token: string | undefined;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  getAuthToken(): string | undefined {
    return this.token;
  }

  async get<T>(
    url: string,
    params?: Record<string, string | number | boolean>
  ): Promise<ApiResponse<T>> {
    const headers = this.getHeaders();
    const options: {
      headers?: Record<string, string>;
      params?: Record<string, string | number | boolean>;
    } = { headers };
    if (params) {
      options.params = params;
    }
    const response = await this.requestContext.get(url, options);
    await this.expectResponseOk(response, url);
    return {
      data: await response.json(),
      status: response.status(),
      statusText: response.statusText(),
    };
  }

  async post<T>(url: string, data: object): Promise<ApiResponse<T>> {
    const headers = this.getHeaders();
    const response = await this.requestContext.post(url, { headers, data });
    await this.expectResponseOk(response, url);
    return {
      data: await response.json(),
      status: response.status(),
      statusText: response.statusText(),
    };
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers.Authorization = this.token;
    }
    return headers;
  }

  private async expectResponseOk(response: APIResponse, url: string) {
    if (!response.ok()) {
      const responseBody = await response.text();
      throw new Error(
        `API request to ${url} failed with status ${response.status()}: ${response.statusText()}\nBody: ${responseBody}`
      );
    }
  }
}
