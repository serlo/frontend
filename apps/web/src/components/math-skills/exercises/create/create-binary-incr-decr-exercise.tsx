import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function createBinaryIncrDescExercise(
  level: 'Nachfolger' | 'Vorgänger' | 'Kombi'
) {
  return {
    title: 'Dualzahlen Ordnung',
    level,
    component: (
      <NumberInputExercise
        centAmount={35}
        generator={() => {
          const direction = randomItemFromArray(
            level === 'Nachfolger'
              ? ['up']
              : level === 'Vorgänger'
                ? ['down']
                : ['up', 'down']
          )
          const digits = randomIntBetween(2, 6)
          const output = [1]
          while (output.length < digits) {
            output.push(randomIntBetween(0, 1))
          }
          const showValue = output.join('')
          const resultValue = parseInt(
            (parseInt(showValue, 2) + (direction === 'up' ? 1 : -1)).toString(2)
          )

          return { showValue, resultValue, direction }
        }}
        getCorrectValue={({ resultValue }) => {
          return resultValue
        }}
        render={(input, { showValue, direction }) => {
          return (
            <>
              <h2 className="mr-12 pb-5 text-2xl text-almost-black">
                Wie lautet der{' '}
                <b className="text-newgreen">
                  {direction === 'up' ? 'Nachfolger' : 'Vorgänger'}
                </b>{' '}
                der Zahl <b className="font-mono text-newgreen">{showValue}</b>?
              </h2>
              <p>Gib die Antwort als Dualzahl an.</p>
              <div className="ml-0.5 mt-2 font-mono" id="number-input">
                {input}
              </div>
            </>
          )
        }}
      />
    ),
  }
}
