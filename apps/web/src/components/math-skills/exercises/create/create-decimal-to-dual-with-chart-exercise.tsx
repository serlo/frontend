import { MultipleNumberInputExercise } from '../../number-input-exercise/multiple-number-input-exercise'
import { arrayOfLength } from '@/helper/array-of-length'

export function createDecimalToDualWithChartExercise(level: string) {
  return {
    title: 'Dezimalzahl in Dualzahl umrechnen mit Stellenwerttafel',
    level,
    component: (
      <MultipleNumberInputExercise
        numberOfInputs={5}
        generator={() => [1, 1, 1, 1, 1]}
        getCorrectValues={(val) => val}
        centAmount={35}
        widthForDigits={3}
        render={(inputs) => {
          return (
            <>
              <div className="my-8 flex border-l-4">
                {arrayOfLength(5).map((el, i) => {
                  return (
                    <div key={i} className="border-r-4 px-2">
                      {Math.pow(2, 5 - i)}er
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
