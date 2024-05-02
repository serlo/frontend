import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { HighlightGray, MainTask } from '../components/content-components'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function LogarithmExercise2() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          breaker: randomItemFromArray([true, false, false, false]),
          num: randomIntBetween(1, 9),
          isPlus: randomItemFromArray([true, false]),
          varName: randomItemFromArray(['a', 'b', 'c', 'x', 'y', 'z']),
          logBase: randomIntBetween(2, 15),
        }
      }}
      renderTask={({ num, isPlus, varName, logBase, breaker }) => {
        return (
          <>
            <p className="serlo-main-task">
              Fassen Sie zu einem Logarithmus zusammen:
            </p>
            <p className="serlo-highlight-gray">
              log&#8202;<sub>{logBase}</sub>({varName}² -{' '}
              {breaker ? Math.pow(num + 1, 2) : num * num}) - log&#8202;
              <sub>{logBase}</sub>({varName} {isPlus ? '+' : '-'} {num})
            </p>
          </>
        )
      }}
      renderSolution={({ num, isPlus, varName, logBase, breaker }) => {
        if (breaker) {
          return (
            <>
              <p> Forme um mit den Logarithmusgesetzen:</p>
              <p className="serlo-highlight-gray">
                log&#8202;<sub>{logBase}</sub>
                <span className="inline-block scale-y-[2.5]">(</span>
                {buildFrac(
                  <>
                    {varName}² - {breaker ? Math.pow(num + 1, 2) : num * num}
                  </>,
                  <>
                    {varName} {isPlus ? '+' : '-'} {num}
                  </>
                )}
                <span className="inline-block scale-y-[2.5]">)</span>
              </p>
              <p>Dieser Term lässt sich nicht weiter vereinfachen.</p>
            </>
          )
        }
        return (
          <>
            Forme um mit den Logarithmusgesetzen:
            <br />
            <p className="serlo-highlight-gray">
              log&#8202;<sub>{logBase}</sub>
              <span className="inline-block scale-y-[2.5]">(</span>
              {buildFrac(
                <>
                  {varName}² - {num * num}
                </>,
                <>
                  {varName} {isPlus ? '+' : '-'} {num}
                </>
              )}
              <span className="inline-block scale-y-[2.5]">)</span>
            </p>
            <br />
            <br />
            Wende die 3. binomische Formel im Zähler an:
            <br />
            <p className="serlo-highlight-gray">
              log&#8202;<sub>{logBase}</sub>
              <span className="inline-block scale-y-[2.5]">(</span>
              {buildFrac(
                <>
                  ({varName} + {num})({varName} - {num})
                </>,
                <>
                  {varName} {isPlus ? '+' : '-'} {num}
                </>
              )}
              <span className="inline-block scale-y-[2.5]">)</span>
            </p>
            <br />
            <br />
            Kürze mit {varName} {isPlus ? '+' : '-'} {num} und erhalte das
            Ergebnis: <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              log&#8202;<sub>{logBase}</sub>({varName} {isPlus ? '-' : '+'}{' '}
              {num})
            </span>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({}) => {
        return (
          <>
            Verwende die Logarithmusregel
            <br />
            <span className="mt-5 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              log(u) - log(v) = log
              <span className="inline-block scale-y-[2.5] ">(</span>
              {buildFrac(<>u</>, <>v</>)}
              <span className="inline-block scale-y-[2.5] ">)</span>.
            </span>
            <br />
            <br />
            Verwende die 3. binomische Formel, um den Term im Logarithmus weiter
            zu vereinfachen.
            <br />
          </>
        )
      }}
    />
  )
}
