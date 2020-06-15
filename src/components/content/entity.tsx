import {
  faGraduationCap,
  faNewspaper,
  faPlayCircle,
  faCubes,
  faCircle,
  faFolderOpen,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

import { HSpace } from './h-space'
import {
  LicenseNotice,
  LicenseNoticeData,
} from '@/components/content/license-notice'
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
import { renderArticle } from '@/schema/article-renderer'

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
  contentId: string
  contentType:
    | 'Article'
    | 'Page'
    | 'CoursePage'
    | 'Video'
    | 'Applet'
    | 'Exercise'
    | 'ExerciseGroup'
    | 'TaxonomyTerm'
  license: LicenseNoticeData
}

export interface EditorState {
  children: EditorChildren[]
}

interface EditorChildren {
  type: string
  state: {
    content: unknown
  }
}

interface EntityData {
  title: string
  id: number
  value: EditorState
  metaDescription: string
  license: LicenseNoticeData
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

  return (
    <>
      {renderCourseNavigation()}

      {renderStyledH1()}
      {renderUserToolsMobile()}
      {renderArticle(data.value.children)}

      {renderCourseFooter()}

      <HSpace amount={20} />
      {renderUserToolsMobile()}
      {renderUserTools()}
      {renderShareModal()}

      {license && <LicenseNotice data={license} />}
    </>
  )

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

  function renderCourseFooter() {
    if (isCourse(data)) {
      const nextIndex = () =>
        1 +
        data.pages.findIndex(
          (page) => page.currentRevision.title === data.title
        )!

      const nextCoursePageHref = () =>
        nextIndex() >= data.pages.length ? '' : data.pages[nextIndex()].alias

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

    /* TODO: Maybe merge with icon logic in topic-link-list */

    let icon = faCircle
    let iconTitle = ''

    switch (contentType) {
      case 'Article':
        icon = faNewspaper
        iconTitle = 'Artikel'
        break
      case 'CoursePage':
        icon = faGraduationCap
        iconTitle = 'Kurs'
        break
      case 'Video':
        icon = faPlayCircle
        iconTitle = 'Video'
        break
      case 'Applet':
        icon = faCubes
        iconTitle = 'Applet'
        break
      case 'TaxonomyTerm':
        icon = faFolderOpen
        iconTitle = 'Bereich'
    }

    return (
      <StyledH1 extraMarginTop>
        {data.title}
        {(contentType === 'Article' || contentType === 'Video') && (
          <span title={iconTitle}>
            {' '}
            <StyledIcon icon={icon} />{' '}
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
