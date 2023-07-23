import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Entity, Thread } from '@serlo/authorization'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { CommentArea } from './comment-area'
import { FaIcon } from '../fa-icon'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { EntityIdProvider } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'
import { GetAllThreadsNode } from '@/fetcher/use-comment-data-all'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { submitEvent } from '@/helper/submit-event'

interface CommentAreaAllThreadsThreadProps {
  thread: GetAllThreadsNode
}

export function CommentAreaAllThreadsThread({
  thread,
}: CommentAreaAllThreadsThreadProps) {
  const { __typename } = thread.object
  const href = thread.object.alias
  const latestCommentId = thread.comments.nodes.at(-1)?.id

  const [status, setStatus] = useState('loading')

  useEffect(() => {
    void (async () => {
      const res = await fetch(`/api/frontend/thread-status/get/${thread.id}`)
      const text = await res.text()
      if (text === 'none' || text === 'open') {
        setStatus('open')
      }
      if (text === 'done') {
        setStatus('done')
      }
    })()
  }, [thread.id])

  const { strings } = useInstanceData()

  const canDo = useCanDo()

  const auth = useAuthentication()

  const canSetStatus =
    auth &&
    (canDo(Thread.setThreadState) ||
      canDo(Entity.checkoutRevision) ||
      thread.comments.nodes.some((obj) => obj.author.id === auth.id))

  return (
    <EntityIdProvider key={thread.id} value={thread.object.id}>
      <div className="mb-16">
        <div className="mx-side mb-5 mt-16 flex items-baseline justify-between border-b-2">
          <div>
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
          <div>
            {status === 'loading' ? (
              <FaIcon icon={faSpinner} className="animate-spin-slow" />
            ) : (
              <select
                className={clsx(
                  'mb-1 rounded py-2 pl-4 pr-6 disabled:appearance-none disabled:py-1 disabled:text-center',
                  status === 'open' ? 'bg-yellow' : 'bg-brandgreen-500'
                )}
                disabled={!canSetStatus}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  submitEvent('thread_status_set')
                  void fetch(
                    `/api/frontend/thread-status/set/${thread.id}?label=${e.target.value}`
                  )
                }}
              >
                <option value="open" className="bg-white">
                  offen
                </option>
                <option value="done" className="bg-white">
                  erledigt
                </option>
              </select>
            )}
          </div>
        </div>
        <CommentArea
          commentData={{ active: [thread], archived: [] }}
          highlightedCommentId={latestCommentId}
          noScroll
        />
      </div>
    </EntityIdProvider>
  )
}
