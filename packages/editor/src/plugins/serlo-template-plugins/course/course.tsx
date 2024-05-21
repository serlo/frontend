import { AddButton } from '@editor/editor-ui'
import { EditorTooltip } from '@editor/editor-ui/editor-tooltip'
import {
  type EditorPlugin,
  type EditorPluginProps,
  type PrettyStaticState,
  list,
  string,
} from '@editor/plugin'
import { selectStaticDocument, store } from '@editor/store'
import { TemplatePluginType } from '@editor/types/template-plugin-type'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { UuidType } from '@serlo/frontend/src/data-types'
import { cn } from '@serlo/frontend/src/helper/cn'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'
import { RevisionHistoryLoader } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/revision-history-loader'
import { useEffect, useState } from 'react'

import { CourseNavigation } from './course-navigation'
import type { CoursePageTypePluginState } from './course-page'
import {
  editorContent,
  entity,
  serializedChild,
  entityType,
} from '../common/common'
import { EntityTitleInput } from '../common/entity-title-input'
import { MetadataFieldsModal } from '../common/metadata-fields-modal'
import { ToolbarMain } from '../toolbar-main/toolbar-main'

export const courseTypeState = entityType(
  {
    ...entity,
    title: string(),
    description: editorContent(),
  },
  {
    'course-page': list(serializedChild('type-course-page')),
  }
)

export type CourseTypePluginState = typeof courseTypeState

export const courseTypePlugin: EditorPlugin<CourseTypePluginState> = {
  Component: CourseTypeEditor,
  state: courseTypeState,
  config: {},
}

function CourseTypeEditor(props: EditorPluginProps<CourseTypePluginState>) {
  const {
    title,
    meta_description: metaDescription,
    'course-page': children,
  } = props.state
  const editorStrings = useEditorStrings()
  const courseStrings = editorStrings.templatePlugins.course
  const [courseNavOpen, setCourseNavOpen] = useState(true)
  const [activePageIndex, setActivePageIndex] = useState(0)

  const staticState = selectStaticDocument(store.getState(), props.id)
    ?.state as PrettyStaticState<CourseTypePluginState>
  const staticPages = staticState[
    'course-page'
  ] as PrettyStaticState<CoursePageTypePluginState>[]

  useEffect(() => {
    const hashId = parseInt(window.location.hash.substring(1))
    if (!hashId) return
    const index = staticPages.findIndex(({ id }) => id === hashId)
    setActivePageIndex(Math.max(index, 0))
  }, [staticPages])

  if (!staticPages) return null

  return (
    <>
      <div className="absolute right-0 -mt-10 mr-side flex">
        <MetadataFieldsModal metaDescription={metaDescription} />

        <RevisionHistoryLoader
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      </div>
      <article className="mt-20">
        {renderCourseNavigation()}
        <div className="ml-side mt-4">
          <AddButton
            onClick={() => {
              children.insert()
              setTimeout(() => {
                setActivePageIndex(staticPages.length)
                window.location.hash = `#${staticPages[staticPages.length - 1].id}`
              })
            }}
          >
            {courseStrings.addCoursePage}
          </AddButton>
        </div>
        {renderCoursePage()}
        <ToolbarMain showSubscriptionOptions {...props.state} />
      </article>
    </>
  )

  function renderCourseNavigation() {
    return (
      <CourseNavigation
        open={courseNavOpen}
        onOverviewButtonClick={() => setCourseNavOpen(!courseNavOpen)}
        title={
          <EntityTitleInput
            title={title}
            compact
            className="!mt-1 -ml-2 max-w-xl rounded-xl !border-2 !border-solid border-transparent bg-editor-primary-100 px-2 focus:border-editor-primary"
          />
        }
        pages={staticPages.map(({ title, id }, index) => {
          const isActive = activePageIndex === index
          return {
            key: title + id + index,
            element: (
              <div className="group">
                <button
                  onClick={() => {
                    if (isActive) return
                    window.location.hash = `#${staticPages[index].id}`
                    setActivePageIndex(index)
                  }}
                  className={cn(
                    'serlo-link text-lg leading-browser',
                    isActive &&
                      'font-semibold text-almost-black hover:no-underline'
                  )}
                >
                  {title.trim().length ? title : '___'}
                </button>{' '}
                {/* This code becomes relevant when coursePages are not standalone entities any more */}
                {/* {index > 0 ? (
                  <button
                    className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100"
                    onClick={() => {
                      const newIndex = index - 1
                      children.move(index, newIndex)
                      // setActivePageIndex(() => newIndex)
                    }}
                  >
                    <EditorTooltip text={templateStrings.article.moveUpLabel} />
                    <FaIcon icon={faArrowCircleUp} />
                  </button>
                ) : null} */}
              </div>
            ),
          }
        })}
      />
    )
  }

  function renderCoursePage() {
    const activePage = children.at(activePageIndex)
    if (!activePage) return
    const staticPage = staticPages[activePageIndex]

    return (
      <div
        key={activePage.id}
        className="mt-16 border-t-2 border-editor-primary-200 pt-2"
      >
        <nav className="flex justify-end">
          <button
            className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
            onClick={() => children.remove(activePageIndex)}
          >
            <EditorTooltip text={courseStrings.removeCoursePage} />
            <FaIcon icon={faTrashAlt} />
          </button>
          <ContentLoaders
            id={staticPage.id}
            currentRevision={staticPage.revision}
            onSwitchRevision={(data) =>
              activePage.replace(TemplatePluginType.CoursePage, data)
            }
            entityType={UuidType.CoursePage}
          />
        </nav>
        {children[activePageIndex]?.render()}
      </div>
    )
  }
}
