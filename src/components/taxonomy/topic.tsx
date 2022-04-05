import { faFile } from '@fortawesome/free-solid-svg-icons/faFile'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import dynamic from 'next/dynamic'
import { useState, Fragment } from 'react'

import { FaIcon } from '../fa-icon'
import { StaticInfoPanel } from '../static-info-panel'
import { SubTopic } from './sub-topic'
import { TopicCategories } from './topic-categories'
import { LicenseNotice } from '@/components/content/license-notice'
import { ShareModalProps } from '@/components/user-tools/share-modal'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { TaxonomyData } from '@/data-types'
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

        {isFolder && data.events && (
          <TopicCategories data={data} categories={['events']} full />
        )}
      </div>

      {defaultLicense && (
        <LicenseNotice data={defaultLicense} path={['license']} />
      )}

      {renderUserTools()}
      <ShareModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        showPdf={!!data.exercisesContent}
      />
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
      <h1 className="serlo-h1 mt-8 mb-10">
        {data.title}
        {isFolder && (
          <span title={strings.entities.topicFolder}>
            {' '}
            <FaIcon
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
