import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { EventLog } from '@/components/pages/event-log'
import { EventData } from '@/components/user/event'
import { useInstanceData } from '@/contexts/instance-context'
import { sharedEventFragments } from '@/fetcher/query-fragments'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface EventLogPageProps {
  id: number
  alias: string
  title?: string
}

export default renderedPageNoHooks<EventLogPageProps>((props) => (
  <FrontendClientBase entityId={props.id}>
    <Content {...props} />
  </FrontendClientBase>
))

function Content({ id, alias, title }: EventLogPageProps) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore, loading } = useFetch(id)
  const { strings } = useInstanceData()

  return (
    <>
      <Breadcrumbs
        data={[
          {
            label: title ?? strings.revisions.toContent,
            url: alias ?? id ? `/${id}` : undefined,
          },
        ]}
        asBackButton
      />
      <Title />
      <Guard data={data?.nodes} error={error}>
        <>
          <EventLog events={data?.nodes} />
          {loading ? renderSpinner() : renderButton()}
        </>
      </Guard>
    </>
  )
  function renderSpinner() {
    return <LoadingSpinner text={strings.loading.isLoading} />
  }

  function renderButton() {
    if (!data?.pageInfo.hasNextPage) return null
    return (
      <a
        onClick={loadMore}
        className="serlo-button serlo-make-interactive-primary"
      >
        {strings.actions.loadMore}
      </a>
    )
  }
}

export const getStaticProps: GetStaticProps<EventLogPageProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)
  const metaData = isNaN(id) ? undefined : await requestMetaData(id)

  return {
    props: {
      id,
      alias: metaData?.alias ?? '',
      title: metaData?.title,
    },
    revalidate: 60 * 60 * 24, //one day
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.eventLog} headTitle />
}

function useFetch(id: number) {
  return useGraphqlSwrPaginationWithAuth<EventData>({
    query: eventDataQuery,
    variables: { id, first: 1 },
    config: {
      refreshInterval: 10 * 60 * 1000, //10min
    },
    getConnection(data) {
      return (data.uuid as { events: object }).events
    },
    noAuth: true,
  })
}

interface MetaData {
  alias: string
  title?: string
}

export async function requestMetaData(id: number): Promise<MetaData> {
  const { uuid } = await request<{
    uuid: { alias: string; currentRevision?: { title?: string } }
  }>(endpoint, metaDataQuery(id))

  return {
    alias: uuid.alias,
    title: uuid.currentRevision?.title,
  }
}

const eventDataQuery = gql`
  query getEventData($id: Int!, $first: Int!, $after: String) {
    uuid(id: $id) {
      events(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ...eventData
        }
      }
    }
  }
  ${sharedEventFragments}
`

const metaDataQuery = (id: number) => gql`
  query {
    uuid(id: ${id}) {
      id
      alias
      ... on Applet {
        currentRevision {
          title
        }
      }
      ... on Article {
        currentRevision {
          title
        }
      }
      ... on Course {
        currentRevision {
          title
        }
      }
      ... on CoursePage {
        currentRevision {
          title
        }
      }
      ... on Event {
        currentRevision {
          title
        }
      }
      ... on Page {
        currentRevision {
          title
        }
      }
      ... on Video {
        currentRevision {
          title
        }
      }
    }
  }
`
