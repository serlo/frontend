import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { UuidType } from '@/data-types'
import { SerloEntityPluginType } from '@/edtr-io/plugins'
import {
  GetTaxonomyTypeQuery,
  GetTaxonomyTypeQueryVariables,
} from '@/fetcher/graphql-types/operations'
import { sharedPathFragments } from '@/fetcher/query-fragments'
import { testAreaUrlStart } from '@/fetcher/testArea'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'

enum AllowedPlugins {
  Article = SerloEntityPluginType.Article,
  Course = SerloEntityPluginType.Course,
  Video = SerloEntityPluginType.Video,
  Applet = SerloEntityPluginType.Applet,
  Event = SerloEntityPluginType.Event,
  Exercise = SerloEntityPluginType.TextExercise,
  ExerciseGroup = SerloEntityPluginType.TextExerciseGroup,
}

interface EntityCreateProps {
  entityType: keyof typeof AllowedPlugins
  taxonomyTerm: Extract<GetTaxonomyTypeQuery['uuid'], { title: any }>
  entityNeedsReview: boolean
}

export default renderedPageNoHooks<EntityCreateProps>(
  ({ taxonomyTerm, entityType, entityNeedsReview }) => {
    const { id: taxonomyParentId } = taxonomyTerm

    const addRevisionProps = {
      initialState: { plugin: AllowedPlugins[entityType] as unknown as string },
      converted: false,
      type: UuidType[entityType],
      entityNeedsReview,
      taxonomyParentId,
      errorType: 'none',
    } as const

    return (
      <FrontendClientBase
        noContainers
        loadLoggedInData={!isProduction} // warn: enables preview editor without login
        entityId={taxonomyParentId}
      >
        <div className="relative">
          <MaxWidthDiv>
            <main>
              <Guard needsAuth={isProduction ? true : undefined} data>
                <AddRevision {...addRevisionProps} />
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

  const entityType = context.params?.type as keyof typeof AllowedPlugins
  const isValidType =
    entityType && Object.values(AllowedPlugins).includes(entityType)

  if (
    !result ||
    !result.uuid ||
    !Object.hasOwn(result.uuid, 'type') ||
    !isValidType
  )
    return { notFound: true }

  const isTestArea = result.uuid.navigation?.path.nodes.some(
    (node) => node.url === testAreaUrlStart
  )

  return {
    props: {
      entityType,
      taxonomyTerm: { ...result.uuid },
      entityNeedsReview: !isTestArea,
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
