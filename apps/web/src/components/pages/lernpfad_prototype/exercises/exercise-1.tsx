import type { ExerciseProps } from '../types'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export function Exercise1({
  id,
  data,
  onBackToMapClick,
  onSubmitClick,
  onNextExerciseClick,
}: ExerciseProps) {
  if (id === null) return null

  return (
    <div className="h-screen w-screen">
      <button className="absolute left-4 top-4" onClick={onBackToMapClick}>
        Back to map
      </button>

      <div className="flex h-full flex-col items-center justify-center">
        <h1>{data.title}</h1>
        <EditorRenderer document={data.state} />
        {data.done ? (
          renderDoneState()
        ) : (
          <button
            className="serlo-button-edit-primary"
            onClick={() => onSubmitClick(id)}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  )

  function renderDoneState() {
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
}
