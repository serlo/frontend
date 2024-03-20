/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

interface PyraData {
  ab: number
  me: number
  bd: number
  koerper: string
  w: number
  ac: number
  cd: number
}

export function ObliqueImage() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const factor = randomItemFromArray([0.5, 1])
        const me = randomIntBetween(6, 12)
        const ab = randomIntBetween(8, 12)
        const bd = randomIntBetween(6, 10)
        const ac = randomIntBetween(7, 10)
        const cd = randomIntBetween(7, 10)
        const koerper = randomItemFromArray([
          'pyra',
          'quader',
          'prisma3',
          'pyra3',
        ])
        const w = randomItemFromArray([30, 45, 60])
        const data: PyraData = {
          ab,
          me,
          bd,
          koerper,
          w,
          ac,
          cd,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <h2 className="text-2xl">
              Das ist {data.koerper === 'pyra' ? 'die Pyramide ABCDE.' : null}
              {data.koerper === 'quader' ? 'der Quader ABCDEFGH.' : null}
              {data.koerper === 'prisma3' ? 'der Prisma ABCDEF.' : null}
              {data.koerper === 'pyra3' ? 'die Dreieckspyramide ABCD.' : null}
            </h2>
            {data.koerper === 'pyra' ? <SubComponent data={data} /> : null}
            {data.koerper === 'quader' ? <ComponentQ data={data} /> : null}
            {data.koerper === 'prisma3' ? <ComponentP data={data} /> : null}
            {data.koerper === 'pyra3' ? (
              <ComponentPyraDrei data={data} />
            ) : null}
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <ol>
              <li className="text-2xl">
                Zeiche das Schrägbild des Körpers mit dem Maßstab q ={' '}
                {buildFrac(<>1</>, <>2</>)} und dem Winkel ω = {data.w}°.{' '}
              </li>
            </ol>
            <br />
            <ol>
              <li className="text-2xl">
                Die Strecke <span className="overline">AB</span> soll auf der
                Schrägbildachse liegen und der Punkt A soll links von C liegen.
              </li>
            </ol>
          </>
        )
      }}
      renderSolution={({ data }) => {
        return <></>
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({}) => {
        return <></>
      }}
      centAmount={52}
    />
  )
}

function SubComponent({ data }: { data: PyraData }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-1, 6, 7, -2],
      showNavigation: false,
      showCopyright: false,
    })

    const pointA = b.create('point', [0, 0], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointB = b.create('point', [5, 0], { name: 'B', fixed: true })
    const pointC = b.create('point', [1, 0.5], { name: 'D', fixed: true })
    const pointD = b.create('point', [6, 0.5], { name: 'C', fixed: true })
    const pointM = b.create('point', [3, 0.25], {
      name: '',
      fixed: true,
    })
    const pointE = b.create('point', [3, 4], {
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

    b.create('text', [2, 0, `${data.ab} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })
    b.create('text', [6.2, 0.4, `${data.bd} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [2.6, 2, `${data.me} cm`], {})
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
function ComponentQ({ data }: { data: PyraData }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-1, 6, 7, -2],
      showNavigation: false,
      showCopyright: false,
    })

    const pointA = b.create('point', [0, 0], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointB = b.create('point', [5, 0], { name: 'B', fixed: true })
    const pointD = b.create('point', [1, 0.5], { name: 'D', fixed: true })
    const pointC = b.create('point', [6, 0.5], { name: 'C', fixed: true })
    const pointE = b.create('point', [0, 4], { name: 'E', fixed: true })
    const pointF = b.create('point', [5, 4], { name: 'F', fixed: true })
    const pointG = b.create('point', [6, 4.5], { name: 'G', fixed: true })
    const pointH = b.create('point', [1, 4.5], { name: 'H', fixed: true })

    const poly1 = b.create('polygon', [pointA, pointB, pointF, pointE], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'blue',
    })

    const poly2 = b.create('polygon', [pointA, pointB, pointC, pointD], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'orange',
    })

    const poly3 = b.create('polygon', [pointD, pointC, pointG, pointH], {
      name: 'Polygon 1',
      withLabel: false,
    })
    const poly4 = b.create('polygon', [pointA, pointD, pointH, pointE], {
      name: 'Polygon 1',
      withLabel: false,
    })
    const poly5 = b.create('polygon', [pointB, pointC, pointG, pointF], {
      name: 'Polygon 1',
      withLabel: false,
    })
    const poly6 = b.create('polygon', [pointE, pointF, pointG, pointH], {
      name: 'Polygon 1',
      withLabel: false,
    })

    b.create('text', [2, 0, `${data.ab} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })
    b.create('text', [6.2, 0.4, `${data.bd} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [4.5, 2, `${data.me} cm`], {})
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
function ComponentP({ data }: { data: PyraData }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-1, 6, 7, -2],
      showNavigation: false,
      showCopyright: false,
    })

    const pointA = b.create('point', [1, 0], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointB = b.create('point', [5, 0], { name: 'B', fixed: true })
    const pointC = b.create('point', [3.5, 0.5], { name: 'C', fixed: true })
    const pointD = b.create('point', [1, 4], { name: 'D', fixed: true })
    const pointE = b.create('point', [5, 4], { name: 'E', fixed: true })
    const pointF = b.create('point', [3.5, 4.5], { name: 'F', fixed: true })

    const poly1 = b.create('polygon', [pointA, pointC, pointF, pointD], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'yellow',
    })
    const poly2 = b.create('polygon', [pointA, pointB, pointC], {
      name: 'Polygon 2',
      withLabel: false,
      color: 'blue',
    })
    const poly3 = b.create('polygon', [pointA, pointB, pointE, pointD], {
      name: 'Polygon 3',
      withLabel: false,
      color: 'yellow',
    })

    const poly4 = b.create('polygon', [pointB, pointC, pointF, pointE], {
      name: 'Polygon 4',
      withLabel: false,
    })
    const poly5 = b.create('polygon', [pointD, pointE, pointF], {
      name: 'Polygon 5',
      withLabel: false,
      color: 'blue',
    })

    b.create('text', [3.5, 0, `${data.ab} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })
    b.create('text', [2.2, 1, `${data.ac} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })
    b.create('text', [5.2, 1, `${data.bd} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [5.2, 3, `${data.me} cm`], {})
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
function ComponentPyraDrei({ data }: { data: PyraData }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-1, 6, 7, -2],
      showNavigation: false,
      showCopyright: false,
    })

    const pointA = b.create('point', [1, 0], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointB = b.create('point', [5, 0], { name: 'B', fixed: true })
    const pointC = b.create('point', [3.5, 0.5], { name: 'C', fixed: true })
    const pointD = b.create('point', [3.2, 4], { name: 'D', fixed: true })
    const pointM = b.create('point', [3.2, 0.2], { name: '', fixed: true })

    const poly1 = b.create('polygon', [pointA, pointC, pointD], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'yellow',
    })
    const poly2 = b.create('polygon', [pointA, pointB, pointC], {
      name: 'Polygon 2',
      withLabel: false,
      color: 'blue',
    })
    const poly3 = b.create('polygon', [pointA, pointB, pointD], {
      name: 'Polygon 3',
      withLabel: false,
      color: 'yellow',
    })
    const line1 = b.create('line', [pointM, pointD], {
      name: 'Hoehe',
      withLabel: false,
      straightFirst: false,
      straightLast: false,
    })

    b.create('text', [3.5, 0, `${data.ab} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })
    b.create('text', [2.2, 1, `${data.ac} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })
    b.create('text', [5.2, 1, `${data.bd} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [3.5, 2.6, `${data.me} cm`], {})
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
