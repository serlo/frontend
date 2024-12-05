import {
  faRobot,
  faUser,
  faUserGroup,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

import type { ExerciseId, ExerciseLabel, ExercisesRecord } from './types'
import { FaIcon } from '../../fa-icon'
import { cn } from '@/helper/cn'

const labelIconsMap: Record<ExerciseLabel, IconDefinition> = {
  solo: faUser,
  group: faUserGroup,
  ai: faRobot,
}

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
      className="absolute w-[87px] cursor-pointer rounded-full"
      style={getExerciseStyle()}
      onClick={() => onClick(id)}
      disabled={isDisabled}
    >
      <div className={cn('px-4 pb-5 pt-2', isDisabled && 'grayscale')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={getNodeSrc()} />
      </div>
      <b className="-mt-4 block text-[0.5rem] leading-[0.6rem] text-gray-700">
        {exercise.title}
      </b>
      <div className="mt-0.25 flex items-center justify-center gap-[1px] text-[0.4rem] text-gray-400">
        {exercise.labels.map((label) => (
          <FaIcon key={label} icon={labelIconsMap[label]} />
        ))}
        {exercise.labels.length && exercise.time ? (
          <span className="px-1">|</span>
        ) : null}
        {exercise.time ? `${exercise.time} Min` : null}
      </div>
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
