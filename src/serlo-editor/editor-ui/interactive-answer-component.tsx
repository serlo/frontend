import { styled, faTimes, faPlus } from '../ui'
import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { colors } from '@/helper/colors'

const AddButtonComponent = styled.button({
  margin: '5px',
  width: '96%',
  borderRadius: '10px',
  backgroundColor: colors.editorPrimary100,
  textAlign: 'left',
  color: colors.almostBlack,
  minHeight: '50px',
  padding: '5px',
  outline: 'none',
  '&:hover': { backgroundColor: colors.editorPrimary200 },
})

export function AddButton(props: AddButtonProps) {
  return (
    <AddButtonComponent title={props.title} onMouseDown={props.onClick}>
      <FaIcon icon={faPlus} /> {props.children}
    </AddButtonComponent>
  )
}
export interface AddButtonProps {
  onClick: () => void
  children: string
  title?: string
}

const AnswerContainer = styled.div({
  marginBottom: '10px',
  display: 'flex',
  alignItems: 'center',
})

const CheckboxContainer = styled.div({
  width: '10%',
  textAlign: 'center',
  marginRight: '10px',
  fontWeight: 'bold',
})

const RemoveButton = styled.button({
  borderRadius: '50%',
  outline: 'none',
  background: 'white',
  zIndex: 20,
  float: 'right',
  transform: 'translate(50%, -40%)',
  '&:hover': {
    border: `3px solid ${colors.brand}`,
    color: colors.brand,
  },
})

const FeedbackField = styled.div({
  paddingLeft: '20px',
  paddingBottom: '10px',
  paddingTop: '10px',
  marginTop: '5px',
})

const FramedContainer = styled.div<{ focused: boolean }>(({ focused }) => {
  const defaultBorders = {
    border: '2px solid lightgrey',
    [`${RemoveButton}`]: {
      border: '2px solid lightgrey',
      color: 'lightgrey',
    },
    [`${FeedbackField}`]: {
      borderTop: '2px solid lightgrey',
    },
  }
  const focusedBorders = {
    border: `3px solid ${colors.brand}`,
    [`${RemoveButton}`]: {
      border: `3px solid ${colors.brand}`,
      color: colors.brand,
    },
    [`${FeedbackField}`]: {
      borderTop: `2px solid ${colors.brand}`,
    },
  }

  return {
    width: '100%',
    marginLeft: '10px',
    borderRadius: '10px',

    ...(focused ? focusedBorders : defaultBorders),
    '&:focus-within': focusedBorders,
  }
})
const AnswerField = styled.div({ paddingLeft: '20px', paddingTop: '10px' })

const Container = styled.div<{ isRadio: boolean; checked: boolean }>(
  ({ isRadio, checked }) => {
    return {
      cursor: 'pointer',
      border: checked
        ? isRadio
          ? `5px solid ${colors.brand}`
          : `2px solid ${colors.brand}`
        : '2px solid lightgray',
      borderRadius: isRadio ? '50%' : '15%',
      width: '20px',
      height: '20px',
      display: 'inline-block',
      verticalAlign: 'middle',
      backgroundColor: checked && !isRadio ? colors.brand : 'white',
    }
  }
)

const Tick = styled.div<{ checked: boolean }>(({ checked }) => {
  return {
    opacity: checked ? 1 : 0,
    content: '',
    position: 'absolute',

    fontWeight: 'bold',
    width: '15px',
    height: '10px',
    border: '3px solid white',
    borderTop: 'none',
    borderRight: 'none',
    borderRadius: '2px',
    zIndex: 10,
    transform: 'rotate(-45deg)',
  }
})

export function CheckElement({
  isRadio,
  isActive,
  handleChange,
}: CheckElementProps) {
  return (
    <Container
      isRadio={isRadio}
      checked={isActive}
      onClick={(e) => {
        handleChange(e)
      }}
    >
      {isRadio ? null : <Tick checked={isActive} />}
    </Container>
  )
}

const BlockLabel = styled.label({
  display: 'block',
})

export function InteractiveAnswer(props: InteractiveAnswerProps) {
  const { strings } = useInstanceData()

  return (
    <AnswerContainer>
      <CheckboxContainer>
        Richtig?
        <CheckElement
          isRadio={props.isRadio || false}
          isActive={props.isActive || false}
          handleChange={props.handleChange}
        />
      </CheckboxContainer>
      <FramedContainer
        focused={
          props.answerID === props.focusedElement ||
          props.feedbackID === props.focusedElement
        }
      >
        <AnswerField>
          <>
            <BlockLabel>{strings.content.exercises.answer}:</BlockLabel>
            {props.answer}
          </>
        </AnswerField>
        <RemoveButton onClick={props.remove}>
          <FaIcon icon={faTimes} />
        </RemoveButton>
        <FeedbackField>
          <BlockLabel>{strings.content.exercises.feedback}:</BlockLabel>
          {props.feedback}
        </FeedbackField>
      </FramedContainer>
    </AnswerContainer>
  )
}

export interface InteractiveAnswerProps {
  isRadio?: boolean
  isActive?: boolean
  handleChange: () => void
  answerID?: string
  feedbackID: string
  answer: HTMLInputElement | React.ReactNode
  feedback: React.ReactNode
  focusedElement?: string
  remove: () => void
}

export interface CheckElementProps {
  isRadio: boolean
  isActive: boolean
  handleChange: (event: React.MouseEvent) => void
}
