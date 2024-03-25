/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

interface WofData {
  sections: number
  number_1: number
  number_2: number
  number_3: number
  number_4: number
  number_5: number
  number_6: number
  number_7: number
  number_8: number
  event: number
}

export function WheelOfFortune() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const sections = randomIntBetween(3, 8)
        const event = randomIntBetween(1, 1)
        const number_1 = randomIntBetween(1, 5)
        const number_2 = randomIntBetween(1, 5)
        const number_3 = randomIntBetween(1, 5)
        const number_4 = randomIntBetween(1, 5)
        const number_5 = randomIntBetween(1, 5)
        const number_6 = randomIntBetween(1, 5)
        const number_7 = randomIntBetween(1, 5)
        const number_8 = randomIntBetween(1, 5)

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
            <h2 className="text-2xl">
              Die Abbildung zeigt ein Glücksrad mit gleichgroßen Feldern{' '}
            </h2>
            <SubComponent data={data} />

            <h2 className="text-2xl">
              Bestimme den Ergebnisraum beim Einmaligen Drehen des Glücksrads
              und die Wahrscheinlichkeit für das Ereignis:
            </h2>
            <br />
            <br />
            <h2 className="text-2xl">
              {data.event === 1
                ? 'Beim zweimaligen Drehen erscheint keine ' +
                  data.number_2 +
                  '.'
                : null}
              {data.event === 2
                ? 'Es erscheint zwei mal hintereinander eine ' +
                  data.number_3 +
                  '.'
                : null}
              {data.event === 3
                ? 'Beim zweimaligen Drehen erscheint mindestens eine ' +
                  data.number_1 +
                  '.'
                : null}
              {data.event === 4
                ? 'Beim zweimaligen Drehen erscheint genau eine ' +
                  data.number_1 +
                  '.'
                : null}
            </h2>
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

        const counter_Number_1 = array.filter((x) => x === data.number_1).length
        const counter_Number_2 = array.filter((x) => x === data.number_2).length
        const counter_Number_3 = array.filter((x) => x === data.number_3).length
        return (
          <>
            Die Ergebnisemenge beim einmaligen Drehen des Glücksrads lautet:
            <br />{' '}
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              Ω = {'{'} {array.includes(1) ? '1' : null}
              {array.includes(1) && array.includes(2) ? ', 2' : null}
              {!array.includes(1) && array.includes(2) ? '2' : null}
              {(array.includes(1) || array.includes(2)) && array.includes(3)
                ? ', 3'
                : null}
              {!array.includes(1) && !array.includes(2) && array.includes(3)
                ? '3'
                : null}
              {(array.includes(1) || array.includes(2) || array.includes(3)) &&
              array.includes(4)
                ? ', 4'
                : null}
              {!array.includes(1) &&
              !array.includes(2) &&
              !array.includes(3) &&
              array.includes(4)
                ? '4'
                : null}
              {(array.includes(1) ||
                array.includes(2) ||
                array.includes(3) ||
                array.includes(4)) &&
              array.includes(5)
                ? ', 5'
                : null}
              {!array.includes(1) &&
              !array.includes(2) &&
              !array.includes(3) &&
              !array.includes(4) &&
              array.includes(5)
                ? '5'
                : null}{' '}
              {'}'}
            </span>
            <br />
            <br />
            Wir betrachten das Ereignis: &quot;
            {data.event === 1
              ? 'Beim zweimaligen Drehen erscheint keine ' + data.number_2 + '.'
              : null}
            {data.event === 2
              ? 'Es erscheint zwei mal hintereinander eine ' +
                data.number_3 +
                '.'
              : null}
            {data.event === 3
              ? 'Beim zweimaligen Drehen erscheint mindestens eine ' +
                data.number_1 +
                '.'
              : null}
            {data.event === 4
              ? 'Beim zweimaligen Drehen erscheint genau eine ' +
                data.number_1 +
                '.'
              : null}
            &quot;
            <br />
            <br />
            Wir berechnen die Wahrscheinlichkeit für einen Dreh mit der Formel
            für das Laplace-Experiment:
            <br />
            <span className="mt-5 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              P({data.event === 1 ? 'keine ' + data.number_2 : null}
              {data.event === 2 ? 'eine ' + data.number_3 : null}
              {data.event === 3 ? 'eine ' + data.number_1 : null}
              {data.event === 4 ? 'eine ' + data.number_2 : null}) ={' '}
              {buildFrac(
                <>Anzahl der Ereignisse &quot;keine {data.number_2}&quot;</>,
                <>Anzahl aller Ereignisse</>
              )}
            </span>
            <br />
            <br />
            Wir zählen nach und setzen ein:
            <br />
            <span className="mt-5 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              P({data.event === 1 ? 'keine ' + data.number_2 : null}
              {data.event === 2 ? 'eine ' + data.number_3 : null}
              {data.event === 3 ? 'eine ' + data.number_1 : null}
              {data.event === 4 ? 'eine ' + data.number_2 : null}) ={' '}
              {buildFrac(
                <>{data.sections - counter_Number_2}</>,
                <>{data.sections}</>
              )}
            </span>
            <br />
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({}) => {
        return <></>
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
