import { TemplatePluginType } from '@editor/types/template-plugin-type'
import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'

import { endpoint } from '@/api/endpoint'
import { FrontendClientBase } from '@/components/frontend-client-base/frontend-client-base'
import { Guard } from '@/components/guard'
import { MaxWidthDiv } from '@/components/navigation/max-width-div'
import { AddRevision } from '@/components/pages/add-revision'
import { UuidType } from '@/data-types'
import { taxonomyParentsToRootToBreadcrumbsData } from '@/fetcher/create-breadcrumbs'
import {
  GetTaxonomyTypeQuery,
  GetTaxonomyTypeQueryVariables,
} from '@/fetcher/graphql-types/operations'
import { sharedTaxonomyParents } from '@/fetcher/query-fragments'
import { isProduction } from '@/helper/is-production'
import { renderedPageNoHooks } from '@/helper/rendered-page'

enum AllowedPlugins {
  Article = TemplatePluginType.Article,
  Course = TemplatePluginType.Course,
  Video = TemplatePluginType.Video,
  Applet = TemplatePluginType.Applet,
  Event = TemplatePluginType.Event,
  Exercise = TemplatePluginType.TextExercise,
  ExerciseGroup = TemplatePluginType.TextExerciseGroup,
}

export type AllowedPluginType = keyof typeof AllowedPlugins

interface EntityCreateProps {
  entityType: AllowedPluginType
  taxonomyTerm: Extract<GetTaxonomyTypeQuery['uuid'], { title: any }>
  entityNeedsReview: boolean
}

export default renderedPageNoHooks<EntityCreateProps>((props) => {
  return <Content props={props} />
})

function Content({
  props: { taxonomyTerm, entityType, entityNeedsReview },
}: {
  props: EntityCreateProps
}) {
  const initialState = {
    plugin: AllowedPlugins[entityType],
  }

  const { id: taxonomyParentId } = taxonomyTerm

  const addRevisionProps = {
    initialState,
    type: UuidType[entityType],
    entityNeedsReview,
    taxonomyParentId,
    errorType: 'none',
  } as const

  return (
    <FrontendClientBase
      noContainers
      noIndex
      loadLoggedInData={!isProduction} // warn: enables preview editor without login
      serloEntityData={{ entityId: taxonomyParentId }}
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

export const getStaticProps: GetStaticProps<EntityCreateProps> = async (
  context
) => {
  const taxonomyId = parseInt(context.params?.taxonomyId as string)
  if (isNaN(taxonomyId)) return { notFound: true }

  const result = await request<
    GetTaxonomyTypeQuery,
    GetTaxonomyTypeQueryVariables
  >(endpoint, getTaxonomyTypeQuery, { id: taxonomyId })

  const entityType = context.params?.type
  const isValidType =
    entityType &&
    Object.values(AllowedPlugins).includes(entityType as AllowedPlugins)

  if (
    !result ||
    !result.uuid ||
    !Object.hasOwn(result.uuid, 'type') ||
    !isValidType
  )
    return { notFound: true }

  const breadcrumbsData = taxonomyParentsToRootToBreadcrumbsData(
    result.uuid,
    result.uuid.instance
  )

  const isTestArea =
    breadcrumbsData && breadcrumbsData.some((entry) => entry.id === 106082)

  return {
    props: {
      entityType: entityType as keyof typeof AllowedPlugins,
      taxonomyTerm: { ...result.uuid },
      entityNeedsReview: !isTestArea,
    },
    revalidate: 60 * 30, // 30 min
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
        instance
        type
        ...pathToRoot
      }
    }
  }
  ${sharedTaxonomyParents}
`
