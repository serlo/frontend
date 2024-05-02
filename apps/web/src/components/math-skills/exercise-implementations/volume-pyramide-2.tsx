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
  ac: number
}

export function VolumeThreePyramide() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const me = randomIntBetween(2, 8)
        const bd = randomIntBetween(2, 8)
        const ac = bd
        const ab = bd
        const data: PyraData = {
          ab,
          me,
          bd,
          ac,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <MainTask>
              Das ist die dreiseitige Pyramide{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">ABCE</b>{' '}
              mit einer gleichseitigen Grundfläche.
            </MainTask>
            {renderDiagram(data)}
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <ol>
              <li className="text-2xl">
                Berechne das Volumen der Pyramide und runde auf{' '}
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
            Allgemeine Gleichung für das Volumen von Pyramiden: <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              V = {buildFrac(<>1</>, <>3</>)} · G · h
            </span>
            <br /> Dabei ist <strong>G</strong> die Grundfläche und{' '}
            <strong>h</strong> die Höhe der Pyramide. Die Grundfläche besteht
            bei unserer Pyramide aus einem Dreieck: <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              G = {buildFrac(<>1</>, <>4</>)} * a² * {buildSqrt(<>3</>)} <br />G
              = {buildFrac(<>1</>, <>4</>)} * ({data.bd} cm)² *{' '}
              {buildSqrt(<>3</>)} <br />G = {G} cm² <br />
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
              V = {pp(V)} cm³
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
            Bestimme dazu den Inhalt der dreieckigen Grundfläche{' '}
            <strong>G</strong>: <br />
            <span className="mb-5 mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              G = {buildFrac(<>1</>, <>4</>)} * a² * {buildSqrt(<>3</>)}
            </span>
          </>
        )
      }}
    />
  )
}

function renderDiagram(data: PyraData) {
  return buildJSX(
    () => {
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
      return b
    },
    'jxgbox',
    data
  )
}
