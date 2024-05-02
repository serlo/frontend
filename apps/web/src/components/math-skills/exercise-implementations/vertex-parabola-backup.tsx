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
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function VertexParabolaBackup() {
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
            <p className="serlo-main-task">
              Bestimme die Scheitelform der Parabel:
            </p>
            <p className="serlo-highlight-green">
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x {isPlus_2 ? '+' : '-'}{' '}
              {c}
            </p>
          </>
        )
      }}
      renderSolution={({ b, isPlus, isPlus_2, c }) => {
        return (
          <>
            Wir formen den Funktionsterm in die Scheitelform um: <br />
            <p className="serlo-highlight-gray">
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x {isPlus_2 ? '+' : '-'}
              {c}
            </p>
            <br />
            <br />
            Wir führen eine quadratische Ergänzung durch. Lies dazu den
            Parameter b im Funktionsterm aus: <br />
            <p className="serlo-highlight-green">
              y = x<sup>2</sup>{' '}
              <strong>
                {isPlus ? '+' : '-'} {b}
              </strong>
              x {isPlus_2 ? '+' : '-'} {c}
            </p>
            <br />
            <br />
            Wir addieren den Term{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-1">
              <span className="inline-block scale-y-[3]">(</span>
              {buildFrac(
                <>
                  <strong>b</strong>
                </>,
                <>2</>
              )}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup> = <span className="inline-block scale-y-[3]">(</span>
              {buildFrac(
                <>
                  <strong>{b}</strong>
                </>,
                <>2</>
              )}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup>
            </span>{' '}
            und subtrahieren ihn zum Schluss wieder:
            <br />
            <p className="serlo-highlight-gray">
              y = x<sup>2</sup>
              {isPlus ? '+' : '-'} <strong>{b}</strong>x +{' '}
              <span className="inline-block scale-y-[3]">(</span>
              {buildFrac(
                <>
                  <strong>{b}</strong>
                </>,
                <>2</>
              )}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup> {isPlus_2 ? '+' : '-'} {c} -{' '}
              <span className="inline-block scale-y-[3] ">(</span>
              {buildFrac(
                <>
                  <strong>{b}</strong>
                </>,
                <>2</>
              )}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup>
            </p>
            <br />
            Wenn man den Mischterm etwas umformt, sieht der Term noch mehr wie
            das Ergebnis einer binomischen Formel aus:
            <br />
            <p className="serlo-highlight-gray">
              y = x<sup>2</sup>
              {isPlus ? '+' : '-'} 2 · x · {buildFrac(<>{b}</>, <>2</>)} +{' '}
              <span className="inline-block scale-y-[3]">(</span>
              {buildFrac(<>{b}</>, <>2</>)}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup> {isPlus_2 ? '+' : '-'} {c} -{' '}
              <span className="inline-block scale-y-[3] ">(</span>
              {buildFrac(<>{b}</>, <>2</>)}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup>
            </p>
            <br />
            <br />
            Den vorderen Teil fassen wir zu diesem Binom zusammen:
            <br />
            <p className="serlo-highlight-gray">
              y = <span className="inline-block scale-y-[3]">(</span>x{' '}
              {isPlus ? '+' : '-'} {buildFrac(<>{b}</>, <>2</>)}{' '}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup> {isPlus_2 ? '+' : '-'} {c} -{' '}
              <span className="inline-block scale-y-[3] ">(</span>
              {buildFrac(
                <>
                  <strong>{b}</strong>
                </>,
                <>2</>
              )}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup>
            </p>
            <br />
            <br />
            Die Zahlen hinter der Klammer werden auch zusammengefasst:
            <br />
            <p className="serlo-highlight-green">
              y = <span className="inline-block scale-y-[1.5]">(</span>x{' '}
              {isPlus ? '+' : '-'} {pp(b / 2)}
              <span className="inline-block scale-y-[1.5]">)</span>
              <sup>2</sup>{' '}
              {c - (b / 2) * (b / 2) === 0 ? (
                <></>
              ) : (
                <>
                  {isPlus_2 && c - (b / 2) * (b / 2) > 0 ? '+' : ''}{' '}
                  {isPlus_2
                    ? pp(c - (b / 2) * (b / 2))
                    : pp(-c - (b / 2) * (b / 2))}
                </>
              )}
            </p>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ b, isPlus, isPlus_2, c }) => {
        return (
          <>
            Lies den Parameter <strong>b</strong> aus dem Funktionsterm ab:
            <br />
            <br />
            <p className="serlo-highlight-green">
              y = x<sup>2</sup>{' '}
              <strong>
                {isPlus ? '+' : '-'} {b}
              </strong>
              x {isPlus_2 ? '+' : '-'} {c}
            </p>
            <br />
            <br />
            Führe eine quadratische Ergänzung durch mit dem Term:
            <br />
            <span className="text-1xl mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-1">
              <span className="inline-block scale-y-[3]">(</span>
              {buildFrac(
                <>
                  <strong>b</strong>
                </>,
                <>2</>
              )}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup> = <span className="inline-block scale-y-[3]">(</span>
              {buildFrac(
                <>
                  <strong>{b}</strong>
                </>,
                <>2</>
              )}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup>
            </span>
            <br />
            <br />
            Schreibe den Funktionsterm als Binom.{' '}
          </>
        )
      }}
    />
  )
}
