/**
 * Joins list fragments with a middot that can never start a wrapped line: the
 * separator is bound to the word before it by a non-breaking space, so the
 * line breaks after the dot instead of before it.
 */
export function joinInline(parts: readonly string[]): string {
  return parts.join(" · ");
}
