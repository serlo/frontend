import { MultipleChoiceExercise } from '../../exercise-implementations/multiple-choice-exercise'
import { arrayOfLength } from '@/helper/array-of-length'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function createFindCorrectlyRoundedExercise(level: 1 | 2 | 3) {
  return {
    title: 'Wurde richtig gerundet?',
    level: `Level ${level}`,
    component: (
      <MultipleChoiceExercise
        centAmount={35}
        generator={() => {
          const [target, factor] = randomItemFromArray([
            ['Zehner', 10],
            ['Hunderter', 100],
            ['Tausender', 1000],
            ['Zehntausender', 10000],
          ])
          const number =
            Math.round(randomIntBetween(10000, 50000) / factor) * factor
          const lowerBound = level === 1 ? number : number - 0.8 * factor
          const upperBound = level === 2 ? number : number + 0.8 * factor
          return {
            number,
            lowerBound,
            upperBound,
            target,
            factor,
          }
        }}
        getOptions={({ number, lowerBound, upperBound, factor }) => {
          return arrayOfLength(4).map(() => {
            const n = randomIntBetween(lowerBound, upperBound)
            return {
              title: `${n}`,
              isCorrect: Math.round(n / factor) * factor === number,
            }
          })
        }}
        render={(choices, { number, target }) => {
          return (
            <>
              <div className="mb-4 text-2xl">
                Eine auf{' '}
                <span className="font-bold text-newgreen">{target}</span>{' '}
                gerundete Zahl
                <br />
                lautet <span className="font-bold text-newgreen">{number}</span>
                .
              </div>
              <p className="mb-4 text-xl">
                Welche Zahlen sind richtig gerundet?
              </p>
              <div className="font-mono">{choices}</div>
            </>
          )
        }}
      />
    ),
  }
}
