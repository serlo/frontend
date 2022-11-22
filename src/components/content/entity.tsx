import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle'
import { faTools } from '@fortawesome/free-solid-svg-icons/faTools'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import { Router } from 'next/router'
import { useState, MouseEvent } from 'react'

import { FaIcon } from '../fa-icon'
import { StaticInfoPanel } from '../static-info-panel'
import { InviteModalProps } from '../user-tools/invite-modal'
import { MockupGaps } from './exercises/mockup-gaps'
import { HSpace } from './h-space'
import { Link } from './link'
import { LicenseNotice } from '@/components/content/license/license-notice'
import { CourseFooter } from '@/components/navigation/course-footer'
import { CourseNavigation } from '@/components/navigation/course-navigation'
import { ShareModalProps } from '@/components/user-tools/share-modal'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, UuidType } from '@/data-types'
import { FrontendContentNode } from '@/frontend-node-types'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { renderArticle } from '@/schema/article-renderer'

export interface EntityProps {
  data: EntityData
}

const ShareModal = dynamic<ShareModalProps>(() =>
  import('@/components/user-tools/share-modal').then((mod) => mod.ShareModal)
)

const InviteModal = dynamic<InviteModalProps>(() =>
  import('@/components/user-tools/invite-modal').then((mod) => mod.InviteModal)
)

export function Entity({ data }: EntityProps) {
  // state@/components/comments/comment-area
  const [shareOpen, setShareOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)

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

  const { strings } = useInstanceData()

  const isMockupCoursePage = data.id === 233011

  return wrapWithSchema(
    <>
      {renderCourseNavigation()}
      {renderNoCoursePages()}
      {renderNotices()}
      {renderStyledH1()}
      {renderUserTools({ aboveContent: true })}
      <div className="min-h-1/4">
        {isMockupCoursePage ? (
          <MockupGaps />
        ) : (
          data.content && renderContent(data.content)
        )}
      </div>
      {renderCourseFooter()}
      <HSpace amount={20} />
      {renderUserTools()}
      {renderShareModal()}
      {renderInviteModal()}
      {data.licenseData && (
        <LicenseNotice data={data.licenseData} path={['license']} />
      )}
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
        className={clsx(
          'text-xl text-center font-bold text-brand bg-brand-150',
          'inline-block justify-center align-middle h-7 w-7',
          'rounded-full mr-1.5 -mt-1.5'
        )}
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
          className="text-brand-lighter text-2.5xl"
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
        onShare={() => setShareOpen(true)}
        onInvite={() => setInviteOpen(true)}
        aboveContent={setting?.aboveContent}
        id={data.id}
        unrevisedRevisions={data.unrevisedRevisions}
        data={{
          type: data.typename,
          id: data.id,
          alias: data.alias,
          revisionId: data.revisionId,
          courseId: data.courseData?.id,
          trashed: data.trashed,
          unrevisedRevisions: data.unrevisedRevisions,
          unrevisedCourseRevisions: data.unrevisedCourseRevisions,
        }}
      />
    )
  }

  function renderShareModal() {
    const showPdf = [
      UuidType.Page,
      UuidType.Article,
      UuidType.CoursePage,
      UuidType.ExerciseGroup,
      UuidType.Exercise,
      UuidType.Solution,
    ].includes(data.typename)
    return (
      <ShareModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        showPdf={showPdf}
      />
    )
  }

  function renderInviteModal() {
    return (
      <InviteModal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} />
    )
  }

  function renderCourseNavigation() {
    if (!data.courseData) return null
    return (
      <CourseNavigation
        open={courseNavOpen}
        onOverviewButtonClick={openCourseNav}
        data={data.courseData}
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
      <>
        <StaticInfoPanel icon={faExclamationCircle} type="warning" doNotIndex>
          {strings.course.noPagesWarning}
        </StaticInfoPanel>
      </>
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
        <StaticInfoPanel icon={faTrash} doNotIndex>
          {strings.content.trashedNotice}
        </StaticInfoPanel>
      )

    const hasContent = data.title || data.content?.length
    if (!hasContent)
      return (
        <StaticInfoPanel icon={faExclamationCircle} type="warning" doNotIndex>
          {strings.content.emptyNotice}
        </StaticInfoPanel>
      )

    if (data.isUnrevised) {
      const link = (
        <Link href={getHistoryUrl(data.id)}>
          {strings.pageTitles.revisionHistory}
        </Link>
      )
      return (
        <StaticInfoPanel icon={faTools} type="warning">
          {replacePlaceholders(strings.content.unrevisedNotice, {
            link,
          })}
        </StaticInfoPanel>
      )
    }
  }
}
