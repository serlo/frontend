import { ReactNode } from 'react'

import { Comment } from './comment'
import { CommentsData, ThreadsData } from './comment-area'
import { useInstanceData } from '@/contexts/instance-context'
import { replacePlaceholders } from '@/helper/replace-placeholders'

interface ThreadProps {
  thread: ThreadsData[number]
  showChildren: boolean
  highlightedCommentId?: number
  renderReplyForm?: (threadId: string) => ReactNode
  toggleChildren?: (threadId: string) => void
  highlight: (o: number) => void
}

export function Thread({
  thread,
  showChildren,
  renderReplyForm,
  highlight,
  toggleChildren,
  highlightedCommentId,
}: ThreadProps) {
  const { strings } = useInstanceData()

  const threadComment = thread.comments.nodes[0]
  const comments = thread.comments.nodes.slice(1)

  return (
    <div className="mb-11" key={thread.id}>
      {renderComments([threadComment], thread.id, true)}
      {renderThreadComments(comments)}
    </div>
  )

  function renderThreadComments(comments: CommentsData) {
    //only show first reply by default
    if (comments.length < 2)
      return (
        <>
          {comments.length > 0 && renderComments(comments, thread.id)}
          {renderReplyForm && renderReplyForm(thread.id)}
        </>
      )

    return (
      <>
        {renderComments(showChildren ? comments : [comments[0]], thread.id)}
        {showChildren && renderReplyForm ? renderReplyForm(thread.id) : null}
        <p className="serlo-p">{renderMoreToggle()}</p>
      </>
    )
  }

  function renderMoreToggle() {
    const text = showChildren
      ? strings.comments.hideReplies
      : comments.length === 2
      ? strings.comments.showMoreReply
      : replacePlaceholders(strings.comments.showMoreReplies, {
          number: (comments.length - 1).toString(),
        })

    const icon = showChildren ? '▴' : '▾'

    return (
      <button
        className="serlo-button serlo-make-interactive-light"
        onClick={() => {
          if (toggleChildren) toggleChildren(thread.id)
        }}
      >
        {text} {icon}
      </button>
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
