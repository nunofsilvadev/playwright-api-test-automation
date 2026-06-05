import type { APIRequestContext } from '@playwright/test';

export function postToken(
  request: APIRequestContext,
  username: string,
  password: string,
) {
  return request.post('/api/auth/token', {
    data: { username, password },
  });
}
