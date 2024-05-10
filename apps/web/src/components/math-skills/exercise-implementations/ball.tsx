import JXG from 'jsxgraph'

import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildBigSqrt, buildFrac, buildJSX } from '../utils/math-builder'
import { pp } from '../utils/pretty-print'
import { randomIntBetween } from '@/helper/random-int-between'
import { randomItemFromArray } from '@/helper/random-item-from-array'

interface DATA {
  c1b: number
  c2b: number
  h: number
  M: number
  path: number
  dia: number
}

const pi = 3.14159265359

export function Ball() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        const c1b = randomIntBetween(1, 3)
        const h = randomIntBetween(1, 3)
        const c2b = c1b
        const M = c1b / 2
        const path = randomIntBetween(1, 4)
        const factor1 = randomItemFromArray([0.79, 0.69, 0.74, 0.81, 0.73])
        const factor2 = randomIntBetween(4, 7)
        const dia = factor1 * factor2

        const data: DATA = {
          c1b,
          h,
          path,
          c2b,
          M,
          dia,
        }
        return { data }
      }}
      renderTask={({ data }) => {
        return (
          <>
            <p className="serlo-main-task">
              Bei der Kugel sind folgende Größen gegeben:
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
  const rad = Math.round((data.dia / 2) * 100) / 100
  if (data.path === 1) {
    return <p className="serlo-main-task">r = {pp(rad)} cm</p>
  }
  if (data.path === 2) {
    return <p className="serlo-main-task">d = {pp(rad)} cm</p>
  }
  if (data.path === 3) {
    const rad = data.dia / 2

    const result = Math.round(Math.pow(rad, 3) * (4 / 3) * pi * 100) / 100
    return <p className="serlo-main-task">V = {pp(result)} cm³</p>
  }
  if (data.path === 4) {
    return <p className="serlo-main-task">r = {pp(rad)} cm</p>
  }
}
function Task({ data }: { data: DATA }) {
  if (data.path === 1) {
    return (
      <>
        <p className="serlo-main-task">
          Berechnen Sie das Volumen{' '}
          <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">V</b> der
          Kugel.
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
          Berechnen Sie das Volumen{' '}
          <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">V</b> der
          Kugel.
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
          <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">r</b> der
          Kugel.
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
          <b className="rounded-md bg-gray-400 bg-opacity-20 p-1">O</b> der
          Kugel.
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
          Verwenden Sie die Formel des Volumens einer Kugel:
        </p>
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>4</>, <>3</>)} · r³ · π
        </p>
      </>
    )
  }
  if (data.path === 4) {
    return (
      <>
        <p className="serlo-main-task">
          Verwenden Sie die Formel für den Oberflächeninhalt:
        </p>
        <p className="serlo-highlight-gray">O = 4 · π · r²</p>
      </>
    )
  }
}

