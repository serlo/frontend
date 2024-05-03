import { SelfEvaluationExercise } from './self-evaluation-exercise'

export function FindParabola() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return null
      }}
      renderTask={() => {
        return (
          <>
            <p className="serlo-main-task"></p>
          </>
        )
      }}
      renderSolution={() => {
        return <></>
      }}
    />
  )
}
