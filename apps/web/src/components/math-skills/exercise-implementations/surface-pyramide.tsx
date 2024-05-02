/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { MainTask } from '../components/content-components'
import {
  buildBigSqrt,
  buildFrac,
  buildJSX,
  buildSqrt,
} from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

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
      renderHint={() => {
        return (
          <>
            Die Pyramide-Oberfläche besteht aus <b>4 Dreiecken</b> und der{' '}
            <b>Grundfläche</b>. Berechne diese Flächen zuerst separat.
          </>
        )
      }}
      renderTask={({ data }) => {
        return (
          <>
            <p className="serlo-main-task">
              Das ist die vierseitige Pyramide{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">ABCDE</b>.
            </p>
            {renderDiagram(data)}
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

        const Ma = Math.round(0.5 * data.ab * ha * 100) / 100
        const Mb = Math.round(0.5 * data.bd * hb * 100) / 100
        const M = Math.round((2 * Ma + 2 * Mb) * 100) / 100
        const G = Math.round(data.ab * data.bd * 100) / 100
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
              G = a * b <br />G = {data.ab} cm * {data.bd} cm <br />G ={' '}
              {data.ab * data.bd} cm² <br />
            </span>{' '}
            <br />
            Die Mantelfläche der Pyramide besteht aus vier Dreiecken. Dabei sind
            die gegenüberliegenden Dreieicke gleich groß.
            <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              M = 2 · M<sub>a</sub> + 2 · M<sub>b</sub> <br />M<sub>a</sub> ={' '}
              {buildFrac(<>1</>, <>2</>)} · a · h<sub>a</sub> <br />M
              <sub>b</sub> = {buildFrac(<>1</>, <>2</>)} · b · h<sub>b</sub>{' '}
              <br />
            </span>{' '}
            <br />
            Du hast h<sub>a</sub> und h<sub>b</sub> nicht gegeben. Deshalb musst
            du als nächstes die Dreieckshöhen berechnen: <br />
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
              h<sub>a</sub> = {pp(ha)} cm
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
              h<sub>b</sub> = {pp(hb)} cm
            </span>{' '}
            <br /> <br />
            Nun kannst du h<sub>a</sub> und h<sub>b</sub> in die
            Mantelflächenformel einsetzen: <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              M<sub>a</sub> = {buildFrac(<>1</>, <>2</>)} · {data.ab} cm ·{' '}
              {pp(ha)} cm <br />M<sub>a</sub> = {pp(Ma)} cm²
              <br />M<sub>b</sub> = {buildFrac(<>1</>, <>2</>)} · {data.bd} cm ·
              {pp(hb)} cm <br />M<sub>b</sub> = {pp(Mb)} cm² <br /> <br />M = 2
              · {pp(Ma)} cm² + 2 · {pp(Mb)} cm²
              <br />M = {pp(M)} cm² <br /> <br />
              A = G + M <br />A = {pp(G)} cm² + {pp(M)} cm²
            </span>{' '}
            <br /> <br />
            <strong>Ergebnis:</strong> <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              A = {pp(G + M)} cm²
            </span>
          </>
        )
      }}
    />
  )
}

function renderDiagram(data: PyraData) {
  return buildJSX(() => {
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
    return b
  }, data)
}
