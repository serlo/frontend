import { FaIcon } from '@editor/package'
import {
  faCheck,
  faXmark,
  faLeftRight,
  faCircleDot,
} from '@fortawesome/free-solid-svg-icons'

import { cn } from '@/helper/cn'

export function NumberLineSteps({
  stepAmount,
  selectedStep,
  searchedStep,
  isCorrect,
  isChecked,
}: {
  stepAmount: number
  selectedStep: number
  searchedStep: number
  isCorrect?: boolean
  isChecked?: boolean
}) {
  return (
    <div className="relative flex items-center justify-between">
      <div className="absolute -left-4 -right-10 top-[17px] h-[3px] bg-newgreen-600"></div>
      <div className="absolute -right-12 h-0 w-0 border-y-8 border-l-[16px] border-y-transparent border-l-newgreen-600"></div>

      {Array.from({ length: stepAmount + 1 }).map((_, i) => {
        const isActive = selectedStep === i
        const isSearched = searchedStep === i
        const icon = isChecked
          ? isCorrect
            ? faCheck
            : isSearched
              ? faCircleDot
              : faXmark
          : faLeftRight

        if (isActive || (isChecked && !isCorrect && isSearched)) {
          return (
            <div
              key={i}
              className="relative -mt-5 h-14 w-[3px] bg-newgreen shadow-menu"
            >
              <div
                className={cn(
                  'absolute -left-[19px] -top-7 h-10 w-10 rounded-full  pt-[7px] text-center text-lg shadow-menu',
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

        const extraClasses =
          i % 10 === 0
            ? 'bg-newgreen-600 h-9'
            : i % 5 === 0
              ? 'h-7 bg-yellow'
              : 'h-4 bg-yellow'
        return <span key={i} className={cn('w-[3px]', extraClasses)}></span>
      })}
    </div>
  )
}
