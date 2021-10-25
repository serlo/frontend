import { EditorPlugin, EditorPluginProps, string } from '@edtr-io/plugin'
import { createVideoPlugin } from '@edtr-io/plugin-video'
import * as React from 'react'

import {
  entity,
  Controls,
  editorContent,
  HeaderInput,
  entityType,
} from './common'
import { RevisionHistoryLoader } from './helpers/revision-history-loader'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const videoTypeState = entityType(
  {
    ...entity,
    content: string(),
    title: string(),
    description: editorContent(),
  },
  {}
)

const videoPlugin = createVideoPlugin()

export const videoTypePlugin: EditorPlugin<typeof videoTypeState> = {
  Component: VideoTypeEditor,
  state: videoTypeState,
  config: {},
}

function VideoTypeEditor(props: EditorPluginProps<typeof videoTypeState>) {
  const { title, description } = props.state
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <section>
      {props.renderIntoToolbar(
        <RevisionHistoryLoader
          id={props.state.id.value}
          currentRevision={props.state.revision.value}
          onSwitchRevision={props.state.replaceOwnState}
        />
      )}
      <div className="page-header">
        <h1>
          {props.editable ? (
            <HeaderInput
              placeholder={editorStrings.video.title}
              value={title.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                title.set(e.target.value)
              }}
            />
          ) : (
            <span itemProp="name">{title.value}</span>
          )}
        </h1>
      </div>
      <article>
        <section>
          <videoPlugin.Component
            {...props}
            state={{
              src: props.state.content,
              alt: props.state.title,
            }}
            config={{
              i18n: {
                src: {
                  label: editorStrings.video.url,
                },
                alt: {
                  label: editorStrings.video.seoTitle,
                },
              },
            }}
          />
        </section>
        <section>{description.render()}</section>
      </article>
      <Controls subscriptions {...props.state} />
    </section>
  )
}
