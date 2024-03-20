/* eslint-disable no-empty-pattern */
import { SelfEvaluationExercise } from './self-evaluation-exercise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { buildFrac } from '../utils/math-builder'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomIntBetween } from '@/helper/random-int-between'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { randomItemFromArray } from '@/helper/random-item-from-array'

// JXG.Options.label.autoPosition = true

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PlotData {
  a: number
  b: number
  c: number
  d: number
  x_reflect: boolean
  y_reflect: boolean
  x_offset: number
  y_offset: number
  x_dir: string
  y_dir: string
  function_type: number
  isPlus: boolean
  isPlus2: boolean
  x_s: number
  y_s: number
  Anfangswert: number
  exp_offset: number
  Faktor: number
}

export function AbbildungGraphen() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-1, 1, 2])
        const b = randomIntBetween(-3, 3)
        const c = randomIntBetween(-4, -1)
        const d = randomIntBetween(-4, 4)
        const x_reflect = randomItemFromArray([true, false, false])
        const y_reflect = randomItemFromArray([true, false, false])
        const x_offset = randomIntBetween(1, 7)
        const x_dir = randomItemFromArray(['links', 'rechts'])
        const y_dir = randomItemFromArray(['oben', 'unten'])
        const y_offset = randomIntBetween(1, 7)
        const function_type = randomIntBetween(1, 3)
        const isPlus = randomItemFromArray([true, false])
        const isPlus2 = randomItemFromArray([true, false])
        const x_s = randomIntBetween(1, 9)
        const y_s = randomIntBetween(1, 9)
        const Anfangswert = randomIntBetween(10, 90) * 10
        const exp_offset = randomIntBetween(1, 6)
        const Faktor = randomIntBetween(1, 8) / 100 + 1
        const data: PlotData = {
          a,
          b,
          c,
          d,
          x_reflect,
          y_reflect,
          x_offset,
          y_offset,
          x_dir,
          y_dir,
          function_type,
          isPlus,
          isPlus2,
          x_s,
          y_s,
          Anfangswert,
          exp_offset,
          Faktor,
        }
        return { data }
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTask={({ data }) => {
        if (data.function_type === 1)
          return (
            <>
              <h2 className="text-2xl">Bestimme den Graphen der Funktion g.</h2>
              <br />
              Der Graph der Funktion <i>f</i>
              <br />
              <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                y = {data.a === -1 ? '-' : null}{' '}
                {buildFrac(
                  <>{data.a !== -1 ? data.a : -data.a}</>,
                  <>
                    {data.b === 0 || data.c === -1 ? null : '('}x{' '}
                    {data.b > 0 ? '+' : null} {data.b !== 0 ? data.b : null}
                    {data.b === 0 || data.c === -1 ? null : ')'}
                    <sup>{data.c !== -1 ? -data.c : null}</sup>
                  </>
                )}{' '}
                {data.d > 0 && data.d !== 0 ? '+' : null}{' '}
                {data.d !== 0 ? data.d : null}
              </span>
              <br />
              <br />
              wird durch folgende Abbildungen auf den Graphen von <i>g</i>{' '}
              abgebildet:
              <br />
              <br />
              <ol>
                <li>
                  · Der Graph von f wird um {data.x_offset} Einheiten nach{' '}
                  {data.x_dir} verschoben.
                </li>
                <li>
                  · Der Graph von f wird um {data.y_offset} Einheiten nach{' '}
                  {data.y_dir} verschoben.
                </li>
              </ol>
              <br />
              <i>Rechne am Besten mit Stift und Papier.</i>
            </>
          )
        if (data.function_type === 2)
          return (
            <>
              <h2 className="text-2xl">Bestimme den Graphen der Funktion g.</h2>
              <br />
              Der Graph der Funktion <i>f</i>
              <br />
              <span className="mt-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                y = {data.isPlus === true ? null : '-'} (x{' '}
                {data.isPlus ? '+' : '-'} {data.x_s})<sup>2</sup>{' '}
                {data.isPlus2 ? '+' : '-'} {data.y_s}
              </span>
              <br />
              <br />
              wird durch folgende Verschiebungen auf den Graphen von <i>
                g
              </i>{' '}
              abgebildet:
              <br />
              <br />
              <ol>
                <li>
                  · Der Graph von f wird um {data.x_offset} Einheiten nach{' '}
                  {data.x_dir} verschoben.
                </li>
                <li>
                  · Der Graph von f wird um {data.y_offset} Einheiten nach{' '}
                  {data.y_dir} verschoben.
                </li>
              </ol>
              <br />
              <i>Rechne am Besten mit Stift und Papier.</i>
            </>
          )
        if (data.function_type === 3)
          return (
            <>
              <h2 className="text-2xl">Bestimme den Graphen der Funktion g.</h2>
              <br />
              Der Graph der Funktion <i>f</i>
              <br />
              <span className="my-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                y = {data.Anfangswert} ·{' '}
                {data.Faktor.toString().replace('.', ',')}
                <sup>x</sup> {data.isPlus === true ? '+' : '-'}{' '}
                {data.exp_offset}
              </span>
              <br />
              <br />
              wird durch folgende Abbildungen auf den Graphen von <i>g</i>{' '}
              abgebildet:
              <br />
              <br />
              <ol>
                <li>
                  · Der Graph von f wird um {data.x_offset} Einheiten nach{' '}
                  {data.x_dir} verschoben.
                </li>
                <li>
                  · Der Graph von f wird um {data.y_offset} Einheiten nach{' '}
                  {data.y_dir} verschoben.
                </li>
              </ol>
              <br />
              <i>Rechne am Besten mit Stift und Papier.</i>
            </>
          )
        return <></>
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderSolution={({ data }) => {
        if (data.function_type === 1)
          return (
            <>
              Der Funktionsterm von <i>g</i> lautet:
              <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = {data.a === -1 ? '-' : null}{' '}
                {buildFrac(
                  <>{data.a !== -1 ? data.a : -data.a}</>,
                  <>
                    {data.b === 0 || data.c === -1 ? null : '('}-x{' '}
                    {data.b > 0 ? '+' : null} {data.b !== 0 ? data.b : null}
                    {data.b === 0 || data.c === -1 ? null : ')'}
                    <sup>{data.c !== -1 ? -data.c : null}</sup>
                  </>
                )}{' '}
                {data.d > 0 && data.d !== 0 ? '+' : null}{' '}
                {data.d !== 0 ? data.d : null}
              </span>
            </>
          )

        return <></>
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderHint={({ data }) => {
        return <></>
      }}
      centAmount={35}
    />
  )
}
