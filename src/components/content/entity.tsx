import {
  faExclamationCircle,
  faTools,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import { useState, MouseEvent } from 'react'

import { StaticInfoPanel } from '../static-info-panel'
import { HSpace } from './h-space'
import { Link } from './link'
import { LicenseNotice } from '@/components/content/license-notice'
import { CourseFooter } from '@/components/navigation/course-footer'
import { CourseNavigation } from '@/components/navigation/course-navigation'
import { ShareModalProps } from '@/components/user-tools/share-modal'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, FrontendContentNode } from '@/data-types'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { renderArticle } from '@/schema/article-renderer'

export interface EntityProps {
  data: EntityData
}

const ShareModal = dynamic<ShareModalProps>(() =>
  import('@/components/user-tools/share-modal').then((mod) => mod.ShareModal)
)

export function Entity({ data }: EntityProps) {
  // state@/components/comments/comment-area
  const [open, setOpen] = useState(false)

  // course
  const [courseNavOpen, setCourseNavOpen] = useState(false)
  const openCourseNav = (e?: MouseEvent) => {
    e?.preventDefault()
    setCourseNavOpen(!courseNavOpen)
  }

  Router.events.on('routeChangeComplete', () => {
    setCourseNavOpen(false)
  })

  const { strings } = useInstanceData()
  return wrapWithSchema(
    <>
      {renderCourseNavigation()}
      {renderNoCoursePages()}
      {renderNotices()}
      {renderStyledH1()}
      {renderUserTools({ aboveContent: true })}
      <div className="min-h-1/4">
        {data.content && renderContent(data.content)}
      </div>
      {renderCourseFooter()}
      <HSpace amount={20} />
      {renderUserTools()}
      {renderShareModal()}
      {data.licenseData && (
        <LicenseNotice data={data.licenseData} path={['license']} />
      )}
    </>
  )

  function renderStyledH1() {
    if (!data.title) return null
    return (
      <h1 className="serlo-h1 mt-12" itemProp="name">
        {renderCoursePageNumber()}
        {data.title}
        {renderEntityIcon()}
      </h1>
    )
  }

  function renderCoursePageNumber() {
    console.log(data)
    return '123'
  }

  function renderEntityIcon() {
    if (!data.categoryIcon || data.categoryIcon === 'coursePage') return null
    return (
      <span title={strings.entities[data.categoryIcon]}>
        {' '}
        <FontAwesomeIcon
          icon={getIconByTypename(data.categoryIcon)}
          className="text-brand-lighter text-2.5xl"
        />{' '}
      </span>
    )
  }

  function wrapWithSchema(comp: JSX.Element) {
    if (data.schemaData) {
      if (data.schemaData.wrapWithItemType) {
        if (data.schemaData.useArticleTag) {
          return (
            <article itemScope itemType={data.schemaData.wrapWithItemType}>
              {comp}
            </article>
          )
        } else {
          return (
            <div itemScope itemType={data.schemaData.wrapWithItemType}>
              {comp}
            </div>
          )
        }
      }
    }
    return comp
  }

  function renderContent(value: FrontendContentNode[]) {
    const content = renderArticle(value, `entity${data.id}`)
    if (data.schemaData?.setContentAsSection) {
      return <section itemProp="articleBody">{content}</section>
    }
    return content
  }

  function renderUserTools(setting?: { aboveContent?: boolean }) {
    return (
      <UserTools
        onShare={() => setOpen(true)}
        aboveContent={setting?.aboveContent}
        id={data.id}
        hideEdit={!data.inviteToEdit}
        unrevisedRevisions={data.unrevisedRevisions}
        data={{
          type: data.typename,
          id: data.id,
          revisionId: data.revisionId,
          courseId: data.courseData?.id,
          trashed: data.trashed,
          unrevisedRevisions: data.unrevisedRevisions,
          unrevisedCourseRevisions: data.unrevisedCourseRevisions,
        }}
      />
    )
  }

  function renderShareModal() {
    const showPdf = [
      'Page',
      'Article',
      'CoursePage',
      'ExerciseGroup',
      'Exercise',
      'Solution',
    ].includes(data.typename)
    return (
      <ShareModal
        isOpen={open}
        onClose={() => setOpen(false)}
        showPdf={showPdf}
      />
    )
  }

  function renderCourseNavigation() {
    if (!data.courseData) return null
    return (
      <CourseNavigation
        open={courseNavOpen}
        onOverviewButtonClick={openCourseNav}
        data={data.courseData}
      />
    )
  }

  function renderNoCoursePages() {
    if (!data.courseData) return null
    const validPages = data.courseData.pages.filter(
      (page) => !page.noCurrentRevision
    )
    if (validPages.length > 0) return null
    return (
      <>
        <StaticInfoPanel icon={faExclamationCircle} type="warning" doNotIndex>
          {strings.course.noPagesWarning}
        </StaticInfoPanel>
      </>
    )
  }

  function renderCourseFooter() {
    if (data.courseData) {
      return (
        <CourseFooter
          onOverviewButtonClick={openCourseNav}
          nextHref={data.courseData.nextPageUrl ?? ''}
          previousHref={data.courseData.previousPageUrl ?? ''}
        />
      )
    } else return null
  }

  function renderNotices() {
    if (data.trashed)
      return (
        <StaticInfoPanel icon={faTrash} doNotIndex>
          {strings.content.trashedNotice}
        </StaticInfoPanel>
      )

    const hasContent = data.title || data.content?.length
    if (!hasContent)
      return (
        <StaticInfoPanel icon={faExclamationCircle} type="warning" doNotIndex>
          {strings.content.emptyNotice}
        </StaticInfoPanel>
      )

    if (data.isUnrevised) {
      const link = (
        <Link href={`/entity/repository/history/${data.id}`}>
          {strings.pageTitles.revisionHistory}
        </Link>
      )
      return (
        <StaticInfoPanel icon={faTools} type="warning">
          {replacePlaceholders(strings.content.unrevisedNotice, {
            link,
          })}
        </StaticInfoPanel>
      )
    }
  }
}
