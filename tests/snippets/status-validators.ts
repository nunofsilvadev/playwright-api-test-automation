import { expect } from '@playwright/test';
import type { APIResponse } from '@playwright/test';

export async function expectStatus(response: APIResponse, status: number) {
  expect(response.status(), await response.text()).toBe(status);
}

export async function expectStatusOk(response: APIResponse) {
  await expectStatus(response, 200);
}

export async function expectStatusCreated(response: APIResponse) {
  await expectStatus(response, 201);
}
