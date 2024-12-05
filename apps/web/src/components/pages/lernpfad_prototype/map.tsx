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
            className="absolute aspect-square w-[6%] cursor-pointer rounded-full"
            style={getExerciseStyle(id)}
            onClick={() => onExerciseClick(id)}
          >
            {exercises[id].done ? (
              <img src="/_assets/img/prototype/exercise_done.svg" />
            ) : (
              <img src="/_assets/img/prototype/exercise_todo.svg" />
            )}
            <b>{exercises[id].title}</b>
          </button>
        ))}
      </div>
    </TransformComponent>
  )

  function getExerciseStyle(id: ExerciseId) {
    return {
      left: `${exercises[id].position.x}%`,
      top: `${exercises[id].position.y}%`,
    }
  }
}
