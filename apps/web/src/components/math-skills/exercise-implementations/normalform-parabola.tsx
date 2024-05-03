/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

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
            <p className="serlo-main-task">
              Bestimmen Sie die Normalform der Parabel:
            </p>
            <p className="serlo-highlight-green">
              y = (x {isPlus ? '+' : '-'} {x_s})<sup>2</sup>{' '}
              {isPlus_2 ? '+' : '-'} {y_s}
            </p>
          </>
        )
      }}
      renderSolution={({ x_s, isPlus, isPlus_2, y_s }) => {
        return (
          <>
            Aufgabenstellung: <br />
            <p className="serlo-highlight-gray">
              y = (x {isPlus ? '+' : '-'} {x_s})<sup>2</sup>{' '}
              {isPlus_2 ? '+' : '-'} {y_s}
            </p>
            <br />
            <br />
            Wende die binomischen Formeln an:
            <br />
            <p className="serlo-highlight-gray">
              y = [ x<sup>2</sup> {isPlus ? '+' : '-'} 2 · {x_s} · x + {x_s}
              <sup>2</sup> ] {isPlus_2 ? '+' : '-'} {y_s}
            </p>
            <br />
            <br />
            Berechne den Mischterm und die Potenz:
            <br />
            <p className="serlo-highlight-gray">
              y = [ x<sup>2</sup> {isPlus ? '+' : '-'} {2 * x_s}x + {x_s * x_s}{' '}
              ] {isPlus_2 ? '+' : '-'} {y_s}
            </p>
            <br />
            <br />
            Fasse den Term zusammen:
            <br />
            <p className="serlo-highlight-green">
              {x_s * x_s - y_s === 0 && !isPlus_2 ? (
                <>
                  y = x<sup>2</sup> {isPlus ? '+' : '-'} {2 * x_s} x
                </>
              ) : (
                <>
                  y = x<sup>2</sup> {isPlus ? '+' : '-'} {2 * x_s} x{' '}
                  {(isPlus && isPlus_2) ||
                  x_s * x_s - y_s > 0 ||
                  (!isPlus && isPlus_2)
                    ? '+'
                    : ''}{' '}
                  {isPlus_2 ? x_s * x_s + y_s : x_s * x_s - y_s}
                </>
              )}
            </p>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ isPlus }) => {
        return (
          <>
            Verwende die binomische Formel:
            <br />
            <p className="serlo-highlight-gray">
              (a {isPlus ? '+' : '-'} b) = a² {isPlus ? '+' : '-'} 2 · a · b +
              b²
            </p>
            <br />
            <br />
            Fasse den Term am Ende zusammen.
          </>
        )
      }}
    />
  )
}
