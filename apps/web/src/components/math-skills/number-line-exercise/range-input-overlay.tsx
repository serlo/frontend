import { OverlayMarker } from './overlay-marker'
import { cn } from '@/helper/cn'

interface RangeInputOverlayProps {
  maxValue: number // highest value of number line
  selectedValue: number
  searchedValue: number
  isChecked?: boolean
  isCorrect?: boolean
  useQuestionIcon?: boolean
}

const stepAmount = 40

export function RangeInputOverlay({
  maxValue,
  selectedValue,
  searchedValue,
  isChecked,
  isCorrect,
  useQuestionIcon,
}: RangeInputOverlayProps) {
  const step = maxValue / 40

  const selectedStep = selectedValue / step
  const searchedStep = searchedValue / step

  return (
    <div className="relative flex items-center justify-between">
      <div className="absolute -left-4 -right-7 top-[17px] h-[3px] bg-newgreen-600 sm:-right-10"></div>
      <div className="absolute -right-8 h-0 w-0 border-y-8 border-l-[16px] border-y-transparent border-l-newgreen-600 sm:-right-12"></div>

      {Array.from({ length: stepAmount + 1 }).map((_, i) => {
        const isActive = selectedStep === i
        const isSearched = searchedStep === i

        if (isActive || (isChecked && !isCorrect && isSearched)) {
          return (
            <OverlayMarker
              isActive={isActive}
              isChecked={isChecked}
              isCorrect={isCorrect}
              isSearched={isSearched}
              useQuestionIcon={useQuestionIcon}
              index={i}
              key={i}
            />
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
