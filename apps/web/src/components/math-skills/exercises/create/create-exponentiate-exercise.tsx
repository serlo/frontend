import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function createExponentiateExercise() {
  return {
    title: 'Potenzwert berechnen',
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          const base = randomIntBetween(0, 12)
          const powerLimit = Math.floor(
            base === 10 ? 6 : base > 4 ? 2 : 8 - base * 1.2
          )
          const mode = randomItemFromArray(['trivial', 'normal', 'normal'])
          const power = mode === 'trivial' ? 1 : randomIntBetween(2, powerLimit)
          return { base, power }
        }}
        getCorrectValue={({ base, power }) => {
          return Math.pow(base, power)
        }}
        render={(input, { base, power }) => {
          return (
            <>
              <h2 className="mt-8 pb-4 text-left text-2xl">
                Berechne den Potenzwert
              </h2>
              <div className="ml-0.5 text-2xl font-bold" id="number-input">
                <span className="text-newgreen">
                  {base}
                  <sup className="ml-0.5">{power}</sup>
                </span>
                {' = '}
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  }
}
