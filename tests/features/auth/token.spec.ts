import { test } from '@playwright/test';
import { postToken } from '../../client/auth-client';
import { Tags } from '../../data/enums';
import { expectStatusOk } from '../../snippets/status-validators';
import { expectTokenPresent } from '../../snippets/token-validators';

test('returns a valid token for valid credentials', { tag: [Tags.SMOKE, Tags.POST] }, async ({ request }) => {
  const username = process.env.API_USERNAME;
  const password = process.env.API_PASSWORD;

  test.skip(!username || !password, 'API credentials not configured');

  const response = await postToken(request, username, password);
  await expectStatusOk(response);

  const body = await response.json();
  expectTokenPresent(body.token);
});
