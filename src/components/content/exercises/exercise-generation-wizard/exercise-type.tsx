import { useRouter } from 'next/router'
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
  const isExerciseGroup = useIsExerciseGroup()

  const [userInteracted, setUserInteracted] = useState(false)

  const [hasSubtasks, setHasSubtasks] = useState<boolean>(
    numberOfSubtasks !== 0
  )
  const [showWarning, setShowWarning] = useState(false)

  const focusRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (hasSubtasks && focusRef.current) {
      focusRef.current.focus()
    }
  }, [hasSubtasks])

  // When in an exercise group, we must create 2 or more subtasks (for now)
  useEffect(() => {
    if (
      isExerciseGroup &&
      userInteracted &&
      (numberOfSubtasks === 0 || numberOfSubtasks === 1)
    ) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }

    // If isExerciseGroup is true, set the default value to 2. In the summary
    // view, we also set the subtasks to two (in case the user ignored the
    // warning prior).
    if (isExerciseGroup && (!userInteracted || isSummary)) {
      setHasSubtasks(true)
      setNumberOfSubtasks(Math.max(2, numberOfSubtasks))
    }
  }, [
    isExerciseGroup,
    numberOfSubtasks,
    setNumberOfSubtasks,
    isSummary,
    userInteracted,
  ])

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
          <MenuItem value="single choice">
            {exerciseTypeStrings.singleChoice}
          </MenuItem>
          <MenuItem value="multiple choice">
            {exerciseTypeStrings.multipleChoice}
          </MenuItem>
          <MenuItem value="single number solution">
            {exerciseTypeStrings.inputExercise}
          </MenuItem>
        </MenuButton>
      </div>

      {!isExerciseGroup ? null : (
        <>
          <p className="mb-4 mt-7 text-lg text-brand-700">
            {isSummary ? (
              <span className="text-base font-semibold">
                {exerciseTypeStrings.subtasksTitleSummary}
              </span>
            ) : (
              <span>
                {isExerciseGroup
                  ? exerciseTypeStrings.subtasksTitleExerciseGroup
                  : exerciseTypeStrings.subtasksTitle}
              </span>
            )}
          </p>

          <div className="flex items-center">
            {isExerciseGroup ? null : (
              <>
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
              </>
            )}
          </div>

          <div className="mt-2 flex items-center">
            {isExerciseGroup ? null : (
              <input
                type="radio"
                id="hasSubtasks"
                name="subtasks"
                value="yes"
                checked={hasSubtasks}
                onChange={() => setHasSubtasks(true)}
                className="mr-2 text-brand-700 focus:ring-sky-200"
              />
            )}
            <label
              htmlFor="hasSubtasks"
              className={`${hasSubtasks ? 'font-semibold text-brand-700' : ''}`}
            >
              {isExerciseGroup
                ? exerciseTypeStrings.subtasksLabel
                : exerciseTypeStrings.yesSubtasks}
            </label>
            <input
              type="number"
              disabled={!hasSubtasks}
              value={hasSubtasks ? numberOfSubtasks.toString() : ''}
              onChange={(e) => {
                const value = Number(e.target.value)
                setUserInteracted(true)
                setNumberOfSubtasks(value)
                if (value >= 2) {
                  setShowWarning(false)
                }
              }}
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
          {showWarning ? (
            <p className="mt-2 text-orange-500">
              {exerciseTypeStrings.exerciseGroupNeedsTwoOrMoreSubtasks}
            </p>
          ) : null}
        </>
      )}
    </div>
  )
}

function useIsExerciseGroup() {
  const [isExerciseGroup, setIsExerciseGroup] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const path = router.asPath.split('?')[0].toLowerCase()

    setIsExerciseGroup(/\/exercisegroup\//.test(path))
  }, [router.asPath])

  return isExerciseGroup
}
