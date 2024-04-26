/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { MainTask } from '../components/content-components'
import { autoResizeBoundingBox } from '../utils/auto-resize-bounding-box'
import { buildFrac, buildOverline } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'

// JXG.Options.label.autoPosition = true

interface PyraData {
  ab: number
  me: number
  bd: number
}

export function VolumePyramide() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const ab = randomIntBetween(1, 10) * 2
        const me = randomIntBetween(ab / 2, 15)
        const bd = randomIntBetween(2, 10)
        const data: PyraData = {
          ab,
          me,
          bd,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <MainTask>
              Das Rechteck ABCD ist die Grundfläche der vierseitigen Pyramide{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">ABCDE</b>{' '}
              mit der Höhe {buildOverline('EM')}.
            </MainTask>
            <p className="serlo-main-task">
              Es gilt: |{buildOverline('AB')}| = {data.ab} cm; |
              {buildOverline('BC')}| = {data.bd} cm; |{buildOverline('EM')}| ={' '}
              {data.me} cm
            </p>
            <SubComponent data={data} />
            <p className="serlo-main-task">
              Berechnen Sie das Volumen der Pyramide{' '}
              <b className="rounded-md bg-newgreen bg-opacity-20 p-1">ABCDE</b>.
            </p>
            <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
          </>
        )
      }}
      renderSolution={({ data }) => {
        const ha =
          Math.round(
            Math.sqrt(Math.pow(data.ab / 2, 2) + Math.pow(data.me, 2)) * 100
          ) / 100
        const hb =
          Math.round(
            Math.sqrt(Math.pow(data.bd / 2, 2) + Math.pow(data.me, 2)) * 100
          ) / 100

        const Ma = Math.round(0.5 * data.ab * ha * 100) / 100
        const Mb = Math.round(0.5 * data.bd * hb * 100) / 100
        const M = Math.round((2 * Ma + 2 * Mb) * 100) / 100
        const G = Math.round(data.ab * data.bd * 100) / 100
        const V = Math.round((1 / 3) * G * data.me * 100) / 100

        return (
          <>
            Allgemeine Gleichung für das Volumen von Pyramiden: <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              V = {buildFrac(<>1</>, <>3</>)} · G · h
            </span>
            <br /> Dabei ist <strong>G</strong> die Grundfläche und{' '}
            <strong>h</strong> die Höhe der Pyramide. Die Grundfläche besteht
            bei unserer Pyramide aus einem Rechteck: <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              G = {data.ab} cm · {data.bd} cm <br />G = {G} cm²
            </span>
            <br />
            Nun können wir alle Werte in die allgemeine Gleichung einsetzen:{' '}
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              V = {buildFrac(<>1</>, <>3</>)} · {data.ab * data.bd} cm² ·{' '}
              {data.me} cm
            </span>
            <br />
            Ergebnis: <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              V = {V.toLocaleString('de-DE')} cm³
            </span>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({}) => {
        return (
          <>
            Verwende die Formel für das Volumen einer Pyramide:
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              V = {buildFrac(<>1</>, <>3</>)} · G · h
            </span>
            <br />
            Bestimme dazu den Inhalt der rechteckigen Grundfläche{' '}
            <strong>G</strong>.
          </>
        )
      }}
    />
  )
}

function SubComponent({ data }: { data: PyraData }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const A_x = 0
    const A_y = 0
    const B_x = data.ab
    const B_y = 0

    const f = Math.sqrt(0.5) / 2

    const D_x = f * data.bd
    const D_y = f * data.bd

    const C_x = D_x + data.ab
    const C_y = D_y

    const M_x = (A_x + C_x) / 2
    const M_y = (A_y + C_y) / 2

    const E_x = M_x
    const E_y = M_y + data.me

    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: autoResizeBoundingBox([
        [A_x, A_y],
        [B_x, B_y],
        [C_x, C_y],
        [D_x, D_y],
        [M_x, M_y],
        [E_x, E_y],
      ]),
      showNavigation: false,
      showCopyright: false,
    })

    const pointA = b.create('point', [A_x, A_y], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointB = b.create('point', [B_x, B_y], { name: 'B', fixed: true })
    const pointC = b.create('point', [D_x, D_y], { name: 'D', fixed: true })
    const pointD = b.create('point', [C_x, C_y], { name: 'C', fixed: true })
    const pointM = b.create('point', [M_x, M_y], {
      name: 'M',
      fixed: true,
    })
    const pointE = b.create('point', [E_x, E_y], {
      name: 'E',
      fixed: true,
    })

    const poly1 = b.create('polygon', [pointA, pointB, pointE], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'blue',
    })

    const poly2 = b.create('polygon', [pointA, pointB, pointD, pointC], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'orange',
    })

    const poly3 = b.create('polygon', [pointB, pointD, pointE], {
      name: 'Polygon 1',
      withLabel: false,
    })

    const poly4 = b.create('polygon', [pointA, pointC, pointE], {
      name: 'Polygon 1',
      withLabel: false,
    })
    const poly5 = b.create('polygon', [pointC, pointD, pointE], {
      name: 'Polygon 1',
      withLabel: false,
    })

    const poly6 = b.create('polygon', [pointM, pointE], {
      name: 'Polygon 1',
      withLabel: false,
    })

    /*b.create('text', [2, 0, `${data.ab} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })
    b.create('text', [6.2, 0.4, `${data.bd} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [2.6, 2, `${data.me} cm`], {})*/
    setBoard(b)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
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
