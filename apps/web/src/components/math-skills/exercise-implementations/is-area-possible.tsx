import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildLatex } from '../utils/math-builder'
import { pp, ppPolynom } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function IsAreaPossible() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const type = randomItemFromArray([
          'Rauten',
          'Drachenvierecke',
          'Trapeze',
          'Parallelogramme',
        ])
        const nst_1 = randomIntBetween(-6, -1)
        const nst_2 = randomIntBetween(2, 10)

        const b = nst_1 + nst_2
        const c = -nst_1 * nst_2

        const s_x = (nst_1 + nst_2) / 2
        const s_y = -s_x * s_x + b * s_x + c

        const mode = randomItemFromArray(['impossible', 'check'])

        const impossibleArea = randomIntBetween(
          Math.ceil(s_y + 3),
          Math.ceil(s_y + 3) + 10
        )
        const possibleArea = randomIntBetween(1, Math.floor(s_y))

        const isPossible = randomItemFromArray([true, false])

        const maybePossibleArea = isPossible ? possibleArea : impossibleArea

        return {
          type,
          b,
          c,
          mode,
          impossibleArea,
          nst_1,
          nst_2,
          maybePossibleArea,
        }
      }}
      renderTask={(data) => {
        return (
          <>
            <p className="serlo-main-task">
              Für den Flächeninhalt A der {data.type} A<sub>n</sub>B<sub>n</sub>
              C<sub>n</sub>D<sub>n</sub> in Abhängigkeit von x{' '}
              {buildLatex('\\in')} ]{pp(data.nst_1)};{pp(data.nst_2)}[ gilt:
            </p>
            <p className="serlo-main-task">
              A(x) = (
              {ppPolynom([
                [-1, 'x', 2],
                [data.b, 'x', 1],
                [data.c, 'x', 0],
              ])}
              ) FE
            </p>
            {data.mode === 'impossible' && (
              <p className="serlo-main-task">
                Begründen Sie, dass{' '}
                {data.type === 'Rauten' ? 'keine' : 'keines'} der {data.type}{' '}
                einen Flächeninhalt von {data.impossibleArea}&nbsp;FE haben
                kann.
              </p>
            )}
            {data.mode === 'check' && (
              <p className="serlo-main-task">
                Überprüfen Sie, ob {data.type === 'Rauten' ? 'eine' : 'eines'}{' '}
                der {data.type} einen Flächeninhalt von {data.maybePossibleArea}{' '}
                FE&nbsp;haben kann.
              </p>
            )}
          </>
        )
      }}
      renderSolution={(data) => {
        if (data.mode === 'impossible' || data.mode === 'check') {
          const A =
            data.mode === 'check' ? data.maybePossibleArea : data.impossibleArea
          const D = data.b * data.b + 4 * (data.c - A)
          return (
            <>
              <p>Betrachte diese Gleichung:</p>
              <p className="serlo-highlight-gray">
                {pp(A)} ={' '}
                {ppPolynom([
                  [-1, 'x', 2],
                  [data.b, 'x', 1],
                  [data.c, 'x', 0],
                ])}
              </p>
              <p>Stelle die Gleichung um und berechne die Diskriminante:</p>
              <p className="serlo-highlight-gray">
                {ppPolynom([
                  [-1, 'x', 2],
                  [data.b, 'x', 1],
                  [data.c - A, 'x', 0],
                ])}{' '}
                = 0<br />
                <br />D = b² - 4ac
                <br />D = {pp(data.b, 'embrace_neg')}² - 4 ·{' '}
                {pp(-1, 'embrace_neg')} · {pp(data.c - A, 'embrace_neg')}
                <br />D = {pp(D)}
              </p>
              <p>Folgere daraus:</p>
              {data.mode === 'impossible' && (
                <p className="serlo-highlight-green">
                  Die Diskriminante ist negativ, daher hat diese Gleichung keine
                  Lösung. Der Flächeninhalt kann nie {pp(data.impossibleArea)}
                  &nbsp;FE groß sein.
                </p>
              )}
              {data.mode === 'check' && (
                <p className="serlo-highlight-green">
                  Die Diskriminante ist {D >= 0 ? 'nicht negativ' : 'negativ'},
                  daher hat diese Gleichung{' '}
                  {D >= 0 ? 'mindestens eine' : 'keine'} Lösung. Der
                  Flächeninhalt kann {D < 0 ? 'nie ' : ''}
                  {pp(data.maybePossibleArea)}
                  &nbsp;FE groß sein.
                </p>
              )}
            </>
          )
        }
        return <></>
      }}
    />
  )
}
