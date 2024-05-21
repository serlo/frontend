import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildBigSqrt, buildFrac, buildJSX } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { roundToDigits } from '../utils/round-to-digits'
import { randomIntBetween } from '@/helper/random-int-between'

interface DATA {
  c1b: number
  c2b: number
  h: number
  M: number
  path: number
  V: number
}

const pi = 3.14159265359

export function Cone() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const c1b = randomIntBetween(2, 7)
        const h = randomIntBetween(3, 5)
        const c2b = c1b
        const M = c1b / 2
        const path = randomIntBetween(1, 4)
        const V = Math.round((Math.pow(M, 2) / 3) * pi * h)

        const data: DATA = {
          c1b,
          h,
          path,
          c2b,
          M,
          V,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <p className="serlo-main-task">
              Bei dem Kegel sind folgende Größen gegeben:
            </p>
            <Given data={data} />
            {renderDiagram(data)}
            <small className="mb-6 block">
              Skizze ist nicht maßstabsgetreu
            </small>
            <Task data={data} /> <br />
          </>
        )
      }}
      renderSolution={({ data }) => {
        return (
          <>
            <Solution data={data} />
          </>
        )
      }}
      // eslint-disable-next-line no-empty-pattern
      renderHint={({ data }) => {
        return <Hint data={data} />
      }}
    />
  )
}

function Given({ data }: { data: DATA }) {
  if (data.path === 1) {
    return (
      <p className="serlo-main-task">
        h = {pp(data.h)} cm, r = {pp(data.M)} cm
      </p>
    )
  }
  if (data.path === 2) {
    return (
      <p className="serlo-main-task">
        V = {pp(data.V)} cm³, r = {pp(data.M)} cm
      </p>
    )
  }
  if (data.path === 3) {
    return (
      <p className="serlo-main-task">
        V = {pp(data.V)} cm³, h = {pp(data.h)} cm
      </p>
    )
  }
  if (data.path === 4) {
    return (
      <p className="serlo-main-task">
        h = {pp(data.h)} cm, r = {pp(data.M)} cm
      </p>
    )
  }
}
function Task({ data }: { data: DATA }) {
  if (data.path === 1) {
    return (
      <>
        <p className="serlo-main-task">
          Berechnen Sie das Volumen{' '}
          <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">V</b> des
          Kegels.
        </p>{' '}
        <br />
        <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
      </>
    )
  }
  if (data.path === 2) {
    return (
      <>
        <p className="serlo-main-task">
          Berechnen Sie die Höhe{' '}
          <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">h</b> des
          Kegels.
        </p>{' '}
        <br />
        <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
      </>
    )
  }
  if (data.path === 3) {
    return (
      <>
        <p className="serlo-main-task">
          Berechnen Sie den Radius{' '}
          <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">r</b> des
          Kegels.
        </p>{' '}
        <br />
        <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
      </>
    )
  }
  if (data.path === 4) {
    return (
      <>
        <p className="serlo-main-task">
          Berechnen Sie den Oberflächeninhalt{' '}
          <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">O</b> des
          Kegels.
        </p>{' '}
        <br />
        <p>Runden Sie auf zwei Stellen nach dem Komma.</p>
      </>
    )
  }
}

function Hint({ data }: { data: DATA }) {
  if (data.path === 1 || data.path === 2 || data.path === 3) {
    return (
      <>
        <p className="serlo-main-task">
          Verwenden Sie die Formel des Volumens eines Kegels:
        </p>
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>1</>, <>3</>)} · r² · π · h
        </p>
      </>
    )
  }
  if (data.path === 4) {
    return (
      <>
        <p className="serlo-main-task">
          Und die Formel des Oberflächeninhalts eines Kegels:
        </p>
        <p className="serlo-highlight-gray">O = r · π · (r + s)</p>

        <p className="serlo-main-task">
          Verwenden Sie den Satz des Pythagoras:
        </p>
        <p className="serlo-highlight-gray">r² + h² = s²</p>
      </>
    )
  }
}

