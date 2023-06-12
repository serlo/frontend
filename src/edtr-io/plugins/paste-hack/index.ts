import { PasteHackEditor } from './editor'
import {
  EditorPlugin,
  object,
  EditorPluginProps,
} from '@/serlo-editor-repo/plugin'

export const PasteHackState = object({})

export type PasteHackPluginState = typeof PasteHackState
export type PasteHackPluginProps = EditorPluginProps<PasteHackPluginState>

export const pasteHackPlugin: EditorPlugin<PasteHackPluginState> = {
  Component: PasteHackEditor,
  state: PasteHackState,
  config: {},
}
