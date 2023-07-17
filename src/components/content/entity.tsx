import {
  faExclamationCircle,
  faTools,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { useState, MouseEvent, useEffect } from 'react'

import { HSpace } from './h-space'
import { Link } from './link'
import { FaIcon } from '../fa-icon'
import { StaticInfoPanel } from '../static-info-panel'
import { LicenseNotice } from '@/components/content/license/license-notice'
import { CourseFooter } from '@/components/navigation/course-footer'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, UuidType } from '@/data-types'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { tw } from '@/helper/tw'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { renderArticle } from '@/schema/article-renderer'
import { CourseNavigation } from '@/serlo-editor/plugins/serlo-template-plugins/course/course-navigation'

export interface EntityProps {
  data: EntityData
}

export function Entity({ data }: EntityProps) {
  // state@/components/comments/comment-area

  // courseNav: start opened when only some entries
  const [courseNavOpen, setCourseNavOpen] = useState(
    (data && data.courseData && data.courseData.pages.length < 4) ?? false
  )

  const openCourseNav = (e?: MouseEvent) => {
    e?.preventDefault()
    setCourseNavOpen(!courseNavOpen)
  }

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      setCourseNavOpen(false)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return wrapWithSchema(
    <>
      {data.courseData && (
        <CourseNavigation
          open={courseNavOpen}
          onOverviewButtonClick={openCourseNav}
          title={data.courseData.title}
          pages={data.courseData.pages}
        />
      )}
      <NoCoursePages data={data} />
      <Notices data={data} />
      <Heading
        title={data.title}
        courseData={data.courseData}
        typename={data.typename}
      />
      <UserToolsRenderer data={data} isAboveContent />
      <div className="min-h-1/4" key={data.id}>
        {data.content && <Content data={data as EntityDataWithContent} />}
      </div>
      {data.courseData && (
        <CourseFooter
          onOverviewButtonClick={openCourseNav}
          pages={data.courseData.pages}
          index={data.courseData.index}
        />
      )}
      <HSpace amount={20} />
      <UserToolsRenderer data={data} />
      {data.licenseData && <LicenseNotice data={data.licenseData} />}
    </>
  )

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
}

function Heading({
  title,
  courseData,
  typename,
}: {
  title?: string
  courseData?: EntityData['courseData']
  typename: UuidType
}) {
  if (!title) return null
  return (
    <h1 className="serlo-h1 mt-12" itemProp="name">
      <CoursePageNumber courseData={courseData} />
      {title}
      <EntityIcon typename={typename} />
    </h1>
  )
}

function CoursePageNumber({
  courseData,
}: {
  courseData: EntityData['courseData']
}) {
  if (!courseData) return null
  return (
    <span
      className={tw`
        -mt-1.5 mr-1.5 inline-block h-7 w-7
        justify-center rounded-full bg-brand-200 text-center align-middle
        text-xl font-bold text-brand
      `}
    >
      {courseData.index + 1}
    </span>
  )
}

function EntityIcon({ typename }: { typename: UuidType }) {
  const { strings } = useInstanceData()

  if (typename === UuidType.CoursePage || typename === UuidType.Page)
    return null
  return (
    <span title={getTranslatedType(strings, typename)}>
      {' '}
      <FaIcon
        icon={getIconByTypename(typename)}
        className="text-2.5xl text-brand-400"
      />{' '}
    </span>
  )
}

function UserToolsRenderer({
  isAboveContent,
  data,
}: {
  isAboveContent?: boolean
  data: EntityProps['data']
}) {
  return (
    <UserTools
      aboveContent={isAboveContent}
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

type EntityDataWithContent = EntityData & {
  content: NonNullable<EntityData['content']>
}

function Content({ data }: { data: EntityDataWithContent }) {
  const content = renderArticle(data.content, `entity${data.id}`)
  if (data.schemaData?.setContentAsSection) {
    return <section itemProp="articleBody">{content}</section>
  }
  return <>{content}</>
}

function NoCoursePages({ data }: { data: EntityData }) {
  const { strings } = useInstanceData()

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

function Notices({ data }: { data: EntityData }) {
  const { strings } = useInstanceData()
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

  return null
}