function Solution({ data }: { data: DATA }) {
  const rad = data.dia / 2
  const zwi = Math.round(Math.pow(rad, 3) * (4 / 3) * 100) / 100
  const result = Math.round(Math.pow(rad, 3) * (4 / 3) * pi * 100) / 100
  if (data.path === 1) {
    return (
      <>
        <p>Stelle die Gleichung für das Volumen einer Kugel auf:</p>
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>4</>, <>3</>)} · r³ · π
        </p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>4</>, <>3</>)} · ({rad.toLocaleString('de-De')} cm)³
          · π
        </p>
        <p>Berechne das Ergebnis:</p>
        <p className="serlo-highlight-gray">V = {pp(zwi)} cm³ · π</p> <br />
        <p className="serlo-highlight-green">V ≈ {pp(result)} cm³</p>
      </>
    )
  }
  if (data.path === 2) {
    const rrad = Math.round(rad * 100) / 100
    return (
      <>
        <p>Stelle die Gleichung für das Volumen einer Kugel auf:</p>
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>4</>, <>3</>)} · r³ · π
        </p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          r = {buildFrac(<>d</>, <>2</>)} &nbsp; &nbsp; r = {rrad} cm
        </p>{' '}
        <br />
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>4</>, <>3</>)} · ({rrad.toLocaleString('de-De')} cm)³
          · π
        </p>
        <p>Berechne das Ergebnis:</p>
        <p className="serlo-highlight-gray">V = {pp(zwi)} cm³ · π</p> <br />
        <p className="serlo-highlight-green">V ≈ {pp(result)} cm³</p>
      </>
    )
  }
  if (data.path === 3) {
    const rrad = Math.round(rad * 100) / 100
    return (
      <>
        <p>Stelle die Gleichung für das Volumen einer Kugel auf:</p>
        <p className="serlo-highlight-gray">
          V = {buildFrac(<>4</>, <>3</>)} · r³ · π
        </p>
        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">
          {result.toLocaleString('de-De')} cm³ = {buildFrac(<>4</>, <>3</>)} ·
          r³ · π
        </p>
        <p>Stelle nach r um:</p>
        <p className="serlo-highlight-gray">
          r = ³
          {buildBigSqrt(
            <>
              {buildFrac(
                <>{result.toLocaleString('de-De')} cm³ · 3</>,
                <>4 · π</>
              )}
            </>
          )}
        </p>{' '}
        <br />
        <p className="serlo-highlight-green">r ≈ {pp(rrad)} cm</p>
      </>
    )
  }
  if (data.path === 4) {
    const ob = Math.round(Math.pow(rad, 2) * 4 * pi * 100) / 100

    return (
      <>
        <p>Stelle die Gleichung für den Oberflächeninhalt auf:</p>
        <p className="serlo-highlight-gray">O = 4 · π · r²</p>

        <p>Setze die Angaben in die Gleichung ein:</p>
        <p className="serlo-highlight-gray">O = 4 · π · ({rad} cm)²</p>
        <br />
        <p className="serlo-highlight-green">O = {pp(ob)} cm²</p>
      </>
    )
  }
}
function getP1(data: DATA) {
  if (!data) {
    throw new Error('getP1 was called without data.')
  }
  const { dia } = data
  const back = -dia / 5.5

  return back
}

function getX2(data: DATA) {
  if (!data) {
    throw new Error('getX2 was called without data.')
  }

  const { dia } = data
  const back = dia + dia / 5.5

  return back
}

function renderDiagram(data: DATA) {
  const diam = data.dia
  const rad = diam / 2

  return buildJSX(() => {
    const b = JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-2, 6, 10, -2],
      showNavigation: false,
      showCopyright: false,
    })

    // Punkte für die horizontale Ellipse
    //const c1a = b.create('point', [-0.65, 2.5], { visible: false })
    const c1a = b.create('point', [() => getP1(data), rad], { visible: false })
    //const c1b = b.create('point', [5.65, 2.5], { visible: false })
    const c1b = b.create('point', [() => getX2(data), rad], { visible: false })
    const c1c = b.create('point', [2.5, 1.6], { visible: false })

    // Erste Halbellipse (vorne, durchgehend)
    b.create('ellipse', [c1a, c1b, c1c, 0, Math.PI], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
      dash: 3,
    })

    // Zweite Halbellipse (hinten, gestrichelt)
    b.create('ellipse', [c1a, c1b, c1c, Math.PI, 2 * Math.PI], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
    })

    // Dritte Ellipse (vertikal, in der Mitte geschnitten)
    const c2a = b.create('point', [0, rad], { visible: false })
    const c2b = b.create('point', [diam, rad], { visible: false })
    const c2c = b.create('point', [rad, 0], { visible: false }) // Kontrollpunkt seitlich versetzt

    b.create('ellipse', [c2a, c2b, c2c], {
      straightFirst: false,
      straightLast: false,
      strokeWidth: 2,
    })

    return b
  }, data)
}
