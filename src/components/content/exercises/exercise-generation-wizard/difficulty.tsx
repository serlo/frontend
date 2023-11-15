import { ExerciseGenerationDifficulty } from './generate-prompt'
import { WizardPageProps } from './wizard-page-props'
import { MenuButton, MenuItem } from '../menu-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface DifficultyProps extends WizardPageProps {
  difficulty: ExerciseGenerationDifficulty | null
  setDifficulty: (level: ExerciseGenerationDifficulty | null) => void
  learningGoal: string
  setLearningGoal: (goal: string) => void
}

export function Difficulty({
  difficulty,
  setDifficulty,
  learningGoal,
  setLearningGoal,
  onNext,
  isSummary,
}: DifficultyProps) {
  const { difficulty: difficultyStrings } =
    useLoggedInData()!.strings.ai.exerciseGeneration

  return (
    <div className="flex flex-col">
      {!isSummary && (
        <p className="mb-4 text-xl">
          {replacePlaceholders(difficultyStrings.title, {
            difficulty: <b>{difficultyStrings.difficulty}</b>,
          })}
        </p>
      )}

      <div className="mb-7 flex items-center">
        <label
          htmlFor="difficultyDropdown"
          className="mr-2 font-semibold text-brand-700"
        >
          {difficultyStrings.label}
        </label>
        <MenuButton
          value={difficulty || ''}
          onChange={(newValue) =>
            setDifficulty(newValue as ExerciseGenerationDifficulty | null)
          }
          defaultValue=""
        >
          <MenuItem value="">{difficultyStrings.chooseOption}</MenuItem>
          <MenuItem value="low">{difficultyStrings.easy}</MenuItem>
          <MenuItem value="medium">{difficultyStrings.medium}</MenuItem>
          <MenuItem value="high">{difficultyStrings.hard}</MenuItem>
        </MenuButton>
      </div>

      <label htmlFor="learningGoal" className="font-semibold text-brand-700">
        {difficultyStrings.learningGoalLabel}
      </label>
      {!isSummary && (
        <p className="my-2 text-sm font-thin text-gray-400">
          {difficultyStrings.learningGoalExample}
        </p>
      )}
      <textarea
        id="learningGoal"
        value={learningGoal}
        onChange={(e) => setLearningGoal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            onNext()
          }
        }}
        className="w-11/12 resize-none rounded-md border border-sky-200 p-2 pl-2 focus:border-sky-200 focus:outline-brand-700"
        placeholder={difficultyStrings.learningGoalPlaceholder}
      />
    </div>
  )
}
