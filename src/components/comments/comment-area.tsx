import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle'
import { Thread as AuthThread } from '@serlo/authorization'
import { Fragment, useState } from 'react'

import { Lazy } from '../content/lazy'
import { FaIcon } from '../fa-icon'
import { PleaseLogIn } from '../user/please-log-in'
import { CommentArchive } from './comment-archive'
import { CommentForm } from './comment-form'
import { Thread } from './thread'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { GetCommentsNode } from '@/fetcher/use-comment-data'
import { GetAllThreadsNode } from '@/fetcher/use-comment-data-all'
import {
  useCreateThreadMutation,
  useCreateCommentMutation,
} from '@/helper/mutations/thread'

export type ThreadsData = GetCommentsNode[] | GetAllThreadsNode[]
export type CommentsData =
  | GetCommentsNode['comments']['nodes']
  | GetAllThreadsNode['comments']['nodes']

export interface CommentAreaProps {
  commentData: {
    active?: ThreadsData
    archived?: ThreadsData
  }
  commentCount?: number
  entityId?: number
  noForms?: boolean
  highlightedCommentId?: number
  setHighlightedCommentId?: (id: number) => void
}

export function CommentArea({
  commentData,
  commentCount,
  entityId,
  noForms,
  highlightedCommentId,
  setHighlightedCommentId,
}: CommentAreaProps) {
  const { strings } = useInstanceData()
  const auth = useAuthentication()
  const [showThreadChildren, setShowThreadChildren] = useState<string[]>([])
  const createThread = useCreateThreadMutation()
  const createComment = useCreateCommentMutation()

  const canDo = useCanDo()

  const showAll =
    typeof window !== 'undefined' &&
    window.location.hash.startsWith('#comment-')

  return (
    <>
      {renderStartThreadForm()}
      {renderContent()}
    </>
  )

  function highlight(id: number) {
    if (setHighlightedCommentId) setHighlightedCommentId(id)
  }

  function renderContent() {
    if (!auth.current && commentCount == 0) return null

    return (
      <>
        {(commentCount === undefined || commentCount > 0) && (
          <>
            {commentCount &&
              commentCount > 0 &&
              renderHeading(
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
    if (noForms || !entityId) return null
    return (
      <>
        {renderHeading(faQuestionCircle, ` ${strings.comments.question}`)}
        {
          auth.current === null ? (
            <PleaseLogIn />
          ) : canDo(AuthThread.createThread) ? (
            <CommentForm
              placeholder={strings.comments.placeholder}
              onSend={onSend}
            />
          ) : null /* placeholder while loading permissions */
        }
      </>
    )
  }

  function renderThreads() {
    return commentData.active?.map((thread) => (
      <Fragment key={thread.id}>
        <Thread
          thread={thread}
          showChildren={showAll ? true : showThreadChildren.includes(thread.id)}
          highlightedCommentId={highlightedCommentId}
          renderReplyForm={renderReplyForm}
          highlight={highlight}
          onShowChildren={onShowThreadChildren}
        />
      </Fragment>
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
        highlight={highlight}
      />
    )
  }

  function onShowThreadChildren(threadId: string) {
    setShowThreadChildren([...showThreadChildren, threadId])
  }

  function renderHeading(icon: IconDefinition, text: string) {
    return (
      <h2 className="serlo-h2 border-b-0 mt-10">
        <FaIcon className="text-2.5xl text-brand-lighter" icon={icon} />
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
      if (entityId) {
        return createThread({
          title: '',
          content,
          objectId: entityId,
          subscribe: true,
          sendEmail: false,
        })
      } else return false
    }
  }
}
