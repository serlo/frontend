import { FaIcon } from '@editor/package'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'

import { cn } from '@/helper/cn'

export function NewExerciseButton({
  makeNewExercise,
}: {
  makeNewExercise: () => void
}) {
  return (
    <button
      className="group serlo-button-light absolute right-0 top-0 z-50 flex h-9 items-center"
      onClick={makeNewExercise}
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
