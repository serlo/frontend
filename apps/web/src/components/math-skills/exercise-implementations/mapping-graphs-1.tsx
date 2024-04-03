/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
import { SelfEvaluationExercise } from './self-evaluation-exercise'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  MainTask,
  HighlightGreen,
  HighlightGray,
} from '../components/content-components'
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
              <MainTask>Bestimme den Graphen der Funktion g.</MainTask>
              <br />
              Der Graph der Funktion <i>f</i>
              <br />
              <HighlightGreen>
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
              </HighlightGreen>
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
              </ol>{' '}
            </>
          )
        if (data.function_type === 2)
          return (
            <>
              <MainTask>Bestimme den Graphen der Funktion g.</MainTask>
              <br />
              Der Graph der Funktion <i>f</i>
              <br />
              <HighlightGreen>
                y = {data.x_s !== 0 ? '(' : null}x{data.x_s > 0 ? '+ ' : null}
                {data.x_s === 0 ? null : null}
                {data.x_s !== 0 ? data.x_s : null}
                {data.x_s !== 0 ? ')' : null}
                <sup>2</sup> {data.y_s > 0 ? '+ ' + data.y_s : null}
                {data.y_s === 0 ? null : null}
                {data.y_s < 0 ? data.y_s : null}
              </HighlightGreen>
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
            </>
          )
        if (data.function_type === 3)
          return (
            <>
              <MainTask>Bestimme den Graphen der Funktion g.</MainTask>
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
              </ol>{' '}
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

        if (data.function_type === 1)
          return (
            <>
              Der Funktionsterm von <i>g</i> lautet:
              <br />
              <HighlightGray>
                y = {data.a === -1 ? '-' : null}{' '}
                {buildFrac(
                  <>{data.a !== -1 ? data.a : -data.a}</>,
                  <>
                    {data.b === 0 || data.c === -1 ? null : '('}x{' '}
                    {data.b > 0 ? '+' : null} {data.b !== 0 ? data.b : null}{' '}
                    {data.x_dir === 'links'
                      ? '+ ' + data.x_offset
                      : '- ' + data.x_offset}
                    {data.b === 0 || data.c === -1 ? null : ')'}
                    <sup>{data.c !== -1 ? -data.c : null}</sup>
                  </>
                )}{' '}
                {data.d > 0 && data.d !== 0 ? '+' : null}{' '}
                {data.d !== 0 ? data.d : null}{' '}
                {data.y_dir === 'oben'
                  ? '+ ' + data.y_offset
                  : '- ' + data.y_offset}
              </HighlightGray>
              <br />
              <br />
              Zusammengefasst:
              <br />
              <HighlightGreen>
                y = {data.a === -1 ? '-' : null}{' '}
                {buildFrac(
                  <>{data.a !== -1 ? data.a : -data.a}</>,
                  <>
                    {data.b === 0 || data.c === -1 ? null : '('}x{' '}
                    {data.x_dir === 'links' && x_Ende_1 > 0
                      ? '+ ' + x_Ende_1
                      : null}
                    {data.x_dir === 'links' && x_Ende_1 === 0 ? null : null}
                    {data.x_dir === 'links' && x_Ende_1 < 0
                      ? '- ' + x_Ende_1
                      : null}
                    {data.x_dir === 'rechts' && x_Ende_2 > 0
                      ? '+ ' + x_Ende_2
                      : null}
                    {data.x_dir === 'rechts' && x_Ende_2 === 0 ? null : null}
                    {data.x_dir === 'rechts' && x_Ende_2 < 0
                      ? ' ' + x_Ende_2
                      : null}
                    {data.b === 0 || data.c === -1 ? null : ')'}
                    <sup>{data.c !== -1 ? -data.c : null}</sup>
                  </>
                )}{' '}
                {data.y_dir === 'oben' && y_Ende_1 > 0 ? '+ ' + y_Ende_1 : null}
                {data.y_dir === 'oben' && y_Ende_1 === 0 ? null : null}
                {data.y_dir === 'oben' && y_Ende_1 < 0 ? ' ' + y_Ende_1 : null}
                {data.y_dir === 'unten' && y_Ende_2 > 0
                  ? '+ ' + y_Ende_2
                  : null}
                {data.y_dir === 'unten' && y_Ende_2 === 0 ? null : null}
                {data.y_dir === 'unten' && y_Ende_2 < 0 ? ' ' + y_Ende_2 : null}
              </HighlightGreen>
            </>
          )
        if (data.function_type === 2)
          return (
            <>
              Der Funktionsterm von <i>g</i> lautet:
              <br />
              <span className="bg-bg-gray-300 mt-3 inline-block rounded-md bg-opacity-20 p-1 px-3 text-2xl">
                y = (x {data.x_s > 0 ? '+ ' : null}
                {data.x_s === 0 ? null : null}
                {data.x_s !== 0 ? data.x_s : null}
                {data.x_dir === 'links' ? ' + ' + data.x_offset : null}
                {data.x_dir === 'rechts' ? ' - ' + data.x_offset : null})
                <sup>2</sup> {data.y_s > 0 ? '+ ' + data.y_s : null}
                {data.y_s === 0 ? null : null}
                {data.y_s < 0 ? data.y_s : null}
                {data.y_dir === 'oben' ? ' + ' + data.y_offset : null}
                {data.y_dir === 'unten' ? ' - ' + data.y_offset : null}
              </span>
              <br />
              <br />
              Zusammengefasst:
              <br />
              <HighlightGreen>
                y ={' '}
                {data.x_dir === 'links' && data.x_s + data.x_offset !== 0
                  ? '('
                  : null}
                {data.x_dir === 'rechts' && data.x_s - data.x_offset !== 0
                  ? '('
                  : null}
                x{' '}
                {data.x_dir === 'links' && data.x_s + data.x_offset > 0
                  ? '+ '
                  : null}
                {data.x_dir === 'rechts' && data.x_s - data.x_offset > 0
                  ? '+ '
                  : null}
                {data.x_dir === 'links' && data.x_s + data.x_offset !== 0
                  ? data.x_s + data.x_offset
                  : null}
                {data.x_dir === 'rechts' && data.x_s - data.x_offset !== 0
                  ? data.x_s - data.x_offset
                  : null}
                {data.x_dir === 'links' && data.x_s + data.x_offset !== 0
                  ? ')'
                  : null}
                {data.x_dir === 'rechts' && data.x_s - data.x_offset !== 0
                  ? ')'
                  : null}
                <sup>2</sup>{' '}
                {data.y_dir === 'oben' && data.y_s + data.y_offset > 0
                  ? '+ '
                  : null}
                {data.y_dir === 'unten' && data.y_s - data.y_offset > 0
                  ? '+ '
                  : null}
                {data.y_dir === 'oben' && data.y_s + data.y_offset !== 0
                  ? data.y_s + data.y_offset
                  : null}
                {data.y_dir === 'unten' && data.y_s - data.y_offset !== 0
                  ? data.y_s - data.y_offset
                  : null}
              </HighlightGreen>
            </>
          )
        if (data.function_type === 3)
          if (data.exp_offset !== 0)
            return (
              <>
                Der Funktionsterm von <i>g</i> lautet:
                <br />
                <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                  y = {data.Anfangswert} ·{' '}
                  {data.Faktor.toString().replace('.', ',')}
                  <sup>
                    x {data.x_dir === 'links' ? ' + ' + data.x_offset : null}
                    {data.x_dir === 'rechts' ? ' - ' + data.x_offset : null}
                  </sup>
                  {data.exp_offset > 0 ? '+ ' + data.exp_offset : null}
                  {data.exp_offset === 0 ? null : null}{' '}
                  {data.exp_offset < 0 ? data.exp_offset : null}
                  {data.y_dir === 'oben' ? ' + ' + data.y_offset : null}
                  {data.y_dir === 'unten' ? ' - ' + data.y_offset : null}
                </span>
                <br />
                <br />
                Zusammengefasst:
                <br />
                <span className="my-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                  y = {data.Anfangswert} ·{' '}
                  {data.Faktor.toString().replace('.', ',')}
                  <sup>
                    x {data.x_dir === 'links' ? ' + ' + data.x_offset : null}
                    {data.x_dir === 'rechts' ? ' - ' + data.x_offset : null}
                  </sup>{' '}
                  {data.y_dir === 'oben' && data.exp_offset + data.y_offset > 0
                    ? '+ '
                    : null}
                  {data.y_dir === 'unten' && data.exp_offset - data.y_offset > 0
                    ? '+ '
                    : null}
                  {data.y_dir === 'oben' &&
                  data.exp_offset + data.y_offset !== 0
                    ? data.exp_offset + data.y_offset
                    : null}
                  {data.y_dir === 'unten' &&
                  data.exp_offset - data.y_offset !== 0
                    ? data.exp_offset - data.y_offset
                    : null}
                </span>
              </>
            )
        if (data.exp_offset === 0)
          return (
            <>
              Der Funktionsterm von <i>g</i> lautet:
              <br />
              <span className="my-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                y = {data.Anfangswert} ·{' '}
                {data.Faktor.toString().replace('.', ',')}
                <sup>
                  x {data.x_dir === 'links' ? ' + ' + data.x_offset : null}
                  {data.x_dir === 'rechts' ? ' - ' + data.x_offset : null}
                </sup>{' '}
                {data.y_dir === 'oben' && data.exp_offset + data.y_offset > 0
                  ? '+ '
                  : null}
                {data.y_dir === 'unten' && data.exp_offset - data.y_offset > 0
                  ? '+ '
                  : null}
                {data.y_dir === 'oben' ? data.exp_offset + data.y_offset : null}
                {data.y_dir === 'unten'
                  ? data.exp_offset - data.y_offset
                  : null}
              </span>{' '}
            </>
          )
        return <></>
      }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderHint={({ data }) => {
        return (
          <>
            Eine Verschiebung in x-Richtung wird durch Addieren/Subtrahieren des
            Wertes von x ausgeführt.
            <br />
            <br />
            Beispiel für eine Verschiebung um 1 nach rechts:
            <br />
            <br />
            <span className="my-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = (x - 2)<sup>2</sup> + 1 ↦ y = (x - 1 - 2)<sup>2</sup> + 1
            </span>
            <br />
            <br />
            Eine Verschiebung in y-Richtung wird durch Addieren/Subtrahieren des
            Wertes vom Funktionsterm ausgeführt.
            <br />
            <br />
            Beispiel für eine Verschiebung um 2 nach unten:
            <br />
            <br />
            <span className="my-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
              y = 20 · 2<sup>x</sup> + 5 ↦ y = 20 · 2<sup>x</sup> + 5 - 2
            </span>
          </>
        )
      }}
      centAmount={35}
    />
  )
}
