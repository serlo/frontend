import * as R from 'ramda'
import { Component } from 'react'

import { ScMcExerciseProps, ScMcExercisePluginState } from '..'
import { StateTypeReturnType } from '../../../plugin'
import { FetchDimensions } from '../fetch-dimensions'
import { calculateLayoutOptions } from '../helpers'

enum Phase {
  noJS = 0,
  optionTesting = 1,
  finished = 2,
}

export class ScMcAnswersRenderer extends Component<
  ScMcExerciseProps & {
    showAnswer: (
      answer: StateTypeReturnType<ScMcExercisePluginState>['answers'][0],
      index: number,
      centered: boolean
    ) => React.ReactNode
  },
  ScMcAnswersRendererState
> {
  public state = {
    phase: Phase.noJS,
    remainingOptions: calculateLayoutOptions(this.props.state.answers.length),
    lastOption: [this.props.state.answers.length, 1] as [number, number],
  }

  public render() {
    if (this.state.remainingOptions.length === 0) return null
    const currentOption = this.state.remainingOptions[0]
    return (
      <>
        {this.state.phase < Phase.finished
          ? this.renderOption(this.state.lastOption)
          : this.renderOption(currentOption)}
        {this.state.phase === Phase.optionTesting
          ? this.tryOption(currentOption)
          : null}
      </>
    )
  }

  private tryOption(option: [number, number]) {
    return (
      <FetchDimensions
        key={option.toString()}
        length={this.props.state.answers.length + 1}
        onDone={({ widths, scrollWidths, heights }) => {
          const adequateRatio = heights.every((height, index) => {
            return 1.5 * height <= widths[index]
          })
          const [containerWidth, ...boxWidths] = widths
          const equalWidths = boxWidths.every((width) => {
            return width === boxWidths[0]
          })
          if (
            containerWidth + 1 >= scrollWidths[0] &&
            equalWidths &&
            adequateRatio
          ) {
            this.setState({ phase: Phase.finished, lastOption: option })
          } else {
            this.setState((state) => {
              const newOptions = state.remainingOptions.slice(1)
              if (newOptions.length > 0) {
                return { phase: state.phase, remainingOptions: newOptions }
              } else {
                return {
                  remainingOptions: state.remainingOptions,
                  phase: Phase.finished,
                }
              }
            })
          }
        }}
        render={(createRef) => {
          return (
            <div className="invisible" ref={createRef(0)}>
              {this.renderOption(option, createRef)}
            </div>
          )
        }}
      />
    )
  }

  private renderOption(
    [_rows, columns]: [number, number],
    createRef: (index: number) => (instance: HTMLElement | null) => void = () =>
      () => {}
  ) {
    const rows = R.splitEvery(columns, this.props.state.answers)
    return rows.map((answers, rowIndex) => {
      return (
        <div className="flex" key={rowIndex}>
          {answers.map((answer, columnIndex) => {
            return (
              <div
                className="mx-4 flex-shrink flex-grow basis-0"
                key={columnIndex}
                ref={createRef(rowIndex * answers.length + columnIndex + 1)}
              >
                {this.props.showAnswer(
                  answer,
                  rowIndex * answers.length + columnIndex,
                  answers.length > 1
                )}
              </div>
            )
          })}
        </div>
      )
    })
  }

  private calculateLayout() {
    this.setState({
      phase: Phase.optionTesting,
      remainingOptions: calculateLayoutOptions(this.props.state.answers.length),
    })
  }

  private onResize = () => {
    this.calculateLayout()
  }

  public componentDidMount() {
    this.calculateLayout()
    window.addEventListener('resize', this.onResize)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }
}

interface ScMcAnswersRendererState {
  phase: Phase
  remainingOptions: [number, number][]
  lastOption: [number, number]
}
