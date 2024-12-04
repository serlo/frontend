import { useEffect, useState } from 'react'
import { TransformComponent, useControls } from 'react-zoom-pan-pinch'

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
          'bg-cover bg-top bg-no-repeat'
        )}
      >
        {Object.keys(exercises).map((id) => (
          <button
            key={id}
            id={id}
            className={getExerciseClasses(id)}
            onClick={() => onExerciseClick(id)}
          >
            {isExerciseDone(id) ? (
              <img src="/_assets/img/prototype/exercise_done.svg" />
            ) : (
              <img src="/_assets/img/prototype/exercise_todo.svg" />
            )}
          </button>
        ))}
      </div>
    </TransformComponent>
  )

  function getExerciseClasses(id: ExerciseId) {
    return cn(
      'absolute aspect-square w-[6%] cursor-pointer rounded-full',
      `left-[${exercises[id].position.x}%] top-[${exercises[id].position.y}%]`
    )
  }

  function isExerciseDone(id: ExerciseId) {
    return exercises[id].done === true
  }
}
