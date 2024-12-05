import type { ExerciseId, ExercisesRecord } from './types'
import { cn } from '@/helper/cn'

export function MapItem({
  id,
  exercises,
  onClick,
}: {
  id: ExerciseId
  exercises: ExercisesRecord
  onClick: (id: ExerciseId) => void
}) {
  const exercise = exercises[id]
  const isDisabled = !!exercise.dependsOnExercises?.every(
    (exerciseId) => !exercises[exerciseId].done
  )

  return (
    <button
      key={id}
      id={id}
      className="absolute aspect-square w-[9%] cursor-pointer rounded-full"
      style={getExerciseStyle()}
      onClick={() => onClick(id)}
      disabled={isDisabled}
    >
      <div className={cn('p-2', isDisabled && 'opacity-60 grayscale')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={getNodeSrc()} />
      </div>
      <b className="-mt-4 block leading-[1.2rem]">{exercise.title}</b>
    </button>
  )

  function getNodeSrc() {
    if (exercise.done) return '/_assets/img/prototype/done.svg'
    return `/_assets/img/prototype/${exercise.type}.svg`
  }

  function getExerciseStyle() {
    return {
      left: `${exercise.position.x}%`,
      top: `${exercise.position.y}%`,
    }
  }
}
