import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown'
import Tippy from '@tippyjs/react'
import clsx from 'clsx'
import { useState } from 'react'
import { Instance, Props } from 'tippy.js'

import { FaIcon } from '../fa-icon'
import { UserLink } from '../user/user-link'
import { DropdownMenu } from './dropdown-menu'
import { TimeAgo } from '@/components/time-ago'
import { useInstanceData } from '@/contexts/instance-context'

export interface MetaBarProps {
  user: { username: string; id: number }
  timestamp: string
  threadId: string
  isParent?: boolean
  archived?: boolean
  id: number
  highlight: (id: number) => void
  startEditing?: () => void
  abortEditing?: () => void
}

export function MetaBar({
  user,
  timestamp,
  isParent,
  archived,
  id,
  highlight,
  threadId,
  startEditing,
  abortEditing,
}: MetaBarProps) {
  const [tippyInstance, setTippyInstance] = useState<Instance<Props> | null>(
    null
  )

  const { strings } = useInstanceData()

  const date = new Date(timestamp)

  return (
    <div className={clsx('mx-side mb-2 flex justify-between')}>
      <UserLink
        user={user}
        withIcon
        path={['comment-user', id]}
        className={clsx(
          'serlo-button text-brand text-lg font-bold',
          '-ml-1 pl-1 flex items-center hover:no-underline',
          'hover:text-brand hover:bg-brand-200'
        )}
      />

      {abortEditing ? (
        <button
          onClick={abortEditing}
          // move button a bit down to avoid collision with drop down menu
          className="text-gray-700 hover:underline -mb-7 inline-block"
        >
          {strings.comments.abort}
        </button>
      ) : (
        <Tippy
          interactive
          placement="bottom-end"
          onCreate={(instance) => setTippyInstance(instance)}
          content={
            tippyInstance ? (
              <DropdownMenu
                isParent={isParent}
                threadId={threadId}
                date={date}
                id={id}
                archived={archived}
                startEditing={startEditing}
                highlight={highlight}
                // eslint-disable-next-line @typescript-eslint/unbound-method
                onAnyClick={tippyInstance.hide}
              />
            ) : (
              ''
            )
          }
        >
          <button
            title={date.toLocaleString('de-DE')}
            className={clsx(
              'serlo-button font-normal text-brand-500 text-base h-7'
            )}
          >
            <TimeAgo datetime={date} /> <FaIcon icon={faCaretDown} />
          </button>
        </Tippy>
      )}
    </div>
  )
}
