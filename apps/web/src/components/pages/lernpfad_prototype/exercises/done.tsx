import { ExerciseProps } from '../types'

export function DoneState({ data, onNextExerciseClick }: ExerciseProps) {
  return (
    <div className="text-center">
      <p>Exercise done!</p>
      <div className="align-center flex justify-center gap-2">
        {data.nextExercises?.map((nextId) => (
          <button
            key={nextId}
            className="serlo-button-edit-primary"
            onClick={() => onNextExerciseClick(nextId)}
          >
            Go to {nextId}
          </button>
        ))}
      </div>
    </div>
  )
}
