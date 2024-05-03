/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function CompletingTheSquare() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          b: randomIntBetween(1, 4) * 2,
          c: randomIntBetween(2, 9),
          isPlus: randomItemFromArray([true, false]),
          isPlus_2: randomItemFromArray([true, false]),
        }
      }}
      renderTask={({ b, isPlus, isPlus_2, c }) => {
        return (
          <>
            <p className="serlo-main-task">
              Bestimmen Sie die Scheitelform der Parabel:
            </p>
            <p className="serlo-highlight-green">
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x {isPlus_2 ? '+' : '-'}{' '}
              {c}
            </p>
          </>
        )
      }}
      renderSolution={({ b, isPlus, isPlus_2, c }) => {
        const plusminusTerm = (b / 2) * (b / 2)
        const cAlsZahl = c * (isPlus_2 ? 1 : -1)
        const d = cAlsZahl - plusminusTerm

        const dAlsJsx = (
          <>
            {d > 0 ? '+' : '-'} {Math.abs(d)}
          </>
        )

        const intro = (
          <>
            <p>Die Scheitelform der Funktion hat diese Form:</p>
            <p className="serlo-highlight-gray">
              y = (x - ☐)<sup>2</sup> + ☐
            </p>
            <br />
            <br />
            <p>
              Nutze die quadratische Ergänzung und bestimme die passenden Werte
              in den Kästchen.
            </p>
            <br />
            <p className="serlo-main-task">Wert im ersten Kästchen</p>
            <p>
              Denke dir den mittleren Summand, wie er als Mischterm in der
              binomischen Formel erwartet wird:
            </p>
            <p className="serlo-highlight-gray">
              y = x<sup>2</sup> {isPlus ? '+' : '-'} 2 ·{' '}
              <strong>{pp(b / 2)}</strong> · x {isPlus_2 ? '+' : '-'} {c}
            </p>
            <br />
            <br />
            <p>Setze ein in das Binom:</p>
            <p className="serlo-highlight-gray">
              y = (x {isPlus ? '+' : '-'} <strong>{pp(b / 2)}</strong>)
              <sup>2</sup> + ☐
            </p>
            <br />
            <br />
          </>
        )
        if (d === 0)
          return (
            <>
              {intro}
              <p className="serlo-main-task">Wert im zweiten Kästchen</p>
              <p>
                Würden wir das Binom wieder ausschreiben, erhalten wir bereits
                den richtigen Funktionsterm wieder:
              </p>
              <p className="serlo-highlight-gray">
                y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x{' '}
                {isPlus_2 ? '+' : '-'}
                {c}
              </p>
              <br />
              <br />
              Der Wert im zweiten Kästchen ist damit <strong>0</strong>. Das ist
              ein Spezialfall!
              <br />
              <br />
              Damit lautet die richtige Scheitelform: <br />
              <p className="serlo-highlight-green">
                y = (x {isPlus ? '+' : '-'} <strong>{pp(b / 2)}</strong>)
                <sup>2</sup>
              </p>
            </>
          )
        return (
          <>
            {intro}
            <p className="serlo-main-task">Wert im zweiten Kästchen</p>
            <p>
              Würden wir das Binom so stehen lassen, wäre der Term am Ende nicht
              immer der gleiche wie im ursprünglichen Funktionsterm:
            </p>
            <p className="serlo-highlight-gray">
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x + {(b / 2) * (b / 2)}{' '}
              + ☐
            </p>
            <p>
              Korrigiere mit dem richtigen Wert, damit am Ende{' '}
              <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {isPlus_2 ? '+' : '-'}
                {c}
              </span>{' '}
              steht:
            </p>
            <p className="serlo-highlight-gray">
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x + {(b / 2) * (b / 2)}{' '}
              <strong>{dAlsJsx}</strong>{' '}
            </p>
            <br />
            <br />
            <p>Damit lautet die Scheitelform: </p>
            <p className="serlo-highlight-green">
              y = <span className="inline-block scale-y-[1.5]">(</span>x{' '}
              {isPlus ? '+' : '-'} {pp(b / 2)}
              <span className="inline-block scale-y-[1.5]">)</span>
              <sup>2</sup> <strong>{dAlsJsx}</strong>
            </p>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ b, isPlus, isPlus_2, c }) => {
        if (isPlus_2 && c === (b / 2) * (b / 2))
          return (
            <>
              Schreibe den Funktionsterm in die Scheitelform:
              <p className="serlo-highlight-gray">
                y = (x - ☐)<sup>2</sup> + ☐
              </p>
              <br />
              <br />
              Bestimme dazu zuerst, welcher Wert im Binom stehen muss, um den
              richtigen Mischterm zu ergeben:
              <br />
              <p className="serlo-highlight-gray">
                y = x<sup>2</sup> {isPlus ? '+' : '-'} <strong>{b}</strong>x{' '}
                {isPlus_2 ? '+' : '-'}
                {c}
              </p>
              <br />
              <br />
              Begründe, warum im zweiten Kästchen eine 0 stehen muss.
            </>
          )
        return (
          <>
            Schreibe den Funktionsterm in die Scheitelform:
            <p className="serlo-highlight-gray">
              y = (x - ☐)<sup>2</sup> + ☐
            </p>
            <br />
            <br />
            Bestimme dazu zuerst, welcher Wert im Binom stehen muss, um den
            richtigen Mischterm zu ergeben:
            <br />
            <p className="serlo-highlight-gray">
              y = x<sup>2</sup> {isPlus ? '+' : '-'} <strong>{b}</strong>x{' '}
              {isPlus_2 ? '+' : '-'}
              {c}
            </p>
            <br />
            <br />
            Mache eine Probe und rechne das Binom aus, um zu bestimmen, was der
            Wert des zweiten Kästchens sein muss.
          </>
        )
      }}
    />
  )
}
