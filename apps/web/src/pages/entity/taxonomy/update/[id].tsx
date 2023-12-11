import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'

import { endpoint } from '@/api/endpoint'
import { UuidUrlInput } from '@/components/author/uuid-url-input'
import { PageTitle } from '@/components/content/page-title'
import { FaIcon } from '@/components/fa-icon'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Breadcrumbs } from '@/components/navigation/breadcrumbs'
import { PleaseLogIn } from '@/components/user/please-log-in'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { BreadcrumbsData, UuidType, UuidWithRevType } from '@/data-types'
import { taxonomyParentsToRootToBreadcrumbsData } from '@/fetcher/create-breadcrumbs'
import {
  TaxonomyTermType,
  GetUuidPathsQuery,
  GetUuidPathsQueryVariables,
} from '@/fetcher/graphql-types/operations'
import { sharedTaxonomyParents } from '@/fetcher/query-fragments'
import { getTranslatedType } from '@/helper/get-translated-type'
import { renderedPageNoHooks } from '@/helper/rendered-page'
import { showToastNotice } from '@/helper/show-toast-notice'
import {
  useCreateEntityLinkMutation,
  useDeleteEntityLinkMutation,
} from '@/mutations/taxonomyTerm'

interface UpdateTaxonomyLinksProps {
  id: number
  terms: { id: number; name: string; alias: string; path: BreadcrumbsData }[]
}

export default renderedPageNoHooks<UpdateTaxonomyLinksProps>((props) => {
  return (
    <FrontendClientBase>
      <Content {...props} />
    </FrontendClientBase>
  )
})

function Content({ id, terms }: UpdateTaxonomyLinksProps) {
  const createEntityLink = useCreateEntityLinkMutation()
  const deleteEntityLink = useDeleteEntityLinkMutation()
  const router = useRouter()
  const [removedTaxIds, setRemovedTaxIds] = useState<number[]>([])

  const { strings } = useInstanceData()
  const loggedInData = useLoggedInData()
  if (!loggedInData) return <PleaseLogIn />
  const loggedInStrings = loggedInData.strings.taxonomyTermTools.deleteAdd

  const onDelete = async (taxonomyTermId: number) => {
    if (window.confirm(loggedInStrings.confirmDelete)) {
      const success = await deleteEntityLink({
        entityIds: [id],
        taxonomyTermId,
      })
      if (success) {
        setRemovedTaxIds([...removedTaxIds, taxonomyTermId])
      }
    }
  }

  const onAdd = async (taxonomyTermId: number) => {
    const success = await createEntityLink({ entityIds: [id], taxonomyTermId })
    if (success) showToastNotice(loggedInStrings.addSuccess, 'success')
    setTimeout(() => {
      router.reload()
    }, 600)
  }

  return (
    <>
      {renderBackButton()}
      <PageTitle title={loggedInData.strings.authorMenu.editAssignments} />
      <div className="mx-side border-t-2">
        {terms.map(renderTerm)}
        <h2 className="mb-3 mt-12 font-bold">{loggedInStrings.addNewTitle}</h2>
        {renderInput()}
      </div>
    </>
  )

  function renderTerm(term: UpdateTaxonomyLinksProps['terms'][number]) {
    if (!term.path || removedTaxIds.includes(term.id)) return null

    return (
      <div className="flex border-b-2 py-3" key={term.alias}>
        <button
          onClick={() => onDelete(term.id)}
          className="serlo-button-blue-transparent mr-2 text-brand-400"
        >
          <FaIcon icon={faTrashAlt} />
        </button>
        <div>
          {term.path.slice(0, -1).map((crumb) => (
            <Fragment key={crumb.id}>
              {crumb.label}
              {' > '}
            </Fragment>
          ))}
          <a
            className="font-bold text-brand"
            href={term.alias}
            target="_blank"
            rel="noreferrer"
          >
            {term.name}
          </a>
        </div>
      </div>
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

  function renderInput() {
    const existingIds = terms
      .map((term) => term.id)
      .filter((id) => !removedTaxIds.includes(id))

    return (
      <UuidUrlInput
        supportedEntityTypes={[UuidType.TaxonomyTerm]}
        supportedTaxonomyTypes={[
          TaxonomyTermType.Topic,
          TaxonomyTermType.ExerciseFolder,
        ]}
        unsupportedIds={existingIds}
        renderButtons={renderAddButton}
        inlineFeedback
      />
    )
  }

  function renderAddButton(
    _typename: UuidWithRevType,
    taxId: number,
    _title: string,
    taxType?: TaxonomyTermType
  ) {
    return (
      <>
        ({getTranslatedType(strings, taxType)}){' '}
        <button
          onClick={() => onAdd(taxId)}
          className="'text-base serlo-button-light ml-3"
        >
          {loggedInStrings.addButtonText}
        </button>
      </>
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

  if (!result || !result.uuid || !Object.hasOwn(result.uuid, 'taxonomyTerms'))
    return { notFound: true }

  return {
    props: {
      id,
      terms: result.uuid?.taxonomyTerms.nodes.map((node) => {
        return {
          id: node.id,
          name: node.name,
          alias: node.alias,
          path:
            taxonomyParentsToRootToBreadcrumbsData(node, node.instance) ?? [],
        }
      }),
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
            instance
            ...pathToRoot
          }
        }
      }
    }
  }
  ${sharedTaxonomyParents}
`
