import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  buildDet2,
  buildFrac,
  buildVec,
  buildVec2,
} from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function PowerFunctionTriangle() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-2, -3, -4, 2, 3, 4])
        const b = randomIntBetween(1, 3) * randomItemFromArray([1, -1])
        const c = randomItemFromArray([-2, -4])
        const d = randomIntBetween(1, 5) * randomItemFromArray([1, -1])
        const mode = randomItemFromArray(['det', 'formula'])
        const isInverse = a < 0
        const base_y = isInverse
          ? d + randomIntBetween(3, 8)
          : d - randomIntBetween(3, 8)
        const left_x = randomIntBetween(-5, -1)
        const right_x = randomIntBetween(3, 8)
        return { a, b, c, d, mode, isInverse, base_y, left_x, right_x }
      }}
      renderTask={(data) => {
        return (
          <>
            <p className="serlo-main-task">
              Die Gleichung y = {pp(data.a)}(x {pp(-data.b, 'merge_op')})
              <sup>{pp(data.c)}</sup> {pp(data.d, 'merge_op')} legt die Funktion
              f fest.
            </p>
            <p className="serlo-main-task">
              Die Punkte {data.isInverse ? 'B' : 'C'}
              <sub>n</sub> ( x | {pp(data.a)}(x {pp(-data.b, 'merge_op')})
              <sup>{pp(data.c)}</sup> {pp(data.d, 'merge_op')} ) liegen auf dem
              Graphen zu f.
            </p>
            <p className="serlo-main-task">
              Zusammen mit A( {data.left_x} | {data.base_y} ) und{' '}
              {data.isInverse ? 'C' : 'B'}( {data.right_x} | {data.base_y} )
              bilden sie die Eckpunkte von Dreiecken{' '}
              {data.isInverse ? (
                <>
                  AB<sub>n</sub>C
                </>
              ) : (
                <>
                  ABC<sub>n</sub>
                </>
              )}
              .
            </p>
            <p className="serlo-main-task">
              Berechnen Sie den Flächeninhalt A der Dreiecke in Abhängigkeit von
              x mit der {data.mode === 'det' ? 'Determinante' : 'Flächenformel'}
              .
            </p>
          </>
        )
      }}
      renderSolution={(data) => {
        const diff = data.right_x - data.left_x
        if (data.mode === 'det') {
          return (
            <>
              <p>
                Stelle den konstanten Vektor{' '}
                {buildVec(data.isInverse ? 'AC' : 'AB')} auf:
              </p>
              <p className="serlo-highlight-gray">
                {buildVec(data.isInverse ? 'AC' : 'AB')} = {buildVec2(diff, 0)}
              </p>
              <p>
                Stelle den Vektor{' '}
                {buildVec(
                  data.isInverse ? (
                    <>
                      AB<sub>n</sub>
                    </>
                  ) : (
                    <>
                      AC<sub>n</sub>
                    </>
                  )
                )}{' '}
                auf:
              </p>
              <p className="serlo-highlight-gray">
                {buildVec(
                  data.isInverse ? (
                    <>
                      AB<sub>n</sub>
                    </>
                  ) : (
                    <>
                      AC<sub>n</sub>
                    </>
                  )
                )}{' '}
                ={' '}
                {buildVec2(
                  <>x {pp(-data.left_x, 'merge_op')}</>,
                  <>
                    {pp(data.a)}(x {pp(-data.b, 'merge_op')})
                    <sup>{pp(data.c)}</sup> {pp(data.d, 'merge_op')}{' '}
                    {pp(-data.base_y, 'merge_op')}
                  </>
                )}
              </p>
              <p>Stelle die Determinante auf:</p>
              <p className="serlo-highlight-gray">
                A(x) = {buildFrac(1, 2)}{' '}
                {buildDet2(
                  diff,
                  <>x {pp(-data.left_x, 'merge_op')}</>,
                  0,
                  <>
                    {pp(data.a)}(x {pp(-data.b, 'merge_op')})
                    <sup>{pp(data.c)}</sup>{' '}
                    {pp(data.d - data.base_y, 'merge_op')}
                  </>
                )}{' '}
                FE
              </p>
              <p>Berechne:</p>
              <p className="serlo-highlight-gray">
                A(x) = {buildFrac(1, 2)} [ {pp(data.a * diff)}(x{' '}
                {pp(-data.b, 'merge_op')})<sup>{pp(data.c)}</sup>{' '}
                {pp((data.d - data.base_y) * diff, 'merge_op')} ] FE
              </p>
              <p>Erhalte das Ergebnis:</p>
              <p className="serlo-highlight-green">
                A(x) = ( {pp((data.a * diff) / 2)}(x {pp(-data.b, 'merge_op')})
                <sup>{pp(data.c)}</sup>{' '}
                {pp(((data.d - data.base_y) * diff) / 2, 'merge_op')} ) FE
              </p>
            </>
          )
        }
        return (
          <>
            <p>Stelle die Formel auf:</p>
            <p className="serlo-highlight-gray">
              A(x) = {buildFrac(1, 2)} · g · h<sub>g</sub>(x)
            </p>
            <p>
              Berechne die Länge der Grundfläche aus den Punkten A und{' '}
              {data.isInverse ? 'C' : 'B'}:
            </p>
            <p className="serlo-highlight-gray">
              A(x) = {buildFrac(1, 2)} · {diff} · h<sub>g</sub>(x)
            </p>
            <p>Bestimme die Höhe aus den y-Werten:</p>
            <p className="serlo-highlight-gray">
              A(x) = {buildFrac(1, 2)} · {diff} · |{' '}
              {data.isInverse ? (
                <>
                  {pp(data.base_y)} - y
                  <sub>
                    B<sub>n</sub>
                  </sub>
                </>
              ) : (
                <>
                  y
                  <sub>
                    C<sub>n</sub>
                  </sub>{' '}
                  - {pp(data.base_y)}
                </>
              )}{' '}
              | FE
              <br />
              <br />
              A(x) = {buildFrac(1, 2)} · {diff} · (
              {data.isInverse ? (
                <>
                  {pp(data.base_y)} - ({pp(data.a)}(x {pp(-data.b, 'merge_op')})
                  <sup>{pp(data.c)}</sup> {pp(data.d, 'merge_op')})
                </>
              ) : (
                <>
                  {pp(data.a)}(x {pp(-data.b, 'merge_op')})
                  <sup>{pp(data.c)}</sup> {pp(data.d, 'merge_op')}{' '}
                  {pp(-data.base_y, 'merge_op')}
                </>
              )}
              ) FE
              <br />
              <br />
              A(x) = {buildFrac(1, 2)} · {diff} · (
              {data.isInverse ? (
                <>
                  {pp(-data.a)}(x {pp(-data.b, 'merge_op')})
                  <sup>{pp(data.c)}</sup>{' '}
                  {pp(-data.d + data.base_y, 'merge_op')}
                </>
              ) : (
                <>
                  {pp(data.a)}(x {pp(-data.b, 'merge_op')})
                  <sup>{pp(data.c)}</sup> {pp(data.d - data.base_y, 'merge_op')}
                </>
              )}
              ) FE
            </p>
            <p>Vereinfache und erhalte das Ergebnis:</p>
            <p className="serlo-highlight-green">
              A(x) = ( {pp((data.a * diff) / 2)}(x {pp(-data.b, 'merge_op')})
              <sup>{pp(data.c)}</sup>{' '}
              {pp(((data.d - data.base_y) * diff) / 2, 'merge_op')} ) FE
            </p>
          </>
        )
      }}
    />
  )
}
