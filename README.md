# playwright-api-test-automation

API test suite for the [Adventurers Guild API](https://adventurers-guild-api.vercel.app/docs), built with Playwright and TypeScript.

## Setup

Requirements: Node.js LTS, npm.

```bash
git clone <repo-url>
cd playwright-api-test-automation
npm ci
cp .env.example .env
```

Edit `.env` with your Guild credentials, then:

```bash
npx playwright test
```

## Environment

| Variable | Description |
|----------|-------------|
| `BASE_URL` | API base URL |
| `API_USERNAME` | Guild account username |
| `API_PASSWORD` | Guild account password |

## Running tests

```bash
npm test
npm run test:smoke
npm run test:negative
npm run test:flow
npx playwright show-report
```

## Character under test

**Kael Thornwhisper** — Elf Rogue (Criminal). Stealth-focused infiltrator and secret-hunter.

Test data lives in `tests/data/kael-thornwhisper.ts`.

## CI/CD

Tests run on GitHub Actions for every pull request and push to `main`.

| Secret | Description |
|--------|-------------|
| `API_USERNAME` | Guild account username |
| `API_PASSWORD` | Guild account password |

Failed runs upload an HTML report as a workflow artifact (30-day retention).
