import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function LogarithmExercise2() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          num: randomIntBetween(1, 9),
          isPlus: randomItemFromArray([true, false]),
          varName: randomItemFromArray(['a', 'b', 'c', 'x', 'y', 'z']),
          logBase: randomIntBetween(2, 15),
        }
      }}
      renderTask={({ num, isPlus, varName, logBase }) => {
        return (
          <>
            <h2 className="text-2xl">
              Fassen Sie zu einem Logarithmus zusammen:
            </h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              log&#8202;<sub>{logBase}</sub>({varName}² - {num * num}) -
              log&#8202;
              <sub>{logBase}</sub>({varName} {isPlus ? '+' : '-'} {num})
            </span>
            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
          </>
        )
      }}
      renderSolution={({ num, isPlus, varName, logBase }) => {
        return (
          <>
            Aufgabenstellung: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              log&#8202;<sub>{logBase}</sub>({varName}² - {num * num}) -
              log&#8202;
              <sub>{logBase}</sub>({varName} {isPlus ? '+' : '-'} {num})
            </span>
            <br />
            <br />
            Forme um mit den Logarithmusgesetzen:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
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
            </span>
            <br />
            <br />
            Wende die 3. binomische Formel im Zähler an:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
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
            </span>
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
      centAmount={52}
    />
  )
}
