import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac, buildJSX, buildOverline } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { roundToDigits } from '../utils/round-to-digits'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface DATA {
  graph_k: number
  graph_f: number
  goal_element: string
  given_elements: string[]
  lengths: { [key: string]: number }
}

export function IntersectingLines() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const graph_k = randomIntBetween(130, 290) / 100
        const graph_f = randomIntBetween(30, 250) / 100

        const base_len = randomIntBetween(12, 99) / 10

        const lengths: { [key: string]: number } = {}
        lengths['ZA'] = base_len
        lengths['ZB'] = base_len * graph_f
        lengths['ZC'] = base_len * graph_k
        lengths['ZD'] = lengths['ZB'] * graph_k
        lengths['AC'] = lengths['ZC'] - lengths['ZA']
        lengths['BD'] = lengths['ZD'] - lengths['ZB']
        const a = lengths['ZA']
        const b = lengths['ZB']
        lengths['AB'] = Math.sqrt(
          a * a + b * b - 2 * a * b * Math.cos((32.47 / 180) * Math.PI)
        )
        lengths['CD'] = lengths['AB'] * graph_k

        const [left, right] = randomItemFromArray([
          ['c1', 'c2'],
          ['c1', 'c3'],
          ['c2', 'c3'],
        ])
        const useSplitL = randomItemFromArray([true, false])
        const useSplitR = randomItemFromArray([true, false])

        function cToTracks(c: string, useSplit: boolean) {
          if (c === 'c3') {
            return ['AB', 'CD']
          }
          if (c === 'c1') {
            return useSplit ? ['ZA', 'AC'] : ['ZA', 'ZC']
          }
          return useSplit ? ['ZB', 'BD'] : ['ZB', 'ZD']
        }

        const values = [
          ...cToTracks(left, useSplitL),
          ...cToTracks(right, useSplitR),
        ]

        const goal_element = randomItemFromArray(values)

        const given_elements = values.filter((x) => x !== goal_element)

        return {
          graph_k,
          graph_f,
          goal_element,
          given_elements,
          lengths,
        } as DATA
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Zwei sich schneidende Geraden werden von zwei Parallelen AB und CD
            geschnitten.
          </p>
          <p className="serlo-main-task">
            Es gilt: |{buildOverline(data.given_elements[0])}| ={' '}
            {pp(Math.round(data.lengths[data.given_elements[0]] * 10) / 10)} cm,
            |{buildOverline(data.given_elements[1])}| ={' '}
            {pp(Math.round(data.lengths[data.given_elements[1]] * 10) / 10)} cm
            und |{buildOverline(data.given_elements[2])}| ={' '}
            {pp(Math.round(data.lengths[data.given_elements[2]] * 10) / 10)} cm.
          </p>
          {renderDiagram(data)}
          <p className="serlo-main-task">
            Berechnen Sie die Länge der Strecke{' '}
            {buildOverline(data.goal_element)}.
          </p>
          <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
        </>
      )}
      renderSolution={(data) => {
        const defs = [
          { name: 'c1', elements: ['ZC', 'ZA'] },
          { name: 'c1_split', elements: ['AC', 'ZA'] },
          { name: 'c2', elements: ['ZD', 'ZB'] },
          { name: 'c2_split', elements: ['BD', 'ZB'] },
          { name: 'c3', elements: ['CD', 'AB'] },
        ]

        // Finde welches Paar gegeben ist
        let givenName = ''
        let remainingOne = ''
        for (const def of defs) {
          if (
            data.given_elements.includes(def.elements[0]) &&
            data.given_elements.includes(def.elements[1])
          ) {
            givenName = def.name
            remainingOne = data.given_elements.filter(
              (x) => !def.elements.includes(x)
            )[0]
            break
          }
        }
        let goalName = ''
        for (const def of defs) {
          if (
            def.elements.includes(remainingOne) &&
            def.elements.includes(data.goal_element)
          ) {
            goalName = def.name
            break
          }
        }
        const bothSplit =
          goalName.includes('split') && givenName.includes('split')

        const isInverted =
          defs.find((x) => x.name === goalName)!.elements[1] ===
          data.goal_element

        const intro = (
          <>
            <p>Finde eine geeignete Gleichung des Strahlensatz:</p>
            <p className="serlo-highlight-gray">
              {renderC(goalName)} = {renderC(givenName)}
            </p>
            <p>Setze gegebene Größen ein:</p>
            <p className="serlo-highlight-gray">
              {renderC(goalName, true)} = {renderC(givenName, true)}
            </p>
          </>
        )

        function renderC(c: string, insertValues?: boolean) {
          const el = defs.find((x) => x.name === c)!
          function build(el: string) {
            if (insertValues && el !== data.goal_element) {
              return (
                <>
                  {(Math.round(data.lengths[el] * 10) / 10).toLocaleString(
                    'de-De'
                  )}{' '}
                  cm
                </>
              )
            }
            return <>|{buildOverline(el)}|</>
          }
          if (c.includes('split') && !bothSplit) {
            return buildFrac(
              <>
                {build(el.elements[1])} + {build(el.elements[0])}
              </>,
              <>{build(el.elements[1])}</>
            )
          }
          return buildFrac(
            <>{build(el.elements[0])}</>,
            <>{build(el.elements[1])}</>
          )
        }

        const factor =
          Math.round(
            data.lengths[
              defs.find((x) => x.name === goalName)!.elements[
                isInverted ? 0 : 1
              ]
            ] * 10
          ) / 10

        let a =
          Math.round(
            (data.lengths[defs.find((x) => x.name === givenName)!.elements[0]] +
              (givenName.includes('split') && !bothSplit
                ? data.lengths[
                    defs.find((x) => x.name === givenName)!.elements[1]
                  ]
                : 0)) *
              10
          ) / 10

        let b =
          Math.round(
            data.lengths[defs.find((x) => x.name === givenName)!.elements[1]] *
              10
          ) / 10

        const c = goalName.includes('split') && !bothSplit ? factor : 0

        if (isInverted) {
          const t = a
          a = b
          b = t
        }

        if (
          goalName.includes('split') &&
          !givenName.includes('split') &&
          isInverted
        ) {
          // x + factor / x = b / a
          const result = roundToDigits((a * factor) / (b - a), 2)
          return (
            <>
              {intro}
              <p>Multipliziere über Kreuz:</p>
              <p className="serlo-highlight-gray">
                {pp(b)} cm · |{buildOverline(data.goal_element)}| = {pp(a)} cm ·
                (|
                {buildOverline(data.goal_element)}| + {pp(factor)} cm)
              </p>
              <p>Multipliziere aus und stelle um:</p>
              <p className="serlo-highlight-gray">
                {pp(b)} cm · |{buildOverline(data.goal_element)}| = {pp(a)} cm ·
                |{buildOverline(data.goal_element)}| + {pp(a)} cm · {pp(factor)}{' '}
                cm
                <br />
                <br />({pp(b)} cm - {pp(a)} cm) · |
                {buildOverline(data.goal_element)}| = {pp(a)} cm · {pp(factor)}{' '}
                cm
                <br />
                <br />|{buildOverline(data.goal_element)}| ={' '}
                {buildFrac(
                  <>
                    {pp(a)} cm · {pp(factor)} cm
                  </>,
                  <>
                    {pp(b)} cm - {pp(a)} cm
                  </>
                )}
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                |{buildOverline(data.goal_element)}| = {pp(result)} cm
              </p>
            </>
          )
        }

        const result = roundToDigits((a / b) * factor - c, 2)

        return (
          <>
            {intro}
            <p>Stelle die Gleichung um:</p>
            <p className="serlo-highlight-gray">
              |{buildOverline(data.goal_element)}| ={' '}
              {buildFrac(pp(a) + ' cm', pp(b) + ' cm')} · {pp(factor)} cm
              {c > 0 ? <> - {pp(c)} cm</> : null}
            </p>
            <p>Berechne das Ergebnis:</p>
            <p className="serlo-highlight-green">
              |{buildOverline(data.goal_element)}| = {pp(result)} cm
            </p>
          </>
        )
      }}
    />
  )
}

