import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { gql } from 'graphql-request'

import { useGraphqlSwrWithAuth } from '@/api/use-graphql-swr'

export interface UnreadNotificationsCountProps {
  icon?: FontAwesomeIconProps['icon']
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
    <span className={clsx('fa-layers fa-fw', count > 0 && 'text-brand')}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={{ height: '1.45rem', width: '1.25rem', paddingTop: '0' }}
        />
      )}
      <span
        className={clsx(
          'block text-sm absolute -mt-0.25 text-white',
          'z-50 text-center w-5',
          'group-hover:text-brand group-active:text-brand transition-all'
        )}
      >
        {displayCount}
      </span>
    </span>
  )
}
