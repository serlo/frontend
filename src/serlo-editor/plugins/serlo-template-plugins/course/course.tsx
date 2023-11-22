import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { CourseNavigation } from './course-navigation'
import type { CoursePageTypePluginState } from './course-page'
import {
  editorContent,
  entity,
  serializedChild,
  entityType,
} from '../common/common'
import { ContentLoaders } from '../helpers/content-loaders/content-loaders'
import { RevisionHistoryLoader } from '../helpers/content-loaders/revision-history-loader'
import { SettingsTextarea } from '../helpers/settings-textarea'
import { ToolbarMain } from '../toolbar-main/toolbar-main'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { UuidType } from '@/data-types'
import { tw } from '@/helper/tw'
import { AddButton } from '@/serlo-editor/editor-ui'
import { EditorTooltip } from '@/serlo-editor/editor-ui/editor-tooltip'
import {
  type EditorPlugin,
  type EditorPluginProps,
  type PrettyStaticState,
  list,
  string,
} from '@/serlo-editor/plugin'
import { selectStaticDocument, store } from '@/serlo-editor/store'
import { TemplatePluginType } from '@/serlo-editor/types/template-plugin-type'

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
  const editorStrings = useEditorStrings()
  const courseStrings = editorStrings.templatePlugins.course
  const [courseNavOpen, setCourseNavOpen] = useState(true)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const staticState = selectStaticDocument(store.getState(), props.id)
    ?.state as PrettyStaticState<CourseTypePluginState>

  if (!staticState) return null
  const staticPages = staticState[
    'course-page'
  ] as PrettyStaticState<CoursePageTypePluginState>[]

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
        {children.map((child, index) => {
          const uniqueId = `page-${staticPages[index].id}`
          return (
            <div
              key={uniqueId}
              id={uniqueId}
              className="mt-16 border-t-2 border-editor-primary-200 pt-2"
            >
              <nav className="flex justify-end">
                <button
                  className="serlo-button-editor-secondary serlo-tooltip-trigger mr-2"
                  onClick={() => children.remove(index)}
                >
                  <EditorTooltip text={courseStrings.removeCoursePage} />
                  <FaIcon icon={faTrashAlt} />
                </button>
                <ContentLoaders
                  id={staticPages[index].id}
                  currentRevision={staticPages[index].revision}
                  onSwitchRevision={(data) =>
                    child.replace(TemplatePluginType.CoursePage, data)
                  }
                  entityType={UuidType.CoursePage}
                />
              </nav>
              {child.render()}
            </div>
          )
        })}
        <div className="mt-24 border-t-2 border-editor-primary-200 pt-12">
          <AddButton onClick={() => children.insert()}>
            {courseStrings.addCoursePage}
          </AddButton>
        </div>
        <ToolbarMain showSubscriptionOptions {...props.state} />
      </article>
      {showSettingsModal ? (
        <ModalWithCloseButton
          isOpen={showSettingsModal}
          onCloseClick={() => setShowSettingsModal(false)}
          className="!max-w-xl"
        >
          <div className="mx-side mb-3 mt-12">
            <SettingsTextarea
              autoFocus
              label={courseStrings.seoDesc}
              state={meta_description}
            />
          </div>
        </ModalWithCloseButton>
      ) : null}
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
            className={tw`
                -ml-2 mt-1 min-w-[70%] rounded-xl border-2 border-transparent
                bg-editor-primary-100 px-2 py-0 focus:border-editor-primary focus:outline-none
              `}
            placeholder={courseStrings.title}
            value={title.value}
            onChange={(e) => title.set(e.target.value)}
          />
        }
        pages={staticPages.map((coursePage) => {
          return {
            title: coursePage.title,
            url: `#page-${coursePage.id}`,
            id: coursePage.id,
          }
        })}
      />
    )
  }
}
