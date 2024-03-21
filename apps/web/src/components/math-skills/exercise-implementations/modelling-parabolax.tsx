/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { useMathSkillsStorage } from '../utils/math-skills-data-context'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

export function ModellingParabola() {
  const { data } = useMathSkillsStorage()

  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          b: randomIntBetween(7, 15),
          c: randomIntBetween(2, 9),
          isPlus: randomItemFromArray([true, false]),
          isPlus_2: randomItemFromArray([true, false]),
          context: randomIntBetween(1, 4),
        }
      }}
      renderTask={({ context, b, isPlus, isPlus_2, c }) => {
        return (
          <>
            <h2 className="text-2xl">
              {data.name ? `${data.name} ` : 'Sophie '}
              {context === 1
                ? 'macht einen Weitsprung. Der Sprung kann mit dem Graphen der Funktion '
                : null}
              {context === 2
                ? 'sieht beim Autofahren den Eingang eines Tunnels. Der Eingang kann mit dem Graphen der Funktion '
                : null}
              {context === 3
                ? 'wirft einen Stein in einen See. Der Wurf kann mit dem Graphen der Funktion '
                : null}
              {context === 4
                ? 'beobachtet einen Einsatz der Feuerwehr. Der Wasserstrahl, der ein brennendes Auto löscht kann mit dem Graphen der Funktion '
                : null}
            </h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = - x<sup>2</sup> +{' '}
              {context === 1
                ? (b / 2).toString().replace('.', ',')
                : b.toString().replace('.', ',')}
              x
            </span>
            <br />
            <br />
            <h2 className="text-2xl">beschrieben werden.</h2>
            <br />
            <br />
            <h2 className="text-2xl">
              {context === 1 ? 'Berechne die Sprungweite und wo ' : null}
              {data.name && context === 1 ? `${data.name} ` : null}
              {data.name === '' ? `Sophie` : null}
              {context === 1 ? 'am höchsten in der Luft war.' : null}
              {context === 2
                ? 'Berechne die maximale Breite und Höhe des Eingangs.'
                : null}
              {context === 3
                ? 'Berechne die maximale Weite des Wurfs und wie hoch der Stein am höchsten Punkt war.'
                : null}
              {context === 4
                ? 'Berechne wie weit der Strahl maximal kommt und wie hoch er am höchsten Punkt war.'
                : null}
            </h2>
            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
          </>
        )
      }}
      renderSolution={({ context, b, isPlus, isPlus_2, c }) => {
        return (
          <>
            Für die {context === 2 ? 'maximale Breite' : 'maximale Weite'}{' '}
            müssen die Nullstellen der Parabel berechnet werden:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              0 = - x<sup>2</sup> +{' '}
              {context === 1
                ? (b / 2).toString().replace('.', ',')
                : b.toString().replace('.', ',')}
              x
            </span>
            <br />
            <br />
            Wir lösen die Gleichung mit dem Satz des Nullprodukts. Dazu klammern
            wir - x aus:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              0 = - x · (x -{' '}
              {context === 1
                ? (b / 2).toString().replace('.', ',')
                : b.toString().replace('.', ',')}
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
              {context === 1
                ? (b / 2).toString().replace('.', ',')
                : b.toString().replace('.', ',')}
            </span>
            <br />
            <br />
            Die maximale {context === 2
              ? 'maximale Breite'
              : 'maximale Weite'}{' '}
            ist damit: <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              x<sub>2</sub> - x<sub>1</sub> ={' '}
              {context === 1
                ? (b / 2).toString().replace('.', ',')
                : b.toString().replace('.', ',')}
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
              {context === 1
                ? (b / 4).toString().replace('.', ',')
                : (b / 2).toString().replace('.', ',')}
            </span>
            <br />
            <br />
            Die Höhe ist damit:
            <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y<sub>s</sub> = -{' '}
              {context === 1
                ? (b / 4).toString().replace('.', ',')
                : (b / 2).toString().replace('.', ',')}
              <sup>2</sup> +{' '}
              {context === 1
                ? (b / 2).toString().replace('.', ',')
                : b.toString().replace('.', ',')}{' '}
              ·{' '}
              {context === 1
                ? (b / 4).toString().replace('.', ',')
                : (b / 2).toString().replace('.', ',')}{' '}
              ={' '}
              {context === 1
                ? (-(b / 4) * (b / 4) + (b / 2) * (b / 4))
                    .toString()
                    .replace('.', ',')
                : (-(b / 2) * (b / 2) + (b / 2) * b)
                    .toString()
                    .replace('.', ',')}
            </span>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ context, b }) => {
        return (
          <>
            Für die {context === 2 ? 'maximale Breite' : 'maximale Weite'}{' '}
            müssen die Nullstellen der Parabel berechnet werden:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              0 = - x<sup>2</sup> +{' '}
              {context === 1
                ? (b / 2).toString().replace('.', ',')
                : b.toString().replace('.', ',')}
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
