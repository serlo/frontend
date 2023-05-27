import { faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'

import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { Guard } from '../guard'
import { LoadingSpinner } from '../loading/loading-spinner'
import { StaticInfoPanel } from '../static-info-panel'
import { PleaseLogIn } from '../user/please-log-in'
import { CommentArea } from './comment-area'
import { useAuthentication } from '@/auth/use-authentication'
import { EntityIdProvider } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'
import { useCommentDataAll } from '@/fetcher/use-comment-data-all'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export function CommentAreaAllThreads() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { commentData, error, loading, loadMore } = useCommentDataAll()
  const { lang, strings } = useInstanceData()
  const auth = useAuthentication()

  return (
    <Guard data={commentData} error={error}>
      <>
        <StaticInfoPanel icon={faInfoCircle} type="info">
          {replacePlaceholders(strings.comments.commentsOverviewExplanation, {
            break: <br />,
            instance: lang,
          })}
        </StaticInfoPanel>
        {auth === null ? (
          <StaticInfoPanel icon={faWarning} type="warning">
            <PleaseLogIn noWrapper />
          </StaticInfoPanel>
        ) : null}
        {renderThreads()}
        <div className="border-t-2 border-gray-300 mx-side mt-24">
          {loading ? (
            <LoadingSpinner noText />
          ) : (
            <button className="serlo-button-blue mt-5 mb-12" onClick={loadMore}>
              {strings.actions.loadMore}
            </button>
          )}
        </div>
      </>
    </Guard>
  )

  function renderThreads() {
    return commentData?.map((thread) => {
      const { __typename } = thread.object
      const href = thread.object.alias
      const latestCommentId = thread.comments.nodes.at(-1)?.id

      return (
        <EntityIdProvider key={thread.id} value={thread.object.id}>
          <div className="mb-16">
            <div className="border-b-2 mt-16 mb-5 mx-side">
              <b>
                <FaIcon icon={getIconByTypename(__typename as UuidType)} />{' '}
                {getTranslatedType(strings, __typename)}
              </b>{' '}
              ({' '}
              <Link href={href + `#comment-${thread.comments.nodes[0]?.id}`}>
                {href}
              </Link>
              )
            </div>
            <CommentArea
              commentData={{ active: [thread], archived: [] }}
              highlightedCommentId={latestCommentId}
              noScroll
            />
          </div>
        </EntityIdProvider>
      )
    })
  }
}
