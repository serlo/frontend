import * as React from 'react'

import { styled, Icon, faSmile, faCheckCircle } from '../ui'
import { legacyEditorTheme } from '@/helper/colors'

/** @internal */
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

/** @internal */
export class SubmitButton extends React.Component<{
  exerciseState: ExerciseState
  onClick?: () => void
}> {
  public render() {
    return (
      <SubmitButtonComponent
        exerciseState={this.props.exerciseState}
        onClick={this.props.onClick}
      >
        {this.props.exerciseState === ExerciseState.SolvedRight ? (
          <span>
            <Icon icon={faSmile} />
            Stimmt!
          </span>
        ) : (
          <span>
            <Icon icon={faCheckCircle} />
            Stimmt’s?
          </span>
        )}
      </SubmitButtonComponent>
    )
  }
}
