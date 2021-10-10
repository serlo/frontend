import { Thread as ThreadType } from '@serlo/api'
import { ReactNode } from 'react'

import { Comment } from './comment'
import { CommentsData } from './comment-area'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface ThreadProps {
  thread: ThreadType
  showChildren: boolean
  highlightedCommentId?: number
  renderReplyForm?: (threadId: string) => ReactNode
  onShowChildren?: (threadId: string) => void
  highlight: (o: number) => void
}

export function Thread({
  thread,
  showChildren,
  renderReplyForm,
  highlight,
  onShowChildren,
  highlightedCommentId,
}: ThreadProps) {
  const { strings } = useInstanceData()

  return (
    <div className="mb-11" key={thread.id}>
      {renderComments([thread.comments.nodes[0]], thread.id, true)}
      {renderThreadComments(thread.comments.nodes.slice(1), thread.id)}
    </div>
  )

  function renderThreadComments(comments: CommentsData, threadId: string) {
    const length = comments.length
    //only show first reply by default
    if (length < 2 || showChildren)
      return (
        <>
          {length > 0 && renderComments(comments, threadId)}
          {renderReplyForm && renderReplyForm(threadId)}
        </>
      )

    return (
      <>
        {renderComments([comments[0]], threadId)}
        <p className="serlo-p">
          <button
            className="serlo-button serlo-make-interactive-light"
            onClick={() => {
              if (onShowChildren) onShowChildren(threadId)
            }}
          >
            {length === 2
              ? strings.comments.showMoreReply
              : replacePlaceholders(strings.comments.showMoreReplies, {
                  number: (length - 1).toString(),
                })}{' '}
            ▾
          </button>
        </p>
      </>
    )
  }

  function renderComments(
    comments: CommentsData,
    threadId: string,
    isParent?: boolean
  ) {
    return comments.map((comment) => {
      const isHighlight = comment.id === highlightedCommentId
      return (
        <Comment
          key={comment.id}
          data={comment}
          threadId={threadId}
          isParent={isParent}
          isHighlight={isHighlight}
          highlight={highlight}
        />
      )
    })
  }
}
