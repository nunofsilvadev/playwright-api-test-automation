import { test, expect } from '@playwright/test';
import {
  getAttributes,
  getBackgroundById,
  getClassById,
  getSpeciesById,
} from '../../client/catalog-client';
import { Tags } from '../../data/enums';
import { expectStatusOk } from '../../snippets/status-validators';

test('returns six ability attributes', { tag: [Tags.GET, Tags.SMOKE] }, async ({ request }) => {
  const response = await getAttributes(request);
  await expectStatusOk(response);

  const attributes = await response.json();
  expect(attributes).toHaveLength(6);
  expect(attributes.map((a: { shortname: string }) => a.shortname)).toEqual(
    expect.arrayContaining(['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']),
  );
});

test('Kael build references resolve in catalog', { tag: [Tags.GET, Tags.KAEL, Tags.ROGUE] }, async ({ request }) => {
  const elf = await getSpeciesById(request, 3);
  await expectStatusOk(elf);
  expect((await elf.json()).name).toBe('Elf');

  const rogue = await getClassById(request, 9);
  await expectStatusOk(rogue);
  expect((await rogue.json()).name).toBe('Rogue');

  const criminal = await getBackgroundById(request, 5);
  await expectStatusOk(criminal);
  const criminalBody = await criminal.json();
  expect(criminalBody.name).toBe('Criminal');
  expect(criminalBody.skillProficiencies).toEqual(
    expect.arrayContaining(['Stealth', 'Sleight of Hand']),
  );
});
