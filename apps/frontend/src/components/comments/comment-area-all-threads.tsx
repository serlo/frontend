import {
  faInfoCircle,
  faWarning,
  faFilter,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { CommentAreaAllThreadsThread } from './comment-area-all-threads-thread'
import { FaIcon } from '../fa-icon'
import { Guard } from '../guard'
import { InfoPanel } from '../info-panel'
import { LoadingSpinner } from '../loading/loading-spinner'
import { PleaseLogIn } from '../user/please-log-in'
import { useAuthentication } from '@/auth/use-authentication'
import { useInstanceData } from '@/contexts/instance-context'
import { CommentStatus, Instance } from '@/fetcher/graphql-types/operations'
import { useCommentDataAll } from '@/fetcher/use-comment-data-all'
import { cn } from '@/helper/cn'
import { replacePlaceholders } from '@/helper/replace-placeholders'

export function CommentAreaAllThreads() {
  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState<string | null>('')

  const [showRefresh, setShowRefresh] = useState(false)

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { commentData, error, loading, loadMore } = useCommentDataAll(
    filter === 'all' ? undefined : filter,
    (status === 'all'
      ? undefined
      : status
      ? status
      : undefined) as CommentStatus
  )
  const { lang, strings } = useInstanceData()
  const auth = useAuthentication()

  return (
    <>
      <InfoPanel icon={faInfoCircle} type="info">
        {replacePlaceholders(strings.comments.commentsOverviewExplanation, {
          break: <br />,
          instance: lang,
        })}
      </InfoPanel>
      {lang === Instance.De && (
        <div className="mb-3 mt-[50px]">
          <FaIcon icon={faFilter} className="ml-2 mr-3" />
          Filtern nach
          <span
            className={cn(
              "after:absolute after:-ml-7 after:mt-1.5 after:text-2xl after:text-black after:content-['▾']",
              'inline-block border-solid after:pointer-events-none'
            )}
          >
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value)
              }}
              className={cn(
                filter ? 'bg-brand-400' : 'bg-gray-200',
                'ml-3 cursor-pointer appearance-none rounded-lg  p-3 pr-9 [&>option:selected]:bg-brand-100 [&>option]:bg-white'
              )}
            >
              <option value="">Fach auswählen</option>
              <option value="all">alle Fächer</option>
              <option value="czU=">Mathematik</option>
              <option value="czE3NzQ0">Nachhaltigkeit</option>
              <option value="czIzMzYy">Biologie</option>
              <option value="czE4MjMw">Chemie</option>
              <option value="czQ3ODk5">Informatik</option>
              <option value="czEwNjA4MQ==">Fächer im Aufbau</option>
              <option value="czE4MTg4Mw==">Lerntipps</option>
            </select>
          </span>
          <span
            className={cn(
              "after:absolute after:-ml-7 after:mt-1.5 after:text-2xl after:text-black after:content-['▾']",
              'ml-12 inline-block border-solid after:pointer-events-none'
            )}
          >
            <select
              value={status ?? ''}
              onChange={(e) => {
                setStatus(e.target.value)
                setShowRefresh(false)
              }}
              className={cn(
                status ? 'bg-brand-400' : 'bg-gray-200',
                'cursor-pointer appearance-none rounded-lg bg-brand-400 p-3 pr-9 [&>option:selected]:bg-brand-100 [&>option]:bg-white'
              )}
            >
              <option value="">Status auswählen</option>
              <option value="all">alle Status</option>
              <option value={CommentStatus.Open}>offen</option>
              <option value={CommentStatus.Done}>abgeschlossen</option>
              <option value={CommentStatus.NoStatus}>kein Status</option>
            </select>
          </span>
          {showRefresh && status && (
            <button
              onClick={() => {
                const cur = status
                setStatus(null)
                setShowRefresh(false)
                setTimeout(() => {
                  setStatus(cur)
                }, 10)
              }}
              className="serlo-link ml-10"
            >
              Filter aktualisieren
            </button>
          )}
        </div>
      )}
      <Guard data={commentData} error={error}>
        <>
          {auth === null ? (
            <InfoPanel icon={faWarning} type="warning">
              <PleaseLogIn noWrapper />
            </InfoPanel>
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
      return (
        <CommentAreaAllThreadsThread
          key={thread.id}
          thread={thread}
          onMutate={() => {
            setShowRefresh(true)
          }}
        />
      )
    })
  }
}
