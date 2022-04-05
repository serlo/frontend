import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import clsx from 'clsx'
import { gql } from 'graphql-request'

import { FaIcon } from '../fa-icon'
import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'

export interface UnreadNotificationsCountProps {
  icon?: IconDefinition
  onlyNumber?: boolean
}

export function UnreadNotificationsCount({
  icon,
  onlyNumber,
}: UnreadNotificationsCountProps) {
  const { data } = useGraphqlSwrWithAuth<{
    notifications: {
      totalCount: number
    }
  }>({
    query: gql`
      {
        notifications(unread: true) {
          totalCount
        }
      }
    `,
    config: {
      refreshInterval: 60 * 1000, // seconds
    },
  })

  const count = data === undefined ? 0 : data.notifications.totalCount
  const displayCount = count > 9 ? '+' : count

  if (onlyNumber) return <>{data === undefined ? '…' : count}</>

  return (
    <span
      className={clsx(
        'relative inline-block w-5 h-[1em]',
        count > 0 && 'text-brand',
        'notification-count-span'
      )}
    >
      {icon && <FaIcon icon={icon} className="absolute inset-0 w-5 h-6" />}
      <span
        className={clsx(
          'block text-sm absolute mt-0.25 text-white',
          'z-50 text-center w-5',
          'group-hover:text-brand group-active:text-brand transition-all'
        )}
      >
        {displayCount}
      </span>
    </span>
  )
}
