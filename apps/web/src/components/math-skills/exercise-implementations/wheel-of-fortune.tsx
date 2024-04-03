import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildBlock, buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface WofData {
  sections: number
  number_1: string
  number_2: string
  number_3: string
  number_4: string
  number_5: string
  number_6: string
  number_7: string
  number_8: string
  event: number
}

const gcd = function (a: number, b: number): number {
  if (b === 0) return a
  return gcd(b, a % b)
}

export function WheelOfFortune() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const sections = randomIntBetween(3, 8)
        const event = randomIntBetween(1, 4)
        const number_1 = randomItemFromArray(['A', 'B'])
        const number_2 = number_1 === 'A' ? 'B' : 'A'
        const number_3 = randomItemFromArray(['A', 'B'])
        const number_4 = randomItemFromArray(['A', 'B'])
        const number_5 = randomItemFromArray(['A', 'B'])
        const number_6 = randomItemFromArray(['A', 'B'])
        const number_7 = randomItemFromArray(['A', 'B'])
        const number_8 = randomItemFromArray(['A', 'B'])

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
        return (
          <>
            <p className="text-2xl">
              Die Abbildung zeigt ein Glücksrad mit gleichgroßen Feldern. Es
              gibt die Preise A und B zur Auswahl.
            </p>
            <SubComponent data={data} />
            <p className="text-2xl">
              Bestimmen Sie die Wahrscheinlichkeit, dass man beim zweimaligen
              Drehen{' '}
              {data.event === 1
                ? 'höchstens einmal Preis ' + data.number_1 + ' erhält.'
                : null}
              {data.event === 2 ? ' den gleichen Preis zweimal erhält.' : null}
              {data.event === 3
                ? 'mindestens einmal Preis ' + data.number_1 + ' erhält.'
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

        const counter_A = array.filter((x) => x === 'A').length
        const counter_B = array.filter((x) => x === 'B').length

        const gcdA = gcd(counter_A, data.sections)
        const gcdB = gcd(counter_B, data.sections)

        function getC(val: string) {
          if (val === 'A') return counter_A
          return counter_B
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
                P(A) = {buildFrac(counter_A, data.sections)}
                {gcdA > 1 ? (
                  <> = {buildFrac(counter_A / gcdA, data.sections / gcdA)}</>
                ) : null}
              </>
            )}
            <p></p>
            {buildBlock(
              'gray',
              <>
                P(B) = {buildFrac(counter_B, data.sections)}
                {gcdB > 1 ? (
                  <> = {buildFrac(counter_B / gcdB, data.sections / gcdB)}</>
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
                Um höchstens einmal den Preis {data.number_1} zu erhalten, gibt
                es die Kombinationen{' '}
                <span className="text-lg">
                  (A; B), (B; A) und ({data.number_2}; {data.number_2})
                </span>
                . Berechne daraus die Gesamtwahrscheinlichkeit:
              </p>
              {buildBlock(
                'green',
                <>
                  P(höchstens einmal {data.number_1}) ={' '}
                  {buildSimplifyFrac(counter_A, data.sections)} ·{' '}
                  {buildSimplifyFrac(counter_B, data.sections)} +{' '}
                  {buildSimplifyFrac(counter_B, data.sections)} ·{' '}
                  {buildSimplifyFrac(counter_A, data.sections)} +{' '}
                  {buildSimplifyFrac(getC(data.number_2), data.sections)} ·{' '}
                  {buildSimplifyFrac(getC(data.number_2), data.sections)} ={' '}
                  {buildSimplifyFrac(
                    getC(data.number_2) * getC(data.number_2) +
                      counter_A * counter_B * 2,
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
                Kombinationen <span className="text-lg">(A; A) und (B; B)</span>
                . Berechne daraus die Gesamtwahrscheinlichkeit:
              </p>
              {buildBlock(
                'green',
                <>
                  P(gleicher Preis zweimal) ={' '}
                  {buildSimplifyFrac(counter_A, data.sections)} ·{' '}
                  {buildSimplifyFrac(counter_A, data.sections)} +{' '}
                  {buildSimplifyFrac(counter_B, data.sections)} ·{' '}
                  {buildSimplifyFrac(counter_B, data.sections)} ={' '}
                  {buildSimplifyFrac(
                    counter_A * counter_A + counter_B * counter_B,
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
                Um mindestens einmal den Preis {data.number_1} zu erhalten, gibt
                es die Kombinationen{' '}
                <span className="text-lg">
                  (A; B), (B; A) und ({data.number_1}; {data.number_1})
                </span>
                . Berechne daraus die Gesamtwahrscheinlichkeit:
              </p>
              {buildBlock(
                'green',
                <>
                  P(mindestens einmal {data.number_1}) ={' '}
                  {buildSimplifyFrac(counter_A, data.sections)} ·{' '}
                  {buildSimplifyFrac(counter_B, data.sections)} +{' '}
                  {buildSimplifyFrac(counter_B, data.sections)} ·{' '}
                  {buildSimplifyFrac(counter_A, data.sections)} +{' '}
                  {buildSimplifyFrac(getC(data.number_1), data.sections)} ·{' '}
                  {buildSimplifyFrac(getC(data.number_1), data.sections)} ={' '}
                  {buildSimplifyFrac(
                    getC(data.number_1) * getC(data.number_1) +
                      counter_A * counter_B * 2,
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
                Kombinationen <span className="text-lg">(A; B) und (B; A)</span>
                . Berechne daraus die Gesamtwahrscheinlichkeit:
              </p>
              {buildBlock(
                'green',
                <>
                  P(verschiedene Preise) ={' '}
                  {buildSimplifyFrac(counter_A, data.sections)} ·{' '}
                  {buildSimplifyFrac(counter_B, data.sections)} +{' '}
                  {buildSimplifyFrac(counter_B, data.sections)} ·{' '}
                  {buildSimplifyFrac(counter_A, data.sections)} ={' '}
                  {buildSimplifyFrac(
                    counter_A * counter_B + counter_B * counter_A,
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
      centAmount={52}
    />
  )
}
function SubComponent({ data }: { data: WofData }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-5, 5, 5, -5],
      showNavigation: false,
      showCopyright: false,
    })

    b.create('circle', [
      [0, 0],
      [4, 0],
    ])

    const texts: JXG.Text[] = []
    const lines: JXG.Line[] = []
    for (let i = 0; i < data.sections; i++) {
      const angle = ((2 * Math.PI) / data.sections) * i
      const x_Text = 2.5 * Math.cos(angle)
      const y_Text = 2.5 * Math.sin(angle)
      const x = 4 * Math.cos(angle)
      const y = 4 * Math.sin(angle)
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
      lines.push(
        b.create(
          'line',
          [
            [0, 0],
            [x, y],
          ],
          { straightFirst: false, straightLast: false }
        )
      )
      texts.push(b.create('text', [x_Text, y_Text, array[i].toString()], {}))
    }

    b.create('text', [-0.2, 4, '⧪'], {})

    // Animationszeit und Schritte definieren
    const duration = 2000 // Gesamtdauer der Animation in ms
    const steps = 100 // Anzahl der Schritte in der Animation
    const stepDuration = duration / steps
    let currentStep = 0

    const rotationInterval = setInterval(() => {
      currentStep++
      const angle = (currentStep / steps) * 2 * Math.PI
      for (let i = 0; i < data.sections; i++) {
        const line = lines[i]
        const text = texts[i]
        const rotationPoint = JXG.COORDS_BY_USER
        line.point2.setPosition(rotationPoint, [
          4 * Math.cos(angle + (i * 2 * Math.PI) / data.sections),
          4 * Math.sin(angle + (i * 2 * Math.PI) / data.sections),
        ])
        text.setPosition(rotationPoint, [
          2.5 * Math.cos(angle + (i * 2 * Math.PI + 3) / data.sections),
          2.5 * Math.sin(angle + (i * 2 * Math.PI + 3) / data.sections),
        ])
      }
      b.update()

      // Stoppe die Animation nach der letzten Drehung
      if (currentStep >= steps) {
        clearInterval(rotationInterval)
      }
    }, stepDuration)

    setBoard(b)

    return () => {
      if (board) {
        clearInterval(rotationInterval) // Stelle sicher, dass die Animation angehalten wird
        JXG.JSXGraph.freeBoard(board)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <div
        id="jxgbox"
        className="jxgbox pointer-events-none mb-2 mt-6 h-[300px] w-[300px] rounded-2xl border border-gray-200"
      ></div>
      <style jsx global>
        {`
          .JXGtext {
            font-family: Karla, sans-serif !important;
            font-weight: bold !important;
            font-size: 18px !important;
          }
        `}
      </style>
    </div>
  )
}
