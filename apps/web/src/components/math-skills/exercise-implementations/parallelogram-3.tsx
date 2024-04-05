import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildVec, buildVec2 } from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function Parallelogram3() {
  const phi = <span className="font-mono">ϕ</span>
  return (
    <SelfEvaluationExercise
      generator={() => {
        const fixed = randomItemFromArray([0, 2])
        const names = randomItemFromArray(['ABC', 'RST', 'PQR', 'EFG']).split(
          ''
        )
        const x = randomIntBetween(-12, -1)
        const y = randomIntBetween(1, 12)

        const x_off = randomIntBetween(-x + 1, -x + 10)
        const w = randomIntBetween(2, 6)
        const h = randomIntBetween(2, 10)

        const func1 = randomItemFromArray(['sin', 'cos'])
        const func2 = func1 === 'sin' ? 'cos' : 'sin'

        const hasSqrt1 = randomItemFromArray([true, false])
        const hasSqrt2 = randomItemFromArray([false, !hasSqrt1])

        return {
          fixed,
          names,
          x,
          y,
          x_off,
          w,
          h,
          func1,
          func2,
          hasSqrt1,
          hasSqrt2,
        }
      }}
      renderTask={(data) => (
        <>
          <p className="serlo-main-task">
            Seien die Pfeile {buildVec(<>O{data.names[data.fixed]}</>)} ={' '}
            {buildVec2(data.x, data.y)} und{' '}
            {buildVec(
              <>
                O{data.names[data.fixed === 0 ? 2 : 0]}
                <sub>n</sub>
              </>
            )}{' '}
            ={' '}
            {buildVec2(
              <>
                {data.x_off} + {data.w} · {data.func1}
                {data.hasSqrt1 && <sup>2</sup>} {phi}
              </>,
              <>
                {data.h} · {data.func2}
                {data.hasSqrt2 && <sup>2</sup>} {phi}
              </>
            )}{' '}
            gegeben.
          </p>
          <p className="serlo-main-task">
            Diese spannen mit dem Ursprung O ( 0 | 0 ) für {phi} ∈ [0°; 90°]
            Parallelogramme O{data.names[0]}
            {data.fixed !== 0 && <sub>n</sub>}
            {data.names[1]}
            <sub>n</sub>
            {data.names[2]}
            {data.fixed !== 2 && <sub>n</sub>} auf.
          </p>
          <p className="serlo-main-task">
            Weisen Sie durch Rechnung nach, dass sich die Koordinaten der Punkte{' '}
            {data.names[1]}
            <sub>n</sub> in Abhängigkeit von {phi} wie folgt darstellen lassen:
          </p>
          <p className="serlo-highlight-gray">
            {data.names[1]}
            <sub>n</sub> ( {data.x + data.x_off} + {data.w} · {data.func1}
            {data.hasSqrt1 && <sup>2</sup>} {phi} | {data.h} · {data.func2}
            {data.hasSqrt2 && <sup>2</sup>} {phi} + {data.y})
          </p>
        </>
      )}
      renderSolution={(data) => (
        <>
          <p>
            Die Punkte {data.names[1]}
            <sub>n</sub> lassen sich durch eine Vektoraddition darstellen:
          </p>
          <p className="serlo-highlight-gray">
            {buildVec(
              <>
                O{data.names[1]}
                <sub>n</sub>
              </>
            )}{' '}
            ={' '}
            {buildVec(
              <>
                O{data.names[data.fixed === 2 ? 0 : 2]}
                <sub>n</sub>
              </>
            )}{' '}
            ⊕{' '}
            {buildVec(
              <>
                {data.names[data.fixed === 2 ? 0 : 2]}
                <sub>n</sub>
                {data.names[1]}
                <sub>n</sub>
              </>
            )}{' '}
            ={' '}
            {buildVec(
              <>
                O{data.names[data.fixed === 2 ? 0 : 2]}
                <sub>n</sub>
              </>
            )}{' '}
            ⊕ {buildVec(<>O{data.names[data.fixed]}</>)}
          </p>
          <p className="mt-1">
            Dabei wurde{' '}
            {buildVec(
              <>
                {data.names[data.fixed === 0 ? 2 : 0]}
                <sub>n</sub>
                {data.names[1]}
                <sub>n</sub>
              </>
            )}{' '}
            = {buildVec(<>O{data.names[data.fixed]}</>)} genutzt. Das ist
            möglich, weil im Parallelogramm gegenüberliegende Seiten parallel
            und gleich lang sind. Setze die passenen Terme ein und berechne:
          </p>
          <p className="serlo-highlight-gray">
            {buildVec(
              <>
                O{data.names[data.fixed]}
                <sub>n</sub>
              </>
            )}{' '}
            ={' '}
            {buildVec2(
              <>
                {data.x_off} + {data.w} · {data.func1}
                {data.hasSqrt1 && <sup>2</sup>} {phi}
              </>,
              <>
                {data.h} · {data.func2}
                {data.hasSqrt2 && <sup>2</sup>} {phi}
              </>
            )}{' '}
            ⊕ {buildVec2(data.x, data.y)} ={' '}
            {buildVec2(
              <>
                {data.x + data.x_off} + {data.w} · {data.func1}
                {data.hasSqrt1 && <sup>2</sup>} {phi}
              </>,
              <>
                {data.h} · {data.func2}
                {data.hasSqrt2 && <sup>2</sup>} {phi} + {data.y}
              </>
            )}
          </p>
          <p>Schreibe den Ortsvektor schließlich in Koordinaten:</p>
          <p className="serlo-highlight-green">
            S<sub>n</sub> ( {data.x + data.x_off} + {data.w} · {data.func1}
            {data.hasSqrt1 && <sup>2</sup>} {phi} | {data.h} · {data.func2}
            {data.hasSqrt2 && <sup>2</sup>} {phi} + {data.y})
          </p>
        </>
      )}
      centAmount={35}
    />
  )
}
