import { WheelDiagram } from './wheel-diagram'
import { buildBlock, buildFrac } from '../../utils/math-builder'
import { SelfEvaluationExercise } from '../self-evaluation-exercise'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface WofData {
  sections: number
  number_1: boolean
  number_2: boolean
  number_3: boolean
  number_4: boolean
  number_5: boolean
  number_6: boolean
  number_7: boolean
  number_8: boolean
  event: number
}

function gcd(a: number, b: number): number {
  if (b === 0) return a
  return gcd(b, a % b)
}

function colorName(val: boolean) {
  return val ? 'blau' : 'gelb'
}

export function WheelOfFortune() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const sections = randomIntBetween(3, 8)
        const event = randomIntBetween(1, 4)
        const number_1 = randomItemFromArray([true, false])
        const number_2 = number_1 === true ? false : true
        const number_3 = randomItemFromArray([true, false])
        const number_4 = randomItemFromArray([true, false])
        const number_5 = randomItemFromArray([true, false])
        const number_6 = randomItemFromArray([true, false])
        const number_7 = randomItemFromArray([true, false])
        const number_8 = randomItemFromArray([true, false])

        const data: WofData = {
          sections,
          event,
          number_1,
          number_2,
          number_3,
          number_4,
          number_5,
          number_6,
          number_7,
          number_8,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        const sectionsArray = [
          data.number_1,
          data.number_2,
          data.number_3,
          data.number_4,
          data.number_5,
          data.number_6,
          data.number_7,
          data.number_8,
        ]
        sectionsArray.splice(data.sections)
        return (
          <>
            <p className="text-2xl">
              Die Abbildung zeigt ein Glücksrad mit gleichgroßen Feldern. Es
              gibt gelbe und blaue Preise zur Auswahl.
            </p>
            <WheelDiagram
              data={{
                sections: sectionsArray,
                event: data.event,
              }}
            />
            <p className="text-2xl">
              Bestimmen Sie die Wahrscheinlichkeit, dass man beim zweimaligen
              Drehen{' '}
              {data.event === 1
                ? `höchstens einmal den ${colorName(data.number_1)}en Preis erhält`
                : null}
              {data.event === 2 ? 'den gleichen Preis zweimal erhält.' : null}
              {data.event === 3
                ? `mindestens einmal den ${colorName(data.number_1)}en Preis erhält`
                : null}
              {data.event === 4 ? ' zwei verschiedene Preise erhält.' : null}
            </p>
          </>
        )
      }}
      renderSolution={({ data }) => {
        const array = [
          data.number_1,
          data.number_2,
          data.number_3,
          data.number_4,
          data.number_5,
          data.number_6,
          data.number_7,
          data.number_8,
        ]
        array.splice(data.sections)

        const counterYellow = array.filter(Boolean).length
        const counterBlue = array.length - counterYellow

        const gcdYellow = gcd(counterYellow, data.sections)
        const gcdBlue = gcd(counterBlue, data.sections)

        function getC(val: boolean) {
          return val ? counterBlue : counterYellow
        }

        function buildSimplifyFrac(a: number, b: number) {
          const d = gcd(a, b)
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
                P(gelb) = {buildFrac(counterYellow, data.sections)}
                {gcdYellow > 1 ? (
                  <>
                    {' '}
                    ={' '}
                    {buildFrac(
                      counterYellow / gcdYellow,
                      data.sections / gcdYellow
                    )}
                  </>
                ) : null}
              </>
            )}
            <p></p>
            {buildBlock(
              'gray',
              <>
                P(blau) = {buildFrac(counterBlue, data.sections)}
                {gcdBlue > 1 ? (
                  <>
                    {' '}
                    ={' '}
                    {buildFrac(counterBlue / gcdBlue, data.sections / gcdBlue)}
                  </>
                ) : null}
              </>
            )}
          </>
        )
        if (data.event === 1)
          return (
            <>
              {intro}
              <p>
                Um höchstens einmal den {data.number_1 ? 'gelben' : 'blauen'}
                Preis zu erhalten, gibt es die Kombinationen{' '}
                <span className="text-lg">
                  (gelb; blau), (blau; gelb) und ({colorName(data.number_2)};{' '}
                  {colorName(data.number_2)})
                </span>
                . Berechne daraus die Gesamtwahrscheinlichkeit:
              </p>
              {buildBlock(
                'green',
                <>
                  P(höchstens einmal {colorName(data.number_1)}) ={' '}
                  {buildSimplifyFrac(counterYellow, data.sections)} ·{' '}
                  {buildSimplifyFrac(counterBlue, data.sections)} +{' '}
                  {buildSimplifyFrac(counterBlue, data.sections)} ·{' '}
                  {buildSimplifyFrac(counterYellow, data.sections)} +{' '}
                  {buildSimplifyFrac(getC(data.number_2), data.sections)} ·{' '}
                  {buildSimplifyFrac(getC(data.number_2), data.sections)} ={' '}
                  {buildSimplifyFrac(
                    getC(data.number_2) * getC(data.number_2) +
                      counterYellow * counterBlue * 2,
                    data.sections * data.sections
                  )}
                </>
              )}
            </>
          )
        if (data.event === 2)
          return (
            <>
              {intro}
              <p>
                Um den gleichen Preis zweimal zu erhalten, gibt es die
                Kombinationen{' '}
                <span className="text-lg">(gelb; gelb) und (blau; blau)</span>.
                Berechne daraus die Gesamtwahrscheinlichkeit:
              </p>
              {buildBlock(
                'green',
                <>
                  P(gleicher Preis zweimal) ={' '}
                  {buildSimplifyFrac(counterYellow, data.sections)} ·{' '}
                  {buildSimplifyFrac(counterYellow, data.sections)} +{' '}
                  {buildSimplifyFrac(counterBlue, data.sections)} ·{' '}
                  {buildSimplifyFrac(counterBlue, data.sections)} ={' '}
                  {buildSimplifyFrac(
                    counterYellow * counterYellow + counterBlue * counterBlue,
                    data.sections * data.sections
                  )}
                </>
              )}
            </>
          )
        if (data.event === 3)
          return (
            <>
              {intro}
              <p>
                Um mindestens einmal den Preis {colorName(data.number_1)} zu
                erhalten, gibt es die Kombinationen{' '}
                <span className="text-lg">
                  (gelb; blau), (blau; gelb) und ({colorName(data.number_1)};{' '}
                  {colorName(data.number_1)})
                </span>
                . Berechne daraus die Gesamtwahrscheinlichkeit:
              </p>
              {buildBlock(
                'green',
                <>
                  P(mindestens einmal {colorName(data.number_1)}) ={' '}
                  {buildSimplifyFrac(counterYellow, data.sections)} ·{' '}
                  {buildSimplifyFrac(counterBlue, data.sections)} +{' '}
                  {buildSimplifyFrac(counterBlue, data.sections)} ·{' '}
                  {buildSimplifyFrac(counterYellow, data.sections)} +{' '}
                  {buildSimplifyFrac(getC(data.number_1), data.sections)} ·{' '}
                  {buildSimplifyFrac(getC(data.number_1), data.sections)} ={' '}
                  {buildSimplifyFrac(
                    getC(data.number_1) * getC(data.number_1) +
                      counterYellow * counterBlue * 2,
                    data.sections * data.sections
                  )}
                </>
              )}
            </>
          )
        if (data.event === 4)
          return (
            <>
              {intro}
              <p>
                Um zwei verschiedene Preise zu erhalten, gibt es die
                Kombinationen{' '}
                <span className="text-lg">(gelb; blau) und (blau; gelb)</span>.
                Berechne daraus die Gesamtwahrscheinlichkeit:
              </p>
              {buildBlock(
                'green',
                <>
                  P(verschiedene Preise) ={' '}
                  {buildSimplifyFrac(counterYellow, data.sections)} ·{' '}
                  {buildSimplifyFrac(counterBlue, data.sections)} +{' '}
                  {buildSimplifyFrac(counterBlue, data.sections)} ·{' '}
                  {buildSimplifyFrac(counterYellow, data.sections)} ={' '}
                  {buildSimplifyFrac(
                    counterYellow * counterBlue + counterBlue * counterYellow,
                    data.sections * data.sections
                  )}
                </>
              )}
            </>
          )
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
    />
  )
}
