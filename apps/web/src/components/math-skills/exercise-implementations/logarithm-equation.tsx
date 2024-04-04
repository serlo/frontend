import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function LogarithmEquation() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const base = randomItemFromArray([0.5, 2, 3, 4, 5, 9, -1])
        const exp =
          base === -1
            ? randomIntBetween(2, 40) / 10
            : randomIntBetween(2, base === 2 ? 7 : base === 9 ? 2 : 3)
        return { base, exp, val: base === -1 ? exp : Math.pow(base, exp) }
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Berechnen Sie den Logarithmus im Kopf:
          </p>
          <p className="serlo-highlight-gray">
            x = log
            <sub>
              {(data.base === -1 ? data.val : data.base).toLocaleString(
                'de-De'
              )}
            </sub>{' '}
            {data.val > 1 || data.base === -1
              ? data.val.toLocaleString('de-De')
              : buildFrac(1, Math.round(1 / data.val))}
          </p>
        </>
      )}
      renderSolution={(data) => (
        <>
          <p>Wandle um in eine Exponentialgleichung:</p>
          <p className="serlo-highlight-gray">
            x = log
            <sub>
              {(data.base === -1 ? data.val : data.base).toLocaleString(
                'de-De'
              )}
            </sub>{' '}
            {data.val > 1 || data.base === -1
              ? data.val.toLocaleString('de-De')
              : buildFrac(1, Math.round(1 / data.val))}{' '}
            &nbsp;⇔&nbsp;{' '}
            {(data.base === -1 ? data.val : data.base).toLocaleString('de-De')}
            <sup>x</sup> ={' '}
            {data.val > 1 || data.base === -1
              ? data.val.toLocaleString('de-De')
              : buildFrac(1, Math.round(1 / data.val))}
          </p>
          <p>Finde die Antwort durch Probieren:</p>
          <p className="serlo-highlight-green">
            x = {data.base === -1 ? 1 : data.exp}
          </p>
        </>
      )}
      centAmount={35}
    />
  )
}
