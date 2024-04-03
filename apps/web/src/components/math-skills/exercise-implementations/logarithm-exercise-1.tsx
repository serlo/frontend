import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'
import { shuffleArray } from '@/helper/shuffle-array'

export function LogarithmExercise1() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const summands: {
          isPlus: boolean
          exponent: number
          isOutside: boolean
        }[] = []
        const numOfSummands = randomIntBetween(2, 3)
        let resultExp = 0
        for (let i = 0; i < numOfSummands; i++) {
          const possibleExp: number[] = []
          for (let j = -resultExp; j <= 3; j++) {
            if (j !== 0) {
              possibleExp.push(j)
            }
          }
          const exponent = randomItemFromArray(possibleExp)
          resultExp += exponent
          const isPlus = exponent > 0
          summands.push({
            isPlus,
            exponent,
            isOutside: exponent !== 1 && randomItemFromArray([true, false]),
          })
        }
        return {
          summands: shuffleArray(summands),
          varName: randomItemFromArray(['a', 'b', 'c', 'x', 'y', 'z']),
          logBase: randomIntBetween(2, 15),
        }
      }}
      renderTask={({ summands, varName, logBase }) => {
        function renderSummand(summand: (typeof summands)[0], index: number) {
          return (
            <>
              {index === 0 && summand.isPlus
                ? null
                : summand.isPlus
                  ? ' + '
                  : ' - '}
              {summand.isOutside && Math.abs(summand.exponent) !== 1 ? (
                <>{Math.abs(summand.exponent)} </>
              ) : null}
              log&#8202;<sub>{logBase}</sub> {varName}
              <sup>
                {summand.isOutside || Math.abs(summand.exponent) === 1
                  ? null
                  : Math.abs(summand.exponent)}
              </sup>
            </>
          )
        }
        return (
          <>
            <h2 className="text-2xl">
              Fassen Sie zu einem Logarithmus zusammen:
            </h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              {summands.map((el, i) => renderSummand(el, i))}
            </span>{' '}
          </>
        )
      }}
      renderSolution={({ summands, varName, logBase }) => {
        function renderSummand(summand: (typeof summands)[0], index: number) {
          return (
            <>
              {index === 0 && summand.isPlus
                ? null
                : summand.isPlus
                  ? ' + '
                  : ' - '}
              {summand.isOutside && Math.abs(summand.exponent) !== 1 ? (
                <>{Math.abs(summand.exponent)} </>
              ) : null}
              log&#8202;<sub>{logBase}</sub> {varName}
              <sup>
                {summand.isOutside || Math.abs(summand.exponent) === 1
                  ? null
                  : Math.abs(summand.exponent)}
              </sup>
            </>
          )
        }
        function renderSummandAllInside(
          summand: (typeof summands)[0],
          index: number
        ) {
          return (
            <>
              {index === 0 && summand.isPlus
                ? null
                : summand.isPlus
                  ? ' + '
                  : ' - '}
              log&#8202;<sub>{logBase}</sub> {varName}
              <sup>
                {Math.abs(summand.exponent) === 1
                  ? null
                  : Math.abs(summand.exponent)}
              </sup>
            </>
          )
        }

        const resultExp = summands.reduce((acc, obj) => obj.exponent + acc, 0)
        return (
          <>
            Aufgabenstellung: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {summands.map((el, i) => renderSummand(el, i))}
            </span>
            <br />
            <br />
            {summands.some(
              (s) => s.isOutside && Math.abs(s.exponent) !== 1
            ) && (
              <>
                Ziehe die Vorfaktoren in den Logarithmus:
                <br />
                <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                  {summands.map((el, i) => renderSummandAllInside(el, i))}
                </span>
                <br />
                <br />
              </>
            )}
            Fasse zusammen mithilfe der Logarithmusregeln:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {summands.some((s) => s.exponent < 0) ? (
                <>
                  log&#8202;<sub>{logBase}</sub>
                  <span className="inline-block scale-y-[2.5]">(</span>
                  {buildFrac(
                    <>
                      {summands
                        .filter((s) => s.exponent > 0)
                        .map((s, i) => (
                          <>
                            {i === 0 ? null : ' · '}
                            {varName}
                            <sup>{s.exponent !== 1 ? s.exponent : null}</sup>
                          </>
                        ))}
                    </>,
                    <>
                      {summands
                        .filter((s) => s.exponent < 0)
                        .map((s, i) => (
                          <>
                            {i === 0 ? null : ' · '}
                            {varName}
                            <sup>
                              {Math.abs(s.exponent) !== 1
                                ? Math.abs(s.exponent)
                                : null}
                            </sup>
                          </>
                        ))}
                    </>
                  )}
                  <span className="inline-block scale-y-[2.5]">)</span>
                </>
              ) : (
                <>
                  log&#8202;<sub>{logBase}</sub>(
                  {summands.map((s, i) => (
                    <>
                      {i === 0 ? null : ' · '}
                      {varName}
                      <sup>{s.exponent !== 1 ? s.exponent : null}</sup>
                    </>
                  ))}
                  )
                </>
              )}
            </span>
            <br />
            <br />
            Vereinfache und erhalte das Ergebnis: <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              {resultExp === 0 ? (
                <>
                  log&#8202;<sub>{logBase}</sub> {varName}
                  <sup>0</sup> = log&#8202;<sub>{logBase}</sub> 1 = 0
                </>
              ) : (
                <>
                  log&#8202;<sub>{logBase}</sub> {varName}
                  {resultExp !== 1 ? <sup>{resultExp}</sup> : null}
                </>
              )}
            </span>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({}) => {
        return (
          <>
            Verwende die Logarithmusregeln
            <br />
            <span className="mt-5 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              a · log(u) = log(u<sup>a</sup>),
            </span>
            <br />
            <span className="mt-5 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              log(u) + log(v) = log(u · v)
            </span>
            <br />
            <br />
            und
            <br />
            <span className="mt-5 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              log(u) - log(v) = log
              <span className="inline-block scale-y-[2.5] ">(</span>
              {buildFrac(<>u</>, <>v</>)}
              <span className="inline-block scale-y-[2.5] ">)</span>.
            </span>
          </>
        )
      }}
      centAmount={52}
    />
  )
}
