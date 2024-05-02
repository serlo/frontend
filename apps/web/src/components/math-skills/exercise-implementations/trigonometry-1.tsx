import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  buildBlock,
  buildFrac,
  buildJSX,
  buildOverline,
} from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface Trig1Data {
  as: number
  ac: number
  ab: number
  cd: number
  mode: 'cd' | 'ab'
  otherRay: boolean
  factor: number
}

export function Trigonometry1() {
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
          cd: ((as + ac) / as) * ab,
          mode: randomItemFromArray(['cd', 'ab']),
          otherRay: randomItemFromArray([true, false]),
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <p className="serlo-main-task">
              Die beiden Geraden{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">AB</b> und{' '}
              <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">CD</b>{' '}
              sind zueinander parallel.
            </p>
            <p className="mt-2 text-2xl">
              Es gilt |{buildOverline(data.otherRay ? 'SB' : 'SA')}| = {data.as}{' '}
              cm und |{buildOverline(data.otherRay ? 'BD' : 'AC')}| = {data.ac}{' '}
              cm <br /> sowie |{buildOverline(data.mode === 'cd' ? 'AB' : 'CD')}
              | = {pp(data.mode === 'cd' ? data.ab : data.cd)} cm.
            </p>
            {renderDiagram(data)}
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <p className="text-2xl">
              Berechnen Sie die Länge der Strecke{' '}
              <b className="rounded-md bg-newgreen bg-opacity-20 p-1 overline">
                {data.mode.toUpperCase()}
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
            Stelle eine Gleichung mit dem Strahlensatz auf:
            <br />
            {data.mode === 'cd' ? (
              <p className="serlo-highlight-gray">
                {buildFrac(
                  <>
                    |<span className="overline">CD</span>|
                  </>,
                  <>{data.ab} cm</>
                )}{' '}
                ={' '}
                {buildFrac(<>{data.as + data.ac} cm</>, <>{pp(data.as)} cm</>)}
              </p>
            ) : (
              buildBlock(
                'gray',
                <>
                  {buildFrac(
                    <>
                      |<span className="overline">AB</span>|
                    </>,
                    <>{pp(data.cd)} cm</>
                  )}{' '}
                  ={' '}
                  {buildFrac(
                    <>{pp(data.as)} cm</>,
                    <>{data.as + data.ac} cm</>
                  )}
                </>
              )
            )}
            <br />
            <br />
            Forme die Gleichung nach |<span className="overline">CD</span>| um:{' '}
            <br />
            {data.mode === 'cd' ? (
              <p className="serlo-highlight-gray">
                ⇔ |<span className="overline">CD</span>| ={' '}
                {buildFrac(<>{data.as + data.ac} cm</>, <>{data.as} cm</>)} ·{' '}
                {pp(data.ab)} cm
              </p>
            ) : (
              buildBlock(
                'gray',
                <>
                  ⇔ |<span className="overline">CD</span>| ={' '}
                  {buildFrac(<>{data.as} cm</>, <>{data.as + data.ac} cm</>)} ·{' '}
                  {pp(data.cd)} cm
                </>
              )
            )}
            <br />
            <br />
            Ergebnis: <br />
            <span className="mt-5 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              |<span className="overline">CD</span>| ={' '}
              {(data.mode === 'cd' ? data.cd : data.ab)
                .toString()
                .replace('.', ',')}{' '}
              cm
            </span>
            <br />
            <br />
          </>
        )
      }}
      renderHint={({ data }) => {
        return (
          <>
            Verwende den Strahlensatz, um eine Gleichung aufzustellen:
            <br />
            <p className="serlo-highlight-gray">
              {buildFrac(
                <>
                  |<span className="overline">CD</span>|
                </>,
                <>
                  |<span className="overline">AB</span>|
                </>
              )}{' '}
              ={' '}
              {buildFrac(
                <>
                  |
                  <span className="overline">
                    {data.otherRay ? 'DS' : 'CS'}
                  </span>
                  |{' '}
                </>,
                <>
                  |
                  <span className="overline">
                    {data.otherRay ? 'BS' : 'AS'}
                  </span>
                  |
                </>
              )}
            </p>
            <br />
            <br />
            Setze die Werte der Längen ein und löse die Gleichung.
          </>
        )
      }}
    />
  )
}

function renderDiagram(data: Trig1Data) {
  return buildJSX(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-1, 6, 7, -2],
      showNavigation: false,
      showCopyright: false,
    })

    const pointS = b.create('point', [0, 0], {
      name: 'S',
      fixed: true,
      label: { autoPosition: true },
    })
    const pointA = b.create('point', [4, 0], { name: 'A', fixed: true })
    const pointC = b.create('point', [6, 0], { name: 'C', fixed: true })
    const pointB = b.create('point', [2.1, 2.7], {
      name: 'B',
      fixed: true,
    })
    const pointD = b.create(
      'point',
      [() => pointB.X() * 1.5, () => pointB.Y() * 1.5],
      {
        name: 'D',
        fixed: true,
      }
    )

    b.create('line', [pointA, pointB])
    b.create('line', [pointC, pointD])

    b.create('line', [pointS, pointC], {
      straightFirst: false,
      straightLast: true,
    })
    b.create('line', [pointS, pointD], {
      straightFirst: false,
      straightLast: true,
    })

    if (data.otherRay) {
      b.create('text', [0, 2, `${pp(data.as)} cm`], {})
      return b
      // ?
      // b.create('text', [1.6, 3.8, `${pp(data.ac)} cm`], {})
      // return b
    } else {
      b.create('text', [2, 0, `${pp(data.as)} cm`], {
        anchorX: 'middle',
        anchorY: 'top',
      })
      b.create('text', [5.3, 0, `${pp(data.ac)} cm`], {
        anchorX: 'middle',
        anchorY: 'top',
      })
    }

    if (data.mode === 'cd') {
      b.create('text', [2.8, 2, `${pp(data.ab)} cm`], {})
      return b
    } else {
      b.create('text', [4.6, 2.4, `${pp(data.cd)} cm`], {})
      return b
    }
  }, data)
}
