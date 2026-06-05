import { CharacterClass } from './enums';

export const kaelIdentity = {
  name: 'Kael Thornwhisper',
  speciesId: 3,
  classId: CharacterClass.ROGUE,
  backgroundId: 5,
};

export function kaelTestName(): string {
  return `${kaelIdentity.name}-${Date.now()}`;
}

export const kaelAbilityScores = {
  abilityScores: {
    base: { STR: 8, DEX: 14, CON: 12, INT: 13, WIS: 12, CHA: 10 },
    bonuses: { STR: 0, DEX: 1, CON: 1, INT: 1, WIS: 0, CHA: 0 },
  },
};

export const kaelSkillChoices = {
  skillProficiencies: ['Investigation', 'Perception', 'Acrobatics', 'Deception'],
};

export const kaelClassEquipment = {
  optionLabel: 'A',
};

export const kaelBackgroundEquipment = {
  optionIndex: 0,
};
