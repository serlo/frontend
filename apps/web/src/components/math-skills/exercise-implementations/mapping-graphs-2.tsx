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
import { pp } from '../utils/pretty-print'
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
        const function_type = randomIntBetween(3, 3)
        const x_s = randomIntBetween(-9, 9)
        const y_s = randomIntBetween(-9, 9)
        const Anfangswert = randomIntBetween(10, 90) * 10
        const exp_offset = randomIntBetween(-6, 6)
        const Faktor = randomIntBetween(1, 80) / 100 + 1
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
                y = {data.a > 0 ? null : '- '}
                {data.x_s !== 0 ? '(' : null}x {data.x_s > 0 ? '+ ' : null}
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
                  {data.x_reflect === true
                    ? '· Der Graph von f wird an der x-Achse gespiegelt.'
                    : null}
                </li>
                <li>
                  {data.y_reflect === true
                    ? '· Der Graph von f wird zusätzlich an der y-Achse gespiegelt.'
                    : null}
                </li>
              </ol>{' '}
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
                y = {data.Anfangswert} · {pp(data.Faktor)}
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
                  {data.x_reflect === true
                    ? '· Der Graph von f wird an der x-Achse gespiegelt.'
                    : null}
                </li>
                <li>
                  {data.y_reflect === true
                    ? '· Der Graph von f wird zusätzlich an der y-Achse gespiegelt.'
                    : null}
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
        const Nenner = Math.pow(-1, data.c)
        const Basis = Math.round((1 / data.Faktor) * 100) / 100

        if (data.function_type === 1 && data.y_reflect === false)
          return (
            <>
              Der Graph von <i>g</i> ist gegeben durch:
              <br />
              <HighlightGray>
                y = (-1) · <span className="inline-block scale-y-[3]">(</span>
                {data.a === -1 ? '-' : null}{' '}
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
                <span className="inline-block scale-y-[3]">)</span>
              </HighlightGray>
              <br />
              <br />
              Vereinfacht:
              <br />
              <HighlightGreen>
                y = {data.a === -1 ? null : '-'}{' '}
                {buildFrac(
                  <>{data.a !== -1 ? data.a : -data.a}</>,
                  <>
                    {data.b === 0 || data.c === -1 ? null : '('}x{' '}
                    {data.b > 0 ? '+' : null} {data.b !== 0 ? data.b : null}
                    {data.b === 0 || data.c === -1 ? null : ')'}
                    <sup>{data.c !== -1 ? -data.c : null}</sup>
                  </>
                )}{' '}
                {data.d > 0 && data.d !== 0 ? '-' : null}{' '}
                {-data.d > 0 ? '+ ' + -data.d : null}
                {-data.d < 0 ? data.d : null}
              </HighlightGreen>
            </>
          )
        if (data.function_type === 1 && data.y_reflect === true)
          return (
            <>
              Der Graph von <i>g</i> ist gegeben durch:
              <br />
              <HighlightGray>
                y = (-1) · <span className="inline-block scale-y-[3]">(</span>
                {data.a === -1 ? '-' : null}{' '}
                {buildFrac(
                  <>{data.a !== -1 ? data.a : -data.a}</>,
                  <>
                    (- x{data.b > 0 ? '+' : null} {data.b !== 0 ? data.b : null}
                    )<sup>{data.c !== -1 ? -data.c : null}</sup>
                  </>
                )}{' '}
                {data.d > 0 && data.d !== 0 ? '+' : null}{' '}
                {data.d !== 0 ? data.d : null}
                <span className="inline-block scale-y-[3]">)</span>
              </HighlightGray>
              <br />
              <br />
              Klammer auflösen:
              <br />
              <HighlightGray>
                y = {data.a === -1 ? null : '-'}{' '}
                {buildFrac(
                  <>{data.a !== -1 ? data.a : -data.a}</>,
                  <>
                    (- x {data.b > 0 ? '+' : null}{' '}
                    {data.b !== 0 ? data.b : null})
                    <sup>{data.c !== -1 ? -data.c : null}</sup>
                  </>
                )}{' '}
                {data.d > 0 && data.d !== 0 ? '-' : null}{' '}
                {-data.d > 0 ? '+ ' + -data.d : null}
                {-data.d < 0 ? data.d : null}
              </HighlightGray>
              <br />
              <br />
              (-1) im Nenner ausgeklammert:
              <br />
              <HighlightGray>
                y = {data.a === -1 ? null : '-'}{' '}
                {buildFrac(
                  <>{data.a !== -1 ? data.a : -data.a}</>,
                  <>
                    (-1)<sup>{data.c !== -1 ? -data.c : null}</sup> ·{' '}
                    {data.b === 0 ? null : '('}x {data.b < 0 ? '+' : null}{' '}
                    {data.b !== 0 ? -data.b : null}
                    {data.b === 0 ? null : ')'}
                    <sup>{data.c !== -1 ? -data.c : null}</sup>
                  </>
                )}{' '}
                {data.d > 0 && data.d !== 0 ? '-' : null}{' '}
                {-data.d > 0 ? '+ ' + -data.d : null}
                {-data.d < 0 ? data.d : null}
              </HighlightGray>
              <br />
              <br />
              Vereinfacht:
              <br />
              <HighlightGreen>
                y = {data.a === -1 && data.c % 2 === 0 ? '' : null}{' '}
                {data.a === -1 && data.c % 2 === -1 ? '-' : null}{' '}
                {data.a === 1 && data.c % 2 === -1 ? '' : null}{' '}
                {data.a === 1 && data.c % 2 === 0 ? '-' : null}{' '}
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
                {data.d > 0 && data.d !== 0 ? '-' : null}{' '}
                {-data.d > 0 ? '+ ' + -data.d : null}
                {-data.d < 0 ? data.d : null}
              </HighlightGreen>
            </>
          )
        if (data.function_type === 2 && data.y_reflect === false)
          return (
            <>
              Der Graph von <i>g</i> ist gegeben durch:
              <br />
              <HighlightGray>
                y = (-1) · <span className="inline-block scale-y-[1.8]">(</span>{' '}
                {data.a > 0 ? null : '- '}
                {data.x_s !== 0 ? '(' : null}x {data.x_s > 0 ? '+ ' : null}
                {data.x_s === 0 ? null : null}
                {data.x_s !== 0 ? data.x_s : null}
                {data.x_s !== 0 ? ')' : null}
                <sup>2</sup> {data.y_s > 0 ? '+ ' + data.y_s : null}
                {data.y_s === 0 ? null : null}
                {data.y_s < 0 ? data.y_s : null}
                <span className="inline-block scale-y-[1.8]">)</span>
              </HighlightGray>
              <br />
              <br />
              Vereinfacht
              <br />
              <HighlightGreen>
                y = {data.a < 0 ? null : '- '}
                {data.x_s !== 0 ? '(' : null}x {data.x_s > 0 ? '+ ' : null}
                {data.x_s === 0 ? null : null}
                {data.x_s !== 0 ? data.x_s : null}
                {data.x_s !== 0 ? ')' : null}
                <sup>2</sup> {data.y_s > 0 ? -data.y_s : null}{' '}
                {data.y_s === 0 ? null : null}{' '}
                {data.y_s < 0 ? '+ ' + -data.y_s : null}
              </HighlightGreen>
            </>
          )
        if (data.function_type === 2 && data.y_reflect === true)
          return (
            <>
              Der Graph von <i>g</i> ist gegeben durch:
              <br />
              <HighlightGray>
                y = (-1) · <span className="inline-block scale-y-[1.8]">(</span>{' '}
                {data.a > 0 ? null : '- '}
                {data.x_s !== 0 ? '(' : null}- x {data.x_s > 0 ? '+ ' : null}
                {data.x_s === 0 ? null : null}
                {data.x_s !== 0 ? data.x_s : null}
                {data.x_s !== 0 ? ')' : null}
                <sup>2</sup> {data.y_s > 0 ? '+ ' + data.y_s : null}
                {data.y_s === 0 ? null : null}
                {data.y_s < 0 ? data.y_s : null}
                <span className="inline-block scale-y-[1.8]">)</span>
              </HighlightGray>
              <br />
              <br />
              Klammer aufgelöst:
              <br />
              <HighlightGray>
                y = {data.a < 0 ? null : '- '}
                {data.x_s !== 0 ? '(' : null}- x {data.x_s > 0 ? '+ ' : null}
                {data.x_s === 0 ? null : null}
                {data.x_s !== 0 ? data.x_s : null}
                {data.x_s !== 0 ? ')' : null}
                <sup>2</sup> {data.y_s > 0 ? -data.y_s : null}{' '}
                {data.y_s === 0 ? null : null}{' '}
                {data.y_s < 0 ? '+ ' + -data.y_s : null}
              </HighlightGray>
              <br />
              <br />
              (-1) aus der Klammer ziehen:
              <br />
              <HighlightGray>
                y = {data.a < 0 ? null : '- '} (-1)<sup>2</sup> ·{' '}
                {data.x_s !== 0 ? '(' : null}x {data.x_s < 0 ? '+ ' : null}
                {data.x_s === 0 ? null : null}
                {data.x_s !== 0 ? -data.x_s : null}
                {data.x_s !== 0 ? ')' : null}
                <sup>2</sup> {data.y_s > 0 ? -data.y_s : null}{' '}
                {data.y_s === 0 ? null : null}{' '}
                {data.y_s < 0 ? '+ ' + -data.y_s : null}
              </HighlightGray>
              <br />
              <br />
              Vereinfacht <br />
              <HighlightGreen>
                y = {data.a < 0 ? null : '- '} {data.x_s !== 0 ? '(' : null}x{' '}
                {data.x_s < 0 ? '+ ' : null}
                {data.x_s === 0 ? null : null}
                {data.x_s !== 0 ? -data.x_s : null}
                {data.x_s !== 0 ? ')' : null}
                <sup>2</sup> {data.y_s > 0 ? -data.y_s : null}{' '}
                {data.y_s === 0 ? null : null}{' '}
                {data.y_s < 0 ? '+ ' + -data.y_s : null}
              </HighlightGreen>
            </>
          )
        if (data.function_type === 3 && data.y_reflect === false)
          return (
            <>
              Der Graph von <i>g</i> ist gegeben durch:
              <br />
              <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = (-1) · ({data.Anfangswert} · {pp(data.Faktor)}
                <sup>x</sup>{' '}
                {data.exp_offset > 0 ? '+ ' + data.exp_offset : null}
                {data.exp_offset === 0 ? null : null}{' '}
                {data.exp_offset < 0 ? data.exp_offset : null})
              </span>
              <br />
              <br />
              Klammer aufgelöst:
              <br />
              <span className="my-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                y = - {data.Anfangswert} · {pp(data.Faktor)}
                <sup>x</sup> {data.exp_offset > 0 ? -data.exp_offset : null}
                {data.exp_offset === 0 ? null : null}{' '}
                {data.exp_offset < 0 ? '+ ' + -data.exp_offset : null}
              </span>
            </>
          )
        if (data.function_type === 3 && data.y_reflect === true)
          return (
            <>
              Der Graph von <i>g</i> ist gegeben durch:
              <br />
              <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = (-1) · ({data.Anfangswert} · {pp(data.Faktor)} <sup>-x</sup>{' '}
                {data.exp_offset > 0 ? '+ ' + data.exp_offset : null}
                {data.exp_offset === 0 ? null : null}{' '}
                {data.exp_offset < 0 ? data.exp_offset : null})
              </span>
              <br />
              <br />
              Klammer aufgelöst:
              <br />
              <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = - {data.Anfangswert} · {pp(data.Faktor)} <sup>-x</sup>{' '}
                {data.exp_offset > 0 ? -data.exp_offset : null}
                {data.exp_offset === 0 ? null : null}{' '}
                {data.exp_offset < 0 ? '+ ' + -data.exp_offset : null}
              </span>
              <br />
              <br />
              Der negative Exponent kann noch umgewandelt werden:
              <br />
              <span className="my-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
                y = - {data.Anfangswert} ·{' '}
                <span className="inline-block scale-y-[2.5]">(</span>
                {buildFrac(<>1</>, <>{pp(data.Faktor)}</>)}
                <span className="inline-block scale-y-[2.5]">)</span>
                <sup>x</sup> {data.exp_offset > 0 ? -data.exp_offset : null}
                {data.exp_offset === 0 ? null : null}{' '}
                {data.exp_offset < 0 ? '+ ' + -data.exp_offset : null}
              </span>
              <br />
              <br />
              Mit dem Taschenrechner lässt sich die Basis neu berechnen:
              <br />
              <span className="my-3 inline-block rounded-md bg-newgreen bg-opacity-20 p-1 px-3 text-2xl">
                y = - {data.Anfangswert} · {pp(Basis)}
                <sup>x</sup> {data.exp_offset > 0 ? -data.exp_offset : null}
                {data.exp_offset === 0 ? null : null}{' '}
                {data.exp_offset < 0 ? '+ ' + -data.exp_offset : null}
              </span>
            </>
          )
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
    />
  )
}
