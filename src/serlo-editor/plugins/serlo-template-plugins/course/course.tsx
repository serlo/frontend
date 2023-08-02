import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

import { CourseNavigation } from './course-navigation'
import { CoursePageTypePluginState } from './course-page'
import {
  editorContent,
  entity,
  serializedChild,
  OptionalChild,
  entityType,
} from '../common/common'
import { RevisionHistoryLoader } from '../helpers/content-loaders/revision-history-loader'
import { SettingsTextarea } from '../helpers/settings-textarea'
import { ToolbarMain } from '../toolbar-main/toolbar-main'
import { FaIcon } from '@/components/fa-icon'
import { ModalWithCloseButton } from '@/components/modal-with-close-button'
import { useEditorStrings } from '@/contexts/logged-in-data-context'
import { tw } from '@/helper/tw'
import { AddButton } from '@/serlo-editor/editor-ui'
import {
  EditorPlugin,
  EditorPluginProps,
  StateTypeSerializedType,
  list,
  string,
} from '@/serlo-editor/plugin'
import { selectSerializedDocument, store } from '@/serlo-editor/store'

export const courseTypeState = entityType(
  {
    ...entity,
    title: string(),
    description: editorContent(),
    meta_description: string(),
  },
  {
    'course-page': list(serializedChild('type-course-page')),
  }
)

type CourseTypePluginState = typeof courseTypeState

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

  const serializedState = selectSerializedDocument(store.getState(), props.id)
    ?.state as StateTypeSerializedType<CourseTypePluginState>

  if (!serializedState) return null
  const serializedPages = serializedState[
    'course-page'
  ] as StateTypeSerializedType<CoursePageTypePluginState>[]

  return (
    <>
      <button
        onClick={() => setShowSettingsModal(true)}
        className="serlo-button-editor-secondary absolute right-0 -mt-10 mr-side text-base"
      >
        Metadata <FaIcon icon={faPencilAlt} />
      </button>
      <article className="mt-20">
        {renderCourseNavigation()}
        {children.map((child, index) => {
          return (
            <div key={child.id} id={`page-${serializedPages[index].id}`}>
              <OptionalChild
                state={child}
                removeLabel={courseStrings.removeCoursePage}
                onRemove={() => children.remove(index)}
              />
            </div>
          )
        })}
        <div className="mt-24 border-t-2 border-editor-primary-200 pt-12">
          <AddButton onClick={() => children.insert()}>
            {courseStrings.addCoursePage}
          </AddButton>
        </div>
        <ToolbarMain showSubscriptionOptions {...props.state} />
        {props.renderIntoSideToolbar(
          <RevisionHistoryLoader
            id={props.state.id.value}
            currentRevision={props.state.revision.value}
            onSwitchRevision={props.state.replaceOwnState}
          />
        )}
      </article>
      {showSettingsModal ? (
        <ModalWithCloseButton
          isOpen={showSettingsModal}
          onCloseClick={() => setShowSettingsModal(false)}
          className="!max-w-xl"
        >
          <div className="mx-side mb-3 mt-12">
            <SettingsTextarea
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
          props.editable ? (
            <input
              className={tw`
                -ml-2 mt-1 min-w-[70%] rounded-xl border-2 border-transparent
                bg-editor-primary-100 px-2 py-0 focus:border-editor-primary focus:outline-none
              `}
              placeholder={courseStrings.title}
              value={title.value}
              onChange={(e) => title.set(e.target.value)}
            />
          ) : (
            title.value
          )
        }
        pages={serializedPages.map((coursePage) => {
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
