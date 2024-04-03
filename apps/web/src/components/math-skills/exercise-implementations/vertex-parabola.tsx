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
          b: randomIntBetween(2, 9),
          c: randomIntBetween(2, 9),
          isPlus: randomItemFromArray([true, false]),
          isPlus_2: randomItemFromArray([true, false]),
        }
      }}
      renderTask={({ b, isPlus, isPlus_2, c }) => {
        return (
          <>
            <MainTask>Bestimme die Scheitelform der Parabel:</MainTask>
            <HighlightGreen>
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x {isPlus_2 ? '+' : '-'}{' '}
              {c}
            </HighlightGreen>
          </>
        )
      }}
      renderSolution={({ b, isPlus, isPlus_2, c }) => {
        if (isPlus_2 && c === (b / 2) * (b / 2))
          return (
            <>
              Wir formen den Funktionsterm in die Scheitelform um: <br />
              <HighlightGray>
                y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x{' '}
                {isPlus_2 ? '+' : '-'}
                {c}
              </HighlightGray>
              <br />
              <br />
              Die Scheitelform der Funktion hat die Form
              <br />
              <HighlightGray>
                y = (x - ☐)<sup>2</sup> + ☐
              </HighlightGray>
              <br />
              <br />
              wobei in den Kästchen die passenden Werte stehen müssen.
              <br />
              <br />
              <MainTask>Wert im ersten Kästchen</MainTask>
              <br />
              Damit aus dem Binom der richtige Mischterm entsteht, muss aus dem
              Funktionsterm
              <br />
              <HighlightGray>
                y = x<sup>2</sup> {isPlus ? '+' : '-'} 2 · x ·{' '}
                <strong>{b / 2}</strong> {isPlus_2 ? '+' : '-'}
                {c}
              </HighlightGray>
              <br />
              <br />
              in das Binom eingesetzt werden:
              <br />
              <HighlightGray>
                y = (x - <strong>{b / 2}</strong>)<sup>2</sup> + ☐
              </HighlightGray>
              <br />
              <br />
              <MainTask>Wert im zweiten Kästchen</MainTask>
              <br />
              Würden wir das Binom wieder ausschreiben, erhalten wir bereits den
              richtigen Funktionsterm wieder:
              <br />
              <HighlightGray>
                y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x{' '}
                {isPlus_2 ? '+' : '-'}
                {c}
              </HighlightGray>
              <br />
              <br />
              Der Wert im zweiten Kästchen ist damit <strong>0</strong>. Das ist
              ein Spezialfall!
            </>
          )
        return (
          <>
            Wir formen den Funktionsterm in die Scheitelform um: <br />
            <HighlightGray>
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x {isPlus_2 ? '+' : '-'}
              {c}
            </HighlightGray>
            <br />
            <br />
            Die Scheitelform der Funktion hat die Form
            <br />
            <HighlightGray>
              y = (x - ☐)<sup>2</sup> + ☐
            </HighlightGray>
            <br />
            <br />
            wobei in den Kästchen die passenden Werte stehen müssen.
            <br />
            <br />
            <MainTask>Wert im ersten Kästchen</MainTask>
            <br />
            Damit aus dem Binom der richtige Mischterm entsteht, muss aus dem
            Funktionsterm
            <br />
            <HighlightGray>
              y = x<sup>2</sup> {isPlus ? '+' : '-'} 2 · x ·{' '}
              <strong>{b / 2}</strong> {isPlus_2 ? '+' : '-'}
              {c}
            </HighlightGray>
            <br />
            <br />
            in das Binom eingesetzt werden:
            <br />
            <HighlightGray>
              y = (x - <strong>{b / 2}</strong>)<sup>2</sup> + ☐
            </HighlightGray>
            <br />
            <br />
            <MainTask>Wert im zweiten Kästchen</MainTask>
            <br />
            Würden wir das Binom so stehen lassen, wäre der Term am Ende nicht
            immer der gleiche wie im ursprünglichen Funktionsterm:
            <br />
            <HighlightGray>
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x + {(b / 2) * (b / 2)}{' '}
              + ☐
            </HighlightGray>
            <br />
            <br />
            Damit am Ende{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              {isPlus_2 ? '+' : '-'}
              {c}
            </span>{' '}
            steht, müssen wir mit dem richtigen Wert korrigieren:
            <br />
            <HighlightGray>
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x + {(b / 2) * (b / 2)}{' '}
              <strong>
                {c - (b / 2) * (b / 2) === 0 ? (
                  <></>
                ) : (
                  <>
                    {isPlus_2 && c - (b / 2) * (b / 2) > 0 ? '+' : ''}{' '}
                    {isPlus_2
                      ? (c - (b / 2) * (b / 2)).toString().replace('.', ',')
                      : (-c - (b / 2) * (b / 2)).toString().replace('.', ',')}
                  </>
                )}
              </strong>{' '}
            </HighlightGray>
            <br />
            <br />
            Damit ist die richtige Scheitelform: <br />
            <HighlightGreen>
              y = <span className="inline-block scale-y-[1.5]">(</span>x{' '}
              {isPlus ? '+' : '-'} {(b / 2).toString().replace('.', ',')}
              <span className="inline-block scale-y-[1.5]">)</span>
              <sup>2</sup>{' '}
              <strong>
                {c - (b / 2) * (b / 2) === 0 ? (
                  <></>
                ) : (
                  <>
                    {isPlus_2 && c - (b / 2) * (b / 2) > 0 ? '+' : ''}{' '}
                    {isPlus_2
                      ? (c - (b / 2) * (b / 2)).toString().replace('.', ',')
                      : (-c - (b / 2) * (b / 2)).toString().replace('.', ',')}
                  </>
                )}
              </strong>
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
