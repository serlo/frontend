import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { EditorRowsDocument } from '@editor/types/editor-plugins'
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import { Fragment, useState } from 'react'
import { RatingProps } from 'react-simple-star-rating'

import { NewFolderPrototypeProps } from './new-folder-prototype'
import { SubTopic } from './sub-topic'
import { TopicCategories } from './topic-categories'
import { ExerciseNumbering } from '../content/exercises/exercise-numbering'
import { ExamsInfoBox } from '../exams-info-box'
import { FaIcon } from '../fa-icon'
import { InfoPanel } from '../info-panel'
import type { DonationsBannerProps } from '@/components/content/donations-banner-experiment/donations-banner'
import { LicenseNotice } from '@/components/content/license/license-notice'
import { UserTools } from '@/components/user-tools/user-tools'
import { useAB } from '@/contexts/ab'
import { useInstanceData } from '@/contexts/instance-context'
import { mathExamsTaxonomies } from '@/data/de/math-exams-taxonomies'
import {
  BreadcrumbsData,
  TaxonomyData,
  TopicCategoryType,
  UuidType,
} from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { cn } from '@/helper/cn'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

export interface TopicProps {
  data: TaxonomyData
  breadcrumbs?: BreadcrumbsData
}

const DonationsBanner = dynamic<DonationsBannerProps>(() =>
  import(
    '@/components/content/donations-banner-experiment/donations-banner'
  ).then((mod) => mod.DonationsBanner)
)

const Rating = dynamic<RatingProps>(() =>
  import('react-simple-star-rating').then((mod) => mod.Rating)
)

const NewFolderPrototype = dynamic<NewFolderPrototypeProps>(() =>
  import('./new-folder-prototype').then((mod) => mod.NewFolderPrototype)
)

export function Topic({ data, breadcrumbs }: TopicProps) {
  const { strings } = useInstanceData()
  const ab = useAB()

  const [hasFeedback, setHasFeedback] = useState(false)

  const isExerciseFolder = data.taxonomyType === TaxonomyTermType.ExerciseFolder
  const isTopic = data.taxonomyType === TaxonomyTermType.Topic

  // identify final exam taxonomies or their children
  const examsFolderId = breadcrumbs
    ? [...breadcrumbs, data]?.find(
        ({ id }) => id && mathExamsTaxonomies.includes(id)
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
          <StaticRenderer
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
    if (ab?.experiment === 'dreisatz_new_design') {
      // here is the place for new exercise view
      return (
        <>
          <NewFolderPrototype data={data} />
          <div className="h-24"></div>
        </>
      )
    }

    if (!hasExercises || !data.exercisesContent) return null
    return (
      <ol className="mt-12">
        {data.exercisesContent.map((exerciseOrGroup, i) => {
          const exerciseUuid = exerciseOrGroup.serloContext?.uuid

          return (
            <li key={exerciseOrGroup.id ?? exerciseUuid} className="pb-10">
              <ExerciseNumbering href={`/${exerciseUuid}`} index={i} />
              <StaticRenderer document={exerciseOrGroup} />
              {i === 1 && renderSurvey()}
            </li>
          )
        })}
      </ol>
    )
  }

  function renderSurvey() {
    if (!ab) return
    if (ab.topicId !== data.id) return
    return (
      <div className=" mx-auto my-12  max-w-[420px] rounded-xl bg-brand-50 p-4 text-center ">
        <strong>Wie gut gefällt dir dieser Aufgabenordner?</strong>
        <Rating
          className="mt-4 [&_svg]:inline"
          readonly={hasFeedback}
          onClick={() => {
            setHasFeedback(true)
          }}
        />
        <div className={cn('mt-3', hasFeedback ? '' : 'invisible')}>
          Danke für dein Feedback! &#10084;
        </div>
      </div>
    )
  }

  function renderUserTools(setting?: { aboveContent?: boolean }) {
    return (
      <UserTools
        data={{ type: UuidType.TaxonomyTerm, ...data }}
        aboveContent={setting?.aboveContent}
      />
    )
  }
}
