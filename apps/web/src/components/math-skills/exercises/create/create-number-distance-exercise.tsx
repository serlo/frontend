import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function createNumberDistancesExercise(
  level: 'Level 1' | 'Level 2' | 'Profi' | 'TopProfi'
) {
  return {
    title: 'Zahlenabstände erkennen',
    level,
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          const baseNumber = randomIntBetween(3, 15)
          const factor = randomItemFromArray([10, 100, 1000])
          const overlay =
            randomIntBetween(3, 15) *
            randomItemFromArray([10000, 100000, 1000000, 10000000])
          const output = {
            a: baseNumber * factor + overlay,
            b: baseNumber * factor * 2 + overlay,
            c: baseNumber * factor * 3 + overlay,
            result: -1,
          }
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          const toFill = randomItemFromArray(
            level === 'Level 1'
              ? ['c']
              : level === 'Level 2'
                ? ['a']
                : level === 'Profi'
                  ? ['a', 'c']
                  : ['a', 'b', 'c']
          ) as 'a' | 'b' | 'c'
          output.result = output[toFill]
          output[toFill] = 0
          return output
        }}
        getCorrectValue={({ result }) => result}
        render={(input, { a, c, b }) => {
          return (
            <>
              <div className="my-5 flex items-baseline text-2xl">
                <span className="inline-block w-24">1. Zahl</span>
                <div className="w-32 text-left font-mono font-bold">
                  {a ? <span className="ml-2">{a}</span> : input}
                </div>
              </div>
              <div className="my-5 flex items-baseline text-2xl">
                <span className="inline-block w-24">2. Zahl</span>
                <div className="w-32 text-left font-mono font-bold">
                  {b ? <span className="ml-2">{b}</span> : input}
                </div>
              </div>
              <div className="my-5 flex items-baseline text-2xl">
                <span className="inline-block w-24">3. Zahl</span>
                <div className="w-32 text-left font-mono font-bold">
                  {c ? <span className="ml-2">{c}</span> : input}
                </div>
              </div>
            </>
          )
        }}
        widthForDigits={9}
      />
    ),
  }
}
