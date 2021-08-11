import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import React, { useState, Fragment } from 'react'
import styled from 'styled-components'

import { SubTopic } from './sub-topic'
import { TopicCategory } from './topic-category'
import { LicenseNotice } from '@/components/content/license-notice'
import { ShareModalProps } from '@/components/user-tools/share-modal'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { TaxonomyData } from '@/data-types'
import { makeMargin } from '@/helper/css'
import { renderArticle } from '@/schema/article-renderer'

export interface TopicProps {
  data: TaxonomyData
}

const ShareModal = dynamic<ShareModalProps>(() =>
  import('@/components/user-tools/share-modal').then((mod) => mod.ShareModal)
)

export function Topic({ data }: TopicProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const { strings } = useInstanceData()

  const isFolder =
    data.taxonomyType === 'topicFolder' ||
    data.taxonomyType === 'curriculumTopicFolder'

  const isTopic =
    data.taxonomyType === 'topic' || data.taxonomyType === 'curriculumTopic'

  const hasExercises = data.exercisesContent.length > 0
  const defaultLicense = hasExercises ? getDefaultLicense() : undefined

  return (
    <>
      {renderHeader()}
      {renderUserTools({ aboveContent: true })}
      <div className="min-h-1/2">
        <div className="mt-6 sm:mb-5">
          {data.description &&
            renderArticle(data.description, `taxdesc${data.id}`)}
        </div>

        {renderSubterms()}

        {renderExercises()}

        {isTopic && (
          <LinkList>
            <TopicCategory full category="articles" links={data.articles} />
            <TopicCategory full category="exercises" links={data.exercises} />
            <TopicCategory full category="videos" links={data.videos} />
            <TopicCategory full category="applets" links={data.applets} />
            <TopicCategory full category="courses" links={data.courses} />
            <TopicCategory full category="events" links={data.events} />
          </LinkList>
        )}
        {isFolder && data.events && (
          <LinkList>
            <TopicCategory full category="events" links={data.events} />
          </LinkList>
        )}
      </div>

      {defaultLicense && (
        <LicenseNotice data={defaultLicense} path={['license']} />
      )}

      {renderUserTools()}
      <ShareModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        contentId={data.id}
      />
    </>
  )

  function renderHeader() {
    return (
      <h1 className="serlo-h1 mt-8 mb-10">
        {data.title}
        {isFolder && (
          <span title={strings.entities.topicFolder}>
            {' '}
            <FontAwesomeIcon
              icon={faFile}
              className="text-[1.43rem] align-baseline text-brand-lighter"
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
          </Fragment>
        )
      })
    )
  }

  function renderUserTools(setting?: { aboveContent?: boolean }) {
    return (
      <UserTools
        onShare={() => setModalOpen(true)}
        hideEdit
        data={{
          type: 'Taxonomy',
          id: data.id,
          taxonomyFolder: isFolder,
          taxonomyTopic: isTopic,
        }}
        id={data.id}
        aboveContent={setting?.aboveContent}
      />
    )
  }

  function getDefaultLicense() {
    for (let i = 0; i < data.exercisesContent.length; i++) {
      const content = data.exercisesContent[i]

      if (content.type === 'exercise-group') {
        if (content.license?.default) return content.license
      } else {
        if (content.task?.license?.default) return content.task.license
        if (content.solution?.license?.default) return content.solution.license
      }
    }
    //no part of collection has default license so don't show default notice.
    return undefined
  }
}

const LinkList = styled.div`
  display: flex;
  flex: 1 1 55%;
  flex-direction: column;
  ${makeMargin}
  margin-top: 6px;
`
