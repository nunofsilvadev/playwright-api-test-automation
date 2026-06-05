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

Edit `.env` with your Guild credentials. Quote passwords that contain `#` or other special characters. Then:

```bash
npx playwright test
```

## Environment

| Variable | Description |
|----------|-------------|
| `BASE_URL` | API base URL |
| `API_USERNAME` | Guild account username |
| `API_PASSWORD` | Guild account password |
| `DELETE_CHARACTERS_AFTER_TESTS` | Delete characters created in E2E tests when done (`true` by default) |

Set `DELETE_CHARACTERS_AFTER_TESTS=false` locally to keep Kael on the site after a test run.

After each E2E run the console prints the character id and page URL. With delete enabled (CI default), the character is removed immediately after.

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

Workflow file: `.github/workflows/playwright.yml`

### 1. Add repository secrets

In GitHub: **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Value |
|--------|-------|
| `API_USERNAME` | Your Guild username |
| `API_PASSWORD` | Your Guild password (paste the full password; no quotes needed) |

Secrets are injected at runtime. They are not read from `.env` in CI.

### 2. Repository variable (optional)

**Settings → Secrets and variables → Actions → Variables → New repository variable**

| Variable | Value | Default if unset |
|----------|-------|------------------|
| `DELETE_CHARACTERS_AFTER_TESTS` | `true` or `false` | `true` |

Set to `false` to keep E2E characters on the API after CI runs. Each run still creates a new character.

### 3. Push your branch and open a PR

```bash
git push -u origin playwright-tests
gh pr create --base main --head playwright-tests --title "Add Playwright API test suite"
```

The workflow runs automatically when the PR is opened or updated.

### 4. Read the results

- Open the PR → **Checks** tab → **Playwright API Tests**
- On failure: **Actions** → select the run → download the `playwright-report` artifact

### 5. Merge

When checks are green, merge into `main`. Pushing to `main` also triggers the workflow.

### CI behaviour

- `DELETE_CHARACTERS_AFTER_TESTS` comes from the repository variable above (defaults to `true`)
- `BASE_URL` points to the production API URL

### Branch protection (optional)

**Settings → Branches → Add rule** for `main`:

- Require a pull request before merging
- Require status checks to pass → select **test**
