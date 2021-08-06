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
import { EdtrPluginText } from '@/schema/edtr-io-types'

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

const initialState = {
  plugin: 'text',
  state: [{ type: 'p', children: [{ text: '' }] }],
} as EdtrPluginText

export function CommentForm({
  placeholder,
  onSend,
  reply,
  threadId,
}: CommentFormProps) {
  const commentState = useRef<EdtrPluginText>(initialState)
  const { strings } = useInstanceData()
  const [isSending, setIsSending] = useState(false)
  const editorWrapRef = useRef<null | HTMLDivElement>(null)

  const textPlugin = createTextPlugin({
    placeholder,
    plugins: {
      suggestions: true,
      math: true,
      code: true,
      headings: false,
      lists: true,
      colors: true,
    },
    registry: [],
  } as TextConfig)

  async function onSendAction() {
    const content = JSON.stringify(commentState.current)
    const isEmpty = content.replace(/\s+/g, '') === JSON.stringify(initialState)

    if (isEmpty) {
      const slate = editorWrapRef.current?.querySelector(
        '[data-slate-editor="true"]'
      ) as HTMLDivElement
      slate?.focus()
      return
    }
    setIsSending(true)
    const success = await onSend(content, reply, threadId)
    if (success) commentState.current = initialState
    setIsSending(false)
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    // TODO: grab enter key again: only possible in edtr.io
    if (e.code === 'Enter' && e.metaKey) void onSendAction()
  }

  const sendTitle = `${strings.comments.submit}   ${
    isMac ? '⌘' : strings.keys.ctrl
  }↵`

  return (
    <StyleWrap
      className={clsx(
        'mx-side mt-4 mb-16 flex items-center rounded-2xl',
        'bg-brandgreen-lighter focus-within:bg-brandgreen-light',
        'transition-colors duration-200 ease-in py-1'
      )}
      onKeyDown={onKeyDown}
      ref={editorWrapRef}
    >
      <Editor
        onChange={(event) => {
          commentState.current = event.getDocument() as EdtrPluginText
        }} // @ts-expect-error think I followed edtr-io example, maybe outdated code in there?
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
  &:focus-within {
    overflow: visible;
  }

  ul {
    list-style: initial;
  }

  ol {
    list-style: decimal;
  }

  a {
    text-decoration: underline;
  }

  code {
    background-color: ${(props) => props.theme.colors.lightBlueBackground};
    color: ${(props) => props.theme.colors.brand};
    border-radius: 2px;
    font-size: 1rem;
    padding: 2px;
  }

  // overwrite some edtr.io styles
  > div {
    ${inputFontReset}
    width: 100%;
    font-size: 1.125rem;
    color: #000;

    padding: 0 3.5rem 0 0.6rem;

    div {
      margin-bottom: 0 !important;
    }

    /* style placeholder */
    span[contenteditable='false'] {
      color: ${(props) => props.theme.colors.brandGreen} !important;
      opacity: 1 !important;
    }

    /* hide bottom toolbar*/
    > div > div > div > div > div:first-child {
      opacity: 0;
    }
  }
`
