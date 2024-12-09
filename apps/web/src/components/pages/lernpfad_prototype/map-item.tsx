import {
  faRobot,
  faUser,
  faUserGroup,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

import type { MapItemId, ExerciseLabel, MapItemsRecord } from './types'
import { FaIcon } from '../../fa-icon'
import { cn } from '@/helper/cn'

const labelIconsMap: Record<ExerciseLabel, IconDefinition> = {
  solo: faUser,
  group: faUserGroup,
  ai: faRobot,
}

export function MapItem({
  id,
  mapItems,
  onClick,
}: {
  id: MapItemId
  mapItems: MapItemsRecord
  onClick: (id: MapItemId) => void
}) {
  const mapItem = mapItems[id]
  const isDisabled = mapItem.dependsOn?.every((mapItemId) => {
    const dependencyItem = mapItems[mapItemId]
    const isDependencyAFork = dependencyItem.type === 'fork'
    if (
      isDependencyAFork &&
      dependencyItem.choice !== null &&
      mapItems[dependencyItem.choice].type === 'excursion'
    ) {
      return !dependencyItem.done
    }
    if (isDependencyAFork && mapItem.type !== 'excursion') {
      return dependencyItem.choice !== id
    }
    return !dependencyItem.done
  })

  if (mapItem.type === 'fork') {
    return (
      <button
        key={id}
        id={id}
        className="absolute cursor-pointer"
        style={getMapItemStyle()}
        onClick={() => onClick(id)}
        disabled={isDisabled}
      >
        <div className={cn('p-2', isDisabled && 'grayscale')}>
          <div
            style={{ backgroundImage: `url(/_assets/img/prototype/fork.svg)` }}
            className="h-6 w-7 bg-contain bg-bottom bg-no-repeat"
          />
        </div>
      </button>
    )
  }

  const exercise = mapItem
  return (
    <button
      key={id}
      id={id}
      className="absolute w-[75px] cursor-pointer rounded-full"
      style={getMapItemStyle()}
      onClick={() => onClick(id)}
      disabled={isDisabled}
    >
      <div className={cn('px-4 pb-5 pt-2', isDisabled && 'grayscale')}>
        <div
          style={{ backgroundImage: `url(${getNodeSrc()})` }}
          className="h-[38px] w-full bg-contain bg-bottom bg-no-repeat"
        />
      </div>
      <b className="-mt-4 block text-[0.5rem] leading-[0.6rem] text-gray-700">
        {exercise.title}
      </b>
      <div className="mt-0.25 flex items-center justify-center gap-[1px] text-[0.4rem] text-gray-400">
        {exercise.labels.map((label) => (
          <FaIcon key={label} icon={labelIconsMap[label]} />
        ))}
        {exercise.labels.length ? <span className="px-0.5">|</span> : null}
        {exercise.contentType}
        {exercise.time ? <span className="px-0.5">|</span> : null}
        {exercise.time ? `${exercise.time} Min` : null}
      </div>
    </button>
  )

  function getNodeSrc() {
    if (mapItem.done) return '/_assets/img/prototype/done.svg'
    if (mapItem.type === 'info') return '/_assets/img/prototype/start.svg'
    return `/_assets/img/prototype/${mapItem.type}.svg`
  }

  function getMapItemStyle() {
    return {
      left: `${mapItem.position.x}%`,
      top: `${mapItem.position.y}%`,
    }
  }
}
