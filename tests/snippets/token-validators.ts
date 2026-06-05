import { expect } from '@playwright/test';

export function expectTokenPresent(token: unknown) {
  expect(token).toBeTruthy();
  expect(typeof token).toBe('string');
  expect((token as string).length).toBeGreaterThan(0);
}
