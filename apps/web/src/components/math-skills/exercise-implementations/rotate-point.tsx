import { SelfEvaluationExercise } from './self-evaluation-exercise'
import {
  buildBlock,
  buildJSX,
  buildMat2,
  buildSqrt,
  buildVec,
  buildVec2,
} from '../utils/math-builder'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface DATA {
  centerx: number
  centery: number
  ax: number
  ay: number
  bx: number
  by: number
  cx: number
  cy: number
  len: number
  deg: number
}

export function RotatePoint() {
  function buildC(data: DATA) {
    return data.deg === 90 ? (
      <>
        C ( {Math.round(data.cx)} | {Math.round(data.cy)})
      </>
    ) : data.deg === 30 ? (
      <>
        C ( {data.ax === 0 ? null : <>{data.ax} + </>}
        {data.len > 2 ? 0.5 * data.len : ''}
        {buildSqrt(3)} | {Math.round(data.cy)} )
      </>
    ) : (
      <>
        C ( {Math.round(data.cx)} | {data.ay === 0 ? null : <>{data.ay} + </>}
        {data.len > 2 ? 0.5 * data.len : ''}
        {buildSqrt(3)} )
      </>
    )
  }
  return (
    <SelfEvaluationExercise
      generator={() => {
        const centerx = randomIntBetween(-4, 4)
        const centery = randomIntBetween(-4, 4)
        const deg = randomItemFromArray([30, 60, 90])
        const len = randomItemFromArray([2, 4, 6])
        const hlen = Math.round(len / 2)
        const ax = centerx - hlen
        const ay = centery - hlen
        const bx = ax + len
        const by = ay
        const cx = ax + Math.cos((deg / 180) * Math.PI) * len
        const cy = ay + Math.sin((deg / 180) * Math.PI) * len
        return { ax, ay, bx, by, deg, centerx, centery, cx, cy, len }
      }}
      renderTask={(data) => (
        <>
          <p className="text-2xl">
            Der Punkt B ( {data.bx} | {data.by} ) wird durch Drehung um A ({' '}
            {data.ax} | {data.ay} ) auf den Punkt C abgebildet. Der Drehwinkel
            beträgt {data.deg}°.
          </p>{' '}
          <p className="mt-3 text-2xl">
            Zeigen Sie: Der Punkt C hat die Koordinaten {buildC(data)}.
          </p>
        </>
      )}
      renderSolution={(data) => (
        <>
          <p>
            Stelle als erstes den Vektor {buildVec(<>AB</>)} auf
            (Spitze-Minus-Fuß):
          </p>
          {buildBlock(
            'gray',
            <>
              {buildVec(<>AB</>)} = {buildVec2(data.len, 0)}
            </>
          )}
          <p>
            Stelle für die Berechnung von {buildVec(<>AC</>)} eine
            Matrix-Multiplikation mit der Drehmatrix zum Winkel {data.deg}° auf:
          </p>
          {buildBlock(
            'gray',
            <>
              {buildVec(<>AC</>)} ={' '}
              {buildMat2(
                `cos${data.deg}°`,
                `-sin${data.deg}°`,
                `sin${data.deg}°`,
                `cos${data.deg}°`
              )}{' '}
              ⊙ {buildVec2(data.len, 0)}
            </>
          )}
          <p>
            Setze die passenden Werte ein (nutze wenn nötig die Formelsammlung)
            und berechne den Wert von {buildVec(<>AC</>)}:
          </p>
          {data.deg === 90
            ? buildBlock(
                'gray',
                <>
                  {buildVec(<>AC</>)} = {buildMat2(0, -1, 1, 0)} ⊙{' '}
                  {buildVec2(data.len, 0)} = {buildVec2(0, data.len)}
                </>
              )
            : data.deg === 30
              ? buildBlock(
                  'gray',
                  <>
                    {buildVec(<>AC</>)} ={' '}
                    {buildMat2(
                      <>0,5{buildSqrt(3)}</>,
                      '-0,5',
                      '0,5',
                      <>0,5{buildSqrt(3)}</>
                    )}{' '}
                    ⊙ {buildVec2(data.len, 0)} ={' '}
                    {buildVec2(
                      <>
                        0,5{buildSqrt(3)} · {data.len}
                      </>,
                      <>0,5 · {data.len}</>
                    )}{' '}
                    ={' '}
                    {buildVec2(
                      <>
                        {data.len > 2 ? data.len / 2 : ''}
                        {buildSqrt(3)}
                      </>,
                      <>{data.len / 2}</>
                    )}
                  </>
                )
              : buildBlock(
                  'gray',
                  <>
                    {buildVec(<>AC</>)} ={' '}
                    {buildMat2(
                      '0,5',
                      <>-0,5{buildSqrt(3)}</>,
                      <>0,5{buildSqrt(3)}</>,
                      '0,5'
                    )}{' '}
                    ⊙ {buildVec2(data.len, 0)} ={' '}
                    {buildVec2(
                      <>0,5 · {data.len}</>,
                      <>
                        0,5{buildSqrt(3)} · {data.len}
                      </>
                    )}{' '}
                    ={' '}
                    {buildVec2(
                      <>{data.len / 2}</>,
                      <>
                        {data.len > 2 ? data.len / 2 : ''}
                        {buildSqrt(3)}
                      </>
                    )}
                  </>
                )}
          <p>
            Hänge den Vektor {buildVec(<>AC</>)} an den Ortsvektor{' '}
            {buildVec(<>OA</>)} an, um den Ortsvektor und damit die Koordinaten
            von C zu erhalten:
          </p>
          {data.deg === 90
            ? buildBlock(
                'gray',
                <>
                  {buildVec('OC')} = {buildVec('OA')} ⊕ {buildVec('AC')} ={' '}
                  {buildVec2(data.ax, data.ay)} ⊕ {buildVec2(0, data.len)} ={' '}
                  {buildVec2(data.ax, data.ay + data.len)}
                </>
              )
            : data.deg === 30
              ? buildBlock(
                  'gray',
                  <>
                    {buildVec('OC')} = {buildVec('OA')} ⊕ {buildVec('AC')} ={' '}
                    {buildVec2(data.ax, data.ay)} ⊕{' '}
                    {buildVec2(
                      <>
                        {data.len > 2 ? data.len / 2 : ''}
                        {buildSqrt(3)}
                      </>,
                      <>{data.len / 2}</>
                    )}{' '}
                    ={' '}
                    {buildVec2(
                      <>
                        {data.ax} + {data.len > 2 ? data.len / 2 : ''}
                        {buildSqrt(3)}
                      </>,
                      data.ay + data.len / 2
                    )}
                  </>
                )
              : buildBlock(
                  'gray',
                  <>
                    {buildVec('OC')} = {buildVec('OA')} ⊕ {buildVec('AC')} ={' '}
                    {buildVec2(data.ax, data.ay)} ⊕{' '}
                    {buildVec2(
                      <>{data.len / 2}</>,
                      <>
                        {data.len > 2 ? data.len / 2 : ''}
                        {buildSqrt(3)}
                      </>
                    )}{' '}
                    ={' '}
                    {buildVec2(
                      data.ax + data.len / 2,
                      <>
                        {data.ay} + {data.len > 2 ? data.len / 2 : ''}
                        {buildSqrt(3)}
                      </>
                    )}
                  </>
                )}
          <p>Erhalte daraus die angegebenen Koordinaten für C:</p>
          {buildBlock('green', buildC(data))}
          <p className="mt-6">
            Hier ist eine Skizze zur Veranschaulichung (nicht Teil der
            Aufgabenstellung):
          </p>
          {renderDiagram(data)}
        </>
      )}
    />
  )
}

function renderDiagram(data: DATA) {
  return buildJSX(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [
        data.centerx - 5,
        data.centery + 5,
        data.centerx + 5,
        data.centery - 5,
      ],
      showNavigation: false,
      showCopyright: false,
      axis: true,
    })

    const A = b.create('point', [data.ax, data.ay], {
      name: 'A',
      fixed: true,
      label: { autoPosition: true },
    })
    const B = b.create('point', [data.bx, data.by], {
      name: 'B',
      fixed: true,
      label: { autoPosition: true },
    })
    const C = b.create('point', [data.cx, data.cy], {
      name: 'C',
      fixed: true,
      label: { autoPosition: true },
    })
    b.create('segment', [A, B])
    b.create('segment', [A, C])

    return b
  }, data)
}
