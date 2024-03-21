/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

export function ModellingParabola() {
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
            <h2 className="text-2xl">Bestimme die Scheitelform der Parabel:</h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x {isPlus_2 ? '+' : '-'}{' '}
              {c}
            </span>

            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
          </>
        )
      }}
      renderSolution={({ b, isPlus, isPlus_2, c }) => {
        return (
          <>
            Aufgabenstellung: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = x<sup>2</sup> {isPlus ? '+' : '-'} {b}x {isPlus_2 ? '+' : '-'}
              {c}
            </span>
            <br />
            <br />
            Wir führen eine quadratische Ergänzung durch. <br />
            Dazu addieren wir den Term{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-1">
              <span className="inline-block scale-y-[3]">(</span>
              {buildFrac(<>{b}</>, <>2</>)}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup>
            </span>{' '}
            und subtrahieren ihn zum Schluss wieder:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = x<sup>2</sup>
              {isPlus ? '+' : '-'} {b}x +{' '}
              <span className="inline-block scale-y-[3]">(</span>
              {buildFrac(<>{b}</>, <>2</>)}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup> {isPlus_2 ? '+' : '-'} {c} -{' '}
              <span className="inline-block scale-y-[3] ">(</span>
              {buildFrac(<>{b}</>, <>2</>)}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup>
            </span>
            <br />
            <br />
            Den vorderen Teil fassen wir zu einem Binom Zusammen:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = <span className="inline-block scale-y-[3]">(</span>x{' '}
              {isPlus ? '+' : '-'} {buildFrac(<>{b}</>, <>2</>)}{' '}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup> {isPlus_2 ? '+' : '-'} {c} -{' '}
              <span className="inline-block scale-y-[3] ">(</span>
              {buildFrac(<>{b}</>, <>2</>)}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup>
            </span>
            <br />
            <br />
            Die Zahlen hinter der Klammer werden auch zusammengefasst:
            <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = <span className="inline-block scale-y-[1.5]">(</span>x{' '}
              {isPlus ? '+' : '-'} {(b / 2).toString().replace('.', ',')}
              <span className="inline-block scale-y-[1.5]">)</span>
              <sup>2</sup>{' '}
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
            </span>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ b }) => {
        return (
          <>
            Führe eine quadratische Ergänzung durch mit dem Term:
            <br />
            <span className="text-1xl mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-1">
              <span className="inline-block scale-y-[3]">(</span>
              {buildFrac(<>{b}</>, <>2</>)}
              <span className="inline-block scale-y-[3]">)</span>
              <sup>2</sup>
            </span>
            <br />
            <br />
            Fasse den vorderen Teil des Terms zu einem Binom zusammen.
          </>
        )
      }}
      centAmount={35}
    />
  )
}
