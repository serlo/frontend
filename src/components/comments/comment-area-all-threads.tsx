import { Comment as CommentType, Thread as ThreadType } from '@serlo/api'

import { Guard } from '../guard'
import { LoadingSpinner } from '../loading/loading-spinner'
import { CommentArea } from './comment-area'
import { useInstanceData } from '@/contexts/instance-context'
import { useCommentDataAll } from '@/helper/use-comment-data-all'

export type CommentsData = CommentType[]
export type ThreadsData = ThreadType[]

export function CommentAreaAllThreads() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { commentData, error, loading, loadMore } = useCommentDataAll()
  const { strings } = useInstanceData()

  return (
    <Guard data={commentData} error={error}>
      <>
        <CommentArea
          commentData={{ active: commentData, archived: [] }}
          isDiscussionsPage
        />
        <div className="border-t-2 border-truegray-300 mx-side mt-24">
          {loading ? (
            <LoadingSpinner noText />
          ) : (
            <button
              className="serlo-button serlo-make-interactive-primary mt-5 mb-12"
              onClick={loadMore}
            >
              {strings.actions.loadMore}
            </button>
          )}
        </div>
      </>
    </Guard>
  )
}
