/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildBigSqrt, buildFrac, buildSqrt } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

interface PyraData {
  ab: number
  me: number
  bd: number
  ac: number
}

export function SurfaceThreePyramide() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const factor = randomItemFromArray([0.5, 1])
        const ab = randomIntBetween(1, 10) * 2
        const me = randomIntBetween(2, 15)
        const bd = randomIntBetween(2, 10)
        const ac = randomIntBetween(2, 10)
        const data: PyraData = {
          ab,
          me,
          bd,
          ac,
        }
        return { data }
      }}
      renderHint={() => {
        return (
          <>
            Die Pyramide-Oberfläche besteht aus <b>3 Dreiecken</b> und der{' '}
            <b>dreieckigen Grundfläche</b>. Berechne diese Flächen zuerst
            separat.
          </>
        )
      }}
      renderTask={({ data }) => {
        return (
          <>
            <h2 className="text-2xl">
              Das ist die vierseitige Pyramide{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">ABCD</b>.
            </h2>
            <SubComponent data={data} />
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <ol>
              <li className="mt-12 text-2xl">
                Berechne den Oberflächeninhalt der Pyramide und runde auf{' '}
                <span className="inline-block">2 Stellen</span> nach dem Komma.
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

        const hc =
          Math.round(
            Math.sqrt(Math.pow(data.ac / 2, 2) + Math.pow(data.me, 2)) * 100
          ) / 100

        const Ma = Math.round(0.5 * data.ab * ha * 100) / 100
        const Mb = Math.round(0.5 * data.bd * hb * 100) / 100
        const Mc = Math.round(0.5 * data.ac * hc * 100) / 100
        const M = Math.round((Ma + Mb + Mc) * 100) / 100
        const G = Math.round(0.5 * data.ab * data.bd * 100) / 100
        const V = Math.round((1 / 3) * G * data.me * 100) / 100

        return (
          <>
            Allgemeine Gleichung für den Flächeninhalt von Pyramiden: <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              A = G + M
            </span>{' '}
            <br />
            Dabei ist <strong>G</strong> die Grundfläche der Pyramide und{' '}
            <strong>M</strong> der Flächeninhalt aller Mantelflächen
            (Dreiecksflächen). <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              G = {buildFrac(<>1</>, <>2</>)} * a * b <br />G =
              {buildFrac(<>1</>, <>2</>)} * {data.ab} * {data.bd} <br />G ={' '}
              {0.5 * data.ab * data.bd} cm² <br />
            </span>{' '}
            <br />
            Die Mantelfläche der Pyramide besteht aus drei unterschiedlichen
            Dreiecken.
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              M = M<sub>a</sub> + M<sub>b</sub> + M<sub>c</sub> <br />M
              <sub>a</sub> = {buildFrac(<>1</>, <>2</>)} · a · h<sub>a</sub>{' '}
              <br />M<sub>b</sub> = {buildFrac(<>1</>, <>2</>)} · b · h
              <sub>b</sub> <br />M<sub>c</sub> = {buildFrac(<>1</>, <>2</>)} · c
              · h<sub>c</sub>{' '}
            </span>{' '}
            <br />
            Du hast h<sub>a</sub>, h<sub>b</sub> und h<sub>c</sub> nicht
            gegeben. Deshalb musst du als nächstes die Dreieckshöhen berechnen:{' '}
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>a</sub> ={' '}
              {buildBigSqrt(
                <>
                  <span className="inline-block scale-y-[3]">(</span>{' '}
                  {buildFrac(<>a</>, <>2</>)}{' '}
                  <span className="inline-block scale-y-[3]">)</span>² + h²
                </>
              )}{' '}
            </span>{' '}
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>a</sub> ={' '}
              {buildBigSqrt(
                <>
                  <span className="inline-block scale-y-[3]">(</span>{' '}
                  {buildFrac(<>{data.ab} cm</>, <>2</>)}{' '}
                  <span className="inline-block scale-y-[3]">)</span>² + (
                  {data.me} cm)²
                </>
              )}{' '}
            </span>{' '}
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>a</sub> = {ha.toLocaleString('de-DE')} cm
            </span>{' '}
            <br /> <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>b</sub> ={' '}
              {buildBigSqrt(
                <>
                  <span className="inline-block scale-y-[3]">(</span>{' '}
                  {buildFrac(<>b</>, <>2</>)}{' '}
                  <span className="inline-block scale-y-[3]">)</span>² + h²
                </>
              )}{' '}
            </span>{' '}
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>b</sub> ={' '}
              {buildBigSqrt(
                <>
                  <span className="inline-block scale-y-[3]">(</span>{' '}
                  {buildFrac(<>{data.bd} cm</>, <>2</>)}{' '}
                  <span className="inline-block scale-y-[3]">)</span>² + (
                  {data.me} cm)²
                </>
              )}{' '}
            </span>{' '}
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>b</sub> = {hb.toLocaleString('de-DE')} cm
            </span>{' '}
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>c</sub> ={' '}
              {buildBigSqrt(
                <>
                  <span className="inline-block scale-y-[3]">(</span>{' '}
                  {buildFrac(<>c</>, <>2</>)}{' '}
                  <span className="inline-block scale-y-[3]">)</span>² + h²
                </>
              )}{' '}
            </span>{' '}
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>c</sub> ={' '}
              {buildBigSqrt(
                <>
                  <span className="inline-block scale-y-[3]">(</span>{' '}
                  {buildFrac(<>{data.ac} cm</>, <>2</>)}{' '}
                  <span className="inline-block scale-y-[3]">)</span>² + (
                  {data.me} cm)²
                </>
              )}{' '}
            </span>{' '}
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              h<sub>c</sub> = {hc.toLocaleString('de-DE')} cm
            </span>{' '}
            <br /> <br />
            Nun kannst du h<sub>a</sub>, h<sub>b</sub> und h<sub>c</sub> in die
            Mantelflächenformel einsetzen: <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              M<sub>a</sub> = {buildFrac(<>1</>, <>2</>)} · {data.ab} cm ·{' '}
              {ha.toLocaleString('de-DE')} cm <br />M<sub>a</sub> ={' '}
              {Ma.toLocaleString('de-DE')} cm²
              <br />M<sub>b</sub> = {buildFrac(<>1</>, <>2</>)} · {data.bd} cm ·
              {hb.toLocaleString('de-DE')} cm <br />M<sub>b</sub> ={' '}
              {Mb.toLocaleString('de-DE')} cm² <br />M<sub>c</sub> ={' '}
              {buildFrac(<>1</>, <>2</>)} · {data.ac} cm ·
              {hc.toLocaleString('de-DE')} cm <br />M<sub>c</sub> ={' '}
              {Mc.toLocaleString('de-DE')} cm² <br />
              <br />M = {Ma.toLocaleString('de-DE')} cm² +{' '}
              {Mb.toLocaleString('de-DE')} cm² + {Mc.toLocaleString('de-DE')}{' '}
              cm²
              <br />M = {M.toLocaleString('de-DE')} cm² <br /> <br />
              A = G + M <br />A = {G.toLocaleString('de-DE')} cm² +{' '}
              {M.toLocaleString('de-DE')} cm²
            </span>{' '}
            <br /> <br />
            <strong>Ergebnis:</strong>
            <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              A = {(G + M).toLocaleString('de-DE')} cm²
            </span>
          </>
        )
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
    const pointB = b.create('point', [6, 0], { name: 'B', fixed: true })
    const pointC = b.create('point', [3.5, 1], { name: 'C', fixed: true })

    const pointM = b.create('point', [3, 0.5], {
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

    const poly2 = b.create('polygon', [pointA, pointC, pointE], {
      name: 'Polygon 1',
      withLabel: false,
    })

    const poly4 = b.create('polygon', [pointB, pointC, pointE], {
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
    b.create('text', [5.2, 1.25, `${data.bd} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })
    b.create('text', [1.2, 1.25, `${data.ac} cm`], {
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
