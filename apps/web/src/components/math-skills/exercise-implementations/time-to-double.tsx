import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'

export function TimeToDouble() {
  function gToText(g: number) {
    return g === 2 ? 'verdoppelt' : g === 3 ? 'verdreifacht' : 'vervierfacht'
  }
  return (
    <SelfEvaluationExercise
      generator={() => {
        const p = randomIntBetween(2, 22) / 10
        const g = randomIntBetween(2, 4)
        return { p, g }
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Beim exponentiellen Wachstum erreicht man selbst bei einer kleinen
            Zuwachsrate am Ende eine große Veränderung.
          </p>
          <p className="serlo-main-task">
            Nehmen Sie an, dass Sie ihr Können durch tägliches Üben jeden Tag um{' '}
            {pp(data.p)}&nbsp;% verbessern. Nach wie vielen
            Tagen haben Sie ihr Können {gToText(data.g)}?
          </p>
        </>
      )}
      renderSolution={(data) => {
        const a = 1 + data.p / 100
        const x = Math.log(data.g) / Math.log(a)
        return (
          <>
            <p>Berechne den Wachstumsfaktor:</p>
            <p className="serlo-highlight-gray">
              a = 1 + {buildFrac(pp(data.p), 100)} ={' '}
              {pp(a)}
            </p>
            <p>
              x beschreibt die Anzahl der Tage. Stelle die passende Gleichung
              auf und löse sie:
            </p>
            <p className="serlo-highlight-gray">
              {data.g} = {pp(a)}
              <sup>x</sup>
              <br />
              <br />x = log <sub>{pp(a)}</sub> {data.g}
              <br />
              <br />x = {pp(x)}
            </p>
            <p>
              <strong>Runde auf.</strong> Antworte:
            </p>
            <p className="serlo-highlight-green">
              Nach {Math.ceil(x)} Tagen habe ich mein Können {gToText(data.g)}.
            </p>
          </>
        )
      }}
    />
  )
}
