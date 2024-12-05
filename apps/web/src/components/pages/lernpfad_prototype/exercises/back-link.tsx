import { ExerciseProps } from '../types.js'

export function BackLink({ onBackToMapClick }: ExerciseProps) {
  return (
    <button className="absolute left-4 top-4" onClick={onBackToMapClick}>
      Back to map
    </button>
  )
}
