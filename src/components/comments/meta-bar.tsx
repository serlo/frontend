import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tippy from '@tippyjs/react'
import clsx from 'clsx'
import { useState } from 'react'
import { Instance, Props } from 'tippy.js'

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
}

export function MetaBar({
  user,
  timestamp,
  isParent,
  archived,
  id,
  highlight,
  threadId,
}: MetaBarProps) {
  const [tippyInstance, setTippyInstance] =
    useState<Instance<Props> | null>(null)

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
          'hover:text-brand hover:bg-brand-150'
        )}
      />

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
            'serlo-button font-normal text-brand-light text-base h-7'
          )}
        >
          <TimeAgo datetime={date} /> <FontAwesomeIcon icon={faCaretDown} />
        </button>
      </Tippy>
    </div>
  )
}
