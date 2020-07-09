import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { HSpace } from './h-space'
import { LicenseNotice, LicenseData } from '@/components/content/license-notice'
import type { CourseFooterProps } from '@/components/navigation/course-footer'
import type {
  CourseNavigationProps,
  CourseNavigationPagesProps,
} from '@/components/navigation/course-navigation'
import { ShareModal } from '@/components/navigation/share-modal'
import { UserToolsMobileButton } from '@/components/navigation/tool-line-button'
import { UserTools } from '@/components/navigation/user-tools'
import { UserToolsMobile } from '@/components/navigation/user-tools-mobile'
import { StyledH1 } from '@/components/tags/styled-h1'
import { PrettyLinksContextValue } from '@/contexts/pretty-links-context'
import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'
import { getIconAndTitleByContentType } from '@/helper/header-by-content-type'
import { renderArticle, EditorState } from '@/schema/article-renderer'

const CourseNavigation = dynamic<CourseNavigationProps>(() =>
  import('@/components/navigation/course-navigation').then(
    (mod) => mod.CourseNavigation
  )
)
const CourseFooter = dynamic<CourseFooterProps>(() =>
  import('@/components/navigation/course-footer').then(
    (mod) => mod.CourseFooter
  )
)

export interface EntityProps {
  data: EntityData | CourseData
  contentId: number
  contentType:
    | 'Article'
    | 'Page'
    | 'CoursePage'
    | 'Video'
    | 'Applet'
    | 'Exercise'
    | 'ExerciseGroup'
    | 'TaxonomyTerm'
  license: LicenseData
  prettyLinks?: PrettyLinksContextValue
}

interface EntityData {
  title: string
  id: number
  value: EditorState
  metaDescription: string
  license: LicenseData
}

interface CourseData extends EntityData {
  courseTitle: string
  pages: CourseNavigationPagesProps[]
}

function isCourse(data: EntityProps['data']): data is CourseData {
  return (data as CourseData).pages !== undefined
}

export function Entity({ data, contentId, contentType, license }: EntityProps) {
  const [open, setOpen] = React.useState(false)

  const [courseNavOpen, setCourseNavOpen] = React.useState(false)
  const openCourseNav = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault()
    setCourseNavOpen(true)
  }

  Router.events.on('routeChangeComplete', () => {
    setCourseNavOpen(false)
  })

  if (data === undefined) return null

  return wrapWithSchema(
    <>
      {renderCourseNavigation()}

      {renderStyledH1()}
      {renderUserToolsMobile()}
      {renderContent(data.value.children)}

      {renderCourseFooter()}

      <HSpace amount={20} />
      {renderUserToolsMobile()}
      {renderUserTools()}
      {renderShareModal()}

      {license && <LicenseNotice data={license} />}
    </>
  )

  function wrapWithSchema(comp: JSX.Element) {
    if (contentType === 'Article') {
      return (
        <article itemScope itemType="http://schema.org/Article">
          {comp}
        </article>
      )
    }
    if (contentType === 'Video' || contentType === 'Applet') {
      return (
        <div itemScope itemType="http://schema.org/VideoObject">
          {comp}
        </div>
      )
    }
    return comp
  }

  function renderUserToolsMobile() {
    return (
      <UserToolsMobile>
        <UserToolsMobileButton isOnTop onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
        </UserToolsMobileButton>
      </UserToolsMobile>
    )
  }

  function renderUserTools() {
    return (
      <UserTools
        onShare={() => setOpen(true)}
        editHref={`/entity/repository/add-revision/${data.id}`}
        hideEdit={contentType === 'Page'}
      />
    )
  }

  function renderShareModal() {
    return (
      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        contentId={contentId}
      />
    )
  }

  function renderCourseNavigation() {
    if (isCourse(data)) {
      return (
        <CourseNavigation
          open={courseNavOpen}
          onOverviewButtonClick={openCourseNav}
          courseTitle={data.courseTitle}
          pageTitle={data.title}
          pages={data.pages}
        />
      )
    } else return null
  }

  function renderContent(value: EditorState['children']) {
    if (contentType === 'Article') {
      return <section itemProp="articleBody">{renderArticle(value)}</section>
    }
    return renderArticle(value)
  }

  function renderCourseFooter() {
    if (isCourse(data)) {
      const nextIndex = () =>
        1 +
        data.pages.findIndex(
          (page) => page.currentRevision.title === data.title
        )!

      const nextCoursePageHref = () =>
        nextIndex() >= data.pages.length
          ? ''
          : hasSpecialUrlChars(data.pages[nextIndex()].alias)
          ? `/${data.pages[nextIndex()].id}`
          : data.pages[nextIndex()].alias

      return (
        <CourseFooter
          onOverviewButtonClick={openCourseNav}
          nextHref={nextCoursePageHref()}
        />
      )
    } else return null
  }

  function renderStyledH1() {
    if (contentType === 'Exercise' || contentType === 'ExerciseGroup')
      return null

    const iconAndTitle = getIconAndTitleByContentType(contentType)

    return (
      <StyledH1 extraMarginTop itemProp="name">
        {data.title}
        {(contentType === 'Article' || contentType === 'Video') && (
          <span title={iconAndTitle.title}>
            {' '}
            <StyledIcon icon={iconAndTitle.icon} />{' '}
          </span>
        )}
      </StyledH1>
    )
  }
}

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.73rem;
`
