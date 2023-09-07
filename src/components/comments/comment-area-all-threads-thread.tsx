import { Entity, Thread } from '@serlo/authorization'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'

import { CommentArea } from './comment-area'
import { FaIcon } from '../fa-icon'
import { useAuthentication } from '@/auth/use-authentication'
import { useCanDo } from '@/auth/use-can-do'
import { EntityIdProvider } from '@/contexts/entity-id-context'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidType } from '@/data-types'
import { CommentStatus } from '@/fetcher/graphql-types/operations'
import { GetAllThreadsNode } from '@/fetcher/use-comment-data-all'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { submitEvent } from '@/helper/submit-event'
import { useSetThreadStatusMutation } from '@/mutations/thread'

interface CommentAreaAllThreadsThreadProps {
  thread: GetAllThreadsNode
  onMutate: () => void
}

export function CommentAreaAllThreadsThread({
  thread,
  onMutate,
}: CommentAreaAllThreadsThreadProps) {
  const { __typename } = thread.object
  const href = thread.object.alias
  const latestCommentId = thread.comments.nodes.at(-1)?.id

  const [status, setStatus] = useState<string>(thread.status)

  const { strings } = useInstanceData()

  const canDo = useCanDo()

  const auth = useAuthentication()

  const mutateStatus = useSetThreadStatusMutation()

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
            <select
              className={clsx(
                'mb-1 rounded py-2 pl-4 pr-6 disabled:appearance-none disabled:py-1 disabled:text-center',
                status === 'open'
                  ? 'bg-yellow'
                  : status === CommentStatus.Done
                  ? 'bg-brandgreen-500'
                  : 'bg-gray-200'
              )}
              disabled={!canSetStatus}
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                submitEvent('thread_status_set')
                onMutate()
                void mutateStatus({
                  id: [thread.id],
                  status: e.target.value as CommentStatus,
                })
              }}
            >
              <option value="open" className="bg-white">
                offen
              </option>
              <option value="done" className="bg-white">
                erledigt
              </option>
              <option value="noStatus" className="bg-white">
                kein Status
              </option>
            </select>
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
