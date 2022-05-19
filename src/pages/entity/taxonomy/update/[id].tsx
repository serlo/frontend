import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import {
  GetUuidPathsQuery,
  GetUuidPathsQueryVariables,
} from '@/fetcher/graphql-types/operations'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface UpdateTaxonomyLinksProps {
  id: number
  taxonomyTerms: Extract<
    GetUuidPathsQuery['uuid'],
    { taxonomyTerms: any }
  >['taxonomyTerms']['nodes']
}

export default renderedPageNoHooks<UpdateTaxonomyLinksProps>((props) => {
  return (
    <FrontendClientBase>
      <Content {...props} />
    </FrontendClientBase>
  )
})

function Content({ id, taxonomyTerms }: UpdateTaxonomyLinksProps) {
  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings

  return (
    <>
      {renderBackButton()}
      <PageTitle title={loggedInStrings.authorMenu.editAssignments} />
      <div className="mx-side border-t-2">{taxonomyTerms.map(renderTerm)}</div>
    </>
  )

  function renderTerm(term: UpdateTaxonomyLinksProps['taxonomyTerms'][number]) {
    const nodes = term.navigation?.path.nodes
    if (!nodes) return null

    return (
      <p className="py-3 border-b-2">
        <button className="serlo-button serlo-make-interactive-transparent-blue mr-2">
          <FaIcon icon={faTrashAlt} />
        </button>
        {nodes.slice(0, -1).map((crumb) => (
          <>
            {crumb.label}
            {' > '}
          </>
        ))}
        <a
          className="text-brand font-bold"
          href={term.alias ?? `/${term.id}`}
          target="_blank"
          rel="noreferrer"
        >
          {term.name}
        </a>
      </p>
    )
  }

  function renderBackButton() {
    return (
      <Breadcrumbs
        data={[
          {
            label: strings.revisions.toContent,
            url: `/${id}`,
          },
        ]}
        asBackButton
      />
    )
  }
}

export const getStaticProps: GetStaticProps<UpdateTaxonomyLinksProps> = async (
  context
) => {
  const id = parseInt(context.params?.id as string)
  if (isNaN(id)) return { notFound: true }

  const result = await request<GetUuidPathsQuery, GetUuidPathsQueryVariables>(
    endpoint,
    getUuidPathsQuery,
    { id }
  )

  if (
    !result ||
    !result.uuid ||
    !hasOwnPropertyTs(result.uuid, 'taxonomyTerms')
  )
    return { notFound: true }

  return {
    props: {
      id,
      taxonomyTerms: result.uuid?.taxonomyTerms.nodes,
    },
    revalidate: 60 * 1, // 1 min,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getUuidPathsQuery = gql`
  query getUuidPaths($id: Int!) {
    uuid(id: $id) {
      ... on AbstractTaxonomyTermChild {
        taxonomyTerms {
          nodes {
            name
            alias
            id
            navigation {
              path {
                nodes {
                  label
                }
              }
            }
          }
        }
      }
    }
  }
`
