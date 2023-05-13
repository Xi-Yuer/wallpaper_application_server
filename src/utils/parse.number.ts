export function parseNumber(
  value: string | undefined | number,
  defaultValue: number,
): number {
  if (value === undefined || value === '' || value <= 0) {
    return defaultValue
  }
  return Number(value)
}