function renderDiagram(data: DATA) {
  return buildJSX(
    () => {
      const a_dx = 4 / Math.sqrt(17)
      const a_dy = -1 / Math.sqrt(17)
      const b_dx = 3 / Math.sqrt(10)
      const b_dy = 1 / Math.sqrt(10)

      const len_a = 3
      const len_b = len_a * data.graph_f
      const len_c = len_a * data.graph_k
      const len_d = len_b * data.graph_k

      const width = Math.max(a_dx * len_c, b_dx * len_d)
      const height = b_dy * len_d - a_dy * len_c

      const adjustedWidth = Math.max(width, height * 1.5)
      const adjustedHeight = adjustedWidth / 1.5
      const base = a_dy * len_c

      const b = JXG.JSXGraph.initBoard('jxgbox', {
        boundingbox: [
          -adjustedWidth * 0.2,
          base + adjustedHeight * 1.2,
          1.2 * adjustedWidth,
          base - adjustedHeight * 0.2,
        ],
        showNavigation: false,
        showCopyright: false,
      })

      const pointZ = b.create('point', [0, 0], {
        name: 'Z',
        fixed: true,
        label: { autoPosition: true },
      })

      const pointA = b.create('point', [a_dx * len_a, a_dy * len_a], {
        name: 'A',
        fixed: true,
        label: { autoPosition: true },
      })

      const pointC = b.create('point', [a_dx * len_c, a_dy * len_c], {
        name: 'C',
        fixed: true,
        label: { autoPosition: true },
      })

      const pointB = b.create('point', [b_dx * len_b, b_dy * len_b], {
        name: 'B',
        fixed: true,
        label: { autoPosition: true },
      })

      const pointD = b.create('point', [b_dx * len_d, b_dy * len_d], {
        name: 'D',
        fixed: true,
        label: { autoPosition: true },
      })

      b.create('line', [pointZ, pointA])
      b.create('line', [pointZ, pointB])

      b.create('line', [pointA, pointB])
      b.create('line', [pointC, pointD])

      const [start, end] = data.goal_element.split('')

      function pTop(p: string) {
        switch (p) {
          case 'A':
            return pointA
          case 'B':
            return pointB
          case 'C':
            return pointC
          case 'D':
            return pointD
          case 'Z':
            return pointZ
        }
        return pointA
      }
      b.create('segment', [pTop(start), pTop(end)], {
        color: 'rgb(47 206 177)',
      })

      return b
    },
    { height: 300, width: 450 }
  )
}
