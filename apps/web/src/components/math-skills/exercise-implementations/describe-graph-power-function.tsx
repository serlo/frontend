import { useState, useEffect } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { JSXGraphWrapper } from '../utils/jsx-graph-wrapper'
import { buildBlock } from '../utils/math-builder'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface DATA {
  k: number
  n: number
  c: number | null
  d: number | null
}

export function DescribeGraphPowerFunction() {
  function renderF(data: DATA) {
    return (
      <>
        {data.k === -1
          ? '-'
          : data.k === 1
            ? null
            : data.k.toLocaleString('de-DE')}
        {data.c === null ? (
          'x'
        ) : (
          <>
            (x {data.c > 0 ? '+' : '-'} {Math.abs(data.c)})
          </>
        )}
        <sup>{data.n === 1 ? null : data.n}</sup>
        {data.d === null ? null : (
          <>
            {' '}
            {data.d > 0 ? '+' : '-'} {Math.abs(data.d)}
          </>
        )}
      </>
    )
  }
  return (
    <SelfEvaluationExercise
      generator={() => {
        const n = randomItemFromArray([
          5, 4, 3, 2, 2, 2, 1, 1, 1, -1, -2, -3, -4, -5,
        ])
        const k =
          randomItemFromArray([0.2, 0.25, 0.5, 1, 2, 3, 4, 5]) *
          randomItemFromArray([1, -1])
        let c = null
        let d = null
        if (n === 1 || n === 2) {
          const mode = randomItemFromArray([
            'pure',
            'translate-x',
            'translate-y',
          ])
          if (mode === 'translate-x') {
            c = randomItemFromArray([4, 3, 2, 1, -1, -2, -3, -4])
          }
          if (mode === 'translate-y') {
            d = randomItemFromArray([4, 3, 2, 1, -1, -2, -3, -4])
          }
        }
        return { n, k, c, d }
      }}
      renderTask={(data) => (
        <>
          <p className="text-2xl">
            Gegeben ist folgende Funktionsgleichung. Beschreiben Sie Lage und
            Aussehen des dazugehörigen Graphen.
          </p>
          {buildBlock('green', <>y = {renderF(data)}</>)}
        </>
      )}
      renderSolution={(data) => {
        const graph = (
          <>
            <p className="mt-8 italic">
              Skizze (nicht Teil der Aufgabenstellung):
            </p>
            <SubComponent data={data} />
          </>
        )
        if (data.n === 1) {
          const isOrigin = data.c === null && data.d === null
          return (
            <>
              <p className="text-xl">
                Der Graph ist eine {isOrigin ? 'Ursprungsgerade' : 'Gerade'}.
                {data.d !== null ? (
                  <>
                    {' '}
                    Die Gerade schneidet die y-Achse bei{' '}
                    {data.d > 0 ? '+' : '-'} {Math.abs(data.d)}.
                  </>
                ) : null}{' '}
                Der Graph verläuft {data.k > 0 ? 'steigend' : 'fallend'} und{' '}
                {data.k === 1 && isOrigin ? (
                  <>ist die Winkelhalbierende des I. und III. Quadranten.</>
                ) : data.k === -1 && isOrigin ? (
                  <>ist die Winkelhalbierende des II. und IV. Quadranten.</>
                ) : data.k > 1 ? (
                  <>ist steiler als die Winkelhalbierende.</>
                ) : data.k > 0 && data.k < 1 ? (
                  <>ist flacher als die Winkelhalbierende.</>
                ) : (
                  <>
                    hat die Steigung {data.k > 0 ? '+' : '-'}{' '}
                    {Math.abs(data.k).toLocaleString('de-De')}.
                  </>
                )}
                {data.c !== null && (
                  <>
                    {' '}
                    Im Vergleich zur entsprechenden Ursprungsgerade ist dieser
                    Graph um {Math.abs(data.c)} LE entlang der x-Achse nach{' '}
                    {data.c > 0 ? 'links' : 'rechts'} verschoben.
                  </>
                )}
              </p>
              {graph}
            </>
          )
        }
        if (data.n === 2) {
          return (
            <>
              <p className="text-xl">
                Der Graph ist eine nach {data.k > 0 ? 'oben' : 'unten'}{' '}
                geöffnete Parabel mit dem Öffnungsfaktor{' '}
                {data.k.toLocaleString('de-De')} und dem Scheitel S ({' '}
                {-(data.c ?? 0)} | {data.d ?? 0} ).
              </p>
              {graph}
            </>
          )
        }
        if (data.n < 0) {
          return (
            <>
              <p className="text-xl">
                Der Graph ist eine{' '}
                {data.n % 2 !== 0
                  ? 'zum Ursprung punktsymmetrische'
                  : 'zur y-Achse symmetrische'}{' '}
                Hyperbel mit dem Öffnungsfaktor{' '}
                {Math.abs(data.k).toLocaleString('de-De')}. Die
                Koordinatenachsen sind die Asymptoten. Der Graph verläuft durch
                den{' '}
                {data.n % 2 === 0
                  ? data.k > 0
                    ? 'I. und II.'
                    : 'III. und IV.'
                  : data.k > 0
                    ? 'I. und III.'
                    : 'II. und IV.'}{' '}
                Quadranten.
              </p>
              {graph}
            </>
          )
        }
        return (
          <>
            <p className="text-xl">
              Der Graph ist eine{' '}
              {data.n % 2 !== 0
                ? 'zum Ursprung punktsymmetrische'
                : 'zur y-Achse symmetrische'}{' '}
              Potenzfunktion mit dem Öffnungsfaktor{' '}
              {Math.abs(data.k).toLocaleString('de-De')}. Der Graph verläuft
              durch den Ursprung und den{' '}
              {data.n % 2 === 0
                ? data.k > 0
                  ? 'I. und II.'
                  : 'III. und IV.'
                : data.k > 0
                  ? 'I. und III.'
                  : 'II. und IV.'}{' '}
              Quadranten.
            </p>
            {graph}
          </>
        )
      }}
      centAmount={35}
    />
  )
}

function SubComponent({ data }: { data: DATA }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  useEffect(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-5, 5, 5, -5],
      showNavigation: false,
      showCopyright: false,
      axis: true,
    })

    b.create('functiongraph', [
      function (x: number) {
        return data.k * Math.pow(x + (data.c ?? 0), data.n) + (data.d ?? 0)
      },
      -5,
      5,
    ])

    if (data.n !== 1 && data.n !== 2) {
      b.create('text', [4.3, 4, 'I.'], {})
      b.create('text', [-4.7, 4, 'II.'], {})
      b.create('text', [4.3, -4, 'IV.'], {})
      b.create('text', [-4.7, -4, 'III.'], {})
    }

    if (data.n === 2) {
      b.create('point', [-(data.c ?? 0), data.d ?? 0], {
        name: 'S',
        fixed: true,
        label: { autoPosition: true },
      })
    }

    setBoard(b)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <JSXGraphWrapper id="jxgbox" width={300} height={300} />
}
