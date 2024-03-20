/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { pi } from 'mathjs'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

interface BodyData {
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
        const me = randomIntBetween(6, 14)
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
        const w = randomItemFromArray([45])
        const data: BodyData = {
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
            {data.koerper === 'pyra' ? <ComponentPyra data={data} /> : null}
            {data.koerper === 'quader' ? <ComponentQuader data={data} /> : null}
            {data.koerper === 'prisma3' ? (
              <ComponentPrisma data={data} />
            ) : null}
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
        return (
          <>
            Das Schrägbild sollte so aussehen:
            <br />
            {data.koerper === 'pyra' ? <SolPyra data={data} /> : null}
            {data.koerper === 'quader' ? <SolQuader data={data} /> : null}
            {data.koerper === 'prisma3' ? <SolPrisma data={data} /> : null}
            {data.koerper === 'pyra3' ? <SolPyraDrei data={data} /> : null}
            <br />
            <br />
            <i>
              Diese Grafik kann kleiner erscheinen, als sie auf dem Papier ist.
            </i>
          </>
        )
      }}
      renderHint={({ data }) => {
        if (data.koerper === 'pyra')
          return (
            <>
              Beginne damit, die Strecke <span className="overline">AB</span>{' '}
              auf die Schrägbildachse zu zeichnen.
              <br />
              Im Winkel{' '}
              <span className="text-12xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {data.w}°
              </span>{' '}
              und dem Maßstab{' '}
              <span className="text-12xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {buildFrac(<>1</>, <>2</>)}{' '}
              </span>{' '}
              werden die Strecken <span className="overline">AD</span> und{' '}
              <span className="overline">BC</span> gezeichnet.
              <br />
              <br />
              Zeichne den Punkt E in der richtigen Höhe über dem Mittelpunkt der
              Grundfläche ein.
              <br />
              <br />
              Verbinde die Punkte zu einer Pyramide.
            </>
          )
        if (data.koerper === 'pyra3')
          return (
            <>
              Beginne damit, die Strecke <span className="overline">AB</span>{' '}
              auf die Schrägbildachse zu zeichnen.
              <br />
              Im Winkel{' '}
              <span className="text-12xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {data.w}°
              </span>{' '}
              und dem Maßstab{' '}
              <span className="text-12xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {buildFrac(<>1</>, <>2</>)}{' '}
              </span>{' '}
              wird die Strecke <span className="overline">AC</span> gezeichnet.
              <br />
              <br />
              Zeichne den Punkt E in der richtigen Höhe über dem Mittelpunkt der
              Grundfläche ein. Der Mittelpunkt der Grundfläche liegt auf der
              Höhe h<sub>c</sub> und teilt diese im Verhältnis 1:2.
              <br />
              <br />
              Verbinde die Punkte zu einer Dreieckspyramide.
            </>
          )
        if (data.koerper === 'quader')
          return (
            <>
              Beginne damit, die Strecke <span className="overline">AB</span>{' '}
              auf die Schrägbildachse zu zeichnen.
              <br />
              Im Winkel{' '}
              <span className="text-12xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {data.w}°
              </span>{' '}
              und dem Maßstab{' '}
              <span className="text-12xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {buildFrac(<>1</>, <>2</>)}{' '}
              </span>{' '}
              werden die Strecken <span className="overline">AD</span> und{' '}
              <span className="overline">BC</span> gezeichnet.
              <br />
              <br />
              Zeichne die Punkte E,F,G und H in der richtigen Höhe über der
              Grundfläche.
              <br />
              <br />
              Verbinde die Punkte zu einem Quader.
            </>
          )
        if (data.koerper === 'prisma3')
          return (
            <>
              Beginne damit, die Strecke <span className="overline">AB</span>{' '}
              auf die Schrägbildachse zu zeichnen.
              <br />
              Im Winkel{' '}
              <span className="text-12xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {data.w}°
              </span>{' '}
              und dem Maßstab{' '}
              <span className="text-12xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {buildFrac(<>1</>, <>2</>)}{' '}
              </span>{' '}
              wird die Strecke <span className="overline">AC</span> gezeichnet.
              <br />
              <br />
              Zeichne die Punkte D,E und F in der richtigen Höhe über der
              Grundfläche.
              <br />
              <br />
              Verbinde die Punkte zu einem Prisma.
            </>
          )
        return <></>
      }}
      centAmount={52}
    />
  )
}

