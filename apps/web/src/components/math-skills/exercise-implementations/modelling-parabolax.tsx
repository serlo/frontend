/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PlotData {
  b: number

  context: number
}

export function ModellingParabola() {
  const { data } = useMathSkillsStorage()

  return (
    <SelfEvaluationExercise
      generator={() => {
        const b = randomIntBetween(7, 12)

        const context = randomIntBetween(1, 4)
        const data: PlotData = {
          context,
          b,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <h2 className="text-2xl">
              {data.context === 1
                ? 'Sophie macht einen Weitsprung. Der Sprung kann mit dem Graphen der Funktion '
                : null}
              {data.context === 2
                ? 'Sophie sieht beim Autofahren den Eingang eines Tunnels. Der Eingang kann mit dem Graphen der Funktion '
                : null}
              {data.context === 3
                ? 'Sophie wirft einen Stein in einen See. Der Wurf kann mit dem Graphen der Funktion '
                : null}
              {data.context === 4
                ? 'Sophie beobachtet einen Einsatz der Feuerwehr. Der Wasserstrahl, der ein brennendes Auto löscht kann mit dem Graphen der Funktion '
                : null}
            </h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = - x<sup>2</sup> +{' '}
              {data.context === 1
                ? (data.b / 2).toString().replace('.', ',')
                : data.b.toString().replace('.', ',')}
              x
            </span>
            <br />
            <br />
            <h2 className="text-2xl">beschrieben werden.</h2>
            <br />
            <br />
            <h2 className="text-2xl">
              {data.context === 1
                ? 'Berechne die Sprungweite und wo Sophie am höchsten in der Luft war.'
                : null}

              {data.context === 2
                ? 'Berechne die maximale Breite und Höhe des Eingangs.'
                : null}
              {data.context === 3
                ? 'Berechne die maximale Weite des Wurfs und wie hoch der Stein am höchsten Punkt war.'
                : null}
              {data.context === 4
                ? 'Berechne wie weit der Strahl maximal kommt und wie hoch er am höchsten Punkt war.'
                : null}
            </h2>{' '}
          </>
        )
      }}
      renderSolution={({ data }) => {
        return (
          <>
            Für die {data.context === 2 ? 'maximale Breite' : 'maximale Weite'}{' '}
            müssen die Nullstellen der Parabel berechnet werden:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              0 = - x<sup>2</sup> +{' '}
              {data.context === 1
                ? (data.b / 2).toString().replace('.', ',')
                : data.b.toString().replace('.', ',')}
              x
            </span>
            <br />
            <br />
            Wir lösen die Gleichung mit dem Satz des Nullprodukts. Dazu klammern
            wir - x aus:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              0 = - x · (x -{' '}
              {data.context === 1
                ? (data.b / 2).toString().replace('.', ',')
                : data.b.toString().replace('.', ',')}
              )
            </span>
            <br />
            Am ersten Faktor erkennen wir die erste Lösung:{' '}
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              x<sub>1</sub> = 0
            </span>
            <br />
            Der zweite Faktor - die Klammer - ist dann 0, wenn:{' '}
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              x<sub>2</sub> ={' '}
              {data.context === 1
                ? (data.b / 2).toString().replace('.', ',')
                : data.b.toString().replace('.', ',')}
            </span>
            <br />
            <br />
            Die {data.context === 2 ? 'maximale Breite' : 'maximale Weite'} ist
            damit: <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              x<sub>2</sub> - x<sub>1</sub> ={' '}
              {data.context === 1
                ? (data.b / 2).toString().replace('.', ',')
                : data.b.toString().replace('.', ',')}
            </span>
            <br />
            <br />
            Für die maximale Höhe muss der Scheitelpunkt der Parabel berechnet
            werden. Da die Nullstellen bekannt sind, können wir die Mitte davon
            als x-Wert des Scheitels bestimmen:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              x<sub>s</sub> ={' '}
              {buildFrac(
                <>
                  x<sub>2</sub> - x<sub>1</sub>
                </>,
                <>2</>
              )}{' '}
              ={' '}
              {data.context === 1
                ? (data.b / 4).toString().replace('.', ',')
                : (data.b / 2).toString().replace('.', ',')}
            </span>
            <br />
            <br />
            Die Höhe ist damit:
            <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y<sub>s</sub> = -{' '}
              {data.context === 1
                ? (data.b / 4).toString().replace('.', ',')
                : (data.b / 2).toString().replace('.', ',')}
              <sup>2</sup> +{' '}
              {data.context === 1
                ? (data.b / 2).toString().replace('.', ',')
                : data.b.toString().replace('.', ',')}{' '}
              ·{' '}
              {data.context === 1
                ? (data.b / 4).toString().replace('.', ',')
                : (data.b / 2).toString().replace('.', ',')}{' '}
              ={' '}
              {data.context === 1
                ? (-(data.b / 4) * (data.b / 4) + (data.b / 2) * (data.b / 4))
                    .toString()
                    .replace('.', ',')
                : (-(data.b / 2) * (data.b / 2) + (data.b / 2) * data.b)
                    .toString()
                    .replace('.', ',')}
            </span>
            <br />
            <br />
            Graph als Hilfe:
            <br />
            <SubComponent data={data} />
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ data }) => {
        return (
          <>
            Für die {data.context === 2 ? 'maximale Breite' : 'maximale Weite'}{' '}
            müssen die Nullstellen der Parabel berechnet werden:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              0 = - x<sup>2</sup> +{' '}
              {data.context === 1
                ? (data.b / 2).toString().replace('.', ',')
                : data.b.toString().replace('.', ',')}
              x
            </span>
            <br />
            <br />
            Verwende dazu den Satz des Nullprodukts.
            <br />
            <br />
            Die maximale Höhe befindet sich im Scheitelpunkt der Parabel.
            <br />
            <br />
            Bestimme dazu den y-Wert in der Mitte der Nullstellen.
          </>
        )
      }}
      centAmount={35}
    />
  )
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SubComponent({ data }: { data: PlotData }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)
  useEffect(() => {
    const x = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-1, 35, 13, -3],
      showNavigation: false,
      showCopyright: false,
    })

    x.create('axis', [
      [0.0, 0.0],
      [0.0, 1.0],
    ])
    x.create('axis', [
      [0.0, 0.0],
      [1.0, 0.0],
    ])

    x.create(
      'arrow',
      [
        [0, 0],
        [data.b, 0],
      ],
      {}
    )
    x.create(
      'arrow',
      [
        [data.b, 0],
        [0, 0],
      ],
      {}
    )
    x.create(
      'arrow',
      [
        [data.b / 2, 0],
        [data.b / 2, (data.b / 2) * (data.b / 2)],
      ],
      {}
    )
    x.create('text', [12, 1.5, `x`], {})
    x.create('text', [0.5, 33.5, `y`], {})
    x.create('text', [data.b / 4 - 0.8, 1.5, `maximale Breite`], {})
    x.create(
      'text',
      [data.b / 2 + 0.3, ((data.b / 2) * (data.b / 2)) / 2, `maximale Höhe`],
      {}
    )
    x.create('functiongraph', [
      function (x: number) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return -x * x + data.b * x
      },
      -3,
      15,
    ])
    setBoard(x)

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
