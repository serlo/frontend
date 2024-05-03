import JXG from 'jsxgraph'
import { pi } from 'mathjs'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildFrac, buildJSX, buildSqrt } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'

interface DATA {
  c1b: number
  c2b: number
  h: number
  M: number
  path: number
}

export function Cylinder() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const c1b = randomIntBetween(2, 7)
        const h = randomIntBetween(2, 4)
        const c2b = c1b
        const M = c1b / 2
        const path = randomIntBetween(1, 4)

        const data: DATA = {
          c1b,
          h,
          path,
          c2b,
          M,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <p className="serlo-main-task">
              Bei dem Zylinder sind folgende Größen gegeben:
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
function getP1(data: DATA) {
  if (!data) {
    throw new Error('getP1 was called without data.')
  }
  const { c1b } = data
  if (c1b === 2) {
    const P1 = -0.41
    return P1
  }
  if (c1b === 3) {
    const P1 = -0.3
    return P1
  }
  if (c1b === 4) {
    const P1 = -0.24
    return P1
  }
  if (c1b === 5) {
    const P1 = -0.19
    return P1
  }
  if (c1b === 6) {
    const P1 = -0.16
    return P1
  }
  if (c1b === 7) {
    const P1 = -0.14
    return P1
  }
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
    const result = Math.round(Math.pow(data.M, 2) * pi * data.h * 100) / 100
    return (
      <p className="serlo-main-task">
        V = {pp(result)} cm³, r = {pp(data.M)} cm
      </p>
    )
  }
  if (data.path === 3) {
    const result = Math.round(Math.pow(data.M, 2) * pi * data.h * 100) / 100
    return (
      <p className="serlo-main-task">
        V = {pp(result)} cm³, h = {pp(data.h)} cm
      </p>
    )
  }
  if (data.path === 4) {
    const result = Math.round(Math.pow(data.M, 2) * pi * data.h * 100) / 100
    return (
      <p className="serlo-main-task">
        V = {pp(result)} cm³, r = {pp(data.M)} cm
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
          Zylinders.
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
          Zylinders.
        </p>{' '}
        <br />
        <p>Runden Sie auf eine ganze Zahl.</p>
      </>
    )
  }
  if (data.path === 3) {
    return (
      <>
        <p className="serlo-main-task">
          Berechnen Sie den Radius{' '}
          <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">r</b> des
          Zylinders.
        </p>{' '}
        <br />
        <p>Runden Sie auf eine ganze Zahl.</p>
      </>
    )
  }
  if (data.path === 4) {
    return (
      <>
        <p className="serlo-main-task">
          Berechnen Sie den Oberflächeninhalt{' '}
          <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">O</b> des
          Zylinders.
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
          Verwenden Sie die Formel des Volumens eines Zylinders:
        </p>
        <p className="serlo-highlight-gray">V = r² · π · h</p>
      </>
    )
  }
  if (data.path === 4) {
    return (
      <>
        <p className="serlo-main-task">
          Verwenden Sie die Formel des Volumens eines Zylinders:
        </p>
        <p className="serlo-highlight-gray">V = r² · π · h</p>
        <p className="serlo-main-task">
          Und die Formel des Oberflächeninhalts eines Zylinders:
        </p>
        <p className="serlo-highlight-gray">O = 2 · r · π · (r + h)</p>
      </>
    )
  }
}