function ComponentPyra({ data }: { data: BodyData }) {
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
      color: 'yellow',
    })

    const poly2 = b.create('polygon', [pointA, pointB, pointD, pointC], {
      name: 'Polygon 2',
      withLabel: false,
      color: 'blue',
    })

    const poly3 = b.create('polygon', [pointB, pointD, pointE], {
      name: 'Polygon 3',
      withLabel: false,
    })

    const poly4 = b.create('polygon', [pointA, pointC, pointE], {
      name: 'Polygon 4',
      withLabel: false,
    })
    const poly5 = b.create('polygon', [pointC, pointD, pointE], {
      name: 'Polygon 5',
      withLabel: false,
    })

    const poly6 = b.create('polygon', [pointM, pointE], {
      name: 'Polygon 6',
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
function ComponentQuader({ data }: { data: BodyData }) {
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
      color: 'yellow',
    })

    const poly2 = b.create('polygon', [pointA, pointB, pointC, pointD], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'blue',
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
      color: 'blue',
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
function ComponentPrisma({ data }: { data: BodyData }) {
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
function ComponentPyraDrei({ data }: { data: BodyData }) {
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
function SolPyra({ data }: { data: BodyData }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [board2, setBoard2] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)
  useEffect(() => {
    const x = JXG.JSXGraph.initBoard('jxgbox2', {
      boundingbox: [-1, 18, 18, -1],
      showNavigation: false,
      showCopyright: false,
    })
    const pointA = x.create('point', [0, 0], { name: 'A', fixed: true })
    const pointB = x.create('point', [data.ab, 0], { name: 'B', fixed: true })
    const pointC = x.create(
      'point',
      [
        data.ab + Math.cos((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
        Math.sin((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
      ],
      {
        name: 'C',
        fixed: true,
      }
    )
    const pointD = x.create(
      'point',
      [
        Math.cos((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
        Math.sin((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
      ],
      {
        name: 'D',
        fixed: true,
      }
    )
    const poly1 = x.create('polygon', [pointA, pointB, pointC, pointD], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'blue',
    })
    const pointM = x.create(
      'point',
      [
        data.ab * 0.5 + Math.cos((data.w / 360) * 2 * Math.PI) * data.bd * 0.25,
        Math.sin((data.w / 360) * 2 * Math.PI) * data.bd * 0.25,
      ],
      { name: '', fixed: true }
    )
    const pointE = x.create(
      'point',
      [
        data.ab * 0.5 + Math.cos((data.w / 360) * 2 * Math.PI) * data.bd * 0.25,
        Math.sin((data.w / 360) * 2 * Math.PI) * data.bd * 0.25 + data.me,
      ],
      { name: 'E', fixed: true }
    )
    const poly2 = x.create('polygon', [pointA, pointB, pointE], {
      name: 'Polygon 2',
      withLabel: false,
      color: 'yellow',
    })
    const poly3 = x.create('polygon', [pointB, pointC, pointE], {
      name: 'Polygon 3',
      withLabel: false,
      color: 'yellow',
    })
    const poly4 = x.create('polygon', [pointD, pointC, pointE], {
      name: 'Polygon 4',
      withLabel: false,
      color: 'yellow',
    })
    const poly5 = x.create('polygon', [pointA, pointD, pointE], {
      name: 'Polygon 5',
      withLabel: false,
      color: 'yellow',
    })
    const poly6 = x.create('polygon', [pointM, pointE], {
      name: 'Polygon 6',
      withLabel: false,
    })

    setBoard2(x)

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <div
        id="jxgbox2"
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
function SolQuader({ data }: { data: BodyData }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [board2, setBoard2] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)
  useEffect(() => {
    const x = JXG.JSXGraph.initBoard('jxgbox2', {
      boundingbox: [-1, 18, 18, -1],
      showNavigation: false,
      showCopyright: false,
    })
    const pointA = x.create('point', [0, 0], { name: 'A', fixed: true })
    const pointB = x.create('point', [data.ab, 0], { name: 'B', fixed: true })
    const pointC = x.create(
      'point',
      [
        data.ab + Math.cos((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
        Math.sin((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
      ],
      {
        name: 'C',
        fixed: true,
      }
    )
    const pointD = x.create(
      'point',
      [
        Math.cos((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
        Math.sin((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
      ],
      {
        name: 'D',
        fixed: true,
      }
    )
    const poly1 = x.create('polygon', [pointA, pointB, pointC, pointD], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'blue',
    })

    const pointE = x.create('point', [0, data.me], { name: 'E', fixed: true })
    const pointF = x.create('point', [data.ab, data.me], {
      name: 'F',
      fixed: true,
    })
    const pointG = x.create(
      'point',
      [
        data.ab + Math.cos((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
        data.me + Math.sin((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
      ],
      {
        name: 'G',
        fixed: true,
      }
    )
    const pointH = x.create(
      'point',
      [
        Math.cos((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
        Math.sin((data.w / 360) * 2 * Math.PI) * data.bd * 0.5 + data.me,
      ],
      {
        name: 'H',
        fixed: true,
      }
    )
    const poly2 = x.create('polygon', [pointA, pointB, pointF, pointE], {
      name: 'Polygon 2',
      withLabel: false,
      color: 'yellow',
    })
    const poly3 = x.create('polygon', [pointB, pointC, pointG, pointF], {
      name: 'Polygon 3',
      withLabel: false,
      color: 'yellow',
    })
    const poly4 = x.create('polygon', [pointE, pointF, pointG, pointH], {
      name: 'Polygon 4',
      withLabel: false,
      color: 'blue',
    })

    const poly5 = x.create('polygon', [pointA, pointD, pointH, pointE], {
      name: 'Polygon 5',
      withLabel: false,
      color: 'yellow',
    })
    const poly6 = x.create('polygon', [pointD, pointC, pointG, pointH], {
      name: 'Polygon 6',
      withLabel: false,
      color: 'yellow',
    })

    setBoard2(x)

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <div
        id="jxgbox2"
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
function SolPrisma({ data }: { data: BodyData }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [board2, setBoard2] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)
  useEffect(() => {
    const x = JXG.JSXGraph.initBoard('jxgbox2', {
      boundingbox: [-1, 18, 18, -1],
      showNavigation: false,
      showCopyright: false,
    })
    const pointA = x.create('point', [0, 0], { name: 'A', fixed: true })
    const pointB = x.create('point', [data.ab, 0], { name: 'B', fixed: true })
    const pointC = x.create(
      'point',
      [
        Math.cos((data.w / 360) * 2 * Math.PI) * data.ac * 0.5,
        Math.sin((data.w / 360) * 2 * Math.PI) * data.ac * 0.5,
      ],
      {
        name: 'C',
        fixed: true,
      }
    )

    const poly1 = x.create('polygon', [pointA, pointB, pointC], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'blue',
    })

    const pointD = x.create('point', [0, data.me], { name: 'D', fixed: true })
    const pointE = x.create('point', [data.ab, data.me], {
      name: 'E',
      fixed: true,
    })
    const pointF = x.create(
      'point',
      [
        Math.cos((data.w / 360) * 2 * Math.PI) * data.ac * 0.5,
        data.me + Math.sin((data.w / 360) * 2 * Math.PI) * data.bd * 0.5,
      ],
      {
        name: 'F',
        fixed: true,
      }
    )

    const poly2 = x.create('polygon', [pointA, pointB, pointE, pointD], {
      name: 'Polygon 2',
      withLabel: false,
      color: 'yellow',
    })
    const poly3 = x.create('polygon', [pointB, pointC, pointF, pointE], {
      name: 'Polygon 3',
      withLabel: false,
      color: 'yellow',
    })
    const poly4 = x.create('polygon', [pointD, pointE, pointF], {
      name: 'Polygon 4',
      withLabel: false,
      color: 'blue',
    })

    setBoard2(x)

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <div
        id="jxgbox2"
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
function SolPyraDrei({ data }: { data: BodyData }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [board2, setBoard2] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)
  useEffect(() => {
    const x = JXG.JSXGraph.initBoard('jxgbox2', {
      boundingbox: [-1, 18, 18, -1],
      showNavigation: false,
      showCopyright: false,
    })
    const pointA = x.create('point', [0, 0], { name: 'A', fixed: true })
    const pointB = x.create('point', [data.ab, 0], { name: 'B', fixed: true })
    const pointC = x.create(
      'point',
      [
        Math.cos((data.w / 360) * 2 * Math.PI) * data.ac * 0.5,
        Math.sin((data.w / 360) * 2 * Math.PI) * data.ac * 0.5,
      ],
      {
        name: 'C',
        fixed: true,
      }
    )

    const poly1 = x.create('polygon', [pointA, pointB, pointC], {
      name: 'Polygon 1',
      withLabel: false,
      color: 'blue',
    })

    const pointD = x.create(
      'point',
      [
        (data.ab + Math.cos((data.w / 360) * 2 * Math.PI) * data.ac * 0.5) / 3,
        data.me + (Math.sin((data.w / 360) * 2 * Math.PI) * data.ac * 0.5) / 3,
      ],
      { name: 'D', fixed: true }
    )

    const poly2 = x.create('polygon', [pointA, pointB, pointD], {
      name: 'Polygon 2',
      withLabel: false,
      color: 'yellow',
    })
    const poly3 = x.create('polygon', [pointA, pointC, pointD], {
      name: 'Polygon 3',
      withLabel: false,
      color: 'yellow',
    })
    const poly4 = x.create('polygon', [pointB, pointC, pointD], {
      name: 'Polygon 4',
      withLabel: false,
      color: 'yellow',
    })

    setBoard2(x)

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <div
        id="jxgbox2"
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
