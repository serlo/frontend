import { ExerciseProps } from '../types'
import { BackLink } from './back-link'
import { DoneState } from './done'

export function Exercise(props: ExerciseProps) {
  const { id, data, onSubmitClick } = props
  if (id === null) return null

  return (
    <div className="h-screen w-screen">
      <BackLink {...props} />

      <div className="flex h-full flex-col items-center justify-center">
        <h1>{data.title}</h1>
        {data.done ? (
          <DoneState {...props} />
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
}
