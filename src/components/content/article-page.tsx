import { faShareAlt, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

import { HSpace } from './h-space'
import type { CourseFooterProps } from '@/components/navigation/course-footer'
import type { CourseNavigationProps } from '@/components/navigation/course-navigation'
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

// TODO: needs type declaration
type ArticlePageProps = any

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
  const isCoursePage = !!data.pages

  const nextIndex =
    isCoursePage &&
    1 +
      // TODO: any type annotation not needed anymore after we defined ArticlePageProps
      (data.pages as any[]).findIndex(
        (page) => page.currentRevision.title === data.title
      )!
  const nextCoursePageHref =
    isCoursePage &&
    (nextIndex >= data.pages.length
      ? ''
      : data.pages[nextIndex as number].alias)

  return (
    <>
      {isCoursePage && (
        <CourseNavigation
          open={courseNavOpen}
          opener={openCourseNav}
          courseTitle={data.courseTitle}
          pageTitle={data.title}
          pages={data.pages}
        />
      )}
      <StyledH1 extraMarginTop>
        {data.title}
        {contentType === 'Article' && (
          <span title="Artikel">
            {' '}
            <StyledIcon icon={faNewspaper} />{' '}
          </span>
        )}
      </StyledH1>
      <ToolLine>
        <ToolLineButton isOnTop onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
        </ToolLineButton>
      </ToolLine>
      {data.value && renderArticle(data.value.children)}
      {isCoursePage && (
        <CourseFooter opener={openCourseNav} nextHref={nextCoursePageHref} />
      )}
      <HSpace amount={20} />
      {!isCoursePage && (
        <ToolLine>
          <ToolLineButton onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faShareAlt} size="1x" /> Teilen
          </ToolLineButton>
        </ToolLine>
      )}

      <Toolbox
        onShare={() => setOpen(true)}
        editHref={`/entity/repository/add-revision/${data.id}`}
        hideEdit={contentType === 'Page'}
      />
      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        contentId={contentId}
      />
    </>
  )
}

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.73rem;
`
