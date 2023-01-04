import { EditorPlugin, object, EditorPluginProps } from '@edtr-io/plugin'

import { PasteHackEditor } from './editor'

export const PasteHackState = object({})

export type PasteHackPluginState = typeof PasteHackState
export type PasteHackPluginProps = EditorPluginProps<PasteHackPluginState>

export const pasteHackPlugin: EditorPlugin<PasteHackPluginState> = {
  Component: PasteHackEditor,
  state: PasteHackState,
  config: {},
}
