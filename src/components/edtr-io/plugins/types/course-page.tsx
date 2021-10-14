import { EditorPlugin, EditorPluginProps, string } from '@edtr-io/plugin'
import * as React from 'react'

import {
  entity,
  Controls,
  editorContent,
  HeaderInput,
  entityType,
} from './common'
import { RevisionHistory, Settings } from './helpers/settings'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const coursePageTypeState = entityType(
  {
    ...entity,
    icon: string('explanation'),
    title: string(''),
    content: editorContent(),
  },
  {}
)

export const coursePageTypePlugin: EditorPlugin<
  typeof coursePageTypeState,
  { skipControls: boolean }
> = {
  Component: CoursePageTypeEditor,
  state: coursePageTypeState,
  config: {
    skipControls: false,
  },
}

function CoursePageTypeEditor(
  props: EditorPluginProps<
    typeof coursePageTypeState,
    { skipControls: boolean }
  >
) {
  const { title, icon, content } = props.state

  React.useEffect(() => {
    if (!['explanation', 'play', 'question'].includes(icon.value)) {
      icon.set('explanation')
    }
  }, [icon])

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <article>
      {props.renderIntoToolbar(
        <RevisionHistory
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      {props.renderIntoSettings(
        <Settings>
          <Settings.Select
            label="Icon"
            state={icon}
            options={[
              {
                label: editorStrings.coursePage.explanation,
                value: 'explanation',
              },
              {
                label: editorStrings.coursePage.video,
                value: 'play',
              },
              {
                label: editorStrings.coursePage.question,
                value: 'question',
              },
            ]}
          />
        </Settings>
      )}
      <h1>
        {props.editable ? (
          <HeaderInput
            placeholder={editorStrings.coursePage.title}
            value={title.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              title.set(e.target.value)
            }}
          />
        ) : (
          <span itemProp="name">{title.value}</span>
        )}
      </h1>
      {content.render()}
      {props.config.skipControls ? null : (
        <Controls subscriptions {...props.state} />
      )}
    </article>
  )
}
