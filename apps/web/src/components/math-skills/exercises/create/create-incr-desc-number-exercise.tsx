import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function createIncrDescNumberExercise(
  level: 'Level 1' | 'Level 2' | 'Level 3' | 'Profi'
) {
  return {
    title: 'Zahlen vergrößern & verkleinern',
    level,
    component: (
      <NumberInputExercise
        centAmount={35}
        widthForDigits={15}
        generator={() => {
          const diff = randomItemFromArray([10, 100, 1000])
          const isIncr = randomItemFromArray([true, false])
          const number =
            level === 'Profi'
              ? randomIntBetween(isIncr ? 0 : 1, 18) * 1000000 +
                randomIntBetween(1, 1000)
              : randomIntBetween(
                  isIncr ? 11 : 2000,
                  level === 'Level 1'
                    ? 18000
                    : level === 'Level 2'
                      ? 18000
                      : 180000
                )
          return { diff, isIncr, number }
        }}
        getCorrectValue={({ diff, number, isIncr }) => {
          return number + diff * (isIncr ? 1 : -1)
        }}
        render={(input, { diff, number, isIncr }) => {
          return (
            <>
              <h2 className="mt-8 pb-4 text-left text-2xl">
                Welche Zahl ist <wbr />
                <span className="whitespace-nowrap font-bold text-newgreen">
                  um {diff} {isIncr ? 'größer' : 'kleiner'} als {number}
                </span>
                &thinsp;?
              </h2>
              <div className="ml-0.5 text-2xl font-bold" id="number-input">
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  }
}
