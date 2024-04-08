import { StepByStepFeedback } from './step-by-step-solution'
import { WheelDiagram } from './wheel-diagram'
import { MultipleNumberInputExerciseWithInteractiveSolution } from '../../number-input-exercise/multiple-number-input-exercise-with-interactive-solution'
import { getGcd } from '../../utils/get-gcd'
import { buildBlock, buildFrac } from '../../utils/math-builder'
import { arrayOfLength } from '@/helper/array-of-length'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export interface WofData {
  sections: boolean[]
  event: number
}

export function WheelOfFortuneStepByStep() {
  return (
    <MultipleNumberInputExerciseWithInteractiveSolution
      numberOfInputs={2}
      generator={() => {
        const sections = arrayOfLength(randomIntBetween(2, 6)).map(() =>
          randomItemFromArray([true, false])
        )
        // make sure we have at least one of both colors
        const yellow = sections.filter(Boolean).length
        if (yellow === sections.length || yellow === 0) {
          const flipIndex = randomIntBetween(0, sections.length - 1)
          sections[flipIndex] = !sections[flipIndex]
        }

        const event = 2 //randomIntBetween(1, 4)
        return { sections, event }
      }}
      renderTask={(inputs, data) => {
        return (
          <>
            <p className="text-2xl">
              Die Abbildung zeigt ein Glücksrad mit gleichgroßen Feldern. Es
              gibt gelbe und blaue Preise zu gewinnen.
            </p>
            <WheelDiagram data={data} />
            <p className="text-2xl">
              Bestimmen Sie die Wahrscheinlichkeit, dass man beim zweimaligen
              Drehen{' '}
              {/* {data.event === 1
                ? 'höchstens einmal Preis ' + sections[0] + ' erhält.'
                : null} */}
              {data.event === 2 ? ' den gleichen Preis zweimal erhält.' : null}
              {/* {data.event === 3
                ? 'mindestens einmal Preis ' + sections[0] + ' erhält.'
                : null}
              {data.event === 4 ? ' zwei verschiedene Preise erhält.' : null} */}
            </p>
            <br />
            {buildBlock(
              'gray',
              <div className="flex items-center">
                P(verschiedene Preise) ={' '}
                <div className="ml-2 inline-flex flex-col py-1 [&_input]:text-center">
                  <div className="mb-1.5 border border-transparent border-b-almost-black pb-1.5">
                    {inputs[0]}
                  </div>
                  {inputs[1]}
                </div>
              </div>
            )}
          </>
        )
      }}
      renderSolution={(data) => {
        const { sections } = data

        const counterYellow = sections.filter(Boolean).length
        const counterPurple = sections.length - counterYellow

        const gcdA = getGcd(counterYellow, sections.length)
        const gcdB = getGcd(counterPurple, sections.length)

        // function getC(val: string) {
        //   if (val === 'A') return counterYellow
        //   return counterPurple
        // }

        function buildSimplifyFrac(a: number, b: number) {
          const d = getGcd(a, b)
          return buildFrac(a / d, b / d)
        }

        const intro = (
          <>
            <p>
              Bestimme zuerst die Wahrscheinlichkeiten für die einzelnen Preise
              beim einmaligen Drehen:
            </p>
            {buildBlock(
              'gray',
              <>
                P(A) = {buildFrac(counterYellow, sections.length)}
                {gcdA > 1 ? (
                  <>
                    {' '}
                    = {buildFrac(counterYellow / gcdA, sections.length / gcdA)}
                  </>
                ) : null}
              </>
            )}
            <p></p>
            {buildBlock(
              'gray',
              <>
                P(B) = {buildFrac(counterPurple, sections.length)}
                {gcdB > 1 ? (
                  <>
                    {' '}
                    = {buildFrac(counterPurple / gcdB, sections.length / gcdB)}
                  </>
                ) : null}
              </>
            )}
          </>
        )
        // if (data.event === 1)
        //   return (
        //     <>
        //       {intro}
        //       <p>
        //         Um höchstens einmal den Preis {data.number_1} zu erhalten, gibt
        //         es die Kombinationen{' '}
        //         <span className="text-lg">
        //           (A; B), (B; A) und ({data.number_2}; {data.number_2})
        //         </span>
        //         . Berechne daraus die Gesamtwahrscheinlichkeit:
        //       </p>
        //       {buildBlock(
        //         'green',
        //         <>
        //           P(höchstens einmal {data.number_1}) ={' '}
        //           {buildSimplifyFrac(counterYellow, data.sections)} ·{' '}
        //           {buildSimplifyFrac(counterPurple, data.sections)} +{' '}
        //           {buildSimplifyFrac(counterPurple, data.sections)} ·{' '}
        //           {buildSimplifyFrac(counterYellow, data.sections)} +{' '}
        //           {buildSimplifyFrac(getC(data.number_2), data.sections)} ·{' '}
        //           {buildSimplifyFrac(getC(data.number_2), data.sections)} ={' '}
        //           {buildSimplifyFrac(
        //             getC(data.number_2) * getC(data.number_2) +
        //               counterYellow * counterPurple * 2,
        //             data.sections * data.sections
        //           )}
        //         </>
        //       )}
        //     </>
        //   )
        if (data.event === 2)
          return (
            <>
              {intro}
              <p>
                Um den gleichen Preis zweimal zu erhalten, gibt es die
                Kombinationen <span className="text-lg">(A; A) und (B; B)</span>
                . Berechne daraus die Gesamtwahrscheinlichkeit:
              </p>
              {buildBlock(
                'green',
                <>
                  P(gleicher Preis zweimal) ={' '}
                  {buildSimplifyFrac(counterYellow, sections.length)} ·{' '}
                  {buildSimplifyFrac(counterYellow, sections.length)} +{' '}
                  {buildSimplifyFrac(counterPurple, sections.length)} ·{' '}
                  {buildSimplifyFrac(counterPurple, sections.length)} ={' '}
                  {buildSimplifyFrac(
                    counterYellow * counterYellow +
                      counterPurple * counterPurple,
                    sections.length * sections.length
                  )}
                </>
              )}
            </>
          )
        // if (data.event === 3)
        //   return (
        //     <>
        //       {intro}
        //       <p>
        //         Um mindestens einmal den Preis {data.number_1} zu erhalten, gibt
        //         es die Kombinationen{' '}
        //         <span className="text-lg">
        //           (A; B), (B; A) und ({data.number_1}; {data.number_1})
        //         </span>
        //         . Berechne daraus die Gesamtwahrscheinlichkeit:
        //       </p>
        //       {buildBlock(
        //         'green',
        //         <>
        //           P(mindestens einmal {data.number_1}) ={' '}
        //           {buildSimplifyFrac(counterYellow, data.sections)} ·{' '}
        //           {buildSimplifyFrac(counterPurple, data.sections)} +{' '}
        //           {buildSimplifyFrac(counterPurple, data.sections)} ·{' '}
        //           {buildSimplifyFrac(counterYellow, data.sections)} +{' '}
        //           {buildSimplifyFrac(getC(data.number_1), data.sections)} ·{' '}
        //           {buildSimplifyFrac(getC(data.number_1), data.sections)} ={' '}
        //           {buildSimplifyFrac(
        //             getC(data.number_1) * getC(data.number_1) +
        //               counterYellow * counterPurple * 2,
        //             data.sections * data.sections
        //           )}
        //         </>
        //       )}
        //     </>
        //   )
        // if (data.event === 4)
        //   return (
        //     <>
        //       {intro}
        //       <p>
        //         Um zwei verschiedene Preise zu erhalten, gibt es die
        //         Kombinationen <span className="text-lg">(A; B) und (B; A)</span>
        //         . Berechne daraus die Gesamtwahrscheinlichkeit:
        //       </p>
        //       {buildBlock(
        //         'green',
        //         <>
        //           P(verschiedene Preise) ={' '}
        //           {buildSimplifyFrac(counterYellow, data.sections)} ·{' '}
        //           {buildSimplifyFrac(counterPurple, data.sections)} +{' '}
        //           {buildSimplifyFrac(counterPurple, data.sections)} ·{' '}
        //           {buildSimplifyFrac(counterYellow, data.sections)} ={' '}
        //           {buildSimplifyFrac(
        //             counterYellow * counterPurple +
        //               counterPurple * counterYellow,
        //             data.sections * data.sections
        //           )}
        //         </>
        //       )}
        //     </>
        //   )
        return <></>
      }}
      renderHint={() => {
        return (
          <>
            Berechne zuerst die Wahrscheinlichkeit eines Ereignisses bei einem
            Dreh mit der Formel für das Laplace-Experiment:
            <br />
            <span className="mt-5 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              P(E) ={' '}
              {buildFrac(
                <>Anzahl der günstigen Ereignisse</>,
                <>Anzahl der möglichen Ereignisse</>
              )}
            </span>
            <br />
            <br />
            Untersuche, welche Kombinationen von Zahlen zum Ereignis passen und
            bestimme die Gesamtwahrscheinlichkeit mit Additions- und
            Multiplikationsregel.
          </>
        )
      }}
      widthForDigits={3}
      validateInputs={(inputValues: string[], data: WofData) => {
        const { sections } = data
        if (!inputValues[0] || !inputValues[1]) return [false, false]

        const counter_A = sections.filter(Boolean).length
        const counter_B = sections.length - counter_A

        const over = counter_A * counter_B + counter_B * counter_A
        const under = sections.length * sections.length
        const d = getGcd(over, under)
        const correct = [over / d, under / d]

        const inputOver = parseInt(inputValues[0])
        const inputUnder = parseInt(inputValues[1])
        const inputD = getGcd(inputOver, inputUnder)
        const input = [over / inputD, under / inputD]

        return [correct[0] === input[0], correct[1] === input[1]]
      }}
      renderStepByStep={(data: WofData) => {
        return <StepByStepFeedback data={data} />
      }}
      centAmount={52}
    />
  )
}
