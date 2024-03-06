import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { randomIntBetween } from '@/helper/random-int-between'

export function createDecimalToDualExercise(
  level: string,
  from: number,
  to: number
) {
  return {
    title: 'Dezimalzahl in Dualzahl umrechnen',
    level,
    component: (
      <NumberInputExercise
        generator={() => {
          return randomIntBetween(from, to)
        }}
        getCorrectValue={(val) => parseInt(val.toString(2))}
        centAmount={35}
        render={(input, value) => {
          return (
            <>
              <p className="text-2xl">Gegeben ist die Dezimalzahl {value}.</p>
              <p className="my-4 text-2xl">Gib sie als Dualzahl an:</p>
              <p>{input}</p>
            </>
          )
        }}
      />
    ),
  }
}
