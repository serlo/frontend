import {
  faInfoCircle,
  faWarning,
  faFilter,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useState } from 'react'

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
import { Instance } from '@/fetcher/graphql-types/operations'
import { useCommentDataAll } from '@/fetcher/use-comment-data-all'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export function CommentAreaAllThreads() {
  const [filter, setFilter] = useState('')

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { commentData, error, loading, loadMore } = useCommentDataAll(filter)
  const { lang, strings } = useInstanceData()
  const auth = useAuthentication()

  return (
    <>
      <StaticInfoPanel icon={faInfoCircle} type="info">
        {replacePlaceholders(strings.comments.commentsOverviewExplanation, {
          break: <br />,
          instance: lang,
        })}
      </StaticInfoPanel>
      {lang === Instance.De && (
        <div className="mb-3 mt-[50px]">
          <FaIcon icon={faFilter} className="ml-2 mr-3" />
          Filtern nach
          <span
            className={clsx(
              "after:absolute after:-ml-7 after:mt-1.5 after:text-2xl after:text-black after:content-['▾']",
              'inline-block border-solid after:pointer-events-none'
            )}
          >
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
              }}
              className="ml-3 cursor-pointer appearance-none rounded-lg bg-brand-400 p-3 pr-9 [&>option:selected]:bg-brand-100 [&>option]:bg-white"
            >
              <option value="">Alle Fächer</option>
              <option value="czU=">Mathematik</option>
              <option value="czE3NzQ0">Nachhaltigkeit</option>
              <option value="czIzMzYy">Biologie</option>
              <option value="czE4MjMw">Chemie</option>
              <option value="czQ3ODk5">Informatik</option>
              <option value="czEwNjA4MQ==">Fächer im Aufbau</option>
              <option value="czE4MTg4Mw==">Lerntipps</option>
            </select>
          </span>
        </div>
      )}
      <Guard data={commentData} error={error}>
        <>
          {auth === null ? (
            <StaticInfoPanel icon={faWarning} type="warning">
              <PleaseLogIn noWrapper />
            </StaticInfoPanel>
          ) : null}
          {renderThreads()}
          <div className="border-truegray-300 mx-side mt-24 h-24 border-t-2">
            {loading ? (
              <LoadingSpinner noText />
            ) : (
              <button
                className="serlo-button-blue mb-12 mt-5"
                onClick={loadMore}
              >
                {strings.actions.loadMore}
              </button>
            )}
          </div>
        </>
      </Guard>
    </>
  )

  function renderThreads() {
    if ((!commentData || commentData.length === 0) && filter) {
      return (
        <div className="serlo-p -mb-8 mt-16">
          Keine Kommentare im aktuellen Zeitraum in diesem Fach.
        </div>
      )
    }

    return commentData?.map((thread) => {
      const { __typename } = thread.object
      const href = thread.object.alias
      const latestCommentId = thread.comments.nodes.at(-1)?.id

      return (
        <EntityIdProvider key={thread.id} value={thread.object.id}>
          <div className="mb-16">
            <div className="mx-side mb-5 mt-16 border-b-2">
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
