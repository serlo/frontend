import { AliasInput, Instance } from '@serlo/api'
import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { LoadingSpinner } from '@/components/loading/loading-spinner'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { ErrorPage } from '@/components/pages/error-page'
import { EventLog } from '@/components/pages/event-log'
import { EventData } from '@/components/user/event'
import { useInstanceData } from '@/contexts/instance-context'
import { ErrorPage as ErrorPageType } from '@/data-types'
import { sharedEventFragments } from '@/fetcher/query-fragments'
import { parseLanguageSubfolder } from '@/helper/feature-i18n'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface EventPage {
  kind: 'event-log'
  metaData: {
    id: number
    alias: string
    aliasInput: AliasInput
    title?: string
  }
}

export default renderedPageNoHooks<EventPage | ErrorPageType>((props) => {
  if (props.kind === 'event-log') {
    return (
      <FrontendClientBase entityId={props.metaData.id}>
        <Content {...props} />
      </FrontendClientBase>
    )
  }

  return (
    <FrontendClientBase>
      <ErrorPage
        code={props.kind === 'error' ? props.errorData.code : 400}
        message={
          props.kind === 'error' ? props.errorData.message : 'unsupported type'
        }
      />
    </FrontendClientBase>
  )
})

function Content({ metaData }: EventPage) {
  const { id, alias, aliasInput, title } = metaData
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore, loading } = useFetch(aliasInput)
  const { strings } = useInstanceData()

  return (
    <>
      <Breadcrumbs
        data={[
          {
            label: title && title !== '' ? title : strings.revisions.toContent,
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

export const getStaticProps: GetStaticProps<EventPage | ErrorPageType> = async (
  context
) => {
  // TODO: use fetch logic from default slug instead
  // it's more data, but it's most likely cached already

  const raw_alias = (context.params?.slug as string[]).join('/')
  const { alias, instance } = parseLanguageSubfolder(
    `/${context.locale!}/${raw_alias}`
  )
  const aliasInput = { path: alias, instance: instance as Instance }

  const data = await requestMetaData(aliasInput)

  if ('kind' in data)
    return {
      props: data,
    }

  return {
    props: {
      kind: 'event-log',
      metaData: {
        id: data.id,
        alias: data.alias ?? '',
        aliasInput,
        title: data.title ?? '',
      },
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

function useFetch(aliasInput: AliasInput) {
  return useGraphqlSwrPaginationWithAuth<EventData>({
    query: eventDataQuery,
    variables: { alias: aliasInput, first: 10 },
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
  id: number
  alias: string
  title?: string
}

export async function requestMetaData(
  aliasInput: AliasInput
): Promise<MetaData | ErrorPageType> {
  try {
    const { uuid } = await request<{
      uuid: {
        id: number
        alias: string
        currentRevision?: { title?: string }
        username?: string
      }
    }>(endpoint, metaDataQuery, {
      alias: aliasInput,
    })

    return {
      id: uuid.id,
      alias: uuid.alias,
      title: uuid.currentRevision?.title ?? uuid.username,
    }
  } catch (e) {
    const message = `Error while fetching data: ${(e as Error).message ?? e}`
    const code = message.includes('Code: 503') ? 503 : 500
    return { kind: 'error', errorData: { code, message } }
  }
}

const eventDataQuery = gql`
  query getEventData($alias: AliasInput!, $first: Int!, $after: String) {
    uuid(alias: $alias) {
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

const metaDataQuery = gql`
  query uuidMetaData($alias: AliasInput) {
    uuid(alias: $alias) {
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
      ... on User {
        username
      }
    }
  }
`
