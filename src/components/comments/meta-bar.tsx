import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import Tippy from '@tippyjs/react'
import clsx from 'clsx'
import { useState } from 'react'
import { Instance, Props } from 'tippy.js'

import { FaIcon } from '../fa-icon'
import { UserLink } from '../user/user-link'
import { DropdownMenu } from './dropdown-menu'
import { TimeAgo } from '@/components/time-ago'

export interface MetaBarProps {
  user: { username: string; id: number }
  timestamp: string
  threadId: string
  isParent?: boolean
  archived?: boolean
  id: number
  highlight: (id: number) => void
  isEditing: boolean
  startEditing?: () => void
}

export function MetaBar({
  user,
  timestamp,
  isParent,
  archived,
  id,
  highlight,
  threadId,
  isEditing,
  startEditing,
}: MetaBarProps) {
  const [tippyInstance, setTippyInstance] = useState<Instance<Props> | null>(
    null
  )

  const date = new Date(timestamp)

  return (
    <div className="mx-side mb-2 flex justify-between">
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
      {isEditing ? null : (
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
          <div className="cursor-pointer">
            <span className={clsx('text-brand-500 text-base')}>
              <TimeAgo datetime={date} />
            </span>
            <button
              className="serlo-button text-brand bg-brand-50 w-7 h-7 ml-1 pr-2 "
              aria-label="Tool Menu"
            >
              <FaIcon icon={faEllipsisVertical} />
            </button>
          </div>
        </Tippy>
      )}
    </div>
  )
}
