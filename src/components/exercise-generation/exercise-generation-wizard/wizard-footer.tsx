import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

import { FaIcon } from '@/components/fa-icon'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { cn } from '@/helper/cn'
import { submitEvent } from '@/helper/submit-event'

interface WizardFooterProps {
  currentPage: number
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
  generatesMultipleExercises: boolean
}

export function WizardFooter({
  generatesMultipleExercises,
  currentPage,
  onNext,
  onPrev,
  onSubmit,
}: WizardFooterProps) {
  const { exerciseGeneration: exerciseGenerationString } =
    useLoggedInData()!.strings.ai

  const isSummary = currentPage === 6

  useEffect(() => {
    submitEvent('exercise-generation-wizard-page: ' + currentPage)
  }, [currentPage])

  const hideBackButton = currentPage === 1
  const hideNextButton = isSummary

  return (
    <div className="relative mt-auto flex flex-col items-center justify-between">
      {isSummary ? (
        <button
          className="serlo-button-blue mb-2 self-end rounded px-4 py-2 text-white"
          onClick={onSubmit}
        >
          {generatesMultipleExercises
            ? exerciseGenerationString.generateExercisesButton
            : exerciseGenerationString.generateExerciseButton}
        </button>
      ) : (
        <button
          className="serlo-button-blue mb-2 self-end rounded px-4 py-2 text-white"
          onClick={onNext}
        >
          {exerciseGenerationString.nextButton}
        </button>
      )}

      <div className="mt-2 flex w-full items-center justify-center">
        <button
          onClick={onPrev}
          disabled={hideBackButton}
          className={cn(
            'cursor-pointer p-2 text-brand-700',
            hideBackButton && 'pointer-events-none opacity-0'
          )}
        >
          <FaIcon icon={faAngleLeft} />
        </button>

        <span className="mx-1.5 text-center">{currentPage} / 6</span>

        <button
          onClick={onNext}
          disabled={hideNextButton}
          className={cn(
            'p-2 text-brand-700',
            hideNextButton && 'pointer-events-none opacity-0'
          )}
        >
          <FaIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  )
}
