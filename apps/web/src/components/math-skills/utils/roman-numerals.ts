/*!
 * adapted from:
 * romanize <https://github.com/jonschlinkert/romanize>
 * Inspired by http://bit.ly/1weeOfY
 *
 * Copyright (c) 2014, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

export function toRoman(arabicInput: number) {
  let num = arabicInput
  let str = ''

  for (let i = 0; i < romanNumbers.length; i++) {
    const key = romanNumbers[i]
    str += key.repeat((num / toRomanLookup[key]) >>> 0)
    num %= toRomanLookup[key]
  }

  return str
}

const toRomanLookup = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
} as const

const romanNumbers = Object.keys(toRomanLookup) as Array<
  keyof typeof toRomanLookup
>

/*!
 * adapted from:
 * deromanize <https://github.com/jonschlinkert/deromanize>
 * Inspired by http://bit.ly/1weeOfY
 *
 * Copyright (c) 2014, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
const deromanizeLookup = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
} as const
const validNumerals = Object.keys(deromanizeLookup) as Array<
  keyof typeof deromanizeLookup
>

/* TODO: not sure if this works as expected, check if we actually need it */
export function deromanize(roman: string) {
  const romanParts = roman.toUpperCase().split('') as typeof validNumerals

  //validate
  if (!romanParts.every((numeral) => validNumerals.includes(numeral))) {
    return NaN
  }

  let num = 0
  let val = 0

  while (romanParts.length) {
    const first = romanParts.shift()
    if (!first) return
    val = deromanizeLookup[first]
    num += val * (val < deromanizeLookup[romanParts[0]] ? -1 : 1)
  }
  return num
}
