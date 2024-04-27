import { useState, useEffect } from 'react'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { JSXGraphWrapper } from '../utils/jsx-graph-wrapper'
import { buildFrac, buildSqrt } from '../utils/math-builder'
import { roundToDigits } from '../utils/round-to-digits'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

type Element = 'a' | 'b' | 'c' | '⍺' | 'β'

interface DATA {
  given_1_element: Element
  given_2_element: Element
  goal_element: Element
  given_1_value: number
  given_2_value: number
  goal_value: number
  g_alpha_rad: number
  func?: string
  inv?: boolean
  mode: 'pythagoras' | 'trig' | 'trig_inv'
}

export function RightTriangle() {
  function printValue(el: Element, val: number) {
    if (['a', 'b', 'c'].includes(el)) {
      return <>{val.toLocaleString('de-De')} cm </>
    }
    return <>{val.toLocaleString('de-De')}°</>
  }
  return (
    <SelfEvaluationExercise
      generator={() => {
        const mode = randomItemFromArray(['pythagoras', 'trig', 'trig_inv'])
        if (mode === 'pythagoras' || mode === 'trig_inv') {
          const goal_element = randomItemFromArray(['a', 'b', 'c'])
          let [given_1_element, given_2_element] = ['a', 'b', 'c'].filter(
            (x) => x !== goal_element
          )
          let given_1_value = randomIntBetween(25, 65) / 10
          let given_2_value =
            randomIntBetween(
              given_2_element === 'c' ? given_1_value * 10 + 11 : 25,
              85
            ) / 10
          const goal_value =
            goal_element === 'c'
              ? Math.sqrt(
                  Math.pow(given_1_value, 2) + Math.pow(given_2_value, 2)
                )
              : Math.sqrt(
                  Math.pow(given_2_value, 2) - Math.pow(given_1_value, 2)
                )

          const elements: { [key: string]: number } = {}
          elements[given_1_element] = given_1_value
          elements[given_2_element] = given_2_value
          elements[goal_element] = goal_value

          const g_alpha_rad = Math.atan(elements['a'] / elements['b'])

          if (mode === 'pythagoras') {
            return {
              given_1_element,
              given_2_element,
              goal_element,
              given_1_value,
              given_2_value,
              goal_value,
              g_alpha_rad,
              mode,
            } as DATA
          } else {
            const goal = randomItemFromArray(['⍺', 'β'])
            const alpha = (g_alpha_rad / Math.PI) * 180
            if (goal_element === 'c' && goal === 'β') {
              const t = given_1_element
              given_1_element = given_2_element
              given_2_element = t
              const t2 = given_1_value
              given_1_value = given_2_value
              given_2_value = t2
            }
            return {
              given_1_element,
              given_2_element,
              goal_element: goal,
              given_1_value,
              given_2_value,
              goal_value: goal === '⍺' ? alpha : 90 - alpha,
              g_alpha_rad,
              mode,
              func:
                goal_element === 'c'
                  ? 'tan'
                  : (goal_element === 'a' && goal === '⍺') ||
                      (goal_element === 'b' && goal === 'β')
                    ? 'cos'
                    : 'sin',
            } as DATA
          }
        }

        const given_1_element = randomItemFromArray(['⍺', 'β'])
        const given_2_element = randomItemFromArray(['a', 'b', 'c'])

        const goal_element = randomItemFromArray(
          ['a', 'b', 'c'].filter((x) => x !== given_2_element)
        )

        const given_1_value = randomIntBetween(15, 75)
        const given_2_value = randomIntBetween(11, 65) / 10

        let gegenkathete = 'a'
        let ankathete = 'b'
        let goal_value = -1
        if (given_1_element === 'β') {
          gegenkathete = 'b'
          ankathete = 'a'
        }
        let func = ''
        let inv = false

        if (given_2_element === ankathete && goal_element === gegenkathete) {
          goal_value = given_2_value * Math.tan((given_1_value / 180) * Math.PI)
          func = 'tan'
        }
        if (given_2_element === gegenkathete && goal_element === ankathete) {
          goal_value = given_2_value / Math.tan((given_1_value / 180) * Math.PI)
          func = 'tan'
          inv = true
        }

        if (given_2_element === 'c' && goal_element === gegenkathete) {
          goal_value = given_2_value * Math.sin((given_1_value / 180) * Math.PI)
          func = 'sin'
        }
        if (given_2_element === gegenkathete && goal_element === 'c') {
          goal_value = given_2_value / Math.sin((given_1_value / 180) * Math.PI)
          func = 'sin'
          inv = true
        }

        if (given_2_element === 'c' && goal_element === ankathete) {
          goal_value = given_2_value * Math.cos((given_1_value / 180) * Math.PI)
          func = 'cos'
        }
        if (given_2_element === ankathete && goal_element === 'c') {
          goal_value = given_2_value / Math.cos((given_1_value / 180) * Math.PI)
          func = 'cos'
          inv = true
        }

        return {
          given_1_element,
          given_2_element,
          goal_element,
          given_1_value,
          given_2_value,
          g_alpha_rad:
            ((given_1_element === '⍺' ? given_1_value : 90 - given_1_value) /
              180) *
            Math.PI,
          goal_value,
          mode,
          func,
          inv,
        } as DATA
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Im rechtwinkligen Dreieck ABC sind folgende Größen gegeben:
          </p>
          <p className="serlo-main-task">
            {data.given_1_element} ={' '}
            {printValue(data.given_1_element, data.given_1_value)} und{' '}
            {data.given_2_element} ={' '}
            {printValue(data.given_2_element, data.given_2_value)}
          </p>
          <SubComponent data={data} />
          <p className="serlo-main-task">
            Berechnen Sie die Größe{' '}
            <strong className="text-newgreen">{data.goal_element}</strong>.
          </p>
          <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
        </>
      )}
      renderSolution={(data) => {
        if (data.mode === 'pythagoras') {
          return (
            <>
              <p>Nutze den Satz des Pythagoras:</p>
              <p className="serlo-highlight-gray">
                {data.goal_element}² ={' '}
                {data.goal_element === 'c' ? (
                  <>a² + b²</>
                ) : (
                  <>c² - {data.given_1_element}²</>
                )}
                <br />
                <br />
                {data.goal_element} ={' '}
                {buildSqrt(
                  data.goal_element === 'c' ? (
                    <>
                      {' '}
                      {data.given_1_value.toLocaleString('de-De')}² +{' '}
                      {data.given_2_value.toLocaleString('de-De')}²
                    </>
                  ) : (
                    <>
                      {' '}
                      {data.given_2_value.toLocaleString('de-De')}² -{' '}
                      {data.given_1_value.toLocaleString('de-De')}²
                    </>
                  )
                )}
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                {data.goal_element} ={' '}
                {roundToDigits(data.goal_value * 10, 2).toLocaleString('de-De')}{' '}
                cm
              </p>
            </>
          )
        }
        if (data.mode === 'trig') {
          return (
            <>
              <p>Stelle eine Gleichung auf:</p>
              <p className="serlo-highlight-gray">
                {data.func} {data.given_1_element} ={' '}
                {data.inv
                  ? buildFrac(data.given_2_element, data.goal_element)
                  : buildFrac(data.goal_element, data.given_2_element)}
              </p>
              <p>Setze die gegebenen Größen ein:</p>
              <p className="serlo-highlight-gray">
                {data.func} {data.given_1_value}° ={' '}
                {data.inv
                  ? buildFrac(
                      data.given_2_value.toLocaleString('de-De'),
                      data.goal_element
                    )
                  : buildFrac(
                      data.goal_element,
                      data.given_2_value.toLocaleString('de-De')
                    )}
              </p>
              <p>Stelle die Gleichung um:</p>
              <p className="serlo-highlight-gray">
                {data.goal_element} ={' '}
                {data.inv ? (
                  buildFrac(
                    data.given_2_value.toLocaleString('de-De'),
                    <>
                      {data.func} {data.given_1_value}°
                    </>
                  )
                ) : (
                  <>
                    {data.func} {data.given_1_value}° ·{' '}
                    {data.given_2_value.toLocaleString('de-De')}
                  </>
                )}
              </p>
              <p>Berechne das Ergebnis:</p>
              <p className="serlo-highlight-green">
                {data.goal_element} ={' '}
                {roundToDigits(data.goal_value * 10, 2).toLocaleString('de-De')}{' '}
                cm
              </p>
            </>
          )
        }
        return (
          <>
            <p>Stelle eine passende Gleichung auf:</p>
            <p className="serlo-highlight-gray">
              {data.func} {data.goal_element} ={' '}
              {buildFrac(data.given_1_element, data.given_2_element)}
            </p>
            <p>Setze die Werte ein:</p>
            <p className="serlo-highlight-gray">
              {data.func} {data.goal_element} =
              {buildFrac(
                data.given_1_value.toLocaleString('de-De'),
                data.given_2_value.toLocaleString('de-De')
              )}
            </p>
            <p>Berechne das Ergebnis:</p>
            <p className="serlo-highlight-green">
              {data.goal_element} ={' '}
              {roundToDigits(data.goal_value, 2).toLocaleString('de-De')}°
            </p>
          </>
        )
      }}
    />
  )
}
function SubComponent({ data }: { data: DATA }) {
  const [board, setBoard] = useState<ReturnType<
    typeof JXG.JSXGraph.initBoard
  > | null>(null)

  function shouldShow(el: Element) {
    return (
      data.given_1_element === el ||
      data.given_2_element === el ||
      data.goal_element === el
    )
  }

  useEffect(() => {
    const h = Math.tan(data.g_alpha_rad)
    const dim = Math.max(h, 1)

    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-0.2 * dim, dim + 0.2 * dim, dim + 0.2 * dim, -0.3 * dim],
      showNavigation: false,
      showCopyright: false,
    })

    const pointA = b.create('point', [1, 0], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })

    const pointB = b.create('point', [0, h], {
      name: 'B',
      fixed: true,
      label: { autoPosition: true },
    })

    const pointC = b.create('point', [0, 0], {
      name: 'C',
      fixed: true,
      label: { autoPosition: true },
    })

    const newgreen = 'rgb(47 206 177)'

    b.create('segment', [pointA, pointB], {
      name: 'c',
      withLabel: shouldShow('c'),
      label: {
        autoPosition: true,
        color: data.goal_element === 'c' ? newgreen : 'black',
      },
    })
    b.create('segment', [pointA, pointC], {
      name: 'b',
      withLabel: shouldShow('b'),
      label: {
        autoPosition: true,
        color: data.goal_element === 'b' ? newgreen : 'black',
      },
    })
    b.create('segment', [pointC, pointB], {
      name: 'a',
      withLabel: shouldShow('a'),
      label: {
        autoPosition: true,
        color: data.goal_element === 'a' ? newgreen : 'black',
      },
    })

    if (shouldShow('⍺')) {
      b.create('angle', [pointB, pointA, pointC], {
        name: '⍺',
        withLabel: true,
        radius: 0.12 * dim,
        label: {
          autoPosition: true,
          color: data.goal_element === '⍺' ? newgreen : 'black',
        },
      })
    }

    if (shouldShow('β')) {
      b.create('angle', [pointC, pointB, pointA], {
        name: 'β',
        withLabel: true,
        radius: 0.12 * dim,
        label: {
          autoPosition: true,
          color: data.goal_element === 'β' ? newgreen : 'black',
        },
      })
    }

    b.create('angle', [pointA, pointC, pointB], {
      name: 'γ',
      withLabel: false,
      radius: 0.08 * dim,
      strokeColor: 'black',
      fillColor: 'white',
    })

    setBoard(b)

    return () => {
      if (board) JXG.JSXGraph.freeBoard(board)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return <JSXGraphWrapper id="jxgbox" width={300} height={300} />
}
