import { useState, useRef, useEffect } from 'react'

import { WizardPageProps } from './wizard-page-props'
import { MenuButton, MenuItem } from '../menu-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface ExerciseTypeProps extends WizardPageProps {
  exerciseType: string | null
  setExerciseType: (type: string | null) => void
  numberOfSubtasks: number
  setNumberOfSubtasks: (num: number) => void
}

export function ExerciseType({
  exerciseType,
  setExerciseType,
  numberOfSubtasks,
  setNumberOfSubtasks,
  onNext,
  isSummary,
}: ExerciseTypeProps) {
  const { exerciseType: exerciseTypeStrings } =
    useLoggedInData()!.strings.ai.exerciseGeneration
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
          {replacePlaceholders(exerciseTypeStrings.title, {
            exerciseType: <b>{exerciseTypeStrings.exerciseType}</b>,
          })}
        </p>
      )}

      <div className="flex items-center">
        <label
          htmlFor="exerciseTypeDropdown"
          className="mr-2 font-semibold text-brand-700"
        >
          {exerciseTypeStrings.label}
        </label>
        <MenuButton
          value={exerciseType || ''}
          onChange={(newValue) => setExerciseType(newValue)}
          defaultValue=""
        >
          <MenuItem value="">{exerciseTypeStrings.chooseOption}</MenuItem>
          <MenuItem value="multiple choice">
            {exerciseTypeStrings.multipleChoice}
          </MenuItem>
          <MenuItem value="single choice">
            {exerciseTypeStrings.singleChoice}
          </MenuItem>
          <MenuItem value="single number solution">
            {exerciseTypeStrings.solutionWithOneNumber}
          </MenuItem>
        </MenuButton>
      </div>

      <p className="mb-4 mt-7 text-lg text-brand-700">
        {isSummary ? (
          <span className="text-base font-semibold">
            {exerciseTypeStrings.subtasksTitleSummary}
          </span>
        ) : (
          <span>{exerciseTypeStrings.subtasksTitle}</span>
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
          className="text-brand-700 focus:ring-sky-200"
        />
        <label
          htmlFor="noSubtasks"
          className={`ml-2 ${
            !hasSubtasks ? 'font-semibold text-brand-700' : ''
          }`}
        >
          {exerciseTypeStrings.noSubtasks}
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
          className="text-brand-700 focus:ring-sky-200"
        />
        <label
          htmlFor="hasSubtasks"
          className={`ml-2 ${
            hasSubtasks ? 'font-semibold text-brand-700' : ''
          }`}
        >
          {exerciseTypeStrings.yesSubtasks}
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
          className="ml-2 rounded-md border border-sky-200 p-2 pl-2 focus:border-sky-200 focus:outline-brand-700"
          placeholder={exerciseTypeStrings.numberOfSubtasksPlaceholder}
          ref={focusRef}
        />
      </div>
    </div>
  )
}
