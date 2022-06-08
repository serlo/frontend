import { gql } from 'graphql-request'

import { Guard } from '../guard'
import { EventData } from './event'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Event } from '@/components/user/event'
import { useInstanceData } from '@/contexts/instance-context'
import { Instance } from '@/fetcher/graphql-types/operations'
import { sharedEventFragments } from '@/fetcher/query-fragments'

interface EventsProps {
  userId?: number
  objectId?: number
  perPage?: number
  moreButton?: boolean
  oldest?: boolean
}

export function Events({
  userId,
  objectId,
  perPage,
  moreButton,
  oldest,
}: EventsProps) {
  const { lang, strings } = useInstanceData()

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore, loading } = useEventsFetch(
    userId,
    objectId,
    perPage,
    oldest,
    lang as Instance
  )

  return (
    <Guard data={data?.nodes} error={error}>
      {data?.nodes.length === 0 ? renderEmpty() : renderEntries()}
    </Guard>
  )

  function renderEmpty() {
    return <p className="serlo-p">{strings.profiles.noActivities}</p>
  }

  function renderEntries() {
    return (
      <>
        {data?.nodes.map((event) => {
          return (
            <Event
              key={event.id}
              eventId={event.id}
              event={event}
              unread={false}
              slim
              noPrivateContent
            />
          )
        })}
        {moreButton ? (loading ? renderSpinner() : renderButton()) : null}
      </>
    )
  }

  function renderSpinner() {
    return <LoadingSpinner text={strings.loading.isLoading} />
  }

  function renderButton() {
    if (!data?.pageInfo.hasNextPage) return null
    return (
      <p className="serlo-p mt-12">
        <a
          onClick={loadMore}
          className="serlo-button serlo-make-interactive-primary"
        >
          {strings.actions.loadMore}
        </a>
      </p>
    )
  }
}

function useEventsFetch(
  actorId?: number,
  objectId?: number,
  amount?: number,
  oldest?: boolean,
  instance?: Instance
) {
  return useGraphqlSwrPaginationWithAuth<EventData>({
    query: eventsQuery,
    variables: {
      actorId,
      objectId,
      instance,
      first: oldest ? undefined : amount ?? 20,
      last: oldest ? amount ?? 20 : undefined,
    },
    config: {
      refreshInterval: 10 * 60 * 1000, //10min
    },
    getConnection(data) {
      return data.events
    },
    noAuth: true,
  })
}

const eventsQuery = gql`
  query getEventData(
    $actorId: Int
    $objectId: Int
    $instance: Instance
    $first: Int
    $last: Int
    $after: String
  ) {
    events(
      actorId: $actorId
      objectId: $objectId
      instance: $instance
      first: $first
      last: $last
      after: $after
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...eventData
      }
    }
  }
  ${sharedEventFragments}
`
