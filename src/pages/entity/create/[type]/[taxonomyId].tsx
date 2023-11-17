import request, { gql } from 'graphql-request'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'

import { LazyLoadExerciseGenerationWrapperOrNull } from '../../../../components/content/exercises/lazy-load-exercise-generation-wrapper-or-null'
import { endpoint } from '@/api/endpoint'
import { FrontendClientBase } from '@/components/frontend-client-base'
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
import { EditorProps } from '@/serlo-editor/core'
import { TemplatePluginType } from '@/serlo-editor-integration/types/template-plugin-type'

enum AllowedPlugins {
  Article = TemplatePluginType.Article,
  Course = TemplatePluginType.Course,
  Video = TemplatePluginType.Video,
  Applet = TemplatePluginType.Applet,
  Event = TemplatePluginType.Event,
  Exercise = TemplatePluginType.TextExercise,
  ExerciseGroup = TemplatePluginType.TextExerciseGroup,
}

interface EntityCreateProps {
  entityType: keyof typeof AllowedPlugins
  taxonomyTerm: Extract<GetTaxonomyTypeQuery['uuid'], { title: any }>
  entityNeedsReview: boolean
  subject: string
}

export default renderedPageNoHooks<EntityCreateProps>((props) => {
  return <Content props={props} />
})

function Content({
  props: { taxonomyTerm, entityType, entityNeedsReview, subject },
}: {
  props: EntityCreateProps
}) {
  const [initialState, setInitialState] = useState<EditorProps['initialState']>(
    {
      plugin: AllowedPlugins[entityType],
    }
  )

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
      loadLoggedInData={!isProduction} // warn: enables preview editor without login
      entityId={taxonomyParentId}
    >
      <div className="relative">
        <MaxWidthDiv>
          <main>
            <Guard needsAuth={isProduction ? true : undefined} data>
              <AddRevision {...addRevisionProps} />
              <LazyLoadExerciseGenerationWrapperOrNull
                subject={subject}
                taxonomyTitle={taxonomyTerm.title}
                setEditorState={setInitialState}
              />
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
      subject: breadcrumbsData?.[0]?.label || 'Unknown subject',
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
        instance
        type
        ...pathToRoot
      }
    }
  }
  ${sharedTaxonomyParents}
`