function Solution({ data }: { data: DATA }) {
  if (data.path === 1) {
    const result = Math.round(Math.pow(data.M, 2) * pi * data.h * 100) / 100
    return (
      <>
        <p>Stelle die Gleichung für das Volumen eines Zylinders auf:</p>
        <p className="serlo-highlight-gray">V = r² · π · h</p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          V = ({data.M.toLocaleString('de-De')} cm)² · π ·{' '}
          {data.h.toLocaleString('de-De')} cm
        </p>
        <p>Berechne das Ergebnis:</p>
        <p className="serlo-highlight-gray">
          V = {Math.pow(data.M, 2).toLocaleString('de-De')} cm² · π ·{' '}
          {data.h.toLocaleString('de-De')} cm
        </p>{' '}
        <br />
        <p className="serlo-highlight-green">V = {pp(result)} cm³</p>
      </>
    )
  }
  if (data.path === 2) {
    const result = Math.round(Math.pow(data.M, 2) * pi * data.h * 100) / 100
    return (
      <>
        <p>Stelle die Gleichung für das Volumen eines Zylinders auf:</p>
        <p className="serlo-highlight-gray">V = r² · π · h</p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          {result.toLocaleString('de-De')} cm³ = (
          {data.M.toLocaleString('de-De')} cm)² · π · h
        </p>
        <p>Stelle nach h um:</p>
        <p className="serlo-highlight-gray">
          h ={' '}
          {buildFrac(
            <>{result.toLocaleString('de-De')} cm³</>,
            <>({data.M.toLocaleString('de-De')} cm)² · π</>
          )}
        </p>{' '}
        <br />
        <p className="serlo-highlight-green">h ≈ {pp(data.h)} cm</p>
      </>
    )
  }
  if (data.path === 3) {
    const result = Math.round(Math.pow(data.M, 2) * pi * data.h * 100) / 100
    return (
      <>
        <p>Stelle die Gleichung für das Volumen eines Zylinders auf:</p>
        <p className="serlo-highlight-gray">V = r² · π · h</p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          {result.toLocaleString('de-De')} cm³ = r² · π ·{' '}
          {data.h.toLocaleString('de-De')} cm
        </p>
        <p>Stelle nach r um:</p>
        <p className="serlo-highlight-gray">
          r ={' '}
          {buildSqrt(
            <>
              {buildFrac(
                <>{result.toLocaleString('de-De')} cm³</>,
                <>({data.h.toLocaleString('de-De')} cm) · π</>
              )}
            </>
          )}
        </p>{' '}
        <br />
        <p className="serlo-highlight-green">r ≈ {pp(data.c1b)} cm</p>
      </>
    )
  }
  if (data.path === 4) {
    const result = Math.round(Math.pow(data.M, 2) * pi * data.h * 100) / 100
    const ob = Math.round(2 * data.M * pi * (data.M + data.h) * 100) / 100
    return (
      <>
        <p>Stelle die Gleichung für den Oberflächeninhalt auf:</p>
        <p className="serlo-highlight-gray">O = 2 · r · π · (r + h)</p>
        <p>Stelle die Gleichung für das Volumen eines Zylinders auf:</p>
        <p className="serlo-highlight-gray">V = r² · π · h</p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          {result.toLocaleString('de-De')} cm³ = (
          {data.M.toLocaleString('de-De')} cm)² · π · h
        </p>
        <p>Stelle nach h um:</p>
        <p className="serlo-highlight-gray">
          h ={' '}
          {buildFrac(
            <>{result.toLocaleString('de-De')} cm³</>,
            <>({data.M.toLocaleString('de-De')} cm)² · π</>
          )}
        </p>{' '}
        <br />
        <p className="serlo-highlight-gray">h ≈ {pp(data.h)} cm</p>
        <p>Setze alle Werte in die Gleichung des Oberflächeninhaltes ein:</p>
        <p className="serlo-highlight-gray">
          O = 2 · {data.M.toLocaleString('de-De')} cm · π · (
          {data.M.toLocaleString('de-De')} cm + {data.h.toLocaleString('de-De')}{' '}
          cm)
        </p>{' '}
        <br />
        <p className="serlo-highlight-green">O = {pp(ob)} cm²</p>
      </>
    )
  }
}

function getX2(data: DATA) {
  if (!data) {
    throw new Error('getX2 was called without data.')
  }

  const { c1b } = data
  if (c1b === 2) {
    const X2 = c1b + 0.41
    return X2
  }
  if (c1b === 3) {
    const X2 = c1b + 0.3
    return X2
  }
  if (c1b === 4) {
    const X2 = c1b + 0.24
    return X2
  }
  if (c1b === 5) {
    const X2 = c1b + 0.19
    return X2
  }
  if (c1b === 6) {
    const X2 = c1b + 0.16
    return X2
  }
  if (c1b === 7) {
    const X2 = c1b + 0.14
    return X2
  }
}

function renderDiagram(data: DATA) {
  const hi = data.h
  const hiMi = hi + 1
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

    const p2 = b.create('point', [() => getP1(data), hi], {
      name: '',
      fixed: true,
      visible: false,
      label: { autoPosition: true },
    })

    const p3 = b.create('point', [() => getX2(data), 0], {
      name: '',
      fixed: true,
      visible: false,
      label: { autoPosition: true },
    })

    const p4 = b.create('point', [() => getX2(data), hi], {
      name: '',
      fixed: true,
      visible: false,
      label: { autoPosition: true },
    })

    b.create('line', [p1, p2], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
    })
    b.create('line', [p3, p4], {
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

    const c1c = b.create('point', [Mi, 1], {
      name: '',
      visible: false,
      fixed: true,
    })
    const c2a = b.create('point', [0, hi], {
      name: '',
      fixed: true,
      visible: false,
      label: { autoPosition: true },
    })
    const c2b = b.create('point', [x2, hi], {
      name: '',
      visible: false,
      fixed: true,
    })
    const c2c = b.create('point', [Mi, hiMi], {
      name: '',
      visible: false,
      fixed: true,
    })

    b.create('ellipse', [c1a, c1b, c1c, 0, pi], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
      dash: 2,
    })

    b.create('ellipse', [c1a, c1b, c1c, pi, 2 * pi], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
    })

    b.create('ellipse', [c2a, c2b, c2c], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
    })
    return b
  }, data)
}
