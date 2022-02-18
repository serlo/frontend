import {
  child,
  list,
  object,
  EditorPlugin,
  EditorPluginProps,
  string,
} from '@edtr-io/plugin'

import { EquationsEditor } from './editor'
import { Sign } from './sign'

export const stepProps = object({
  left: string(''),
  sign: string(Sign.Equals),
  right: string(''),
  transform: string(''),
  explanation: child({ plugin: 'text', config: { registry: [] } }),
})

const equationsState = object({
  steps: list(stepProps, 2),
  firstExplanation: child({ plugin: 'text', config: { registry: [] } }),
  transformationTarget: string('equation'),
})

export type EquationsPluginState = typeof equationsState
export type EquationsProps = EditorPluginProps<EquationsPluginState>

export const equationsPlugin: EditorPlugin<EquationsPluginState> = {
  Component: EquationsEditor,
  config: {},
  state: equationsState,
}
