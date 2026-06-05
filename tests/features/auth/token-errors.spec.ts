import { test } from '@playwright/test';
import { postToken } from '../../client/auth-client';
import { Tags } from '../../data/enums';
import { expectStatus } from '../../snippets/status-validators';

test('rejects invalid credentials', { tag: [Tags.NEGATIVE, Tags.POST] }, async ({ request }) => {
  const response = await postToken(request, 'invalid-user', 'invalid-password');
  await expectStatus(response, 401);
});

test('rejects empty credentials', { tag: [Tags.NEGATIVE, Tags.POST] }, async ({ request }) => {
  const response = await postToken(request, '', '');
  await expectStatus(response, 400);
});
