/** Non-spacing marks (accents) left over after NFD decomposition, e.g. "é" → "e" + "´". */
const DIACRITICS = /\p{Mn}/gu;

/** Postel's law for search: ignore case, accents and surrounding whitespace. */
export const normalize = (text: string): string =>
  text.normalize('NFD').replace(DIACRITICS, '').toLowerCase().trim();

/**
 * Postel's law: accept messy input, give back clean output.
 * Collapses repeated spaces and trims; emails also lose inner spaces and are lowercased.
 */
export const cleanField = (name: string, value: string): string => {
  const collapsed = value.replace(/[ \t]+/g, ' ').trim();
  return name === 'email' ? collapsed.replace(/\s/g, '').toLowerCase() : collapsed;
};
