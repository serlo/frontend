/* eslint-disable no-empty-pattern */
import { SelfEvaluationExercise } from './self-evaluation-exercise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  HighlightGray,
  HighlightGreen,
  MainTask,
} from '../components/content-components'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

export function ABCFormular() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          a: randomIntBetween(1, 2),
          n_1: randomIntBetween(5, 8),
          n_2: randomIntBetween(1, 4),
        }
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTask={({ a, n_1, n_2 }) => {
        const b = (-1 * n_1 - n_2) * a
        const c = n_1 * n_2 * a

        return (
          <>
            <MainTask>Bestimme die Lösungsmenge der Gleichung:</MainTask>
            <HighlightGreen>
              0 = {a > 1 ? a : ''}x<sup>2</sup> {b > 0 ? '+' : ''} {b}x{' '}
              {c > 0 ? '+' : ''} {c}
            </HighlightGreen>
          </>
        )
      }}
      renderSolution={({ a, n_1, n_2 }) => {
        const b = (-1 * n_1 - n_2) * a
        const c = n_1 * n_2 * a
        return (
          <>
            Löse die Gleichung:
            <br />
            <HighlightGray>
              0 = {a > 1 ? a : ''}x<sup>2</sup> {b > 0 ? '+' : ''} {b}x{' '}
              {c > 0 ? '+' : ''} {c}
            </HighlightGray>
            <br />
            <br />
            Wir verwenden die abc-Formel um die Gleichung zu lösen:
            <HighlightGray>
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  -b &#177; √<span className="pl-1 overline">b² -4ac </span>
                </>,
                <>2a</>
              )}
            </HighlightGray>
            <br />
            <br />
            Wir setzen{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              a = {a}
            </span>
            ,{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              b = {b}
            </span>{' '}
            und{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              c = {c}
            </span>{' '}
            ein:
            <br />
            <HighlightGray>
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  -({b}) &#177; √
                  <span className="pl-1 overline">
                    ({b})² - 4 · {a} · {c}{' '}
                  </span>
                </>,
                <>2 · {a}</>
              )}
            </HighlightGray>
            <br />
            <br />
            Berechne die Potenz und das Produkt unter der Wurzel:
            <HighlightGray>
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  -({b}) &#177; √
                  <span className="pl-1 overline">
                    {b * b} - {4 * a * c}{' '}
                  </span>
                </>,
                <>2 · {a}</>
              )}
            </HighlightGray>
            <br />
            <br />
            Fasse unter der Wurzel zusammen:
            <br />
            <HighlightGray>
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  -({b}) &#177; √
                  <span className="pl-1 overline">{b * b - 4 * a * c} </span>
                </>,
                <>{2 * a}</>
              )}
            </HighlightGray>
            <br />
            <br />
            Ziehe die Wurzel und fasse weiter zusammen:
            <br />
            <HighlightGray>
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  {-b} &#177; {Math.sqrt(b * b - 4 * a * c)}
                </>,
                <>{2 * a}</>
              )}
            </HighlightGray>
            <br />
            <br />
            Daraus ergeben sich die beiden Lösungen:
            <br />
            <HighlightGray>
              x<sub>1</sub> ={' '}
              {buildFrac(
                <>
                  {-b} + {Math.sqrt(b * b - 4 * a * c)}
                </>,
                <>{2 * a}</>
              )}{' '}
              ={' '}
              {buildFrac(
                <>{-b + Math.sqrt(b * b - 4 * a * c)}</>,
                <>{2 * a}</>
              )}{' '}
              = {(-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a}
            </HighlightGray>
            <br />
            <HighlightGray>
              x<sub>2</sub> ={' '}
              {buildFrac(
                <>
                  {-b} - {Math.sqrt(b * b - 4 * a * c)}
                </>,
                <>{2 * a}</>
              )}{' '}
              ={' '}
              {buildFrac(
                <>{-b - Math.sqrt(b * b - 4 * a * c)}</>,
                <>{2 * a}</>
              )}{' '}
              = {(-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a}
            </HighlightGray>
            <br />
            <br />
            Die Lösungsmenge ist:
            <br />
            <HighlightGreen>
              L = {'{'}
              {(-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a};
              {(-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a}
              {'}'}
            </HighlightGreen>
          </>
        )
      }}
      renderHint={({}) => {
        return (
          <>
            Löse die Gleichung mit der abc-Formel:
            <br />
            <HighlightGray>
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  -b &#177; √<span className="pl-1 overline">b² -4ac </span>
                </>,
                <>2a</>
              )}
            </HighlightGray>
            <br />
            Bestimme dazu <strong>a</strong>,<strong>b</strong> und{' '}
            <strong>c</strong> aus der Gleichung und setze ein.
          </>
        )
      }}
      centAmount={35}
    />
  )
}
