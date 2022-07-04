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
}

export default renderedPageNoHooks<EntityCreateProps>(
  ({ taxonomyTerm, entityType }) => {
    const { id } = taxonomyTerm
    const myProps = {
      initialState: {
        plugin: AllowedTypes[entityType] as unknown as string,
      },
      converted: false,
      type: UuidType[entityType],
      needsReview: false,
      parentId: id,
      errorType: 'none',
    } as const

    return (
      <FrontendClientBase
        noContainers
        loadLoggedInData={!isProduction} // warn: enables preview editor without login
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
