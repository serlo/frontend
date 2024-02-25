/**
 * get a pseudo random int between two ints
 * params are inclusive and support negative numbers
 * @param {number} lower inclusive lower bound
 * @param {number} upper inclusive upper bound
 * @returns {number} pseudo random int inside bounds
 */
export function randomIntBetween(lower: number, upper: number): number {
  if (!Number.isSafeInteger(lower) || !Number.isSafeInteger(upper)) {
    throw 'only integers allowed'
  }

  return Math.floor(Math.random() * (upper + 1 - lower) + lower)
}
