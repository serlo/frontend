import { EditorPlugin, EditorPluginProps, string } from '@edtr-io/plugin'
import * as React from 'react'

import {
  entity,
  Controls,
  editorContent,
  serializedChild,
  HeaderInput,
  entityType,
} from './common'
import { RevisionHistory } from './helpers/revision-history'
import { Settings } from './helpers/settings'
import { useLoggedInData } from '@/contexts/logged-in-data-context'

export const appletTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(),
    meta_title: string(),
    meta_description: string(),
    url: serializedChild('geogebra'),
  },
  {}
)

export const appletTypePlugin: EditorPlugin<typeof appletTypeState> = {
  Component: AppletTypeEditor,
  state: appletTypeState,
  config: {},
}

function AppletTypeEditor(props: EditorPluginProps<typeof appletTypeState>) {
  const { title, url, content, meta_title, meta_description } = props.state
  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const editorStrings = loggedInData.strings.editor

  return (
    <div>
      <div className="page-header">
        {props.renderIntoToolbar(
          <RevisionHistory
            id={props.state.id.value}
            currentRevision={props.state.revision.value}
            onSwitchRevision={props.state.replaceOwnState}
          />
        )}
        {props.renderIntoSettings(
          <Settings>
            <Settings.Textarea
              label={editorStrings.applet.seoTitle}
              state={meta_title}
            />
            <Settings.Textarea
              label={editorStrings.applet.seoDesc}
              state={meta_description}
            />
          </Settings>
        )}
        <h1>
          {props.editable ? (
            <HeaderInput
              placeholder={editorStrings.applet.title}
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
        {url.render()}
        {content.render()}
      </article>
      <Controls subscriptions {...props.state} />
    </div>
  )
}
