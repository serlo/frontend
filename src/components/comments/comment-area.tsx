import {
  faComments,
  faQuestionCircle,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Comment as CommentType, Thread as ThreadType } from '@serlo/api'
import { Thread as AuthThread } from '@serlo/authorization'
import dynamic from 'next/dynamic'
import { useState, useRef, useEffect } from 'react'

import { Lazy } from '../content/lazy'
import { Guard } from '../guard'
// import { PleaseLogIn } from '../user/please-log-in'
import { CommentArchive } from './comment-archive'
import { CommentFormProps } from './comment-form'
import { Thread } from './thread'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import {
  useCreateThreadMutation,
  useCreateCommentMutation,
} from '@/helper/mutations'
import { scrollToPrevious } from '@/helper/scroll'
import { useCommentData } from '@/helper/use-comment-data'

export interface CommentAreaProps {
  id: number
  noForms?: boolean
}

export type CommentsData = CommentType[]
export type ThreadsData = ThreadType[]

const CommentForm = dynamic<CommentFormProps>(() =>
  import('./comment-form').then((mod) => mod.CommentForm)
)

export function CommentArea({ id: entityId, noForms }: CommentAreaProps) {
  const [highlightedCommentId, setHighlightedCommentId] = useState<
    number | undefined
  >(undefined)
  const container = useRef<HTMLDivElement>(null)
  const { strings } = useInstanceData()
  const auth = useAuthentication()
  const [showThreadChildren, setShowThreadChildren] = useState<string[]>([])
  const createThread = useCreateThreadMutation()
  const createComment = useCreateCommentMutation()
  const { commentData, commentCount, error } = useCommentData(entityId)

  const canDo = useCanDo()

  const showAll =
    typeof window !== 'undefined' &&
    window.location.hash.startsWith('#comment-')

  useEffect(() => {
    if (showAll && highlightedCommentId === undefined) {
      if (container.current) scrollToPrevious(container.current)
      const id = parseInt(window.location.hash.replace('#comment-', ''))
      if (!isNaN(id)) setHighlightedCommentId(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAll, container, entityId])

  return (
    <div ref={container} className="print:hidden">
      <Guard data={commentData} error={error}>
        <>
          {renderStartThreadForm()}
          {renderContent()}
        </>
      </Guard>
    </div>
  )

  function renderContent() {
    if (commentCount === undefined || (!auth.current && commentCount == 0))
      return null

    return (
      <>
        {commentCount > 0 && (
          <>
            {renderHeading(
              faComments,
              ` ${commentCount} ${
                commentCount === 1
                  ? strings.comments.commentsOne
                  : strings.comments.commentsMany
              }`
            )}
            <Lazy>
              {renderThreads()}
              {renderArchive()}
            </Lazy>
          </>
        )}
      </>
    )
  }

  function renderStartThreadForm() {
    if (noForms) return null
    return (
      <>
        {renderHeading(faQuestionCircle, ` ${strings.comments.question}`)}
        {/* TODO: Skip auth while in developement (if reenabled, dynamic loading should work) */}
        <CommentForm
          placeholder={strings.comments.placeholder}
          onSend={onSend}
        />
        {/*
          auth.current === null ? (
            <PleaseLogIn />
          ) : canDo(AuthThread.createThread) ? (
            <CommentForm
              placeholder={strings.comments.placeholder}
              onSend={onSend}
            />
          ) : null // placeholder while loading permissions
        */}
      </>
    )
  }

  function renderThreads() {
    return commentData.active?.map((thread) => (
      <Thread
        key={thread.id}
        thread={thread}
        showChildren={showAll ? true : showThreadChildren.includes(thread.id)}
        highlightedCommentId={highlightedCommentId}
        renderReplyForm={renderReplyForm}
        highlight={setHighlightedCommentId}
        onShowChildren={onShowThreadChildren}
      />
    ))
  }

  function renderReplyForm(threadId: string) {
    if (!auth.current || noForms || !canDo(AuthThread.createComment))
      return null
    return (
      <CommentForm
        placeholder={strings.comments.placeholderReply}
        threadId={threadId}
        reply
        onSend={onSend}
      />
    )
  }

  function renderArchive() {
    return (
      <CommentArchive
        show={showAll}
        data={commentData.archived}
        highlightedCommentId={highlightedCommentId}
        highlight={setHighlightedCommentId}
      />
    )
  }

  function onShowThreadChildren(threadId: string) {
    setShowThreadChildren([...showThreadChildren, threadId])
  }

  function renderHeading(icon: IconDefinition, text: string) {
    return (
      <h2 className="serlo-h2 border-b-0 mt-10">
        {/* i18n Note: Pluralisation hack */}
        <FontAwesomeIcon
          className="text-2.5xl text-brand-lighter"
          icon={icon}
        />
        {text}
      </h2>
    )
  }

  async function onSend(content: string, reply?: boolean, threadId?: string) {
    if (auth.current === null) return false

    if (reply) {
      if (threadId === undefined) return false
      setShowThreadChildren([...showThreadChildren, threadId])
      return createComment({
        content,
        threadId,
        subscribe: true,
        sendEmail: false,
      })
    } else {
      return createThread({
        title: '',
        content,
        objectId: entityId,
        subscribe: true,
        sendEmail: false,
      })
    }
  }
}
