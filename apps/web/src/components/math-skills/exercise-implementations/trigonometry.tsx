import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  MainTask,
  HighlightGray,
  HighlightGreen,
} from '../components/content-components'
import { buildJSX, buildSqrt } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface Trig1Data {
  as: number
  ac: number
  ab: number
  angle: number
  factor: number
  sb_sq: number
}

export function Trigonometry() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const factor = randomItemFromArray([0.5, 1])
        const as = randomIntBetween(1, 10) * 2
        const ac = as * factor
        const ab = randomIntBetween(2, 10)
        const data: Trig1Data = {
          factor,
          as,
          ac,
          ab,
          angle: 60,
          sb_sq: as * as + ab * ab - 2 * as * ab * 0.5,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <p className="serlo-main-task">
              Gegeben ist das Dreieck{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">ABS</b>.
            </p>
            {renderDiagram(data)}
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <p className="mt-12 text-2xl">
              Begründen Sie, dass gilt:{' '}
              <b className="rounded-md bg-newgreen bg-opacity-20 p-1">
                |<span className="overline">SB</span>| ={' '}
                {buildSqrt(<>{data.sb_sq}</>)} cm
              </b>
              .
            </p>
            <br />
            <br />
          </>
        )
      }}
      renderSolution={({ data }) => {
        return (
          <>
            Wende den Kosinussatz an:
            <br />
            <p className="serlo-highlight-gray">
              |<span className="overline">SB</span>|² = ({data.as} cm)² + (
              {data.ab} cm)²
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-
              2 · {data.as} cm · {data.ab} cm · cos 60°
            </p>
            <br />
            <br />
            Nutze{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              cos 60° = 0,5
            </span>{' '}
            und berechne:
            <br />
            <p className="serlo-highlight-gray">
              |<span className="overline">SB</span>|² ={' '}
              {data.as * data.as + data.ab * data.ab} cm² -{' '}
              {2 * data.as * data.ab * 0.5} cm² = {data.sb_sq} cm²
            </p>
            <br />
            <br />
            Ziehe die Wurzel. Das Ergebnis ist bestätigt.
            <br />
            <p className="serlo-highlight-green">
              |<span className="overline">SB</span>| ={' '}
              {buildSqrt(<>{data.sb_sq}</>)} cm
            </p>
            <br />
            <br />
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({}) => {
        return (
          <>
            Verwende den Kosinussatz:
            <br />
            <p className="serlo-highlight-gray">
              |<span className="overline">SB</span>|² = |
              <span className="overline">AS</span>|² + |
              <span className="overline">AB</span>|² - 2 · |
              <span className="overline">AS</span>| · |
              <span className="overline">AB</span>| · cos(&#945;)
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

    const pointS = b.create('point', [-0.5, 0], {
      name: 'S',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointA = b.create('point', [5.5, 0], { name: 'A', fixed: true })
    const pointB = b.create('point', [2.1, 4.2], {
      name: 'B',
      fixed: true,
    })

    b.create('line', [pointA, pointB], {
      straightFirst: false,
      straightLast: false,
    })

    b.create('line', [pointS, pointB], {
      straightFirst: false,
      straightLast: false,
    })
    b.create('line', [pointS, pointA], {
      straightFirst: false,
      straightLast: false,
    })

    b.create('angle', [pointB, pointA, pointS], {
      name: function () {
        return `${data.angle}°`
      },
    })

    b.create('text', [2.5, 0, `${data.as} cm`], {
      anchorX: 'middle',
      anchorY: 'top',
    })

    b.create('text', [4.2, 2.5, `${data.ab} cm`], {})
    return b
  }, data)
}
