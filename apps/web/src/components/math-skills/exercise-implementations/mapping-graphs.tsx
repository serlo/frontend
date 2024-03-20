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
}

export function AbbildungGraphen() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const a = randomItemFromArray([-1, 1, 2])
        const b = randomIntBetween(-3, 3)
        const c = randomIntBetween(-4, -1)
        const d = randomIntBetween(-4, 4)
        const x_reflect = randomItemFromArray([true, true, false])
        const y_reflect = randomItemFromArray([true, true, true, false])
        const x_offset = randomIntBetween(0, 4)
        const x_dir = randomItemFromArray(['links', 'rechts'])
        const y_dir = randomItemFromArray(['oben', 'unten'])
        const y_offset = randomIntBetween(0, 4)
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
        }
        return { data }
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderTask={({ data }) => {
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
                {data.y_reflect === true
                  ? '· Der Graph von f wird an der x-Achse gespiegelt.'
                  : null}{' '}
              </li>
              <li>
                {data.x_reflect === true
                  ? '· Der Graph von f wird an der y-Achse gespiegelt.'
                  : null}{' '}
              </li>
              <li>
                {data.x_offset !== 0
                  ? '· Der Graph von f wird um ' +
                    data.x_offset +
                    ' nach ' +
                    data.x_dir +
                    ' verschoben.'
                  : null}{' '}
              </li>
              <li>
                {data.y_offset !== 0
                  ? '· Der Graph von f wird um ' +
                    data.y_offset +
                    ' nach ' +
                    data.y_dir +
                    ' verschoben.'
                  : null}{' '}
              </li>
            </ol>
            <br />
            <i>Rechne am Besten mit Stift und Papier.</i>
          </>
        )
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderSolution={({ data }) => {
        const Nenner_Faktor = Math.pow(-1, data.c)
        if (data.x_reflect === true)
          return (
            <>
              Der Graph von <i>f</i> wird an der y-Achse gespielt. Wir ersetzen
              &quot;x&quot; durch &quot;-x&quot;:
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
              <br />
              <br />
              Zieht man das Minus aus dem Nenner ergibt sich der Term:
              <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = {data.a === -1 ? '-' : null}{' '}
                {buildFrac(
                  <>{data.a !== -1 ? data.a : -data.a}</>,
                  <>
                    (-1)<sup>{data.c !== -1 ? -data.c : null}</sup> ·{' '}
                    {data.b === 0 || data.c === -1 ? null : '('}x{' '}
                    {data.b < 0 ? '+' : null} {data.b !== 0 ? -data.b : null}
                    {data.b === 0 || data.c === -1 ? null : ')'}
                    <sup>{data.c !== -1 ? -data.c : null}</sup>
                  </>
                )}{' '}
                {data.d > 0 && data.d !== 0 ? '+' : null}{' '}
                {data.d !== 0 ? data.d : null}
              </span>
              <br />
              <br />
              Vereinfacht:
              <br />
              <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y ={' '}
                {data.a === -1 || (data.a === 1 && Nenner_Faktor === -1)
                  ? '-'
                  : null}{' '}
                {buildFrac(
                  <>{data.a !== -1 ? data.a : -data.a}</>,
                  <>
                    {' '}
                    {data.b === 0 || data.c === -1 ? null : '('}x{' '}
                    {data.b < 0 ? '+' : null} {data.b !== 0 ? -data.b : null}
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
