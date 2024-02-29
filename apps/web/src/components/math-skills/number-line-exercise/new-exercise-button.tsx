import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../../fa-icon'
import { useExerciseData } from '../utils/math-skills-data-context'
import { cn } from '@/helper/cn'

export function NewExerciseButton({
  makeNewExercise,
}: {
  makeNewExercise: () => void
}) {
  const { deductPoints } = useExerciseData()
  return (
    <button
      className="group serlo-button-light absolute -top-1 right-0 z-50 flex h-9 items-center"
      onClick={() => {
        deductPoints(3)
        makeNewExercise()
      }}
    >
      <span
        className={cn(
          'inline-block h-0 w-0 overflow-clip text-sm',
          'group-hover:ml-1 group-hover:mr-2 group-hover:h-auto group-hover:w-auto',
          'group-focus-visible:ml-1 group-focus-visible:mr-2 group-focus-visible:h-auto group-focus-visible:w-auto'
        )}
      >
        Andere Aufgabe
      </span>
      <FaIcon icon={faArrowsRotate} />
    </button>
  )
}
