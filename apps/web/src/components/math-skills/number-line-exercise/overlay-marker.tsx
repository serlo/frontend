import {
  faCheck,
  faCircleDot,
  faLeftRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

import { FaIcon } from '@/components/fa-icon'
import { cn } from '@/helper/cn'

interface OverlayMarkerProps {
  isChecked?: boolean
  isCorrect?: boolean
  isSearched?: boolean
  index: number
}

export function OverlayMarker({
  isChecked,
  isCorrect,
  isSearched,
  index,
}: OverlayMarkerProps) {
  const icon = isChecked
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
