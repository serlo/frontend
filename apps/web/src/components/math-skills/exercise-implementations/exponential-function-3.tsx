import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { HighlightGray, HighlightGreen } from '../components/content-components'
import { buildBlock } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

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
      renderTask={({ a, b, sign, sol }) => {
        const power = Math.pow(b, sol)
        return (
          <>
            <p className="mb-8 text-2xl">
              Lösen Sie die Gleichung:
              <br />
              <HighlightGreen>
                0 = {sign ? '(' : null}
                {sign ? '-' : null} {a}
                {sign ? ')' : null} · {b}
                <sup>x</sup> {sign ? '+' : '-'} {power * a}
              </HighlightGreen>
            </p>

            <p>
              <i>Rechne am besten mit Stift und Papier.</i>
            </p>
          </>
        )
      }}
      renderSolution={({ a, b, sol, sign }) => {
        const power = Math.pow(b, sol)
        return (
          <>
            <p>
              {sign ? 'Subtrahiere' : 'Addiere'} auf beiden Seiten{' '}
              <span className="text-1xl inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {power * a}
              </span>{' '}
              und teile beide Seiten durch{' '}
              <span className="text-1xl inline-block rounded-md bg-yellow bg-opacity-20 p-1 px-3">
                {sign ? '-' : null} {a}
              </span>{' '}
              um die Gleichung zu vereinfachen:
            </p>
            {buildBlock(
              'gray',
              <>
                0 = {sign ? '(' : null}
                {sign ? '-' : null} {a}
                {sign ? ')' : null} · {b}
                <sup>x</sup> {sign ? '+' : '-'} {power * a}&nbsp;&nbsp;&nbsp;|{' '}
                {sign ? '-' : '+'} {power * a}
                <br />⇔ {sign ? '-' : null} {power * a}= {sign ? '(' : null}
                {sign ? '-' : null} {a}
                {sign ? ')' : null} · {b}
                <sup>x</sup>&nbsp;&nbsp;&nbsp;| : {sign ? '(' : null}
                {sign ? '-' : null}
                {a}
                {sign ? ')' : null}
                <br />⇔ {power} = {b}
                <sup>x</sup>
              </>
            )}
            <p>
              Die Gleichung lässt sich als Frage umformulieren: Wie oft müsste
              man {b} mit sich selbst multiplizieren, damit {power} herauskommt?
            </p>
            <p className="mt-4">
              Löse diese Frage (probiere verschiedene Möglichkeiten im Kopf aus)
              und erhalte die Antwort:
            </p>
            {buildBlock('green', <>x = {sol}</>)}
          </>
        )
      }}
      renderHint={({ b, sol }) => {
        const power = Math.pow(b, sol)
        return (
          <>
            Stelle diese Gleichung um, sodass auf einer Seite nur noch die
            Potenz steht.
            <br />
            <HighlightGray>
              {power} = {b}
              <sup>x</sup>
            </HighlightGray>
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
