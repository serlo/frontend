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

import { MathSpan } from '../content/math-span'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { getTextPluginI18n } from '@/edtr-io/plugins'
import { isMac } from '@/helper/client-detection'
import { EdtrPluginText } from '@/schema/edtr-io-types'
import { theme } from '@/theme'

export interface CommentFormProps {
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
  const [isActive, setIsActive] = useState(false)
  const editorWrapRef = useRef<null | HTMLDivElement>(null)

  function activateEditor() {
    setIsActive(true)
  }

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

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
    i18n: getTextPluginI18n(editorStrings),
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
    if (e.key === 'Enter' && e.metaKey) void onSendAction()
  }

  const sendTitle = `${strings.comments.submit}   ${
    isMac ? '⌘' : strings.keys.ctrl
  }↵`

  return (
    <div
      className={clsx(
        'mx-side mt-4 mb-16 flex items-center rounded-2xl',
        'bg-brandgreen-lighter focus-within:bg-brandgreen-light',
        'transition-colors duration-200 ease-in py-1 cursor-pointer'
      )}
      onKeyDownCapture={onKeyDown} //onKeyDownCapture to leapfrog Edtr
      ref={editorWrapRef}
      onClick={activateEditor}
    >
      {isActive ? (
        <>
          <MathSpan formula="" />
          <Editor
            onChange={(event) => {
              commentState.current = event.getDocument() as EdtrPluginText
            }}
            plugins={{ text: textPlugin }}
            initialState={initialState}
          />
        </>
      ) : (
        <p className="pl-4 text-brandgreen text-lg w-full">{placeholder}</p>
      )}
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
      <style jsx>
        {`
          div {
            :global(ul) {
              list-style: initial;
            }
            :global(&:focus-within) {
              overflow: visible;
            }
            :global(ul) {
              list-style: initial;
            }
            :global(ol) {
              list-style: decimal;
            }
            :global(a) {
              text-decoration: underline;
            }
            :global(code) {
              background-color: ${theme.colors.lightBlueBackground};
              color: ${theme.colors.brand};
              border-radius: 2px;
              font-size: 1rem;
              padding: 2px;
            }
            :global(> div) {
              width: 100%;
              font-size: 1.125rem;
              color: #000;

              padding: 0 3.5rem 0 0.6rem;

              :global(div) {
                margin-bottom: 0 !important;
              }
              /* style placeholder */
              :global(span[contenteditable='false']) {
                color: ${theme.colors.brandGreen} !important;
                opacity: 1 !important;
              }
              /* hide bottom toolbar*/
              :global(> div > div > div > div > div:first-child) {
                opacity: 0;
              }
            }
          }
        `}
      </style>
    </div>
  )
}
