import { editorRenderers } from '@editor/plugin/helpers/editor-renderer'
import { isEmptyArticle } from '@editor/plugins/article/utils/static-is-empty'
import { CourseHeader } from '@editor/plugins/course/renderer/course-header'
import { StaticRenderer } from '@editor/static-renderer/static-renderer'
import { isArticleDocument } from '@editor/types/plugin-type-guards'
import {
  faExclamationCircle,
  faTools,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'

import { HSpace } from '../content/h-space'
import { Link } from '../content/link'
import { FaIcon } from '../fa-icon'
import { InfoPanel } from '../info-panel'
import { LicenseNotice } from '@/components/content/license/license-notice'
import { UserTools } from '@/components/user-tools/user-tools'
import { useInstanceData } from '@/contexts/instance-context'
import { EntityData, UuidType } from '@/data-types'
import { getTranslatedType } from '@/helper/get-translated-type'
import { getIconByTypename } from '@/helper/icon-by-entity-type'
import { isProduction } from '@/helper/is-production'
import { replacePlaceholders } from '@/helper/replace-placeholders'
import { getHistoryUrl } from '@/helper/urls/get-history-url'
import { createRenderers } from '@/serlo-editor-integration/create-renderers'

export interface EntityProps {
  data: EntityData
}

const LenabiCourseFeedback = dynamic(() =>
  import('../pages/lenabi/lenabi-course-feedback').then(
    (mod) => mod.LenabiCourseFeedback
  )
)

export function Entity({ data }: EntityProps) {
  editorRenderers.init(createRenderers())

  // TODO: test
  const isLenabiUserJourneyCoursePage = !isProduction && data.id === 307521

  const { strings } = useInstanceData()
  return wrapWithSchema(
    <>
      {renderNotices()}
      {renderStyledH1()}
      {renderUserTools({ aboveContent: true })}
      <div className="min-h-1/4" key={data.id}>
        {data.content && renderContent(data.content)}
        {isLenabiUserJourneyCoursePage ? <LenabiCourseFeedback /> : null}
      </div>
      <HSpace amount={20} />
      {renderUserTools({ aboveContent: false })}
      {data.licenseId ? <LicenseNotice licenseId={data.licenseId} /> : null}
    </>
  )

  function renderStyledH1() {
    if (!data.title) return null
    if (data.typename === UuidType.Course)
      return <CourseHeader title={<>{data.title}</>} />

    return (
      <h1 className="serlo-h1 mt-12" itemProp="name">
        {data.title}
        {renderEntityIcon()}
      </h1>
    )
  }

  function renderEntityIcon() {
    if (data.typename === UuidType.Page) return null
    return (
      <span title={getTranslatedType(strings, data.typename)}>
        {' '}
        <FaIcon
          icon={getIconByTypename(data.typename)}
          className="text-2.5xl text-brand-400"
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

  function renderContent(document: EntityData['content']) {
    const content = <StaticRenderer document={document} />

    if (data.schemaData?.setContentAsSection) {
      return <section itemProp="articleBody">{content}</section>
    }
    return content
  }

  function renderUserTools(setting?: { aboveContent?: boolean }) {
    return (
      <UserTools
        aboveContent={setting?.aboveContent}
        unrevisedRevisions={data.unrevisedRevisions}
        data={data}
      />
    )
  }

  function renderNotices() {
    if (data.trashed)
      return (
        <InfoPanel icon={faTrash} doNotIndex>
          {strings.content.trashedNotice}
        </InfoPanel>
      )

    // this check could be more exact, but I guess empty articles are the most important case
    const hasContent = data.content
      ? !Array.isArray(data.content) && isArticleDocument(data.content)
        ? !isEmptyArticle(data.content)
        : true
      : !!data.title

    if (!hasContent)
      return (
        <InfoPanel icon={faExclamationCircle} type="warning" doNotIndex>
          {strings.content.emptyNotice}
        </InfoPanel>
      )

    if (data.isUnrevised) {
      const link = (
        <Link href={getHistoryUrl(data.id)}>
          {strings.pageTitles.revisionHistory}
        </Link>
      )
      return (
        <InfoPanel icon={faTools} type="warning">
          {replacePlaceholders(strings.content.unrevisedNotice, {
            link,
          })}
        </InfoPanel>
      )
    }
  }
}
