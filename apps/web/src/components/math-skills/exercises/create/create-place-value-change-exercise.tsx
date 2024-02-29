import { PlaceValueChart } from '../../exercise-implementations/place-value-chart'
import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function createPlaceValueChangeExercise(expert: boolean) {
  return {
    title: 'Stellenwerte ändern',
    level: expert ? 'Profi' : 'Level 1',
    component: (
      <NumberInputExercise
        centAmount={52}
        generator={() => {
          const lower = expert ? 8 : 4
          const upper = expert ? 9 : 8
          const T = randomIntBetween(lower, upper)
          const H = randomIntBetween(lower, upper)
          const Z = randomIntBetween(lower, upper)
          const E = randomIntBetween(lower, upper)
          const from = randomItemFromArray(['T', 'H', 'Z', 'E'])
          const to = randomItemFromArray(
            ['T', 'H', 'Z', 'E'].filter((x) => x !== from)
          )
          const placeValues: { [key: string]: number } = {
            T: 1000,
            H: 100,
            Z: 10,
            E: 1,
          }

          return {
            value:
              T * 1000 +
              H * 100 +
              Z * 10 +
              E -
              placeValues[from] +
              placeValues[to],
            T,
            H,
            Z,
            E,
            from,
            to,
          }
        }}
        getCorrectValue={({ value }) => {
          return value
        }}
        render={(input, { T, H, Z, E, from, to }) => {
          return (
            <>
              <PlaceValueChart T={T} H={H} Z={Z} E={E} />
              <p className="mt-4 text-xl">
                Ein Plättchen wird von <b>{from}</b> nach <b>{to}</b> geschoben.
                <br />
                Wie lautet die neue Zahl?
              </p>
              <div className="ml-0.5 mt-4 text-2xl font-bold" id="number-input">
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  }
}
