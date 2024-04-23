import { useState, useEffect } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { autoResizeBoundingBox } from '../utils/auto-resize-bounding-box'
import { JSXGraphWrapper } from '../utils/jsx-graph-wrapper'
import { buildFrac, buildOverline } from '../utils/math-builder'
import { rotatePoint } from '../utils/rotate-point'
import { roundToDigits } from '../utils/round-to-digits'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'
import { shuffleArray } from '@/helper/shuffle-array'

interface DATA {
  p1: string
  p2: string
  p3: string
  angle: number
  len: number
  len2: number
}

export function TriangleArea() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const [p1, p2, p3] = shuffleArray(
          randomItemFromArray(['ABC', 'DEF', 'STU', 'KLM']).split('')
        )

        let angle = randomItemFromArray([90, -1, -2])

        if (angle === -1) {
          angle = randomIntBetween(25, 89)
        }
        if (angle === -2) {
          angle = randomIntBetween(91, 122)
        }

        const angle2 = randomIntBetween(19, Math.round((180 - angle) / 2))

        const len = randomIntBetween(11, 65) / 10

        const angle3 = 180 - angle - angle2
        const len2 = roundToDigits(
          (len / Math.sin((angle3 / 180) * Math.PI)) *
            Math.sin((angle2 / 180) * Math.PI),
          1
        )

        return { p1, p2, p3, angle, len, len2 }
      }}
      renderTask={(data) => {
        return (
          <>
            <p className="serlo-main-task">
              Gegeben sei das Dreieck {data.p1}
              {data.p2}
              {data.p3}.
            </p>
            <p className="serlo-main-task">
              Es gilt: |{buildOverline(data.p2 + data.p3)}| ={' '}
              {data.len.toLocaleString('de-De')} cm, |
              {buildOverline(data.p2 + data.p1)}| ={' '}
              {data.len2.toLocaleString('de-De')} cm und ∢{data.p3}
              {data.p2}
              {data.p1} = {data.angle}°.
            </p>
            <SubComponent data={data} />
            <p className="serlo-main-task">
              Berechnen Sie den Flächeninhalt des Dreiecks ABC. Runden Sie auf
              eine Stelle nach dem Komma.
            </p>
          </>
        )
      }}
      renderSolution={(data) => {
        if (data.angle === 90) {
          return (
            <>
              <p>
                Das Dreieck ist rechtwinklig, verwende die Formel{' '}
                {buildFrac(1, 2)} · g · h:
              </p>
              <p className="serlo-highlight-gray">
                A
                <sub>
                  {data.p1}
                  {data.p2}
                  {data.p3}
                </sub>{' '}
                = {buildFrac(1, 2)} · |{buildOverline(data.p2 + data.p3)}| · |
                {buildOverline(data.p2 + data.p1)}|
              </p>
              <p>Setze gegebene Größen ein:</p>
              <p className="serlo-highlight-gray">
                A
                <sub>
                  {data.p1}
                  {data.p2}
                  {data.p3}
                </sub>{' '}
                = {buildFrac(1, 2)} · {data.len.toLocaleString('de-De')} ·{' '}
                {data.len2.toLocaleString('de-De')}
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-gray">
                A
                <sub>
                  {data.p1}
                  {data.p2}
                  {data.p3}
                </sub>{' '}
                ={' '}
                {roundToDigits((data.len * data.len2) / 2, 1).toLocaleString(
                  'de-De'
                )}{' '}
                cm²
              </p>
            </>
          )
        }
        return (
          <>
            <p>Nutze die Flächenformel mit Sinus:</p>
            <p className="serlo-highlight-gray">
              A
              <sub>
                {data.p1}
                {data.p2}
                {data.p3}
              </sub>{' '}
              = {buildFrac(1, 2)} · |{buildOverline(data.p2 + data.p3)}| · |
              {buildOverline(data.p2 + data.p1)}| · sin ∢{data.p3}
              {data.p2}
              {data.p1}
            </p>
            <p>Setze gegebene Werte ein:</p>
            <p className="serlo-highlight-gray">
              A
              <sub>
                {data.p1}
                {data.p2}
                {data.p3}
              </sub>{' '}
              = {buildFrac(1, 2)} · {data.len.toLocaleString('de-De')} ·{' '}
              {data.len2.toLocaleString('de-De')} · sin {data.angle}°
            </p>
            <p>Berechne das Ergebnis:</p>
            <p className="serlo-highlight-gray">
              A
              <sub>
                {data.p1}
                {data.p2}
                {data.p3}
              </sub>{' '}
              ={' '}
              {roundToDigits(
                (data.len *
                  data.len2 *
                  Math.sin((data.angle / 180) * Math.PI)) /
                  2,
                1
              ).toLocaleString('de-De')}{' '}
              cm²
            </p>
          </>
        )
      }}
    />
  )
}

function SubComponent({ data }: { data: DATA }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  const randomAngle = randomIntBetween(0, 359)

  const [p1_x, p1_y] = rotatePoint(data.len2, 0, -data.angle + randomAngle)
  const [p3_x, p3_y] = rotatePoint(data.len, 0, randomAngle)

  const boundingbox = autoResizeBoundingBox([
    { x: p1_x, y: p1_y },
    { x: 0, y: 0 },
    { x: p3_x, y: p3_y },
  ])

  const dim = boundingbox[2] - boundingbox[0]

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox,
      showNavigation: false,
      showCopyright: false,
    })

    const pointA = b.create('point', [p1_x, p1_y], {
      name: data.p1,
      fixed: true,
    })

    const pointB = b.create('point', [0, 0], {
      name: data.p2,
      fixed: true,
    })

    const pointC = b.create('point', [p3_x, p3_y], {
      name: data.p3,
      fixed: true,
    })

    // const newgreen = 'rgb(47 206 177)'

    b.create('segment', [pointA, pointB], {})
    b.create('segment', [pointA, pointC], {})
    b.create('segment', [pointC, pointB], {})

    b.create('angle', [pointC, pointB, pointA], {
      radius: (data.angle === 90 ? 0.05 : 0.1) * dim,
      withLabel: false,
    })

    setBoard(b)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <JSXGraphWrapper id="jxgbox" width={300} height={300} />
}
