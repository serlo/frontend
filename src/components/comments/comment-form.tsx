import { Editor } from '@edtr-io/core'
import { createTextPlugin, TextConfig } from '@edtr-io/plugin-text'
import {
  faReply,
  faArrowRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { useState, KeyboardEvent, useRef } from 'react'
import styled from 'styled-components'

import { useInstanceData } from '@/contexts/instance-context'
import { isMac } from '@/helper/client-detection'
import { inputFontReset } from '@/helper/css'

interface CommentFormProps {
  onSend: (
    content: string,
    reply?: boolean,
    threadId?: string
  ) => Promise<boolean | undefined>
  placeholder: string
  reply?: boolean
  threadId?: string
}

const initialState = { plugin: 'text' }

export function CommentForm({
  placeholder,
  onSend,
  reply,
  threadId,
}: CommentFormProps) {
  const commentValue = useRef('')
  const { strings } = useInstanceData()
  const [isSending, setIsSending] = useState(false)
  const editorWrapRef = useRef<null | HTMLDivElement>(null)

  const textPlugin = createTextPlugin({
    placeholder,
    plugins: {
      suggestions: true,
      math: true,
      code: false, // rendering not working yet
      headings: false,
      lists: true,
      colors: false, // ui not working yet
    },
    registry: [],
  } as TextConfig)

  async function onSendAction() {
    // TODO: check if state is empty
    if (commentValue.current.length === 0) {
      const slate = editorWrapRef.current?.querySelector(
        '[data-slate-editor="true"]'
      ) as HTMLDivElement
      slate?.focus()
      return
    }
    setIsSending(true)
    const success = await onSend(commentValue.current, reply, threadId)
    setIsSending(false)
    if (success) commentValue.current = ''
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    // TODO: grab enter key again
    if (e.code === 'Enter' && e.metaKey) void onSendAction()
  }

  const sendTitle = `${strings.comments.submit}   ${
    isMac ? '⌘' : strings.keys.ctrl
  }↵`

  return (
    <StyleWrap
      className={clsx(
        'mx-side mt-4 mb-7 flex items-center rounded-2xl',
        'bg-brandgreen-lighter focus-within:bg-brandgreen-light',
        'transition-colors duration-200 ease-in py-1'
      )}
      onKeyDown={onKeyDown}
      ref={editorWrapRef}
    >
      <Editor
        onChange={(event) => {
          commentValue.current = JSON.stringify(
            event.getDocument() ?? initialState
          )
        }} // @ts-expect-error think I followed edtr-io example, so maybe outdated code in there?
        plugins={{ text: textPlugin }}
        initialState={initialState}
      />
      <button
        title={sendTitle}
        onClick={onSendAction}
        onPointerUp={(e) => e.currentTarget.blur()}
        className={clsx(
          'serlo-button serlo-make-interactive-green pl-2 self-end',
          reply ? 'text-base w-8 h-8 mr-1' : 'text-2xl w-10 my-1 mr-2'
        )}
      >
        <FontAwesomeIcon
          spin={isSending}
          icon={isSending ? faSpinner : reply ? faReply : faArrowRight}
          className={reply ? '' : 'pl-0.5'}
        />
      </button>
    </StyleWrap>
  )
}

const StyleWrap = styled.div`
  margin-bottom: 4rem;

  overflow: hidden;

  &:focus-within {
    overflow: visible;
  }

  ul {
    list-style: initial;
  }

  > div {
    ${inputFontReset}
    width: 100%;
    font-size: 1.125rem;
    color: #000;

    padding: 0 3.5rem 0 0.6rem;

    div {
      margin-bottom: 0 !important;
    }

    span[contenteditable='false'] {
      color: ${(props) => props.theme.colors.brandGreen} !important;
      opacity: 1 !important;
    }

    /* Do I have a choice? */
    /* TODO: Investigate if we can solve this with theme or if we have to change edtr code */
    /* Maybe we should add a staticToolbar option or smth. */

    /* should be the toolbar */
    > div > div > div > div > div:first-child {
      margin-left: 7rem !important;
      position: absolute !important;
      height: fit-content !important;
      top: auto !important;
      left: 0 !important;
      opacity: 1 !important;
      bottom: -4.2rem !important;
      display: block !important;

      div:first-child {
        margin-left: -7.6rem;
        margin-top: -3.25rem;
      }

      div:nth-child(2) {
        display: none;
      }
    }

    /* div[data-slate-editor='true'] {
      
    } */
  }
`
//   'placeholder-brandgreen'
