import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  MainTask,
  HighlightGray,
  HighlightGreen,
} from '../components/content-components'
import { buildFrac, buildJSX } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface Trig1Data {
  ac: number
  bc: number
  ab: number
  factor1: number
  factor2: number
  angle: number
}

export function Trigonometry3() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        //siehe S. 146/6
        const factor1 = randomItemFromArray([0.61, 0.79])
        const factor2 = randomItemFromArray([0.48, 0.6])
        const ab = randomIntBetween(24, 54)
        const ac = Math.round(ab * factor1)
        const bc = Math.round(ab * factor2)
        const data: Trig1Data = {
          ac,
          bc,
          ab,
          factor1,
          factor2,
          angle: 104,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <MainTask>
              Das Grundstück der Bar &quot;Sonnenuntergang&quot; hat die Form
              des Dreiecks{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">ABC</b>.
            </MainTask>
            <p className="serlo-main-task">
              Auf dem Grundstücks möchten die Betreiber einen Beach-Bereich
              anlegen. Dazu werden die Seiten{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">
                <span className="overline">AB</span>&nbsp;=&nbsp;
                {pp(data.ab)}&nbsp;m
              </b>{' '}
              und{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">
                <span className="overline">AC</span>&nbsp;=&nbsp;
                {pp(data.ac)}&nbsp;m
              </b>{' '}
              des Dreiecks jeweils um ein Achtel ihrer Länge auf die
              Seiten&nbsp;
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">
                <span className="overline">AD</span>
              </b>
              &nbsp;und&nbsp;
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">
                <span className="overline">AE</span>
              </b>
              &nbsp; verkürzt.
            </p>
            {renderDiagram(data)}
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <p className="serlo-main-task">
              Der Bereich des Vierecks{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">DBCE</b>{' '}
              soll mit Sand aufgefüllt werden. Berechnen Sie den Flächeninhalt
              der Sandfläche.
            </p>
            <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
            <br />
            <br />
          </>
        )
      }}
      renderSolution={({ data }) => {
        const br =
          (Math.pow(data.ab, 2) + Math.pow(data.ac, 2) - Math.pow(data.bc, 2)) /
          (2 * data.ab * data.ac)

        const zw1 = Math.acos(br)
        const zw = Math.round(zw1 * (180 / Math.PI) * 100) / 100
        const achtelbd = Math.round(((data.ab * 1) / 8) * 7 * 100) / 100
        const achtelce = Math.round(((data.ac * 1) / 8) * 7 * 100) / 100
        const A1 =
          Math.round(0.5 * data.ab * data.ac * Math.sin(zw1) * 100) / 100

        const A2 =
          Math.round(
            0.5 *
              (data.ab - data.ab / 8) *
              (data.ac - data.ac / 8) *
              Math.sin(zw1) *
              100
          ) / 100
        const Erg = Math.round((A1 - A2) * 100) / 100
        return (
          <>
            Im Dreieck ABC gilt:
            <br />
            <HighlightGray>
              cos 𝛼 ={' '}
              {buildFrac(
                <>
                  ({pp(data.ab)} m)² + ({pp(data.ac)} m)² - ({pp(data.bc)} m)²
                </>,
                <>
                  2 · {pp(data.ab)} m · {pp(data.ac)} m
                </>
              )}
            </HighlightGray>
            <br />
            <HighlightGray>𝛼 = {pp(zw)}°</HighlightGray>
            <br />
            <p className="mt-3">Berechne die verkürzten Längen:</p>
            <HighlightGray>
              |<span className="overline">AD</span>| ={' '}
              {buildFrac(<>7</>, <>8</>)} · {pp(data.ab)} m = {pp(achtelbd)} m
            </HighlightGray>{' '}
            <br />
            <HighlightGray>
              |<span className="overline">AE</span>| ={' '}
              {buildFrac(<>7</>, <>8</>)} · {pp(data.ac)} m = {pp(achtelce)} m
            </HighlightGray>{' '}
            <br /> <br />
            So ist der Flächeninhalt des Dreiecks ABC: <br />
            <HighlightGray>
              A<sub>ABC</sub> = 0,5 · {pp(data.ab)} m · {pp(data.ac)} m · sin{' '}
              {pp(zw)}° = {pp(A1)} m²
            </HighlightGray>{' '}
            <br /> <br />
            Der Flächeninhalt des Dreicks ADE: <br />
            <HighlightGray>
              A<sub>ADE</sub> = 0,5 · {pp(achtelbd)} m ·{pp(achtelce)} m · sin{' '}
              {pp(zw)}
              ° <br />
              <br />A<sub>ADE</sub> = {pp(A2)} m²
            </HighlightGray>{' '}
            <br /> <br />
            Somit ist der Flächeninhalt des Vierecks DBCE: <br />
            <HighlightGreen>
              A<sub>DBCE</sub> = {pp(A1)} m² - {pp(A2)} m² = {pp(Erg)} m²
            </HighlightGreen>
            <p className="mt-3">Antworte:</p>
            <p className="serlo-highlight-green">
              Der Beach-Bereich der Bar hat eine Fläche von {pp(Erg)}&nbsp;m².
            </p>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({}) => {
        return (
          <>
            Verwende den Kosinussatz:
            <br />
            <HighlightGray>
              cos 𝛼 ={' '}
              {buildFrac(
                <>
                  (|<span className="overline">AB</span>|)² + (|
                  <span className="overline">AC</span>|)² - (|
                  <span className="overline">BC</span>|)²
                </>,
                <>
                  2 · |<span className="overline">AB</span>| · |
                  <span className="overline">AC</span>|
                </>
              )}
            </HighlightGray>
            <p className="mt-3">
              Berechne die Fläche als Differenz zweier Dreiecksflächen.
            </p>
          </>
        )
      }}
    />
  )
}

function renderDiagram(data: Trig1Data) {
  return buildJSX(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-2, 6, 7, -2],
      showNavigation: false,
      showCopyright: false,
    })

    const pointA = b.create('point', [-0.5, 0], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointB = b.create('point', [5.5, 0], { name: 'B', fixed: true })
    const pointC = b.create('point', [3.5, 4], {
      name: 'C',
      fixed: true,
    })
    const pointD = b.create('point', [4, 0], { name: 'D', fixed: true })

    const pointE = b.create('point', [2.5, 3], { name: '', fixed: true })

    b.create('line', [pointA, pointD], {
      straightFirst: false,
      straightLast: false,
    })
    b.create('line', [pointD, pointE], {
      straightFirst: false,
      straightLast: false,
    })

    b.create('line', [pointA, pointB], {
      straightFirst: false,
      straightLast: false,
    })

    b.create('line', [pointC, pointB], {
      straightFirst: false,
      straightLast: false,
    })
    b.create('line', [pointC, pointA], {
      straightFirst: false,
      straightLast: false,
    })

    b.create('angle', [pointB, pointA, pointD], {
      type: 'sector',
      name: ' ',
      color: 'blue',
      radius: 1.5,
    })

    b.create('text', [2.5, 0, `${pp(data.ab)} m`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [0.5, 2.5, `${pp(data.ac)} m`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [2.3, 4, `E`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [4.8, 2, `${pp(data.bc)} m`], {})
    b.create('polygon', [pointD, pointB, pointC, pointE])

    return b
  }, data)
}
