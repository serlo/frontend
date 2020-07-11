import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import dynamic from 'next/dynamic'
//import { Router } from 'next/router'
import React from 'react'
import styled from 'styled-components'

import { HSpace } from './h-space'
import { LicenseNotice } from '@/components/content/license-notice'
// import type { CourseFooterProps } from '@/components/navigation/course-footer'
// import type { CourseNavigationProps } from '@/components/navigation/course-navigation'
import { ShareModal } from '@/components/navigation/share-modal'
import { UserToolsMobileButton } from '@/components/navigation/tool-line-button'
import { UserTools } from '@/components/navigation/user-tools'
import { UserToolsMobile } from '@/components/navigation/user-tools-mobile'
import { StyledH1 } from '@/components/tags/styled-h1'
//import { PrettyLinksContextValue } from '@/contexts/pretty-links-context'
//import { hasSpecialUrlChars } from '@/helper/check-special-url-chars'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, FrontendContentNode } from '@/data-types'
import { categoryIconMapping } from '@/helper/header-by-content-type'
import { renderArticle } from '@/schema/article-renderer'

/*const CourseNavigation = dynamic<CourseNavigationProps>(() =>
  import('@/components/navigation/course-navigation').then(
    (mod) => mod.CourseNavigation
  )
)
const CourseFooter = dynamic<CourseFooterProps>(() =>
  import('@/components/navigation/course-footer').then(
    (mod) => mod.CourseFooter
  )
)*/

/*function isCourse(data: EntityProps['data']): data is CourseData {
  return (data as CourseData).pages !== undefined
}*/

interface EntityProps {
  data: EntityData
}

export function Entity({ data }: EntityProps) {
  // state of the share
  const [open, setOpen] = React.useState(false)
  const { strings } = useInstanceData()

  //console.log(data)

  return wrapWithSchema(
    <>
      {renderStyledH1()}
      {renderUserToolsMobile()}

      {data.content && renderContent(data.content)}

      <HSpace amount={20} />
      {renderUserToolsMobile()}
      {renderUserTools()}
      {renderShareModal()}

      {data.licenseData && <LicenseNotice data={data.licenseData} />}
    </>
  )

  function renderStyledH1() {
    if (!data.title) return null

    return (
      <StyledH1 extraMarginTop itemProp="name">
        {data.title}
        {renderCategoryIcon()}
      </StyledH1>
    )
  }

  function renderCategoryIcon() {
    if (!data.categoryIcon) return null
    return (
      <span title={strings.categories[data.categoryIcon]}>
        {' '}
        <StyledIcon icon={categoryIconMapping[data.categoryIcon]} />{' '}
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
    if (data.schemaData?.setContentAsSection) {
      return <section itemProp="articleBody">{renderArticle(value)}</section>
    }
    return renderArticle(value)
  }

  function renderUserToolsMobile() {
    return (
      <UserToolsMobile>
        <UserToolsMobileButton isOnTop onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faShareAlt} size="1x" /> {strings.share.button}
        </UserToolsMobileButton>
      </UserToolsMobile>
    )
  }

  function renderUserTools() {
    return (
      <UserTools
        onShare={() => setOpen(true)}
        editHref={`/entity/repository/add-revision/${data.id}`}
        hideEdit={!data.inviteToEdit}
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

  /*

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
      

      {renderCourseFooter()}


    </>
  )

  


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
  */
}

const StyledIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.colors.lighterblue};
  font-size: 1.73rem;
`
