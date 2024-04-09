import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildBlock, buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function IceCreamShop() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const mode = randomItemFromArray(['count', 'twoSame'])

        const kugeln = randomIntBetween(2, 3)
        const n = randomIntBetween(3, kugeln === 3 ? 6 : 11)

        return {
          mode,
          kugeln,
          n,
        }
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTask={({ mode, n, kugeln }) => {
        const kugelnStr =
          kugeln === 1
            ? 'eine Kugel'
            : kugeln === 2
              ? 'zwei verschiedene Kugeln'
              : 'drei verschiedene Kugeln'
        return (
          <>
            <p className="text-2xl">
              In der besten Eisdiele Bayerns gibt es {n} Sorten Eis, die alle
              gleich beliebt sind.
            </p>
            {mode === 'count' && (
              <p className="serlo-main-task">
                Berechnen Sie die Anzahl der Möglichkeiten, dass eine Kundin{' '}
                {kugelnStr} Eis wählt.
              </p>
            )}
            {mode === 'twoSame' && (
              <p className="serlo-main-task">
                Berechnen Sie die Wahrscheinlichkeit, dass zwei Kundinnen die
                gleiche Zusammenstellung von {kugelnStr} Eis wählen.
              </p>
            )}
          </>
        )
      }}
      renderSolution={({ kugeln, n, mode }) => {
        const product = []
        let val = 1
        for (let i = 0; i < kugeln; i++) {
          product.push((n - i).toString())
          val = val * (n - i)
        }
        return (
          <>
            <p>
              Berechne die Anzahl der Möglichkeiten für eine Kundin, indem du
              für jede der {kugeln} Kugeln einmal die Anzahl der Sorten
              multiplizierst. Damit sich die Sorten nicht wiederholen,
              verkleinert sich der Faktor jedes Mal um 1:
            </p>
            {buildBlock(
              mode === 'count' ? 'green' : 'gray',
              <>
                {product.join(' · ')} = {val}
              </>
            )}
            {mode === 'twoSame' && (
              <>
                <p>
                  Die erste Kundin darf jede Zusammenstellung wählen, für sie
                  gibt es keine Einschränkungen, daher ist die
                  Wahrscheinlichkeit 1. Die zweite Kundin hat dann nur noch eine
                  günstige Möglichkeit, nämlich die Zusammenstellung der ersten
                  Kundin. Die Wahrscheinlichkeit dafür beträgt{' '}
                  {buildFrac(1, val)}:
                </p>
                {buildBlock(
                  'green',
                  <>
                    P(zwei Kundinnen gleich) = 1 · {buildFrac(1, val)} ={' '}
                    {buildFrac(1, val)}
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
