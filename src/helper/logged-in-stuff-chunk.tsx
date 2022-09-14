import { createAuthAwareGraphqlFetch } from '@/api/graphql-fetch'
import { UnreadNotificationsCount } from '@/components/user-tools/unread-notifications-count'

export const Components = {
  UnreadNotificationsCount,
  // AuthorToolsHoverMenu,
  // ExerciseAuthorTools,
  createAuthAwareGraphqlFetch,
}

export type LoggedInStuff = typeof Components
