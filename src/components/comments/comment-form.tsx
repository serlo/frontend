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
        'mx-side mt-4 mb-7 flex items-center rounded-2xl',
        !isEditing && 'bg-brandgreen-50',
        'border-2 border-brandgreen-50 focus-within:border-brandgreen-muted',
        'transition-colors duration-200 ease-in py-1'
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
          'serlo-input-font-reset w-full text-lg',
          'text-black border-0 bg-transparent resize-none focus:!outline-none',
          reply ? 'pr-14 pl-4' : 'pr-14 pl-4',
          'placeholder-brandgreen'
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
          'serlo-button-green pl-2 self-end',
          reply ? 'text-base w-8 h-8 mr-1' : 'text-2xl w-10 my-1 mr-2'
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
