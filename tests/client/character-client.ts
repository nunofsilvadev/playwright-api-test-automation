import type { APIRequestContext } from '@playwright/test';
import type {
  AbilityScoresPayload,
  CreateCharacterPayload,
  EquipmentChoicePayload,
  PatchCharacterPayload,
} from '../types/character.types';

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export function getCharacters(request: APIRequestContext, token: string) {
  return request.get('/api/characters', { headers: authHeader(token) });
}

export function getCharacterById(request: APIRequestContext, token: string, id: number) {
  return request.get(`/api/characters/${id}`, { headers: authHeader(token) });
}

export function createCharacter(
  request: APIRequestContext,
  token: string,
  data: CreateCharacterPayload,
) {
  return request.post('/api/characters', { headers: authHeader(token), data });
}

export function patchCharacter(
  request: APIRequestContext,
  token: string,
  id: number,
  data: PatchCharacterPayload,
) {
  return request.patch(`/api/characters/${id}`, { headers: authHeader(token), data });
}

export function updateAbilityScores(
  request: APIRequestContext,
  token: string,
  id: number,
  data: AbilityScoresPayload,
) {
  return request.put(`/api/characters/${id}/ability-scores`, {
    headers: authHeader(token),
    data,
  });
}

export function chooseClassEquipment(
  request: APIRequestContext,
  token: string,
  id: number,
  data: EquipmentChoicePayload,
) {
  return request.post(`/api/characters/${id}/equipment/class-choice`, {
    headers: authHeader(token),
    data,
  });
}

export function chooseBackgroundEquipment(
  request: APIRequestContext,
  token: string,
  id: number,
  data: EquipmentChoicePayload,
) {
  return request.post(`/api/characters/${id}/equipment/background-choice`, {
    headers: authHeader(token),
    data,
  });
}

export function deleteCharacter(request: APIRequestContext, token: string, id: number) {
  return request.delete(`/api/characters/${id}`, { headers: authHeader(token) });
}
