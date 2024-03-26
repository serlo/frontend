import { SelfEvaluationExercise } from './self-evaluation-exercise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { buildFrac } from '../utils/math-builder'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomIntBetween } from '@/helper/random-int-between'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

export function ExponentialEquation() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const sign = randomItemFromArray([true, false])
        const a = randomIntBetween(2, 3)
        const b = randomIntBetween(2, 4)
        const sol = randomIntBetween(1, 5)
        return { a, b, sign, sol }
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
      renderTask={({ a, b, sign, sol }) => {
        const power = Math.pow(b, sol)
        return (
          <>
            <p className="mb-8 text-2xl">
              Berechne die Nullstelle der Funktion
              <br />
              <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                y = {sign ? '-' : null} {a} · {b}
                <sup>x</sup> {sign ? '+' : '-'} {power * a}
              </span>
            </p>

            <p>
              <i>Rechne am besten mit Stift und Papier.</i>
            </p>
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
      renderSolution={({ a, b, sol, sign }) => {
        const power = Math.pow(b, sol)
        return (
          <>
            Wir setzen den Funktionsterm gleich 0 und lösen die Gleichung:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              0 = {sign ? '-' : null} {a} · {b}
              <sup>x</sup> {sign ? '+' : '-'} {power * a}
            </span>{' '}
            <br />
            Wir {sign ? 'subtrahieren ' : 'addieren '}auf beiden Seiten{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              {power * a}
            </span>
            :<br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {sign ? '-' : null} {power * a} = {sign ? '-' : null} {a} · {b}
              <sup>x</sup>
            </span>
            <br />
            Um die Gleichung weiter zu vereinfachen, teilen wir beide Seiten
            durch{' '}
            <span className="text-1xl mt-3 inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
              {sign ? '-' : null} {a}
            </span>
            :<br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {power} = {b}
              <sup>x</sup>
            </span>
            <br />
            <br />
            Die Gleichung lässt sich als Frage umformulieren:
            <br /> Wie oft müsste man {b} mit sich selbst multiplizieren, damit{' '}
            {power} herauskommt?
            <br />
            Die Lösung ist:{' '}
            <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              x = {sol}
            </span>
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
      renderHint={({ a, b, sign, sol }) => {
        const power = Math.pow(b, sol)
        return (
          <>
            Um die Nullstellen zu berechnen, muss der Funktionsterm gleich 0
            gesetzt werden:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              0 = {sign ? '-' : null} {a} · {b}
              <sup>x</sup> {sign ? '+' : '-'} {power * a}
            </span>
            <br />
            <br />
            Stelle diese Gleichung um, sodass auf einer Seite nur noch die
            Potenz steht.
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              {power} = {b}
              <sup>x</sup>
            </span>
            <br />
            <br />
            Die Gleichung lässt sich als Frage umformulieren:
            <br /> Wie oft müsste man {b} mit sich selbst multiplizieren, damit{' '}
            {power} herauskommt?
          </>
        )
      }}
      centAmount={35}
    />
  )
}
