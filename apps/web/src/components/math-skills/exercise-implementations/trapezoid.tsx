import { SelfEvaluationExercise } from './self-evaluation-exercise'
import { buildOverline } from '../utils/math-builder'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  alpha: number
  beta: number
  gamma: number
  delta: number
  isEqualSided: boolean
}

export function Trapezoid() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return {} as unknown as DATA
      }}
      renderTask={() => {
        return (
          <>
            <p className="serlo-main-task">
              Gegeben sei das Trapez ABCD mit {buildOverline('AB')} ||{' '}
              {buildOverline('CD')} mit der Höhe X cm.
            </p>
            <p className="serlo-main-task">
              Es gilt: |{buildOverline('AB')}| = Y cm und |{buildOverline('AB')}
              | = Z cm
            </p>
          </>
        )
      }}
      renderSolution={() => {
        return <></>
      }}
    />
  )
}
