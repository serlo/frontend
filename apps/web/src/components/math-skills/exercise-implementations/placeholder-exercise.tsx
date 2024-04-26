import { SelfEvaluationExercise } from './self-evaluation-exercise'

export function PlaceholderExercise() {
  return (
    <SelfEvaluationExercise
      generator={() => {
        return null
      }}
      renderTask={() => {
        return (
          <>
            <p>
              Diese Aufgabe befindet sich im Aufbau. Schaue in wenigen Tagen
              nochmal vorbei.
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
