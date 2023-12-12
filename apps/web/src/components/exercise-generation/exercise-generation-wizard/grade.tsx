import { cn } from '@serlo/tailwind/helper/cn'

import { WizardPageProps } from './wizard-page-props'
import { MenuButton, MenuItem } from '../menu-button'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface GradeProps extends WizardPageProps {
  grade: string
  setGrade: (grade: string) => void
}

export function Grade({
  grade: selectedGrade,
  setGrade,
  isSummary,
}: GradeProps) {
  const { grade: gradeStrings } =
    useLoggedInData()!.strings.ai.exerciseGeneration
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
    gradeStrings.university,
  ]

  return (
    <div className={cn('flex', isSummary ? 'flex-row' : 'flex-col')}>
      {!isSummary && (
        <p className="mb-4 text-xl">
          {replacePlaceholders(gradeStrings.title, {
            grade: <b>{gradeStrings.grade}</b>,
          })}
        </p>
      )}

      <div className={cn(!isSummary && 'mb-8', 'flex items-center')}>
        <label htmlFor="grade" className="font-semibold text-brand-700">
          {gradeStrings.label}
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
