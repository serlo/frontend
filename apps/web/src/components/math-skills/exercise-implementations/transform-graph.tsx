import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildLatex, buildVec, buildVec2 } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function TransformGraph() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        let a = randomItemFromArray([-1, 1, 2, -2, -3, 3, 0.5, 0.2, 1.5])
        let b = randomIntBetween(-4, 4)
        const c = randomIntBetween(-4, -1)
        let d = randomIntBetween(-4, 4)
        const dx = randomIntBetween(1, 4) * randomItemFromArray([1, -1])
        const dy = randomIntBetween(1, 4) * randomItemFromArray([1, -1])

        const mode = randomItemFromArray([
          'parallel',
          'parallel',
          'x-achse',
          'x-achse',
          'y-achse',
          'invers',
        ])
        if (mode === 'invers') {
          a = 1
          if (d === 0) {
            d = randomIntBetween(1, 4)
          }
          if (b === 0) {
            b = randomIntBetween(1, 4)
          }
        }
        return {
          a,
          b,
          c,
          d,
          mode,
          dx,
          dy,
        }
      }}
      renderTask={(data) => {
        const equation = (
          <>
            y = {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
            {data.b === 0 ? 'x' : '(x ' + pp(-data.b, 'merge_op') + ')'}
            <sup>{pp(data.c)}</sup>{' '}
            {data.d === 0 ? null : pp(data.d, 'merge_op')}
          </>
        )
        return (
          <>
            <p className="serlo-main-task">
              Gegeben ist eine Funktion f mit {equation}.
            </p>
            <p className="serlo-main-task">
              Der Graph der Funktion f wird durch{' '}
              {data.mode === 'parallel' && (
                <>
                  Parallelverschiebung mit dem Vektor {buildVec('v')} ={' '}
                  {buildVec2(pp(data.dx), pp(data.dy))}{' '}
                </>
              )}
              {data.mode === 'x-achse' && <>Achsenspiegelung an der x-Achse</>}
              {data.mode === 'y-achse' && <>Achsenspiegelung an der y-Achse</>}
              {data.mode === 'invers' && (
                <>
                  Achsenspiegelung an der Winkelhalbierenden des I. und III.
                  Quadranten
                </>
              )}{' '}
              auf den Graphen der Funktion f&apos; abgebildet.
            </p>
            <p className="serlo-main-task">
              Berechnen Sie die Gleichung von f&apos;.
            </p>
          </>
        )
      }}
      renderSolution={(data) => {
        const newB = -data.dx + -data.b
        const newD = data.d + data.dy
        if (data.mode === 'parallel') {
          return (
            <>
              <p>Überlege dir die Abbildungsgleichungen:</p>
              <p className="serlo-highlight-gray">
                x&apos; = x {pp(data.dx, 'merge_op')}
                <br />
                y&apos; = y {pp(data.dy, 'merge_op')}
              </p>
              <p>Forme die erste Gleichung nach x um:</p>
              <p className="serlo-highlight-gray">
                x = x&apos; {pp(-data.dx, 'merge_op')}
              </p>
              <p>Ersetze in der zweiten Gleichung y durch den Funktionsterm:</p>
              <p className="serlo-highlight-gray">
                y&apos; ={' '}
                {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
                {data.b === 0 ? 'x' : '(x ' + pp(-data.b, 'merge_op') + ')'}
                <sup>{pp(data.c)}</sup>{' '}
                {data.d === 0 ? null : pp(data.d, 'merge_op')}{' '}
                {pp(data.dy, 'merge_op')}
              </p>
              <p>Setze x ein:</p>
              <p className="serlo-highlight-gray">
                y&apos; ={' '}
                {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
                (x&apos; {pp(-data.dx, 'merge_op')}
                {data.b === 0 ? null : ' ' + pp(-data.b, 'merge_op')})
                <sup>{pp(data.c)}</sup>{' '}
                {data.d === 0 ? null : pp(data.d, 'merge_op')}{' '}
                {pp(data.dy, 'merge_op')}
              </p>
              <p>Fasse zusammen und schreibe ohne Hochstriche:</p>
              <p className="serlo-highlight-green">
                y = {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
                {newB === 0 ? 'x' : '(x ' + pp(newB, 'merge_op') + ')'}
                <sup>{pp(data.c)}</sup>{' '}
                {newD === 0 ? null : pp(newD, 'merge_op')}
              </p>
            </>
          )
        }
        if (data.mode === 'x-achse') {
          return (
            <>
              <p>Überlege dir die Abbildungsgleichungen:</p>
              <p className="serlo-highlight-gray">
                x&apos; = x
                <br />
                y&apos; = -y
              </p>
              <p>Ersetze y in der zweiten Gleichung durch den Funktionsterm:</p>
              <p className="serlo-highlight-gray">
                y&apos; = -(
                {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
                {data.b === 0 ? 'x' : '(x ' + pp(-data.b, 'merge_op') + ')'}
                <sup>{pp(data.c)}</sup>{' '}
                {data.d === 0 ? null : pp(data.d, 'merge_op')})
              </p>
              <p>Vereinfache und schreibe ohne Hochstriche:</p>
              <p className="serlo-highlight-green">
                y = {-data.a === -1 ? '-' : -data.a === 1 ? null : pp(-data.a)}
                {data.b === 0 ? 'x' : '(x ' + pp(-data.b, 'merge_op') + ')'}
                <sup>{pp(data.c)}</sup>{' '}
                {data.d === 0 ? null : pp(-data.d, 'merge_op')}
              </p>
            </>
          )
        }
        if (data.mode === 'y-achse') {
          const newA = data.a * Math.pow(-1, data.c)
          return (
            <>
              <p>Überlege dir die Abbildungsgleichungen:</p>
              <p className="serlo-highlight-gray">
                x&apos; = -x
                <br />
                y&apos; = y
              </p>
              <p>Forme die erste Gleichung nach x um:</p>
              <p className="serlo-highlight-gray">x = -x&apos;</p>
              <p>
                Ersetze y in der zweiten Gleichung durch den Funktionsterm und x
                durch -x&apos;:
              </p>
              <p className="serlo-highlight-gray">
                y&apos; ={' '}
                {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
                {"(-x'" +
                  (data.b === 0 ? '' : ' ' + pp(-data.b, 'merge_op')) +
                  ')'}
                <sup>{pp(data.c)}</sup>{' '}
                {data.d === 0 ? null : pp(data.d, 'merge_op')}
              </p>
              <p>Ziehe (-1) aus der Potenz:</p>
              <p className="serlo-highlight-gray">
                y&apos; ={' '}
                {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)} · (-1)
                <sup>{pp(data.c)}</sup> ·{' '}
                {"(x'" +
                  (data.b === 0 ? '' : ' ' + pp(data.b, 'merge_op')) +
                  ')'}
                <sup>{pp(data.c)}</sup>{' '}
                {data.d === 0 ? null : pp(data.d, 'merge_op')}
              </p>
              <p>Vereinfache und schreibe ohne Hochstriche:</p>
              <p className="serlo-highlight-green">
                y = {newA === -1 ? '-' : newA === 1 ? null : pp(newA)}
                {data.b === 0 ? 'x' : '(x ' + pp(data.b, 'merge_op') + ')'}
                <sup>{pp(data.c)}</sup>{' '}
                {data.d === 0 ? null : pp(data.d, 'merge_op')}
              </p>
            </>
          )
        }
        const inverseExp =
          data.c === -1 ? (
            <sup>{pp(data.c)}</sup>
          ) : (
            buildLatex(`^{-\\frac{1}{${Math.abs(data.c)}}}`)
          )
        return (
          <>
            <p>Überlege dir die Abbildungsgleichungen:</p>
            <p className="serlo-highlight-gray">
              x&apos; = y
              <br />
              y&apos; = x
            </p>
            <p>Ersetze y durch den Funktionsterm und x durch y&apos;:</p>
            <p className="serlo-highlight-gray">
              x&apos; = {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
              {"(y'" +
                (data.b === 0 ? '' : ' ' + pp(-data.b, 'merge_op')) +
                ')'}
              <sup>{pp(data.c)}</sup> {pp(data.d, 'merge_op')}
            </p>
            <p>Löse nach y auf:</p>
            <p className="serlo-highlight-gray">
              x&apos; = {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
              {"(y'" +
                (data.b === 0 ? '' : ' ' + pp(-data.b, 'merge_op')) +
                ')'}
              <sup>{pp(data.c)}</sup> {pp(data.d, 'merge_op')}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| {pp(-data.d, 'merge_op')}
              <br />
              <br />
              x&apos; {pp(-data.d, 'merge_op')} ={' '}
              {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
              {"(y'" +
                (data.b === 0 ? '' : ' ' + pp(-data.b, 'merge_op')) +
                ')'}
              <sup>{pp(data.c)}</sup>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|{' '}
              {inverseExp}
              <br />
              <br />
              (x&apos; {pp(-data.d, 'merge_op')}){inverseExp} ={' '}
              {data.a === -1 ? '-' : data.a === 1 ? null : pp(data.a)}
              {"y'" + (data.b === 0 ? '' : ' ' + pp(-data.b, 'merge_op')) + ''}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| {pp(data.b, 'merge_op')}
              <br />
              <br />
              (x&apos; {pp(-data.d, 'merge_op')}){inverseExp}{' '}
              {pp(data.b, 'merge_op')} = y&apos;
            </p>
            <p>Schreibe ohne Hochstriche:</p>
            <p className="serlo-highlight-green">
              y = (x {pp(-data.d, 'merge_op')}){inverseExp}{' '}
              {pp(data.b, 'merge_op')}
            </p>
          </>
        )
      }}
    />
  )
}
