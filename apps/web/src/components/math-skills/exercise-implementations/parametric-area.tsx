import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildLatex } from '../utils/math-builder'
import { pp, ppPolynom } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function ParametricArea() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const type = randomItemFromArray(['raute'])
        const t_nst_1 = randomIntBetween(-4, 1)
        const t_nst_2 = randomIntBetween(2, 10)

        const b = -t_nst_1 - t_nst_2
        const c = t_nst_1 * t_nst_2

        const m = randomIntBetween(1, 15) / 10
        const t = randomIntBetween(3, 10)

        const t_b = b - m
        const t_c = c - t
        const t_D = Math.sqrt(t_b * t_b - 4 * t_c)
        const t_lower = (-t_b - t_D) / 2
        const t_upper = (-t_b + t_D) / 2

        const lower_bound = Math.ceil(t_lower)
        const upper_bound = Math.floor(t_upper)

        const bd = randomIntBetween(3, 9)

        const x1 = Math.round(lower_bound + (upper_bound - lower_bound) * 0.4)

        return { type, b, c, m, t, lower_bound, upper_bound, bd, x1 }
      }}
      renderTask={(data) => {
        if (data.type === 'raute') {
          return (
            <>
              <p className="serlo-main-task">
                Die Punkte A<sub>n</sub> ( x |{' '}
                {ppPolynom([
                  [1, 'x', 2],
                  [data.b, 'x', 1],
                  [data.c, 'x', 0],
                ])}{' '}
                ) auf der Parabel p haben dieselbe Abszisse x wie die Punkte C
                <sub>n</sub> ( x |{' '}
                {ppPolynom([
                  [data.m, 'x', 1],
                  [data.t, 'x', 0],
                ])}{' '}
                ) auf der Geraden g. Sie sind für x {buildLatex('\\in')} [
                {pp(data.lower_bound)}; {pp(data.upper_bound)}] die Eckpunte von
                Rauten A<sub>n</sub>B<sub>n</sub>C<sub>n</sub>D<sub>n</sub>.
              </p>
              <p className="serlo-main-task">
                Es gilt: C<sub>n</sub> liegt immer über A<sub>n</sub> und |
                <span className="border-t border-t-black">
                  B<sub>n</sub>D<sub>n</sub>
                </span>
                | = {pp(data.bd)} LE.
              </p>
              <p className="serlo-main-task">
                Ermitteln Sie durch Rechnung den Flächeninhalt A der Rauten in
                Abhängigkeit von der Abszisse x der Punkte A<sub>n</sub> und C
                <sub>n</sub>.
              </p>
            </>
          )
        }
        return <></>
      }}
      renderSolution={(data) => {
        if (data.type === 'raute') {
          return (
            <>
              <p>
                Die Strecke A<sub>n</sub>C<sub>n</sub> liegt parallel zur
                y-Achse. Berechne die Länge durch die Differenz der y-Werte:
              </p>
              <p className="serlo-highlight-gray">
                |
                <span className="border-t border-t-black">
                  A<sub>n</sub>C<sub>n</sub>
                </span>
                |(x) = (y
                <sub>
                  C<sub>n</sub>
                </sub>{' '}
                - y
                <sub>
                  A<sub>n</sub>
                </sub>
                ) LE
                <br />
                <br />|
                <span className="border-t border-t-black">
                  A<sub>n</sub>C<sub>n</sub>
                </span>
                |(x) = [
                {ppPolynom([
                  [data.m, 'x', 1],
                  [data.t, 'x', 0],
                ])}{' '}
                - (
                {ppPolynom([
                  [1, 'x', 2],
                  [data.b, 'x', 1],
                  [data.c, 'x', 0],
                ])}
                )] LE
                <br />
                <br />|
                <span className="border-t border-t-black">
                  A<sub>n</sub>C<sub>n</sub>
                </span>
                |(x) = (
                {ppPolynom([
                  [-1, 'x', 2],
                  [-data.b + data.m, 'x', 1],
                  [-data.c + data.t, 'x', 0],
                ])}
                ) LE
              </p>
              <p>
                Berechne den Flächeninhalt A der Raute mithilfe der Länge der
                beiden Diagonalen:
              </p>
              <p className="serlo-highlight-gray">
                A(x) = 0,5 · |
                <span className="border-t border-t-black">
                  A<sub>n</sub>C<sub>n</sub>
                </span>
                |(x) · |
                <span className="border-t border-t-black">
                  B<sub>n</sub>D<sub>n</sub>
                </span>
                |<br />
                <br />
                A(x) = 0,5 · (
                {ppPolynom([
                  [-1, 'x', 2],
                  [-data.b + data.m, 'x', 1],
                  [-data.c + data.t, 'x', 0],
                ])}
                ) · {pp(data.bd)} FE
              </p>
              <p>Vereinfache und erhalte das Ergebnis:</p>
              <p className="serlo-highlight-green">
                A(x) ={' '}
                {ppPolynom([
                  [-1 * data.bd * 0.5, 'x', 2],
                  [(-data.b + data.m) * data.bd * 0.5, 'x', 1],
                  [(-data.c + data.t) * data.bd * 0.5, 'x', 0],
                ])}{' '}
                FE
              </p>
            </>
          )
        }
        return <></>
      }}
    />
  )
}
