import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import * as React from 'react'
import styled from 'styled-components'

import { CommentAreaProps } from '../comments/comment-area'
import { HSpace } from './h-space'
import { LicenseNotice } from '@/components/content/license-notice'
import { CourseFooter } from '@/components/navigation/course-footer'
import { CourseNavigation } from '@/components/navigation/course-navigation'
import { StyledH1 } from '@/components/tags/styled-h1'
import { ShareModalProps } from '@/components/user-tools/share-modal'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, FrontendContentNode } from '@/data-types'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
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

  return wrapWithSchema(
    <>
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
        <StyledIcon icon={getIconByTypename(data.categoryIcon)} />{' '}
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
