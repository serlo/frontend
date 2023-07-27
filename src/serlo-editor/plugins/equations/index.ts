import { EquationsEditor } from './editor'
import { Sign } from './sign'
import {
  child,
  list,
  object,
  EditorPlugin,
  EditorPluginProps,
  string,
} from '@/serlo-editor/plugin'
import { EditorPluginType } from '@/serlo-editor-integration/types/editor-plugin-type'

export const stepProps = object({
  left: string(''),
  sign: string(Sign.Equals),
  right: string(''),
  transform: string(''),
  explanation: child({
    plugin: EditorPluginType.Text,
    config: { registry: [] },
  }),
})

const equationsState = object({
  steps: list(stepProps, 2),
  firstExplanation: child({
    plugin: EditorPluginType.Text,
    config: { registry: [] },
  }),
  transformationTarget: string('equation'),
})

export type EquationsPluginState = typeof equationsState
export type EquationsProps = EditorPluginProps<EquationsPluginState>

export const equationsPlugin: EditorPlugin<EquationsPluginState> = {
  Component: EquationsEditor,
  config: {},
  state: equationsState,
}
