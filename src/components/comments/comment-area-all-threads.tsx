import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { Guard } from '../guard'
import { LoadingSpinner } from '../loading/loading-spinner'
import { CommentArea } from './comment-area'
import { EntityIdProvider } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { useCommentDataAll } from '@/fetcher/use-comment-data-all'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

export function CommentAreaAllThreads() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { commentData, error, loading, loadMore } = useCommentDataAll()
  const { strings } = useInstanceData()

  return (
    <Guard data={commentData} error={error}>
      <>
        {renderThreads()}
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

  function renderThreads() {
    return commentData?.map((thread) => {
      const { id, __typename } = thread.object

      const href = thread.object.alias ?? `/${id}`

      return (
        <EntityIdProvider key={thread.id} value={thread.object.id}>
          <div className="mb-16">
            <div className="border-b-2 mt-16 mb-5 mx-side">
              <b>
                <FaIcon icon={getIconByTypename(__typename)} />{' '}
                {getTranslatedType(strings, __typename)}
              </b>{' '}
              ({' '}
              <Link href={href + `#comment-${thread.comments.nodes[0]?.id}`}>
                {href}
              </Link>
              )
            </div>
            <CommentArea commentData={{ active: [thread], archived: [] }} />
          </div>
        </EntityIdProvider>
      )
    })
  }
}
