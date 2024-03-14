import { SelfEvaluationExercise } from './self-evaluation-exercise'
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
            <h2 className="text-2xl">
              Bestimme die Lösungsmenge der Gleichung:
            </h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              0 = {a > 1 ? a : ''}x<sup>2</sup> {b > 0 ? '+' : ''} {b}x{' '}
              {c > 0 ? '+' : ''} {c}
            </span>

            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
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
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              0 = {a > 1 ? a : ''}x<sup>2</sup> {b > 0 ? '+' : ''} {b}x{' '}
              {c > 0 ? '+' : ''} {c}
            </span>
            <br />
            Wir verwenden die abc-Formel um die Gleichung zu lösen:
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  -b &#177; √<span className="pl-1 overline">b² -4ac </span>
                </>,
                <>2a</>
              )}
            </span>
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
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
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
            </span>
            <br />
            <br />
            Berechne die Potenz und das Produkt unter der Wurzel:
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
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
            </span>
            <br />
            Fasse unter der Wurzel zusammen:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  -({b}) &#177; √
                  <span className="pl-1 overline">{b * b - 4 * a * c} </span>
                </>,
                <>{2 * a}</>
              )}
            </span>
            <br />
            Ziehe die Wurzel und fasse weiter zusammen:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              x<sub>1,2</sub> ={' '}
              {buildFrac(
                <>
                  {-b} &#177; {Math.sqrt(b * b - 4 * a * c)}
                </>,
                <>{2 * a}</>
              )}
            </span>
            <br />
            Daraus ergeben sich die beiden Lösungen:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
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
              = {((-b + Math.sqrt(b * b - 4 * a * c)) / 2) * a}
            </span>
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
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
              = {((-b - Math.sqrt(b * b - 4 * a * c)) / 2) * a}
            </span>
          </>
        )
      }}
      centAmount={35}
    />
  )
}
