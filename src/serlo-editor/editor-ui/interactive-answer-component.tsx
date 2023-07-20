import { faPlus, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import styled from 'styled-components'

import { FaIcon } from '@/components/fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { colors } from '@/helper/colors'

interface AddButtonProps {
  onClick: () => void
  children: string
  title?: string
}

export function AddButton({ title, onClick, children }: AddButtonProps) {
  return (
    <button
      title={title}
      onMouseDown={onClick}
      className="serlo-button-editor-primary mr-2"
    >
      <FaIcon icon={faPlus} /> {children}
    </button>
  )
}

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

export function InteractiveAnswer(props: InteractiveAnswerProps) {
  const { strings } = useInstanceData()

  return (
    <div className="relative mb-2.5 flex items-center border-y-2 border-editor-primary">
      <div className="mr-2.5 w-[10%] text-center font-bold">
        Richtig?
        <CheckElement
          isRadio={props.isRadio || false}
          isActive={props.isActive || false}
          handleChange={props.handleChange}
        />
      </div>
      <div className="ml-2.5 w-full rounded-sm">
        <div className="pl-5 pt-2.5">
          <>
            <label className="block">{strings.content.exercises.answer}:</label>
            {props.answer}
          </>
        </div>
        <button
          onClick={props.remove}
          className="serlo-button-editor-secondary absolute right-1 top-1.5 z-20"
        >
          <FaIcon icon={faTrashAlt} />
        </button>
        <div className="mt-1.5 py-2.5 pl-5">
          <label className="block">{strings.content.exercises.feedback}:</label>
          {props.feedback}
        </div>
      </div>
    </div>
  )
}

interface InteractiveAnswerProps {
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

interface CheckElementProps {
  isRadio: boolean
  isActive: boolean
  handleChange: (event: React.MouseEvent) => void
}
