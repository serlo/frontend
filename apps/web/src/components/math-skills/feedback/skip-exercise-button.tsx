import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '../../fa-icon'
import { useExerciseData } from '../utils/math-skills-data-context'
import { shootStars } from '../utils/shoot-stars'
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
        'group serlo-button-light !z-[1000] ml-auto flex h-9 items-center hover:bg-brand-200 hover:text-brand',
        'relative z-10',
        hidden && 'opacity-0'
      )}
      disabled={hidden}
      onClick={(e) => {
        deductPoints(3)
        setTimeout(() => {
          makeNewExercise()
        }, 250)
        shootStars(e)
      }}
    >
      <FaIcon icon={faWandMagicSparkles} className="h-5 w-5" />
      <span
        className={cn(
          'inline-block h-0 h-auto w-0 overflow-clip text-sm',
          // show on hover: 'group-hover:ml-1 group-hover:mr-2 group-hover:w-auto',
          // 'group-focus-visible:ml-1 group-focus-visible:mr-2 group-focus-visible:w-auto'
          // always show text:
          'ml-2 mr-1 w-auto'
        )}
      >
        Neu generieren
      </span>
    </button>
  )
}
