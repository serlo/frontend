import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { HighlightGray } from '../components/content-components'
import { pp, ppPolynom } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'

export function ParabolaCharacteristics() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const n_1 = randomIntBetween(-4, 3)
        const n_2 = randomIntBetween(-3, 4)
        const b = -n_1 - n_2
        const c = n_1 * n_2
        return {
          n_1,
          n_2,
          p_1_x: randomIntBetween(-4, -1),
          p_2_x: randomIntBetween(0, 4),
          b,
          c,
        }
      }}
      renderTask={({ n_1, n_2, p_1_x, p_2_x, b, c }) => {
        const p_1_y = (p_1_x - n_1) * (p_1_x - n_2)
        const p_2_y = (p_2_x - n_1) * (p_2_x - n_2)
        return (
          <>
            <p className="serlo-main-task">
              Die Parabel p hat eine Gleichung der Form y = x<sup>2</sup> + bx +
              c und verläuft durch die Punkte P( {pp(p_1_x)} | {pp(p_1_y)} ) und
              Q( {pp(p_2_x)} | {pp(p_2_y)} ). Zeigen Sie durch Berechnung von b
              und c, dass die Parabel die Gleichung y ={' '}
              {ppPolynom([
                [1, 'x', 2],
                [b, 'x', 1],
                [c, '', 0],
              ])}{' '}
              besitzt.
            </p>
          </>
        )
      }}
      renderSolution={({ n_1, n_2, p_1_x, p_2_x, b, c }) => {
        const p_1_y = (p_1_x - n_1) * (p_1_x - n_2)
        const p_2_y = (p_2_x - n_1) * (p_2_x - n_2)

        const ii_koeff_b = -p_2_x
        const ii_trailing = p_2_y - p_2_x * p_2_x

        const can_skip_reinsertion = ii_koeff_b === 0
        return (
          <>
            <p>
              Setze die Punkte P und Q in die Funktionsgleichung ein und stelle
              ein lineares Gleichungssystem auf:
            </p>
            <p className="serlo-highlight-gray">
              I&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {p_1_y} ={' '}
              {pp(p_1_x, 'embrace_neg')}
              <sup>2</sup> {pp(p_1_x, 'merge_op')} · b + c<br />
              II&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {p_2_y} = {pp(p_2_x, 'embrace_neg')}
              <sup>2</sup> {pp(p_2_x, 'merge_op')} · b + c
            </p>
            <p>
              Nutze das Einsetzungsverfahren (andere Wege sind möglich). Forme
              II nach c um:
            </p>
            <p className="serlo-highlight-gray">
              II&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; c ={' '}
              {ppPolynom([
                [ii_koeff_b, 'b', 1],
                [ii_trailing, 'b', 0],
              ])}
            </p>
            <p>Setze II in I ein und löse:</p>
            <p className="serlo-highlight-gray">
              I&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {p_1_y} ={' '}
              {ppPolynom([
                [p_1_x * p_1_x, 'b', 0],
                [p_1_x, 'b', 1],
                [ii_koeff_b, 'b', 1],
                [ii_trailing, 'b', 0],
              ])}
              <br />
              I&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{' '}
              {p_1_y - p_1_x * p_1_x - ii_trailing} ={' '}
              {ppPolynom([[p_1_x + ii_koeff_b, 'b', 1]])}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b = {pp(b)}
            </p>
            {can_skip_reinsertion ? null : (
              <>
                <p>Setze in II ein und bestimme c:</p>
                <p className="serlo-highlight-gray">
                  II&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; c ={' '}
                  {pp(ii_koeff_b, 'embrace_neg')} · {pp(b, 'embrace_neg')}{' '}
                  {pp(ii_trailing, 'merge_op')}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; c = {pp(c)}
                </p>
              </>
            )}
            <p>Damit sind die Parameter b und c berechnet:</p>
            <p className="serlo-highlight-green">
              b = {pp(b)} &nbsp;&nbsp;&nbsp;&nbsp;∧&nbsp;&nbsp;&nbsp;&nbsp; c ={' '}
              {pp(c)}
            </p>
            <p>
              Probe: Bestätige durch Einsetzen von b und c die gewünschte
              Funktionsgleichung:
            </p>
            <p className="serlo-highlight-gray">
              y ={' '}
              {ppPolynom([
                [1, 'x', 2],
                [b, 'x', 1],
                [c, '', 0],
              ])}
            </p>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ n_1, n_2, p_1_x, p_2_x }) => {
        const p_1_y = (p_1_x - n_1) * (p_1_x - n_2)
        const p_2_y = (p_2_x - n_1) * (p_2_x - n_2)
        return (
          <>
            Setze die Punkte P und Q jeweils in eine Funktionsgleichung ein:
            <br />
            Ɪ:{' '}
            <HighlightGray>
              {p_1_y} = {p_1_x < 0 ? '(' + p_1_x + ')' : p_1_x}
              <sup>2</sup> {p_1_x < 0 ? p_1_x + ' · b' : null}
              {p_1_x === 0 ? ' + 0 · b' : null}
              {p_1_x > 0 ? ' + ' + p_1_x + ' · b' : null} + c
            </HighlightGray>
            <br />
            ꞮꞮ:{' '}
            <HighlightGray>
              {p_2_y} = {p_2_x < 0 ? '(' + p_2_x + ')' : p_2_x}
              <sup>2</sup> {p_2_x < 0 ? ' ' + p_2_x + ' · b' : null}
              {p_2_x === 0 ? ' + 0 · b' : null}
              {p_2_x > 0 ? ' + ' + p_2_x + ' · b' : null} + c
            </HighlightGray>
            <br />
            <br />
            Damit ergibt sich ein lineares Gleichungssystem mit den Lösungen b
            und c.
          </>
        )
      }}
    />
  )
}
