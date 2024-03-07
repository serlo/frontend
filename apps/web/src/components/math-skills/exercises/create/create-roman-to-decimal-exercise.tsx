import { NumberInputExercise } from '../../number-input-exercise/number-input-exercise'
import { toRoman } from '../../utils/roman-numerals'
import { randomIntBetween } from '@/helper/random-int-between'

export function createRomanToDecimalExercise(
  level: string,
  from: number,
  to: number
) {
  return {
    title: 'Römische Zahl in Dezimal umrechnen',
    level,
    component: (
      <NumberInputExercise
        generator={() => {
          return randomIntBetween(from, to)
        }}
        getCorrectValue={(val) => val}
        centAmount={35}
        render={(input, value) => {
          return (
            <>
              <p className="text-center font-serif text-2xl">
                Gegeben ist die römische Zahl
                <br />
                {toRoman(value)}
              </p>
              <p className="mt-4 text-center" id="number-input">
                Gib die Zahl als Dezimalzahl an!
                <br />
                {input}
              </p>
            </>
          )
        }}
      />
    ),
    smallprint: (
      <>
        Die römische Zahlenschrift verwendet folgende Zeichen:
        <br />I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000.
      </>
    ),
  }
}
