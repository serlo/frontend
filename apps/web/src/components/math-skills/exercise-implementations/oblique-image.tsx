import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac, buildJSX, buildOverline } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function ObliqueImage() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const koerper = randomItemFromArray(['pyramide', 'quader'])
        const ab = randomIntBetween(4, 10)
        const bc = randomIntBetween(
          6,
          Math.max(7, Math.floor(((14 - ab) * 2) / 0.7071067))
        )
        const h = randomIntBetween(
          Math.ceil(0.7071067 * bc * 0.5) + 2,
          Math.floor(14 - 0.7071067 * bc * 0.5)
        )
        const basePoint = randomItemFromArray(['A', 'B', 'C', 'D'])

        return {
          koerper,
          ab,
          bc,
          h,
          basePoint,
        }
      }}
      renderTask={(data) => {
        return (
          <>
            {data.koerper === 'quader' ? (
              <>
                <p className="serlo-main-task">
                  Das Rechteck ABCD ist die Grundfläche des Quaders ABCDEFGH.
                </p>
                <p className="serlo-main-task">
                  Es gilt: |{buildOverline(<>AB</>)}| = {data.ab} cm, |
                  {buildOverline(<>BC</>)}| = {data.bc} cm und |
                  {buildOverline(<>AE</>)}| = {data.h} cm.
                </p>
              </>
            ) : data.koerper === 'pyramide' ? (
              <>
                <p className="serlo-main-task">
                  Das Rechteck ABCD ist die Grundfläche der Pyramide ABCDS mit
                  der Höhe |{buildOverline(<>{data.basePoint}S</>)}| = {data.h}{' '}
                  cm.
                </p>
                <p className="serlo-main-task">
                  Es gilt: |{buildOverline(<>AB</>)}| = {data.ab} cm und |
                  {buildOverline(<>BC</>)}| = {data.bc} cm.
                </p>
              </>
            ) : null}

            <p className="serlo-main-task">
              Zeichen Sie das Schrägbild des Körpers mit dem
              <br />
              Maßstab q ={' '}
              <span className="text-base">{buildFrac(<>1</>, <>2</>)}</span> und
              dem Winkel ω = 45°. Die Strecke{' '}
              <span className="overline">AB</span> soll auf der Schrägbildachse
              liegen.
            </p>
          </>
        )
      }}
      renderSolution={(data) => {
        return (
          <>
            So sieht das Schrägbild aus:
            <br />
            {data.koerper === 'pyramide'
              ? buildJSX(
                  () => {
                    const g = JXG.JSXGraph.initBoard('solPyra', {
                      boundingbox: [1, 18, 18, 1],
                      showNavigation: false,
                      showCopyright: false,
                      axis: true,
                      defaultAxes: {
                        x: {
                          ticks: {
                            ticksDistance: 1,
                            insertTicks: false,
                            label: { visible: false },
                          },
                        },
                        y: {
                          ticks: {
                            ticksDistance: 1,
                            insertTicks: false,
                            label: { visible: false },
                          },
                        },
                      },
                    })

                    const A = [3, 3]
                    const B = [3 + data.ab, 3]
                    const C = [
                      3 + data.ab + 0.7071067 * data.bc * 0.5,
                      3 + 0.7071067 * data.bc * 0.5,
                    ]
                    const D = [
                      3 + 0.7071067 * data.bc * 0.5,
                      3 + 0.7071067 * data.bc * 0.5,
                    ]

                    const pointA = g.create('point', A, {
                      name: 'A',
                      fixed: true,
                      label: { autoPosition: true },
                    })
                    const pointB = g.create('point', B, {
                      name: 'B',
                      fixed: true,
                      label: { autoPosition: true },
                    })
                    const pointC = g.create('point', C, {
                      name: 'C',
                      fixed: true,
                      label: { autoPosition: true },
                    })
                    const pointD = g.create('point', D, {
                      name: 'D',
                      fixed: true,
                      label: { autoPosition: true },
                    })
                    g.create('segment', [pointA, pointB])
                    g.create('segment', [pointB, pointC])
                    g.create('segment', [pointC, pointD])
                    g.create('segment', [pointD, pointA])

                    let x = 0
                    let y = 0
                    if (data.basePoint === 'A') {
                      x = A[0]
                      y = A[1] + data.h
                    }
                    if (data.basePoint === 'B') {
                      x = B[0]
                      y = B[1] + data.h
                    }
                    if (data.basePoint === 'C') {
                      x = C[0]
                      y = C[1] + data.h
                    }
                    if (data.basePoint === 'D') {
                      x = D[0]
                      y = D[1] + data.h
                    }

                    const pointS = g.create('point', [x, y], {
                      name: 'S',
                      fixed: true,
                      label: { autoPosition: true },
                    })

                    g.create('segment', [pointA, pointS])
                    g.create('segment', [pointB, pointS])
                    g.create('segment', [pointC, pointS])
                    g.create('segment', [pointD, pointS])
                    return g
                  },
                  'solPyra',
                  data
                )
              : null}
            {data.koerper === 'quader'
              ? buildJSX(
                  () => {
                    const x = JXG.JSXGraph.initBoard('solQuader', {
                      boundingbox: [1, 18, 18, 1],
                      showNavigation: false,
                      showCopyright: false,
                      axis: true,
                      defaultAxes: {
                        x: {
                          ticks: {
                            ticksDistance: 1,
                            insertTicks: false,
                            label: { visible: false },
                          },
                        },
                        y: {
                          ticks: {
                            ticksDistance: 1,
                            insertTicks: false,
                            label: { visible: false },
                          },
                        },
                      },
                    })

                    const pointA = x.create('point', [3, 3], {
                      name: 'A',
                      fixed: true,
                      label: { autoPosition: true },
                    })
                    const pointB = x.create('point', [3 + data.ab, 3], {
                      name: 'B',
                      fixed: true,
                      label: { autoPosition: true },
                    })
                    const pointC = x.create(
                      'point',
                      [
                        3 + data.ab + 0.7071067 * data.bc * 0.5,
                        3 + 0.7071067 * data.bc * 0.5,
                      ],
                      {
                        name: 'C',
                        fixed: true,
                        label: { autoPosition: true },
                      }
                    )
                    const pointD = x.create(
                      'point',
                      [
                        3 + 0.7071067 * data.bc * 0.5,
                        3 + 0.7071067 * data.bc * 0.5,
                      ],
                      {
                        name: 'D',
                        fixed: true,
                        label: { autoPosition: true },
                      }
                    )
                    x.create('segment', [pointA, pointB])
                    x.create('segment', [pointB, pointC])
                    x.create('segment', [pointC, pointD])
                    x.create('segment', [pointD, pointA])

                    const pointE = x.create('point', [3, 3 + data.h], {
                      name: 'E',
                      fixed: true,
                      label: { autoPosition: true },
                    })
                    const pointF = x.create(
                      'point',
                      [3 + data.ab, 3 + data.h],
                      {
                        name: 'F',
                        fixed: true,
                        label: { autoPosition: true },
                      }
                    )
                    const pointG = x.create(
                      'point',
                      [
                        3 + data.ab + 0.7071067 * data.bc * 0.5,
                        3 + 0.7071067 * data.bc * 0.5 + data.h,
                      ],
                      {
                        name: 'G',
                        fixed: true,
                        label: { autoPosition: true },
                      }
                    )
                    const pointH = x.create(
                      'point',
                      [
                        3 + 0.7071067 * data.bc * 0.5,
                        3 + 0.7071067 * data.bc * 0.5 + data.h,
                      ],
                      {
                        name: 'H',
                        fixed: true,
                        label: { autoPosition: true },
                      }
                    )
                    x.create('segment', [pointE, pointF])
                    x.create('segment', [pointF, pointG])
                    x.create('segment', [pointG, pointH])
                    x.create('segment', [pointH, pointE])

                    x.create('segment', [pointA, pointE])
                    x.create('segment', [pointB, pointF])
                    x.create('segment', [pointC, pointG])
                    x.create('segment', [pointD, pointH])

                    return x
                  },
                  'solQuader',
                  data
                )
              : null}
            <br />
            <br />
            <i>
              Diese Grafik kann kleiner erscheinen, als sie auf dem Papier ist.
            </i>
          </>
        )
      }}
      renderHint={(data) => {
        if (data.koerper === 'pyramide')
          return (
            <>
              Beginne damit, die Strecke <span className="overline">AB</span>{' '}
              auf die Schrägbildachse zu zeichnen.
              <br />
              Im Winkel{' '}
              <span className="text-12xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                45°
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
        if (data.koerper === 'quader')
          return (
            <>
              Beginne damit, die Strecke <span className="overline">AB</span>{' '}
              auf die Schrägbildachse zu zeichnen.
              <br />
              Im Winkel 45° und dem Maßstab {buildFrac(<>1</>, <>2</>)} werden
              die Strecken <span className="overline">AD</span> und{' '}
              <span className="overline">BC</span> gezeichnet.
              <br />
              <br />
              Zeichne die Punkte E, F, G und H in der richtigen Höhe über der
              Grundfläche.
              <br />
              <br />
              Verbinde die Punkte zu einem Quader.
            </>
          )
        return <></>
      }}
    />
  )
}
