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
  noScroll?: boolean
}

export function Thread({
  thread,
  showChildren,
  renderReplyForm,
  highlight,
  toggleChildren,
  highlightedCommentId,
  noScroll,
}: ThreadProps) {
  const threadComment = thread.comments.nodes[0]
  const comments = thread.comments.nodes.slice(1)

  return (
    <div className="mb-11" key={thread.id}>
      <Comments
        comments={[threadComment]}
        threadId={thread.id}
        isParent
        highlight={highlight}
        highlightedCommentId={highlightedCommentId}
        noScroll={noScroll}
      />
      <ThreadComments
        comments={comments}
        threadId={thread.id}
        renderReplyForm={renderReplyForm}
        showChildren={showChildren}
        toggleChildren={toggleChildren}
        highlight={highlight}
        highlightedCommentId={highlightedCommentId}
        noScroll={noScroll}
      />
    </div>
  )
}

type ThreadCommentsProps = Pick<
  ThreadProps,
  | 'showChildren'
  | 'toggleChildren'
  | 'highlight'
  | 'highlightedCommentId'
  | 'noScroll'
> & {
  comments: CommentsData
  threadId: string
  renderReplyForm?: ThreadProps['renderReplyForm']
}

function ThreadComments({
  comments,
  threadId,
  renderReplyForm,
  showChildren,
  toggleChildren,
  highlight,
  highlightedCommentId,
  noScroll,
}: ThreadCommentsProps) {
  //only show first reply by default
  if (comments.length < 2)
    return (
      <>
        {comments.length > 0 && (
          <Comments
            comments={comments}
            threadId={threadId}
            highlight={highlight}
            highlightedCommentId={highlightedCommentId}
            noScroll={noScroll}
          />
        )}
        {renderReplyForm && renderReplyForm(threadId)}
      </>
    )

  return (
    <>
      <Comments
        comments={showChildren ? comments : [comments[0]]}
        threadId={threadId}
        highlight={highlight}
        highlightedCommentId={highlightedCommentId}
        noScroll={noScroll}
      />
      {showChildren && renderReplyForm ? renderReplyForm(threadId) : null}
      <p className="serlo-p">
        <ToggleMoreButton
          showChildren={showChildren}
          comments={comments}
          toggleChildren={toggleChildren}
          threadId={threadId}
        />
      </p>
    </>
  )
}

function ToggleMoreButton({
  showChildren,
  comments,
  toggleChildren,
  threadId,
}: {
  showChildren: boolean
  comments: CommentsData
  toggleChildren: ThreadProps['toggleChildren']
  threadId: string
}) {
  const { strings } = useInstanceData()

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
      className="serlo-button-light"
      onClick={() => {
        if (toggleChildren) toggleChildren(threadId)
      }}
    >
      {text} {icon}
    </button>
  )
}

type CommentsProps = Pick<
  ThreadProps,
  'highlight' | 'noScroll' | 'highlightedCommentId'
> & { comments: CommentsData; threadId: string; isParent?: boolean }

function Comments({
  comments,
  threadId,
  isParent,
  highlight,
  noScroll,
  highlightedCommentId,
}: CommentsProps) {
  return (
    <>
      {comments.map((comment) => {
        const isHighlight = comment.id === highlightedCommentId
        return (
          <Comment
            key={comment.id}
            data={comment}
            threadId={threadId}
            isParent={isParent}
            isHighlight={isHighlight}
            highlight={highlight}
            noScroll={noScroll}
          />
        )
      })}
    </>
  )
}
