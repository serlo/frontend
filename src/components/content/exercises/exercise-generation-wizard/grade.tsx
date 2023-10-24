import { WizardPageProps } from './wizard-page-props'
import { MenuButton, MenuItem } from '../menu-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { LoggedInData } from '@/data-types'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface GradeProps extends WizardPageProps {
  grade: string
  setGrade: (grade: string) => void
}

export const Grade: React.FC<GradeProps> = ({
  grade: selectedGrade,
  setGrade,
  isSummary,
}) => {
  const { strings } = useLoggedInData() as LoggedInData
  const grades = [
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    strings.ai.exerciseGeneration.grade.university,
  ]

  return (
    <div className={`flex ${isSummary ? 'flex-row' : 'flex-col'} `}>
      {!isSummary && (
        <p className="mb-4 text-xl">
          {replacePlaceholders(strings.ai.exerciseGeneration.grade.title, {
            grade: <b>{strings.ai.exerciseGeneration.grade.grade}</b>,
          })}
        </p>
      )}

      <div className={`${isSummary ? '' : 'mb-8'} flex items-center`}>
        <label htmlFor="grade" className="font-semibold text-brand-700">
          {strings.ai.exerciseGeneration.grade.label}
        </label>

        <MenuButton
          value={selectedGrade}
          onChange={(grade: string) => setGrade(grade)}
        >
          {grades.map((grade) => (
            <MenuItem
              key={grade}
              value={grade}
              isSelected={selectedGrade === grade}
            >
              {grade}
            </MenuItem>
          ))}
        </MenuButton>
      </div>
    </div>
  )
}
