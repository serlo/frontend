/**
 * get an array of ints from lower to upper
 * params are inclusive and support negative numbers
 * @param {number} lower inclusive lower bound
 * @param {number} upper inclusive upper bound
 * @param {number[]} exclude optional array of numbers to exclude
 */
export function getIntRange(
  lower: number,
  upper: number,
  exclude?: number[]
): number[] {
  if (!Number.isSafeInteger(lower) || !Number.isSafeInteger(upper)) {
    throw 'only integers allowed'
  }

  const length = upper + 1 - lower
  const all = Array.from({ length }, (_, k) => k + lower)
  return exclude ? all.filter((value) => !exclude.includes(value)) : all
}
