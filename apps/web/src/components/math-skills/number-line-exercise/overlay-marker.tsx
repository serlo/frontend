import {
  faCheck,
  faCircleDot,
  faLeftRight,
  faQuestion,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

interface OverlayMarkerProps {
  index: number
  isActive: boolean
  isChecked?: boolean
  isCorrect?: boolean
  isSearched?: boolean
  useQuestionIcon?: boolean
}

export function OverlayMarker({
  index,
  isActive,
  isChecked,
  isCorrect,
  isSearched,
  useQuestionIcon,
}: OverlayMarkerProps) {
  const icon = useQuestionIcon
    ? faQuestion
    : isChecked
      ? isCorrect
        ? faCheck
        : isSearched
          ? faCircleDot
          : faXmark
      : faLeftRight

  return (
    <div
      key={index}
      className="relative -mb-8 h-16 w-[3px] bg-newgreen shadow-menu"
      id={isActive ? 'range-input-user-maker' : undefined}
    >
      <div
        className={cn(
          'absolute -bottom-6 -left-[19px] h-10 w-10 rounded-full  pt-[7px] text-center text-lg shadow-menu',
          isChecked && (isCorrect || isSearched)
            ? 'bg-newgreen text-white'
            : isChecked
              ? 'bg-red-300 text-white'
              : 'bg-[#d8f5ef] text-newgreen',
          isSearched && 'z-30'
        )}
      >
        <FaIcon icon={icon} />
      </div>
    </div>
  )
}
