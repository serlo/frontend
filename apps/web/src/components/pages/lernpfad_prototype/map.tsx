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

  useEffect(() => {
    if (initialZoomDone) return
    // Find first exercise that's not done yet
    const idToZoomTo = Object.keys(exercises).find(
      (key) => exercises[key].done === false
    )
    // Exit if all exercises are done
    if (!idToZoomTo) return
    // Zoom to the first exercise that's not done yet
    const timer = setTimeout(() => {
      zoomToElement(idToZoomTo, 2)
      setInitialZoomDone(true)
    }, 1500)
    // Clear timeout on onmount
    return () => clearTimeout(timer)
  }, [exercises, initialZoomDone, zoomToElement])

  return (
    <TransformComponent>
      <div
        className={cn(
          'image-section relative h-screen w-screen',
          'bg-[url(/_assets/img/prototype/game-board.svg)]',
          'bg-[length:50%] bg-center bg-no-repeat'
        )}
      >
        <button
          id="1"
          className={cn(
            getExerciseClasses('1'),
            'left-[502px] top-[233px] h-[69px] w-[79px]'
          )}
          onClick={() => onExerciseClick('1')}
        >
          1
        </button>

        <button
          id="2"
          className={cn(
            getExerciseClasses('2'),
            'left-[502px] top-[411px] h-[69px] w-[79px]'
          )}
          onClick={() => onExerciseClick('2')}
        >
          2
        </button>
      </div>
    </TransformComponent>
  )

  function getExerciseClasses(id: ExerciseId) {
    return cn(
      'absolute cursor-pointer',
      isExerciseDone(id) ? 'bg-editor-primary-300' : 'bg-brand-300'
    )
  }

  function isExerciseDone(id: ExerciseId) {
    return exercises[id].done === true
  }
}
