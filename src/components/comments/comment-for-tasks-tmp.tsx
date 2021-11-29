import { Comment as CommentType, Thread as ThreadType } from '@serlo/api'

import { Guard } from '../guard'
import { Comment } from './comment'
import { useCommentData } from '@/helper/use-comment-data'

export interface CommentAreaProps {
  id: number
  noForms?: boolean
}

export type CommentsData = CommentType[]
export type ThreadsData = ThreadType[]

export function CommentForTasks({ id }: { id: number }) {
  const { commentData, commentCount, error } = useCommentData(id)
  return (
    <Guard data={commentData} error={error}>
      {renderContent()}
    </Guard>
  )

  function renderContent() {
    if (commentCount === undefined || commentCount == 0) return null

    const comment = commentData.active?.[0].comments.nodes[0]

    if (!comment) return null
    return (
      <Comment
        data={comment}
        threadId="thread?"
        isParent={false}
        highlight={(_a: number) => {}}
      />
    )
  }
}
