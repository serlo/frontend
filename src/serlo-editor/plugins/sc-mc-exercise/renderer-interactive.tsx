import * as R from 'ramda'
import { Component, Fragment } from 'react'

import { ScMcExercisePluginState } from '.'
import { StateTypeReturnType } from '../../plugin'
import { Feedback, SubmitButton } from '../../renderer-ui'
import { ScMcAnswersRenderer } from './answers-renderer'
import { ScMcExerciseChoiceRenderer } from './choice-renderer'
import { ScMcRendererProps } from './renderer'

export type ScMcRendererInteractiveProps = ScMcRendererProps & {
  i18nWrong: string
  i18nCorrect: string
  getFeedback?: (params: {
    mistakes: number
    missingSolutions: number
  }) => string | undefined
  nextButtonStateAfterSubmit: (params: {
    button: Button
    answer: StateTypeReturnType<ScMcExercisePluginState>['answers'][0]
    mistakes: number
    missingSolutions: number
  }) => Button
  showFeedback?: boolean
}

enum ExerciseState {
  Default = 1,
  SolvedRight,
  SolvedWrong,
}

export class ScMcRendererInteractive extends Component<
  ScMcRendererInteractiveProps,
  ScMcRendererState
> {
  public static defaultProps = {
    getFeedback: () => undefined,
  }

  public constructor(props: ScMcRendererInteractiveProps) {
    super(props)
    this.state = ScMcRendererInteractive.initialStateFromProps(props)
  }

  static getDerivedStateFromProps(
    nextProps: ScMcRendererInteractiveProps,
    prevState: ScMcRendererState
  ) {
    if (nextProps.state.answers.length !== prevState.buttons.length) {
      return ScMcRendererInteractive.initialStateFromProps(nextProps)
    }
    return {}
  }

  static initialStateFromProps(props: ScMcRendererInteractiveProps) {
    return {
      buttons: props.state.answers.map(() => {
        return {
          selected: false,
          showFeedback: false,
        }
      }),
      globalFeedback: '',
      showGlobalFeedback: false,
      solved: false,
      exerciseState: ExerciseState.Default,
    }
  }
  public render() {
    return (
      <>
        <ScMcAnswersRenderer {...this.props} showAnswer={this.showAnswer} />
        {this.showGlobalFeedback()}
        <SubmitButton
          exerciseState={this.state.exerciseState}
          onClick={this.submitAnswer}
        />
        <div className="clear-both" />
      </>
    )
  }
  private showAnswer = (
    answer: StateTypeReturnType<ScMcExercisePluginState>['answers'][0],
    index: number,
    centered: boolean
  ): React.ReactNode => {
    const button = this.state.buttons[index]
    return (
      <Fragment key={index}>
        <ScMcExerciseChoiceRenderer
          index={index}
          onClick={this.selectButton(index)}
          {...this.props} // showFeedback: true
          {...button} // showFeedback: false
          centered={centered}
        >
          {answer.content.render()}
        </ScMcExerciseChoiceRenderer>
        {this.props.showFeedback ? this.showFeedback({ button, answer }) : null}
      </Fragment>
    )
  }

  private showFeedback({
    answer,
    button,
  }: {
    answer: StateTypeReturnType<ScMcExercisePluginState>['answers'][0]
    button: Button
  }): React.ReactNode {
    if (!button.showFeedback) {
      return null
    }
    if (!this.props.isEmpty(answer.feedback.id)) {
      return (
        <Feedback boxFree showOnLeft isTrueAnswer={answer.isCorrect.value}>
          {answer.feedback.render()}
        </Feedback>
      )
    }
    return (
      <Feedback boxFree showOnLeft isTrueAnswer={answer.isCorrect.value}>
        {answer.isCorrect.value ? '' : this.props.i18nWrong}
      </Feedback>
    )
  }
  private showGlobalFeedback(): React.ReactNode {
    const { showGlobalFeedback, globalFeedback, solved } = this.state
    if (showGlobalFeedback) {
      return (
        <Feedback boxFree isTrueAnswer={solved}>
          {globalFeedback}
        </Feedback>
      )
    }
    return null
  }
  private handleWrongAnswer = () => {
    setTimeout(
      () => this.setState({ exerciseState: ExerciseState.Default }),
      3000
    )
    return ExerciseState.SolvedWrong
  }

  private submitAnswer = () => {
    const { buttons } = this.state
    const temp = R.zip(buttons, this.props.state.answers)
    const mistakes = R.reduce(
      (acc, [button, answer]) => {
        return acc + (answer.isCorrect.value !== button.selected ? 1 : 0)
      },
      0,
      temp
    )
    const missingSolutions = R.reduce(
      (acc, [button, answer]) => {
        return acc + (answer.isCorrect.value && !button.selected ? 1 : 0)
      },
      0,
      temp
    )

    const nextButtonStates = buttons.map((button, i) => {
      return this.props.nextButtonStateAfterSubmit({
        button,
        answer: this.props.state.answers[i],
        mistakes,
        missingSolutions,
      })
    })

    this.setState({
      showGlobalFeedback: true,
      buttons: nextButtonStates,
      solved: mistakes === 0,
      globalFeedback: this.getGlobalFeedback({ mistakes, missingSolutions }),
      exerciseState:
        mistakes === 0 ? ExerciseState.SolvedRight : this.handleWrongAnswer(),
    })
  }

  private selectButton = (selectedIndex: number) => () => {
    const { buttons } = this.state

    if (this.props.state.isSingleChoice.value) {
      this.setState({
        buttons: buttons.map((button, index) => {
          return R.assoc('selected', index === selectedIndex, button)
        }),
      })
    } else {
      this.setState({
        buttons: R.adjust(
          selectedIndex,
          (button) => R.assoc('selected', !button.selected, button),
          buttons
        ),
        globalFeedback: '',
      })
    }
  }
  private getGlobalFeedback({
    mistakes,
    missingSolutions,
  }: {
    mistakes: number
    missingSolutions: number
  }): string {
    const { getFeedback } = this.props
    const feedback =
      typeof getFeedback === 'function' &&
      getFeedback({
        mistakes,
        missingSolutions,
      })

    if (feedback) {
      return feedback
    }

    return mistakes === 0 ? this.props.i18nCorrect : this.props.i18nWrong
  }
}

export interface ScMcRendererState {
  buttons: Button[]
  globalFeedback: string
  showGlobalFeedback: boolean
  solved: boolean
  exerciseState: ExerciseState
}

export interface Button {
  selected: boolean
  showFeedback: boolean
}
