import type { APIRequestContext } from '@playwright/test';
import { postToken } from './auth-client';

class AuthState {
  private token: string | null = null;

  async authenticate(request: APIRequestContext): Promise<string> {
    if (this.token) {
      return this.token;
    }

    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;

    if (!username || !password) {
      throw new Error('API_USERNAME and API_PASSWORD must be set');
    }

    const response = await postToken(request, username, password);

    if (!response.ok()) {
      const body = await response.text();
      throw new Error(`Authentication failed (${response.status()}): ${body}`);
    }

    const { token } = await response.json();
    this.token = token;
    return this.token;
  }

  clear(): void {
    this.token = null;
  }
}

export const authState = new AuthState();
