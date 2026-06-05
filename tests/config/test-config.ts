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

export function logTestCharacter(id: number, name?: string): void {
  const label = name ? `${name} (id=${id})` : `id=${id}`;
  console.log(`Test character ${label}`);
  console.log(`  ${characterPageUrl(id)}`);
}
