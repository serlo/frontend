import { useEffect, useState } from 'react'
import { TransformComponent, useControls } from 'react-zoom-pan-pinch'

import { MapItem } from './map-item'
import type { ExerciseId, ExercisesRecord } from './types'
import { cn } from '@/helper/cn'

export function Map({
  exercises,
  onExerciseClick,
}: {
  exercises: ExercisesRecord
  onExerciseClick: (id: ExerciseId) => void
}) {
  const [initialZoomDone, setInitialZoomDone] = useState(false)
  const { zoomToElement } = useControls()

  // Zoom to next incomplete exercise animation
  useEffect(() => {
    if (initialZoomDone) return

    const idToZoomTo = Object.keys(exercises).find(
      (key) => exercises[key].done === false
    )
    if (!idToZoomTo) return

    const timer = setTimeout(() => {
      zoomToElement(idToZoomTo, 2)
      setInitialZoomDone(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [exercises, initialZoomDone, zoomToElement])

  return (
    <TransformComponent>
      <div
        className={cn(
          'relative h-screen w-screen',
          'bg-[url(/_assets/img/prototype/map_full.svg)]',
          'bg-[length:auto_100%] bg-top bg-no-repeat'
        )}
      >
        <div className="relative left-1/2  h-screen w-[1194px] max-w-[153vh] -translate-x-1/2">
          {Object.keys(exercises).map((id) => (
            <MapItem
              key={id}
              id={id}
              exercises={exercises}
              onClick={onExerciseClick}
            />
          ))}
        </div>
      </div>
    </TransformComponent>
  )
}
