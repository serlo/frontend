import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { EditorPluginType } from '@editor/types/editor-plugin-type'
import { EditorRowsDocument } from '@editor/types/editor-plugins'
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import { Fragment } from 'react'

import { SubTopic } from './sub-topic'
import { TopicCategories } from './topic-categories'
import { ExerciseNumbering } from '../content/exercises/exercise-numbering'
import { ExamsInfoBox } from '../exams-info-box'
import { FaIcon } from '../fa-icon'
import { InfoPanel } from '../info-panel'
import type { DonationsBannerProps } from '@/components/content/donations-banner-experiment/donations-banner'
import { LicenseNotice } from '@/components/content/license/license-notice'
import { UserTools } from '@/components/user-tools/user-tools'
import { ExerciseContext } from '@/contexts/exercise-context'
import { useInstanceData } from '@/contexts/instance-context'
import { UuidsProvider } from '@/contexts/uuids-context'
import { allMathExamTaxIds } from '@/data/de/math-exams-data'
import {
  BreadcrumbsData,
  TaxonomyData,
  TopicCategoryType,
  UuidType,
} from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'
import { EditorRenderer } from '@/serlo-editor-integration/editor-renderer'

export interface TopicProps {
  data: TaxonomyData
  breadcrumbs?: BreadcrumbsData
}

const DonationsBanner = dynamic<DonationsBannerProps>(() =>
  import(
    '@/components/content/donations-banner-experiment/donations-banner'
  ).then((mod) => mod.DonationsBanner)
)

export function Topic({ data, breadcrumbs }: TopicProps) {
  const { strings } = useInstanceData()

  const isExerciseFolder = data.taxonomyType === TaxonomyTermType.ExerciseFolder
  const isTopic = data.taxonomyType === TaxonomyTermType.Topic

  // identify final exam taxonomies or their children
  const examsFolderId = breadcrumbs
    ? [...breadcrumbs, data]?.find(
        ({ id }) => id && allMathExamTaxIds.includes(id)
      )?.id
    : undefined

  const hasExercises = data.exercisesContent.length > 0

  editorRenderers.init(createRenderers())

  return (
    <>
      {data.trashed && renderTrashedNotice()}
      {renderHeader()}
      {renderUserTools({ aboveContent: true })}
      <div className="min-h-1/2">
        <div className="mt-6 sm:mb-5">
          <EditorRenderer
            document={data.description as unknown as EditorRowsDocument}
          />
        </div>

        {renderSubterms()}

        {renderExercises()}

        {isTopic && <TopicCategories data={data} full />}

        {isExerciseFolder && data.events && (
          <TopicCategories
            data={data}
            categories={[TopicCategoryType.events]}
            full
          />
        )}
      </div>
      {/* Default license notice */}
      <LicenseNotice />

      {/* Temporary donations banner trial */}
      {isExerciseFolder ? (
        <DonationsBanner
          id={data.id}
          entityData={{
            ...data,
            typename: UuidType.TaxonomyTerm,
            isUnrevised: false,
          }}
        />
      ) : null}

      {renderUserTools()}
    </>
  )

  function renderTrashedNotice() {
    return (
      <InfoPanel icon={faTrash} doNotIndex>
        {strings.content.trashedNotice}
      </InfoPanel>
    )
  }

  function renderHeader() {
    return (
      <>
        <h1 className="serlo-h1 mb-10 mt-8" itemProp="name">
          {data.title}
          {isExerciseFolder && (
            <span title={strings.entities.exerciseFolder}>
              {' '}
              <FaIcon
                icon={faFile}
                className="align-baseline text-[1.43rem] text-brand-400"
              />{' '}
            </span>
          )}
        </h1>
        {examsFolderId ? <ExamsInfoBox examsFolderId={examsFolderId} /> : null}
      </>
    )
  }

  function renderSubterms() {
    return (
      data.subterms &&
      data.subterms.map((child) => (
        <Fragment key={child.title}>
          <SubTopic data={child} subid={child.id} id={data.id} />
        </Fragment>
      ))
    )
  }

  function renderExercises() {
    if (!hasExercises || !data.exercisesContent) return null
    return (
      <ol className="mt-12">
        {data.exercisesContent.map((exerciseOrGroup, i) => {
          const entityId = exerciseOrGroup.serloContext?.uuid

          return (
            <li key={exerciseOrGroup.id ?? entityId} className="pb-10">
              <UuidsProvider value={{ entityId }}>
                <ExerciseContext.Provider
                  value={{
                    isEntity:
                      // Exercises have an entityId, exercises in ExerciseGroups don't have an entityId
                      exerciseOrGroup.plugin === EditorPluginType.Exercise,
                  }}
                >
                  <ExerciseNumbering href={`/${entityId}`} index={i} />
                  <EditorRenderer document={exerciseOrGroup} />
                </ExerciseContext.Provider>
              </UuidsProvider>
            </li>
          )
        })}
      </ol>
    )
  }

  function renderUserTools(setting?: { aboveContent?: boolean }) {
    return (
      <UserTools
        data={{ typename: UuidType.TaxonomyTerm, ...data }}
        aboveContent={setting?.aboveContent}
      />
    )
  }
}
