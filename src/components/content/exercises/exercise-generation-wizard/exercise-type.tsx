import { useState, useRef, useEffect } from 'react'

import { WizardPageProps } from './wizard-page-props'
import { MenuButton, MenuItem } from '../menu-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface ExerciseTypeProps extends WizardPageProps {
  exerciseType: string | null
  setExerciseType: (type: string | null) => void
  numberOfSubtasks: number
  setNumberOfSubtasks: (num: number) => void
}

export const ExerciseType: React.FC<ExerciseTypeProps> = ({
  exerciseType,
  setExerciseType,
  numberOfSubtasks,
  setNumberOfSubtasks,
  onNext,
  isSummary,
}) => {
  const { strings } = useLoggedInData() as LoggedInData
  const [hasSubtasks, setHasSubtasks] = useState<boolean>(
    numberOfSubtasks !== 0
  )
  const focusRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (hasSubtasks && focusRef.current) {
      focusRef.current.focus()
    }
  }, [hasSubtasks])

  return (
    <div className="flex flex-col">
      {!isSummary && (
        <p className="mb-4 text-xl">
          {replacePlaceholders(
            strings.ai.exerciseGeneration.exerciseType.title,
            {
              exerciseType: (
                <b>{strings.ai.exerciseGeneration.exerciseType.exerciseType}</b>
              ),
            }
          )}
        </p>
      )}

      <div className="flex items-center">
        <label
          htmlFor="exerciseTypeDropdown"
          className="mr-2 font-semibold text-brand-700"
        >
          {strings.ai.exerciseGeneration.exerciseType.label}
        </label>
        <MenuButton
          value={exerciseType || ''}
          onChange={(newValue) => setExerciseType(newValue)}
          defaultValue=""
        >
          <MenuItem value="">
            {strings.ai.exerciseGeneration.exerciseType.chooseOption}
          </MenuItem>
          <MenuItem value="multiple choice">
            {strings.ai.exerciseGeneration.exerciseType.multipleChoice}
          </MenuItem>
          <MenuItem value="single choice">
            {strings.ai.exerciseGeneration.exerciseType.singleChoice}
          </MenuItem>
          <MenuItem value="single number solution">
            {strings.ai.exerciseGeneration.exerciseType.solutionWithOneNumber}
          </MenuItem>
        </MenuButton>
      </div>

      <p className="mb-4 mt-7 text-lg text-brand-700">
        {isSummary ? (
          <span className="text-base font-semibold">
            {strings.ai.exerciseGeneration.exerciseType.subtasksTitleSummary}
          </span>
        ) : (
          <span>
            {strings.ai.exerciseGeneration.exerciseType.subtasksTitle}
          </span>
        )}
      </p>
      <div className="flex items-center">
        <input
          type="radio"
          id="noSubtasks"
          name="subtasks"
          value="no"
          checked={!hasSubtasks}
          onChange={() => {
            setHasSubtasks(false)
            setNumberOfSubtasks(0)
          }}
          className="focus:ring-lightblue text-brand-700"
        />
        <label
          htmlFor="noSubtasks"
          className={`ml-2 ${
            !hasSubtasks ? 'font-semibold text-brand-700' : ''
          }`}
        >
          {strings.ai.exerciseGeneration.exerciseType.noSubtasks}
        </label>
      </div>

      <div className="mt-2 flex items-center">
        <input
          type="radio"
          id="hasSubtasks"
          name="subtasks"
          value="yes"
          checked={hasSubtasks}
          onChange={() => setHasSubtasks(true)}
          className="focus:ring-lightblue text-brand-700"
        />
        <label
          htmlFor="hasSubtasks"
          className={`ml-2 ${
            hasSubtasks ? 'font-semibold text-brand-700' : ''
          }`}
        >
          {strings.ai.exerciseGeneration.exerciseType.yesSubtasks}
        </label>
        <input
          type="number"
          disabled={!hasSubtasks}
          value={hasSubtasks ? numberOfSubtasks.toString() : ''}
          onChange={(e) => setNumberOfSubtasks(Number(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onNext()
            }
          }}
          className="border-lightblue focus:border-lightblue ml-2 rounded-md border p-2 pl-2 focus:outline-brand-700"
          placeholder={
            strings.ai.exerciseGeneration.exerciseType
              .numberOfSubtasksPlaceholder
          }
          ref={focusRef}
        />
      </div>
    </div>
  )
}
