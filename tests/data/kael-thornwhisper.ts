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
    base: { STR: 8, DEX: 13, CON: 13, INT: 14, WIS: 12, CHA: 10 },
    bonuses: { STR: 0, DEX: 2, CON: 0, INT: 0, WIS: 0, CHA: 0 },
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
