import { faShareAlt, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

import { renderArticle } from '../../schema/render-article'
import { ShareModal } from '../navigation/share-modal'
import { ToolLine } from '../navigation/tool-line'
import { ToolLineButton } from '../navigation/tool-line-button'
import { Toolbox } from '../navigation/toolbox'
import { StyledH1 } from '../tags/styled-h1'
import { HSpace } from './h-space'
import type { CourseFooterProps } from '@/components/navigation/course-footer'
import type { CourseNavigationProps } from '@/components/navigation/course-navigation'

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
  const openCourseNav = (e: Event) => {
    e.preventDefault()
    setCourseNavOpen(true)
  }
  const isCoursePage = !!data.pages

  const nextIndex =
    isCoursePage &&
    1 +
      // TODO: any type annotation not needed anymore after we defined ArticlePageProps
      (data.pages.findIndex(
        (page: any) => page.currentRevision.title === data.title
      ) as number)
  const nextCoursePageHref =
    isCoursePage &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
      <StyledH1 displayMode>
        {contentType === 'Article' && (
          <span title="Artikel">
            <StyledIcon icon={faNewspaper} />{' '}
          </span>
        )}
        {data.title}
      </StyledH1>
      <ToolLine>
        <ToolLineButton top onClick={() => setOpen(true)}>
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
        editHref={`/entity/repository/add-revision/${data.id as string}`}
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
`
