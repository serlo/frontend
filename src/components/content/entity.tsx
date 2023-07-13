import {
  faExclamationCircle,
  faTools,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Router } from 'next/router'
import { useState, MouseEvent } from 'react'

import { HSpace } from './h-space'
import { Link } from './link'
import { FaIcon } from '../fa-icon'
import { StaticInfoPanel } from '../static-info-panel'
import { LicenseNotice } from '@/components/content/license/license-notice'
import { CourseFooter } from '@/components/navigation/course-footer'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, UuidType } from '@/data-types'
import { FrontendContentNode } from '@/frontend-node-types'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { tw } from '@/helper/tw'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { renderArticle } from '@/schema/article-renderer'
import { CourseNavigation } from '@/serlo-editor/plugins/serlo-template-plugins/course/course-navigation'

export interface EntityProps {
  data: EntityData
}

export function Entity({ data }: EntityProps) {
  // state@/components/comments/comment-area

  // courseNav: start opened when only some entries
  const [courseNavOpen, setCourseNavOpen] = useState(
    (data && data.courseData && data.courseData.pages.length < 4) ?? false
  )

  const openCourseNav = (e?: MouseEvent) => {
    e?.preventDefault()
    setCourseNavOpen(!courseNavOpen)
  }

  // auto close courseNav when switching pages
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
      <div className="min-h-1/4" key={data.id}>
        {data.content && renderContent(data.content)}
      </div>
      {renderCourseFooter()}
      <HSpace amount={20} />
      {renderUserTools()}
      {data.licenseData && <LicenseNotice data={data.licenseData} />}
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
    if (!data.courseData) return null
    return (
      <span
        className={tw`
          -mt-1.5 mr-1.5 inline-block h-7 w-7
          justify-center rounded-full bg-brand-200 text-center align-middle
          text-xl font-bold text-brand
        `}
      >
        {data.courseData.index + 1}
      </span>
    )
  }

  function renderEntityIcon() {
    if (
      data.typename === UuidType.CoursePage ||
      data.typename === UuidType.Page
    )
      return null
    return (
      <span title={getTranslatedType(strings, data.typename)}>
        {' '}
        <FaIcon
          icon={getIconByTypename(data.typename)}
          className="text-2.5xl text-brand-400"
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
        aboveContent={setting?.aboveContent}
        id={data.id}
        unrevisedRevisions={data.unrevisedRevisions}
        data={{
          type: data.typename,
          id: data.id,
          alias: data.alias,
          revisionId: data.revisionId,
          courseId: data.courseData?.id,
          trashed: data.trashed,
          unrevisedRevisions: data.unrevisedRevisions,
          unrevisedCourseRevisions: data.unrevisedCourseRevisions,
        }}
      />
    )
  }

  function renderCourseNavigation() {
    if (!data.courseData) return null
    return (
      <CourseNavigation
        open={courseNavOpen}
        onOverviewButtonClick={openCourseNav}
        title={data.courseData.title}
        pages={data.courseData.pages}
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
          pages={data.courseData.pages}
          index={data.courseData.index}
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
        <Link href={getHistoryUrl(data.id)}>
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
