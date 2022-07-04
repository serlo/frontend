import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { UuidType } from '@/data-types'
import { SerloEntityPluginType } from '@/edtr-io/plugins'
import { sandboxUrl } from '@/fetcher/fetch-editor-data'
import {
  GetTaxonomyTypeQuery,
  GetTaxonomyTypeQueryVariables,
} from '@/fetcher/graphql-types/operations'
import { sharedPathFragments } from '@/fetcher/query-fragments'
import { hasOwnPropertyTs } from '@/helper/has-own-property-ts'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'

enum AllowedTypes {
  Article = SerloEntityPluginType.Article,
  Course = SerloEntityPluginType.Course,
  Video = SerloEntityPluginType.Video,
  Applet = SerloEntityPluginType.Applet,
  Event = SerloEntityPluginType.Event,
  Exercise = SerloEntityPluginType.TextExercise,
  ExerciseGroup = SerloEntityPluginType.TextExerciseGroup,
}

interface EntityCreateProps {
  entityType: keyof typeof AllowedTypes
  taxonomyTerm: Extract<GetTaxonomyTypeQuery['uuid'], { title: any }>
  needsReview: boolean
}

export default renderedPageNoHooks<EntityCreateProps>(
  ({ taxonomyTerm, entityType, needsReview }) => {
    const { id: parentId } = taxonomyTerm

    const addRevisionProps = {
      initialState: {
        plugin: AllowedTypes[entityType] as unknown as string,
      },
      converted: false,
      type: UuidType[entityType],
      needsReview,
      parentId,
      errorType: 'none',
    } as const

    return (
      <FrontendClientBase
        noContainers
        loadLoggedInData={!isProduction} // warn: enables preview editor without login
        entityId={parentId}
      >
        <div className="relative">
          <MaxWidthDiv>
            <main>
              <Guard needsAuth={isProduction ? true : undefined} data>
                <>
                  <AddRevision {...addRevisionProps} />
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

  const entityType = context.params?.type as keyof typeof AllowedTypes
  const isValidType =
    entityType && Object.values(AllowedTypes).includes(entityType)

  if (
    !result ||
    !result.uuid ||
    !hasOwnPropertyTs(result.uuid, 'type') ||
    !isValidType
  )
    return { notFound: true }

  const isSandbox = result.uuid.navigation?.path.nodes.some(
    (node) => node.url === sandboxUrl
  )

  return {
    props: {
      entityType,
      taxonomyTerm: { ...result.uuid },
      needsReview: !isSandbox,
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
        navigation {
          ...path
        }
      }
    }
  }
  ${sharedPathFragments}
`
