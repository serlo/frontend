export function roundToDigits(n: number, digits: number) {
  const factor = Math.pow(10, digits)
  return Math.round(n * factor) / factor
}
