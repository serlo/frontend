import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  buildBlock,
  buildFrac,
  buildJSX,
  buildSqrt,
  buildVec,
  buildVec2,
} from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface DATA {
  deg: number
  tx: number
  ty: number
  rx_off: number
  w: number
  h: number
  rx: number
  ry: number
  x_from: number
  x_to: number
  y_from: number
  y_to: number
}

export function Parallelogram1() {
  const phi = <span className="font-mono">ϕ</span>
  return (
    <SelfEvaluationExercise
      generator={() => {
        const deg = randomItemFromArray([30, 60, 90])
        const tx = randomIntBetween(-4, -1)
        const ty = randomIntBetween(1, 5)
        const rx_off = randomIntBetween(1, 6)
        const w =
          deg === 30 ? randomIntBetween(1, 3) * 2 : randomIntBetween(2, 6)
        const h =
          deg === 60 ? randomIntBetween(1, 3) * 2 : randomIntBetween(2, 6)

        const rx =
          rx_off +
          (deg === 30
            ? w * Math.pow(Math.cos((deg / 180) * Math.PI), 2)
            : w * Math.cos((deg / 180) * Math.PI))
        const ry =
          deg === 60
            ? h * Math.pow(Math.sin((deg / 180) * Math.PI), 2)
            : h * Math.sin((deg / 180) * Math.PI)
        return {
          deg,
          tx,
          ty,
          rx_off,
          w,
          h,
          rx,
          ry,
          x_from: tx - 1,
          x_to: rx_off + w + 1,
          y_from: -1,
          y_to: Math.max(7, h + ty + 1),
        }
      }}
      renderTask={(data) => (
        <>
          <p className="text-2xl">
            Seien die Pfeile {buildVec('OT')} = {buildVec2(data.tx, data.ty)}{' '}
            und{' '}
            {buildVec(
              <>
                OR<sub>n</sub>
              </>
            )}{' '}
            ={' '}
            {buildVec2(
              <>
                {data.rx_off} + {data.w} · cos
                {data.deg === 30 ? <sup>2</sup> : null} {phi}
              </>,
              <>
                {data.h} · sin{data.deg === 60 ? <sup>2</sup> : null} {phi}
              </>
            )}{' '}
            gegeben.
          </p>
          <p className="mt-4 text-2xl">
            Diese spannen mit dem Ursprung O ( 0 | 0 ) für {phi} ∈ [0°; 90°]
            Parallelogramme OR<sub>n</sub>S<sub>n</sub>T auf.
          </p>
          <p className="mt-4 text-2xl">
            Berechnen Sie die Koordinaten des Pfeils{' '}
            {buildVec(
              <>
                OR<sub>1</sub>
              </>
            )}{' '}
            für {phi} = {data.deg}°. Zeichnen Sie das Parallelogramm in ein
            Koordinatensystem ein.
          </p>
          <p className="mt-4 text-lg">
            Platzbedarf: {data.x_from} ≤ x ≤ {data.x_to}; {data.y_from} ≤ y ≤{' '}
            {data.y_to}
          </p>
        </>
      )}
      renderSolution={(data) => (
        <>
          Setze {phi} = {data.deg}° ein und verwende, dass Sinus und Kosinus
          besondere Werte für diesen Winkel annehmen:
          <br />
          {buildBlock(
            'green',
            <>
              {buildVec(
                <>
                  OR<sub>1</sub>
                </>
              )}{' '}
              ={' '}
              {buildVec2(
                <>
                  {data.rx_off} + {data.w} · cos
                  {data.deg === 30 ? <sup>2</sup> : null} {data.deg}°
                </>,
                <>
                  {data.h} · sin{data.deg === 60 ? <sup>2</sup> : null}{' '}
                  {data.deg}°
                </>
              )}
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;={' '}
              {data.deg === 90 ? (
                <>
                  {buildVec2(
                    <>
                      {data.rx_off} + {data.w} · 0
                    </>,
                    <>{data.h} · 1</>
                  )}
                </>
              ) : data.deg === 60 ? (
                <>
                  {buildVec2(
                    <>
                      {data.rx_off} + {data.w} · 0,5
                    </>,
                    <>
                      {data.h} · (
                      <span className="text-lg">{buildFrac(1, 2)}</span>
                      {buildSqrt(3)})<sup>2</sup>
                    </>
                  )}{' '}
                  ={' '}
                  {buildVec2(
                    <>
                      {data.rx_off} + {pp(data.w / 2)}
                    </>,
                    <>{data.h} · 0,25 · 3</>
                  )}
                </>
              ) : (
                <>
                  {buildVec2(
                    <>
                      {data.rx_off} + {data.w} · (
                      <span className="text-lg">{buildFrac(1, 2)}</span>
                      {buildSqrt(3)})<sup>2</sup>
                    </>,
                    <>{data.h} · 0,5</>
                  )}{' '}
                  ={' '}
                  {buildVec2(
                    <>
                      {data.rx_off} + {data.w} · 0,25 · 3
                    </>,
                    <>{pp(data.h / 2)} </>
                  )}
                </>
              )}{' '}
              = {buildVec2(pp(data.rx), pp(data.ry))}
            </>
          )}
          <br />
          <br />
          Zeiche die Pfeile {buildVec('OT')} und{' '}
          {buildVec(
            <>
              OR<sub>1</sub>
            </>
          )}{' '}
          in das Koordinatensystem ein. <br />
          Hänge anschließend den Pfeil {buildVec('OT')} an die Spitze von{' '}
          {buildVec(
            <>
              OR<sub>1</sub>
            </>
          )}
          , um zum Punkt S<sub>1</sub> zu kommen.
          <br />
          Verbinde die Punkte zu einem Parallelogramm:
          <br />
          {renderDiagram(data)}
        </>
      )}
      renderHint={() => {
        return (
          <>
            Sinus und Kosinus nehmen für die Winkel 30°, 60° und 90° besondere
            Werte an:
            <br />
            <span className="mt-3 inline-block rounded-md bg-gray-300 bg-opacity-20 p-1 px-3 text-2xl">
              · sin(30°) = 0,5
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cos(30°)
              = {buildFrac(1, 2)}
              {buildSqrt(3)}
              <br />· sin(60°) = {buildFrac(1, 2)}
              {buildSqrt(3)}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cos(60°) =
              0,5
              <sup>2</sup>
              <br />· sin(90°) =
              1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              cos(90°) = 0
            </span>
          </>
        )
      }}
    />
  )
}

function renderDiagram(data: DATA) {
  return buildJSX(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [data.x_from, data.y_to, data.x_to, data.y_from],
      showNavigation: false,
      showCopyright: false,
      axis: true,
      defaultAxes: {
        x: {
          ticks: {
            ticksDistance: 1,
            insertTicks: false,
          },
        },
        y: {
          ticks: {
            ticksDistance: 1,
            insertTicks: false,
          },
        },
      },
    })

    const O = b.create('point', [0, 0], {
      name: 'O',
      label: { autoPosition: true },
    })

    const R = b.create('point', [data.rx, data.ry], {
      name: 'R<sub>1</sub>',
      label: { autoPosition: true },
    })

    const T = b.create('point', [data.tx, data.ty], {
      name: 'T',
      label: { autoPosition: true },
    })

    const S = b.create('point', [data.tx + data.rx, data.ty + data.ry], {
      name: 'S<sub>1</sub>',
      label: { autoPosition: true },
    })

    b.create('segment', [O, R])
    b.create('segment', [R, S])
    b.create('segment', [S, T])
    b.create('segment', [T, O])

    return b
  }, data)
}
