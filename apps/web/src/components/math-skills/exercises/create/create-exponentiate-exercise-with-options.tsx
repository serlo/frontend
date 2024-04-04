import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { randomIntBetween } from '@/helper/random-int-between'

export function createSquareNumberExercise() {
  return {
    title: 'Quadratzahlen berechnen',
    component: (
      <NumberInputExercise
        centAmount={150}
        generator={() => {
          const base = randomIntBetween(1, 10)
          const power = 2
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
        renderFeedback={() => {
          return <>123</>
        }}
      />
    ),
  }
}
