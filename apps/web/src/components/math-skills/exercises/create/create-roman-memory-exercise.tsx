import { MemoryGame } from '../../exercise-implementations/memory/memory-game'
import { toRoman } from '../../utils/roman-numerals'
import { shuffleArray } from '@/helper/shuffle-array'

export function createRomanMemoryExercise(
  level: string,
  from: number,
  to: number,
  maxLength = 4
) {
  return {
    title: 'Römische Zahlen Memory',
    level,
    component: (
      <MemoryGame
        centAmount={145}
        checkPair={(v0: number | string, v1: number | string) => {
          return (
            (Number.isInteger(v0) ? toRoman(v0 as number) : v0) ===
            (Number.isInteger(v1) ? toRoman(v1 as number) : v1)
          )
        }}
        generator={() => {
          const candidates = []
          for (let i = from; i <= to; i++) {
            if (toRoman(i).length <= maxLength) {
              candidates.push(i)
            }
          }

          const arabic = shuffleArray(candidates).slice(0, 8)
          const roman = arabic.map(toRoman)
          const values = shuffleArray([...arabic, ...roman])
          return { values }
        }}
      />
    ),
  }
}
