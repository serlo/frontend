import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildBlock, buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function IceCreamShop() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const mode = randomItemFromArray(['twoSame', 'count'])
        const numberOfIce = randomIntBetween(
          mode === 'count' ? 2 : 1,
          mode === 'count' ? 4 : 2
        )
        const numberOfSorts = randomIntBetween(
          2,
          mode === 'count' && numberOfIce <= 2 ? 8 : 5
        )
        return {
          numberOfSorts,
          numberOfIce,
          mode,
        }
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTask={({ mode, numberOfIce, numberOfSorts }) => {
        const kugeln =
          numberOfIce === 1 ? 'eine Kugel' : `${numberOfIce} Kugeln`
        return (
          <>
            <p className="text-2xl">
              In der besten Eisdiele Bayerns gibt es {numberOfSorts} Sorten Eis,
              die alle gleich beliebt sind.
            </p>
            {mode === 'count' && (
              <p className="mt-3 text-2xl">
                Berechnen Sie die Anzahl der Möglichkeiten, dass eine Kundin{' '}
                {kugeln} Eis wählt.
                {numberOfIce > 1 &&
                  ' Die Reihenfolge bei der Auswahl der Sorten ist zu berücksichtigen.'}
              </p>
            )}
            {mode === 'twoSame' && (
              <p className="mt-3 text-2xl">
                Berechnen Sie die Wahrscheinlichkeit dafür, dass zwei Kundinnen
                die gleiche {numberOfIce === 1 ? 'Auswahl' : 'Zusammenstellung'}{' '}
                für {kugeln} Eis {numberOfIce === 1 ? 'treffen' : 'wählen'}.
                {numberOfIce > 1 &&
                  ' Die Reihenfolge bei der Auswahl der Sorten ist zu berücksichtigen.'}
              </p>
            )}
          </>
        )
      }}
      renderSolution={({ numberOfSorts, numberOfIce, mode }) => {
        const product = []
        for (let i = 0; i < numberOfIce; i++) {
          product.push(numberOfSorts.toString())
        }
        const productN = Math.pow(numberOfSorts, numberOfIce)
        const needIntermediate = numberOfIce > 1
        return (
          <>
            {needIntermediate && (
              <>
                <p>
                  Berechne die Anzahl der Möglichkeiten für eine Kundin, indem
                  du für jede der {numberOfIce} Kugeln einmal die Anzahl der
                  Sorten multiplizierst:
                </p>
                {buildBlock(
                  mode === 'count' ? 'green' : 'gray',
                  <>
                    {product.join(' · ')} = {productN}
                  </>
                )}
              </>
            )}
            {mode === 'twoSame' && (
              <>
                <p>
                  Eins geteilt durch{' '}
                  {needIntermediate ? 'diese Zahl' : 'die Anzahl der Sorten'}{' '}
                  ist die Wahrscheinlichkeit, dass eine Kundin diese bestimmte
                  Kombination auswählt. Damit beide Kundinnen das gleiche
                  Produkt auswählen, multipliziere zweimal diese
                  Wahrscheinlichkeit:
                </p>
                {buildBlock(
                  'green',
                  <>
                    {buildFrac(1, productN)} · {buildFrac(1, productN)} ={' '}
                    {buildFrac(1, productN * productN)}
                  </>
                )}
              </>
            )}
          </>
        )
      }}
    />
  )
}
