import {
  type EditorPlugin,
  type EditorPluginProps,
  string,
} from '@editor/plugin'
import { EditorPluginType } from '@editor/types/editor-plugin-type'

import {
  entity,
  editorContent,
  serializedChild,
  entityType,
} from './common/common'
import { EntityTitleInput } from './common/entity-title-input'

export const appletTypeState = entityType(
  {
    ...entity,
    title: string(),
    content: editorContent(),
    url: serializedChild(EditorPluginType.Geogebra),
  },
  {}
)

export type AppletTypePluginState = typeof appletTypeState

export const appletTypePlugin: EditorPlugin<AppletTypePluginState> = {
  Component: AppletTypeEditor,
  state: appletTypeState,
  config: {},
}

function AppletTypeEditor(props: EditorPluginProps<AppletTypePluginState>) {
  const { title, url, content } = props.state

  return (
    <>
      <EntityTitleInput title={title} />
      {url.render()}
      {content.render()}
    </>
  )
}
