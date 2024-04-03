import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  buildBigSqrt,
  buildBlock,
  buildFrac,
  buildSqrt,
  buildVec,
  buildVec2,
} from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

export function Parallelogram2() {
  const phi = <span className="font-mono">ϕ</span>
  return (
    <SelfEvaluationExercise
      generator={() => {
        const coord = randomItemFromArray(['x', 'y'])
        const deg = randomItemFromArray([0, 45, 90])
        const factor = randomIntBetween(1, 4) * 2
        const func = randomItemFromArray(['sin', 'cos'])
        const distr_a = randomIntBetween(3, 9)
        const distr_b = randomIntBetween(2, 6)
        const need_Sqr = deg === 45

        const f = func === 'sin' ? Math.sin : Math.cos
        const val =
          Math.round(
            Math.pow(f((deg / 180) * Math.PI), need_Sqr ? 2 : 1) * factor * 1000
          ) / 1000

        return { coord, deg, factor, func, distr_a, distr_b, need_Sqr, val }
      }}
      renderTask={(data) => {
        const distr = (
          <>
            {data.distr_a} + {data.distr_b} ·{' '}
            {data.func === 'sin' ? 'cos' : 'sin'} {phi}
          </>
        )
        const real = (
          <>
            {data.factor} · {data.func}
            {data.need_Sqr && <sup>2</sup>} {phi}
          </>
        )
        return (
          <>
            <p className="text-2xl">
              Es seien Pfeile{' '}
              {buildVec(
                <>
                  AB<sub>n</sub>
                </>
              )}{' '}
              ={' '}
              {buildVec2(
                data.coord === 'x' ? real : distr,
                data.coord === 'x' ? distr : real
              )}{' '}
              gegeben mit {phi} ∈ [0°; 90°].
            </p>
            <p className="mt-4 text-2xl">
              Der Pfeil{' '}
              {buildVec(
                <>
                  AB<sub>1</sub>
                </>
              )}{' '}
              hat die {data.coord}-Koordinate {data.val.toLocaleString('de-De')}
              . Berechnen Sie das zugehörige Winkelmaß {phi}.
            </p>
          </>
        )
      }}
      renderSolution={(data) => (
        <>
          <p>Stelle die zugehörige Gleichung auf und vereinfache:</p>
          {buildBlock(
            'gray',
            <>
              {data.factor} · {data.func}
              {data.need_Sqr && <sup>2</sup>} {phi} = {data.val}
              <br />⇔ {data.func}
              {data.need_Sqr && <sup>2</sup>} {phi} ={' '}
              {(data.val / data.factor).toLocaleString('de-De')}
              {data.need_Sqr && (
                <>
                  <br />⇔ {data.func} {phi} = {buildSqrt('0,5')} ={' '}
                  {buildBigSqrt(buildFrac(1, 2))} ={' '}
                  {buildFrac(1, <>{buildSqrt(2)}</>)} ={' '}
                  {buildFrac(
                    <>1 · {buildSqrt(2)}</>,
                    <>
                      {buildSqrt(2)} · {buildSqrt(2)}
                    </>
                  )}{' '}
                  = {buildFrac(<>{buildSqrt(2)}</>, 2)} = {buildFrac(1, 2)}
                  {buildSqrt(2)}
                </>
              )}
            </>
          )}
          <p>Bestimme daraus den passenden Wert für {phi}:</p>
          {buildBlock(
            'green',
            <>
              {phi} = {data.deg}°
            </>
          )}
        </>
      )}
      centAmount={35}
    />
  )
}
