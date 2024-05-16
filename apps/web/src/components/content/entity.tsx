// Temporary file while working on unified renderer
import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { isEmptyArticle } from '@editor/plugins/article/utils/static-is-empty'
import { CourseNavigation } from '@editor/plugins/serlo-template-plugins/course/course-navigation'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { isArticleDocument } from '@editor/types/plugin-type-guards'
import {
  faExclamationCircle,
  faTools,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import { useState, MouseEvent } from 'react'

import { HSpace } from './h-space'
import { Link } from './link'
import { FaIcon } from '../fa-icon'
import { InfoPanel } from '../info-panel'
import { LicenseNotice } from '@/components/content/license/license-notice'
import { CourseFooter } from '@/components/navigation/course-footer'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, UuidType } from '@/data-types'
import { cn } from '@/helper/cn'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { isProduction } from '@/helper/is-production'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

export interface EntityProps {
  data: EntityData
}

const LenabiCourseFeedback = dynamic(() =>
  import('../pages/lenabi/lenabi-course-feedback').then(
    (mod) => mod.LenabiCourseFeedback
  )
)

export function Entity({ data }: EntityProps) {
  editorRenderers.init(createRenderers())

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

  const isLenabiUserJourneyCoursePage = !isProduction && data.id === 307527

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
        {isLenabiUserJourneyCoursePage ? <LenabiCourseFeedback /> : null}
      </div>
      {renderCourseFooter()}
      <HSpace amount={20} />
      {renderUserTools()}
      {data.licenseId ? <LicenseNotice licenseId={data.licenseId} /> : null}
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
        className={cn(`
          -mt-1.5 mr-1.5 inline-block h-7 w-7
          justify-center rounded-full bg-brand-200 text-center align-middle
          text-xl font-bold text-brand
        `)}
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

  function renderContent(document: EntityData['content']) {
    const content = <StaticRenderer document={document} />

    if (data.schemaData?.setContentAsSection) {
      return <section itemProp="articleBody">{content}</section>
    }
    return content
  }

  function renderUserTools(setting?: { aboveContent?: boolean }) {
    return (
      <UserTools
        aboveContent={setting?.aboveContent}
        unrevisedRevisions={data.unrevisedRevisions}
        data={{
          ...data,
          courseId: data.courseData?.id,
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
        pages={data.courseData.pages.map(
          ({ id, title, active, noCurrentRevision, url }) => {
            return {
              key: id + title,
              element: (
                <Link
                  className={cn(
                    'text-lg leading-browser',
                    active &&
                      'font-semibold text-almost-black hover:no-underline',
                    noCurrentRevision && 'text-brand-300'
                  )}
                  href={active ? undefined : url}
                >
                  {noCurrentRevision
                    ? '(' + strings.course.noRevisionForPage + ')'
                    : title}
                </Link>
              ),
            }
          }
        )}
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
      <InfoPanel icon={faExclamationCircle} type="warning" doNotIndex>
        {strings.course.noPagesWarning}
      </InfoPanel>
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
        <InfoPanel icon={faTrash} doNotIndex>
          {strings.content.trashedNotice}
        </InfoPanel>
      )

    // this check could be more exact, but I guess empty articles are the most important case
    const hasContent = data.content
      ? !Array.isArray(data.content) && isArticleDocument(data.content)
        ? !isEmptyArticle(data.content)
        : true
      : !!data.title

    if (!hasContent)
      return (
        <InfoPanel icon={faExclamationCircle} type="warning" doNotIndex>
          {strings.content.emptyNotice}
        </InfoPanel>
      )

    if (data.isUnrevised) {
      const link = (
        <Link href={getHistoryUrl(data.id)}>
          {strings.pageTitles.revisionHistory}
        </Link>
      )
      return (
        <InfoPanel icon={faTools} type="warning">
          {replacePlaceholders(strings.content.unrevisedNotice, {
            link,
          })}
        </InfoPanel>
      )
    }
  }
}
