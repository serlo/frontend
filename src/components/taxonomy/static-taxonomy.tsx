import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { Fragment, useState } from 'react'
import { RatingProps } from 'react-simple-star-rating'

import { NewFolderPrototypeProps } from './new-folder-prototype'
import { StaticSubTaxonomy } from './static-sub-taxonomy'
import { TopicCategories } from './topic-categories'
import { ExerciseNumbering } from '../content/exercises/exercise-numbering'
import { FaIcon } from '../fa-icon'
import { InfoPanel } from '../info-panel'
import type { DonationsBannerProps } from '@/components/content/donations-banner-experiment/donations-banner'
import { LicenseNotice } from '@/components/content/license/license-notice'
import { UserTools } from '@/components/user-tools/user-tools'
import { useAB } from '@/contexts/ab'
import { useInstanceData } from '@/contexts/instance-context'
import { TaxonomyData, TopicCategoryType, UuidType } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { abSubmission } from '@/helper/ab-submission'
import { editorRenderers } from '@/serlo-editor/plugin/helpers/editor-renderer'
import { StaticRenderer } from '@/serlo-editor/static-renderer/static-renderer'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'
import {
  EditorExerciseDocument,
  EditorRowsDocument,
  EditorSolutionDocument,
} from '@/serlo-editor-integration/types/editor-plugins'

export interface TopicProps {
  data: TaxonomyData
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

export function StaticTaxonomy({ data }: TopicProps) {
  const { strings, lang } = useInstanceData()

  const ab = useAB()

  const [hasFeedback, setHasFeedback] = useState(false)

  const isExerciseFolder = data.taxonomyType === TaxonomyTermType.ExerciseFolder
  const isTopic = data.taxonomyType === TaxonomyTermType.Topic

  const hasExercises = data.exercisesContent.length > 0
  const defaultLicense = hasExercises ? getDefaultLicense() : undefined

  // simplest way to provide renderers to editor that can also easily be adapted by edusharing
  editorRenderers.init(createRenderers({ instance: lang }))

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
      {defaultLicense && <LicenseNotice data={defaultLicense} />}

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
    )
  }

  function renderSubterms() {
    return (
      data.subterms &&
      data.subterms.map((child) => (
        <Fragment key={child.title}>
          <StaticSubTaxonomy data={child} subid={child.id} id={data.id} />
        </Fragment>
      ))
    )
  }

  function renderExercises() {
    if (ab?.experiment === 'dreisatz_new_design') {
      // here is the place for new exercise view

      // no static view for now
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
        {data.exercisesContent.map((inExercise, i) => {
          // for static
          const exerciseArray = inExercise as unknown as
            | [EditorExerciseDocument]
            | [EditorExerciseDocument, EditorSolutionDocument]

          const exerciseUuid = exerciseArray[0].serloContext?.uuid

          return (
            <li key={exerciseArray[0].id ?? exerciseUuid}>
              <ExerciseNumbering href={`/${exerciseUuid}`} index={i} />
              <StaticRenderer document={exerciseArray} />
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
          onClick={(rate) => {
            //submit_event(`rate_quest_${core.ws.quest.id}_${rate}`, core)
            abSubmission({
              entityId: -1,
              experiment: ab.experiment,
              group: ab.group,
              result: rate.toString(),
              topicId: ab.topicId,
              type: 'rating',
            })
            setHasFeedback(true)
          }}
        />
        <div className={clsx('mt-3', hasFeedback ? '' : 'invisible')}>
          Danke für dein Feedback! &#10084;
        </div>
      </div>
    )
  }

  function renderUserTools(setting?: { aboveContent?: boolean }) {
    return (
      <UserTools
        data={{ type: UuidType.TaxonomyTerm, ...data }}
        id={data.id}
        aboveContent={setting?.aboveContent}
      />
    )
  }

  function getDefaultLicense() {
    for (let i = 0; i < data.exercisesContent.length; i++) {
      const content = data.exercisesContent[i]

      if (content.type === 'exercise-group') {
        if (content.license?.isDefault) return content.license
      } else {
        if (content.task?.license?.isDefault) return content.task.license
        if (content.solution?.license?.isDefault)
          return content.solution.license
      }
    }
    //no part of collection has default license so don't show default notice.
    return undefined
  }
}
