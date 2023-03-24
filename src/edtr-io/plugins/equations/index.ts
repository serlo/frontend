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
/** @public */
export type EquationsProps = EditorPluginProps<
  EquationsPluginState,
  EquationsConfig
>

/**
 * @param config - {@link EquationsConfig | Plugin configuration}
 * @public
 */
export function createEquationsPlugin(
  config: EquationsConfig
): EditorPlugin<EquationsPluginState, EquationsConfig> {
  return {
    Component: EquationsEditor,
    config: config,
    state: equationsState,
  }
}

/** @public */
export interface EquationsConfig {
  i18n: {
    leftHandSide: string
    transformation: string
    mode: string
    transformationExample: string
    transformationOfEquations: string
    transformationOfTerms: string
    addNewRow: string
    explanation: string
    term: string
    rightHandSide: string
    combineLikeTerms: string
    setEqual: string
    firstExplanation: string
    addNew: string
  }
}
