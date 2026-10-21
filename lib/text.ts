/** Accept editorial copy with either real newlines or escaped line breaks. */
export function normalizeLineBreaks(value: string) {
  return value.replaceAll('\\n', '\n');
}
