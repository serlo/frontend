import { faSmile, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import { FaIcon } from '@/components/fa-icon'
import { legacyEditorTheme } from '@/helper/colors'

export enum ExerciseState {
  Default = 1,
  SolvedRight,
  SolvedWrong,
}

const getBackgroundColor = (exerciseState: ExerciseState) => {
  switch (exerciseState) {
    case ExerciseState.Default: {
      return legacyEditorTheme.primary.background
    }
    case ExerciseState.SolvedRight: {
      return legacyEditorTheme.success.background
    }
    case ExerciseState.SolvedWrong: {
      return legacyEditorTheme.danger.background
    }
  }
}

const SubmitButtonComponent = styled.button<{ exerciseState: ExerciseState }>(
  ({ exerciseState }) => {
    return {
      float: 'right',
      margin: '10px 0px',
      border: 'none',
      padding: '3px',
      backgroundColor: getBackgroundColor(exerciseState),
      color: legacyEditorTheme.backgroundColor,
      transition: 'background-color .5s ease',
      outline: 'none',
      '&hover': {
        backgroundColor: '#d9edf7',
      },
    }
  }
)

export function SubmitButton({
  exerciseState,
  onClick,
}: {
  exerciseState: ExerciseState
  onClick?: () => void
}) {
  return (
    <SubmitButtonComponent exerciseState={exerciseState} onClick={onClick}>
      {exerciseState === ExerciseState.SolvedRight ? (
        <span>
          <FaIcon icon={faSmile} />
          Stimmt!
        </span>
      ) : (
        <span>
          <FaIcon icon={faCheckCircle} />
          Stimmt’s?
        </span>
      )}
    </SubmitButtonComponent>
  )
}
