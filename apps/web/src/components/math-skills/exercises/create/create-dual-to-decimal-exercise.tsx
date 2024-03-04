import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { randomIntBetween } from '@/helper/random-int-between'

export function createBinaryToDecimalExercise(level: string, maxVal: number) {
  return {
    title: 'Dualzahl in Dezimal umrechnen',
    level,
    component: (
      <NumberInputExercise
        generator={() => {
          return randomIntBetween(2, maxVal)
        }}
        getCorrectValue={(val) => val}
        centAmount={35}
        render={(input, val) => {
          return (
            <>
              <p className="mb-4 text-2xl">
                Gegeben ist die Dualzahl {val.toString(2)}
                <sub>2</sub>.
              </p>
              <p className="mb-4">Gib die Zahl als Dezimalzahl an.</p>
              <p>{input}</p>
            </>
          )
        }}
      />
    ),
  }
}
