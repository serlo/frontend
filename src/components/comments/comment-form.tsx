import {
  faSpinner,
  faReply,
  faArrowRight,
  faSave,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState, KeyboardEvent, useRef, ChangeEvent } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

import { FaIcon } from '../fa-icon'
import { useInstanceData } from '@/contexts/instance-context'
import { isMac } from '@/helper/client-detection'
import { tw } from '@/helper/tw'

interface CommentFormProps {
  onSend: (
    content: string,
    reply?: boolean,
    threadId?: string
  ) => Promise<boolean | number>
  placeholder: string
  reply?: boolean
  threadId?: string
  content?: string
  isEditing?: boolean
  cancelEditing?: () => void
}

export function CommentForm({
  placeholder,
  onSend,
  reply,
  threadId,
  content,
  isEditing,
  cancelEditing,
}: CommentFormProps) {
  const [commentValue, setCommentValue] = useState(content ?? '')
  const { strings } = useInstanceData()
  const [isSending, setIsSending] = useState(false)
  const textareaRef = useRef<null | HTMLTextAreaElement>(null)

  async function onSendAction() {
    if (commentValue.length < 1) {
      textareaRef.current?.focus()
      return
    }
    setIsSending(true)
    const success = await onSend(commentValue, reply, threadId)
    setIsSending(false)
    if (success) setCommentValue('')
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.code === 'Enter' && e.metaKey) void onSendAction()
    if (e.code === 'Escape' && cancelEditing) void cancelEditing()
  }

  const formId = `comment-form${threadId ?? ''}`

  return (
    <div
      className={clsx(
        !isEditing && 'bg-brandgreen-50',
        tw`
          mx-side mt-4 mb-7 flex items-center rounded-2xl
          border-2 border-brandgreen-50 py-1 transition-colors duration-200
          ease-in focus-within:border-brandgreen-muted
        `
      )}
    >
      <label htmlFor={formId} className="sr-only">
        {placeholder}
      </label>
      <TextareaAutosize
        value={commentValue}
        ref={textareaRef}
        id={formId}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
          setCommentValue(event.target.value)
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        minRows={1}
        className={clsx(
          tw`
            serlo-input-font-reset w-full resize-none border-0 bg-transparent
            text-lg text-black placeholder-brandgreen focus:!outline-none
          `,
          reply ? 'pr-14 pl-4' : 'pr-14 pl-4'
        )}
      />
      {renderButton()}
    </div>
  )

  function renderButton() {
    const sendTitle = `${
      strings.comments[isEditing ? 'saveEdit' : 'submit']
    }   ${isMac ? '⌘' : strings.keys.ctrl}↵`

    const icon = isSending
      ? faSpinner
      : isEditing
      ? faSave
      : reply
      ? faReply
      : faArrowRight

    return (
      <button
        title={sendTitle}
        onClick={onSendAction}
        className={clsx(
          'serlo-button-green self-end pl-2',
          reply ? 'mr-1 h-8 w-8 text-base' : 'my-1 mr-2 w-10 text-2xl'
        )}
      >
        <FaIcon
          icon={icon}
          className={clsx(
            reply ? '' : 'pl-0.5',
            isSending && 'animate-spin-slow'
          )}
        />
      </button>
    )
  }
}
