import { PasteHackEditor } from './editor'
import { EditorPlugin, object, EditorPluginProps } from '@/serlo-editor/plugin'

const pasteHackState = object({})

export type PasteHackPluginState = typeof pasteHackState
export type PasteHackPluginProps = EditorPluginProps<PasteHackPluginState>

// POC how we could easily let selected authors import raw editor stated
// build for mfnf import

export const pasteHackPlugin: EditorPlugin<PasteHackPluginState> = {
  Component: PasteHackEditor,
  state: pasteHackState,
  config: {},
}
