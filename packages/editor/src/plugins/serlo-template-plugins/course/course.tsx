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
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FaIcon } from '@serlo/frontend/src/components/fa-icon'
import { ModalWithCloseButton } from '@serlo/frontend/src/components/modal-with-close-button'
import { useEditorStrings } from '@serlo/frontend/src/contexts/logged-in-data-context'
import { UuidType } from '@serlo/frontend/src/data-types'
import { cn } from '@serlo/frontend/src/helper/cn'
import { ContentLoaders } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/content-loaders'
import { RevisionHistoryLoader } from '@serlo/frontend/src/serlo-editor-integration/components/content-loaders/revision-history-loader'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { CourseNavigation } from './course-navigation'
import type { CoursePageTypePluginState } from './course-page'
import {
  editorContent,
  entity,
  serializedChild,
  entityType,
} from '../common/common'
import { SettingsTextarea } from '../helpers/settings-textarea'
import { ToolbarMain } from '../toolbar-main/toolbar-main'

export const courseTypeState = entityType(
  {
    ...entity,
    title: string(),
    description: editorContent(),
    meta_description: string(),
  },
  {
    // I think this is not correct because it meant for strings?
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
  const { title, meta_description, 'course-page': children } = props.state
  const router = useRouter()
  const editorStrings = useEditorStrings()
  const courseStrings = editorStrings.templatePlugins.course
  const [courseNavOpen, setCourseNavOpen] = useState(true)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
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
        <button
          onClick={() => setShowSettingsModal(true)}
          className="serlo-button-editor-secondary mr-2 text-base"
        >
          Metadata <FaIcon icon={faPencilAlt} />
        </button>
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
              // We want to show the newly inserted course page. Reset the hash
              // (for conflicts in the useEffect - without clashing with
              // useLeaveConfirm) and open the navigation menu
              const url = new URL(window.location.href)
              const queryParams = new URLSearchParams(url.search)
              queryParams.set('noConfirmation', 'true')
              url.search = queryParams.toString()
              const newUrl = `${url.pathname}${url.search}`

              router
                .replace(newUrl, undefined, { shallow: true })
                .then(() => {
                  setActivePageIndex(staticPages.length)
                  setCourseNavOpen(true)

                  children.insert()
                })
                .catch(() => void null)
            }}
          >
            {courseStrings.addCoursePage}
          </AddButton>
        </div>
        {renderCoursePage()}
        <ToolbarMain showSubscriptionOptions {...props.state} />
      </article>
      <ModalWithCloseButton
        isOpen={showSettingsModal}
        onCloseClick={() => setShowSettingsModal(false)}
        className="max-w-xl"
      >
        <div className="mx-side mb-3 mt-12">
          <SettingsTextarea
            autoFocus
            label={courseStrings.seoDesc}
            state={meta_description}
          />
        </div>
      </ModalWithCloseButton>
    </>
  )

  function renderCourseNavigation() {
    return (
      <CourseNavigation
        open={courseNavOpen}
        onOverviewButtonClick={() => setCourseNavOpen(!courseNavOpen)}
        title={
          <input
            autoFocus
            className={cn(`
                -ml-2 mt-1 min-w-[70%] rounded-xl border-2 border-transparent
                bg-editor-primary-100 px-2 py-0 focus:border-editor-primary focus:outline-none
              `)}
            placeholder={courseStrings.title}
            value={title.value}
            onChange={(e) => title.set(e.target.value)}
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
