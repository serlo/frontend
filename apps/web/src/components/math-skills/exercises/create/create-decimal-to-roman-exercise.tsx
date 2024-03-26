import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { toRoman } from '../../utils/roman-numerals'
import { randomIntBetween } from '@/helper/random-int-between'

export function createDecimalToRomanExercise(
  level: string,
  from: number,
  to: number
) {
  return {
    title: 'Dezimalzahl in römische Zahl umrechnen',
    level,
    component: (
      <NumberInputExercise
        generator={() => {
          return randomIntBetween(from, to)
        }}
        getCorrectStringValue={(val) => toRoman(val)}
        centAmount={35}
        widthForDigits={15}
        render={(input, value) => {
          return (
            <>
              <p className="text-center text-2xl">
                Gegeben ist die Dezimalzahl
                <br />
                {value}
              </p>
              <p className="mt-4 text-center">
                Gib die Zahl als Römische Zahl an!
                <br />
                <span
                  className="font-serif [&>input]:text-center [&>input]:uppercase"
                  id="number-input"
                >
                  {input}
                </span>
              </p>
            </>
          )
        }}
      />
    ),
  }
}
