import { test } from '@playwright/test';
import { authState } from '../../client/auth-state';
import { createCharacter } from '../../client/character-client';
import { Tags } from '../../data/enums';
import { expectStatus } from '../../snippets/status-validators';

test('rejects character without a name', { tag: [Tags.NEGATIVE, Tags.POST] }, async ({ request }) => {
  test.skip(!process.env.API_USERNAME || !process.env.API_PASSWORD, 'API credentials not configured');

  const token = await authState.authenticate(request);
  const response = await createCharacter(request, token, { name: '' });
  await expectStatus(response, 400);
});
