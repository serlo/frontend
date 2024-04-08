/**
 * Calucate greatest common denominator from input numbers
 */
export const getGcd = function (a: number, b: number): number {
  if (b === 0) return a
  return getGcd(b, a % b)
}
