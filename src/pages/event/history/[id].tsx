import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { EventLog, EventLogData } from '@/components/pages/event-log'
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
  // const { data, error, loadMore } = useFetch(id)
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
      {/* <Guard data={data} error={error}>
        <>
          <EventLog data={data} />
          <a onClick={loadMore} className="serlo-link cursor-pointer">
            load moaar
          </a>
        </>
      </Guard> */}
    </>
  )
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
  return useGraphqlSwrPaginationWithAuth<{
    events: EventLogData
  }>({
    query: eventDataQuery,
    variables: { id, first: 30 },
    config: {
      refreshInterval: 10 * 60 * 1000, //10min
    },
    getConnection(data) {
      return (data.uuid as { events: object }).events
    },
    noAuth: true,
  })
}

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

const eventDataQuery = gql`
  query getEventData($id: Int!, $first: Int!, $after: String) {
    uuid(id: $id) {
      events(first: $first, after: $after) {
        nodes {
          ...eventData
        }
      }
    }
  }
  ${sharedEventFragments}
`
