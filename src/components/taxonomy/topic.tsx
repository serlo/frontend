import { faFile, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { Fragment, useState } from 'react'
import { RatingProps } from 'react-simple-star-rating'

import { SubTopic } from './sub-topic'
import { TopicCategories } from './topic-categories'
import { FaIcon } from '../fa-icon'
import { StaticInfoPanel } from '../static-info-panel'
import type { DonationsBannerProps } from '@/components/content/donations-banner-experiment/donations-banner'
import { LicenseNotice } from '@/components/content/license/license-notice'
import { UserTools } from '@/components/user-tools/user-tools'
import { useAB } from '@/contexts/ab'
import { useInstanceData } from '@/contexts/instance-context'
import { TaxonomyData, TopicCategoryType, UuidType } from '@/data-types'
import { TaxonomyTermType } from '@/fetcher/graphql-types/operations'
import { abSubmission } from '@/helper/ab-submission'
import { tw } from '@/helper/tw'
import { renderArticle } from '@/schema/article-renderer'

export interface TopicProps {
  data: TaxonomyData
}

const hardcodedDataforDreisatz = [
  { title: 'Aufgabe 1', difficulty: 1, img: '' },
  { title: 'Aufgabe 2', difficulty: 1, img: '' },
  { title: 'Aufgabe 3', difficulty: 2, img: '' },
  { title: 'Aufgabe 4', difficulty: 3, img: '' },
  { title: 'Aufgabe 5', difficulty: 4, img: '' },
]

const DonationsBanner = dynamic<DonationsBannerProps>(() =>
  import(
    '@/components/content/donations-banner-experiment/donations-banner'
  ).then((mod) => mod.DonationsBanner)
)

const Rating = dynamic<RatingProps>(() =>
  import('react-simple-star-rating').then((mod) => mod.Rating)
)

export function Topic({ data }: TopicProps) {
  const { strings } = useInstanceData()

  const ab = useAB()

  const [hasFeedback, setHasFeedback] = useState(false)
  const [showInModal, setShowInModal] = useState(-1)

  const isExerciseFolder = data.taxonomyType === TaxonomyTermType.ExerciseFolder
  const isTopic = data.taxonomyType === TaxonomyTermType.Topic

  const hasExercises = data.exercisesContent.length > 0
  const defaultLicense = hasExercises ? getDefaultLicense() : undefined

  return (
    <>
      {data.trashed && renderTrashedNotice()}
      {renderHeader()}
      {renderUserTools({ aboveContent: true })}
      <div className="min-h-1/2">
        <div className="mt-6 sm:mb-5">
          {data.description &&
            renderArticle(data.description, `taxdesc${data.id}`)}
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
      <StaticInfoPanel icon={faTrash} doNotIndex>
        {strings.content.trashedNotice}
      </StaticInfoPanel>
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
          <SubTopic data={child} subid={child.id} id={data.id} />
        </Fragment>
      ))
    )
  }

  function renderExercises() {
    if (ab?.experiment === 'dreisatzv0') {
      // here is the place for new exercise view
      if (showInModal >= 0) {
        const element = data.exercisesContent[showInModal]
        element.positionOnPage = undefined
        return (
          <>
            <div className="fixed inset-0 z-[150] bg-gray-100"></div>
            <div
              className="fixed inset-0 z-[200] flex items-center justify-center"
              onClick={() => {
                setShowInModal(-1)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setShowInModal(-1)
                }
              }}
              tabIndex={-1}
            >
              <button
                onClick={() => {
                  setShowInModal(-1)
                }}
                className={tw`
              absolute right-4 top-4 z-[300] h-10 w-10 rounded-full bg-blue-200 text-xl
              hover:bg-blue-300
            `}
              >
                <FaIcon icon={faTimes} />
              </button>
              <div
                className={tw`
              relative z-[200] mx-8 my-8 flex flex
              max-h-[calc(100%-48px)] min-h-[400px]
              w-[900px] max-w-full flex-col overflow-y-auto rounded-xl bg-white px-6 py-8
            `}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                {renderArticle(
                  [element],
                  `tax${data.id}`,
                  `ex${element.context.id}`
                )}
              </div>
            </div>
            <style jsx global>{`
              body {
                position: fixed;
              }
            `}</style>
          </>
        )
      }
      return (
        <div className="mx-side flex flex-wrap">
          {data.exercisesContent.map((exercise, i) => {
            const entry = hardcodedDataforDreisatz[i]
            return (
              <Fragment key={i}>
                <div
                  className="mb-5 mr-4 h-52 w-[176px] cursor-pointer rounded border hover:border-brand"
                  onClick={() => {
                    setShowInModal(i)
                  }}
                >
                  <div className="h-16 w-full bg-brand-100 pt-2 text-center text-gray-600">
                    image
                  </div>
                  <div className="mx-2 mt-3 font-bold">{entry.title}</div>
                </div>
              </Fragment>
            )
          })}
        </div>
      )
    }
    return (
      hasExercises &&
      data.exercisesContent &&
      data.exercisesContent.map((exercise, i) => {
        return (
          <Fragment key={i}>
            {renderArticle(
              [exercise],
              `tax${data.id}`,
              `ex${exercise.context.id}`
            )}
            {i === 1 && renderSurvey()}
          </Fragment>
        )
      })
    )
  }

  function renderSurvey() {
    if (!ab) return
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
