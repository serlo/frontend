import { faComments, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Thread as AuthThread } from '@serlo/authorization'
import { Fragment, useState } from 'react'

import { CommentArchive } from './comment-archive'
import { CommentForm } from './comment-form'
import { Thread } from './thread'
import { FaIcon, FaIconProps } from '../fa-icon'
import { PleaseLogIn } from '../user/please-log-in'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { useInstanceData } from '@/contexts/instance-context'
import { GetCommentsNode } from '@/fetcher/use-comment-data'
import { GetAllThreadsNode } from '@/fetcher/use-comment-data-all'
import {
  useCreateThreadMutation,
  useCreateCommentMutation,
} from '@/mutations/thread'

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
  noScroll?: boolean
}

export function CommentArea({
  commentData,
  commentCount,
  entityId,
  noForms,
  highlightedCommentId,
  setHighlightedCommentId,
  noScroll,
}: CommentAreaProps) {
  const { strings } = useInstanceData()
  const auth = useAuthentication()
  const createThread = useCreateThreadMutation()
  const createComment = useCreateCommentMutation()

  const canDo = useCanDo()

  const showAll =
    (typeof window !== 'undefined' &&
      window.location.hash.startsWith('#comment-')) ||
    highlightedCommentId !== undefined

  const [showThreadChildren, setShowThreadChildren] = useState<string[]>(
    showAll ? commentData.active?.map(({ id }) => id) ?? [] : []
  )

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
    if (!auth && commentCount === 0) return null

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
            {renderThreads()}
            {renderArchive()}
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
          auth === null ? (
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
          showChildren={showThreadChildren.includes(thread.id)}
          highlightedCommentId={highlightedCommentId}
          renderReplyForm={renderReplyForm}
          highlight={highlight}
          toggleChildren={onToggleThreadChildren}
          noScroll={noScroll}
        />
      </Fragment>
    ))
  }

  function renderReplyForm(threadId: string) {
    if (!auth || noForms || !canDo(AuthThread.createComment)) return null
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

  function onToggleThreadChildren(threadId: string) {
    setShowThreadChildren(
      showThreadChildren.includes(threadId)
        ? showThreadChildren.filter((id) => id !== threadId)
        : [...showThreadChildren, threadId]
    )
  }

  function renderHeading(icon: FaIconProps['icon'], text: string) {
    return (
      <h2 className="serlo-h2 mt-10 border-b-0">
        <FaIcon className="text-2.5xl text-brand-400" icon={icon} />
        {text}
      </h2>
    )
  }

  async function onSend(content: string, reply?: boolean, threadId?: string) {
    if (auth === null) return false

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
