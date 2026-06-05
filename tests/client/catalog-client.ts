import type { APIRequestContext } from '@playwright/test';

export function getAttributes(request: APIRequestContext) {
  return request.get('/api/attributes');
}

export function getClasses(request: APIRequestContext) {
  return request.get('/api/classes');
}

export function getClassById(request: APIRequestContext, id: number) {
  return request.get(`/api/classes/${id}`);
}

export function getSpecies(request: APIRequestContext) {
  return request.get('/api/species');
}

export function getSpeciesById(request: APIRequestContext, id: number) {
  return request.get(`/api/species/${id}`);
}

export function getBackgrounds(request: APIRequestContext) {
  return request.get('/api/backgrounds');
}

export function getBackgroundById(request: APIRequestContext, id: number) {
  return request.get(`/api/backgrounds/${id}`);
}
