import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import * as React from 'react'
import styled from 'styled-components'

import { CommentAreaProps } from '../comments/comment-area'
import { MaxWidthDiv } from '../navigation/max-width-div'
import { HSpace } from './h-space'
import { LicenseNotice } from '@/components/content/license-notice'
import { CourseFooter } from '@/components/navigation/course-footer'
import { CourseNavigation } from '@/components/navigation/course-navigation'
import { StyledH1 } from '@/components/tags/styled-h1'
import { ShareModalProps } from '@/components/user-tools/share-modal'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, FrontendContentNode } from '@/data-types'
import { entityIconMapping } from '@/helper/icon-by-entity-type'
import { renderArticle } from '@/schema/article-renderer'

export interface EntityProps {
  data: EntityData
}

const CommentArea = dynamic<CommentAreaProps>(() =>
  import('@/components/comments/comment-area').then((mod) => mod.CommentArea)
)

const ShareModal = dynamic<ShareModalProps>(() =>
  import('@/components/user-tools/share-modal').then((mod) => mod.ShareModal)
)

export function Entity({ data }: EntityProps) {
  // state@/components/comments/comment-area
  const [open, setOpen] = React.useState(false)

  const [backgroundImage, setBackgroundImage] = React.useState('')
  const [activeImageUrl, setActiveImageUrl] = React.useState('')

  const [useBackdrops] = React.useState(
    () =>
      data.content &&
      data.content.filter((node) => node.type == 'backdrop').length > 0
  )

  // add scroll listener
  React.useEffect(() => {
    const backdrops = document.querySelectorAll('.frontend-backdrop')
    function check() {
      const windowHeight = window.document.documentElement.clientHeight
      let minOverPx = -100000
      let cur: any = undefined
      for (let i = 0; i < backdrops.length; i++) {
        const backdrop = backdrops[i]
        const bot = backdrop.getBoundingClientRect().bottom - windowHeight
        if (bot <= 0 && bot > minOverPx) {
          minOverPx = bot
          cur = backdrop
        }
      }
      setBackgroundImage(cur ? cur.innerHTML : '')
    }

    if (backdrops.length > 0) {
      check()
      window.addEventListener('scroll', check)
      return () => {
        window.removeEventListener('scroll', check)
      }
    }
  }, [])

  // avoid flicker fix
  React.useEffect(() => {
    if (!backgroundImage) {
      setActiveImageUrl('')
      return
    }
    const img = new Image()
    img.src = backgroundImage
    img
      .decode()
      .then(() => {
        setActiveImageUrl(backgroundImage)
      })
      .catch(() => {
        // Do something with the error.
      })
  }, [backgroundImage])

  // course
  const [courseNavOpen, setCourseNavOpen] = React.useState(false)
  const openCourseNav = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setCourseNavOpen(true)
  }

  Router.events.on('routeChangeComplete', () => {
    setCourseNavOpen(false)
  })

  const { strings } = useInstanceData()

  return wrapWithBackdropCss(
    wrapWithSchema(
      <>
        <FixedDiv>
          <MaxWidthDiv>
            <BackdropDiv url={activeImageUrl} />
          </MaxWidthDiv>
        </FixedDiv>
        {renderCourseNavigation()}
        {data.trashed && renderTrashedNotice()}
        {renderStyledH1()}
        {renderUserTools({ aboveContent: true })}
        {data.content && renderContent(data.content)}
        {renderCourseFooter()}
        <HSpace amount={20} />
        {renderUserTools()}
        {renderShareModal()}
        {data.licenseData && <LicenseNotice data={data.licenseData} />}

        {data.typename !== 'Page' && <CommentArea id={data.id} />}
      </>
    )
  )

  function wrapWithBackdropCss(comp: JSX.Element) {
    if (useBackdrops) return <CssForBackdrop>{comp}</CssForBackdrop>
    return comp
  }

  function renderStyledH1() {
    if (!data.title) return null

    return (
      <StyledH1 spaceAbove itemProp="name">
        {data.title}
        {renderEntityIcon()}
      </StyledH1>
    )
  }

  function renderEntityIcon() {
    if (!data.categoryIcon) return null
    return (
      <span title={strings.entities[data.categoryIcon]}>
        {' '}
        <StyledIcon icon={entityIconMapping[data.categoryIcon]} />{' '}
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
        unrevisedRevision={data.unrevisedRevisions}
        data={{
          type: data.typename,
          id: data.id,
          revisionId: data.revisionId,
          courseId: data.courseData?.id,
          trashed: data.trashed,
        }}
      />
    )
  }

  function renderShareModal() {
    return (
      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        contentId={data.id}
      />
    )
  }

  function renderCourseNavigation() {
    if (data.courseData) {
      return (
        <CourseNavigation
          open={courseNavOpen}
          onOverviewButtonClick={openCourseNav}
          data={data.courseData}
        />
      )
    } else return null
  }

  function renderCourseFooter() {
    if (data.courseData) {
      return (
        <CourseFooter
          onOverviewButtonClick={openCourseNav}
          nextHref={data.courseData.nextPageUrl ?? ''}
        />
      )
    } else return null
  }

  function renderTrashedNotice() {
    return (
      <TrashNotice>
        <FontAwesomeIcon icon={faTrash} /> {strings.content.trashedNotice}
      </TrashNotice>
    )
  }
}

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.73rem;
`

const TrashNotice = styled.div`
  margin: 50px 0;
  padding: 16px;
  background-color: #ddd;
  border-radius: 20px;
  font-weight: bold;
`

const BackdropDiv = styled.div<{ url: string }>`
  width: 100%;
  height: 100vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('${(props) => props.url}');
`

const FixedDiv = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`

const CssForBackdrop = styled.div`
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  [class*='exercise__Wrapper'],
  [class*='Important'] {
    background-color: white;
  }
  [class*='Important'] {
    border-right: 2px solid #007ec1;
    border-top: 2px solid #007ec1;
    border-bottom: 2px solid #007ec1;
  }
  [class*='exercise__Wrapper'] {
    border: 1px solid #007ec1;
  }
`
