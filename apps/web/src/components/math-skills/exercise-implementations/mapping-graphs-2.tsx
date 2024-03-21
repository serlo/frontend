/* eslint-disable @typescript-eslint/no-unused-vars */
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
  x_s: number
  y_s: number
  Anfangswert: number
  exp_offset: number
  Faktor: number
}

export function AbbildungGraphen2() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-1, 1, 2])
        const b = randomIntBetween(-3, 3)
        const c = randomIntBetween(-4, -1)
        const d = randomIntBetween(-4, 4)
        const x_reflect = randomItemFromArray([true])
        const y_reflect = randomItemFromArray([true, false])
        const x_offset = randomIntBetween(1, 7)
        const x_dir = randomItemFromArray(['links', 'rechts'])
        const y_dir = randomItemFromArray(['oben', 'unten'])
        const y_offset = randomIntBetween(1, 7)
        const function_type = randomIntBetween(1, 3)
        const x_s = randomIntBetween(-9, 9)
        const y_s = randomIntBetween(-9, 9)
        const Anfangswert = randomIntBetween(10, 90) * 10
        const exp_offset = randomIntBetween(-6, 6)
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
              wird auf den Graphen von <i>g</i> abgebildet:
              <br />
              <br />
              <ol>
                <li>
                  {data.x_reflect === true
                    ? '· Der Graph von f wird an der x-Achse gespiegelt.'
                    : null}
                </li>
                <li>
                  {data.y_reflect === true
                    ? '· Der Graph von f wird zusätzlich an der y-Achse gespiegelt.'
                    : null}
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
                y = {data.x_s !== 0 ? '(' : null}x{data.x_s > 0 ? '+ ' : null}
                {data.x_s === 0 ? null : null}
                {data.x_s !== 0 ? data.x_s : null}
                {data.x_s !== 0 ? ')' : null}
                <sup>2</sup> {data.y_s > 0 ? '+ ' + data.y_s : null}
                {data.y_s === 0 ? null : null}
                {data.y_s < 0 ? data.y_s : null}
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
                <sup>x</sup>
                {data.exp_offset > 0 ? '+ ' + data.exp_offset : null}
                {data.exp_offset === 0 ? null : null}{' '}
                {data.exp_offset < 0 ? data.exp_offset : null}
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
        const x_Ende_1 = data.b + data.x_offset
        const x_Ende_2 = data.b - data.x_offset
        const y_Ende_1 = data.d + data.y_offset
        const y_Ende_2 = data.d - data.y_offset

        if (data.function_type === 1) return <></>
        if (data.function_type === 2) return <></>
        if (data.function_type === 3) return <></>
        return <></>
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderHint={({ data }) => {
        return (
          <>
            Für eine Spiegelung an der x-Achse wird der Funktionsterm mit (-1)
            multipliziert:
            <br />
            <br />
            Beispiel:
            <br />
            <span className="my-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = (x - 2)<sup>2</sup> + 1 ↦ y = (-1) · ((x - 2)<sup>2</sup> + 1)
            </span>
            <br />
            Vereinfache anschließend den Term.
            <br />
            <br />
            F+r eine Spiegelung an der y-Achse wird &quot;x&quot; durch
            &quot;-x&quot; ersetzt:
            <br />
            <br />
            Beispiel:
            <br />
            <span className="my-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = 20 · 2<sup>x</sup> + 5 ↦ y = 20 · 2<sup>-x</sup> + 5
            </span>
            <br />
            Vereinfache anschließend den Term.
          </>
        )
      }}
      centAmount={35}
    />
  )
}
