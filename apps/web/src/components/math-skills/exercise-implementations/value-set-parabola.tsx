/* eslint-disable @typescript-eslint/no-unused-vars */
import JXG from 'jsxgraph'
import { useEffect, useState } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

export function ValueSetParabola() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {
          a: randomItemFromArray([true, false]),
          b: randomIntBetween(-9, 9),
          c: randomIntBetween(-9, 9),
        }
      }}
      renderTask={({ a, b, c }) => {
        return (
          <>
            <h2 className="text-2xl">Bestimme die Wertemenge der Parabel:</h2>
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = {a ? null : '-'} x<sup>2</sup> + bx + c
            </span>
            <br />
            <br />
            Der Scheitelpunkt der Parabel ist gegeben durch:{' '}
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              S({b}|{c})
            </span>
            <br />
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
          </>
        )
      }}
      renderSolution={({ a, b, c }) => {
        return (
          <>
            Wertemenge der Parabel: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = {a ? null : '-'} x<sup>2</sup> + bx + c
            </span>
            <br />
            <br />
            Wir schreiben die Parabel in der Scheitelpunktform:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = {a ? null : '-'} (x - {b < 0 ? '(' : null}
              {b}
              {b < 0 ? ')' : null})<sup>2</sup> +{c < 0 ? '(' : null} {a}
              {c < 0 ? ')' : null}
            </span>
            <br />
            <br />
            Zusammengefasst: <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y = {a ? null : '-'} (x {b > 0 ? '- ' + b : '+ ' + -b})
              <sup>2</sup> {c > 0 ? '+ ' + c : null}
              {c < 0 ? '- ' + -c : null}
            </span>
            <br />
            <br />
            Da die Parabel nach {a === true ? 'oben' : 'unten'} geöfnet ist, ist
            der Wertebereich die Menge der reellen Zahlen{' '}
            {a === true ? 'oberhalb' : 'unterhalb'} des Scheitels:
            <br />
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              W = {'{'} y | y {a === true ? '≥' : '≤'}{' '}
              {c > 0 && c !== 0 ? c : '- ' + -c} {'}'}
            </span>
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ a, c, b }) => {
        return (
          <>
            Für den Wertebereich untersuchen wir den Öffnungsfaktor und den
            y-Wert des Scheitel der Parabel:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              y =
            </span>
            <span className="mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3 text-2xl">
              {a ? '1 · ' : '(-1) · '}{' '}
            </span>
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              (x {b > 0 && b !== 0 ? '- ' + b : '+ ' + -b})<sup>2</sup>{' '}
            </span>
            <span className="mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3 text-2xl">
              {c > 0 && c !== 0 ? '+ ' + c : '- ' + -c}
            </span>
            <br />
            <br />
            Der Öffnungsfaktor entscheidet darüber, ob alle Werte oberhalb oder
            unterhalb des Scheitels von der Funktion angenommen werden.
            <br />
            <br />
            Die y-Koordinate des Scheitels gibt die Grenze zum Wertebereich vor.
          </>
        )
      }}
      centAmount={35}
    />
  )
}
