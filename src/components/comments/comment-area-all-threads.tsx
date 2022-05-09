import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { Guard } from '../guard'
import { LoadingSpinner } from '../loading/loading-spinner'
import { CommentArea } from './comment-area'
import { useInstanceData } from '@/contexts/instance-context'
import {
  GetAllThreadsNode,
  useCommentDataAll,
} from '@/fetcher/use-comment-data-all'
import { getTranslatedType } from '@/helper/get-translated-type'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { getIconByTypename } from '@/helper/icon-by-entity-type'

export function CommentAreaAllThreads() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { commentData, error, loading, loadMore } = useCommentDataAll()
  const { strings } = useInstanceData()

  return (
    <Guard data={commentData} error={error}>
      <>
        <CommentArea
          commentData={{ active: commentData, archived: [] }}
          renderSeparator={renderSeperator}
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

  function renderSeperator(thread?: GetAllThreadsNode) {
    // only for CommentAreaAllThreads
    if (!thread || !hasOwnPropertyTs(thread, 'object')) return null

    const { object } = thread
    if (
      !object ||
      !hasOwnPropertyTs(object, '__typename') ||
      !object.__typename
    )
      return null

    const { id, __typename } = object
    const href = hasOwnPropertyTs(object, 'alias') ? object.alias : `/${id}`

    return (
      <div className="border-b-2 mt-16 mb-5 mx-side">
        <b>
          <Link href={href}>
            <FaIcon icon={getIconByTypename(__typename)} />{' '}
            {getTranslatedType(strings, __typename)}
          </Link>
        </b>{' '}
        ( <Link href={href}>{href}</Link>)
      </div>
    )
  }
}
