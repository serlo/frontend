import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  buildDet2,
  buildLatex,
  buildVec,
  buildVec2,
} from '../utils/math-builder'
import { pp, ppPolynom } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function ParametricArea() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const type = randomItemFromArray([
          'raute',
          'drache',
          'dreieck',
          'parallelogramm',
        ])
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

        const s_x = (t_nst_1 + t_nst_2) / 2
        const s_y = s_x * s_x + b * s_x + c

        const c_x = Math.ceil((t_nst_1 + t_nst_2) / 2 + 1)
        const c_y = c_x * c_x + b * c_x + c

        const vec_ab_x = randomIntBetween(-6, -2)
        const vec_ab_y = randomIntBetween(1, 4)

        return {
          type,
          b,
          c,
          m,
          t,
          lower_bound,
          upper_bound,
          bd,
          x1,
          c_x,
          c_y,
          vec_ab_x,
          vec_ab_y,
          s_x,
          s_y,
        }
      }}
      renderTask={(data) => {
        if (data.type === 'raute' || data.type === 'drache') {
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
                {pp(data.lower_bound)}; {pp(data.upper_bound)}] die Eckpunkte
                von {data.type === 'raute' ? 'Rauten' : 'Drachenvierecken'} A
                <sub>n</sub>B<sub>n</sub>C<sub>n</sub>D<sub>n</sub>.
              </p>
              {data.type === 'raute' && (
                <p className="serlo-main-task">
                  C<sub>n</sub> liegt stets oberhalb von A<sub>n</sub> und es
                  gilt: |
                  <span className="border-t border-t-black">
                    B<sub>n</sub>D<sub>n</sub>
                  </span>
                  | = {pp(data.bd)} LE.
                </p>
              )}

              {data.type === 'drache' && (
                <p className="serlo-main-task">
                  C<sub>n</sub> liegt stets oberhalb von A<sub>n</sub>. Die
                  Strecke A<sub>n</sub>C<sub>n</sub> ist die Symmetrieachse der
                  Drachenvierecke. Der Abstand der Punkte B<sub>n</sub> von der
                  Symmetrieachse beträgt {pp(data.bd / 2)} LE.
                </p>
              )}
              <p className="serlo-main-task">
                Ermitteln Sie durch Rechnung den Flächeninhalt A der{' '}
                {data.type === 'raute' ? 'Rauten' : 'Drachenvierecke'} in
                Abhängigkeit von der Abszisse x der Punkte A<sub>n</sub> und C
                <sub>n</sub>.
              </p>
            </>
          )
        }
        if (data.type === 'dreieck') {
          return (
            <>
              <p className="serlo-main-task">
                Die Punkte A<sub>n</sub> ( x |{' '}
                {ppPolynom([
                  [1, 'x', 2],
                  [data.b, 'x', 1],
                  [data.c, 'x', 0],
                ])}
                ) auf der Parabel p mit dem Scheitel S ( {pp(data.s_x)} |{' '}
                {pp(data.s_y)} ) sind für x &gt; {pp(data.c_x)} zusammen mit dem
                Punkt C ( {pp(data.c_x)} | {pp(data.c_y)} ) und B<sub>n</sub>{' '}
                die Eckpunkte von Dreiecken A<sub>n</sub>B<sub>n</sub>C.
              </p>
              <p className="serlo-main-task">
                Für die Punkte A<sub>n</sub> und B<sub>n</sub> gilt:{' '}
                {buildVec(
                  <>
                    A<sub>n</sub>B<sub>n</sub>
                  </>
                )}{' '}
                = {buildVec2(pp(data.vec_ab_x), pp(data.vec_ab_y))}
              </p>
              <p className="serlo-main-task">
                Ermitteln Sie durch Rechnung den Flächeninhalt A der Dreiecke in
                Abhängigkeit von der Abszisse x der Punkte A<sub>n</sub>.
              </p>
            </>
          )
        }
        return (
          <>
            <p className="serlo-main-task">
              Die Punkte B<sub>n</sub> ( x |{' '}
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
              {pp(data.lower_bound)}; {pp(data.upper_bound)}] die Eckpunkte von
              Parallelogrammen A<sub>n</sub>B<sub>n</sub>C<sub>n</sub>D
              <sub>n</sub>.
            </p>
            <p className="serlo-main-task">
              C<sub>n</sub> liegt stets oberhalb von B<sub>n</sub> und es gilt:{' '}
              {buildVec(
                <>
                  B<sub>n</sub>A<sub>n</sub>
                </>
              )}{' '}
              = {buildVec2(pp(data.vec_ab_x), pp(data.vec_ab_y))}
            </p>
            <p className="serlo-main-task">
              Ermitteln Sie durch Rechnung den Flächeninhalt A der
              Parallelogramme in Abhängigkeit von der Abszisse x der Punkte B
              <sub>n</sub> und C<sub>n</sub>.
            </p>
          </>
        )
      }}
      renderSolution={(data) => {
        if (data.type === 'raute' || data.type === 'drache') {
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
              {data.type === 'drache' && (
                <>
                  <p>
                    Die Punkte B<sub>n</sub> und D<sub>n</sub> sind je{' '}
                    {pp(data.bd / 2)} LE von der Symmetrieachse der
                    Drachenvierecke entfernt. Es gilt:
                  </p>
                  <p className="serlo-highlight-gray">
                    |
                    <span className="border-t border-t-black">
                      B<sub>n</sub>D<sub>n</sub>
                    </span>
                    | = {pp(data.bd)} LE
                  </p>
                </>
              )}
              <p>
                Berechne den Flächeninhalt A{' '}
                {data.type === 'raute' ? 'der Raute' : 'des Drachenvierecks'}{' '}
                mithilfe der Länge der beiden Diagonalen:
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
                A(x) =({' '}
                {ppPolynom([
                  [-1 * data.bd * 0.5, 'x', 2],
                  [(-data.b + data.m) * data.bd * 0.5, 'x', 1],
                  [(-data.c + data.t) * data.bd * 0.5, 'x', 0],
                ])}{' '}
                ) FE
              </p>
            </>
          )
        }
        if (data.type === 'dreieck') {
          return (
            <>
              <p>
                Stelle den Vektor{' '}
                {buildVec(
                  <>
                    A<sub>n</sub>C
                  </>
                )}{' '}
                auf:
              </p>
              <p className="serlo-highlight-gray">
                {buildVec(
                  <>
                    A<sub>n</sub>C
                  </>
                )}{' '}
                ={' '}
                {buildVec2(
                  <>{pp(data.c_x)} - x</>,
                  <>
                    {pp(data.c_y)} - (
                    {ppPolynom([
                      [1, 'x', 2],
                      [data.b, 'x', 1],
                      [data.c, 'x', 0],
                    ])}
                    )
                  </>
                )}{' '}
                ={' '}
                {buildVec2(
                  <>{pp(data.c_x)} - x</>,
                  <>
                    {ppPolynom([
                      [-1, 'x', 2],
                      [-data.b, 'x', 1],
                      [data.c_y - data.c, 'x', 0],
                    ])}
                  </>
                )}
              </p>
              <p>
                Bereche den Flächeninhalt des Dreiecks mit den Vektoren{' '}
                {buildVec(
                  <>
                    A<sub>n</sub>C
                  </>
                )}{' '}
                und{' '}
                {buildVec(
                  <>
                    A<sub>n</sub>B<sub>n</sub>
                  </>
                )}
                :
              </p>
              <p className="serlo-highlight-gray">
                A(x) = 0,5 ·{' '}
                {buildDet2(
                  <>{data.c_x} - x</>,
                  data.vec_ab_x,
                  ppPolynom([
                    [-1, 'x', 2],
                    [-data.b, 'x', 1],
                    [data.c_y - data.c, 'x', 0],
                  ]),
                  data.vec_ab_y
                )}{' '}
                FE
                <br />
                <br />
                A(x) = 0,5 · (
                {ppPolynom([
                  [-1 * data.vec_ab_y, 'x', 1],
                  [data.c_x * data.vec_ab_y, 'x', 0],
                ])}{' '}
                - (
                {ppPolynom([
                  [-1 * data.vec_ab_x, 'x', 2],
                  [-data.b * data.vec_ab_x, 'x', 1],
                  [(data.c_y - data.c) * data.vec_ab_x, 'x', 0],
                ])}
                )) FE
              </p>
              <p>Vereinfache und erhalte das Ergebnis:</p>
              <p className="serlo-highlight-green">
                A(x) = (
                {ppPolynom([
                  [0.5 * (1 * data.vec_ab_x), 'x', 2],
                  [0.5 * (data.b * data.vec_ab_x - data.vec_ab_y), 'x', 1],
                  [
                    0.5 *
                      (data.c_x * data.vec_ab_y -
                        (data.c_y - data.c) * data.vec_ab_x),
                    'x',
                    0,
                  ],
                ])}
                ) FE
              </p>
            </>
          )
        }
        return (
          <>
            <p>
              Die Strecke B<sub>n</sub>C<sub>n</sub> liegt parallel zur y-Achse.
              Berechne die Länge durch die Differenz der y-Werte:
            </p>
            <p className="serlo-highlight-gray">
              |
              <span className="border-t border-t-black">
                B<sub>n</sub>C<sub>n</sub>
              </span>
              |(x) = (y
              <sub>
                B<sub>n</sub>
              </sub>{' '}
              - y
              <sub>
                A<sub>n</sub>
              </sub>
              ) LE
              <br />
              <br />|
              <span className="border-t border-t-black">
                B<sub>n</sub>C<sub>n</sub>
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
                B<sub>n</sub>C<sub>n</sub>
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
              Bestimme die Höhe aus der Differenz der x-Werte von B<sub>n</sub>{' '}
              und A<sub>n</sub>:
            </p>
            <p className="serlo-highlight-gray">
              h = (x
              <sub>
                B<sub>n</sub>
              </sub>{' '}
              - x
              <sub>
                A<sub>n</sub>
              </sub>
              ) LE
              <br />
              <br />h = {pp(Math.abs(data.vec_ab_x))} LE
            </p>
            <p>
              Setze Zwischenergebnisse in die Flächenformel für Parallelogramme
              ein:
            </p>
            <p className="serlo-highlight-gray">
              A(x) = (
              {ppPolynom([
                [-1, 'x', 2],
                [-data.b + data.m, 'x', 1],
                [-data.c + data.t, 'x', 0],
              ])}
              ) · {pp(Math.abs(data.vec_ab_x))} FE
            </p>
            <p>Multipliziere aus und erhalte das Ergebnis:</p>
            <p className="serlo-highlight-green">
              A(x) = (
              {ppPolynom([
                [-1 * Math.abs(data.vec_ab_x), 'x', 2],
                [(-data.b + data.m) * Math.abs(data.vec_ab_x), 'x', 1],
                [(-data.c + data.t) * Math.abs(data.vec_ab_x), 'x', 0],
              ])}
              ) FE
            </p>
          </>
        )
      }}
    />
  )
}
