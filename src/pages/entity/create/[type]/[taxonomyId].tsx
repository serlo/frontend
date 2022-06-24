import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { UuidType } from '@/data-types'
import { editorResponseToState } from '@/edtr-io/editor-response-to-state'
import {
  GetTaxonomyTypeQuery,
  GetTaxonomyTypeQueryVariables,
} from '@/fetcher/graphql-types/operations'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'

interface EntityCreateProps {
  entityType: UuidType
  taxonomyTerm: Extract<GetTaxonomyTypeQuery['uuid'], { title: any }>
}

const state = {
  initialState: {
    plugin: 'type-article',
    state: {
      id: 0,
      license: {
        id: 1,
        url: '',
        title: '',
        shortTitle: '',
        default: true,
        agreement: '',
      },
      revision: 248026,
      changes: '',
      title: 'leer',
      content:
        '{"plugin":"article","state":{"introduction":{"plugin":"articleIntroduction","state":{"explanation":{"plugin":"text","state":[{"type":"p","children":[{"text":""}]},{"type":"p","children":[{"text":""}]}]},"multimedia":{"plugin":"image","state":{"src":"","caption":{"plugin":"text","state":[{"type":"p","children":[{}]}]}}},"illustrating":true,"width":50}},"content":{"plugin":"rows","state":[{"plugin":"text","state":[{"type":"p","children":[{}]}]}]},"exercises":[],"exerciseFolder":{"id":"","title":""},"relatedContent":{"articles":[],"courses":[],"videos":[]},"sources":[]}}',
      meta_title: '',
      meta_description: '',
    },
  },
  converted: false,
}

export default renderedPageNoHooks<EntityCreateProps>(
  ({ entityType, taxonomyTerm }) => {
    const { id, title, alias } = taxonomyTerm

    const myProps = {
      ...state,
      type: UuidType.Article,
      needsReview: false,
      parentId: 1,
      errorType: 'none',
    }

    return (
      <FrontendClientBase
        noContainers
        loadLoggedInData={
          !isProduction
        } /* warn: enables preview editor without login */
        entityId={id}
      >
        <div className="relative">
          <MaxWidthDiv>
            <main>
              <Guard needsAuth={isProduction ? true : undefined} data>
                <>
                  <AddRevision {...myProps} />
                </>
              </Guard>
            </main>
          </MaxWidthDiv>{' '}
        </div>
      </FrontendClientBase>
    )
  }
)

export const getStaticProps: GetStaticProps<EntityCreateProps> = async (
  context
) => {
  const taxonomyId = parseInt(context.params?.taxonomyId as string)
  if (isNaN(taxonomyId)) return { notFound: true }

  const result = await request<
    GetTaxonomyTypeQuery,
    GetTaxonomyTypeQueryVariables
  >(endpoint, getTaxonomyTypeQuery, { id: taxonomyId })

  const entityType = context.params?.type as UuidType
  const isValidType = entityType && Object.values(UuidType).includes(entityType)

  if (
    !result ||
    !result.uuid ||
    !hasOwnPropertyTs(result.uuid, 'type') ||
    !isValidType
  )
    return { notFound: true }

  return {
    props: {
      entityType,
      taxonomyTerm: { ...result.uuid },
    },
    revalidate: 60 * 30, // 0.5 hours,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getTaxonomyTypeQuery = gql`
  query getTaxonomyType($id: Int!) {
    uuid(id: $id) {
      ... on TaxonomyTerm {
        id
        alias
        title
        type
      }
    }
  }
`
