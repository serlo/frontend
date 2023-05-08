import { Component } from 'react'

import { ScMcExercisePluginConfig, ScMcExerciseProps } from '.'
import { CheckElement } from '../editor-ui'
import { styled } from '../ui'
import { colors } from '@/helper/colors'

const CheckboxContainer = styled.div({
  //width: '5%',
  textAlign: 'center',
  marginRight: '10px',
  marginBottom: '5px',
  fontWeight: 'bold',
})

export class ScMcExerciseChoiceRenderer extends Component<
  Omit<ScMcExerciseProps, 'config'> & ChoiceRendererProps
> {
  public render() {
    const { state, children, index, onClick, showFeedback, selected } =
      this.props
    return (
      <div style={{ display: 'flex' }}>
        <CheckboxContainer>
          <CheckElement
            isRadio={state.isSingleChoice.value}
            isActive={selected || false}
            handleChange={onClick ? onClick : () => {}}
          />
        </CheckboxContainer>
        <this.Container
          isCorrect={state.answers[index].isCorrect.value}
          showFeedback={showFeedback || false}
        >
          {children}
        </this.Container>
      </div>
    )
  }

  private Container = styled.div<{ isCorrect: boolean; showFeedback: boolean }>(
    (props) => {
      return {
        paddingLeft: '20 px',
        color: props.showFeedback
          ? props.isCorrect
            ? colors.brandGreen
            : '#f7b07c'
          : 'black',
      }
    }
  )
}

export interface ChoiceRendererProps {
  config: ScMcExercisePluginConfig
  children: React.ReactNode
  index: number
  onClick?: (event: React.MouseEvent<Element>) => void
  showFeedback?: boolean
  centered?: boolean
  selected?: boolean
}
