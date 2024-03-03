import { faStepForward } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../../fa-icon'
import { useExerciseData } from '../utils/math-skills-data-context'
import { cn } from '@/helper/cn'

export function SkipExerciseButton({
  makeNewExercise,
  hidden,
}: {
  makeNewExercise: () => void
  hidden?: boolean
}) {
  const { deductPoints } = useExerciseData()
  return (
    <button
      className={cn(
        'group serlo-button-light !z-50 ml-auto flex h-9 items-center hover:bg-brand-100 hover:text-brand',
        'relative z-10',
        hidden && 'opacity-0'
      )}
      disabled={hidden}
      onClick={() => {
        deductPoints(3)
        makeNewExercise()
      }}
    >
      <span
        className={cn(
          'inline-block h-0 w-0 overflow-clip text-sm',
          'group-hover:ml-1 group-hover:mr-2 group-hover:w-auto',
          'h-auto group-focus-visible:ml-1 group-focus-visible:mr-2 group-focus-visible:w-auto'
        )}
      >
        Aufgabe überspringen
      </span>
      <FaIcon icon={faStepForward} className="h-5 w-5" />
    </button>
  )
}
