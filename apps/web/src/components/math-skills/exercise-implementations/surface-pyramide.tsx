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
}

export function SurfacePyramide() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const factor = randomItemFromArray([0.5, 1])
        const ab = randomIntBetween(1, 10) * 2
        const me = randomIntBetween(2, 15)
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
            <h2 className="text-2xl">
              Das ist die vierseitige Pyramide{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">ABCDE</b>.
            </h2>
            <SubComponent data={data} />
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <ol>
              <li className="text-2xl">
                1. Berechne das Volumen der Pyramide{' '}
                <b className="rounded-md bg-newgreen bg-opacity-20 p-1">
                  ABCDE
                </b>
                und runde auf 2 Stellen nach dem Komma.
              </li>
              <li className="mt-12 text-2xl">
                2. Berechne den Oberflächeninhalt der <br /> Pyramide{' '}
                <b className="rounded-md bg-newgreen bg-opacity-20 p-1">
                  ABCDE
                </b>
                und runde auf 2 Stellen nach dem Komma.
              </li>
            </ol>
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
            <strong>Teilaufgabe 1</strong>
            <br />
            Allgemeine Gleichung für das Volumen von Pyramiden: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              V = {buildFrac(<>1</>, <>3</>)} · G · h
            </span>
            <br /> Dabei ist <strong>G</strong> die Grundfläche und{' '}
            <strong>h</strong> die Höhe der Pyramide. Die Grundfläche besteht
            bei unserer Pyramide aus einem Rechteck: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              G = {data.ab} cm · {data.bd} cm <br />G = {G} cm²
            </span>
            <br />
            Nun können wir alle Werte in die allgemeine Gleichung einsetzen:{' '}
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              V = {buildFrac(<>1</>, <>3</>)} · {data.ab * data.bd} cm² ·{' '}
              {data.me} cm
            </span>
            <br />
            Ergebnis: <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              V = {V.toLocaleString('de-DE')} cm³
            </span>
            <br />
            <br />
            <br />
            <strong>Teilaufgabe 2</strong>
            <br />
            Allgemeine Gleichung für den Flächeninhalt von Pyramiden: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              A = G + M
            </span>{' '}
            <br />
            Dabei ist <strong>G</strong> die Grundfläche der Pyramide, die wir
            schon in Teilaufgabe 1 bestimmt haben und <strong>M</strong> der
            Flächeninhalt aller Mantelflächen (Dreiecksflächen). <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              G = {data.ab * data.bd} cm² <br />
            </span>{' '}
            <br />
            Die Mantelfläche der Pyramide besteht aus vier Dreiecken. Dabei sind
            die gegenüberliegenden Dreieicke gleich groß.
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              M = 2 · M<sub>a</sub> + 2 · M<sub>b</sub> <br />M<sub>a</sub> ={' '}
              {buildFrac(<>1</>, <>2</>)} · a · h<sub>a</sub> <br />M
              <sub>b</sub> = {buildFrac(<>1</>, <>2</>)} · b · h<sub>b</sub>{' '}
              <br />
            </span>{' '}
            <br />
            Du hast h<sub>a</sub> und h<sub>b</sub> nicht gegeben. Deshalb musst
            du als nächstes Die Dreieckshöhen berechnen: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>a</sub> = √
              <span className="pl-1 overline">(a/2)² + h² </span>
            </span>{' '}
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>a</sub> = √
              <span className="pl-1 overline">
                ({data.ab} cm/2)² + {data.me} cm²{' '}
              </span>
            </span>{' '}
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>a</sub> = {ha.toLocaleString('de-DE')} cm
            </span>{' '}
            <br /> <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>b</sub> = √
              <span className="pl-1 overline">(b/2)² + h² </span>
            </span>{' '}
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>b</sub> = √
              <span className="pl-1 overline">
                ({data.bd} cm/2)² + {data.me} cm²{' '}
              </span>
            </span>{' '}
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>b</sub> = {hb.toLocaleString('de-DE')} cm
            </span>{' '}
            <br /> <br />
            Nun kannst du h<sub>a</sub> und h<sub>b</sub> in die
            Mantelflächenformel einsetzen: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              M<sub>a</sub> = {buildFrac(<>1</>, <>2</>)} · {data.ab} cm ·{' '}
              {ha.toLocaleString('de-DE')} cm <br />M<sub>a</sub> ={' '}
              {Ma.toLocaleString('de-DE')} cm²
              <br />M<sub>b</sub> = {buildFrac(<>1</>, <>2</>)} · {data.bd} cm ·
              {hb.toLocaleString('de-DE')} cm <br />M<sub>b</sub> ={' '}
              {Mb.toLocaleString('de-DE')} cm² <br /> <br />M = 2 ·{' '}
              {Ma.toLocaleString('de-DE')} cm² + 2 ·{' '}
              {Mb.toLocaleString('de-DE')} cm²
              <br />M = {M.toLocaleString('de-DE')} cm² <br /> <br />
              A = G + M <br />A = {G.toLocaleString('de-DE')} cm² +{' '}
              {M.toLocaleString('de-DE')} cm²
            </span>{' '}
            <br /> <br />
            Ergebnis: <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              A = {(G + M).toLocaleString('de-DE')} cm²
            </span>
          </>
        )
      }}
      centAmount={35}
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
