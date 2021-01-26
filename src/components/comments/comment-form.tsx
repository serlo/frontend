import {
  faReply,
  faArrowRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import * as React from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import styled, { css } from 'styled-components'

import { useInstanceData } from '@/contexts/instance-context'
import { isMac } from '@/helper/client-detection'
import { makeGreenButton, inputFontReset, makeMargin } from '@/helper/css'

interface CommentFormProps {
  onSend: (
    content: string,
    reply?: boolean,
    threadId?: string
  ) => Promise<boolean>
  placeholder: string
  reply?: boolean
  threadId?: string
}

export function CommentForm({
  placeholder,
  onSend,
  reply,
  threadId,
}: CommentFormProps) {
  const [commentValue, setCommentValue] = React.useState('')
  const { strings } = useInstanceData()
  const [isSending, setIsSending] = React.useState(false)

  async function onSendAction() {
    setIsSending(true)
    const success = await onSend(commentValue, reply, threadId)
    setIsSending(false)
    if (success) setCommentValue('')
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === 'Enter' && e.metaKey) void onSendAction()
  }

  const sendTitle = `${strings.comments.submit}   ${
    isMac() ? '⌘' : strings.keys.ctrl
  }↵`

  return (
    <StyledBox>
      <StyledTextarea
        value={commentValue}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setCommentValue(event.target.value)
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        $reply={reply}
        minRows={1}
      />
      <SendButton title={sendTitle} $reply={reply} onClick={onSendAction}>
        <FontAwesomeIcon
          spin={isSending}
          icon={isSending ? faSpinner : reply ? faReply : faArrowRight}
        />
      </SendButton>
    </StyledBox>
  )
}

const StyledBox = styled.div`
  ${makeMargin}
  margin-top: 18px;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-end;

  background-color: ${(props) => lighten(0.45, props.theme.colors.brandGreen)};
  border-radius: 18px;

  &:focus-within {
    background-color: ${(props) =>
      lighten(0.35, props.theme.colors.brandGreen)};
  }
  transition: background-color 0.2s ease-in;
`

// Info: https://styled-components.com/docs/api#transient-props
const StyledTextarea = styled(TextareaAutosize)<{ $reply?: boolean }>`
  ${inputFontReset}
  width: 100%;
  min-height: 33px;
  font-size: 1.125rem;
  color: #000;
  border: none;
  background: transparent;
  padding: ${(props) =>
    props.$reply ? '.5rem 3.5rem .5rem 1rem' : '1.25rem 3.5rem 1.25rem 1rem'};
  box-sizing: border-box;
  outline: none;
  resize: none;

  ::placeholder {
    color: ${(props) => props.theme.colors.brandGreen};
  }
`

const SendButton = styled.button<{ $reply?: boolean }>`
  width: 45px;
  height: 45px;
  ${makeGreenButton}
  font-size: 1.55rem;
  padding-left: 7px;

  margin: 0 5px 8px 0;

  > svg {
    vertical-align: ${(props) => (props.$reply ? '-2px' : '-4px')};
    padding-left: ${(props) => (props.$reply ? '0' : '2px')};
  }

  ${(props) =>
    props.$reply &&
    css`
      font-size: 1rem;
      width: 30px;
      height: 30px;
      margin-bottom: 4px;
    `}
`
