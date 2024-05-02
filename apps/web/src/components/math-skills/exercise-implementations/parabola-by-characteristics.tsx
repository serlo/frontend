import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { HighlightGreen, HighlightGray } from '../components/content-components'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'

export function ParabolaCharacteristics() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          n_1: randomIntBetween(-4, 3),
          n_2: randomIntBetween(-3, 4),
          p_1_x: randomIntBetween(-4, -1),
          p_2_x: randomIntBetween(0, 4),
        }
      }}
      renderTask={({ n_1, n_2, p_1_x, p_2_x }) => {
        const p_1_y = (p_1_x - n_1) * (p_1_x - n_2)
        const p_2_y = (p_2_x - n_1) * (p_2_x - n_2)
        return (
          <>
            <p className="serlo-main-task">
              Bestimmen Sie die Parameter b und c der Parabel:
            </p>
            <p className="serlo-highlight-gray">
              y = x<sup>2</sup> + bx + c
            </p>
            <br />
            <p className="serlo-main-task">
              Der Graph der Funktion verläuft durch die Punkte P( {pp(p_1_x)} |{' '}
              {pp(p_1_y)} ) und Q( {pp(p_2_x)} | {pp(p_2_y)} ).
            </p>
          </>
        )
      }}
      renderSolution={({ n_1, n_2, p_1_x, p_2_x }) => {
        const p_1_y = (p_1_x - n_1) * (p_1_x - n_2)
        const p_2_y = (p_2_x - n_1) * (p_2_x - n_2)
        const b = -n_1 - n_2
        const c = n_1 * n_2
        return (
          <>
            Bestimme die Parameter b und c der Parabel.
            <br />
            <br />
            Setze dazu die Punkte P und Q jeweils in eine Funktionsgleichung
            ein:
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
            Berechne die Potenz und fasse die rechte Seite zusammen:
            <br />
            Ɪ:{' '}
            <HighlightGray>
              {p_1_y} = {p_1_x !== 0 ? p_1_x * p_1_x : null}{' '}
              {p_1_x < 0 ? p_1_x + 'b' : null}
              {p_1_x === 0 ? null : null}
              {p_1_x > 0 ? ' + ' + p_1_x + 'b' : null}{' '}
              {p_1_x === 0 ? null : '+'} c
            </HighlightGray>
            <br /> ꞮꞮ:{' '}
            <HighlightGray>
              {p_2_y} = {p_2_x !== 0 ? p_2_x * p_2_x : null}{' '}
              {p_2_x < 0 ? ' ' + p_2_x + 'b' : null}
              {p_2_x === 0 ? null : null}
              {p_2_x > 0 && p_2_x !== 1 ? ' + ' + p_2_x + 'b' : null}
              {p_2_x > 0 && p_2_x === 1 ? '+ b' : null}{' '}
              {p_2_x === 0 ? null : '+'} c
            </HighlightGray>
            <br />
            <br />
            Bringe die Zahlenwerte auf die linke Seite der Gleichung:
            <br />
            Ɪ:{' '}
            <HighlightGray>
              {p_1_y - p_1_x * p_1_x} = {p_1_x < 0 ? p_1_x + 'b' : null}
              {p_1_x === 0 ? null : null}
              {p_1_x > 0 && p_1_x !== 1 ? ' + ' + p_1_x + 'b' : null}{' '}
              {p_1_x > 0 && p_1_x === 1 ? 'b' : null}
              {p_1_x === 0 ? null : '+'} c
            </HighlightGray>
            <br />
            ꞮꞮ:{' '}
            <HighlightGray>
              {p_2_y - p_2_x * p_2_x} = {p_2_x < 0 ? p_2_x + 'b' : null}
              {p_2_x === 0 ? null : null}
              {p_2_x > 0 && p_2_x !== 1 ? p_2_x + 'b' : null}
              {p_2_x > 0 && p_2_x === 1 ? 'b' : null} {p_2_x === 0 ? null : '+'}{' '}
              c
            </HighlightGray>
            <br />
            <br />
            Löse das lineare Gleichungssystem und stelle den Funktionsterm der
            Parabel auf:
            <br />
            <HighlightGreen>
              y = x<sup>2</sup> {b !== 0 && b > 0 ? '+' : null}{' '}
              {b !== 0 && b !== 1 ? b + 'x' : null}
              {b === 1 ? 'x' : null} {c !== 0 && c > 0 ? '+' : null}
              {c !== 0 ? c : null}
            </HighlightGreen>
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
