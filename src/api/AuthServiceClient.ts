import { ApiClient } from './ApiClient.js';
import type {
  LoginResponse,
  RegisterResponse,
  UserMeResponse,
} from '../types/api_interfaces.js';

export class AuthService {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async registerUser(userData: {
    isSubscribed: boolean;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }): Promise<RegisterResponse> {
    const response = await this.client.post<RegisterResponse>(
      '/api/auth/register',
      userData
    );
    this.client.setAuthToken(response.data.token);
    return response.data;
  }

  async loginUser(credentials: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const response = await this.client.post<LoginResponse>(
      '/api/auth/login',
      credentials
    );
    this.client.setAuthToken(response.data.token);
    return response.data;
  }

  async getUserInfo(): Promise<UserMeResponse> {
    const response = await this.client.get<UserMeResponse>('/api/user/me');
    return response.data;
  }
}
