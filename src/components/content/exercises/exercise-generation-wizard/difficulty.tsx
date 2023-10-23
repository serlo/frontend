import { ExerciseGenerationDifficulty } from './generate-prompt'
import { WizardPageProps } from './wizard-page-props'
import { MenuButton, MenuItem } from '../menu-button'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface DifficultyProps extends WizardPageProps {
  difficulty: ExerciseGenerationDifficulty | null
  setDifficulty: (level: ExerciseGenerationDifficulty | null) => void
  learningGoal: string
  setLearningGoal: (goal: string) => void
}

export const Difficulty: React.FC<DifficultyProps> = ({
  difficulty,
  setDifficulty,
  learningGoal,
  setLearningGoal,
  onNext,
  isSummary,
}) => {
  const { strings } = useInstanceData()

  return (
    <div className="flex flex-col">
      {!isSummary && (
        <p className="mb-4 text-xl">
          {replacePlaceholders(strings.ai.exerciseGeneration.difficulty.title, {
            difficulty: (
              <b>{strings.ai.exerciseGeneration.difficulty.difficulty}</b>
            ),
          })}
        </p>
      )}

      <div className="mb-7 flex items-center">
        <label
          htmlFor="difficultyDropdown"
          className="mr-2 font-semibold text-brand-700"
        >
          {strings.ai.exerciseGeneration.difficulty.label}
        </label>
        <MenuButton
          value={difficulty || ''}
          onChange={(newValue) =>
            setDifficulty(newValue as ExerciseGenerationDifficulty | null)
          }
          defaultValue=""
        >
          <MenuItem value="">
            {strings.ai.exerciseGeneration.difficulty.chooseOption}
          </MenuItem>
          <MenuItem value="low">
            {strings.ai.exerciseGeneration.difficulty.easy}
          </MenuItem>
          <MenuItem value="medium">
            {strings.ai.exerciseGeneration.difficulty.medium}
          </MenuItem>
          <MenuItem value="high">
            {strings.ai.exerciseGeneration.difficulty.hard}
          </MenuItem>
        </MenuButton>
      </div>

      <label htmlFor="learningGoal" className="font-semibold text-brand-700">
        {strings.ai.exerciseGeneration.difficulty.learningGoalLabel}
      </label>
      {!isSummary && (
        <p className="text-lightgray my-2 text-sm font-thin">
          {strings.ai.exerciseGeneration.difficulty.learningGoalExample}
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
        className="border-lightblue focus:border-lightblue w-11/12 resize-none rounded-md border p-2 pl-2 focus:outline-brand-700"
        placeholder={
          strings.ai.exerciseGeneration.difficulty.learningGoalPlaceholder
        }
      />
    </div>
  )
}
