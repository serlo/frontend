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
          const placeValues: Record<string, number> = {
            T: 1000,
            H: 100,
            Z: 10,
            E: 1,
          }
          const titles = Object.keys(placeValues)
          const startValue = expert
            ? randomIntBetween(8888, 9999)
            : randomIntBetween(4444, 8888)
          const from = randomItemFromArray(titles)
          const to = randomItemFromArray(titles.filter((x) => x !== from))

          const result = startValue - placeValues[from] + placeValues[to]
          return { startValue, result, from, to }
        }}
        getCorrectValue={({ result }) => result}
        render={(input, { startValue, from, to }) => {
          return (
            <>
              <PlaceValueChart value={startValue} />
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
