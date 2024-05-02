/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  MainTask,
  HighlightGreen,
  HighlightGray,
} from '../components/content-components'
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
            <MainTask>Bestimmen Sie die Normalform der Parabel:</MainTask>
            <HighlightGreen>
              y = (x {isPlus ? '+' : '-'} {x_s})<sup>2</sup>{' '}
              {isPlus_2 ? '+' : '-'} {y_s}
            </HighlightGreen>
          </>
        )
      }}
      renderSolution={({ x_s, isPlus, isPlus_2, y_s }) => {
        return (
          <>
            Aufgabenstellung: <br />
            <HighlightGray>
              y = (x {isPlus ? '+' : '-'} {x_s})<sup>2</sup>{' '}
              {isPlus_2 ? '+' : '-'} {y_s}
            </HighlightGray>
            <br />
            <br />
            Wende die binomischen Formeln an:
            <br />
            <HighlightGray>
              y = [ x<sup>2</sup> {isPlus ? '+' : '-'} 2 · {x_s} · x + {x_s}
              <sup>2</sup> ] {isPlus_2 ? '+' : '-'} {y_s}
            </HighlightGray>
            <br />
            <br />
            Berechne den Mischterm und die Potenz:
            <br />
            <HighlightGray>
              y = [ x<sup>2</sup> {isPlus ? '+' : '-'} {2 * x_s}x + {x_s * x_s}{' '}
              ] {isPlus_2 ? '+' : '-'} {y_s}
            </HighlightGray>
            <br />
            <br />
            Fasse den Term zusammen:
            <br />
            <HighlightGreen>
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
            </HighlightGreen>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ isPlus }) => {
        return (
          <>
            Verwende die binomische Formel:
            <br />
            <HighlightGray>
              (a {isPlus ? '+' : '-'} b) = a² {isPlus ? '+' : '-'} 2 · a · b +
              b²
            </HighlightGray>
            <br />
            <br />
            Fasse den Term am Ende zusammen.
          </>
        )
      }}
    />
  )
}
