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

    const timer = setTimeout(() => zoomToElement(idToZoomTo, 2), 1500)
    setInitialZoomDone(true)

    return () => clearTimeout(timer)
  }, [exercises, initialZoomDone, zoomToElement])

  return (
    <TransformComponent>
      <div className="relative h-screen w-screen bg-gray-200">
        {Object.keys(exercises).map((id) => (
          <button
            key={id}
            id={id}
            className={getExerciseClasses(id)}
            onClick={() => onExerciseClick(id)}
          >
            {id}
          </button>
        ))}
      </div>
    </TransformComponent>
  )

  function getExerciseClasses(id: ExerciseId) {
    return cn(
      'absolute aspect-square w-[6%] cursor-pointer',
      `left-[${exercises[id].position.x}%] top-[${exercises[id].position.y}%]`,
      isExerciseDone(id) ? 'bg-editor-primary-300' : 'bg-brand-300'
    )
  }

  function isExerciseDone(id: ExerciseId) {
    return exercises[id].done === true
  }
}
