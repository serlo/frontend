import React from 'react'
import StyledH1 from '../tags/StyledH1'
import ToolLine from '../navigation/ToolLine'
import ToolLineButton from '../navigation/ToolLineButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import ShareModal from '../navigation/ShareModal'
import { renderArticle } from '../../schema/articleRenderer'
import HSpace from './HSpace'
import Toolbox from '../navigation/Toolbox'
import dynamic from 'next/dynamic'
import styled from 'styled-components'

const CourseNavigation = dynamic(() => import('../navigation/CourseNavigation'))
const CourseFooter = dynamic(() => import('../navigation/CourseFooter'))

// TODO: needs type declaration
type ArticlePageProps = any

export default function ArticlePage({
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
      data.pages.findIndex(
        (page: any) => page.currentRevision.title === data.title
      )
  const nextCoursePageHref =
    isCoursePage &&
    (nextIndex >= data.pages.length ? '' : data.pages[nextIndex].alias)

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
        {data.title}
        {contentType === 'Article' && (
          <span title={'Artikel'}>
            {' '}
            <StyledIcon icon={faNewspaper} />{' '}
          </span>
        )}
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
        editHref={'/entity/repository/add-revision/' + data.id}
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
