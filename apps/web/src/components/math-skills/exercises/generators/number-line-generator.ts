import { getIntRange } from '@/helper/get-int-range'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function numberLineGeneratorLevel1(): [number, number, number] {
  const kind = randomItemFromArray([0, 1])
  if (kind === 0) {
    const maxVal = 40

    const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
    const searchValues = getIntRange(10, 39, [labeledPos * 40])
    const searchedVal = randomItemFromArray(searchValues)
    return [searchedVal, labeledPos, maxVal]
  } else {
    const maxVal = randomItemFromArray([8000, 12000, 16000, 20000])
    const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
    const possibleSearchValues = [
      maxVal / 4,
      maxVal / 2,
      (maxVal / 4) * 3,
      maxVal,
    ].filter((val) => val !== maxVal * labeledPos)
    const searchedVal = randomItemFromArray(possibleSearchValues)
    return [searchedVal, labeledPos, maxVal]
  }
}

export function numberLineGeneratorLevel2(): [number, number, number] {
  const step = randomItemFromArray([10, 20])
  const maxVal = 40 * step

  const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
  const searchValues = getIntRange(10, 39, [labeledPos * 40])
  const searchedVal = randomItemFromArray(searchValues)
  return [searchedVal * step, labeledPos, maxVal]
}

export function numberLineGeneratorLevel3(): [number, number, number] {
  const kind = randomItemFromArray([0, 1])
  if (kind === 0) {
    return numberLineGeneratorLevel2()
  } else {
    const maxVal = randomItemFromArray([8000, 12000, 16000, 20000])
    const labeledPos = randomItemFromArray([0.25, 0.5, 0.75, 1])
    const possibleSearchValues = [
      maxVal / 4,
      maxVal / 2,
      (maxVal / 4) * 3,
      maxVal,
    ].filter((val) => val !== maxVal * labeledPos)
    const searchedVal = randomItemFromArray(possibleSearchValues)
    return [searchedVal, labeledPos, maxVal]
  }
}
