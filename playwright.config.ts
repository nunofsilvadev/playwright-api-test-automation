import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const baseURL = process.env.BASE_URL ?? 'https://adventurers-guild-api.vercel.app';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? [['list'], ['html']] : [['list']],

  use: {
    baseURL,
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'api-tests',
    },
  ],
});
