import { OrderValues } from '../../exercise-implementations/order-values'
import { toRoman } from '../../utils/roman-numerals'
import { randomIntBetween } from '@/helper/random-int-between'
import { shuffleArray } from '@/helper/shuffle-array'

export function createOrderRomanExercise(
  level: string,
  mode: 'small-number' | 'consecutive',
  from?: number,
  to?: number
) {
  return {
    title: 'Römische Zahlen ordnen',
    level,
    component: (
      <OrderValues
        centAmount={52}
        display={(x) => toRoman(x)}
        generator={() => {
          if (mode === 'small-number') {
            const candidates = []
            for (let i = 5; i <= 30; i++) {
              candidates.push(i)
            }
            return { values: shuffleArray(candidates).slice() }
          } else {
            const v1 = randomIntBetween(from ?? 5, to ?? 30)
            const v2 = v1 - randomIntBetween(1, 10)
            const v3 = v2 - randomIntBetween(1, 10)
            const v4 = v3 - randomIntBetween(1, 10)
            const v5 = v4 - randomIntBetween(1, 10)
            return { values: shuffleArray([v1, v2, v3, v4, v5]) }
          }
        }}
      />
    ),
  }
}
