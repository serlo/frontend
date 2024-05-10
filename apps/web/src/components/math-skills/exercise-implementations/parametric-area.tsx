import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { pp, ppPolynom } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'
import { buildLatex, buildOverline } from '../utils/math-builder'

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

        return { type, b, c, m, t, lower_bound, upper_bound, bd }
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
                Es gilt: |
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
      renderSolution={() => {
        return <></>
      }}
    />
  )
}
