import { faShareAlt, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

import { HSpace } from './h-space'
import type { CourseFooterProps } from '@/components/navigation/course-footer'
import type {
  CourseNavigationProps,
  CourseNavigationPagesProps,
} from '@/components/navigation/course-navigation'
import { ShareModal } from '@/components/navigation/share-modal'
import { ToolLine } from '@/components/navigation/tool-line'
import { ToolLineButton } from '@/components/navigation/tool-line-button'
import { Toolbox } from '@/components/navigation/toolbox'
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

interface ArticlePageProps {
  data: EntityData | CourseData
  contentId: number
  contentType: 'Article' | 'Page' | 'CoursePage'
}

interface EditorState {
  children: unknown[]
}

interface CourseData extends EntityData {
  courseTitle: string
  pages: CourseNavigationPagesProps[]
}

interface EntityData {
  title: string
  id: number
  value: EditorState
}

function isCourse(data: ArticlePageProps['data']): data is CourseData {
  return (data as CourseData).pages !== undefined
}

export function ArticlePage({
  data,
  contentId,
  contentType,
}: ArticlePageProps) {
  const [open, setOpen] = React.useState(false)

  const [courseNavOpen, setCourseNavOpen] = React.useState(false)
  const openCourseNav = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault()
    setCourseNavOpen(true)
  }

  if (isCourse(data)) {
    const nextIndex =
      1 +
      data.pages.findIndex((page) => page.currentRevision.title === data.title)!
    const nextCoursePageHref =
      nextIndex >= data.pages.length ? '' : data.pages[nextIndex].alias

    return (
      <>
        <CourseNavigation
          open={courseNavOpen}
          onOverviewButtonClick={openCourseNav}
          courseTitle={data.courseTitle}
          pageTitle={data.title}
          pages={data.pages}
        />
        {renderTitle()}
        {renderToolLine()}
        {/* @ts-expect-error */}
        {renderArticle(data.value.children)}

        <CourseFooter
          onOverviewButtonClick={openCourseNav}
          nextHref={nextCoursePageHref}
        />
        <HSpace amount={20} />

        {renderToolbox()}
        {renderShareModal()}
      </>
    )
  } else {
    return (
      <>
        {renderTitle()}
        {renderToolLine()}
        {/* @ts-expect-error */}
        {renderArticle(data.value.children)}
        <HSpace amount={20} />

        {renderToolLine()}

        {renderToolbox()}
        {renderShareModal()}
      </>
    )
  }

  function renderTitle() {
    return (
      <StyledH1 extraMarginTop>
        {data.title}
        {contentType === 'Article' && (
          <span title="Artikel">
            {' '}
            <StyledIcon icon={faNewspaper} />{' '}
          </span>
        )}
      </StyledH1>
    )
  }

  function renderToolLine() {
    return (
      <ToolLine>
        <ToolLineButton isOnTop onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
        </ToolLineButton>
      </ToolLine>
    )
  }

  function renderToolbox() {
    return (
      <Toolbox
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
}

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.73rem;
`
