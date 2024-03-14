import { SelfEvaluationExercise } from '../exercise-implementations/self-evaluation-exercise'
import { SurfacePyramide } from '../exercise-implementations/surface-pyramide'
import { Trigonometry } from '../exercise-implementations/trigonometry'
import { VolumePyramide } from '../exercise-implementations/volume-pyramide'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'
import { shuffleArray } from '@/helper/shuffle-array'

export const middleSchoolFinalExam = {
  'logarithmus-1': {
    title: 'Logarithmus zusammenfassen',
    subtitle: 'Terme',
    useCalculator: false,
    track: 3, // 1 = beide Zweige, 2 = nur nicht-Mathezweig, 3 = nur Mathe-Zweig TODO
    component: (
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
              <h2 className="text-2xl">Fasse zu einem Logarithmus zusammen.</h2>
              <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                {summands.map((el, i) => renderSummand(el, i))}
              </span>
              <br />
              <br />
              <i>Rechne am Besten mit Stift und Papier.</i>
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
                  Ziehe Vorfaktoren in den Logarithmus:
                  <br />
                  <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                    {summands.map((el, i) => renderSummandAllInside(el, i))}
                  </span>
                  <br />
                  <br />
                </>
              )}
              Fasse zusammen:
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
        centAmount={52}
      />
    ),
  },
  'logarithmus-2': {
    title: 'Logarithmus zusammenfassen',
    subtitle: 'mit 3. binomischer Formel',
    useCalculator: false,
    track: 3, // 1 = beide Zweige, 2 = nur nicht-Mathezweig, 3 = nur Mathe-Zweig
    component: (
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
              <h2 className="text-2xl">Fasse zu einem Logarithmus zusammen:</h2>
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
              Forme um mit Logarithmusgesetz:
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
              Wende 3. binomische Formel im Zähler an:
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
        centAmount={52}
      />
    ),
  },
  'volumen-pyramide-1': {
    title: 'Volumen einer Pyramiden',
    subtitle: 'vierseitig',
    useCalculator: false,
    track: 3, // 1 = beide Zweige, 2 = nur nicht-Mathezweig, 3 = nur Mathe-Zweig
    component: <VolumePyramide />,
  },
  'oberflaeche-pyramide-1': {
    title: 'Oberfläche einer Pyramide',
    subtitle: 'vierseitig',
    useCalculator: false,
    track: 3, // 1 = beide Zweige, 2 = nur nicht-Mathezweig, 3 = nur Mathe-Zweig
    component: <SurfacePyramide />,
  },
  'trigonometrie-1': {
    title: 'Volumen einer Pyramiden',
    subtitle: 'vierseitig',
    useCalculator: false,
    track: 3, // 1 = beide Zweige, 2 = nur nicht-Mathezweig, 3 = nur Mathe-Zweig
    component: <Trigonometry />,
  },
  'normalform-1': {
    title: 'Normalform einer Parabel',
    subtitle: 'Quadratische Funktionen',
    useCalculator: false,
    track: 3, // 1 = beide Zweige, 2 = nur nicht-Mathezweig, 3 = nur Mathe-Zweig
    component: (
      <SelfEvaluationExercise
        generator={() => {
          return {
            x_s: randomIntBetween(1, 9),
            y_s: randomIntBetween(1, 9),
            isPlus: randomItemFromArray([true, false]),
            isPlus_2: randomItemFromArray([true, false]),
          }
        }}
        renderTask={({ x_s, isPlus, isPlus_2, y_s }) => {
          return (
            <>
              <h2 className="text-2xl">
                Bestimme die Normalenform der Parabel:
              </h2>
              <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                y = (x {isPlus ? '+' : '-'} {x_s})<sup>2</sup>{' '}
                {isPlus_2 ? '+' : '-'} {y_s}
              </span>
              <br />
              <br />
              <i>Rechne am Besten mit Stift und Papier.</i>
            </>
          )
        }}
        renderSolution={({ x_s, isPlus, isPlus_2, y_s }) => {
          return (
            <>
              Aufgabenstellung: <br />
              <span className="bg-grey-300 mt-3 inline-block rounded-md bg-opacity-20 p-1 px-3 text-2xl">
                y = (x {isPlus ? '+' : '-'} {x_s})<sup>2</sup>{' '}
                {isPlus_2 ? '+' : '-'} {y_s}
              </span>
              <br />
              <br />
              Wende die die binomischen Formeln an:
              <br />
              <span className="bg-grey-300 mt-3 inline-block rounded-md bg-opacity-20 p-1 px-3 text-2xl">
                y = [ x<sup>2</sup> {isPlus ? '+' : '-'} 2 · {x_s} · x + {x_s}
                <sup>2</sup> ] {isPlus_2 ? '+' : '-'} {y_s}
              </span>
              <br />
              <br />
              Berechne den Mischterm und die Potenz:
              <span className="bg-grey-300 mt-3 inline-block rounded-md bg-opacity-20 p-1 px-3 text-2xl">
                y = [ x<sup>2</sup> {isPlus ? '+' : '-'} {2 * x_s}x +{' '}
                {x_s * x_s} ] {isPlus_2 ? '+' : '-'} {y_s}
              </span>
              <br />
              <br />
              Fasse den Term zusammen:
              <br />
              <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                y = x<sup>2</sup>
                {isPlus ? '+' : '-'} {2 * x_s}x{isPlus_2 ? '+' : '-'}{' '}
                {isPlus_2 ? x_s * x_s + y_s : x_s * x_s - y_s}
              </span>
            </>
          )
        }}
        centAmount={52}
      />
    ),
  },
  'scheitelform-1': {
    title: 'Normalform einer Parabel',
    subtitle: 'Quadratische Funktionen',
    useCalculator: false,
    track: 3, // 1 = beide Zweige, 2 = nur nicht-Mathezweig, 3 = nur Mathe-Zweig
    component: (
      <SelfEvaluationExercise
        generator={() => {
          return {
            b: randomIntBetween(2, 6),
            c: randomIntBetween(2, 9),
            isPlus: randomItemFromArray([true, false]),
            isPlus_2: randomItemFromArray([true, false]),
          }
        }}
        renderTask={({ b, isPlus, isPlus_2, c }) => {
          return (
            <>
              <h2 className="text-2xl">
                Bestimme die Scheitelform der Parabel:
              </h2>
              <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x{' '}
                {isPlus_2 ? '+' : '-'} {c}
              </span>

              <br />
              <br />
              <i>Rechne am Besten mit Stift und Papier.</i>
            </>
          )
        }}
        renderSolution={({ b, isPlus, isPlus_2, c }) => {
          return (
            <>
              Aufgabenstellung: <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x{' '}
                {isPlus_2 ? '+' : '-'}
                {c}
              </span>
              <br />
              <br />
              Wir führen eine quadratische Ergänzung durch. <br />
              Dazu addieren wir den Term{' '}
              <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-1">
                <span className="inline-block scale-y-[2.5]">(</span>
                {buildFrac(<>{b}</>, <>2</>)}
                <span className="inline-block scale-y-[2.5]">)</span>
                <sup>2</sup>
              </span>{' '}
              und subtrahieren ihn zum Schluss wieder:
              <br />
              <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = x<sup>2</sup>
                {isPlus ? '+' : '-'} {b}x +{' '}
                <span className="inline-block scale-y-[2.5]">(</span>
                {buildFrac(<>{b}</>, <>2</>)}
                <span className="inline-block scale-y-[2.5]">)</span>
                <sup>2</sup> {isPlus_2 ? '+' : '-'} {c} -{' '}
                <span className="inline-block scale-y-[2.5] ">(</span>
                {buildFrac(<>{b}</>, <>2</>)}
                <span className="inline-block scale-y-[2.5]">)</span>
                <sup>2</sup>
              </span>
              <br />
              <br />
              Den vorderen Teil fassen wir zu einem Binom Zusammen:
              <br />
              <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = <span className="inline-block scale-y-[2.5]">(</span>x -{' '}
                {buildFrac(<>{b}</>, <>2</>)}{' '}
                <span className="inline-block scale-y-[2.5]">)</span>
                <sup>2</sup> {isPlus_2 ? '+' : '-'} {c} -{' '}
                <span className="inline-block scale-y-[2.5] ">(</span>
                {buildFrac(<>{b}</>, <>2</>)}
                <span className="inline-block scale-y-[2.5]">)</span>
                <sup>2</sup>
              </span>
              <br />
              <br />
              Die Zahlen hinter der Klammer werden auch zusammengefasst:
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = <span className="inline-block scale-y-[2.5]">(</span>x -{' '}
                {b / 2}
                <span className="inline-block scale-y-[2.5]">)</span>
                <sup>2</sup>{' '}
                {c - (b / 2) * (b / 2) === 0 ? (
                  <></>
                ) : (
                  <>
                    {c - (b / 2) * (b / 2) > 0 ? '+' : ''}{' '}
                    {isPlus_2 ? c - (b / 2) * (b / 2) : -c - (b / 2) * (b / 2)}
                  </>
                )}
              </span>
            </>
          )
        }}
        centAmount={35}
      />
    ),
  },
} as const
