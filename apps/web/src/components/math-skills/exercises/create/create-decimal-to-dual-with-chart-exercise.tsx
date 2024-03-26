import { MultipleNumberInputExercise } from '../../number-input-exercise/multiple-number-input-exercise'
import { arrayOfLength } from '@/helper/array-of-length'
import { randomIntBetween } from '@/helper/random-int-between'

export function createDecimalToDualWithChartExercise(
  level: string,
  digitsCount: number
) {
  return {
    title: 'Dezimalzahl in Dualzahl umrechnen mit Stellenwerttafel',
    level,
    component: (
      <MultipleNumberInputExercise
        numberOfInputs={digitsCount}
        generator={() => {
          const value = randomIntBetween(2, Math.pow(2, digitsCount) - 1)
          const digits = value.toString(2).split('')
          while (digits.length < digitsCount) {
            digits.unshift('null')
          }
          return { value, digits }
        }}
        getCorrectValues={({ digits }) => digits.map((x) => parseInt(x))}
        centAmount={35}
        widthForDigits={3}
        render={(inputs, { value }) => {
          return (
            <>
              <p className="text-2xl">Gegeben ist die Dezimalzahl {value}.</p>
              <p className="my-4 text-2xl">Trage sie als Dualzahl ein.</p>
              <div className="my-8 flex border-l-4">
                {arrayOfLength(digitsCount).map((el, i) => {
                  return (
                    <div key={i} className="border-r-4 px-2">
                      {Math.pow(2, digitsCount - i - 1)}er
                      <br />
                      {inputs[i]}
                    </div>
                  )
                })}
              </div>
            </>
          )
        }}
      />
    ),
  }
}
