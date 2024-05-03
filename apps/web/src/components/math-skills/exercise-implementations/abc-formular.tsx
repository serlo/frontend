/* eslint-disable no-empty-pattern */
import { SelfEvaluationExercise } from './self-evaluation-exercise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomItemFromArray } from '@/helper/random-item-from-array'

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
            <p className="serlo-main-task">
              Bestimmen Sie die Lösungsmenge der Gleichung:
            </p>
            <p className="serlo-highlight-green">
              0 = {a > 1 ? a : ''}x<sup>2</sup> {b > 0 ? '+' : ''} {b}x{' '}
              {c > 0 ? '+' : ''} {c}
            </p>
          </>
        )
      }}
      renderSolution={({ a, n_1, n_2 }) => {
        const b = (-1 * n_1 - n_2) * a
        const c = n_1 * n_2 * a
        return (
          <>
            Verwende die allgemeine Lösungsformel, um die Gleichung zu lösen:
            <p className="serlo-highlight-gray">
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  -b &#177; √<span className="pl-1 overline">b² -4ac </span>
                </>,
                <>2a</>
              )}
            </p>
            <br />
            <br />
            Setze{' '}
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
            <p className="serlo-highlight-gray">
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
            </p>
            <br />
            <br />
            Berechne die Potenz und das Produkt unter der Wurzel:
            <p className="serlo-highlight-gray">
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
            </p>
            <br />
            <br />
            Fasse unter der Wurzel zusammen:
            <br />
            <p className="serlo-highlight-gray">
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  -({b}) &#177; √
                  <span className="pl-1 overline">{b * b - 4 * a * c} </span>
                </>,
                <>{2 * a}</>
              )}
            </p>
            <br />
            <br />
            Ziehe die Wurzel und fasse weiter zusammen:
            <br />
            <p className="serlo-highlight-gray">
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  {-b} &#177; {Math.sqrt(b * b - 4 * a * c)}
                </>,
                <>{2 * a}</>
              )}
            </p>
            <br />
            <br />
            Daraus ergeben sich die beiden Lösungen:
            <br />
            <p className="serlo-highlight-gray">
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
            </p>
            <br />
            <p className="serlo-highlight-gray">
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
            </p>
            <br />
            <br />
            Die Lösungsmenge ist:
            <br />
            <p className="serlo-highlight-green">
              L = {'{'}
              {(-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a};
              {(-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a}
              {'}'}
            </p>
          </>
        )
      }}
      renderHint={({}) => {
        return (
          <>
            Löse die Gleichung mit der allgemeinen Lösungsformel:
            <br />
            <p className="serlo-highlight-gray">
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  -b &#177; √<span className="pl-1 overline">b² -4ac </span>
                </>,
                <>2a</>
              )}
            </p>
            <br />
            Bestimme dazu <strong>a</strong>, <strong>b</strong> und{' '}
            <strong>c</strong> aus der Gleichung und setze ein.
          </>
        )
      }}
    />
  )
}
