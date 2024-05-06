import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildLatex } from '../utils/math-builder'
import { pp, ppPolynom } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function FindParabola() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const mode = randomItemFromArray(['1.1', '2.1', '3.1'])

        const sx = randomItemFromArray([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])
        const sy = randomItemFromArray([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5])

        const a = randomItemFromArray([0.1, 0.2, 0.5, 1, 2, 3])

        const px = randomIntBetween(-10, 10)

        const b = 2 * -sx * a
        const c = a * sx * sx + sy
        const py = px * px * a + px * b + c

        return { mode, sx, sy, a, b, c, px, py }
      }}
      renderTask={(data) => {
        if (data.mode === '1.1') {
          return (
            <>
              <p className="serlo-main-task">
                Die Parabel mit dem Scheitel S ( {pp(data.sx)} | {pp(data.sy)} )
                hat eine Gleichung der Form y ={' '}
                {data.a === 1 ? null : pp(data.a)}
                x² + bx + c mit b, c, x, y, {buildLatex('\\in\\R')}. Bestimmen
                Sie die Gleichung der Parabel in Normalform.
              </p>
            </>
          )
        }
        if (data.mode === '2.1') {
          return (
            <>
              <p className="serlo-main-task">
                Eine Parabel der Form y = {data.a === 1 ? null : pp(data.a)}
                x² + bx + c mit b, c, x, y, {buildLatex('\\in\\R')} schneidet
                die y-Achse bei y = {pp(data.c)} und verläuft durch den Punkt P
                ( {pp(data.px)} | {pp(data.py)} ). Bestimmen Sie die Gleichung
                der Parabel in Normalform.
              </p>
            </>
          )
        }
        return (
          <>
            <p className="serlo-main-task">
              Eine Parabel besitzt den Scheitel ( {pp(data.sx)} | {pp(data.sy)}{' '}
              ) und verläuft durch den Punkt P ( {pp(data.px)} | {pp(data.py)}{' '}
              ). Die Parabel hat eine Gleichung der Form y = ax² + bx + c.
              Bestimmen Sie die Gleichung der Parabel in Scheitelform.
            </p>
          </>
        )
      }}
      renderSolution={(data) => {
        if (data.mode === '1.1') {
          return (
            <>
              <p>Stelle die Scheitelpunktform auf:</p>
              <p className="serlo-highlight-gray">
                y = {data.a === 1 ? null : pp(data.a)}(x{' '}
                {pp(-data.sx, 'merge_op')}
                )² {pp(data.sy, 'merge_op')}
              </p>
              <p>Multipliziere die innere Klammer:</p>
              <p className="serlo-highlight-gray">
                y = {data.a === 1 ? null : pp(data.a)}(
                {ppPolynom([
                  [1, 'x', 2],
                  [2 * -data.sx, 'x', 1],
                  [data.sx * data.sx, '', 0],
                ])}
                ) {pp(data.sy, 'merge_op')}
              </p>
              {data.a !== 1 && (
                <>
                  <p>Multipliziere mit dem Vorfaktor:</p>
                  <p className="serlo-highlight-gray">
                    y ={' '}
                    {ppPolynom([
                      [data.a * 1, 'x', 2],
                      [data.a * 2 * -data.sx, 'x', 1],
                      [data.a * data.sx * data.sx, '', 0],
                    ])}{' '}
                    {pp(data.sy, 'merge_op')}
                  </p>
                </>
              )}
              <p>Addiere die konstanten Terme und erhalte das Ergebnis:</p>
              <p className="serlo-highlight-green">
                y ={' '}
                {ppPolynom([
                  [data.a * 1, 'x', 2],
                  [data.a * 2 * -data.sx, 'x', 1],
                  [data.a * data.sx * data.sx + data.sy, '', 0],
                ])}
              </p>
            </>
          )
        }
        if (data.mode === '2.1') {
          return (
            <>
              <p>
                Aus dem Schnittpunkt mit der y-Achse folgt c = {pp(data.c)}.
                Setze c und P in die Gleichung ein:
              </p>
              <p className="serlo-highlight-gray">
                {pp(data.py)} = {pp(data.a)} · {pp(data.px, 'embrace_neg')}² + b
                · {pp(data.px, 'embrace_neg')} {pp(data.c, 'merge_op')}
              </p>
              <p>Vereinfache und löse nach b auf:</p>
              <p className="serlo-highlight-gray">
                {pp(data.py)} ={' '}
                {ppPolynom([
                  [data.a * data.px * data.px + data.c, '', 0],
                  [data.px, 'b', 1],
                ])}
                <br />
                <br />b = {pp(data.b)}
              </p>
              <p>Erhalte das Ergebnis:</p>
              <p className="serlo-highlight-green">
                y ={' '}
                {ppPolynom([
                  [data.a * 1, 'x', 2],
                  [data.b, 'x', 1],
                  [data.c, '', 0],
                ])}
              </p>
            </>
          )
        }
        return (
          <>
            <p>Stelle die Scheitelform auf:</p>
            <p className="serlo-highlight-gray">
              y = a(x {pp(-data.sx, 'merge_op')})² {pp(data.sy, 'merge_op')}
            </p>
            <p>Setze den Punkt P ein:</p>
            <p className="serlo-highlight-gray">
              {pp(data.py)} = a({pp(data.px)} {pp(-data.sx, 'merge_op')})²{' '}
              {pp(data.sy, 'merge_op')}
            </p>
            <p>Vereinfache die Gleichung und bestimme a:</p>
            <p className="serlo-highlight-gray">
              {pp(data.py)} = {pp(Math.pow(data.px - data.sx, 2))}a{' '}
              {pp(data.sy, 'merge_op')}
              <br />
              <br />a = {pp(data.a)}
            </p>
            <p>Setze a in die Scheitelform ein und erhalte das Ergebnis:</p>
            <p className="serlo-highlight-green">
              y = {data.a === 1 ? null : pp(data.a)}(x{' '}
              {pp(-data.sx, 'merge_op')})² {pp(data.sy, 'merge_op')}
            </p>
          </>
        )
      }}
    />
  )
}
