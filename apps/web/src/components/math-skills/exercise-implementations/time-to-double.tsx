import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'

export function TimeToDouble() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const p = randomIntBetween(2, 22) / 10
        return { p }
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Beim exponentiellen Wachstum erreicht man selbst bei einer kleinen
            Zuwachsrate am Ende eine große Veränderung.
          </p>
          <p className="serlo-main-task">
            Nehmen Sie an, dass Sie ihr Können durch tägliches Üben jeden Tag um{' '}
            {data.p.toLocaleString('de-De')}&nbsp;% verbessern. Nach wie vielen
            Tagen haben Sie ihr Können verdoppelt?
          </p>
        </>
      )}
      renderSolution={(data) => {
        const a = 1 + data.p / 100
        const x = Math.log(2) / Math.log(a)
        return (
          <>
            <p>Berechne den Wachstumsfaktor:</p>
            <p className="serlo-highlight-gray">
              a = 1 + {buildFrac(data.p.toLocaleString('de-De'), 100)} ={' '}
              {a.toLocaleString('de-De')}
            </p>
            <p>
              x beschreibt die Anzahl der Tage. Stelle die passende Gleichung
              auf und löse sie:
            </p>
            <p className="serlo-highlight-gray">
              2 = {a.toLocaleString('de-De')}
              <sup>x</sup>
              <br />
              <br />x = log <sub>{a.toLocaleString('de-De')}</sub> 2<br />
              <br />x = {x.toLocaleString('de-De')}
            </p>
            <p>
              <strong>Runde auf.</strong> Antworte:
            </p>
            <p className="serlo-highlight-green">
              Nach {Math.ceil(x)} Tagen habe ich mein Können verdoppelt.
            </p>
          </>
        )
      }}
    />
  )
}
