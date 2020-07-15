import { useGraphqlSwr } from '@/api/use-graphql-swr'

export function UnreadNotifications() {
  const { data } = useGraphqlSwr<{
    notifications: {
      totalCount: number
    }
  }>({
    query: `
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
  return data ? (
    <>You have {data.notifications.totalCount} unread notifications</>
  ) : null
}
