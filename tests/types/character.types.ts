export type CreateCharacterPayload = {
  name: string;
  classId?: number;
  speciesId?: number;
  backgroundId?: number;
};

export type PatchCharacterPayload = {
  classId?: number;
  speciesId?: number;
  backgroundId?: number;
  skillProficiencies?: string[];
};

export type AbilityScoreValues = {
  STR: number;
  DEX: number;
  CON: number;
  INT: number;
  WIS: number;
  CHA: number;
};

export type AbilityScoresPayload = {
  abilityScores: {
    base: AbilityScoreValues;
    bonuses: AbilityScoreValues;
  };
};

export type EquipmentChoicePayload = {
  optionLabel?: string;
  optionIndex?: number;
};

export type CharacterSummary = {
  id: number;
  name: string;
  status: string;
  classId: number | null;
  speciesId: number | null;
  backgroundId: number | null;
  level: number;
  missingFields?: string[];
  skillProficiencies?: string[];
};
