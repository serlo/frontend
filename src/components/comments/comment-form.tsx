import { faReply, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import * as React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styled from 'styled-components'

import { useInstanceData } from '@/contexts/instance-context'
import { makeGreenButton, inputFontReset, makeMargin } from '@/helper/css'

export interface SendProps {
  entity_id: string
  parent_id: string
  user_id: string
  user_name: string
  body?: string
}

interface CommentFormProps {
  parent_id: number
  onSendComment?: (props: SendProps) => void
  placeholder: string
  reply?: boolean
}

export function CommentForm({
  placeholder,
  // parent_id,
  // onSendComment,
  reply,
}: CommentFormProps) {
  const [commentValue, setCommentValue] = React.useState('')
  const { strings } = useInstanceData()

  return (
    <StyledBox>
      <StyledTextarea
        value={commentValue}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setCommentValue(event.target.value)
        }}
        placeholder={placeholder}
      />
      <SendButton
        title={strings.comments.submit}
        // onClick={
        //   onSendComment
        //     ? () =>
        //         onSendComment({
        //           entity_id: entity.id,
        //           parent_id: parent_id,
        //           user_id: user.id,
        //           user_name: user.username,
        //           body: this.state.newCommentValue,
        //         })
        //     : () => {}
        // }
      >
        <FontAwesomeIcon icon={reply ? faReply : faArrowRight} />
      </SendButton>
    </StyledBox>
  )
}

const StyledBox = styled.div`
  position: relative;
  ${makeMargin}
`

const StyledTextarea = styled(TextareaAutosize)`
  ${inputFontReset}
  font-size: 1.125rem;
  background-color: ${(props) => lighten(0.45, props.theme.colors.brandGreen)};
  width: 100%;
  color: #000;
  border: none;
  border-radius: 1.8rem;
  padding: 1.25rem 3.5rem 1.25rem 1rem;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;
  resize: none;
  min-height: 1rem;

  ::placeholder {
    color: ${(props) => props.theme.colors.brandGreen};
  }
  &:focus {
    min-height: 3rem;
    background-color: ${(props) =>
      lighten(0.35, props.theme.colors.brandGreen)};
  }
  transition: all 0.2s ease-in;
`

const SendButton = styled.button`
  position: absolute;
  right: 7px;
  bottom: 13px;
  width: 45px;
  height: 45px;
  font-size: 1.66rem;

  ${makeGreenButton}

  > svg {
    vertical-align: -5px;
    padding-left: 1px;
  }
`
