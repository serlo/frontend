/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

export function NormalformParabola() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          x_s: randomIntBetween(1, 9),
          y_s: randomIntBetween(1, 9),
          isPlus: randomItemFromArray([true, false]),
          isPlus_2: randomItemFromArray([true, false]),
        }
      }}
      renderTask={({ x_s, isPlus, isPlus_2, y_s }) => {
        return (
          <>
            <h2 className="text-2xl">Bestimme die Normalenform der Parabel:</h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = (x {isPlus ? '+' : '-'} {x_s})<sup>2</sup>{' '}
              {isPlus_2 ? '+' : '-'} {y_s}
            </span>
            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
          </>
        )
      }}
      renderSolution={({ x_s, isPlus, isPlus_2, y_s }) => {
        return (
          <>
            Aufgabenstellung: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = (x {isPlus ? '+' : '-'} {x_s})<sup>2</sup>{' '}
              {isPlus_2 ? '+' : '-'} {y_s}
            </span>
            <br />
            <br />
            Wende die die binomischen Formeln an:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = [ x<sup>2</sup> {isPlus ? '+' : '-'} 2 · {x_s} · x + {x_s}
              <sup>2</sup> ] {isPlus_2 ? '+' : '-'} {y_s}
            </span>
            <br />
            <br />
            Berechne den Mischterm und die Potenz:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = [ x<sup>2</sup> {isPlus ? '+' : '-'} {2 * x_s}x + {x_s * x_s}{' '}
              ] {isPlus_2 ? '+' : '-'} {y_s}
            </span>
            <br />
            <br />
            Fasse den Term zusammen:
            <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = x<sup>2</sup>
              {isPlus ? '+' : '-'} {2 * x_s}x{isPlus_2 ? '+' : '-'}{' '}
              {isPlus_2 ? x_s * x_s + y_s : x_s * x_s - y_s}
            </span>
          </>
        )
      }}
      centAmount={52}
    />
  )
}
