import { ApiClient } from '../client';
import { LoginResponse } from './types/auth.types';


export class AuthService {
  constructor(private readonly apiClient: ApiClient) {}

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.apiClient.post('accounts/login/', { email, password });

    if (!response.ok()) {
      const responseBody = (await response.text()).slice(0, 500);
      throw new Error(
        `API login failed: POST ${response.url()} returned ${response.status()} ${response.statusText()}. ` +
        `Response: ${responseBody || '<empty>'}`,
      );
    }

    const body: LoginResponse = await response.json();
    this.apiClient.setAuthToken(body.access);

    return body;
  }
}