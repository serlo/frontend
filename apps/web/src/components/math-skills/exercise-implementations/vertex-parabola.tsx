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

// JXG.Options.label.autoPosition = true

export function VertexParabola() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          b: randomIntBetween(1, 4) * 2,
          c: randomIntBetween(2, 9),
          isPlus: randomItemFromArray([true, false]),
          isPlus_2: randomItemFromArray([true, false]),
        }
      }}
      renderTask={({ b, isPlus, isPlus_2, c }) => {
        return (
          <>
            <MainTask>Bestimmen Sie die Scheitelform der Parabel:</MainTask>
            <HighlightGreen>
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x {isPlus_2 ? '+' : '-'}{' '}
              {c}
            </HighlightGreen>
          </>
        )
      }}
      renderSolution={({ b, isPlus, isPlus_2, c }) => {
        const plusminusTerm = (b / 2) * (b / 2)
        const cAlsZahl = c * (isPlus_2 ? 1 : -1)
        const d = cAlsZahl - plusminusTerm

        const dAlsJsx = (
          <>
            {d > 0 ? '+' : '-'} {Math.abs(d)}
          </>
        )

        return (
          <>
            <p>TODO: Nutze direkte Lösungsformel</p>
            Damit lautet die Scheitelform: <br />
            <HighlightGreen>
              y = <span className="inline-block scale-y-[1.5]">(</span>x{' '}
              {isPlus ? '+' : '-'} {(b / 2).toString().replace('.', ',')}
              <span className="inline-block scale-y-[1.5]">)</span>
              <sup>2</sup> <strong>{dAlsJsx}</strong>
            </HighlightGreen>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ b, isPlus, isPlus_2, c }) => {
        if (isPlus_2 && c === (b / 2) * (b / 2))
          return (
            <>
              Schreibe den Funktionsterm in die Scheitelform:
              <HighlightGray>
                y = (x - ☐)<sup>2</sup> + ☐
              </HighlightGray>
              <br />
              <br />
              Bestimme dazu zuerst, welcher Wert im Binom stehen muss, um den
              richtigen Mischterm zu ergeben:
              <br />
              <HighlightGray>
                y = x<sup>2</sup> {isPlus ? '+' : '-'} <strong>{b}</strong>x{' '}
                {isPlus_2 ? '+' : '-'}
                {c}
              </HighlightGray>
              <br />
              <br />
              Begründe, warum im zweiten Kästchen eine 0 stehen muss.
            </>
          )
        return (
          <>
            Schreibe den Funktionsterm in die Scheitelform:
            <HighlightGray>
              y = (x - ☐)<sup>2</sup> + ☐
            </HighlightGray>
            <br />
            <br />
            Bestimme dazu zuerst, welcher Wert im Binom stehen muss, um den
            richtigen Mischterm zu ergeben:
            <br />
            <HighlightGray>
              y = x<sup>2</sup> {isPlus ? '+' : '-'} <strong>{b}</strong>x{' '}
              {isPlus_2 ? '+' : '-'}
              {c}
            </HighlightGray>
            <br />
            <br />
            Mache eine Probe und rechne das Binom aus, um zu bestimmen, was der
            Wert des zweiten Kästchens sein muss.
          </>
        )
      }}
      centAmount={35}
    />
  )
}
