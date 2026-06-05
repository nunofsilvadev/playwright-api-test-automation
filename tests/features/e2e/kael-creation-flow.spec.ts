import { test, expect } from '@playwright/test';
import { authState } from '../../client/auth-state';
import {
  chooseBackgroundEquipment,
  chooseClassEquipment,
  createCharacter,
  deleteCharacter,
  getCharacterById,
  patchCharacter,
  updateAbilityScores,
} from '../../client/character-client';
import { CharacterStatus, Tags } from '../../data/enums';
import {
  kaelAbilityScores,
  kaelBackgroundEquipment,
  kaelClassEquipment,
  kaelIdentity,
  kaelSkillChoices,
  kaelTestName,
} from '../../data/kael-thornwhisper';
import { expectStatusCreated, expectStatusOk } from '../../snippets/status-validators';
import { characterPageUrl, shouldDeleteCharactersAfterTests } from '../../config/test-config';

test.describe.serial('Kael Thornwhisper creation', { tag: [Tags.FLOW, Tags.KAEL, Tags.ROGUE] }, () => {
  let token = '';
  let characterId = 0;

  test.beforeAll(async ({ request }) => {
    token = await authState.authenticate(request);
  });

  test.afterAll(async ({ request }) => {
    if (characterId <= 0) {
      return;
    }

    if (shouldDeleteCharactersAfterTests()) {
      await deleteCharacter(request, token, characterId);
      return;
    }

    console.log(`Kept test character: ${characterPageUrl(characterId)}`);
  });

  test('creates a draft', { tag: [Tags.POST, Tags.CREATE] }, async ({ request }) => {
    const name = kaelTestName();
    const response = await createCharacter(request, token, { name });
    await expectStatusCreated(response);

    const body = await response.json();
    characterId = body.id;

    expect(body.name).toBe(name);
    expect(body.status).toBe(CharacterStatus.DRAFT);
    expect(body.level).toBe(1);
    expect(body.missingFields).toEqual(
      expect.arrayContaining(['classId', 'speciesId', 'backgroundId']),
    );
  });

  test('assigns rogue, elf, and criminal', { tag: Tags.PATCH }, async ({ request }) => {
    const classResponse = await patchCharacter(request, token, characterId, {
      classId: kaelIdentity.classId,
    });
    await expectStatusOk(classResponse);

    const speciesResponse = await patchCharacter(request, token, characterId, {
      speciesId: kaelIdentity.speciesId,
    });
    await expectStatusOk(speciesResponse);

    const backgroundResponse = await patchCharacter(request, token, characterId, {
      backgroundId: kaelIdentity.backgroundId,
    });
    await expectStatusOk(backgroundResponse);

    const body = await backgroundResponse.json();
    expect(body.classId).toBe(kaelIdentity.classId);
    expect(body.speciesId).toBe(kaelIdentity.speciesId);
    expect(body.backgroundId).toBe(kaelIdentity.backgroundId);
    expect(body.status).toBe(CharacterStatus.IN_PROGRESS);
    expect(body.skillProficiencies).toEqual(
      expect.arrayContaining(['Stealth', 'Sleight of Hand']),
    );
  });

  test('sets ability scores', { tag: Tags.PUT }, async ({ request }) => {
    const response = await updateAbilityScores(request, token, characterId, kaelAbilityScores);
    await expectStatusOk(response);

    const body = await response.json();
    expect(body.selectedAbilityScores.final.DEX).toBe(15);
    expect(body.selectedAbilityScores.final.INT).toBe(14);
    expect(body.selectedAbilityScores.final.STR).toBe(8);
  });

  test('picks skill proficiencies', { tag: Tags.PATCH }, async ({ request }) => {
    const response = await patchCharacter(request, token, characterId, kaelSkillChoices);
    await expectStatusOk(response);

    const body = await response.json();
    for (const skill of kaelSkillChoices.skillProficiencies) {
      expect(body.skillProficiencies).toContain(skill);
    }
  });

  test('resolves equipment choices', { tag: Tags.POST }, async ({ request }) => {
    const classEq = await chooseClassEquipment(request, token, characterId, kaelClassEquipment);
    await expectStatusOk(classEq);

    const backgroundEq = await chooseBackgroundEquipment(
      request,
      token,
      characterId,
      kaelBackgroundEquipment,
    );
    await expectStatusOk(backgroundEq);
  });

  test('reaches complete status', { tag: [Tags.GET, Tags.SMOKE] }, async ({ request }) => {
    const response = await getCharacterById(request, token, characterId);
    await expectStatusOk(response);

    const body = await response.json();
    expect(body.name).toContain('Kael Thornwhisper');
    expect(body.status).toBe(CharacterStatus.COMPLETE);
  });
});
