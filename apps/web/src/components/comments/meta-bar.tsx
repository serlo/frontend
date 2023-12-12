import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { cn } from '@serlo/tailwind/helper/cn'
import Tippy from '@tippyjs/react'
import { useState } from 'react'
import { Instance, Props } from 'tippy.js'

import { DropdownMenu } from './dropdown-menu'
import { FaIcon } from '../fa-icon'
import { UserLink } from '../user/user-link'
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
        className={cn(`
          serlo-button -ml-1 flex items-center
          pl-1 text-lg font-bold text-brand 
          hover:bg-brand-200 hover:text-brand hover:no-underline
        `)}
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
            <span className="text-base text-brand-500">
              <TimeAgo datetime={date} />
            </span>
            <button
              className="serlo-button ml-1 h-7 w-7 bg-brand-50 pr-2 text-brand "
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