function Solution({ data }: { data: DATA }) {
  const zwi = Math.pow(data.M, 2) / 3
  if (data.path === 1) {
    const result_V = roundToDigits((Math.pow(data.M, 2) / 3) * pi * data.h, 2)
    return (
      <>
        <p>Stelle die Gleichung für das Volumen eines Kegels auf:</p>
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>1</>, <>3</>)} · r² · π · h
        </p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>1</>, <>3</>)} · ({pp(data.M)} cm)² · π ·{' '}
          {pp(data.h)} cm
        </p>
        <p>Berechne das Ergebnis:</p>
        <p className="serlo-highlight-gray">
          V = {pp(zwi)} cm² · π · {pp(data.h)} cm
        </p>{' '}
        <br />
        <p className="serlo-highlight-green">V = {pp(result_V)} cm³</p>
      </>
    )
  }
  if (data.path === 2) {
    const result_h = roundToDigits(
      (data.V * 3) / Math.PI / Math.pow(data.M, 2),
      2
    )
    return (
      <>
        <p>Stelle die Gleichung für das Volumen eines Kegels auf:</p>
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>1</>, <>3</>)} · r² · π · h
        </p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          {data.V} cm³ = {buildFrac(<>1</>, <>3</>)} · ({pp(data.M)} cm)² · π ·
          h
        </p>
        <p>Stelle nach h um:</p>
        <p className="serlo-highlight-gray">
          h = {buildFrac(<>{data.V} cm³ · 3</>, <>({pp(data.M)} cm)² · π</>)}
        </p>{' '}
        <br />
        <p className="serlo-highlight-green">h = {pp(result_h)} cm</p>
      </>
    )
  }
  if (data.path === 3) {
    const result_r = roundToDigits(
      Math.sqrt((data.V * 3) / data.h / Math.PI),
      2
    )
    return (
      <>
        <p>Stelle die Gleichung für das Volumen eines Kegels auf:</p>
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>1</>, <>3</>)} · r² · π · h
        </p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          {data.V} cm³ = {buildFrac(<>1</>, <>3</>)} · r² · π · {pp(data.h)} cm
        </p>
        <p>Stelle nach r um:</p>
        <p className="serlo-highlight-gray">
          r ={' '}
          {buildBigSqrt(
            <>
              {buildFrac(<>{pp(data.V)} cm³ · 3</>, <>{pp(data.h)} cm · π</>)}
            </>
          )}
        </p>{' '}
        <br />
        <p className="serlo-highlight-green">r = {pp(result_r)} cm</p>
      </>
    )
  }
  if (data.path === 4) {
    const cc = roundToDigits(
      Math.sqrt(Math.pow(data.M, 2) + Math.pow(data.h, 2)),
      2
    )
    const result = roundToDigits(data.M * pi * (data.M + cc), 2)

    return (
      <>
        <p>Stelle die Gleichung für den Oberflächeninhalt auf:</p>
        <p className="serlo-highlight-gray">O = r · π · (r + s)</p>
        <p>Stelle den Satz des Phythagoras auf:</p>
        <p className="serlo-highlight-gray">r² + h² = s²</p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          s² = ({pp(data.M)} cm)² + ({pp(data.h)} cm)² <br />s = {pp(cc)} cm
        </p>
        <p>Setze die Werte in die Gleichung des Oberflächeninhaltes ein:</p>
        <p className="serlo-highlight-gray">
          O = {pp(data.M)} cm · π · ({pp(data.M)} cm + {pp(cc)} cm)
        </p>{' '}
        <br />
        <p className="serlo-highlight-green">O = {pp(result)} cm²</p>
      </>
    )
  }
}
function getP1(data: DATA) {
  if (!data) {
    throw new Error('getP1 was called without data.')
  }
  const { c1b } = data
  if (c1b === 2) {
    const P1 = -0.18
    return P1
  }
  if (c1b === 3) {
    const P1 = -0.12
    return P1
  }
  if (c1b === 4) {
    const P1 = -0.11
    return P1
  }
  if (c1b === 5) {
    const P1 = -0.1
    return P1
  }
  if (c1b === 6) {
    const P1 = -0.1
    return P1
  }
  if (c1b === 7) {
    const P1 = -0.09
    return P1
  }
}

function getX2(data: DATA) {
  if (!data) {
    throw new Error('getX2 was called without data.')
  }

  const { c1b } = data
  if (c1b === 2) {
    const X2 = c1b + 0.18
    return X2
  }
  if (c1b === 3) {
    const X2 = c1b + 0.12
    return X2
  }
  if (c1b === 4) {
    const X2 = c1b + 0.11
    return X2
  }
  if (c1b === 5) {
    const X2 = c1b + 0.1
    return X2
  }
  if (c1b === 6) {
    const X2 = c1b + 0.1
    return X2
  }
  if (c1b === 7) {
    const X2 = c1b + 0.09
    return X2
  }
}

function renderDiagram(data: DATA) {
  const hi = data.h
  const x2 = data.c1b
  const Mi = x2 / 2
  return buildJSX(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-2, 6, 10, -2],
      showNavigation: false,
      showCopyright: false,
    })

    const M = b.create('point', [Mi, 0], {
      name: 'M',
      fixed: true,
      visible: true,
      label: { autoPosition: true },
    })

    const p1 = b.create('point', [() => getP1(data), 0], {
      name: '',
      fixed: true,
      visible: false,
      label: { autoPosition: true },
    })

    const H = b.create('point', [Mi, hi], {
      name: 'S',
      fixed: true,
      visible: true,
      label: { autoPosition: true },
    })

    const p3 = b.create('point', [() => getX2(data), 0], {
      name: '',
      fixed: true,
      visible: false,
      label: { autoPosition: true },
    })

    b.create('line', [p1, H], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
    })
    b.create('line', [p3, H], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
    })
    b.create('line', [M, p3], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
    })

    const c1a = b.create('point', [0, 0], {
      name: 'Ursprung',
      fixed: true,
      visible: false,
      label: { autoPosition: true },
    })

    const c1b = b.create('point', [x2, 0], {
      name: '',
      visible: false,
      fixed: true,
    })

    const c1c = b.create('point', [Mi, 0.6], {
      name: '',
      visible: false,
      fixed: true,
    })

    b.create('ellipse', [c1a, c1b, c1c, 0, pi], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
      dash: 3,
    })

    b.create('ellipse', [c1a, c1b, c1c, pi, 2 * pi], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
    })

    return b
  }, data)
}
