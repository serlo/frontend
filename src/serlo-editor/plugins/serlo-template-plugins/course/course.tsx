import { useState } from 'react'

import {
  editorContent,
  entity,
  serializedChild,
  OptionalChild,
  entityType,
} from '../common/common'
import { RevisionHistoryLoader } from '../helpers/content-loaders/revision-history-loader'
import { Settings } from '../helpers/settings'
import { ToolbarMain } from '../toolbar-main/toolbar-main'
import { CourseNavigation } from './course-navigation'
import { CoursePageTypePluginState } from './course-page'
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
  const courseStrings = useEditorStrings().templatePlugins.course
  const [courseNavOpen, setCourseNavOpen] = useState(true)

  const serializedState = selectSerializedDocument(store.getState(), props.id)
    ?.state as StateTypeSerializedType<CourseTypePluginState>

  if (!serializedState) return null
  const serializedPages = serializedState[
    'course-page'
  ] as StateTypeSerializedType<CoursePageTypePluginState>[]

  return (
    <article>
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
      {props.renderIntoToolbar(
        <RevisionHistoryLoader
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      {props.renderIntoSettings(
        <Settings>
          <Settings.Textarea
            label={courseStrings.seoDesc}
            state={meta_description}
          />
        </Settings>
      )}
    </article>
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
                bg-editor-primary-100 py-0 px-2 focus:border-editor-primary focus:outline-none
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
