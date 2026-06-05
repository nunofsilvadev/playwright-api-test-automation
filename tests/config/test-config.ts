export function shouldDeleteCharactersAfterTests(): boolean {
  const value = process.env.DELETE_CHARACTERS_AFTER_TESTS;

  if (value === undefined) {
    return true;
  }

  return value.toLowerCase() === 'true';
}

export function characterPageUrl(id: number): string {
  const base = process.env.BASE_URL ?? 'https://adventurers-guild-api.vercel.app';
  return `${base}/character?id=${id}`;
}
